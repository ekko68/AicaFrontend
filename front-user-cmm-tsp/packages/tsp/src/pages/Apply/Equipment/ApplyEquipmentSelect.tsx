import {EquipmentDetailView} from "../EquipmentDetailView";
import {useNavigate} from "react-router-dom";
import {useGlobalModalStore} from "shared/store/GlobalModalStore";

const ApplyEquipmentSelect = () => {
  const navigate = useNavigate()
  const {addModal} = useGlobalModalStore()

  const handlerEstimationClick = (id:string) => {
    navigate(`/tsp/Apply/Equipment/UseEquipmentApply/${id}`)
    //addModal({open: true, title: '구현중입니다.', isDist: true})
  }

  return <EquipmentDetailView title={'장비사용 신청'} onClick={handlerEstimationClick}/>
}

export default ApplyEquipmentSelect