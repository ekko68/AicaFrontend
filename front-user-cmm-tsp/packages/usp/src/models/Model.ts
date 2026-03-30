import dayjs from 'dayjs';
import { BaseResponse } from 'shared/utils/Model';
export interface MemberInfo {
  authorityId: string;
  authorityNm: string;
  birthday: string;
  bizrno: string;
  blackListBeginDay: string;
  blackListEndDay: string;
  blackListReason: string;
  ceoNm: string;
  chargerNm: string;
  createdDt: string;
  creatorId: string;
  email: string;
  gender: string;
  instr: string;
  jurirno: string;
  lastLoginDt: string;
  loginId: string;
  marketingReception: string;
  memberId: string;
  memberNm: string;
  memberSt: string;
  memberStDt: string;
  memberStNm: string;
  memberType: string;
  memberTypeNm: string;
  mobileNo: string;
  nickname: string;
  updatedDt: string;
  updaterId: string;
}
export interface memberType {
  memberNm?: string /** 사업자명(사업자회원인 경우에만)  */;
  chargerNm?: string /** 담당자명(사업자회원인 경우에만)  */;
  ceoNm?: string /** 대표자명(사업자회원인 경우에만)  */;
  marketingReception: boolean /** 마케팅수신여부  */;
}

export interface changePwType {
  oldPasswd: string;
  newPasswd1: string;
  newPasswd2: string;
}
export interface BoardData {
  articleId: string;
  boardId: string;
  title: string;
  notice: boolean;
  attachmentGroupId: string | null;
  imageGroupId: string | null;
  categoryCd: string | null;
  posting: boolean;
  webEditor: boolean;
  sharedUrl: string | null;
  thumbnailFileId: string | null;
  readCnt: number;
  creatorId: string;
  createdDt: number;
  updaterId: string;
  updatedDt: number;
  rn: number;
}

export interface DataResponse extends BaseResponse {
  page: number;
  itemsPerPage: number;
  totalItems: number;
  list: BoardData[];
}

export interface NoticedetailList {
  detailCn: string | null;
  flag: string | null;
  pblancDetailId: string | null;
  sj: string | null;
}

export interface NoticeFileList {
  attachmentGroupId: string;
  attachmentId: string;
  contentType: string;
  createdDt: number;
  creatorId: string | null;
  downloadCnt: number | null;
  fileDeleted: boolean | null;
  fileNm: string | null;
  fileSize: number | null;
  updatedDt: string | null;
  updaterId: string | null;
}

export interface NoticeDataResponse extends BaseResponse {
  applyMberType: string;
  attachmentGroupId: string;
  bsnsPd: string | null;
  bsnsScale: number | null;
  chrgDeptNm: string | null;
  detailList: NoticedetailList[];
  email: string | null;
  fileList: NoticeFileList[];
  memberNm: string | null;
  nextPblancId: string | null;
  nextPblancNm: string | null;
  ordtmRcrit: boolean | null;
  pblancDay: string | null;
  pblancId: string;
  pblancNm: string | null;
  pblancNo: string | null;
  pblancSttus: string | null;
  pblancSttusCd: string | null;
  pblancSumry: string | null;
  positionNm: string | null;
  prePblancId: string | null;
  prePblancNm: string | null;
  rceptClosingHm: string | null;
  rceptPd: string | null;
  recomendCl: string | null;
  rmndrDay: number | null;
  slctnScale: number | null;
  telNo: string | null;
  thumbnailFileId: string | null;
}

export interface TermsResponse {
  beginDay: string;
  fmtBeginDay?: string;
  possessTermCd: string;
  possessTermNm: string;
  required: boolean;
  termsCn: string;
  termsType: string;
  termsTypeNm: string;
}
export interface TermCdType {
  possessTermCd: string;
}
export interface ProducerType {
  bizNum: string;
  label: string;
  error: boolean;
}
export interface reqEnterpriseType {
  adres?: string;
  ceoEmail?: string;
  ceoTelno?: string;
  cmpnyTypeCd?: string;
  cmpnyTypeNm?: string;
  emplyCnt?: string;
  empmnPrearngeNmpr?: string;
  fondDay?: Date | null | undefined;
  fondPlanCd?: string;
  fondPlanNm?: string;
  fxnum?: string;
  industRealmCd?: string;
  industRealmNm?: string;
  induty?: string;
  mainInduty?: string;
  mainTchnlgyProduct?: string;
  newFntnPlanCd?: string;
  newFntnPlanNm?: string;
  reprsntTelno?: string;
  resdngNmpr?: string;
  zip?: string;
  prvyySalamt?: number;
}

