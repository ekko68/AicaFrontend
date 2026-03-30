// 성과관리 목록 조회 (PRG-USP-SGF-01)
export interface performanceListInput {
    bsnsYear : string | null,
    rsltSttusCd : string | null,
    keyword : string | null,
    keywordDiv : "receiptNo" | "taskNm" | "pblancNm" | null,
    page : number,
    itemsPerPage : number,
}
// 성과관리 목록 조회 (PRG-USP-SGF-01)
export const initPerformanceInput : performanceListInput = {
    bsnsYear: null,
    rsltSttusCd: null,
    keyword: null,
    keywordDiv: "taskNm", //키워드검색 구분
    page: 1,
    itemsPerPage: 10
}

export interface infoList {
    rsltIdxIemId: string,
    attachFileOrder: number,
    rsltIdxIemCnList: rsltIdxIemCnList[],
}

export interface rsltIdxIemCnList {
    rsltIdxIemCnId: string,
    rsltIdxIemCn: string
}

export interface deleteAttachFileList {
    attachmentId : string,
}

// 성과 제출 (PRG-USP-SGF-05)
export interface performanceSubmitInput {
    infoList : infoList[],
    deleteAttachFileList : deleteAttachFileList[], 
}

export interface basicInfo {
    applyId: string ,
    bsnsCd: string,
    bsnsNm: string,
    bsnsYear: string,
    pblancNm: string,
    taskNm: string,
    receiptNo: string,
    memberNm: string,
    bsnsBgnde: string,
    bsnsEndde: string    
}

export interface rsltIdxIemList {
    rsltIdxIemId: string,
    rsltIdxId: string,
    rsltIdxNm: string,
    rsltIdxTypeCd: string,
    prufFile: {
        attachmentId: string,
        fileNm: string,
        fileSize: string
    },
    rsltIdxIemCnList: rsltIdxIemCnList[]
}

export interface rsltIdxIemCnList1 {   
        rsltIdxIemCnId: string,
        rsltIdxDetailIemId: string,
        detailIemNm: string,
        rsltIdxStdIemId: string,
        stdIemNm: string,
        rsltIdxIemCn: string,
        iemUnitCd : string,
}

export interface resultList {
    rsltSttus: string | null,
	basicInfo: basicInfo,
	rsltIdxIemList: [
		{
			rsltIdxIemId: string,
			rsltIdxId: string,
			rsltIdxNm: string,
			rsltIdxTypeCd: string,
			prufFile: {
				attachmentId: string,
				fileNm: string,
				fileSize: string
			},
			rsltIdxIemCnList: rsltIdxIemCnList1[]
		},
		
	], 
attachFileList:    {
    attachmentId: string,
    fileNm: string,
    fileSize: string
}[]
}
