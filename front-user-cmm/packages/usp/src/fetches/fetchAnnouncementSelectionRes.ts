import api from '~/api';

export type selectionType = {
  slctnPblancNm : string,
  page? : number,
  itemsPerPage? : number,
}


//사업선정목록 가져오기
export default (data:selectionType) =>
api({
  method: 'get',
  url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/slctn-pblanc`,
  params: data,   
})

export const fetchAnnouncementSelectionResDetail = (pblancId:string) =>
  api({
    method: 'get',
    url: `${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/slctn-pblanc/${pblancId}`,
  })