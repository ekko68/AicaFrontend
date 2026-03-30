import {EquipmentDetailView} from "../EquipmentDetailView";
import {useNavigate} from "react-router-dom";

const ApplyEstimationSelect = () => {
  const navigate = useNavigate()

  const handlerEstimationClick = (id:string) => {
    navigate(`/tsp/Apply/Estimation/ApplyEstimation/${id}`);
  }
  return <EquipmentDetailView title={'장비사용 견적요청'} onClick={handlerEstimationClick}/>
}

export default ApplyEstimationSelect