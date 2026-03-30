import {SubContents} from "shared/components/LayoutComponents";
import {useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import {CustomHeadCell, TableComponents, WithCustomRowData} from "shared/components/TableComponents";
import {BusPlanReceptionMgtService} from "~/pages/Convention/MgtOfContractSigning/BusPlanReceptionMgt/Service/BusPlanReceptionMgtService";
import { BsnsPlanProcessHist} from "~/pages/Convention/MgtOfContractSigning/BusPlanReceptionMgt/Model";
import {TableCell, Stack} from "@mui/material";
import { toTimeFormat} from "shared/utils/stringUtils";
import {CustomButton} from "~/components/ButtonComponents";
import {useNavigate} from "react-router-dom";
import { AgtChangeMgtHistListView as ListView } from "~/pages/Convention/ContractMgt/AgtChangeMgt/component/AgtChangeMgtHistListView";

export const AgtChangeMgtHist = () => {
  const navigate = useNavigate()
  return <SubContents title={"처리이력 조회"} maxHeight={"100%"}>
    <ListView/>
    <Stack>
      <Stack flexDirection={"row"} justifyContent={"space-between"} sx={{width: "100%", marginTop: "40px"}}>
        <CustomButton
          label={"목록"} type={"largeList"} color={"outlined"}
          onClick={() => {
            navigate(-1)
          }}
        />
        <Stack flexDirection={"row"} spacing={'30px'}>
          <CustomButton
            label={"반려"}
            onClick={async () => {
            }}
          />
          <CustomButton
            label={"승인"}
            onClick={async () => {
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  </SubContents>
}
