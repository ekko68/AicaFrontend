import React, { useState } from "react";
import * as styles from '~/styles/styles';
import { Autocomplete, Box, Stack, TextField } from '@mui/material';
import {  CustomButton } from '~/components/ButtonComponents';
import { useLocation, useNavigate } from "react-router-dom";
import { fetchCheckUserPw } from "~/fetches/fetchSignIn";
import { useGlobalModalStore } from "../store/GlobalModalStore";

type FormType = {
  password?: string;
};
/* 
  작성일    :   2022/06/05
  화면명    :   이페이지 -> 비밀번호 확인
  회면ID    :   UI-USP-FRN-0050101
  화면/개발 :   Seongeonjoo / navycui
*/
const Factor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = new FormData();
  const {addModal} = useGlobalModalStore();
  const [form, setForm] = useState<FormType>({ password: '' });
  // 입력 제어
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm((state) => ({ ...state, [name]: value }));
  };
  
  // 확인 이벤트
  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // TODO: 비밀번호 확인
    if (form.password) {
      formData.append('passwd',form.password)
      fetchCheckUserPw(formData)
        .then((res) => {
          const { passwdCheckKey: key } = res.data;
          sessionStorage.setItem('__FACTOR_KEY__', key);
          navigate({
            pathname: '/Mypage/MemberInfoMmt/MemberInfoMdf',
            search: '?check=factor',
          });
        })
        .catch((e) => {
          addModal({
            type:'normal',
            open: true,
            content: e.response.data.message
          })
        });
    } else {
      addModal({
        type:'normal',
        open: true,
        content: "비밀번호 입력하세요."
      })
    }
  }
  return (
    <Box css={styles.container}>
      <Box css={styles.sub_cont01}>
        <div className="benner">
          {/* <BreadCrumb /> */}
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">
                비밀번호 확인
              </h2>
              <p>
                AICA에서 진행하는 채용공고, 운영과 관련한 안내사항 등을 확인하실
                수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </Box>
      <Box css={styles.sub_cont02}>
        <div className="content">
          <Box css={styles.login_cont}>
            <Box className="input_form">
              <dl>
                <dt>비밀번호입력</dt>
                <dd>
                <Autocomplete
                  multiple
                  options={[]}
                  id="tags-standard"
                  onKeyDown={(event:any) => {
                    if (event.key === 'Enter') {
                      event.defaultMuiPrevented = true;
                      handleSubmit(event);
                    }
                  } }
                  renderInput={(params) => (
                    <TextField
                      type="password"
                      name="password"
                      defaultValue={form.password}
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                      }}
                    />
                  )}
                  />
                </dd>
              </dl>
            </Box>
            <Stack justifyContent={'center'} direction={'row'} css={styles.btnGroup}>
              <CustomButton label={'확인'} type={'listBack'} color={'primary'} onClick={handleSubmit}/>
            </Stack>
          </Box>
        </div>
      </Box>
    </Box>
  );
};
export default Factor;