export interface reqEnterpriseType2 {
  adres?: string;
  ceoEmail?: string;
  ceoTelno?: string;
  cmpnyTypeCd?: string;
  cmpnyTypeNm?: string;
  emplyCnt?: string;
  empmnPrearngeNmpr?: string;
  fondDay?: string;
  fondPlanCd?: string;
  fondPlanNm?: string;
  fxnum?: string;
  industRealmCd?: string;
  industRealmNm?: string;
  induty?: string;
  mainInduty?: string;
  mainTchnlgyProduct?: string;
  newFntnPlanCd?: string;
  newFntnPlanNm?: string;
  reprsntTelno?: string;
  resdngNmpr?: string;
  zip?: string;
  prvyySalamt?: number;
}
export interface bzmnChangeType {
  memberType: string; // 회원유형(SOLE, CORPORATION, UNIVERCITY)
  memberNm: string; // 회원명(업체명)
  ceoNm: string; // 대표자명
  jurirno: string; // 법인등록번호
  chargerNm: string; // 담당자명
  bizrnoKey: string; // 공동인증서 인증 세션Key(세션ID)
  mobileNoCertKey: string; // 휴대폰 인증 세션Key(세션ID)
  emailCertKey: string; // 이메일 인증 세션Key(세션ID)
  certNoTel: string;
  certNoEmail: string;
}

export const bzmnChangeInitValue: bzmnChangeType = {
  memberType: '', // 회원유형(SOLE, CORPORATION, UNIVERCITY)
  memberNm: '', // 회원명(업체명)
  ceoNm: '', // 대표자명
  jurirno: '', // 법인등록번호
  chargerNm: '', // 담당자명
  bizrnoKey: '', // 공동인증서 인증 세션Key(세션ID)
  mobileNoCertKey: '', // 휴대폰 인증 세션Key(세션ID)
  emailCertKey: '', // 이메일 인증 세션Key(세션ID)
  certNoTel: '',
  certNoEmail: '',
};

export interface certNoType {
  certNoTel?: string; // 폰인증번호
  certNoEmail?: string; // 메일인증번호
}

export interface bzmnChangeErrorType {
  memberType: boolean;
  memberNm: boolean;
  ceoNm: boolean;
  jurirno: boolean;
  chargerNm: boolean;
  bizrnoKey: boolean;
  mgrTel: boolean;
  mgrEmail: boolean;
  mobileNoCertKey: boolean;
  emailCertKey: boolean;
  memberNmlabel: string;
  ceoNmlabel: string;
  jurirnolabel: string;
  chargerNmlabel: string;
  mgrTellabel: string;
  mobileNoCertKeylabel: string;
  mgrEmaillabel: string;
  emailCertKeylabel: string;
}

export interface applyTask {
  taskNmKo: string; //과제명/국문
  taskNmEn: string; //과제명(영문)
  applyRealmId: string; //과제분야ID
  rspnberNm: string;
  brthdy: string;
  mbtlnum: string;
  email: string;
  deptNm: string;
  ofcpsNm: string;
  adres: string;
  telno: string;
  fxnum: string;
  sctecrno: string;
  hopeDtyCd: string; //희망직무
  nowAdres: string; // 현 거주지
  taskTypeCd: string;
  recentSendDate:string
}

export interface chkList {
  chklstId: string;
  ceckResultDivCd: string;
}

export interface taskPartcptsList {
  brthdy: string,
  chrgRealmNm:string,
  flag: string,
  mbtlnum: string,
  partcptnRate: number,
  partcptsId: string,
  partcptsNm: string
}

export interface usptExpertClMapng {
  expertClId: string; //전문가분류 ID
}

export const initUsptExpertClMapng: usptExpertClMapng = {
  expertClId: '',
};
export interface applyBus {
  applcntEnt: reqEnterpriseType;
  applyTask: applyTask;
  chkList: chkList[];
  taskPartcptsList: taskPartcptsList[];
}

