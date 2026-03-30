export interface Role {
  roleId: string;
  roleNm: string;
}

export interface AuthorityData {
  authorityId: string;
  authorityNm: string;
  purpose: string;
  roles: string[];
}
