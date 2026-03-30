import {useNavigate} from "react-router-dom";
import {EquipmentListView} from "../EquipmentListView";

const ApplyEstimation = () => {
  const navigate = useNavigate()

  const handlerItemClick = (id:string) => {
    navigate(`/tsp/Apply/Estimation/${id}`)
  }

  return <EquipmentListView
    title={'장비사용 견적요청'}
    placeholder={'견적 요청할 장비명을 입력해주세요!'}
    onClickEquipment={handlerItemClick}/>
}

export default ApplyEstimation