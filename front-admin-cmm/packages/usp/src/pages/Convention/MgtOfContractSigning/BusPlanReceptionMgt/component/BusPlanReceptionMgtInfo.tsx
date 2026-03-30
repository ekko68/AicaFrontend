// 협약 -> 협약체결관리 -> 사업계획서 상세-> 접수 정보
/*
    Date Created          :   2022/08/26
    Screen Name           :   파일 첨부 리스트
    Screen ID             :   UI-USP-ADM-0220201
    Developer Name        :   jhan
*/
import {Fragment, useEffect, useState} from "react"
import { useParams } from "react-router-dom";
import { SubContents } from "shared/components/LayoutComponents";
import { Stack, Table, TableBody, TableRow} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { TableTextCell,  TableTextFieldCell } from "shared/components/TableComponents";
import { dayFormat } from "shared/utils/stringUtils";
import { CustomButton } from "~/components/ButtonComponents";
import { useNavigate } from "react-router-dom";
import { BusPlanReceptionMgtService as TService } from "../Service/BusPlanReceptionMgtService";
import {  UspBsnsPlan as TEntity, 
          UspTaskRspnber, UsptTaskPrtcmpny,
          UsptTaskPartcpts, CmmtAttachment
} from "../Model";
import { ModalComponents } from 'shared/components/ModalComponents';

import { 
        BusPlanReceptionMgtTaskPrtcmpnyListView as TaskPrtcmpnyListView,
        BusPlanReceptionMgtTaskPartcptsListView as TaskPartcptsListView,
        BusPlanReceptionMgtAttachmentListView as AttachmentListView
} from "./index";

