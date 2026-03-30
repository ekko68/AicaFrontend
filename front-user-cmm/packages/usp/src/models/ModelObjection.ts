//결과이의신청 목록 조회 (PRG-USP-RDS-01)
export interface objectionInput {
    objcReqstStartDate : string | null,
    objcReqstEndDate : string | null,
    lastSlctnObjcProcessSttusCd : string | null,
    keyword : string | null,
    keywordDiv : "taskNm"|"pblancNm" | null
    page : number,
    itemsPerPage : number ,
}

export const initObjectionInput:objectionInput = {
    objcReqstStartDate: null,
    objcReqstEndDate: null,
    lastSlctnObjcProcessSttusCd: null,
    keyword: null,
    keywordDiv: null,
    page: 1,
    itemsPerPage: 10
}