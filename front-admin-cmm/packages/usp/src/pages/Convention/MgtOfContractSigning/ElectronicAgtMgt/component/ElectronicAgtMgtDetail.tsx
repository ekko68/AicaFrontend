import {TitleContents} from "shared/components/LayoutComponents";
import {ElectronicAgtMgtInfo} from "~/pages/Convention/MgtOfContractSigning/ElectronicAgtMgt/component"


const ElectronicAgtMgtDetail = () =>{
  return <TitleContents title={"전자협약 상세"}>
          <ElectronicAgtMgtInfo />
    </TitleContents>
}

export default ElectronicAgtMgtDetail;