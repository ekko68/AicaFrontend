import { CustomHeadCell } from "shared/components/TableComponents";
import { 
  UspBsnsPlan as TEntity, 
  BsnsPlanProcessHist, 
  UsptTaskPrtcmpny,
  UsptTaskPartcpts,
  CmmtAttachment
} from "../Model";


export const busPlanListViewHeadCells: CustomHeadCell<TEntity & {count: number}>[] = [
    {
      id: 'rn',
      align: 'center',
      label: '번호',
    },
    {
      id: 'planPresentnSttusCd',
      align: "center",
      label: '처리상태',
    },
    {
      id: 'receiptNo',
      align: "center",
      label: '접수번호',
    },
    {
      id: 'taskNmKo',
      align: "center",
      label: '과제명',
    },
    {
      id: 'bsnsYear',
      align: "center",
      label: '사업연도',
    },
    {
      id: 'bsnsNm',
      align: "center",
      label: '사업명',
    },
    {
      id: 'pblancNm',
      align: "center",
      label: '공고명',
    },
    {
      id: 'memberNm',
      align: "center",
      label: '회원명',
    },
    {
      id: 'presentnDy',
      align: "center",
      label: '제출일',
    },
  ];

  export const TaskPrtCmpnyListViewHeadCells: CustomHeadCell<UsptTaskPrtcmpny & {count: number}>[] = [
    {
      id: 'entrpsNm',
      align: "center",
      label: '업체명',
      
    },
    {
      id: 'rspnberNm',
      align: 'center',
      label: '책임자명',
    },
    {
      id: 'clsfNm',
      align: "center",
      label: '직위/직급',
    },
    {
      id: 'telno',
      align: "center",
      label: '연락처',
    },
    {
      id: 'mbtlnum',
      align: "center",
      label: '휴대전화',
    },
    {
      id: 'email',
      align: "center",
      label: '이메일',
    },
    {
      id: 'tlsyRegistNo',
      align: "center",
      label: '과학기술등록번호',
    }
  ];

  export const TaskPartcptsListViewHeadCells: CustomHeadCell<UsptTaskPartcpts & {count: number}>[] = [
    {
      id: 'partcptsNm',
      align: 'center',
      label: '이름',
    },
    {
      id: 'chrgRealmNm',
      align: "center",
      label: '담당분야',
    },
    {
      id: 'encMbtlnum',
      align: "center",
      label: '휴대폰번호',
    },
    {
      id: 'encBrthdy',
      align: "center",
      label: '생년월일',
    },
    {
      id: 'partcptnRate',
      align: "center",
      label: '참여율(%)',
    }
  ];

  export const AttachFileListViewHeadCells: CustomHeadCell<CmmtAttachment & {count: number}>[] = [
    {
      id: 'rn',
      align: 'center',
      label: '번호',
    },
    {
      id: 'fileNm',
      align: "center",
      label: '파일명',
    },
    {
      id: 'fileSize',
      align: "center",
      label: '용량',
    },
    {
      id: 'attachmentId',
      align: "center",
      label: '다운로드',
    }
  ];

  export const busPlanHistListViewHeadCells: CustomHeadCell<BsnsPlanProcessHist & {count: number}>[] = [
    {
      id: 'rn',
      align: "center",
      label: '번호',
      
    },
    {
      id: 'createdDt',
      align: 'center',
      label: '처리일시',
    },
    {
      id: 'planPresentnSttusNm',
      align: "center",
      label: '구분',
    },
    {
      id: 'resnCn',
      align: "center",
      label: '사유',
    },
    {
      id: 'creatorNm',
      align: "center",
      label: '처리자명',
    },
    {
      id: 'creatorId',
      align: "center",
      label: '처리자ID',
    }
  ];