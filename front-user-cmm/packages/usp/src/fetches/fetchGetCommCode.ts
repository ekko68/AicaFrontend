import api from '~/api';
export default (codeGroup?: string) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/codegroups/${codeGroup}/codes/enabled`,
    method: 'get',
});

export const fetchSiteMap = (menu: string) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/auth/menus/${menu}/me`,
    method:'get',
})