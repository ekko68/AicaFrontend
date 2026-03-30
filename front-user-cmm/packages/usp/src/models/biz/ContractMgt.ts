

export type FrontBsnsPlanType = {
    presentnDtStart:String                     /**제출일시작**/
    presentnDtEnd:String                       /**제출일종료**/
    planPresentnSttusCd:String                     /** 사업계획제출상태코드(G:PLAN_PRESENTN_STTUS) */
    taskNmKo:String                        /** 과제명(국문) */
    pblancNm:String                        /** 공고명 */
    receiptNo:String                       /** 접수번호(BA + 8자리 순번) */
    bsnsYear:String                        /**사업년도*/
    bsnsNm:String                      /**사업명*/
    rspnberNm:String                       /** 책임자명_회원명 */
    memberNm:String                        /** 신청자명 */
    bsnsPlanDocId:String                      /** 사업계획서ID */
    bsnsSlctnId:String                        /** 사업선정대상ID */
    taskReqstWctId:String                     /** 과제신청사업비ID */
    makeupReqFileGroupId:String                       /** 보완요청파일그룹ID */
    prsentrAttachmentGroupId:String                       /** 제출첨부파일그룹ID */
    beginRowNum:number
    itemsPerPage:number
}
  
export type UsptTaskTaxitmWct = {
    taskTaxitmWctId:string;            /** 과제세목별사업비ID */
    taskReqstWctId:string;             /** 과제신청사업비ID */
    wctTaxitmId:string;                /** 사업비세목ID */
    ctTaxitmNm:string;                 /** 사업비세목명 */
    computBasisCn:string;                  /** 산출근거내용 */
    sportBudget:number;            /** 지원예산 */
    alotmCash:number;          /** 부담금현금 */
    alotmActhng:number;            /** 부담금현물 */
    wctTaxitmTot:number;           /**지원예산+부담금현금+부담금현물*/
    ctIoeId:string;                    /**사업비비목ID*/
    ctIoeNm:string;                    /**사업비비목명*/
}

export type UsptTaskTaxitmWctPop = {
    taskTaxitmWctId:string;            /** 과제세목별사업비ID */
    taskReqstWctId:string;             /** 과제신청사업비ID */
    wctTaxitmId:string;                /** 사업비세목ID */
    wctTaxitmNm:string;                 /** 사업비세목명 */
    computBasisCn:string;                  /** 산출근거내용 */
    sportBudget:number;            /** 지원예산 */
    alotmCash:number;          /** 부담금현금 */
    alotmActhng:number;            /** 부담금현물 */
    wctTaxitmTot:number;           /**지원예산+부담금현금+부담금현물*/
    wctIoeId:string;                    /**사업비비목ID*/
    wctIoeNm:string;                    /**사업비비목명*/
}


