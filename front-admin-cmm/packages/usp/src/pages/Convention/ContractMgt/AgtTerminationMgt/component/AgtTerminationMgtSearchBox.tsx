import React, {Dispatch, SetStateAction, useEffect, useState} from "react"
import {Box, TableBody, TableCell, TableRow} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {
  SearchTable, 
  TableDateTermCell,
  TableSelectCell,
  TableSelectTextFieldCell, WithCustomRowData
} from "shared/components/TableComponents";
import { CustomButton } from "shared/components/ButtonComponents";
import { SearchParam } from "~/pages/Convention/ContractMgt/AgtTerminationMgt/Model";

export const AgtTerminationMgtSearchBox: React.FC<{setSearch: Dispatch<SetStateAction<SearchParam | undefined>>}> = props => {
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
              <TableDateTermCell
                division label={"해지일"}
                thWidth={"12%"} tdWidth={"38%"}
                onChange={(beginTime, endTime) => {
                  
                }}/>
            </TableRow>
            <TableRow>
              <TableSelectTextFieldCell
                label={"키워드검색"} tdSpan={3}
                selectLabel={["접수번호","과제명", "사업자명", "이름", "사업명"]}
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
                  if (searchKeyword === "사업자명") {
                    setSearchParam({...searchParam, receiptNo: searchText, taskNmKo: "", memberNm: ""})
                  } else if (searchKeyword === "과제명") {
                    setSearchParam({...searchParam, receiptNo: "", taskNmKo: searchText, memberNm: ""})
                  } else if (searchKeyword === "이름") {
                    setSearchParam({...searchParam, receiptNo: "", taskNmKo: "", memberNm: searchText})
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