export const BusPlanReceptionMgtInfo = () => {
  // get params
  const {bsnsPlanDocId, bsnsSlctnId} = useParams();
  
  // params setting 
  const [uspBsnsPlanItem, setUspBsnsPlanItem] = useState<TEntity>();
  const [uspTaskRspnberItem, setUspTaskRspnberItem] = useState<UspTaskRspnber>();
  const [usptTaskPrtcmpnyItems, setUsptTaskPrtcmpnyItems] = useState<UsptTaskPrtcmpny[]>();
  const [usptTaskPartcptsItems, setUsptTaskPartcptsItems] = useState<UsptTaskPartcpts[]>();
  const [attachFileItems, setAttachFileItemsItems] = useState<CmmtAttachment[]>();
  const resultData = TService.getDetailInfo(bsnsPlanDocId!, bsnsSlctnId!);
  useEffect(() => {
      if (!resultData.isLoading || !resultData.isFetching) {
        if (!!resultData.data) {
            setUspBsnsPlanItem(resultData.data.usptBsnsPlanDoc);
            setUspTaskRspnberItem(resultData.data.usptTaskRspnber);
            setUsptTaskPrtcmpnyItems(resultData.data.usptTaskPrtcmpny)
            setUsptTaskPartcptsItems(resultData.data.usptTaskPartcpts)
            setAttachFileItemsItems(resultData.data.attachFileList)
        }
     }
  }, [resultData.data, resultData.isLoading, resultData.isFetching])

  // settting modal
  type modalType = 'normal' | 'confirm';
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<modalType>('normal');

  const handlerModalOpen = (type: modalType) => {
    setOpen(true);
    setType(type);
  };

  const navigate = useNavigate()
  return <Fragment>
    <Stack spacing={"40px"}>
      <SubContents title={"관리정보"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  division title={"제출일"} label={dayFormat(1660815022610)}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"처리상태"} label={uspBsnsPlanItem?.planPresentnSttusNm!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>
      <SubContents title={"기본정보"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  division title={"사업명"} label={uspBsnsPlanItem?.bsnsNm!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  division title={"사업연도"} label={uspBsnsPlanItem?.bsnsYear!.concat('년')!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>

              <TableRow>
                <TableTextCell
                  division title={"공고명"} label={uspBsnsPlanItem?.pblancNm!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  division title={"접수번호"} label={uspBsnsPlanItem?.receiptNo!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>
      {uspBsnsPlanItem?.memberNm! === 'INDIVIDUAL' ?
      <SubContents title={"신청자정보"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                 <TableTextCell
                  title={"사업자명"} label={uspBsnsPlanItem?.memberNm!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"사업자등록번호"} label={uspBsnsPlanItem?.bizrno!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>

              <TableRow>
                <TableTextCell
                  title={"대표자명"} label={uspBsnsPlanItem?.ceoNm!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"담당자명"} label={uspBsnsPlanItem?.chargerNm!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>
        :
      <SubContents title={"신청자정보"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  title={"이름"} label={uspBsnsPlanItem?.memberNm!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"생년월일"} label={uspBsnsPlanItem?.brthdy!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>
              <TableRow>
                <TableTextCell
                  title={"휴대폰번호"} label={uspBsnsPlanItem?.mbtlnum!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"이메일"} label={uspBsnsPlanItem?.email!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>
              <TableRow>
                <TableTextCell
                  title={"성별"} label={uspBsnsPlanItem?.gender!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>
      } 

      <SubContents title={"과제정보"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  title={"과제명/프로젝트명(국문)"} label={uspBsnsPlanItem?.taskNmKo!}
                  thWidth={"12%"} tdSpan={3}
                />
              </TableRow>
              <TableRow>
                <TableTextCell
                  title={"과제명/프로젝트명(영문)"} label={uspBsnsPlanItem?.taskNmEn!}
                  thWidth={"12%"} tdSpan={3}
                />
              </TableRow>
              
              <TableRow>
                <TableTextCell
                  title={"과제분야"} label={uspBsnsPlanItem?.applyField!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"사업시간"} label={uspBsnsPlanItem?.bsnsPd!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>

              <TableRow>
                <TableTextCell
                  title={"사업시간(전체)"} label={uspBsnsPlanItem?.bsnsPdAll!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"사업기간(당해)"} label={uspBsnsPlanItem?.bsnsPdYw!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>

      <SubContents title={"과제책임자"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  title={"이름"} label={uspTaskRspnberItem?.rspnberNm!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"생년월일"} label={uspTaskRspnberItem?.encBrthdy!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>

              <TableRow>
                <TableTextCell
                  title={"휴대폰번호"} label={uspTaskRspnberItem?.encMbtlnum!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"이메일"} label={uspTaskRspnberItem?.encEmail!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>

              <TableRow>
                <TableTextCell
                  title={"부서/학과"} label={uspTaskRspnberItem?.deptNm!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"직위/직급"} label={uspTaskRspnberItem?.clsfNm!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>

              <TableRow>
                <TableTextCell
                  title={"주소"} label={uspTaskRspnberItem?.adres!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"유선번호"} label={uspTaskRspnberItem?.encTelno!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>

              <TableRow>
                <TableTextCell
                  title={"팩스번호"} label={uspTaskRspnberItem?.encFxnum!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"과학기술인등록번호"} label={uspTaskRspnberItem?.tlsyRegistNo!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>

      <SubContents title={"참여기업개요"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  title={"참여업체총수"} label={uspTaskRspnberItem?.partcptnCompanyCnt!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"중소기업수"} label={uspTaskRspnberItem?.smlpzCnt!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>

              <TableRow>
                <TableTextCell
                  title={"중견기업수"} label={uspTaskRspnberItem?.mspzCnt!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
                <TableTextCell
                  title={"기타"} label={uspTaskRspnberItem?.etcCnt!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>
      <SubContents title={"참여기업"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <TaskPrtcmpnyListView rowList={usptTaskPrtcmpnyItems || []}/>
        </TableContainer>
      </SubContents>

      <SubContents title={"참여인력"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <TaskPartcptsListView rowList={usptTaskPartcptsItems || []}/>
        </TableContainer>
      </SubContents>
      <SubContents title={"신청예산 (단위: 천원)"}>
        <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextCell
                  title={"총사업비"} label={uspTaskRspnberItem?.etcCnt!}
                  thWidth={"12%"} tdSpan={3}
                />
              </TableRow>
              <TableRow>
                <TableTextCell
                  thWidth={"12%"} tdSpan={3}
                  title={"사업비"} 
                  label={""}
                />
              </TableRow>
              <TableRow>
                <TableTextCell
                  thWidth={"12%"} tdSpan={3}
                  title={"비목별 사업비"}  tdWidth={"38%"}
                  label={""}
                />
                <TableTextCell
                  title={"중소기업수"} label={uspTaskRspnberItem?.smlpzCnt!}
                  thWidth={"12%"} tdWidth={"38%"}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>
      <SubContents title={"파일첨부"} rightContent={
          <Stack direction={'row'} spacing={'10px'}>
            <CustomButton type={"small"} color={"list"} label={"일괄 다운로드"} onClick={() => {
            }}/>
          </Stack>
        }>
        <AttachmentListView rowList={attachFileItems} />
      </SubContents>
    </Stack>

    <Stack flexDirection={"row"} justifyContent={"space-between"} sx={{width: "100%", marginTop: "40px"}}>
      <CustomButton
        label={"목록"} type={"largeList"} color={"outlined"}
        onClick={() => {
          navigate(-1)
        }}
      />
      <Stack flexDirection={"row"} spacing={'30px'}>
        <CustomButton
          label={"확인"}
          onClick={async () => {
            handlerModalOpen('normal');
          }}
        />
      </Stack>
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
          
        }}
      >
        123213ㅂㅈㅂㅈ
      </ModalComponents>
  </Fragment>
}

export default BusPlanReceptionMgtInfo