import React,{ useState } from "react";
import * as styles from './styles';
import { Box,Stack,Button, Typography, OutlinedInput, Checkbox, TooltipProps, Tooltip, tooltipClasses } from "@mui/material";
import { useTheme } from '@mui/material';
import { CustomButton } from "~/components/ButtonComponents";
import { fetchBusinessReason } from "~/fetches/biz/fetchBusinessAppMgt";
import { styled } from '@mui/material/styles';
import { useGlobalModalStore } from "~/pages/store/GlobalModalStore";
import IconButton from '@material-ui/core/IconButton';
import { QuestionIcon } from '~/components/IconComponents';
import { Modalfront } from "~/components/SharedModalComponents";

type TypeReason = {
    reqDt:string,
    reason:string
}

  //사유확인 모달
 export const ModalWorkingExpenses :React.FC<{
    applyId:string    // 신청id 전달 받아
  }> = (props) => {
    type modalType = 'normal' | 'confirm';
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<modalType>('normal');
    const [data, setData] = useState(false);
    const [resVal,setResVal] = useState<TypeReason>({reqDt:'',reason:''})
    const {addModal} = useGlobalModalStore();
    const handlerModalOpen = (type: modalType) => {
      setOpen(true);
      setType(type);
      getBusinessReason()
    };

  // 사유 조회
  const getBusinessReason = () => {
    fetchBusinessReason(props.applyId).then((res:TypeReason) => {
        if(!!res){
          setResVal(res)
        }
    }).catch((e)=>{
      let message = e.response.data.message;
      // addModal({
      //   open:true,
      //   content:message
      // })
    })
  }

  return (
    <>
      <CustomButton label={'등록'} type={'modify'} color={'outlined'} onClick={() => {handlerModalOpen('normal');}}/>
      <Modalfront
        open={open}
        type={type}
        title={'비목별 사업비 구성'}
        content={type.toString() + ' 모달'}
        onConfirm={() => {
          setOpen(false);
        }}
        onClose={() => {
          setOpen(false);
          if (data) setData(false);
        }}
      >
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'} sx={{marginTop:'4px',width:'1092px'}}>
          <h4 className="tbl_title">'2021년도 비목별 사업비 구성' <span className='unit'>(단위:천원)</span></h4>
          <div className='tbl_desc'>• 입력 후 등록버튼 클릭 시 연차별 요약정보가 산정됩니다.</div>
        </Stack>
        <table className="tableDefault type6">
          <colgroup>
            <col style={{width:'7%'}}/>
            <col style={{width:'14%'}}/>
            <col style={{width:'27%'}}/>
            <col style={{width:'13%'}}/>
            <col style={{width:'13%'}}/>
            <col style={{width:'13%'}}/>
            <col style={{width:'13%'}}/>
          </colgroup>
          <thead>
            <tr>
              <th colSpan={2}>구분</th>
              <th colSpan={4}>사업비 편성 내용</th>
              <th rowSpan={3}>합계</th>
            </tr>
            <tr>
              <th rowSpan={2}>비목</th>
              <th rowSpan={2}>세목</th>
              <th rowSpan={2}>산출근거</th>
              <th rowSpan={2}>지원예산</th>
              <th colSpan={2}>민간부담금</th>
            </tr>
            <tr>
              <th>현금</th>
              <th>현물</th>
            </tr>
          </thead>
        </table>
        <div className="tableDefault_scroll vert" style={{height:'510px'}}>
          <table className="tableDefault type7">
            <colgroup>
              <col style={{width:'7.1%'}}/>
              <col style={{width:'14.1%'}}/>
              <col style={{width:'27.1%'}}/>
              <col style={{width:'13.1%'}}/>
              <col style={{width:'13.1%'}}/>
              <col style={{width:'13.1%'}}/>
              <col style={{width:'12.4%'}}/>
            </colgroup>
            <tbody>
              <tr>
                <td rowSpan={4}>인건비</td>
                <td className="tal">
                <Stack style={{alignSelf:'end'}} flexDirection={'row'}  css={styles.tooltip}>
                  보수
                  <HtmlTooltip
                    title={
                      <React.Fragment>
                        {/* <Typography color="inherit">신청상태 안내</Typography> */}
                        <ul className='tooltip_list'>
                          추후 내용 추가 예정
                          {/* <li><span className='clr01'>임시저장</span> 신청 전 임시저장 상태</li>
                          <li><span className='clr02'>신청</span> 사업담당자가 발표자료 보완을 요청한 상태</li>
                          <li><span className='clr03'>보완요청</span> 사업담당자가 발표자료 보완을 요청한 상태</li>
                          <li><span className='clr04'>반려</span> 신청에 탈락한 상태</li>
                          <li><span className='clr05'>접수완료</span> 사업담당자가 신청에 대해 접수완료 처리한 상태</li>
                          <li><span className='clr06'>신청취소</span> 신청자 또는 관리자에 의해 신청이 취소된 상태</li> */}
                        </ul>
                      </React.Fragment>
                    }
                    placement="bottom-start"
                  >
                    <IconButton>
                      <QuestionIcon />
                    </IconButton>
                  </HtmlTooltip>
                </Stack>
                </td>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td className="tar">0</td>
              </tr>
              <tr>
                <td className="tal">사용임금</td>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td className="tar">0</td>
              </tr>
              <tr>
                <td className="tal">일용임금</td>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td className="tar">0</td>
              </tr>
              <tr>
                <td className="tal sum">소계</td>
                <td>-</td>
                <td className="tar">0</td>
                <td className="tar">0</td>
                <td className="tar">0</td>
                <td className="tar">0</td>
              </tr>
              <tr>
                <td rowSpan={11}>운영비</td>
                <td className="tal">일반수용비</td>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td className="tar">0</td>
              </tr>
              <tr>
                <td className="tal">공공요금 및 제세</td>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td className="tar">0</td>
              </tr>
              <tr>
                <td className="tal">특근매식비</td>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td className="tar">0</td>
              </tr>
              <tr>
                <td className="tal">임차료</td>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td className="tar">0</td>
              </tr>
              <tr>
                <td className="tal">시설장비유지비</td>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td className="tar">0</td>
              </tr>
              <tr>
                <td className="tal">차량비</td>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td className="tar">0</td>
              </tr>
              <tr>
                <td className="tal">재료비</td>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td className="tar">0</td>
              </tr>
              <tr>
                <td className="tal">복리후생비</td>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td className="tar">0</td>
              </tr>
              <tr>
                <td className="tal">일반용역비</td>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td className="tar">0</td>
              </tr>
              <tr>
                <td className="tal">관리용역비</td>
                <td><OutlinedInput size="small" className="ipt_tp01" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td><OutlinedInput size="small" className="ipt_tp01 tar" sx={{width:'100%'}} /></td>
                <td className="tar">0</td>
              </tr>
              <tr>
                <td className="tal sum">소계</td>
                <td>-</td>
                <td className="tar">0</td>
                <td className="tar">0</td>
                <td className="tar">0</td>
                <td className="tar">0</td>
              </tr>
              <tr className="total">
                <td colSpan={2}>합계</td>
                <td>-</td>
                <td className="tar">0</td>
                <td className="tar">0</td>
                <td className="tar">0</td>
                <td className="tar">0</td>
              </tr>
            </tbody>
          </table>
        </div>  
        <Stack spacing={2} direction="row" justifyContent="center" css={styles.signbtn}>
          <Button fullWidth variant="contained" type="button" className="primary">확인</Button>
        </Stack>
      </Modalfront>
    </>
  );
};
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));