export interface applyExpert {
  expertNm: string;
  genderCd: string;
  encEmail: string;
  encMbtlnum: string;
  encBrthdy: string;
  lastUnivNm: string; //최종대학명
  univDeptNm: string; //대학학부명
  wrcNm: string; //직장명
  deptNm: string; //부서명
  ofcpsNm: string; //직위명
  dtyNm: string; //직무명
  wrcAdres: string; //직장주소
  wrcAdresDetail: string; //직장주소 상세
  wrcAdresZip: string; //직장주소우편번호
  wrcTelno: string; //직장전화번호
}

export const initApplyExpert: applyExpert = {
  expertNm: '',
  genderCd: '',
  encEmail: '',
  encMbtlnum: '',
  encBrthdy: '',
  lastUnivNm: '',
  univDeptNm: '',
  ofcpsNm: '',
  dtyNm: '',
  wrcAdres: '',
  wrcAdresDetail: '',
  wrcAdresZip: '',
  wrcTelno: '',
  wrcNm: '',
  deptNm: '',
};

export const initUsptTaskPrtcmpnyHistAfterList = {
  clsfNm: '',
  encEmail: '',
  encMbtlnum: '',
  encTelno: '',
  entrpsNm: '',
  mbtlnum: '',
  rspnberNm: '',
};
export const initUsptTaskPartcptsHistBefore = {
  clsfNm: '',
  partcptsNm: '',
  chrgRealmNm: '',
  encMbtlnum: '',
  encBrthdy: '',
  partcptnRate: '',
};
export interface applyExpertCareer {
  workBgnde: string /** 근무시작일 */;
  workEndde: string /** 근무종료일 */;
  wrcNm: string /** 직장명 */;
  deptNm: string /** 부서명 */;
  ofcpsNm: string /** 직위명 */;
  chrgJobNm: string /** 담당업무명 */;
}

export const initExpertCarrer: applyExpertCareer = {
  workBgnde: dayjs(new Date()).format('YYYYMMDD'),
  workEndde: dayjs(new Date()).format('YYYYMMDD'),
  wrcNm: '',
  deptNm: '',
  ofcpsNm: '',
  chrgJobNm: '',
};

export interface applyExpertAcdmcr {
  acdmcrBgnde: string /** 학력시작일 */;
  acdmcrEndde: string /** 학력종료일 */;
  dgriCd: string /** 학위코드 */;
  schulNm: string /** 학교명 */;
  majorNm: string /** 전공명 */;
  profsrNm: string /** 지도교수명 */;
  grdtnDivCd: string /** 졸업구분코드(G:GRDTN_DIV) */;
}

export const initExpertAcdmcr: applyExpertAcdmcr = {
  acdmcrBgnde: dayjs(new Date()).format('YYYYMMDD'),
  acdmcrEndde: dayjs(new Date()).format('YYYYMMDD'),
  dgriCd: '',
  schulNm: '',
  majorNm: '',
  profsrNm: '',
  grdtnDivCd: '',
};

export interface applyExpertCrqfc {
  acqdt: string /** 취득일 */;
  crqfcNm: string /** 자격증명 */;
  issuInsttNm: string /** 발급기관명 */;
}

export const initExpertCrqfc: applyExpertCrqfc = {
  acqdt: dayjs(new Date()).format('YYYYMMDD'),
  crqfcNm: '',
  issuInsttNm: '',
};

export const initTaskPartcptsList: taskPartcptsList = {
  brthdy: '',
  chrgRealmNm: '',
  flag: 'I',
  mbtlnum: '',
  partcptnRate: 0,
  partcptsId: '',
  partcptsNm: ''
};

export const initApplyTask: applyTask = {
  taskNmKo: '',
  rspnberNm: '',
  mbtlnum: '',
  email: '',
  taskNmEn: '',
  applyRealmId: '',
  brthdy: '',
  deptNm: '',
  ofcpsNm: '',
  adres: '',
  telno: '',
  fxnum: '',
  sctecrno: '',
  hopeDtyCd: '',
  recentSendDate:'',
  nowAdres: '',
  taskTypeCd: '',
};

