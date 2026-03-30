import api from '~/api';

//사용자 자원할당내역 목록조회 (PRG-USP-ARH-01)
export const fetechUserResourceGet = () =>
api({
    url: `${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/resources/user`,
    method:'get',
});

//사용자 자원할당내역 상세조회 (PRG-USP-ARH-02)
export const fetchUserResourceDetailGet = (alrsrcId:string) =>
api({
    url: `${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/resources/user/${alrsrcId}`,
    method:'get',    
})