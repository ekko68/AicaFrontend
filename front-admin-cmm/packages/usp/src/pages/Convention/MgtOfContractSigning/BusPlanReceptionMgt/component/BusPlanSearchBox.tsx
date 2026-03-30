/*
    Date Created          :   2022/08/24
    Screen Name           :   사업계획서 목록 조건 검색 박스
    Screen ID             :   UI-USP-ADM-0220101
    Developer Name        :   jhan
*/
import React, {Dispatch, SetStateAction, useEffect, useState} from "react"
import {Box, TableBody, TableCell, TableRow} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {
  SearchTable, 
  TableTextFieldCell,
  TableSelectCell,
  TableSelectTextFieldCell
} from "shared/components/TableComponents";
import { CustomButton } from "shared/components/ButtonComponents";
import { SearchParam, CmmCode } from "../Model";
import {fetchGetCommCode} from '~/fetches'

const BusPlanSearchBox: React.FC<{setSearch: Dispatch<SetStateAction<SearchParam | undefined>>}> = props => {
    
    // params setting
    const [searchParam, setSearchParam] = useState<SearchParam>()
    const [search, setSearch] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState("")
    const [searchText, setSearchText] = useState("")
    const [planPresentStatusList, setPlanPresentStatusList] = useState<CmmCode[]>([])
    const [planPresentStatus, setPlanPresentStatus] = useState<string[]>([]);

    // reset when search parameter is changed
  useEffect(() => {
     if (search) {
       props.setSearch(searchParam!)
       setSearch(false)
     }
  }, [search])
    
  const init = () => {
    fetchGetCommCode("PLAN_PRESENTN_STTUS")
    .then((response) => {
      console.log("fetchGetCommCode:",response.list)
      const status = response.list.map((item)=>{
        return item.codeNm
      });
      const data = ["전체"].concat(status);
      setPlanPresentStatus(data)
      setPlanPresentStatusList(response.list)
    })
    .catch((e) => {
      console.log(e)
    });
  };
  useEffect(init,[]);

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
                division medium label={"처리 상태"}
                thWidth={"12%"} tdWidth={"38%"}
                selectLabel={ planPresentStatus }
                defaultLabel={"전체"}
                onClick={(selected: string) => {
                  setSearchParam({...searchParam, planPresentnSttusCd: selected})
                  if(!!searchParam){
                    setSearchParam({...searchParam, planPresentnSttusCd: ""})
                    const codeItems:CmmCode[] = planPresentStatusList.filter((item)=> item.codeNm === selected)
                    if(!!codeItems && codeItems.length > 0){
                       setSearchParam({...searchParam, planPresentnSttusCd: codeItems[0].code})
                    }
                  }
                }}/>
               <TableTextFieldCell
                division label={"공고명"} defaultLabel={''}
                thWidth={"12%"} tdWidth={"38%"}
                onChange={(text) => {
                  setSearchParam({...searchParam, pblancNm: text})
                }}
              />
            </TableRow>
            <TableRow>
              <TableSelectTextFieldCell
                label={"키워드검색"} tdSpan={3}
                selectLabel={["접수번호", "과제명", "회원명"]}
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
                    setSearchParam({...searchParam, receiptNo: searchText, taskNmKo: "", memberNm: ""})
                  } else if (searchKeyword === "과제명") {
                    setSearchParam({...searchParam, receiptNo: "", taskNmKo: searchText, memberNm: ""})
                  } else if (searchKeyword === "회원명") {
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

  export default BusPlanSearchBox;