export const bzmnChangeErrors: bzmnChangeErrorType = {
  memberType: false,
  memberNm: false,
  ceoNm: false,
  jurirno: false,
  chargerNm: false,
  bizrnoKey: false,
  mgrTel: false,
  mgrEmail: false,
  mobileNoCertKey: false,
  emailCertKey: false,
  memberNmlabel: '사업자명',
  ceoNmlabel: '대표자명',
  jurirnolabel: '법인등록번호',
  chargerNmlabel: '담당자명',
  mgrTellabel: '담당자 휴대폰번호',
  mobileNoCertKeylabel: '인증번호',
  mgrEmaillabel: '담당자 이메일',
  emailCertKeylabel: '인증번호',
};

export const allCkCode = {
  code: "",
  codeGroup: "PLAN_PRESENTN_STTUS",
  codeNm: "전체",
  codeType: "",
  enabled: true,
  remark: "",
  sortOrder: 1
}

export interface popularPblanc {
  pblancId : string,
  recomendCl : string,
  img? : string,
  rmndrDay : string,
  rceptPd : string,
}

export const swiperData = [
  {
    cate: '사업화',
    calculator: '마감 D-30',
    img: '/images/main/cont02_01.png',
    title:
      '2021년도 글로벌 AI 제품·서비스고도화 지원기업 모집공고 글로벌 AI 제품·서비스고도화 지원기업 모집공고',
    date: '2021-11-21 ~ 2021-12-11 18:00 (모집중)',
    link: '/NoticeDetall/pblanc-10e8368798f048f3aa263433a920166d',
  },
  {
    cate: '창업교육',
    calculator: '오늘마감',
    img: '/images/main/cont02_02.png',
    title: '지원기업 모집공고',
    date: '2021-11-21 ~ 2021-12-11 18:00 (모집중)',
    link: '/NoticeDetall/pblanc-10e8368798f048f3aa263433a920266d',
  },
  {
    cate: '멘토링/컨설팅',
    calculator: '오늘마감',
    img: '/images/main/cont02_03.png',
    title: '2021년도 글로벌 AI 제품·서비스고도화 지원기업 모집공고',
    date: '2021-11-21 ~ 2021-12-11 18:00 (모집중)',
    link: '/NoticeDetall/pblanc-10e8368798f048f3aa263433a928988d',
  },
  {
    cate: '사업화',
    calculator: '오늘마감',
    img: '/images/common/none-card.png',
    title: '2021년도 글로벌 AI 제품·서비스고도화 지원기업 모집공고',
    date: '2021-11-21 ~ 2021-12-11 18:00 (모집중)',
    link: '/NoticeDetall/pblanc-10e8368798f048f3aa263433a928988d',
  },
  {
    cate: '사업화',
    calculator: '오늘마감',
    img: '/images/main/cont02_01.png',
    title: '2021년도 글로벌 AI 제품·서비스고도화 지원기업 모집공고',
    date: '2021-11-21 ~ 2021-12-11 18:00 (모집중)',
    link: '/NoticeDetall/pblanc-10e8368798f048f3aa263433a920166d',
  },
  {
    cate: '사업화',
    calculator: '오늘마감',
    img: '/images/main/cont02_02.png',
    title: '2021년도 글로벌 AI 제품·서비스고도화 지원기업 모집공고',
    date: '2021-11-21 ~ 2021-12-11 18:00 (모집중)',
    link: '/NoticeDetall/pblanc-10e8368798f048f3aa263433a920166d',
  },
  {
    cate: '사업화',
    calculator: '마감 D-30',
    img: '/images/main/cont02_03.png',
    title: '2021년도 글로벌 AI 제품·서비스고도화 지원기업 모집공고',
    date: '2021-11-21 ~ 2021-12-11 18:00 (모집중)',
    link: '/NoticeDetall/pblanc-10e8368798f048f3aa263433a920166d',
  },
  {
    cate: '사업화',
    calculator: '마감 D-30',
    img: '/images/common/none-card.png',
    title: '2021년도 글로벌 AI 제품·서비스고도화 지원기업 모집공고',
    date: '2021-11-21 ~ 2021-12-11 18:00 (모집중)',
    link: '/NoticeDetall/pblanc-10e8368798f048f3aa263433a920166d',
  },
];
export const swiperData2 = [
  {
    cate: '사업화',
    calculator: '마감 D-30',
    img: '/images/main/cont02_01.png',
    title:
      '2021년도 글로벌 AI 제품·서비스고도화 지원기업 모집공고 글로벌 AI 제품·서비스고도화 지원기업 모집공고',
    date: '2021-11-21 ~ 2021-12-11 18:00 (모집중)',
    link: '/NoticeDetall/pblanc-10e8368798f048f3aa263433a920166d',
  },
  {
    cate: '창업교육',
    calculator: '오늘마감',
    img: '/images/main/cont02_02.png',
    title: '지원기업 모집공고',
    date: '2021-11-21 ~ 2021-12-11 18:00 (모집중)',
    link: '/NoticeDetall/pblanc-10e8368798f048f3aa263433a920266d',
  },
  {
    cate: '멘토링/컨설팅',
    calculator: '오늘마감',
    img: '/images/main/cont02_03.png',
    title: '2021년도 글로벌 AI 제품·서비스고도화 지원기업 모집공고',
    date: '2021-11-21 ~ 2021-12-11 18:00 (모집중)',
    link: '/NoticeDetall/pblanc-10e8368798f048f3aa263433a928988d',
  },
  {
    cate: '사업화',
    calculator: '오늘마감',
    img: '/images/common/none-card.png',
    title: '2021년도 글로벌 AI 제품·서비스고도화 지원기업 모집공고',
    date: '2021-11-21 ~ 2021-12-11 18:00 (모집중)',
    link: '/NoticeDetall/pblanc-10e8368798f048f3aa263433a928988d',
  },
  {
    cate: '사업화',
    calculator: '오늘마감',
    img: '/images/main/cont02_01.png',
    title: '2021년도 글로벌 AI 제품·서비스고도화 지원기업 모집공고',
    date: '2021-11-21 ~ 2021-12-11 18:00 (모집중)',
    link: '/NoticeDetall/pblanc-10e8368798f048f3aa263433a920166d',
  },
  {
    cate: '사업화',
    calculator: '오늘마감',
    img: '/images/main/cont02_02.png',
    title: '2021년도 글로벌 AI 제품·서비스고도화 지원기업 모집공고',
    date: '2021-11-21 ~ 2021-12-11 18:00 (모집중)',
    link: '/NoticeDetall/pblanc-10e8368798f048f3aa263433a920166d',
  },
  {
    cate: '사업화',
    calculator: '마감 D-30',
    img: '/images/main/cont02_03.png',
    title: '2021년도 글로벌 AI 제품·서비스고도화 지원기업 모집공고',
    date: '2021-11-21 ~ 2021-12-11 18:00 (모집중)',
    link: '/NoticeDetall/pblanc-10e8368798f048f3aa263433a920166d',
  },
  {
    cate: '사업화',
    calculator: '마감 D-30',
    img: '/images/common/none-card.png',
    title: '2021년도 글로벌 AI 제품·서비스고도화 지원기업 모집공고',
    date: '2021-11-21 ~ 2021-12-11 18:00 (모집중)',
    link: '/NoticeDetall/pblanc-10e8368798f048f3aa263433a920166d',
  },
  {
    cate: '사업화',
    calculator: '마감 D-30',
    img: '/images/main/cont02_03.png',
    title: '2021년도 글로벌 AI 제품·서비스고도화 지원기업 모집공고',
    date: '2021-11-21 ~ 2021-12-11 18:00 (모집중)',
    link: '/NoticeDetall/pblanc-10e8368798f048f3aa263433a920166d',
  },
  {
    cate: '사업화',
    calculator: '마감 D-30',
    img: '/images/common/none-card.png',
    title: '2021년도 글로벌 AI 제품·서비스고도화 지원기업 모집공고',
    date: '2021-11-21 ~ 2021-12-11 18:00 (모집중)',
    link: '/NoticeDetall/pblanc-10e8368798f048f3aa263433a920166d',
  },
  {
    cate: '사업화',
    calculator: '마감 D-30',
    img: '/images/main/cont02_03.png',
    title: '2021년도 글로벌 AI 제품·서비스고도화 지원기업 모집공고',
    date: '2021-11-21 ~ 2021-12-11 18:00 (모집중)',
    link: '/NoticeDetall/pblanc-10e8368798f048f3aa263433a920166d',
  },
  {
    cate: '사업화',
    calculator: '마감 D-30',
    img: '/images/common/none-card.png',
    title: '2021년도 글로벌 AI 제품·서비스고도화 지원기업 모집공고',
    date: '2021-11-21 ~ 2021-12-11 18:00 (모집중)',
    link: '/NoticeDetall/pblanc-10e8368798f048f3aa263433a920166d',
  },
];

