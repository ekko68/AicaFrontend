import { DefaultCheckBoxProps } from '~/components/ButtonComponents';
import {
  CustomHeadCell,
  CustomRowData,
} from '~/components/TableComponents';

export const checkBoxParam: DefaultCheckBoxProps[] = [
  { label: '사과' },
  { label: '수박' },
  { label: '당근' },
  { label: '토마토', disabled: true, checked: true },
];
export const checkinfo: DefaultCheckBoxProps[] = [
  { label: '위 유의사항을 모두 확인하였으며, 동의합니다.' }
];
export const checkinfo02: DefaultCheckBoxProps[] = [
  { label: '개인정보 수집 및 이용 동의' }
];
export const checkBoxParamBus: DefaultCheckBoxProps[] = [
  { label: '사업화' },
  { label: '창업교육' },
  { label: '시설/공간/보육' },
  { label: '멘토링/컨설팅' },
  { label: '행사/네트워크' },
  { label: 'R&D' },

];
export const checkBoxParamTrain: DefaultCheckBoxProps[] = [
  { label: '기업가정신' },
  { label: '청소년기업가정신' },
  { label: '창업기획발견' },
  { label: '창업아이디어개발' },
  { label: '비즈니스모델' },
  { label: '사업계획서' },
  { label: '기업설립/인증/제도' },
  { label: '지적재산권' },
  // { label: '인적자원(팀구성)' },
  // { label: '제품생산' },
  // { label: '유통·판매' },
  // { label: '마케팅' },
  // { label: '자금·투자' },
  // { label: '세무·회계' },
  // { label: '기업운영·관리' },
  // { label: '출구전략' },
  // { label: '글로벌' },
  // { label: '재도전' },
  // { label: '대상특별화' },
  // { label: '실전창업교육' },
];

export const pblancSttuss: DefaultCheckBoxProps[] = [
  { label: '접수대기' },
  { label: '접수중' },
  { label: '접수중단' },
  { label: '접수마감' },
];

export const infoState: DefaultCheckBoxProps[] = [
  { label: '전체' },
  { label: '접수' },
  { label: '답변완료' },
];

export const loginState: DefaultCheckBoxProps[] = [
  { label: '로그인 유지' },
  { label: '아이디 저장' },
];

export const reservState: DefaultCheckBoxProps[] = [
  { label: '전체' },
  { label: '예약신청' },
  { label: '예약확정' },
  { label: '예약취소' },
  { label: '반려' },
];

export const applyMberType: DefaultCheckBoxProps[] = [
  { label: '개인' },
  { label: '개인사업자' },
  { label: '법인사업자' },
  { label: '대학' },
  { label: '내부사용자' },
  { label: '평가위원' },
];

export const headCells: CustomHeadCell<Data>[] = [
  {
    id: 'name',
    align: 'left',
    label: 'Dessert (100g serving)',
  },
  {
    id: 'calories',
    label: 'Calories',
  },
  {
    id: 'fat',
    label: 'Fat (g)',
  },
  {
    id: 'carbs',
    label: 'Carbs (g)',
  },
  {
    id: 'protein',
    label: 'Protein (g)',
  },
];

export const bodyRows: CustomRowData<Data>[] = [
  { key: '1', ...createData('Cupcake', 305, 3.7, 67, 4.3) },
  { key: '2', ...createData('Donut', 452, 25.0, 51, 4.9) },
  { key: '3', ...createData('Eclair', 262, 16.0, 24, 6.0) },
  { key: '4', ...createData('Frozen yoghurt', 159, 6.0, 24, 4.0) },
  { key: '5', ...createData('Gingerbread', 356, 16.0, 49, 3.9) },
  { key: '6', ...createData('Honeycomb', 408, 3.2, 87, 6.5) },
  { key: '7', ...createData('Ice cream sandwich', 237, 9.0, 37, 4.3) },
  { key: '8', ...createData('Jelly Bean', 375, 0.0, 94, 0.0) },
  { key: '9', ...createData('KitKat', 518, 26.0, 65, 7.0) },
  { key: '10', ...createData('Lollipop', 392, 0.2, 98, 0.0) },
  { key: '11', ...createData('Marshmallow', 318, 0, 81, 2.0) },
  { key: '12', ...createData('Nougat', 360, 19.0, 9, 37.0) },
  { key: '13', ...createData('Oreo', 437, 18.0, 63, 4.0) },
];

export const checkBoxPartInSfSy: DefaultCheckBoxProps[] = [
  { label: '더 세분화된 영역의 전문가' },
  { label: '다양한 교육 프로그램' },
];

class Data {
  calories: number | undefined;
  carbs: number | undefined;
  fat: number | undefined;
  name: string | undefined;
  protein: number | undefined;
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
): Data {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}
