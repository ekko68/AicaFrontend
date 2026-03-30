import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {SubContents, TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import {SearchParam} from "~/service/Model";
import {Box, Stack, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {
  SearchTable,
  TableDateTermCell,
} from "shared/components/TableComponents";
import {todayEndTime, todayTime} from "shared/utils/stringUtils";
import {CustomButton, CustomIconButton} from "shared/components/ButtonComponents";
import {Icons} from "shared/components/IconContainer";

/* 실증장비통계 */
const StatisticsEquipment = () => {
  const [searchParam, setSearchParam] = useState<SearchParam>()
  return <TitleContents title={"실증장비통계"}>
    <SearchBox setSearch={setSearchParam}/>
    <VerticalInterval size={"30px"}/>
    <Box sx={{
      border: "1px solid #d7dae6",
      borderRadius: "20px"
    }}>
      <Box sx={{textAlign: 'end', padding:'10px 30px 0px 0px'}}>
        <CustomIconButton
          startText={'엑셀저장'} icon={Icons.FileDownload}
          style={{borderRadius: '5px', fontSize: '16px', fontWeight: 'bold'}}/>
      </Box>
      <Box sx={{
        display: 'flex',
        padding: '10px 30px 30px 30px',
        justifyContent: 'space-between',
      }}>
        <Box sx={{width: '30%', border: '1px solid #d7dae6', borderRadius: "20px",}}>
          <h2 style={{fontSize: '1.625rem', textAlign: 'center'}}>
            장비가용률
          </h2>
          <h2 style={{fontSize: '3.5rem', textAlign: 'end', marginBottom: '50px', paddingRight: '40px'}}>
            100 <span style={{fontSize: '1.5rem', marginLeft: '30px'}}>%</span>
          </h2>
        </Box>
        <Box sx={{width: '30%', border: '1px solid #d7dae6', borderRadius: "20px",}}>
          <h2 style={{fontSize: '1.625rem', textAlign: 'center'}}>
            장비사용률
          </h2>
          <h2 style={{fontSize: '3.5rem', textAlign: 'end', marginBottom: '50px', paddingRight: '40px'}}>
            100 <span style={{fontSize: '1.5rem', marginLeft: '30px'}}>%</span>
          </h2>
        </Box>
        <Box sx={{width: '30%', border: '1px solid #d7dae6', borderRadius: "20px",}}>
          <h2 style={{fontSize: '1.625rem', textAlign: 'center'}}>
            장비 사용 기업수
          </h2>
          <h2 style={{fontSize: '3.5rem', textAlign: 'end', marginBottom: '50px', paddingRight: '40px'}}>
            100 <span style={{fontSize: '1.5rem', marginLeft: '30px'}}>건</span>
          </h2>
        </Box>
      </Box>
    </Box>
  </TitleContents>
}

const SearchBox: React.FC<{
  setSearch: Dispatch<SetStateAction<SearchParam | undefined>>
}> = props => {
  const [search, setSearch] = useState(false)
  const [searchParam, setSearchParam] = useState<SearchParam>()
  useEffect(() => {
    if (search) {
      props.setSearch(searchParam!)
      // if (props.onClick) props.onClick(searchParam!)
      setSearch(false)
    }
  }, [search])

  return <Box sx={{
    border: "1px solid #d7dae6",
    borderRadius: "20px",
  }}>
    <TableContainer>
      <SearchTable>
        <TableBody>
          <TableRow>
            <TableDateTermCell
              label={"검색일"}
              thWidth={"12%"} tdWidth={"38%"}
              onChange={(beginTime, endTime) => {
                setSearchParam({...searchParam, creatBeginDt: todayTime(beginTime), creatEndDt: todayEndTime(endTime)})
              }}/>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} style={{textAlign: "center", borderBottom: "none"}}>
              <CustomButton label={"검색"} onClick={() => {
                setSearch(true);
              }}/>
            </TableCell>
          </TableRow>
        </TableBody>
      </SearchTable>
    </TableContainer>
  </Box>
}

export default StatisticsEquipment