export const swiperData02 = [
  {
    tit: 'AI 교육',
    desc: 'AI 실무인력 양성 및 우수 인재 양성을 위해 \nAI교육 및 AI 직무전환 교육을 운영하고 있습니다. ',
    notice: '',
    img: '/images/main/main_bg_service_01.png',
    link: '/',
  },
  {
    tit: '입주/시설',
    desc: '참신한 아이디어를 가진 기업(팀)을 지원하고자\nAI직접단지 입주자를 모집하고 있으며, \n누구나 이용할 수 있는 공유시설을 제공하고 있습니다. ',
    notice: '* 입주는 사업공고를 통해 지원받을 수 있습니다.',
    img: '/images/main/main_bg_service_02.png',
    link: '/biz/MoveInManagement/MoveInStatusMgt',
  },
  {
    tit: '실증지원',
    desc: '실증장비과 컴퓨팅자원, 데이터 저장소 등 제품 개발을 위한 \n실증테스트 인프라 구축을 지원하고 있습니다.',
    notice: '',
    img: '/images/main/main_bg_service_03.png',
    link: '/',
  },
  {
    tit: '데이터 유통',
    desc: '누구나 다양한 분야의 데이터를 손쉽게 조회하고 \n활용할 수 있는 환경을 제공하고 있습니다.',
    notice: '',
    img: '/images/main/main_bg_service_04.png',
    link: '/',
  },
  {
    tit: '데이터 안심구역',
    desc: '쉽게 접할 수 없는 다양한 분야의 공공/민간 미개방 데이터를 \n자유롭게 분석하고 활용할 수 있습니다.',
    notice: '',
    img: '/images/main/main_bg_service_05.png',
    link: '/',
  },
];
export const swiperData03 = [
  {
    tit: 'AI 투자유치 설명회',
    desc: '중소벤처기업부(장관 권칠승, 이하 중기부)는 10월 13일(수) 양재동 소재의 엘타워에서 우수한 기술력을 보유한 기술지주회사 소속 자회사를 대상으로 투자유치 설명회(IR)를 개최했다고 밝혔다. 중소벤처기업부(장관 권칠승, 이하 중기부)는 10월 13일(수) 양재동 소재의 엘타워에서 우수한 기술력을 보유한 기술지주회사 소속 자회사를 대상으로 투자유치 설명회(IR)를 개최했다고 밝혔다.',
    date: '2022. 03. 08 14:51',
    img: '/images/main/cont02_01.png',
    link: '/',
  },
  {
    tit: '지원기업 모집공고',
    desc: '중소벤처기업부(장관 권칠승, 이하 중기부)는 10월 13일(수) 양재동 소재의 엘타워에서 우수한 기술력을 보유한 기술지주회사 소속 자회사를 대상으로 투자유치 설명회(IR)를 개최했다고 밝혔다.',
    date: '2022. 03. 08 14:51',
    img: '/images/main/cont02_02.png',
    link: '/biz/MoveInManagement/MoveInStatusMgt',
  },
  {
    tit: '2021년도 글로벌 AI 제품·서비스고도화 지원기업 모집공고',
    desc: '중소벤처기업부(장관 권칠승, 이하 중기부)는 10월 13일(수) 양재동 소재의 엘타워에서 우수한 기술력을 보유한 기술지주회사 소속 자회사를 대상으로 투자유치 설명회(IR)를 개최했다고 밝혔다.',
    date: '2022. 03. 08 14:51',
    img: '/images/main/cont02_03.png',
    link: '/',
  },
];

