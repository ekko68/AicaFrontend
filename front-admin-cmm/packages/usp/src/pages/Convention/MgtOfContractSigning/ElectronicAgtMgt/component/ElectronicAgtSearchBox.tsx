import React, {Dispatch, SetStateAction, useEffect, useState} from "react"
import {Box, TableBody, TableCell, TableRow} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { SearchTable, TableTextFieldCell,TableSelectCell,TableSelectTextFieldCell, TableDateTermCell } from "shared/components/TableComponents";
import { CustomButton } from "shared/components/ButtonComponents";
import { SearchParam } from "~/pages/Convention/MgtOfContractSigning/ElectronicAgtMgt/Model";

const ElectronicAgtSearchBox: React.FC<{setSearch: Dispatch<SetStateAction<SearchParam | undefined>>}> = props => {
    const [searchParam, setSearchParam] = useState<SearchParam>()
    const [search, setSearch] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState("")
    const [searchText, setSearchText] = useState("")
  
    useEffect(() => {
      if (search) {
        props.setSearch(searchParam!)
        setSearch(false)
      }
    }, [search])
  
    return <Box sx={{ border: "1px solid #d7dae6",borderRadius: "20px" }}>
      <TableContainer>
        <SearchTable>
          <TableBody>
            <TableRow>
              <TableSelectCell
                division medium label={"사업연도"}
                thWidth={"12%"} tdWidth={"38%"}
                selectLabel={["전체","2021","2022","2023","2024","2025","2026","2027","2028","2029","2020"]}
                defaultLabel={"전체"}
                onClick={(selected: string) => {
                  setSearchParam({...searchParam, bsnsYear: selected})
                }}/>
              <TableTextFieldCell
                division label={"사업명"} defaultLabel={''}
                thWidth={"12%"} tdWidth={"38%"}
                onChange={(text) => {
                  setSearchParam({...searchParam, bsnsNm: text})
                }}
              />
            </TableRow>
            <TableRow>
              <TableSelectCell
                division medium label={"협약 상태"}
                thWidth={"12%"} tdWidth={"38%"}
                selectLabel={ ["전체","대기중","서명요청","업체서명완료","협약완료","협약해지"]}
                defaultLabel={"전체"}
                onClick={(selected: string) => {
                  setSearchParam({...searchParam, cnvnSttusCd: selected})
                }}/>
               <TableDateTermCell
                division label={"협약일"}
                thWidth={"12%"} tdWidth={"38%"}
                onChange={(beginTime, endTime) => {
                  setSearchParam({...searchParam, cnvnBgnde: beginTime.getTime(), cnvnEndde: endTime.getTime()})
                }}/>
            </TableRow>
            <TableRow>
              <TableSelectTextFieldCell
                label={"키워드검색"} tdSpan={3}
                selectLabel={["접수번호", "과제명", "주관업체명", "과제책임자명"]}
                defaultLabel={searchText}
                onClick={(selected: string) => {
                  setSearchKeyword(selected)
                  setSearchText("")
                  setSearchParam({...searchParam, receiptNo: "", taskNmKo: "", memberNm: ""})
                }}
                onChange={(text: string) => {
                  setSearchText(text)
                }}
              />
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} style={{textAlign: "center", borderBottom: "none"}}>
                <CustomButton label={"검색"} onClick={() => {
                  if (searchKeyword === "접수번호") {
                    setSearchParam({...searchParam, receiptNo: searchText, taskNmKo: "", memberNm: "", rspnberNm:""})
                  } else if (searchKeyword === "과제명") {
                    setSearchParam({...searchParam, receiptNo: "", taskNmKo: searchText, memberNm: "", rspnberNm:""})
                  } else if (searchKeyword === "주관업체명") {
                    setSearchParam({...searchParam, receiptNo: "", taskNmKo: "", memberNm: searchText, rspnberNm:""})
                  } else if (searchKeyword === "과제책임자명") {
                    setSearchParam({...searchParam, receiptNo: "", taskNmKo: "", memberNm: "", rspnberNm: searchText})
                  }                    
                  // searchParam을 검색시 적용하기 떄문에 useEffect에서 검색되도록 함.
                  setSearch(true);
                }}/>
              </TableCell>
            </TableRow>
          </TableBody>
        </SearchTable>
      </TableContainer>
    </Box>
  };

  export default ElectronicAgtSearchBox;