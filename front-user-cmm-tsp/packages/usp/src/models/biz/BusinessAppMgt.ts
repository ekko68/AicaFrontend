// 학력
export type UsptAcdmcr = {
    acdmcrId:string        /** 학력ID */
    bgnde: string            /** 시작일 */
    endde: string           /** 종료일 */
    schulNm:string         /** 학교명 */
    major:string           /** 전공 */
    grdtnDivCd:string      /** 졸업구분코드(G:GRDTN_DIV) */
    flag:string            /** I:등록, U:수정, D:삭제 */
    rn:number
}
// 군복무
export type UsptMsvc = {
    msvcTypeCd:string           /** 군복무유형코드(G:MSVC_TYPE) */
    msvcBgnde:string            /** 군복무시작일 */
    msvcEndde:string            /** 군복무종료일 */
    msvcExemptReason:string     /** 군면제사유 */
}
// 자격증
export type UsptCrqfc = {
    crqfcId:string          /** 자격증ID */
    crqfcNm:string          /** 자격증명 */
    grad:string             /** 등급 */
    acqdt:string            /** 취득일 */
    athrzInstt:string       /** 검정기관 */
    flag:string             /** I:등록, U:수정, D:삭제 */
    rn:number
}
// 대외활동 / 외부교육 / 프로젝트
export type UsptEtcCareer = {
    etcCareerId:string          /** 기타경력ID */
    careerNm:string             /** 경력명 */
    careerTypeCd:string         /** 경력유형코드(G:CAREER_TYPE) */
    bgnde:string                /** 시작일 */
    endde:string                /** 종료일 */
    cn:string                   /** 내용 */
    instt:string                /** 기관 */
    flag:string                 /** I:등록, U:수정, D:삭제 */
    rn:number
}
// 경력
export type UsptJobCareer = {
    jobCareerId:string          /** 직장경력ID */
    wrkplc:string               /** 근무처 */
    bgnde:string                /** 시작일 */
    endde:string                /** 종료일 */
    job:string                  /**  업무*/
    retireResn:string           /** 퇴사사유 */
    flag:string                 /** I:등록, U:수정, D:삭제 */
    rn:number
}
// 프로그램
export type UsptProgrm = {
    progrmId:string             /** 프로그램ID */
    progrmTypeCd:string         /** 프로그램유형코드(G:PROGRM_TYPE) */
    progrmTypeInput:string      /** 프로그램 유형 입력 */
    gradTypeCd:string           /** 등급유형코드(G:GRAD_TYPE) */
    flag:string                 /** I:등록, U:수정, D:삭제 */
    rn:number
}
// 수상
export type UsptWnpz = {
    wnpzId:string           /** 수상ID */
    wnpzNm:string           /** 수상명 */
    acqdt:string            /** 취득일 */
    isuInstt:string         /** 발행기관 */
    flag:string             /** I:등록, U:수정, D:삭제 */
    rn:number
}
export interface careerType {
    acdmcrList: UsptAcdmcr[]
    crqfcList: UsptCrqfc[]
    etcCareerList: UsptEtcCareer[]
    jobCareerList: UsptJobCareer[]
    msvcInfo: UsptMsvc
    progrmList: UsptProgrm[]
    wnpzList: UsptWnpz[]
}

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  export interface TypeReqMgnt {
    rceptDtStart:	    string		// 신청일 시작일
    rceptDtEnd:	        string		// 신청일 종료일
    rceptSttusCd:	    string		// 신청상태 (G: RCEPT_STTUS)
    keywordDiv:	        string		// 검색 키워드 구분 (taskNm:과제명, pblancNm: 공고명)
    keyword:	        string		// 검색 키워드
    page:	            number		// 페이지수
    itemsPerPage:	    number		// 페이지당 항목 수
  }