export const searchCorpIptStep1 = [
  {
    tit: '예비',
    desc: '사업자 등록 전',
  },
  {
    tit: '초기',
    desc: '창업 3년 미만',
  },
  {
    tit: '도약',
    desc: '창업 3~7 미만',
  },
];
export const searchCorpIptStep2 = [
  { tit: '사업화' },
  { tit: '창업교육' },
  { tit: '시설/공간/보육' },
  { tit: '멘토링/컨설팅' },
  { tit: '행사/네트워크' },
  { tit: 'R&D' },
];

/*
 * 01 => 임시저장
 * 02 => 신청
 * 03 => 보완요청
 * 04 => 반려
 * 05 => 접수완료
 * 06 => 신청취소
 */
export const bizVisualToastArr = [
  {
    step: '01',
    cate: '임시저장',
    title: '[발표자료] 2021년 글로벌 AI 제품·서비스 고도화 지원기업 모집공고',
    link: '/',
  },
  {
    step: '02',
    cate: '신청',
    title: '[성과] 딥러닝 기반 버츄얼 휴면 인플루언서 개발',
    link: '/',
  },
  {
    step: '03',
    cate: '보완요청',
    title:
      '[발표자료] 2021년 글로벌 AI 제품·서비스 고도화 지원기업 모집공고 고도화 지원기업 모집공고',
    link: '/',
  },
  {
    step: '04',
    cate: '반려',
    title: '[성과] 휴면 인플루언서 개발',
    link: '/',
  },
  {
    step: '06',
    cate: '신청취소',
    title: '[발표자료] 2021년 글로벌 AI 제품·서비스 고도화 지원기업 모집공고',
    link: '/',
  },
];

