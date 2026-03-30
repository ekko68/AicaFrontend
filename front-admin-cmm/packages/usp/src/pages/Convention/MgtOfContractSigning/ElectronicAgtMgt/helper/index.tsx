import { CustomHeadCell } from "shared/components/TableComponents";
import {CnvnCncls} from "~/pages/Convention/MgtOfContractSigning/ElectronicAgtMgt/Model";

export const ElectronicListViewHeadCells: CustomHeadCell<CnvnCncls & {count: number}>[] = [
    {
      id: 'rn',
      align: 'center',
      label: '번호',
    },
    {
      id: 'cnvnSttusCd',
      align: "center",
      label: '협약상태',
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
      id: 'cnvnDe',
      align: "center",
      label: '제출일',
    },
    {
      id: 'cnvnTrmnatDe',
      align: "center",
      label: '제출일',
    },
  ];
