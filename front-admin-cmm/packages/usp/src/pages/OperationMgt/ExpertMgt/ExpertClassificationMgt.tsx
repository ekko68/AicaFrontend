// 전문가관리/ ->  전문가분류관리 페이지
import React, {Dispatch, Fragment, SetStateAction, useEffect, useState} from "react"
import {SubContents, TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import {Stack, TableCell} from "@mui/material";
import {
  categoryFlatten,
  dummyExpertManager,
  경력정보,
  전문가단분류,
  전문가분류관리_담당자
} from "~/pages/OperationMgt/ExpertMgt/Model/Model";
import {TreeItem, TreeItemContentProps, TreeView, useTreeItem} from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import * as R from "ramda";
import {Color} from "shared/components/StyleUtils";
import {GridCellEditCommitParams, GridColumns} from "@mui/x-data-grid";
import {CustomButton, CustomIconButton} from "shared/components/ButtonComponents";
import {Icons} from "shared/components/IconContainer";
import DataTable from "shared/components/CustomDataGride";
import {GridSelectionModel} from "@mui/x-data-grid/models/gridSelectionModel";
import {GridRowOrderChangeParams} from "@mui/x-data-grid-pro";
import Box from "@mui/material/Box";
import clsx from "clsx";
import Typography from "@mui/material/Typography";
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {
  CustomHeadCell,
  DateTermCell,
  TableComponents,
  TableTextFieldCell,
  WithCustomRowData
} from "shared/components/TableComponents";
import {ExpertMgtService} from "~/pages/OperationMgt/ExpertMgt/Service/ExpertMgtService";
import {ModalComponents} from "shared/components/ModalComponents";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";

function ExpertClassificationMgt() {
  const [currentId, setCurrentId] = useState('')
  const [root, setRoot] = useState<전문가단분류>()
  const [editRows, setEditRow] = useState<전문가단분류[]>([])
  const {addModal} = useGlobalModalStore();
  // const classification = ExpertMgtService.getClassification()
  //
  // useEffect(() => {
  //   if (!classification.isLoading && !classification.isFetching) {
  //     if (!!classification.data) {
  //       const root = dataHierarchy(R.pipe(JSON.stringify, JSON.parse)(classification.data))
  //       setRoot(root)
  //
  //     }
  //   }
  // }, [classification.data, classification.isLoading, classification.isFetching])

  useEffect(() => {
    const root = dataHierarchy(R.pipe(JSON.stringify, JSON.parse)(categoryFlatten))
    setRoot(root)
    handlerTreeClick(root)
  }, [])

  const handlerTreeClick = (expert: 전문가단분류) => {
    setCurrentId(expert.id)
    if (expert.child) {
      const data = expert.child.map((m, i) => {
        return {
          id: m.id,
          전문가단명: m.전문가단명,
          부모Id: m.부모Id,
          순서: m.순서,
          depth: m.depth,
          사용여부: m.사용여부
        }
      }).sort((a, b) => a.순서 - b.순서)

      setEditRow(data)
    } else {
      setEditRow([])
    }
  }

  return <TitleContents title={"전문가분류관리"}>
    <Stack
      flexDirection={"row"}
      justifyContent={"space-between"}
    >
      <LeftTreeView
        root={root}
        onClickTree={handlerTreeClick}/>

      <Stack spacing={'100px'} width={'100%'}>
        <RightTableView
          tableRows={editRows}
          // isLoading={category.isLoading || category.isFetching}
          isLoading={false}
          parentId={currentId}
          setTableRows={setEditRow}
          onPresSave={async (req: 전문가단분류[]) => {
            // const updateClassification = await ExpertMgtService.putClassification(currentId, req)
            // if (!updateClassification.success) return;

            addModal({open: true, isDist: true, type: 'confirm', content: "저장 완료."})

            // 변경된 데이터 갱신해줘야함.
          }}
          onPressDelete={async (req: 전문가단분류[]) => {
            // const updateClassification = await ExpertMgtService.deleteClassification(currentId, req)
            // if (!updateCategory.success) return;

            addModal({open: true, isDist: true, content: "삭제 완료."})

            // 데이터 갱신.
            const deleteIds = req.flatMap(m => m.id)
            setEditRow(editRows.filter(f => !deleteIds.includes(f.id)))
          }}
        />

        <AuthManager/>
      </Stack>
    </Stack>
  </TitleContents>
}

const Item: React.FC<{
  depth: number
  expert: 전문가단분류,
  onClick: (expert: 전문가단분류) => void
}> = props => {
  const isDepth = props.depth < 2
  return <>
    {
      isDepth && <TreeItem
        ContentComponent={CustomContent}
        nodeId={props.expert.id}
        label={
          <div onClick={() => props.onClick(props.expert)}>
            {props.expert.전문가단명}
          </div>
        }>
        {
          props.expert.child?.map((m, i) => {
            return <Item key={i} depth={props.depth + 1} expert={m} onClick={props.onClick}/>
          })
        }
      </TreeItem>
    }
  </>
}

const LeftTreeView: React.FC<{
  root: 전문가단분류 | undefined
  onClickTree: (equipment: 전문가단분류) => void
}> = props => {
  // const root = dataHierarchy(R.pipe(JSON.stringify, JSON.parse)(props.list))

  return <TreeView
    defaultCollapseIcon={<ExpandMoreIcon/>}
    defaultExpandIcon={<ChevronRightIcon/>}
    defaultExpanded={['root']}
    sx={{overflowY: 'auto', minWidth: '180px', marginRight: "10px", border: "solid 1px", borderColor: Color.divider}}>
    <TreeItem
      ContentComponent={CustomContent}
      nodeId={"root"}
      label={
        <div onClick={() => props.onClickTree(props.root!)}>
          {"장비분류"}
        </div>
      }>
      {
        props.root?.child && props.root.child.map((m, i) => {
          return <Item key={i} depth={1} expert={m} onClick={props.onClickTree}/>
        })
      }
    </TreeItem>
  </TreeView>
}

const AuthManager = () => {
  // const authManager = ExpertMgtService.getAuthManager()
  const [expertManagerRowList, setExpertManagerRowList] = useState<WithCustomRowData<전문가분류관리_담당자>[]>(dummyExpertManager)
  const [expertSelected, setExpertSelected] = useState<string[]>([])
  const [expertManagerModal, setExpertManagerModal] = useState(false)
  const {addModal} = useGlobalModalStore()

  // useEffect(() => {
  //   if (!authManager.isLoading && !authManager.isFetching) {
  //     if (!!authManager.data) {
  //       setExpertManagerRowList(authManager.data.map(m => {
  //         return {
  //           key: m.id,
  //           ...m
  //         }
  //       }))
  //     }
  //   }
  // }, [authManager.data, authManager.isLoading, authManager.isFetching])

  return <Fragment>
    <SubContents
      title={"AICA 전문단 (창업지원)"}
      maxHeight={"100%"}
      rightContent={
        <Stack flexDirection={"row"}>
          <CustomIconButton
            icon={Icons.Trash}
            onClick={async () => {
              // const res = await ExpertMgtService.deleteAuthManager(expertManagerRowList.filter(f => expertSelected.includes(f.key)))
              // if (!res.success) return

              addModal({open: true, isDist: true, content: '삭제되었습니다.'})
              setExpertManagerRowList(expertManagerRowList.filter(f => !expertSelected.includes(f.key)))
            }}/>

          <CustomIconButton
            icon={Icons.Plus}
            onClick={() => {
              setExpertManagerModal(true)
            }}/>
        </Stack>
      }>
      <TableComponents<전문가분류관리_담당자>
        isCheckBox hidePagination hideRowPerPage
        hideBoarderTopColor page={0} rowCount={0} rowsPerPage={0}
        headCells={managerHeadCells}
        bodyRows={expertManagerRowList}
        onSelectedKey={(keys: string[]) => {
          setExpertSelected(keys)
        }}
        tableCell={(data, i) => {

          return <Fragment>
            <TableCell key={"부서명-" + data.key} sx={{textAlign: 'center'}}>{data.부서명}</TableCell>
            <TableCell key={"이름-" + data.key} sx={{textAlign: 'center'}}>{data.이름}</TableCell>
            <TableCell key={"직급-" + data.key} sx={{textAlign: 'center'}}>{data.직급}</TableCell>
          </Fragment>
        }}/>
    </SubContents>

    {
      expertManagerModal && <ExpertManagerAddModal
        open={expertManagerModal}
        onClose={() => setExpertManagerModal(false)}
        onSelect={async (data) => {
          // const res = await ExpertMgtService.postAuthManager(data)
          // if (!res.success) return

          setExpertManagerRowList(expertManagerRowList.concat(data))
          setExpertManagerModal(false)
        }}
      />}
  </Fragment>
}

const RightTableView: React.FC<{
  tableRows: 전문가단분류[]
  parentId: string
  setTableRows: Dispatch<SetStateAction<전문가단분류[]>>
  isLoading: boolean
  onPresSave: (req: 전문가단분류[]) => void
  onPressDelete: (req: 전문가단분류[]) => void
}> = props => {
  const [removeData, setRemoveData] = useState<전문가단분류[]>([])

  const columns: GridColumns = [
    {field: 'id', hide: true},
    {field: 'ordr', headerName: '순서', flex: 2, headerAlign: 'center'},
    {field: '전문가단명', headerName: '분류명', flex: 10, headerAlign: 'center', editable: true},
    {
      field: 'useAt',
      headerName: '사용여부',
      flex: 2,
      headerAlign: 'center',
      type: "singleSelect",
      valueOptions: ["사용", "미사용"],
      editable: true
    },
  ]

  // if (props.tableRows.length == 0) return <></>

  return <SubContents
    title={"AICA 전문단 (창업지원)"}
    maxHeight={"100%"}
    rightContent={
      <Stack flexDirection={"row"}>
        <CustomIconButton
          icon={Icons.Trash}
          onClick={() => {
            if (removeData.length > 0) {
              props.onPressDelete(removeData)
              setRemoveData([])
            }
          }}/>

        <CustomIconButton
          icon={Icons.Plus}
          onClick={() => {
            props.setTableRows(props.tableRows.concat({
              id: "temp_" + props.tableRows.length,
              전문가단명: "",
              부모Id: props.parentId,
              순서: props.tableRows.length + 1,
              depth: props.parentId == "ROOT" ? 1 : 2,
              사용여부: "미사용"
            }))
          }}/>
      </Stack>
    }>
    <Stack sx={{display: "flex", width: '100%'}} pb={"30px"}>
      <DataTable
        hideFooter rowReordering isCheckBox
        loading={props.isLoading}
        rows={props.tableRows}
        columns={columns}
        rowCount={props.tableRows.length}
        onSelectionModelChange={(selectionModel: GridSelectionModel) => {
          const selected = props.tableRows.filter(f => {
            if (selectionModel.includes(f.id!))
              return f
          })
          if (!!selected)
            setRemoveData(selected)
        }}
        onCellEditCommit={(params: GridCellEditCommitParams) => {
          props.setTableRows(props.tableRows.map(m => {
            if (m.id == params.id) {
              if (params.field == "전문가단명") return {...m, 전문가단명: params.value}
              else if (params.field == "useAt") return {...m, useAt: params.value}
            }
            return m
          }))
        }}
        onRowOrderChange={(params: GridRowOrderChangeParams) => {
          if (props.tableRows) {
            const rowsClone = [...props.tableRows];
            const row = rowsClone.splice(params.oldIndex, 1)[0];
            rowsClone.splice(params.targetIndex, 0, row);
            props.setTableRows(rowsClone);
          }
        }}
      />

      <VerticalInterval size={"40px"}/>
      <Box style={{display: "flex", justifyContent: "end"}}>
        <CustomButton
          label={"저장"}
          onClick={() => {
            // const req: EquipmentClassifyRequest[] = props.tableRows.filter(f => f.전문가단명 != "").map((m, i) => {
            //   return {
            //     id: m.id.includes("temp") ? undefined : m.id,
            //     전문가단명: m.전문가단명,
            //     ordr: i + 1,
            //     useAt: m.useAt == "사용",
            //     부모Id: currentCategory?.id
            //   }
            // });
            // props.onPresSave(currentCategory?.id!, req)
          }}/>
      </Box>
    </Stack>
  </SubContents>
}

const findCategory = (id: string, dest: 전문가단분류) => {
  if (dest.id == id) return dest;
  else {
    return dest.child?.find(f => {
      if (f.id == id) return f;
      else findCategory(id, f)
    })
  }
}

const dataHierarchy = (categorys: 전문가단분류[]) => {
  const root = categorys.find(f => f.부모Id == "ROOT")
  const map = categorys.reduce((a, b, i) => ({...a, [b.id]: i}), {});
  const hierarchy: 전문가단분류 = {...root!, id: 'ROOT', child: []}

  categorys.forEach((item) => {
    if (item.id != "ROOT") {
      if (item.부모Id == "ROOT") {
        hierarchy.child?.push(item)
      } else if (item.부모Id) {
        //@ts-ignore
        const obj = categorys[map[item.부모Id]]
        if (!obj.child) obj.child = []
        obj.child.push(item)
      }
    }
  })

  return hierarchy
}

export const ExpertManagerAddModal = (props: {
  open: boolean
  onSelect: (data: WithCustomRowData<전문가분류관리_담당자>[]) => void
  onClose: () => void
}) => {
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0,
  });
  const [searchText, setSearchText] = useState<{ 담당부서: string, 담당자명: string }>()
  const [searchTempText, setSearchTempText] = useState<{ 담당부서: string, 담당자명: string }>()
  const [selected, setSelected] = useState<WithCustomRowData<전문가분류관리_담당자>[]>([])
  const [rowList, setRowList] = useState<WithCustomRowData<전문가분류관리_담당자>[]>(dummyExpertManager)
  // const managerList = ExpertMgtService.getManagerList({...searchText, ...pagination})

  // useEffect(() => {
  //   if (!managerList.isLoading && !managerList.isFetching) {
  //     if (!!managerList.data) {
  //       setRowList(managerList.data.list.map((m) => {
  //         return {
  //           key: m.id!,
  //           ...m,
  //         }
  //       }));
  //       setPagination((state) => ({...state, rowCount: managerList.data.totalItems}))
  //     }
  //   }
  // }, [managerList.data, managerList.isLoading, managerList.isFetching])

  return <ModalComponents
    isDist open={props.open}
    type={"save"}
    title={'담당자 추가'}
    onClose={props.onClose}
    onConfirm={() => {
      // const selectDiscout = rowList.filter(f => selected.includes(f.dscntId!))
      props.onSelect(selected)
    }}
  >
    <Stack spacing={'15px'}>
      <Stack direction={'row'} alignItems={'center'} spacing={'15px'}
             sx={{
               borderTop: '1px solid rgb(215, 218, 230)',
               borderBottom: '1px solid rgb(215, 218, 230)',
             }}>
        <TableContainer>
          <Table>
            <TableRow sx={{'> td': {borderBottom: 'none'}}}>
              <TableTextFieldCell division label={'담당부서'} onChange={(text) => {
                setSearchTempText({...searchTempText!, 담당부서: text})
              }}/>

              <TableTextFieldCell label={'담당자명'} onChange={(text) => {
                setSearchTempText({...searchTempText!, 담당자명: text})
              }}/>
            </TableRow>
          </Table>
        </TableContainer>
        <CustomButton label={'검색'} type={'small'} onClick={() => {
          setSearchText(searchTempText)
        }}/>
      </Stack>

      <ManagerListView
        rowList={rowList} selected={selected} setSelected={setSelected}
        pagination={pagination} setPagination={setPagination}
      />
    </Stack>
  </ModalComponents>
}