// const [swiper, setSwiper] = useState(null);
export const swiperParams = {
  navigation: true,
  slidesPerView: 3.5,
  spaceBetween: 20,
  speed: 600,
  pagination: true,
  breakpoints: {
    // 반응형
    1280: {
      // 테블릿
      slidesPerView: 3.5,
    },
    760: {
      slidesPerView: 2.5,
    },
    320: {
      slidesPerView: 1.5,
    },
  },
};
export const swiperParams02 = {
  navigation: false,
  slidesPerView: 4.5,
  slidesPerGroup: 3,
  spaceBetween: 20,
  loop: true, //데이터 반복 (작동 확인용)
  speed: 600,
  pagination: true,
  breakpoints: {
    // 반응형
    1280: {
      // 테블릿
      slidesPerView: 4.5,
    },
    760: {
      slidesPerView: 2.5,
    },
    320: {
      slidesPerView: 1.5,
    },
  },
};

export const swiperParams03 = {
  navigation: true,
  slidesPerView: 1.4,
  spaceBetween: 20,
  loop: true, //데이터 반복 (작동 확인용)
  speed: 600,
  pagination: true,
  breakpoints: {
    // 반응형
    1280: {
      // 테블릿
      slidesPerView: 1.5,
    },
    320: {
      slidesPerView: 1.5,
    },
  },
};

export const mainHeadSwiper = {
  navigation: false,
  slidesPerView: 1,
  loop: true,
  speed: 300,
  pagination: true,
  autoplay: {
    delay: 5000, // css animain 시간 동일하게 수정
    disableOnInteraction: false,
  },
};

export const mainNotificationSwiper = {
  navigation: false,
  speed: 500,
  pagination: true,
  autoHeight: false,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  breakpoints: {
    1: {
      slidesPerView: 1.2,
      slidesPerGroup: 1,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 2.6,
      slidesPerGroup: 2,
      spaceBetween: 15,
    },
    1200: {
      slidesPerView: 3.6,
      slidesPerGroup: 3,
      spaceBetween: 20,
    },
  },
};

export const mainResultCorpSwiper = {
  navigation: false,
  speed: 500,
  pagination: true,
  autoHeight: false,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  breakpoints: {
    280: {
      slidesPerView: 1.2,
      slidesPerGroup: 1,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 3.6,
      slidesPerGroup: 3,
      spaceBetween: 20,
    },
  },
};

export const initProducerType = {
  bizNum: '',
  label: '사업자등록번호 또는 법인등록번호',
  error: false,
};
export const steps = [
  '약관동의/인증',
  '휴대폰 본인 인증',
  '가입정보 입력',
  '가입완료',
];

export const stepsbiz = [
  '약관동의/인증',
  '사업자 공동 인증',
  '가입정보 입력',
  '가입완료',
];

export const steps02 = ['공동인증서 인증', '추가정보입력', '전환완료'];
export const steps03 = ['약관동의', '신청자정보', '커리어정보', '신청완료'];
export const steps_reservation = ['예약시간 선택', '신청정보'];
export const business_request = ['필수확인사항', '신청자정보', '신청정보'];
export const loginState = ['로그인유지', '아이디저장'];
