import api from '~/api';

export type inputType = {
  mvnFcDtype ?: string,
  page : number,
  itemsPerPage : number,
}

//공유시설 유효목록 조회 (PRG-USP-IJS-09)
export default (data: inputType) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/share-facilities?mvnFcDtype=${data.mvnFcDtype}&page=${data.page}&itemsPerPage=${data.itemsPerPage}`,
    method:'get',
  })


export const fetchMvnFcDetail = (mvnFcId : string) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/facilities/${mvnFcId}`,
    method:'get',
  })
