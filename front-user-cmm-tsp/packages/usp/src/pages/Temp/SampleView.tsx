import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Stack, TableCell } from '@mui/material';
import { bodyRows, checkBoxParam, checkBoxParamTrain, headCells } from '~/pages/Temp/DummyData';
import { TabPanel } from '@mui/lab';
import { DataService } from '~/service/DataService';
import { BoardData } from '~/service/Model';
import dayjs from 'shared/libs/dayjs';
import { GridCellEditCommitParams } from '@mui/x-data-grid';
import { GridSelectionModel } from '@mui/x-data-grid/models/gridSelectionModel';
import { EquipmentClassify } from '~/pages/EquipmentClassify/EquipmentClassify';
import {
  CustomButton,
  CustomRadioButtons,
  DefaultCheckBoxProps,
} from '~/components/ButtonComponents';
import {
  CustomTabs,
  HorizontalInterval,
  VerticalInterval,
} from '~/components/LayoutComponents';
import { CustomCheckBoxs } from '../../components/ButtonComponents';
import { ModalComponents } from '~/components/SharedModalComponents';
import DataTable from '~/components/CustomDataGride';
import { TableComponents } from '~/components/TableComponents';
import { useNavigate } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import { CustomTodoList } from '~/components/DataTable/TodoList';
// import HoverMenu from 'material-ui-popup-state/HoverMenu';
// import {
//   usePopupState,
//   bindHover,
//   bindFocus,
//   bindMenu,
// } from 'material-ui-popup-state/hooks'


const Temp = () => {
  const navigate = useNavigate();
  const [checkList, setCheckList] = React.useState(checkBoxParamTrain);

  return (
    <div>
      <CustomButton label={'홈 페이지'} type={'small'} color={'secondary'} onClick={()=>{navigate('/')}}/>
      <CustomButton label={'로그인'} type={'small'} color={'secondary'} onClick={()=>{navigate('/signin')}}/>
      <CustomButton label={'회원가입'} type={'small'} color={'secondary'} onClick={()=>{navigate('/signup')}}/>
      <CustomButton label={'공고알림'} type={'small'} color={'secondary'} onClick={()=>{navigate('/Notice/Notice')}}/>
      <Fade bottom>
        <CustomTabs
          tabs={[
            'table',
            'button',
            'modals',
            'basic Form',
            'data Grid',
            'Custom Table',
            'TodoList',
            // 'cascading hover menus',
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
            {/* <BasicForm /> */}
          </TabPanel>

          <TabPanel value="data Grid">
            <DataGrideTest />
          </TabPanel>

          <TabPanel value="Custom Table">
            <EquipmentClassify />
          </TabPanel>

          <TabPanel value="TodoList">
            <CustomTodoList  
              dataList={checkList}
              onChangeBox={(s: DefaultCheckBoxProps[]) => {
                if (s.length > 0) console.log(s);
              }}
              children={<TableTest />}
            />
            {/* <DataGridProTest /> */}
          </TabPanel>

          {/* <TabPanel value="cascading hover menus">
            <CascadingHoverMenus />
            <CascadingHoverMenus />
            <CascadingHoverMenus />
            <CascadingHoverMenus />
            <CascadingHoverMenus />
          </TabPanel> */}

          
        </CustomTabs>
      </Fade>
    </div>
  );
};
// const DataGridProTest = () => {
//   const { data } = useDemoData({
//     dataSet: 'Commodity',
//     rowLength: 100000,
//     editable: true,
//   });

//   console.log(JSON.stringify(data));
//   return (
//     <DataGridPro
//       sx={{ height: '500px' }}
//       {...data}
//       loading={data.rows.length === 0}
//       rowHeight={38}
//       checkboxSelection
//       disableSelectionOnClick
//     />
//   );
// };

const TableTest = () => {
  return (
    <TableComponents
      isCheckBox
      headCells={headCells}
      bodyRows={bodyRows}
      handleClick={(key: string) => {
        console.log(key);
      }}
      tableCell={(index: number) => {
        const data = bodyRows.at(index) as any;

        return (
          <>
            {data ? (
              <>
                <TableCell sx={{ paddingLeft: 1 }}>{data.name}</TableCell>
                <TableCell align="right">{data.calories}</TableCell>
                <TableCell align="right">{data.fat}</TableCell>
                <TableCell align="right">{data.carbs}</TableCell>
                <TableCell align="right">{data.protein}</TableCell>
              </>
            ) : (
              <></>
            )}
          </>
        );
      }}
    />
  );
};
const KAKAO_MAPS_API_KEY = 'a7fafaac19b61ed153a9e91cb64582d3';
const {kakao} = window;
function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }
  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}