export const UsptTaskTaxitmWctData:UsptTaskTaxitmWctPop[] =  [
    {
      taskTaxitmWctId : "String",
      taskReqstWctId : "String",
      wctTaxitmId :"String",
      wctTaxitmNm : "보수",
      computBasisCn :  "String",
      sportBudget :100,
      alotmCash :100, 
      alotmActhng :100,
      wctTaxitmTot :1005555, 
      wctIoeId : "String",
      wctIoeNm : "인건비"
    },
    {
      taskTaxitmWctId : "String",
      taskReqstWctId : "String",
      wctTaxitmId :"String",
      wctTaxitmNm : "사용임금",
      computBasisCn :  "String",
      sportBudget :100,
      alotmCash :100, 
      alotmActhng :100,
      wctTaxitmTot :100555, 
      wctIoeId : "String",
      wctIoeNm : "인건비"
  },
  {
    taskTaxitmWctId : "String",
    taskReqstWctId : "String",
    wctTaxitmId :"String",
    wctTaxitmNm : "일용임금",
    computBasisCn :  "String",
    sportBudget :100,
    alotmCash :100, 
    alotmActhng :100,
    wctTaxitmTot :100555, 
    wctIoeId : "String",
    wctIoeNm : "인건비"
},
  {
    taskTaxitmWctId : "String",
    taskReqstWctId : "String",
    wctTaxitmId :"String",
    wctTaxitmNm : "일반수용비",
    computBasisCn :  "String",
    sportBudget :100,
    alotmCash :100, 
    alotmActhng :100,
    wctTaxitmTot :100, 
    wctIoeId : "String",
    wctIoeNm : "운영비"
  },
  {
    taskTaxitmWctId : "String",
    taskReqstWctId : "String",
    wctTaxitmId :"String",
    wctTaxitmNm : "공공요금 및 제세",
    computBasisCn :  "String",
    sportBudget :100,
    alotmCash :100, 
    alotmActhng :100,
    wctTaxitmTot :100, 
    wctIoeId : "String",
    wctIoeNm : "운영비"
  },
  {
    taskTaxitmWctId : "String",
    taskReqstWctId : "String",
    wctTaxitmId :"String",
    wctTaxitmNm : "특근매식비",
    computBasisCn :  "String",
    sportBudget :100,
    alotmCash :100, 
    alotmActhng :100,
    wctTaxitmTot :100, 
    wctIoeId : "String",
    wctIoeNm : "운영비"
},
{
  taskTaxitmWctId : "String",
  taskReqstWctId : "String",
  wctTaxitmId :"String",
  wctTaxitmNm : "임차료",
  computBasisCn :  "String",
  sportBudget :100,
  alotmCash :100, 
  alotmActhng :100,
  wctTaxitmTot :100, 
  wctIoeId : "String",
  wctIoeNm : "운영비"
},
{
    taskTaxitmWctId : "String",
    taskReqstWctId : "String",
    wctTaxitmId :"String",
    wctTaxitmNm : "시설장비유지비",
    computBasisCn :  "String",
    sportBudget :100,
    alotmCash :100, 
    alotmActhng :100,
    wctTaxitmTot :100, 
    wctIoeId : "String",
    wctIoeNm : "운영비"
  },
  {
    taskTaxitmWctId : "String",
    taskReqstWctId : "String",
    wctTaxitmId :"String",
    wctTaxitmNm : "차량비",
    computBasisCn :  "String",
    sportBudget :100,
    alotmCash :100, 
    alotmActhng :100,
    wctTaxitmTot :100, 
    wctIoeId : "String",
    wctIoeNm : "운영비"
},
{
  taskTaxitmWctId : "String",
  taskReqstWctId : "String",
  wctTaxitmId :"String",
  wctTaxitmNm : "재료비",
  computBasisCn :  "String",
  sportBudget :100,
  alotmCash :100, 
  alotmActhng :100,
  wctTaxitmTot :100, 
  wctIoeId : "String",
  wctIoeNm : "운영비"
},
{
    taskTaxitmWctId : "String",
    taskReqstWctId : "String",
    wctTaxitmId :"String",
    wctTaxitmNm : "복리후생비",
    computBasisCn :  "String",
    sportBudget :100,
    alotmCash :100, 
    alotmActhng :100,
    wctTaxitmTot :100, 
    wctIoeId : "String",
    wctIoeNm : "운영비"
  },
{
  taskTaxitmWctId : "String",
  taskReqstWctId : "String",
  wctTaxitmId :"String",
  wctTaxitmNm : "일반용역비",
  computBasisCn :  "String",
  sportBudget :100,
  alotmCash :100, 
  alotmActhng :100,
  wctTaxitmTot :100, 
  wctIoeId : "String",
  wctIoeNm : "운영비"
},
{
    taskTaxitmWctId : "String",
    taskReqstWctId : "String",
    wctTaxitmId :"String",
    wctTaxitmNm : "관리용역비",
    computBasisCn :  "String",
    sportBudget :100,
    alotmCash :100, 
    alotmActhng :100,
    wctTaxitmTot :100, 
    wctIoeId : "String",
    wctIoeNm : "운영비"
  },
  ]