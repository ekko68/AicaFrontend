import { CustomHeadCell } from "shared/components/TableComponents";
import { CnvnTrmnat as TEntity, BsnsPlanProcessHist } from "~/pages/Convention/ContractMgt/AgtTerminationMgt/Model";

export const AgtChangeListViewHeadCells: CustomHeadCell<TEntity & {count: number}>[] = [
    {
      id: 'rn',
      align: 'center',
      label: '번호',
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
      id: 'memberNm',
      align: "center",
      label: '사업자명/이름',
    },
    {
      id: 'cnvnTrmnatDeStart',
      align: "center",
      label: '협약시작일',
    },
    {
      id: 'cnvnTrmnatDeEnd',
      align: "center",
      label: '협약종료일',
    },
    {
      id: 'resnCn',
      align: "center",
      label: '해지사유',
    },
    {
      id: 'cnvnTrmnatDe',
      align: "center",
      label: '해지일',
    }
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