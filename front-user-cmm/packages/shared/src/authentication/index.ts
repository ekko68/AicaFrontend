/* eslint-disable import/no-anonymous-default-export */
import dayjs from 'shared/libs/dayjs';
import jwt_decode from "jwt-decode";
import { mutate } from 'swr';
export type AuthenticationType = {
  accessToken: string;
  accessTokenExpiresIn: number;
  accessTokenExpiresAt: number;
  grantType: string;
  refreshToken: string;
  refreshTokenExpiresIn: number;
  refreshTokenExpiresAt: number;
  updateAt: number;
};

let store: any = {};

type keys = keyof AuthenticationType;
export const get = (key?: keys) => {
  if (!!key) {
    return store[key];
  }
  return store as AuthenticationType;
};

export const getToken = (): AuthenticationType => {
  return get().accessToken;
};

export const set = (value: AuthenticationType) => {
  store = {
    ...value,
    updateAt: +new Date(),
    accessTokenExpiresAt: dayjs()
      .millisecond(value.accessTokenExpiresIn)
      .valueOf(),
    refreshTokenExpiresAt: dayjs()
      .millisecond(value.refreshTokenExpiresIn)
      .valueOf(),
  };
  // console.log(useSWRConfig());
  mutate('authentication', store);
};

export const remove = () => {
  store = {};
  mutate('authentication', store);
};

export const getUser = () => {
  let tval:any = getToken();
  if(!!tval){
    let res:any = jwt_decode(tval);
    // console.log(jwt_decode(res))
    let {memberType} = res.principal;
    return memberType;
  }
};

export const getUserNm = () => {
  let tval:any = getToken();
  if(!!tval){
    let res:any = jwt_decode(tval);
    // console.log(jwt_decode(res))
    let {memberNm} = res.principal;
    return memberNm;
  }
};

export const getMemberData = () => {
  let tval:any = getToken();
  if(!!tval){
    let res:any = jwt_decode(tval);
    return res.principal;
  }
};

export default {
  get,
  set,
  remove,
  getToken,
  getUser,
  getUserNm,
  getMemberData
};
