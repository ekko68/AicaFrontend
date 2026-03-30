//보고서 제출 목록 조회 (PRG-USP-FBG-01)
export interface reportListInput {
    presentnStartDate : string | null, 
    presentnEndDate : string | null,
    reprtTypeCd : "I"|"F" | null,
    reprtSttusCd : string,
    keyword : string | null,
    keywordDiv : "taskNm"|"pblancNm" | null
    page : number,
    itemsPerPage : number ,
}

//보고서 제출 (PRG-USP-FBG-06)
export interface reportSubmitInput {
    reprtId : string,
    reprtSumryCn : string,
}