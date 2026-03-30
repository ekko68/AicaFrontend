import React, { useState,useRef, useEffect, useCallback } from "react"
import {useQuery,useMutation} from "react-query";
import * as styles from '~/styles/styles';
import { NavLink,useLocation,useNavigate } from "react-router-dom";
import { Box, Button, Input, Link, Stack, TextField, useMediaQuery, useTheme } from '@mui/material';
import BreadCrumb from "~/components/BreadCrumb";
import { CustomRadioButtons, CustomButton } from '~/components/ButtonComponents';
import { fetchGetMemberInfo, fetchInfoModif} from '~/fetches';
import { ChangePhoneModal } from "./view/ChangePhoneModal";
import { ChangeEmailModal } from "./view/ChangeEmailModal";
import { ChangePasswordModal } from "./view/ChangePasswordModal";
import { memberType } from "~/models/Model";
import { FetchNiceIdPost } from "~/fetches/fetchTerms";
import { fetchPasswdChange } from "~/fetches/fetchSignIn";
import authentication from 'shared/authentication';
import { useGlobalModalStore, useGlobalScroll, useScroll } from "~/pages/store/GlobalModalStore";
/* 
  회면ID    :   UI-USP-FRN-0050101
  화면명    :   이페이지 -> 사용자 지원 -> 회원정보변경
  작성일    :   2022/06/05
  화면/개발 :   Seongeonjoo / navycui
*/

