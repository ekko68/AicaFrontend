export interface Role {
  roleId: string;
  roleNm: string;
}

export interface ProgramInfomation {
  programId?: string;
  programNm: string;
  systemId: string;
  httpMethod: string;
  urlPattern: string;
  checkOrder: number;
  roles: string[];
}
