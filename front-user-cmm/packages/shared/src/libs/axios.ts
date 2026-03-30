/* eslint-disable import/no-anonymous-default-export */
import axios, {AxiosRequestConfig, AxiosResponse, Canceler} from 'axios';
import authentication from '../authentication';
import async from 'async';
import {useQuery} from "react-query";
import {BaseResponse, ErrorMessage} from '../utils/Model';
import dayjs from "../libs/dayjs";

const q = async.queue(function (task: any, callback) {
  console.log(task);
  setTimeout(callback, 3000);
}, 2);
const xhr = axios.create();
xhr.defaults.withCredentials = true;
xhr.defaults.timeout = 1000 * 5 * 60; // 5분

xhr.interceptors.response.use(
  (response) => {
    // resetJWT(response);
    return response;
  },
  (error) => {
    if (error.code == "ERR_NETWORK") {
      return Promise.reject(error);
    }
    if (!error.response) {
      return Promise.reject(error);
    }
    // resetJWT(error.response);
    let errorData = error.response.data;
    if (errorData instanceof Blob) {
      if (errorData.type != "application/json") {
        return;
      }
      var reader = new FileReader();
      reader.onload = (e:any) => {
        const json = JSON.parse(e.target.result);

        // alertError(error.response.status, json);
        return Promise.reject(json);
      };

      reader.readAsText(errorData);
      return Promise.reject(error);
    }
      // alertError(error.response.status, errorData);
    return Promise.reject(error);
  }
);

// const alertError = (status:any, errorJson:any) =>{
//   if (status == 401) {
//     goLoginPage();
//   } else if (status == 404) {
//     alert("지원하지 않는 기능입니다.");
//   } else if (status == 403) {
//     alert("권한이 없습니다.");
//   } else if (status == 400) {
//     if (errorJson.error == "Invalid") {
//       if (errorJson.errors.length > 0) {
//           errorJson.errors.map((item:any,idx:number)=> {
//           const selector = "div.invalid-feedback." + item.field;
//           console.log("errors: 400 ",selector)
//         });
//       } else {
//         alert(errorJson.message);
//       }
//     }
//   } else {
//     alert("시스템 오류로 작업을 중단하였습니다.");
//   }
// };

/**
 * 로그인 페이지로 이동한다.(현재 page를 nextUrl에 넣어 로그인 페이지로 이동한다.)
 */
//  const goLoginPage = () => {
//   let url = document.location.href;
//   url = window.btoa(url);
//   document.location.href = "/signin?nextUrl=" + url;
// };

const process: { [key: string]: any } = {};

export type { AxiosRequestConfig, AxiosResponse };

let config: any = null;
export const setup = (params: AxiosRequestConfig) => {
  config = params;
};
export const getBaseUrl = () => config.baseURL

//* 성공, 실패 모두 키값 삭제
function clear(res: any) {
  const key = res.config?.url;
  delete process[key];
  return res;
}

export default async (req: AxiosRequestConfig<any>, isFormData?: boolean) => {
  if (!config) {
    console.error('API Config 설정을 먼저 해야 합니다.');
  }
  const token = authentication.getToken();
  let headers:any = {};
  if (token) {
    headers = { Auth: 'Bearer ' + token };
  }
  if (isFormData){
    headers['Content-Type'] = 'multipart/form-data'
  }

  //* 요청한 URL로 이미 진행 중인 API 가 있다면, 진행 중인 Promise 반환
  const key: any = req.url;
  if (process[key]) return process[key];

  process[key] = xhr({ headers, ...config, ...req });
  return process[key].then(clear).catch((e: any) => Promise.reject(clear(e)));
};

export type RequestCancelRef = (cancel: Canceler) => void
export type ContentType = "json" | "formData"
type RequestOptions = {
  contentType?: ContentType
  responseType?: ResponseType
  cancelRef?: RequestCancelRef
  baseURL?: string
}

const TokenUpdate = async() => {
  const certificate = authentication.get();
  const left = dayjs(certificate.accessTokenExpiresAt).diff(+new Date(), 's')

  if (
    left > 0 && certificate.accessToken &&
    dayjs().diff(certificate.updateAt, 's') > 1
  ) {
    try {
      const res = await axios({
        url: `/member/api/login/refresh-token/member`,
        method: 'post',
        baseURL: process.env.REACT_APP_DOMAIN_MEMBER_BNET,
      });
      authentication.set(res.data);

      return true;
    }catch(e) {return false;}
  }
  return false;
}

