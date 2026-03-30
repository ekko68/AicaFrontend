import { CustomHeadCell } from "shared/components/TableComponents";
import { CnvnChange, BsnsPlanProcessHist } from "~/pages/Convention/ContractMgt/AgtChangeDetails/Model";

export const AgtChangeDetailsListViewHeadCells: CustomHeadCell<CnvnChange & {count: number}>[] = [
    {
      id: 'rn',
      align: 'center',
      label: '번호',
    },
    {
      id: 'cnvnChangeSttusCd',
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
      id: 'cnvnChangeTypeCd',
      align: "center",
      label: '변경유형',
    },
    {
      id: 'changeIemDivCd',
      align: "center",
      label: '변경항목',
    },
    {
      id: 'memberNm',
      align: "center",
      label: '사업자명/이름',
    },
    {
      id: 'reqDe',
      align: "center",
      label: '신청일',
    },
  ];

  export const histListViewHeadCells: CustomHeadCell<BsnsPlanProcessHist & {count: number}>[] = [
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
      id: 'planPresentnSttusCd',
      align: "center",
      label: '구분',
    },
    {
      id: 'resnCn',
      align: "center",
      label: '사유',
    },
    {
      id: 'name',
      align: "center",
      label: '처리자명',
    },
    {
      id: 'creatorId',
      align: "center",
      label: '처리자ID',
    }
  ];