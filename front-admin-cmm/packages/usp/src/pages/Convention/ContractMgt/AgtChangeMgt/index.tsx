// 협약 -> 협약체결관리 -> 사업계획서접수관리 페이지
import { useState } from "react"
import { TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import { AgtChangeSearchBox }  from "~/pages/Convention/ContractMgt/AgtChangeMgt/component/AgtChangeSearchBox"
import { SearchParam } from "~/pages/Convention//ContractMgt/AgtChangeMgt/Model";
import { AgtChangeListView } from "~/pages/Convention/ContractMgt/AgtChangeMgt/component/AgtChangeListView"

const AgtChangeMgt = () => {
  const [searchParam, setSearchParam] = useState<SearchParam>()
  return (
  <TitleContents title={"협약변경 관리"}>
    <AgtChangeSearchBox setSearch={setSearchParam} />
    <VerticalInterval size={"30px"}/>
    <AgtChangeListView searchParam={searchParam}/>
  </TitleContents>
  )
}

export default AgtChangeMgt;