const Headers = (type?: ContentType) => {
  const token = authentication.getToken();
  const headers:any = {
    'Content-Type': 'application/json;charset=UTF-8'
  };

  if (type && type == "formData")
    headers['Content-Type'] = 'multipart/form-data'
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

const _request = async (
  type: 'GET' | 'POST' | 'DELETE' | 'PUT',
  url: string,
  data?: any,
  opts?: RequestOptions,
): Promise<any> => {
  // 토큰 갱신
  const isUpdate = await TokenUpdate();
  // if (!isUpdate) return;

  let resData: BaseResponse | null = null;
  const headers = Headers(opts?.contentType);
  const start: Date = new Date(Date.now());

  const key = url;
  if (process[key]) return process[key];

  try {
    let res = null;

    if (type === 'GET') {
      res = await xhr.get(url, {
        ...config,
        baseURL: opts && opts.baseURL? opts.baseURL : config.baseURL,
        headers: headers, params: data,
        responseType: opts && opts.responseType,
        cancelToken: opts && opts.cancelRef && new axios.CancelToken(opts.cancelRef),
        paramsSerializer: paramsObj => {
          const params = new URLSearchParams()
          for ( const key in paramsObj) {
            params.append(key, paramsObj[key])
          }
          return params.toString();
        }
      }).then(clear);
    } else if (type === 'POST') {
      res = await xhr.post(url, data, {
        ...config,
        headers: headers,
        baseURL: opts && opts.baseURL? opts.baseURL : config.baseURL,
        cancelToken: opts && opts.cancelRef && new axios.CancelToken(opts.cancelRef),
      }).then(clear);
    } else if (type === 'DELETE') {
      res = await xhr.delete(url, {
        ...config,
        data: data,
        headers: headers,
        cancelToken: opts && opts.cancelRef && new axios.CancelToken(opts.cancelRef),
      }).then(clear);
    } else if (type === 'PUT') {
      res = await xhr.put(url, data, {
        ...config,
        headers: headers,
        cancelToken: opts && opts.cancelRef && new axios.CancelToken(opts.cancelRef),
      }).then(clear);
    }
    resData = res!.data;
    if (resData) resData.success = res!.status == 200

  } catch (e) {
    clear(e);

    // cancelRef를 사용해서 요청을 취소시켰을 경우
    if (axios.isCancel(e)) {
      console.debug(['API CANCEL', {url}]);
      // @ts-ignore
      throw [{message: e.message, url}];
    }

    // status가 200이 아닌 모든 경우
    // @ts-ignore
    const {data, status} = e.response;
    if (status === 403 || status === 401) {
      throw [{message: 'Access Denied', url} as ErrorMessage];
    }

    console.warn(['API ERROR', {url, status, data}]);
    throw [{message: data.message, url, status} as ErrorMessage];
  }

  // 서버에서 반환된 에러 처리
  // GET은 서버 정의 에러가 없으며 문제가 발생한다면 null이 반환된다
  // if (type == 'POST' && resData && !resData.success) {
  //   throw resData.errors;
  // }
  return resData;
}

export const AxiosGet = async(url: string, param?: any, reqOpts?: RequestOptions) => {
  return _request('GET', url, param, reqOpts);
}

export const AxiosPost = async(url: string, data?: any, reqOpts?: RequestOptions) => {
  return _request('POST', url, data, reqOpts);
}

export const AxiosDelete = async(url: string, data?: any, reqOpts?: RequestOptions) => {
  return _request('DELETE', url, data, reqOpts);
}

export const AxiosPut = async(url: string, data?: any, reqOpts?: RequestOptions) => {
  return _request('PUT', url, data, reqOpts);
}

/* react-query를 사용해서 Axios통신. */
export const GetQuery = (url: string, data?: any, reqOpts?: RequestOptions, queryOpts?: any) => {
  return useQuery([url,data], () => _request('GET', url, data, reqOpts),queryOpts);
}

export const PostQuery = (url: string, data?: any, reqOpts?: RequestOptions, queryOpts?: any) => {
  return useQuery([url,data], () => _request('POST', url, data, reqOpts), queryOpts);
}

export const PutQuery = (url: string, data?: any, reqOpts?: RequestOptions, queryOpts?: any) => {
  return useQuery([url,data], () => _request('PUT', url, data, reqOpts), queryOpts);
}

export const DeleteQuery = (url: string, data?: any, reqOpts?: RequestOptions, queryOpts?: any) => {
  return useQuery([url,data], () => _request('DELETE', url, data, reqOpts), queryOpts);
}