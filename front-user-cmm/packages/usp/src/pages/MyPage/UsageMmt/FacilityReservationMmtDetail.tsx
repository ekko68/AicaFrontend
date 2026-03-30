import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import * as styles from '~/styles/styles';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { CustomButton } from '~/components/ButtonComponents';
import { useMutation, useQuery } from 'react-query';
import { useGlobalModalStore } from '~/pages/store/GlobalModalStore';
import { fetchMvnFcSpacesPut, fetchReservationUserDetail } from '~/fetches/fetchMoveIn';
import { ModalComponents } from '~/components/ModalComponents';

/* 
  작성일    :   2022/06/09
  화면명    :   마이페이지/ -> 시설예약관리 상세페이지
  회면ID    :   UI-USP-FRN-0290201
  화면/개발 :   Seongeonjoo / navycui
*/
const  FacilityReservationMmtDetail =  () => {
  const {addModal} = useGlobalModalStore();
  const navigate = useNavigate();
  const receive:any = useLocation();
  const [reserveId, setReserveId] = useState('');
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState('');

  // 초기화
  useEffect(() => {
    if(!!receive.state){
      setReserveId(receive.state.item.reserveId)
    }
  }, []);

  // 상세 조회
  const { data } = useQuery(["getReservationDetail",reserveId], async () => await fetchReservationUserDetail(reserveId),{
    enabled:!!reserveId,
    onError:(err:any)=> {
      setErrors(err.response.data.message)
      setOpen(true)
    },
  });

  // 예약 취소 [시설예약 상태변경] (PRG-USP-R01-03)
  const {mutate} = useMutation(async () => await fetchMvnFcSpacesPut({reserveId: reserveId , reserveSt: 'RSVT_RTRCN', rejectReasonCn: data.mvnFcRsvt.rejectReasonCn}), { 
    onError: (error:any, variable, context) => {
      console.log("error", error);
      setErrors(error.response.data.message)
      setOpen(true)
    },
    onSuccess: (data) => {
      addModal({
        type:'normal',
        open: true,
        content: "저장되었습니다."
      })
      navigate('/MyPage/UsageMmt/FacilityReservationMmt')
    }
  });

  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01}>
        <div className="benner">
          <div className="content">
            <div className="txtbox">
              <h2 className="tit" style={{ marginTop: 0 }}>
                시설예약 상세
              </h2>
              <p>
                AICA에 전달하신 의견 및 제안 목록과 답변을 확인하실 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </Box>
      <Box css={styles.sub_cont02}>
        <div className="content">
          <Box css={styles.table05}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
            >
              {'기본정보'}
            </Typography>
            <div className="detail_table"> 
              <dl>
                <dt>신청일시</dt>
                <dd>{!!data ? dayjs(data.mvnFcRsvt.fmtReserveStDt).format('YYYY-MM-DD hh:mm') : ''}</dd>
                <dt>예약상태</dt>
                <dd>{!!data ? data.mvnFcRsvt.reserveStNm : ''}</dd>
              </dl>
            </div>
            {/* <Typography
              gutterBottom
              variant="h6"
              component="div"
            >
              {'신청자정보'}
            </Typography>
            <div className="detail_table"> 
              <dl>
                <dt>사업자명/이름</dt>
                <dd>㈜블루레몬</dd>
                <dt>휴대폰번호</dt>
                <dd>010-1234-1234</dd>
              </dl>
              <dl>
                <dt>이메일</dt>
                <dd>abc@gmail.com</dd>
                <dt>입주여부</dt>
                <dd>입주 A 단지 101호</dd>
              </dl>
            </div> */}
            <Typography
              gutterBottom
              variant="h6"
              component="div"
            >
              {'시설정보'}
            </Typography>
            <div className="detail_table"> 
              <dl>
                <dt>시설명</dt>
                <dd>{!!data ? data.mvnFc.mvnFcNm : ''}</dd>
                <dt>예약유형</dt>
                <dd>{!!data ? data.mvnFc.reserveTypeNm : ''}</dd>
              </dl>
              <dl>
                <dt>수용인원</dt>
                <dd>최대 {!!data ? data.mvnFc.mvnFcCapacity : ''}명</dd>
                <dt>이용가능시간</dt>
                <dd>{!!data ? data.mvnFc.utztnBeginHh : ''} ~ {!!data ? data.mvnFc.utztnEndHh : ''}시</dd>
              </dl>
            </div>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
            >
              {'신청정보'}
            </Typography>
            <div className="detail_table"> 
              <dl>
                <dt>예약일</dt>
                <dd>{!!data ? dayjs(data.mvnFcRsvt.rsvtDay).format('YYYY-MM-DD') : ''}</dd>
                <dt>예약시간</dt>
                <dd>{!!data ? data.mvnFcRsvt.fmtRsvtTm : ''}</dd>
              </dl>
              <dl>
                <dt>이용인원수</dt>
                <dd>{!!data ? data.mvnFcRsvt.rsvtNope : ''}명</dd>
              </dl>
              <dl>
                <dt>이용목적</dt>
                <dd>
                  <div>
                    {!!data ? data.mvnFcRsvt.utztnPurpose.replace(/(?:\r\n|\r|\n)/g, '\r\n').split('\r\n').map((item:any) => ( <p>{item} </p>))
                    : ''}
                  </div>
                </dd>
              </dl>
            </div>
              <Stack direction="row" justifyContent="center" spacing={2} css={styles.btnGroup}>
                <CustomButton label={'예약취소'} type={'listBack'} color={'primary'} onClick={()=>{mutate()}}/>
              </Stack>
              <Stack direction="row" justifyContent="center" spacing={2} css={styles.btnGroup}>
                <CustomButton label={'수정'} type={'listBack'} color={'outlined'}/>
              </Stack>
            </Box>
        </div>
      </Box>
      <ModalComponents open={open} type={'normal'} content={errors} 
        onConfirm={() => { setOpen(false) }} 
        onClose={() => { setOpen(false)}}>
    </ModalComponents>
    </div>
  );
}

export default FacilityReservationMmtDetail;
