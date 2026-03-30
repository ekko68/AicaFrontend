// 협약 -> 협약체결관리 -> 사업계획서접수관리 페이지
/*
    Date Created          :   2022/08/24
    Screen Name           :   사업계획서접수 목록
    Screen ID             :   UI-USP-ADM-0220101
    Developer Name        :   jhan
*/
import { useState } from "react"
import { TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import { SearchParam } from "./Model";
import { 
   BusPlanSearchBox as SearchBox, 
   BusPlanListView  as ListView  
}  
from "./component";

const BusPlanReceptionMgt = () => {
  // params setting
  const [searchParam, setSearchParam] = useState<SearchParam>()
  return (
  <TitleContents title={"사업계획서접수 관리"}>
    <SearchBox setSearch={setSearchParam} />
    <VerticalInterval size={"30px"}/>
    <ListView searchParam={searchParam}/>
  </TitleContents>
  )
}

export default BusPlanReceptionMgt;