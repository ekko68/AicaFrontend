import api from '~/api';

//지금 유효한 팝업공지id 목록 조회 (PRG-COM-POP-06)
export const fetchPopupList = () =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/popups/now/${process.env.REACT_APP_PORTAL}`,
    method:'get',
  })

//전시 배너 목록조회 (PRG-COM-BNV-01)
export const fetchBannerList = () =>
api({
  url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/banners/now/${process.env.REACT_APP_PORTAL}`,
  method:'get',
})

//배너 이미지 다운로드 (PRG-COM-BNN-06)
export const fetchBannerImage = (bannerId:string , platformType:string) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/banners/${bannerId}/images/${platformType}`,
  method:'get',
})

//이미지 다운로드 (PRG-COM-POP-08)
export const fetchPopupImage = (popupId:string) =>
api({
  url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/popups/${popupId}/image`,
  method:'get',
})