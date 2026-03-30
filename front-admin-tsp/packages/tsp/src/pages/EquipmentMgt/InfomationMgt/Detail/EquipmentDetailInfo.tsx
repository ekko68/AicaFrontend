import {useNavigate, useParams} from "react-router-dom";
import {EquipmentInformationService} from "~/service/EquipmentMgt/EquipmentInformationService";
import React, {Fragment, useEffect, useRef, useState} from "react";
import {
  CustomHeadCell,
  TableComponents, TableDateCell, TableDoubleSelectCell,
  TableRadioCell,
  TableSelectCell,
  TableTextCell, TableTextFieldCell, WithCustomRowData
} from "shared/components/TableComponents";
import {Box, FormControl, Stack, Table, TableBody, TableCell, TableContainer, TableRow, TextField} from "@mui/material";
import {HorizontalInterval, LoadingProgress, SimpleTextFiled, SubContents} from "shared/components/LayoutComponents";
import {CustomButton} from "shared/components/ButtonComponents";
import {useEquipmentDetailStore} from "~/store/EquipmentMgt/EquipmentDetailStore";
import {
  DiscountData,
  EquipmentCategoryData,
  EquipmentData,
  EquipmentMgtInfoRequest
} from "~/service/Model";
import axios from "axios";
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {getBaseUrl} from "shared/libs/axios";
import {SaleRegisterModal} from "~/pages/EquipmentMgt/SaleRegisterModal";
import {SaleSelectModal} from "~/pages/EquipmentMgt/SaleSelectModal";
import {dayFormat} from "shared/utils/stringUtils";

type CategoryView = {
  depth1Nm: string
  depth1: string[]
  depth2Nm: string
  depth2: string[]
}

/* 장비 정보 관리 상세 - 상세 정보 */
export const EquipmentDetailInfo = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<any>();
  const [category, setCategory] = useState<CategoryView>({
    depth1Nm: "", depth1: [], depth2Nm: "", depth2: []
  });
  const [selectedDiscount, setSelectedDiscount] = useState<string[]>([]);
  const imgRef = useRef<HTMLInputElement>(null);
  const detail = useEquipmentDetailStore();
  const [req, setReq] = useState<EquipmentData | null>(null)
  const detailInfo = EquipmentInformationService.getEquipmentsDetailsInfo(id!.toString())
  const [isSaleRegister, setIsSaleRegister] = useState(false)
  const [isSaleSelect, setIsSaleSelect] = useState(false)
  const [disCountRowList, setDiscountRowList] = useState<WithCustomRowData<DiscountData>[]>([])

  const {addModal} = useGlobalModalStore();

  useEffect(() => {
    if (!!detailInfo.data && !detailInfo.isFetching) {
      detail.setDetailData(detailInfo.data)
      if (!req) {
        setReq({...detailInfo.data})
        CategorySetting(detailInfo.data.eqpmnClParam, detailInfo.data.eqpmnClId)
        if (detailInfo.data.detailDscntParam)
        setDiscountRowList(detailInfo.data.detailDscntParam.map(m => {return {...m, key: m.dscntId!}}))
        // setRowList(detailInfo.data.tsptEqpmnDscntCnd.map(m => {
        //     return {
        //       key: m.eqpmnDscntCndId!,
        //       ...m,
        //     }
        //   }
        // ))
      }
    }
  }, [detailInfo.data, detailInfo.isFetching])

  const CategorySetting = (category: EquipmentCategoryData[], selectId: string) => {
    const cur = category.find(f => f.eqpmnClId == selectId)

    if (cur?.eqpmnLclasId == "ROOT") {
      setCategory({
        depth1Nm: cur.eqpmnClNm,
        depth2Nm: " ",
        depth1: category.filter(f => f.depth == 1).flatMap(name => name.eqpmnClNm),
        depth2: category.filter(f => f.depth == 2 &&
          f.eqpmnLclasId == cur.eqpmnClId).flatMap(name => name.eqpmnClNm)
      })
    } else if (cur) {
      setCategory({
        depth1Nm: category.find(f => f.eqpmnClId == cur.eqpmnLclasId)?.eqpmnClNm || "",
        depth2Nm: cur.eqpmnClNm,
        depth1: category.filter(f => f.depth == 1).flatMap(name => name.eqpmnClNm),
        depth2: category.filter(f => f.depth == 2 &&
          f.eqpmnLclasId == cur.eqpmnLclasId).flatMap(name => name.eqpmnClNm)
      })
    }
  }

  if (detailInfo.isLoading || !detail.detailInfoData) return <LoadingProgress />
