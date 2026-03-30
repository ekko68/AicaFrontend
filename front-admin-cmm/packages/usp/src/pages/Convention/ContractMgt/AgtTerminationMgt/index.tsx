// 협약 -> 협약체결관리 -> 사업계획서접수관리 페이지
import { useState } from "react"
import { TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import { SearchParam } from "~/pages/Convention/ContractMgt/AgtTerminationMgt/Model";
import { AgtTerminationMgtSearchBox as SearchBox }  from "~/pages/Convention/ContractMgt/AgtTerminationMgt/component/AgtTerminationMgtSearchBox"
import { AgtTerminationListView as ListView } from "~/pages/Convention/ContractMgt/AgtTerminationMgt/component/AgtTerminationListView"

const AgtTerminationMgt = () => {
  const [searchParam, setSearchParam] = useState<SearchParam>()
  return (
  <TitleContents title={"협약해지 관리"}>
    <SearchBox setSearch={setSearchParam} />
    <VerticalInterval size={"30px"}/>
    <ListView searchParam={searchParam}/>
  </TitleContents>
  )
}

export default AgtTerminationMgt;