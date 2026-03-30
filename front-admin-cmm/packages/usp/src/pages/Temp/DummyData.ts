import {DefaultCheckBoxProps} from "shared/components/ButtonComponents";
import {CustomHeadCell, WithCustomRowData} from "shared/components/TableComponents";


export const checkBoxParam: DefaultCheckBoxProps[] = [
  { label: '사과' },
  { label: '수박' },
  { label: '당근' },
  { label: '토마토', disabled: true, checked: true },
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

export const bodyRows: WithCustomRowData<Data>[] = [
  { key: '1', ...createData('Cupcake', 305, 3.7, 67, 4.3) },
  { key: '2', ...createData('Donut', 452, 25.0, 51, 4.9) },
  { key: '3', ...createData('Eclair', 262, 16.0, 24, 6.0) },
  { key: '4', ...createData('Frozen yoghurt', 159, 6.0, 24, 4.0) },
  { key: '5', ...createData('Gingerbread', 356, 16.0, 49, 3.9) },

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
