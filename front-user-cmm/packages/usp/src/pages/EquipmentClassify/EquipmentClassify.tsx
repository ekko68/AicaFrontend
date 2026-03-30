import React, {useEffect, useState} from 'react'
import {TreeItem, TreeItemContentProps, TreeView, useTreeItem} from "@mui/lab";
import clsx from "clsx";
import {Stack, Typography} from "@mui/material";
import {EquipmentClassifyData, EquipmentClassifyRequest} from "~/service/Model";
import {EquipmentCategoryService} from "~/service/EquipmentMgt/EquipmentCategoryService";
import {GridSelectionModel} from "@mui/x-data-grid/models/gridSelectionModel";
import {GridCellEditCommitParams} from "@mui/x-data-grid";
import {useEquipmentClassifyStore} from "../store/EquipmentClassifyStore";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {CustomButton} from "~/components/ButtonComponents";
import {HorizontalInterval} from "~/components/LayoutComponents";
import DataTable from "~/components/CustomDataGride";


export const EquipmentClassify = () => {
  const {data} = EquipmentCategoryService.getRoot()
  const {tableRows, setCategory} = useEquipmentClassifyStore()
  const [root, setRoot] = useState<EquipmentClassifyData | undefined>(undefined)

  const sort = (data: EquipmentClassifyData, equipment: EquipmentClassifyData) => {
    if (equipment.eqpmnClfcId == 'ROOT') {
      return data
    } else if (data.eqpmnClfcId == equipment.parentEqpmnClfcId) {
      if (data.child.filter(f => f.eqpmnClfcId == equipment.eqpmnClfcId).length == 0)
        data.child.push(equipment)
    } else if (equipment.parentEqpmnClfcId) {
      data.child.map(m => sort(m, equipment))
    }

    return data;
  }

  const flatten = (dest: EquipmentClassifyData[], source: EquipmentClassifyData[]) => {
    source.map(m => {
      dest.push({...m, child: []})
      flatten(dest, m.child)
    })
  }

  const findCategory = (id: string, dest: EquipmentClassifyData) => {
    if (dest.eqpmnClfcId == id) return dest;
    else {
      return dest.child.find(f => {
        if (f.eqpmnClfcId == id) return f;
        else findCategory(id, f)
      })
    }
  }

  useEffect(() => {
    if (!!data) {
      const equipmentClassifyData: EquipmentClassifyData[] = data.map(m => {
        return {...m, child: []}
      })
      const classify = equipmentClassifyData.reduce(sort);
      setRoot(classify)
      setCategory(classify)
    }
  }, [data]);

  return <Stack
    flexDirection={"row"}
    justifyContent={"space-between"}
    sx={{width: '100%', height: '100%'}}>
    <LeftTreeView
      root={root}
      onClickTree={(equipment: EquipmentClassifyData) => {
        setCategory(equipment)
      }}/>

    {
      tableRows && <RightTableView
        onPresSave={async (parentId: string, req: EquipmentClassifyRequest[]) => {
          try {
            const editEquipment = await EquipmentCategoryService.setCategory(parentId, req)
            const updateData: EquipmentClassifyData[] = editEquipment.map(m => {
              return {...m, child: []}
            })

            // 기존 rootData를 flat 처리 -> 기존 데이터에서 아이템들 갱신 및 추가 -> 재정렬
            const flatRoot: EquipmentClassifyData[] = [{...root!, child: []}];
            flatten(flatRoot, root!.child);

            const newData = updateData.filter(f => !flatRoot.find(d => d.eqpmnClfcId == f.eqpmnClfcId))
            const edit = [
              ...flatRoot.map(m => {
                const data = updateData.find(f => f.eqpmnClfcId == m.eqpmnClfcId)
                if (data) return data;
                else return m;
              }),
              ...newData
            ].reduce(sort);
            setRoot(edit)
            setCategory(findCategory(parentId, edit) || edit.child[0])

          } catch (e) {
            console.warn(e)
          }
        }}
        onPressDelete={async (parentId: string, req: EquipmentClassifyRequest[]) => {
          try {
            const deleteEquipment = await EquipmentCategoryService.deleteCategory(parentId, req)
            const deleteIds = deleteEquipment.flatMap(m => m.eqpmnClfcId)

            // 기존 rootData를 flat 처리 -> 제거된 아이템 filter -> 재정렬
            const flatRoot: EquipmentClassifyData[] = [{...root!, child: []}];
            flatten(flatRoot, root!.child);

            const classify = flatRoot.filter(f => !deleteIds.includes(f.eqpmnClfcId)).reduce(sort)
            setRoot(classify)
            setCategory(findCategory(parentId, classify) || classify.child[0])
          } catch (e) {
            console.warn(e)
          }
        }}
      />
    }
  </Stack>
}

