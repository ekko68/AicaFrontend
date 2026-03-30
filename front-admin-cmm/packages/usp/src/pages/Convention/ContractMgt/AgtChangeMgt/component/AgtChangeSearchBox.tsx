import React, {Dispatch, SetStateAction, useEffect, useState} from "react"
import {Box, TableBody, TableCell, TableRow} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {
  SearchTable, 
  TableTextFieldCell,
  TableSelectCell,
  TableSelectTextFieldCell, WithCustomRowData
} from "shared/components/TableComponents";
import { CustomButton } from "shared/components/ButtonComponents";
import { SearchParam } from "~/pages/Convention/ContractMgt/AgtChangeMgt/Model";

export const AgtChangeSearchBox: React.FC<{setSearch: Dispatch<SetStateAction<SearchParam | undefined>>}> = props => {
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
                division medium label={"처리 상태"}
                thWidth={"12%"} tdWidth={"38%"}
                selectLabel={ ["전체","미제출","제출","보완요청","승인"]}
                defaultLabel={"전체"}
                onClick={(selected: string) => {
                  setSearchParam({...searchParam, cnvnChangeSttusCd: selected})
               }}/>
              <TableSelectCell
                division medium label={"변경 유형"}
                thWidth={"12%"} tdWidth={"38%"}
                selectLabel={ ["전체","승인","통보"]}
                defaultLabel={"전체"}
                onClick={(selected: string) => {
                  setSearchParam({...searchParam, cnvnChangeSttusCd: selected})
              }}/>
            </TableRow>
            <TableRow>
              <TableSelectCell
                division medium label={"변경 항목"}
                thWidth={"12%"} tdWidth={"38%"}
                selectLabel={ ["전체","수행기관신분(개인->사업자)","과제정보","참여기업","참여인력","사업비","비목별 사업비","신청자정보","과제책임자"]}
                defaultLabel={"전체"}
                onClick={(selected: string) => {
                  setSearchParam({...searchParam, cnvnChangeSttusCd: selected})
              }}/>
            </TableRow>
            <TableRow>
              <TableSelectTextFieldCell
                label={"키워드검색"} tdSpan={3}
                selectLabel={["과제명", "사업자명", "이름"]}
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