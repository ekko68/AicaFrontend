import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {EquipmentListView} from "../EquipmentListView";

const ApplyEquipment = () => {

  const navigate = useNavigate()

  const handlerItemClick = (id:string) => {
    navigate(`/tsp/Apply/Equipment/${id}`);
    // /Apply/Estimation/ApplyEstimation/
  }

  return <EquipmentListView
    title={'장비사용 신청'}
    placeholder={'사용할 장비명을 입력해주세요!'}
    onClickEquipment={handlerItemClick}/>
}

export default ApplyEquipment