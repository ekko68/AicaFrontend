import React, { useEffect, useState } from 'react';
import { Button, Stack, TableCell } from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { bodyRows, checkBoxParam, headCells } from '~/pages/Temp/DummyData';
import { TabPanel } from '@mui/lab';
import dayjs from 'shared/libs/dayjs';
import { GridCellEditCommitParams, GridColumns } from '@mui/x-data-grid';
import { GridSelectionModel } from '@mui/x-data-grid/models/gridSelectionModel';
import {
  CustomButton,
  CustomCheckBoxs,
  CustomRadioButtons,
} from 'shared/components/ButtonComponents';
import {
  BlockContents,
  CustomTabs,
  HorizontalInterval,
  VerticalInterval,
} from 'shared/components/LayoutComponents';
import { ModalComponents } from 'shared/components/ModalComponents';
import { Icons } from 'shared/components/IconContainer';
import { TableComponents } from 'shared/components/TableComponents';

const Temp = () => {
  return (
    <div className="main-container">
      <CustomTabs
        tabs={[
          'table',
          'button',
          'modals',
          'basic Form',
          'data Grid',
          'Custom Table',
          'pro',
        ]}
      >
        <TabPanel value="table">
          <TableTest />
        </TabPanel>
        <TabPanel value="button">
          <ButtonTest />
        </TabPanel>
        <TabPanel value="modals">
          <ModalTest />
        </TabPanel>
        <TabPanel value="basic Form">
          <BasicForm />
        </TabPanel>
      </CustomTabs>
    </div>
  );
};

const TableTest = () => {
  return (<div/>
    // <TableComponents
    //   isCheckBox
    //   page={1}
    //   rowsPerPage={5}
    //   rowCount={0}
    //   headCells={headCells}
    //   bodyRows={bodyRows}
    //   handleClick={(key: string) => {
    //     console.log(key);
    //   }}
    //   tableCell={(index: number) => {
    //     const data = bodyRows.at(index) as any;
    //
    //     return (
    //       <>
    //         {data ? (
    //           <>
    //             <TableCell sx={{ paddingLeft: 1 }}>{data.name}</TableCell>
    //             <TableCell align="right">{data.calories}</TableCell>
    //             <TableCell align="right">{data.fat}</TableCell>
    //             <TableCell align="right">{data.carbs}</TableCell>
    //             <TableCell align="right">{data.protein}</TableCell>
    //           </>
    //         ) : (
    //           <></>
    //         )}
    //       </>
    //     );
    //   }}
    // />
  );
};

const ButtonTest = () => {
  return (
    <>
      <CustomCheckBoxs
        row
        checkbox={checkBoxParam.flatMap(m=> m.label)}
        onClick={(s: string[]) => {
          if (s.length > 0) console.log(s);
        }}
      />

      <VerticalInterval size={'50px'} />
      <CustomRadioButtons
        row
        data={['사과', '수박', '당근', '토마토']}
        onClick={(selected) => {
          console.log(selected);
        }}
      />

      <VerticalInterval size={'50px'} />
      <Stack flexDirection={'row'}>
        <CustomButton label={'목록'} color={'outlined'} />
        <CustomButton
          label={'Large Primary Button'}
          style={{ margin: '0 10px' }}
        />
        <CustomButton label={'Large Secondary Button'} color={'secondary'} />

        <HorizontalInterval size={'30px'} />
        <CustomButton label={'목록 버튼'} type={'small'} color={'list'} />
        <CustomButton
          label={'항목 버튼'}
          type={'small'}
          color={'item'}
          style={{ margin: '0 10px' }}
        />
        <CustomButton label={'검색'} type={'small'} />
      </Stack>
    </>
  );
};

const ModalTest = () => {
  type modalType = 'normal' | 'confirm';
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<modalType>('normal');
  const [data, setData] = useState(false);

  const handlerModalOpen = (type: modalType) => {
    setOpen(true);
    setType(type);
  };

  return (
    <>
      <Stack flexDirection={'row'}>
        <CustomButton
          label={'normal 모달'}
          onClick={() => {
            handlerModalOpen('normal');
          }}
        />
        <HorizontalInterval size={'30px'} />
        <CustomButton
          label={'confirm 모달'}
          onClick={() => {
            handlerModalOpen('confirm');
          }}
        />
        <HorizontalInterval size={'30px'} />
        <CustomButton
          label={'data 모달'}
          onClick={() => {
            setData(true);
            handlerModalOpen('confirm');
          }}
        />
      </Stack>

      <ModalComponents
        open={open}
        type={type}
        title={'H2'}
        content={type.toString() + ' 모달'}
        onConfirm={() => {
          setOpen(false);
        }}
        onClose={() => {
          setOpen(false);
          if (data) setData(false);
        }}
      >
        {data && <TableTest />}
      </ModalComponents>
    </>
  );
};

const BasicForm = () => {
  return (
    <>
      <BlockContents title={'테이블 솰라솰라'}></BlockContents>
      <TableTest />

      <BlockContents
        title_sub={'서브타이틀'}
        rightContent={
          <Stack flexDirection={'row'}>
            <Button style={{ width: '24px', height: '24px' }}>
              {<Icons.Exit />}
            </Button>
            <Button style={{ width: '24px', height: '24px' }}>
              {<Icons.Exit />}
            </Button>
          </Stack>
        }
      >
        <p>
          뷰 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용
          내용 내용 내용 내용 내용 내용 내용{' '}
        </p>
      </BlockContents>
    </>
  );
};

export default Temp;
