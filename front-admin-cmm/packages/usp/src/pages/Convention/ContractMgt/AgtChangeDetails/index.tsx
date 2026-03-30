// 협약 -> 협약체결관리 -> 사업계획서접수관리 페이지
import { useState } from "react"
import { TitleContents, VerticalInterval} from "shared/components/LayoutComponents";
import { SearchParam } from "~/pages/Convention/ContractMgt/AgtChangeDetails/Model";
import { AgtChangeDetailsSearchBox }  from "~/pages/Convention/ContractMgt/AgtChangeDetails/component/AgtChangeDetailsSearchBox"
import { AgtChangeDetailsListView } from "~/pages/Convention/ContractMgt/AgtChangeDetails/component/AgtChangeDetailsListView"

const AgtChangeDetails = () => {
  const [searchParam, setSearchParam] = useState<SearchParam>()
  return (
  <TitleContents title={"협약변경 내역"}>
    <AgtChangeDetailsSearchBox setSearch={setSearchParam} />
    <VerticalInterval size={"30px"}/>
    <AgtChangeDetailsListView searchParam={searchParam}/>
  </TitleContents>
  )
}

export default AgtChangeDetails;