const ManagerListView = (props: {
  rowList: WithCustomRowData<전문가분류관리_담당자>[]
  selected: WithCustomRowData<전문가분류관리_담당자>[]
  setSelected: Dispatch<SetStateAction<WithCustomRowData<전문가분류관리_담당자>[]>>
  pagination: { page: number, rowsPerPage: number, rowCount: number }
  setPagination: Dispatch<SetStateAction<{ page: number, rowsPerPage: number, rowCount: number }>>
}) => {

  return <TableComponents<전문가분류관리_담당자>
    hideRowPerPage showTotal isCheckBox
    headCells={managerHeadCells}
    bodyRows={props.rowList}
    {...props.pagination}
    onChangePagination={(page, rowPerPage) => {
      props.setPagination((state) => ({...state, page: page, rowsPerPage: rowPerPage}))
    }}
    onSelectedKey={(keys: string[]) => {
      const selected = props.selected.map(m => m.key)

      if (selected.length < keys.length) {
        // 추가시
        const newKey = keys.find(f => !selected.includes(f))
        const data = props.rowList.find(f => f.key == newKey) as any
        props.setSelected(props.selected.concat(data))
      } else {
        // 삭제시
        const deleteKey = selected.find(f => !keys.includes(f))
        props.setSelected(props.selected.filter(f => f.key != deleteKey))
      }
      // props.setSelected(keys)
    }}
    tableCell={(data) => {

      return (
        <Fragment>
          <TableCell key={"부서명-" + data.key} sx={{textAlign: 'center'}}>{data.부서명}</TableCell>
          <TableCell key={"이름-" + data.key} sx={{textAlign: 'center'}}>{data.이름}</TableCell>
          <TableCell key={"직급-" + data.key} sx={{textAlign: 'center'}}>{data.직급}</TableCell>
        </Fragment>
      )
    }}
  />
}

const CustomContent = React.forwardRef(function CustomContent(
  props: TreeItemContentProps,
  ref,
) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    preventSelection(event);
  };

  const handleExpansionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    handleSelection(event);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <Typography
        onClick={handleSelectionClick}
        component="div"
        className={classes.label}
      >
        {label}
      </Typography>
    </div>
  );
});


const managerHeadCells: CustomHeadCell<전문가분류관리_담당자>[] = [
  {
    id: '부서명',
    align: 'center',
    label: '부서명',
  },
  {
    id: '이름',
    align: 'center',
    label: '이름',
  },
  {
    id: '직급',
    align: "center",
    label: '직급',
  },
];

export default ExpertClassificationMgt;