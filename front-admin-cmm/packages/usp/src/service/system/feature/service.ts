export interface RoleInformation {
  code: string;
  name: string;
}

export interface RoleData {
  roleId: string;
  roleNm: string;
}

export interface MenuData {
  systemId: string;
  menuId: string;
  menuNm: string;
  url: string;
  newWindow: boolean;
  parentMenuId: string;
  sortOrder: number;
  remark: string;
  enabled: boolean;
}