const ButtonTest = () => {
  const loaded = useRef(false); 
  const [scrollPosition, setScrollPosition] = useState(0);
  if (typeof window !== 'undefined' && !loaded.current ) {
    if (!document.querySelector('#kakao_maps')) {
      loadScript(
        `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAPS_API_KEY}`,
        document.querySelector('#myMap'),
        'kakao_maps',
      );
    }
    loaded.current = true;
  }
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
    console.log(position)
  };

  const KakaoMapScript = () => {
    kakao.maps.load(() => {
      const container = document.getElementById('myMap');
      // const container1 = document.getElementById('aiVehicleDemonstrationCenter');
      // const container2 = document.getElementById('aiEnergyDemonstrationCenter');
      // const container3 = document.getElementById('aiHealthcareDemonstrationCenter');
  
      const options = {
          center: new kakao.maps.LatLng(33.55635, 126.795841),
          level: 3
      };
      const map = new kakao.maps.Map(container, options);
      // const map1 = new kakao.maps.Map(container1, options);
      // const map2 = new kakao.maps.Map(container2, options);
      // const map3 = new kakao.maps.Map(container3, options);
    })
  }

  return (
    <>
      <div  style={{ height:900 }}>
        <h1>{scrollPosition}</h1>
      <CustomCheckBoxs
        row
        checkbox={checkBoxParam}
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
      <CustomButton label={'더보기'} type={'full'} color={'item'} style={{ margin: '10px 0' }} />
      <div id='myMap'></div>
      </div>
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


// //#region
// const useCascadingMenuStyles:any = makeStyles((theme: { spacing: (arg0: number) => any; }) => ({
//   submenu: {
//     marginTop: theme.spacing(-1),
//   },
//   title: {
//     flexGrow: 1,
//   },
//   moreArrow: {
//     marginRight: theme.spacing(-1),
//   },
// }))

// const CascadingContext = React.createContext({
//   parentPopupState: null,
//   rootPopupState: null,
// })

// function CascadingMenuItem({ onClick, ...props }: {
//   [x: string]: any;
//   onClick: any;
// }): JSX.Element {
//   const { rootPopupState }:any = React.useContext(CascadingContext)
//   if (!rootPopupState) throw new Error('must be used inside a CascadingMenu')
//   const handleClick = React.useCallback(
//     (event:any) => {
//       rootPopupState.close(event)
//       if (onClick) onClick(event)
//     },
//     [rootPopupState, onClick]
//   )
//   return <MenuItem {...props} onClick={handleClick} />
// }

// function CascadingSubmenu({ title, popupId, ...props }: {
//   [x: string]: any;
//   title: any;
//   popupId: any;
// }): JSX.Element {
//   const classes = useCascadingMenuStyles()
//   const { parentPopupState } = React.useContext(CascadingContext)
//   const popupState = usePopupState({
//     popupId,
//     variant: 'popover',
//     parentPopupState,
//   })
//   return (
//     <React.Fragment>
//       <MenuItem {...bindHover(popupState)} {...bindFocus(popupState)}>
//         <span className={classes.title}>{title}</span>
//         <ChevronRight className={classes.moreArrow} />
//       </MenuItem>
//       <CascadingMenu
//         {...props}
//         classes={{ ...props.classes, paper: classes.submenu }}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'left' }}
//         popupState={popupState}
//       />
//     </React.Fragment>
//   )
// }

// function CascadingMenu({ popupState, ...props }: {
//   [x: string]: any;
//   popupState: any;
// }): JSX.Element{
//   const { rootPopupState } = React.useContext(CascadingContext)
//   const context = React.useMemo(
//     () => ({
//       rootPopupState: rootPopupState || popupState,
//       parentPopupState: popupState,
//     }),
//     [rootPopupState, popupState]
//   )

//   return (
//     <CascadingContext.Provider value={context}>
//       <HoverMenu {...props} {...bindMenu(popupState)} />
//     </CascadingContext.Provider>
//   )
// }

// const CascadingHoverMenus = () => {
//   const popupState = usePopupState({
//     popupId: 'demoMenu',
//     variant: 'popover',
//   })
//   return (
//     <div style={{ height:50,display:'inline-flex',margin:5 }}>
//       <Button
//         variant="contained"
//         {...bindHover(popupState)}
//         {...bindFocus(popupState)}
//       >
//         Hover to open Menu
//       </Button>
//       <CascadingMenu
//         popupState={popupState}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'left' }}
//       >
//         <CascadingMenuItem onClick={undefined}>Tea</CascadingMenuItem>
//         <CascadingMenuItem onClick={undefined}>Cake</CascadingMenuItem>
//         <CascadingMenuItem onClick={undefined}>Death</CascadingMenuItem>
//         <CascadingSubmenu
//           popupId="moreChoicesCascadingMenu"
//           title="More Choices"
//         >
//           <CascadingMenuItem onClick={undefined}>Cheesecake</CascadingMenuItem>
//           <CascadingMenuItem onClick={undefined}>Cheesedeath</CascadingMenuItem>
//           {/* <CascadingSubmenu
//             popupId="evenMoreChoicesCascadingMenu"
//             title="Even More Choices"
//           >
//             <CascadingMenuItem onClick={undefined}>Cake (the band)</CascadingMenuItem>
//             <CascadingMenuItem onClick={undefined}>Death Metal</CascadingMenuItem>
//           </CascadingSubmenu>
//           <CascadingSubmenu
//             popupId="moreBenignChoices"
//             title="More Benign Choices"
//           >
//             <CascadingMenuItem onClick={undefined}>Salad</CascadingMenuItem>
//             <CascadingMenuItem onClick={undefined}>Lobotomy</CascadingMenuItem>
//           </CascadingSubmenu> */}
//         </CascadingSubmenu>
//       </CascadingMenu>
//     </div>
//   )
// }
// //#endregion



const DataGrideTest = () => {
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 5,
    rowCount: 0,
  });

  const { data, isLoading } = DataService.BasicBoard(pagination);
  const [list, setList] = useState<BoardData[]>([]);

  useEffect(() => {
    if (!!data) {
      setList(data.list);

      // 게시물 총 갯수
      setPagination((state) => ({ ...state, rowCount: data.totalItems }));
    }
  }, [data]);

  //* 데이터 로드 후 Datagrid 설정 :GridRowEntry<{title:string, updateDt: string}>[]
  const rows = list.map((v) => {
    return {
      id: v.rn,
      title: v.title,
      updatedDt: dayjs(v.updatedDt).format('YYYY-MM-DD'),
    };
  });

  const columns: any = [
    { field: 'id', headerName: 'ID', flex: 1, headerAlign: 'center' },
    {
      field: 'title',
      headerName: '제목',
      flex: 10,
      headerAlign: 'center',
      editable: true,
    },
    {
      field: 'updatedDt',
      headerName: '업데이트',
      flex: 2,
      headerAlign: 'center',
    },
  ];

  return (
    <DataTable
      isCheckBox
      loading={isLoading}
      columns={columns}
      rows={rows}
      {...pagination}
      onPageChange={(page: number) => {
        setPagination((state) => ({ ...state, page }));
      }}
      onPageSizeChange={(pageSize: number) => {
        setPagination((state) => ({ ...state, pageSize }));
      }}
      onCellEditCommit={(data: GridCellEditCommitParams) => {
        console.log(JSON.stringify(data));
      }}
      onSelectionModelChange={(data: GridSelectionModel) => {
        console.log(JSON.stringify(data));
      }}
    />
  );
};
export default Temp;