// console.log(`${URL.createObjectURL(selectedImage)}`)
console.log(`${selectedImage}`)
  return <Stack spacing={"40px"}>
    <SubContents title={"기본정보"}>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextFieldCell
                division label={"자산번호"} defaultLabel={detail.detailInfoData.assetsNo}
                thWidth={"13%"} tdWidth={"21%"} onChange={(text) => {
                setReq((state) => ({...req!, assetsNo: text}))
              }}/>
              <TableTextFieldCell
                division label={"장비명(국문)"} defaultLabel={detail.detailInfoData.eqpmnNmKorean}
                thWidth={"13%"} tdWidth={"21%"} onChange={(text) => {
                setReq((state) => ({...req!, eqpmnNmKorean: text}))
              }}/>
              <TableTextFieldCell
                label={"장비명(영문)"} defaultLabel={detail.detailInfoData.eqpmnNmEngl}
                thWidth={"13%"} onChange={(text) => {
                setReq((state) => ({...req!, eqpmnNmEngl: text}))
              }}/>
            </TableRow>

            <TableRow>
              <TableTextFieldCell
                division label={"모델명"} defaultLabel={detail.detailInfoData.modelNm}
                thWidth={"13%"} tdWidth={"21%"} onChange={(text) => {
                setReq((state) => ({...req!, modelNm: text}))
              }}/>
              <TableDoubleSelectCell
                division label={"분류"}
                firstSelectLabel={category.depth1} defaultFirstLabel={category.depth1Nm}
                lastSelectLabel={category.depth2} defaultLastLabel={category.depth2Nm}
                onFirstClick={(firstSelectedValue: string) => {
                  const find = detail.detailInfoData?.eqpmnClParam.find(f => f.eqpmnClNm == firstSelectedValue)
                  if (find) {
                    CategorySetting(detail.detailInfoData!.eqpmnClParam, find.eqpmnClId)
                    // setReq((state) => ({...req!, eqpmnClfcId: find.eqpmnClfcId}));
                  }
                }}
                onLastClick={(lastSelectedValue) => {
                  const find = detail.detailInfoData?.eqpmnClParam.find(f => f.eqpmnClNm == lastSelectedValue)
                  if (find) {
                    CategorySetting(detail.detailInfoData!.eqpmnClParam, find.eqpmnClId)
                    // setReq((state) => ({...req!, eqpmnClfcId: find.eqpmnClfcId}));
                  }
                }}
                thWidth={"13%"} tdWidth={"21%"}
              />
              <TableTextFieldCell
                label={"규격"} defaultLabel={detail.detailInfoData.eqpmnStndrd}
                thWidth={"13%"} tdSpan={5} onChange={(text) => {
                setReq((state) => ({...req!, eqpmnStndrd: text}))
              }}/>
            </TableRow>

            <TableRow>
              <TableTextFieldCell
                label={"요약설명"} defaultLabel={detail.detailInfoData.sumry}
                thWidth={"13%"} tdSpan={5} onChange={(text) => {
                setReq((state) => ({...req!, sumry: text}))
              }}/>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>


    <SubContents title={"제원 및 주요 구성품"}>
      <SimpleTextFiled
        multiline
        defaultLabel={detail.detailInfoData.specComposition}
        onChange={(text) => {
          setReq((state) => ({...req!, specComposition: text}));
        }}
      />
    </SubContents>

    <SubContents title={"보조기기"}>
      <SimpleTextFiled
        multiline defaultLabel={detail.detailInfoData.specComposition}
        onChange={(text) => {
          setReq((state) => ({...req!, specComposition: text}));
        }}
      />
    </SubContents>

    <SubContents title={"분야/용도"}>
      <SimpleTextFiled
        multiline defaultLabel={detail.detailInfoData.realmPrpos}
        onChange={(text) => {
          setReq((state) => ({...req!, realmPrpos: text}));
        }}
      />
    </SubContents>

    <SubContents
      title={"이미지"}
      rightContent={
        <CustomButton
          label={"등록"} type={"small"} color={"list"}
          onClick={() => {
            if (imgRef.current) imgRef.current.click()
          }}
        />
      }>
      <input
        hidden ref={imgRef}
        type={"file"}
        // accept='image/jpg,impge/png,image/jpeg,image/gif'
        onChange={async (event: any) => {
          if (event.target.files && event.target.files.length > 0) {
            setSelectedImage(event.target.files[0])
            const img = new FormData();
            img.append("image", event.target.files[0])
            const response = await EquipmentInformationService.postEquipmentsDetailUploadImage(id!, img)
            if (!response.success) setSelectedImage(null)
            setReq((state) => ({...req!, imageId: response.value}))
          }
        }}
      />
      <Stack alignItems={"center"}>
        {!selectedImage &&
          <img src={`${getBaseUrl().substring(0,getBaseUrl().indexOf('/admin'))}/file-dwld-contentType/${detail.detailInfoData.imageId}`}
          // <img src={`${getBaseUrl()}/equipments/${detail.detailInfoData.imageId}/image`}
               style={{width: "300px", height: "300px"}}/>}
        {selectedImage && <img src={URL.createObjectURL(selectedImage)} style={{width: "300px", height: "300px"}}/>}
      </Stack>
    </SubContents>

    <SubContents title={"상세정보"}>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableRadioCell
                row division label={"전원"}
                radioLabel={["220v", "110v"]}
                defaultLabel={`${detail.detailInfoData.srcelct}`}
                thWidth={"13%"} tdWidth={"21%"}
                onClick={(selected: string) => {
                  setReq((state) => ({...req!, srcelct: selected.substring(0, 3)}))
                }}/>
              <TableRadioCell
                row division label={"메뉴얼"}
                radioLabel={["있음", "없음"]}
                defaultLabel={detail.detailInfoData.mnlAt ? "있음" : "없음"}
                thWidth={"13%"} tdWidth={"21%"}
                onClick={(selected: string) => {
                  setReq((state) => ({...req!, mnlAt: selected == "있음"}))
                }}
              />
              <TableRadioCell
                row label={"소프트웨어"}
                radioLabel={["있음", "없음"]}
                defaultLabel={detail.detailInfoData.swAt ? "있음" : "없음"}
                thWidth={"13%"}
                onClick={(selected: string) => {
                  setReq((state) => ({...req!, swAt: selected == "있음"}))
                }}
              />
            </TableRow>

            <TableRow>
              <TableTextFieldCell
                division label={"기존설치장소"} defaultLabel={detail.detailInfoData.legacyItlpc}
                thWidth={"13%"} tdWidth={"21%"} onChange={(text) => {
                setReq((state) => ({...req!, legacyItlpc: text}))
              }}/>
              <TableRadioCell
                row label={"유무료"}
                radioLabel={["유료", "무료"]}
                defaultLabel={detail.detailInfoData.mnlAt ? "유료" : "무료"}
                thWidth={"13%"} tdSpan={3}
                onClick={(selected: string) => {
                  setReq((state) => ({...req!, mnlAt: selected == "유료"}))
                }}
              />
            </TableRow>

            <TableRow>
              <TableTextFieldCell
                label={"특기사항"} defaultLabel={detail.detailInfoData.spcmnt}
                thWidth={"13%"} tdSpan={5} onChange={(text) => {
                setReq((state) => ({...req!, spcmnt: text}))
              }}/>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>

    <SubContents
      title={"할인조건"}
      rightContent={
        <Stack flexDirection={"row"}>
          <CustomButton type={"small"} color={"list"} label={"삭제"} onClick={() => {
            setDiscountRowList(disCountRowList.filter(f => !selectedDiscount.includes(f.key)))
          }}/>
          <HorizontalInterval size={"10px"}/>
          <CustomButton type={"small"} color={"list"} label={"등록"} onClick={() => {
            setIsSaleRegister(true)
          }}/>
          <HorizontalInterval size={"10px"}/>
          <CustomButton type={"small"} color={"list"} label={"선택"} onClick={() => {
            setIsSaleSelect(true)
          }}/>
        </Stack>
      }>
      <TableComponents<DiscountData>
        isCheckBox hidePagination hideRowPerPage
        page={0}
        rowCount={0}
        rowsPerPage={0}
        headCells={headCells}
        bodyRows={disCountRowList}
        onSelectedKey={(keys: string[]) => {
          setSelectedDiscount(keys)
        }}
        tableCell={(data) => {

          if (!data) return <></>

          return <Fragment>
            <TableCell key={"dscntResn-" + data.key} width={'80%'}>{data?.dscntResn}</TableCell>
            <TableCell key={"dscntRate-" + data.key} width={'15%'}>{data?.dscntRate}</TableCell>
          </Fragment>
        }}
      />
    </SubContents>
    <SubContents title={"AS정보"}>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableRow>
            <TableTextFieldCell
                division label={"AS업체명"} defaultLabel={detail.detailInfoData.asEntrprsNm}
                thWidth={"13%"} tdWidth={"21%"} onChange={(text) => {
              setReq((state) => ({...req!, asEntrprsNm: text}))
            }}
            />
            <TableTextFieldCell
                division label={"AS담당자명"} defaultLabel={detail.detailInfoData.asChargerNm}
                thWidth={"13%"} tdWidth={"21%"} onChange={(text) => {
              setReq((state) => ({...req!, asChargerNm: text}))
            }}
            />
            <TableTextFieldCell
                label={"AS연락처"} defaultLabel={detail.detailInfoData.asChargerCttpc}
                thWidth={"13%"} onChange={(text) => {
              setReq((state) => ({...req!, asChargerCttpc: text}))
            }}
            />
          </TableRow>
        </Table>
      </TableContainer>
    </SubContents>
    <SubContents title={"구입정보"}>
      <TableContainer style={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableRow>
            <TableDateCell
                division label={"구입일자"} defaultTime={dayFormat(detail.detailInfoData.purchsDt)}
                thWidth={"13%"} tdWidth={"21%"} onChange={(date) => {
              setReq((state) => ({...req!, purchsDt: date.getTime()}))
            }}
            />
            <TableTextFieldCell
                label={"구입처"} defaultLabel={detail.detailInfoData.strNm}
                thWidth={"13%"} tdWidth={"21%"} onChange={(text) => {
              setReq((state) => ({...req!, strNm: text}))
            }}
            />
          </TableRow>
          <TableRow>
            <TableTextFieldCell
                division label={"구입가격"}
                defaultLabel={`${detail.detailInfoData.purchsPc || 0}`}
                additionDirection={'row'}
                additionContent={<Fragment>
                  <HorizontalInterval size={'15px'}/>
                  <Box width={'50px'}>{'원'}</Box>
                </Fragment>}
                thWidth={"13%"} tdWidth={"21%"} onChange={(text) => {
              setReq((state) => ({...req!, purchsPc: Number(text)}))
            }}
            />
            <TableTextFieldCell
                label={"제조사(국)"}
                defaultLabel={detail.detailInfoData.makr}
                thWidth={"13%"} tdWidth={"21%"} onChange={(text) => {
              setReq((state) => ({...req!, makr: text}))
            }}
            />
          </TableRow>
        </Table>
      </TableContainer>
    </SubContents>

    <Stack flexDirection={"row"} justifyContent={"space-between"} style={{width: "100%"}}>
      <CustomButton
        label={"목록"} type={"largeList"} color={"outlined"}
        onClick={() => {
          navigate(-1)
        }}
      />
      <Stack flexDirection={"row"}>
        <CustomButton
          label={"삭제"}
          type={"largeList"}
          onClick={async () => {
            const result = await EquipmentInformationService.deleteEquipment(id!)
            if (result.success) {
              addModal({
                open: true, isDist: true, type: 'normal', content: '삭제되었습니다.',
                onConfirm: () => {
                  navigate(-1)
                }
              })
            }
          }}
        />
        <HorizontalInterval size={"10px"}/>
        <CustomButton
          label={"저장"}
          onClick={async () => {
            const selectCategoryNm = category.depth2Nm == " " ? category.depth1Nm : category.depth2Nm
            const eqpmnClfcId = detail.detailInfoData?.eqpmnClParam.find(f => f.eqpmnClNm == selectCategoryNm)?.eqpmnClId
            const result = await EquipmentInformationService.putEquipmentDetailInfo(id!, {
              ...req!,
              eqpmnClId: eqpmnClfcId,
              detailDscntParam: disCountRowList
            })

            if (result.success) {
              addModal({
                open: true, isDist: true,
                type: 'normal',
                content: "저장 완료."
              })
              detail.setDetailData(result)
              setReq({...result})
              // setRowList(result.tsptEqpmnDscntCnd.map(m => {
              //   return {
              //     key: m.eqpmnDscntCndId!,
              //     ...m,
              //   }
              // }))
            }

          }}
        />
      </Stack>
    </Stack>

    {
      isSaleRegister && <SaleRegisterModal
        open onClose={() => {
        setIsSaleRegister(false)
      }}/>
    }
    {
      isSaleSelect && <SaleSelectModal
        open onSelect={(data: WithCustomRowData<DiscountData>[]) => {
        const ids = disCountRowList.map(m => m.dscntId)
        const newData = data.filter(f => !ids.includes(f.dscntId))
        setDiscountRowList(disCountRowList.concat(newData))
        setIsSaleSelect(false)
      }}
        onClose={() => {
          setIsSaleSelect(false)
        }}/>
    }
  </Stack>
}

const headCells: CustomHeadCell<DiscountData>[] = [
  {
    id: 'dscntResn',
    align: 'center',
    label: '할인조건',
  },
  {
    id: 'dscntRate',
    align: "center",
    label: '할인율(%)',
  },
];