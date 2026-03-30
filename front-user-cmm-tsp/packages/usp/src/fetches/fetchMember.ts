import api from '~/api';

//회원본인 정보 조회(조회) (PRG-COM-MSF-24)
export default () => 
  api({
    method: 'get',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/me`,
  });
