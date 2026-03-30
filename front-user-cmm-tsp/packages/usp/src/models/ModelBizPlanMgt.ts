import dayjs from 'dayjs';
export interface planInput {
    presentnDtStart : string,
    presentnDtEnd: string,
    planPresentnSttusCd : string,
    pblancNm : string ,
    taskNmKo : string
    page : number,
    itemsPerPage : number ,
}

export const initPlanInput:planInput = {
    presentnDtStart: dayjs(new Date()).format('YYYY-MM-DD'),
    presentnDtEnd: dayjs(new Date()).format('YYYY-MM-DD'),
    planPresentnSttusCd: '',
    pblancNm: '',
    taskNmKo: '',
    page: 1,
    itemsPerPage:5,
}
export interface BsnsPlanDoc {
    bsnsPlanDocId: string,            // 	사업계획서ID
    bsnsSlctnId: string,          // 	사업선정대상ID
    taskNmKo:string,             // 	과제명(한글)
    taskNmEn: string,             // 	과제명(영문)
    applyField:  string,           // 	지원분야
    prsentrAttachmentGroupId: string,             // 	제출첨부파일그룹ID
    planPresentnSttusCd: string,           // 	사업계획제출상태코드
    bsnsNm: string,               // 	사업명
    bsnsYear: string,              // 	사업년도
    receiptNo: string,            // 	접수번호
    pblancNm: string,             // 	공고명
    bsnsBgnde: string,            // 	사업시작일
    bsnsEndde: string,            // 	사업종료일
    bsnsPd: string,               // 	사업기간
    bsnsPdAll: string,            // 	사업기간(전체
    bsnsPdYw: string,             // 	사업기간(당해)
    partcptnCompanyCnt: number,   // 	참여기업수
    smlpzCnt: number,             // 	중소기업수
    mspzCnt: number,              // 	중견기업수
    etcCnt: number               // 	기타수
}
export interface TaskRspnber {
    rspnberNm: string,       //	책임자명
    encBrthdy: string,       //	생년월일
    encMbtlnum: string,      //	휴대폰번호
    encEmail: string,        //	이메일
    deptNm: string,          //	부서명
    clsfNm: string,          //	직급명
    adres: string,           //	주소
    encTelno: string,        //	유선번호
    encFxnum: string,        //	팩스번호
    tlsyRegistNo: string,    //	과학기술인등록번호
}
export interface TaskPrtcmpny {
    entrpsNm: string,    //	업체명
    rspnberNm: string,   //	책임자명
    clsfNm: string,  //	직급명
    regTelno: string,    //	전화번호
    regMbtlnum: string,  //	휴대폰번호
    regEmail: string    //	이메일
}
export interface TaskPartcpts {
    partcptsNm: string,   //	참여자명
    chrgRealmNm: string,  //	담당분야명
    encMbtlnum: string,   //	휴대폰번호
    encBrthdy: string,    //	생년월일
    partcptnRate: number, //	참여율
    memberId: string,     //	회원ID
    memberNm: string     //	회원명
}

export interface TaskReqstWct {
    bsnsYear: string,     //	사업년도
    tot_bsns_pd:number,   //	종사업년도(년)
    sportBudget: number,  //	지원예산
    alotmCash: number,    //	부담금현금
    alotmActhng: number,  //	부담금현물
    alotmSum: number,     //	부담금소계
    alotmSumTot: number      //	부담금합계
}

// 사업계획서 관리상세
export interface BsnsPlanDocInfo {
    usptBsnsPlanDoc: BsnsPlanDoc,         //	사업년도
    usptTaskRspnber: TaskRspnber,         //	지원예산
    usptTaskPrtcmpny: TaskPrtcmpny[],       //	부담금현금
    usptTaskPartcpts: TaskPartcpts[],       //	부담금현물
    usptTaskReqstWct: TaskReqstWct[],       //	부담금소계
}
// 사업시 합계
export type sumType = {
    sum1:number
    sum2:number
    sum3:number
    sum4:number
    sum5:number
}

// 비목별 사업비 합계 및 소계
export interface TaskReqstWctSum {
    ReqstWctSum1: sumType,         //	인건비 소계
    ReqstWctSum2: sumType,         //	운용비 소계
    ReqstWctSum3: sumType,        //	합계
}

export const BsnsPlanDocInfoData:BsnsPlanDocInfo = {
    usptBsnsPlanDoc: {
        bsnsPlanDocId: '',
        bsnsSlctnId: '',
        taskNmKo:'',
        taskNmEn: '',
        applyField:  'FREE',
        prsentrAttachmentGroupId: '',
        planPresentnSttusCd: '', 
        bsnsNm: '',
        bsnsYear: '', 
        receiptNo: '',
        pblancNm: '',
        bsnsBgnde: '',
        bsnsEndde: '',
        bsnsPd: '',
        bsnsPdAll: '',
        bsnsPdYw: '',
        partcptnCompanyCnt: 0,
        smlpzCnt: 0,
        mspzCnt: 0,
        etcCnt: 0        
    },
    usptTaskRspnber: {       
        rspnberNm: 'dasdasd',
        encBrthdy: 'asda',
        encMbtlnum: 'adsd',
        encEmail: 'dasad',
        deptNm: 'dasda',
        clsfNm: 'adsdasd',
        adres: '',
        encTelno: 'adsdasd',
        encFxnum: '',
        tlsyRegistNo: 'asdasdasd',
    },
    usptTaskPrtcmpny: [
        {
            entrpsNm: 'asdasda',
            rspnberNm: 'asdasd',
            clsfNm: 'adsdasd',
            regTelno: 'dasdas',
            regMbtlnum: 'asdas',
            regEmail: 'dasdas'
        }	
    ],
    usptTaskPartcpts: [
        {
            
            partcptsNm: '',
            chrgRealmNm: '',
            encMbtlnum: '',
            encBrthdy: '',
            partcptnRate: 0,
            memberId: '',
            memberNm: ''
        }
    ],
    usptTaskReqstWct: [
        {            
            bsnsYear: '2021년',
            tot_bsns_pd:1,
            sportBudget: 0,
            alotmCash: 0,
            alotmActhng: 0,
            alotmSum: 0,
            alotmSumTot: 0          
        }
    ]
}