const Item: React.FC<{
  depth: number
  equipment: EquipmentClassifyData,
  onClick: (equipment: EquipmentClassifyData) => void
}> = props => {
  // const isDepth = props.equipment.child.length > 0
  const isDepth = props.depth < 3
  return <>
    {
      isDepth && <TreeItem
        ContentComponent={CustomContent}
        nodeId={props.equipment.eqpmnClfcId}
        label={
          <div onClick={() => props.onClick(props.equipment)}>
            {props.equipment.eqpmnClfcNm}
          </div>
        }>
        {
          props.equipment.child.map((m, i) => {
            return <Item key={i} depth={props.depth + 1} equipment={m} onClick={props.onClick}/>
          })
        }
      </TreeItem>
    }
  </>
}

const LeftTreeView: React.FC<{
  root?: EquipmentClassifyData
  onClickTree: (equipment: EquipmentClassifyData) => void
}> = props => {

  return <TreeView
    defaultCollapseIcon={<ExpandMoreIcon/>}
    defaultExpandIcon={<ChevronRightIcon/>}
    defaultExpanded={['root']}
    sx={{overflowY: 'auto', minWidth: '180px', marginRight: "10px"}}>
    <TreeItem
      ContentComponent={CustomContent}
      nodeId={"root"}
      label={
        <div onClick={() => props.onClickTree(props.root!)}>
          {"장비분류"}
        </div>
      }>
      {
        props.root && props.root.child.map((m, i) => {
          return <Item key={i} depth={1} equipment={m} onClick={props.onClickTree}/>
        })
      }
    </TreeItem>
  </TreeView>
}

const RightTableView: React.FC<{
  onPresSave: (parentId: string, req: EquipmentClassifyRequest[]) => void
  onPressDelete: (parentId: string, req: EquipmentClassifyRequest[]) => void
}> = props => {
  const [selectData, setSelectData] = useState<EquipmentClassifyData[]>([])
  const [isDelete, setIsDelete] = useState(false)
  const {category, tableRows, setRow} = useEquipmentClassifyStore()

  const columns:any = [
    {field: 'id', hide: true},
    {field: 'order', headerName: '순서', flex: 2, headerAlign: 'center'},
    {field: 'title', headerName: '분류명', flex: 10, headerAlign: 'center', editable: true},
    {
      field: 'enable',
      headerName: '사용여부',
      flex: 2,
      headerAlign: 'center',
      type: "singleSelect",
      valueOptions: ["사용", "미사용"],
      editable: true
    },
  ]

  return <Stack sx={{display: "flex", width: '100%'}} pb={"30px"}>
    <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
      <h3>실증장비</h3>
      <Stack flexDirection={"row"}>
        <CustomButton
          type={'small'}
          label={"저장"}
          onClick={() => {
            const req: EquipmentClassifyRequest[] = tableRows.map((m, i) => {
              return {
                eqpmnClfcId: m.id.includes("temp") ? undefined : m.id,
                eqpmnClfcNm: m.title,
                sortOrder: i + 1,
                enabled: m.enable == "사용",
                parentEqpmnClfcId: category?.eqpmnClfcId
              }
            });
            props.onPresSave(category?.eqpmnClfcId!, req)
          }}/>

        <HorizontalInterval size={"10px"}/>
        <CustomButton
          type={'small'}
          label={"삭제"}
          onClick={() => {
            setIsDelete(!isDelete)
            if (isDelete && selectData.length > 0) {
              const req: EquipmentClassifyRequest[] = selectData.map(m => {
                return {
                  eqpmnClfcId: m.eqpmnClfcId,
                }
              })
              props.onPressDelete(category?.eqpmnClfcId!, req)
              setSelectData([])
            }
          }}/>

        <HorizontalInterval size={"10px"}/>
        <CustomButton
          type={'small'}
          label={"추가"}
          onClick={() => {
            setRow([
              ...tableRows,
              {
                id: "temp_" + tableRows.length,
                title: "",
                enable: "미사용",
                order: tableRows.length + 1
              }])
          }}/>
      </Stack>

    </Stack>
    <DataTable
      hideFooter 
      isCheckBox={isDelete}
      rows={tableRows}
      columns={columns}
      rowCount={tableRows.length}
      onSelectionModelChange={(selectionModel: GridSelectionModel) => {
        const selected = category?.child.filter(f => {
          if (selectionModel.includes(f.eqpmnClfcId!))
            return f
        })
        if (!!selected)
          setSelectData(selected)
      }}
      onCellEditCommit={(params: GridCellEditCommitParams) => {
        setRow(tableRows.map(m => {
          if (m.id == params.id)
            return {...m, title: params.value}
          else return m
        }))
      }}
    />
  </Stack>
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