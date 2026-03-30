// 협약 -> 협약체결관리 -> 전자협약관리 페이지
/*
    Date Created          :   2022/08/24
    Screen Name           :   전자협약 목록
    Screen ID             :   UI-USP-ADM-0230101
    Developer Name        :   jhan
*/
import { useState } from "react"
import { TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import { 
  ElectronicAgtSearchBox as SearchBox,
  ElectronicAgtListView as ListView
}  from "./component"
import { SearchParam } from "./Model";

const ElectronicAgtMgt = () => {
  // params setting
  const [searchParam, setSearchParam] = useState<SearchParam>()
  return (
  <TitleContents title={"전자협약 관리"}>
    <SearchBox setSearch={setSearchParam} />
    <VerticalInterval size={"30px"}/>
    <ListView searchParam={searchParam}/>
  </TitleContents>
  )
}

export default ElectronicAgtMgt;