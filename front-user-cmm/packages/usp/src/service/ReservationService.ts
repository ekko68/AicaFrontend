import {UseQueryResult} from "react-query";
import { GetQuery} from "shared/libs/axios";
import { TimeListResponse } from "./../models/ModelReservation";

export class ReservationService {
    //공유시설 일자별 예약불가시간 목록 조회(PRG-USP-R04-02)
    static FetchTimeListGet(param: { mvnFcId: string, ymd: string}): UseQueryResult<TimeListResponse, any> {
      return GetQuery(`${process.env.REACT_APP_DOMAIN_MVN_BNET}/mvn/api/reservation/cutoff-time/${param.mvnFcId}`, {ymd : param.ymd})
    }
  
  }