const _global = (window /* browser */ || global /* node */) as any
const  MemberInfoMdf = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const {scrollY, direction} = useScroll();
  const {addModal} = useGlobalModalStore();
  const key:any = sessionStorage.getItem('__FACTOR_KEY__');
  const formValues:any = useRef(null);
  const [encodeData,setEncodeData] = useState('');
  const [encodeDataCallback,setEncodeDataCallback] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [memType,setMemType] = useState('')
  const [infoModif,setInfoModif] = useState<memberType>({ memberNm: "", chargerNm: "", ceoNm: "", marketingReception: true});

  const qs = new URLSearchParams(location.search);
  const next = qs.get('check');

  useEffect(() => {
    // setScroll(false)
    if(!!!authentication.getToken()){
      navigate(`/signin?nextUrl=${window.btoa(window.location.href)}`)
    } else {
      if(!!next){
        if(next.includes('factor')){
          niceInit()
          return;
        } else {
          navigate('/factor')
        }
      } else {
        navigate('/factor')
      }
    }

  }, []);

  // 상세 조회
  const { data:memInfo, refetch}:any = useQuery("getMemberInfo", async () => await fetchGetMemberInfo(key),{
    enabled:!!key
  });

  useEffect(() => {
    if(!!memInfo){
      setInfoModif((pre)=>({...pre,memberNm: memInfo.memberNm, chargerNm: memInfo.chargerNm, ceoNm: memInfo.ceoNm,marketingReception: memInfo.marketingReception}))
      switch (memInfo.memberType) {
        case 'INDIVIDUAL':
          setMemType('개인')
        break;
        case 'INSIDER':
          setMemType('내부사용자')
        break;
        case 'UNIVERSITY':
          setMemType('대학')
        break;
        case 'EVALUATOR':
          setMemType('평가위원')
        break;
        case 'CORPORATION':
          setMemType('법인사업자')
        break;
        case 'SOLE':
          setMemType('개인사업자')
        break;
        default:
          break;
      }
    }
  }, [memInfo]);

  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);

  // 본인인증 서비스 요청
  const {mutate:niceInit} = useMutation(async () => await FetchNiceIdPost({successUrl:`${process.env.REACT_APP_SUCCESS_NICE_URL}`,failUrl:`${process.env.REACT_APP_FAIL_NICE_URL}`}), {
    onError: (error:any) => {
      addModal({
        type:'normal',
        open: true,
        content: error.message
      })
    },
    onSuccess: (data) => {
      setEncodeData(data.encData);
    }
  });

  // change event
  const handelChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInfoModif((state) => ({ ...state, [name]: value }));
  }

  // 본인인증 서비스 결과 저장
  const {mutate:niceResSave}:any = useMutation(async () => await fetchPasswdChange(encodeDataCallback,key),{
    onError: (error:any) => {
      addModal({
        type:'normal',
        open: true,
        content: error.message,
        onConfirm:() => {
          navigate('/')
        },
      })
    },
    onSuccess: (data) => {
      refetch()
    }
  });

  // 본인인증 서비스 팝업
  const fnPopup = () => {
		window.open('', 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
    formValues.current.action="https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
    formValues.current.target = "popupChk";
    formValues.current.submit();
  }
  // 팝업창 콜백
  _global.setEncodeData = (encodeData:string)=>{
    if(!!encodeData){
      setEncodeDataCallback(encodeData)
      niceResSave()
    }
  }

  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01} className={direction ? "fixed scrollaction" : "fixed"}>
        <Box className="benner" component={'div'} ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">회원정보변경</h2>
              <p>회원가입정보를 확인하고 변경하실 수 있습니다.</p>
            </div>
          </div>
        </Box>
      </Box>
      <Box css={styles.sub_cont02} sx={{ marginTop:( scrollY ? (isMobile ? `${height  - 30 }px` : `${height - 90}px`) : `${height }px`)}}>
        <div className="content">
          <Box css={styles.table03}>
              <table>
                <colgroup></colgroup>
                <tbody>
                  <tr>
                    <th>회원유형</th>
                    <td>{memType}</td>
                  </tr>
                  {memInfo?.memberType == 'INDIVIDUAL' ?
                  <>
                    <tr>
                      <th>이름</th>
                      <td>{memInfo?.memberNm}</td>
                    </tr>
                    <tr>
                      <th>생년월일</th>
                      <td>{memInfo?.birthday}</td>
                    </tr>
                    <tr>
                      <th>성별</th>
                      <td>{memInfo?.gender == 'M' ? '남' : '녀'}</td>
                    </tr>
                    <tr>
                      <th>휴대폰번호</th>
                      <td>{memInfo?.mobileNo ? memInfo?.mobileNo : 'no data'} <Link className="blue" onClick={fnPopup}>변경</Link></td>
                    </tr>
                    <tr>
                      <th>이메일</th>
                      <td>{memInfo?.email ? memInfo?.email : 'no data'} <ChangeEmailModal onClick={()=>{refetch()}} type="perModal" email={memInfo?.email ? memInfo?.email : ''}/></td>
                    </tr>
                  </>
                  :
                  <>
                    <tr>
                      <th>사업자명</th>
                      <td className="table_input">
                        <TextField
                          name="memberNm" 
                          variant="outlined"
                          value={infoModif.memberNm}
                          fullWidth
                          onChange={handelChangeInput}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>사업자등록번호</th>
                      <td>{memInfo?.bizrno ? memInfo.bizrno : ''}</td>
                    </tr>
                    <tr>
                      <th>법인등록번호</th>
                      <td>{memInfo?.jurirno ? memInfo.jurirno : ''}</td>
                    </tr>
                    <tr>
                      <th>대표자명</th>
                      <td className="table_input">
                        <TextField
                          name="ceoNm" 
                          variant="outlined"
                          value={infoModif.ceoNm}
                          fullWidth
                          onChange={handelChangeInput}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>담당자명</th>
                      <td className="table_input">
                        <TextField
                          name="chargerNm" 
                          variant="outlined"
                          value={infoModif.chargerNm}
                          fullWidth
                          onChange={handelChangeInput}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>담당자 휴대폰번호</th>
                      <td>{memInfo?.mobileNo ? memInfo?.mobileNo : ''}
                        <Stack flexDirection={'row'}>
                          {
                            memInfo?.memberType == 'INDIVIDUAL' 
                            ? <Link className="blue" onClick={fnPopup}>변경</Link>
                            : <ChangePhoneModal type="bzModal" onSendRes={()=>refetch()}/>
                          }
                        </Stack>
                      </td>
                    </tr>
                    <tr>
                      <th>담당자 이메일</th>
                      <td>{memInfo?.email ? memInfo?.email : ''} <ChangeEmailModal onClick={refetch} type="bzModal" email={memInfo?.email ? memInfo?.email : ''}/></td>
                    </tr>
                  </>
                  }
                  <tr>
                    <th>아이디</th>
                    <td>{memInfo?.loginId}</td>
                  </tr>
                  <tr>
                    <th>비밀번호</th>
                    <td className="modal_pad"><ChangePasswordModal btnType="text"/></td>
                  </tr>
                  <tr>
                    <th>마케팅정보 수신</th>
                    <td>
                      <CustomRadioButtons
                        row
                        defaultData={infoModif.marketingReception ? '01' : '02'}
                        data={[{code:'01',codeNm:'동의'},{code:'02',codeNm:'미동의'}]}
                        onClick={(selected) => {
                          (selected === '02') ? setInfoModif((pre)=>({...pre,marketingReception:false})) : setInfoModif((pre)=>({...pre,marketingReception:true}))
                      }}/>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Stack direction="row" justifyContent="center" spacing={2} css={styles.btnGroup} >
                <CustomButton label={'취소'} type={'listBack'} color={'outlinedblack'} onClick={()=>navigate('/')}/>
                <CustomButton label={'저장'} type={'listBack'} color={'primary'} onClick={()=>{
                  fetchInfoModif(infoModif,key).then((res)=>{
                    addModal({
                      open: true,
                      content: '저장되었습니다',
                      type:'normal',
                    })

                  }).catch((err) => {
                    addModal({
                      open: true,
                      content: err.response.data.message == 'errors' ? err.response.data.errors[0].message : err.response.data.message
                    })
                  })
                }}/>
              </Stack>
              <Box css={styles.memout}>
                <NavLink to="/MyPage/MemberInfoMmt/MemberInfoOut">회원탈퇴</NavLink>
              </Box>
            </Box>
            {/* <!-- 본인인증 서비스 팝업을 호출하기 위해서는 다음과 같은 form이 필요합니다. --> */}
            <Box component='form' sx={{display:'none'}} name="form_chk" method="post" onSubmit={fnPopup} ref={formValues} style={{ textAlign: 'center'}}>
              <Input  type="hidden" name="m" value="checkplusService" />  {/* 필수 데이타로, 누락하시면 안됩니다. */}
              <Input  id="EncodeData" type="hidden" name="EncodeData" value={encodeData} />  {/* 위에서 업체정보를 암호화 한 데이타입니다. */}
              <Button id="btn-click" variant="contained" type="submit" className="linebtn" sx={{ mt:10 }}>안심본인인증 테스트</Button>
            </Box>
            {/* 비밀번호 확인영역 */}
            {/* <SnsLogin/> */}
        </div>
      </Box>
    </div>
  )
}

export default MemberInfoMdf;

