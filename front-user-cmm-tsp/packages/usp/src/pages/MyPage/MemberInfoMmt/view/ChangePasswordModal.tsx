import React, { useState } from "react"
import * as styles from '~/styles/styles';
import { Box, Button, Stack, TextField } from '@mui/material';
// import { NavLink,useNavigate,useLocation } from "react-router-dom";
import { CustomButton } from '~/components/ButtonComponents';
import { Modalfront } from '~/components/SharedModalComponents';
import {useQuery,useMutation} from "react-query";
import { fetchChangePw} from '~/fetches';
import { changePwType } from "~/models/Model";
import { regExpPassword } from "~/models/ModelSignin";
import { useGlobalModalStore } from "~/pages/store/GlobalModalStore";
import { useNavigate } from "react-router-dom";

/* 
  작성일    :   2022/06/05
  화면명    :   change password modal
  회면ID    :   UI-USP-FRN-0050401
  화면/개발 :   Seongeonjoo / navycui
*/
export const ChangePasswordModal:React.FC<{
  btnType?: "text" | "outlined" | "contained" | undefined
}> = (props) => {
    type modalType = 'normal' | 'confirm';
    const navigate = useNavigate();
    const {addModal} = useGlobalModalStore();
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<modalType>('normal');
    const [data, setData] = useState(false);
    const [changePw, setChangePw] = useState<changePwType>({oldPasswd: "", newPasswd1: "", newPasswd2:""}); 
    
    // 저장 api
    const {mutate} = useMutation(async () => await fetchChangePw(changePw), {
        onMutate: variable => {
            // setOpen(false);
        },
        onError: (error:any) => {
            // error
            setChangePw({oldPasswd: "", newPasswd1: "", newPasswd2:""})
            alert( error.response.data.status + "  error : " + error.response.data.message)
        },
        onSuccess: (data, variables, context) => {
            addModal({
              open:true,
              content:'변경 되었습니다',
              onConfirm:(() => {
                navigate('/')
              })
            })
            setOpen(false);
        }
    });

    // 모델 창 열기
    const handlerModalOpen = (type: modalType) => {
      setOpen(true);
      setType(type);
    };

    // 입력 이벤트
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setChangePw((state) => ({ ...state, [name]: value }));
    };
    // 저장
    const handleOnSave = (e:React.MouseEvent<HTMLElement>) => {
        if(!!checkForm()) { // 폼 체크
            mutate() // 변경 실행
        }
    };
    // 폼 밸리데이션
    const checkForm = ():boolean => {
        if(!changePw.oldPasswd){
            alert("이전 비밀번호를 입력해주세요")
            return false;
        } 
        if (!changePw.newPasswd1) {
            alert("비밀번호를 입력해주세요")
            return false;
        } else if (!changePw.newPasswd2){
            alert("비밀번호 확인 입력해주세요")
            return false;
        } else {
            if(changePw.newPasswd1 !== changePw.newPasswd2){
                alert("비밀번호가 일치하지 않습니다")
                return false;
            } else {
                if(!regExpPassword.test(changePw.newPasswd1)){
                    alert("8~16자 영문 대·소문자, 숫자, 특수문자를 사용하여 입력해주세요")
                    return false;
                }
            }
        }
        return true;
    }

    return (
      <>
        <Button variant={props.btnType} type="button" className="primary" onClick={() => {handlerModalOpen('normal');}}>
          비밀번호 변경 
        </Button>

        <Modalfront
          open={open}
          type={type}
          title={'비밀번호 변경'}
          content={type.toString() + ' 모달'}
          onConfirm={() => {
            setOpen(false);
          }}
          onClose={() => {
            setOpen(false);
            if (data) setData(false);
          }}
        >
          <Box css={styles.modal_Box} className="pass_popinput" component="form">
            <div className="tit_text">
              현재 비밀번호와 새로운 비밀번호를 입력해주세요. 
            </div>
            <Box css={styles.modal_inputBox} >
              <div className="inputtxt">현재 비밀번호<em>*</em></div>
              <TextField
                name="oldPasswd"
                value={changePw.oldPasswd}
                variant="outlined"
                type="password"
                fullWidth
                placeholder="이전 비밀번호 입력하세요"
                onChange={handleChange}
              />
            </Box>
            <Box css={styles.modal_inputBox}>
              <div className="inputtxt">비밀번호<em>*</em></div>
              <TextField
                name="newPasswd1" 
                value={changePw.newPasswd1}
                variant="outlined"
                type="password"
                fullWidth
                placeholder="8~16자 영문 대·소문자, 숫자, 특수문자"
                onChange={handleChange}
              />
            </Box>
            <Box css={styles.modal_inputBox}>
              <div className="inputtxt">비밀번호 확인<em>*</em></div>
              <TextField
                name="newPasswd2"
                value={changePw.newPasswd2} 
                variant="outlined"
                type="password"
                fullWidth
                placeholder="비밀번호 확인 입력하세요"
                onChange={handleChange}
              />
            </Box>
            <Stack justifyContent={'center'} direction={'row'} spacing={'10px'} sx={{marginTop:"40px"}}>
              <CustomButton label={'취소'} type={'modalBtn'} color={'outlinedblack'} onClick={() => {setOpen(false)}}/>
              <CustomButton label={'저장'} type={'modalBtn'} color={'primary'} onClick={handleOnSave} />
            </Stack>
          </Box>
        </Modalfront>
      </>
    );
  };