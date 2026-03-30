export interface 회원관리검색목록 {
  회원유형? : string
  가입일? : number
  회원상태?: string
  강사여부?: string
  아이디?: string
  회원명?: string
  사업자등록번호?: string
}

export interface 회원관리목록조회 {
  아이디: string
  회원명: string
  회원유형: string
  대표자명: string
  사업자등록번호: string
  강사여부: string
  회원상태: string
  가입일시: number
}

export interface 회원상세정보 {
  가입일시: number
  회원유형: string
  강사여부: string
  회원상태: string
  아이디: string
  이름: string
  생년월일: number
  성별: string
  휴대폰번호: number
  이메일: string
  마케팅수신여부: string
}

export interface 회원기업회원상세정보 {
  가입일시: number
  회원유형: string
  강사여부: string
  불량회원여부: string
  사업자등록번호: number
  사업자명: string
  법인등록번호: number
  대표자명: string
  담당자명: string
  담당자휴대폰번호: number
  담당자이메일: string
  아이디: string
  휴대폰번호: number
  마케팅수신여부: string
}

export interface 회원처리이력조회 {
  처리일시: number
  구분: string
  사유: string
  처리자명: string
  처리자ID: string
}

export interface 회원기업상세정보 {
  산업분야: string
  기업기관유형: string
  설립일: number
  종사자수: string
  상주인원: string
  채용예정인력: string
  업종: string
  주업종: string
  주요기술및생산품: string
  주소: string
  대표전화: number
  팩스: number
  대표자연락처: number
  대표자이메일: string
  신규창업계획: string
  이전및설립계획: string
  기준년도: number
  전년도매출액: number
  전전년도매출액: number
  전전전년도매출액: number
}