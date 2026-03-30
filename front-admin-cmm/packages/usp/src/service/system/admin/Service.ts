export interface AdminSearchQuery {
  loginId: string;
  memberNm: string;
  memberSt: string;
  authorityId: string;
  deptNm: string;
}

export interface AdminMemberData {
  memberId: string;
  loginId: string;
  memberNm: string;
  deptNm: string;
  postionNm: string;
  authorityId: string;
  authorityNm: string;
  memberSt: string;
  memberStNm: string;
  rn: number;
}

export interface CreateAdminData {
  loginId: string;
  memberNm: string;
  deptNm: string;
  authorityId: string;
  email: string;
  positionNm?: string;
  memberIps?: string;
  mobileNo: string;
  telNo: string;
}

export interface AdminDetailData extends CreateAdminData {
  memberId: string;
  authorityNm: string;
  memberSt: string;
  memberStNm: string;
  memberStDt: string;
}

export interface ModifyAdminData {
  deptNm: string;
  positionNm?: string;
  authorityId: string;
  mobileNo: string;
  email: string;
  memberIps?: string;
  memberSt: string;
}

export interface AdminHistory {
  histId: string;
  histDt: Date;
  memberId: string;
  memberNm: string;
  workerId: string;
  workerNm: string;
  workCn: string;
  fmtHistDt: string;
}
