import { useState,useRef, ChangeEvent, } from 'react';
import create from "zustand";
import * as styles from '../styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { fetchFactorPw, fetchFactorPwBiz} from '~/fetches';
import { certNoType, inputType } from '~/fetches/fetchIdTrouver';
import { useNavigate } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import { errorsType,helperTextsType,labelsType,intialValues,
  intialValuesErrors,intialValuesHptx,intialValuesLab,intialValuesLabBiz,initSetErrors,initSetLabels,initSetHelperTexts} from '../../../models/ModelSignin';
import { ModalComponents } from '~/components/ModalComponents';
import { useGlobalModalStore } from '~/pages/store/GlobalModalStore';
/*
  화면: 비밀번호 찾기
  작성자: Seongeonjoo / navycui
  작성일: 20220513
*/

// test 임시 start
export const useConfigStore = create<certNoType>( set => ({certNo:"", mobileNo:"", email:"",key:""}))// test 임시 end
// type FormType = { password?: string;};

export default function IdTrouver (){
  const navigate = useNavigate();
  const {addModal} = useGlobalModalStore();
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  const checked = useRef() as React.MutableRefObject<HTMLDivElement>;
  
  const [valueRadio, setValueRadio] = useState<string>('PL');

  const [formValues, setFormValues] = useState(intialValues);
  const [errors, setErrors] = useState<errorsType>(initSetErrors);
  const [labels, setLabels] = useState<labelsType>(initSetLabels);
  const [helperTexts, setHelperTexts] = useState<helperTextsType>(initSetHelperTexts);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
  // 라디오 이벤트
  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {

    let valbox = (event.target as HTMLInputElement).value
    setFormValues(intialValues)
    setErrors(intialValuesErrors);
    setHelperTexts(intialValuesHptx)
    setValueRadio((event.target as HTMLInputElement).value);
    if(valbox === 'PL'){
      setLabels(intialValuesLab)
    } else {
      setLabels(intialValuesLabBiz)
    }
  };

  // 입력 이벤트
  const handleChangeInput = (prop: keyof inputType) => (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setErrors(intialValuesErrors);
    if(valueRadio === 'PL'){
      setLabels(intialValuesLab)
    } else {
      setLabels(intialValuesLabBiz)
    }
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 필수 체크
    if(!ckForm()) return;

    // 아이디 찾기 호출 
    if(valueRadio === 'PL'){
      // 개인조회
      fetchFactorPw(formValues).then((res:any)=>{
        const {email,key,mobileNo} = res;
        useConfigStore.setState(state=> state.key=key);
        useConfigStore.setState(state=> state.email=email);
        useConfigStore.setState(state=> state.mobileNo=mobileNo);
        sessionStorage.setItem('__FACTOR_KEY__', key);
        navigate('/signin/factorfind',{
          state:{
            info:formValues,
            stus:false,
          }
        })
      }).catch((err:any)=>{
        let {data:{status}} = err.response
        if(status == 400){
          navigate('/signup/idpassNone')
        } else {
          setOpen(true);
          setError(err.response.data.message)
        }
      });
    } else {
      // 사업자조회
      fetchFactorPwBiz(formValues).then((res:any)=>{
        // const {loginId} = res;
        navigate('/signin/factorfind',{
          state:{
            info:formValues,
            stus:true,
          }
        })

      }).catch((err:any)=>{
        let {data:{status}} = err.response
        if(status == 400){
          navigate('/signup/idpassNone')
        } else {
          setOpen(true);
          setError(err.response.data.message)
        }
      });;
    }
  };
  // form data check function
  const ckForm = ():boolean=> {
    const emailReg =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    // if(ckForm)
    if(formValues.loginId === ''){
      setErrors({...errors,errorLoginId:true});
      setLabels({...labels,labelsLoginId:"아이디는 필수입니다."});
      return false;
    }
    if (valueRadio === 'PL') {
      if(formValues.memberNm === ''){
        setErrors({...errors,errorName:true});
        setLabels({...labels,labelsName:"이름은 필수입니다."});
        return false;
        // setHelperTexts({...helperTexts,helperTextName:"이름입력하세요"});
      } else if(formValues.birthday === ''){
        setErrors({...errors,errorId:true});
        setLabels({...labels,labelsId:"생년월일 필수입니다."});
        return false;
      } else {
        if(formValues.birthday){
          if(formValues.birthday.length < 8){
            setErrors({...errors,errorId:true});
            setLabels({...labels,labelsId:"자리수가 부족합니다."});
            return false;
          }
        }
        if(!emailReg.test(formValues.email) ){
          setErrors({...errors,errorEmail:true});
          setLabels({...labels,labelsEmail:"이메일 형식이 맞지 않습니다."});
          return false;			
        }
      }
    } else {
      if(formValues.memberNm === ''){
        setErrors({...errors,errorBizno:true});
        setLabels({...labels,labelsName:"사업자명은 필수입니다."});
        return false;
      } else if(formValues.bizrno === ''){
        setErrors({...errors,errorId:true});
        setLabels({...labels,labelsId:"사업자번호는 필수입니다."});
        return false;
      } else {

        if(formValues.bizrno){
          if(formValues.bizrno.length < 10){
            setErrors({...errors,errorId:true});
            setLabels({...labels,labelsId:"자리수가 부족합니다."});
            return false;
          }
        }
        if(!emailReg.test(formValues.email) ){
          setErrors({...errors,errorEmail:true});
          setLabels({...labels,labelsEmail:"이메일 형식이 맞지 않습니다."});
          return false;			
        }
      }
    }
    if(formValues.email === '') {
      setErrors({...errors,errorEmail:true});
      setLabels({...labels,labelsEmail:"이메일 필수입니다."});
      return false;
    }
    
    if(formValues.mobileNo === ''){
      setErrors({...errors,errorPassword:true});
      setLabels({...labels,labelsPassword:"핸드폰 번호는 필수입니다."});
      return false;
    };
    return true;
  };

  // const [form, setForm] = useState<FormType>({ password: '1234' });
  // const handleChange = (e: FormEvent<HTMLInputElement>) => {
  //   const { name, value } = e.currentTarget;
  //   setForm((state) => ({ ...state, [name]: value }));
  // };
  // const handleSubmitFindPassword = (e: any) => {
  //   e.preventDefault();

  //   // TODO: 비밀번호 확인
  //   if (form.password) {
  //     fetchFactor(form.password)
  //       .then((res) => {
  //         const { passwdCheckKey: key } = res;
  //         //* response 로 받은 키를 저장해 둔다.
  //         sessionStorage.setItem('__FACTOR_KEY__', key);

  //         //* 회원 정보 조회
  //         // me(key);

  //         navigate('/mypage');
  //       })
  //       .catch((e) => {
  //         if (e.response) {
  //           //* 비밀 번호가 맞지 않을 때.
  //           alert(e.response.data.message);
  //         } else {
  //           //* 오류
  //           alert('서비스를 이용 할 수 없습니다.');
  //         }
  //       });
  //   }
  // };

  return (
    <section css={styles.container}>
      <div css={styles.content}>
        <div className="tit">
          <h1>비밀번호 찾기</h1>
          <p>가입 시 입력한 회원정보를 입력해 주세요.</p>
        </div>
          <Box 
            component="form"
            noValidate
            autoComplete="off"
            css={styles.singTextbox} 
            className={isMobile ? "btntype_radio":""}
            >
            <RadioGroup
              row
              defaultValue='PL'
              onChange={handleChangeRadio}
            >
             <FormControlLabel value='PL' sx={{ marginRight: '60px'}} control={<Radio />} name='PL' label="개인" />
             <FormControlLabel value='BL' control={<Radio />} name='BL' label="사업자"/>
            </RadioGroup>
          </Box>
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} ref={checked}>
            {/* 아이디 */}
            <TextField
              css={styles.singTextbox}
              // focused={focused.focusedName}
              error={errors.errorLoginId}
              value={formValues.loginId}
              
              required
              id='loginId'
              name='loginId'
              label={labels.labelsLoginId}
              variant="filled"
              type="text"
              fullWidth
              placeholder="아이디 입력하세요"
              helperText={helperTexts.helperTextLoginId}
              onChange={handleChangeInput('memberNm')}
            />
            {/* 이름 or 사업자명 */}
            <TextField
              css={styles.singTextbox}
              // focused={focused.focusedName}
              error={(valueRadio === 'PL') ? errors.errorName : errors.errorBizno}
              value={formValues.memberNm}
              required
              id='memberNm'
              name='memberNm'
              label={labels.labelsName}
              variant="filled"
              type="text"
              fullWidth
              placeholder={(valueRadio === 'PL') ? "이름 입력하세요" : "사업자명 입력하세요"}
              helperText={(valueRadio === 'PL') ?  helperTexts.helperTextName : helperTexts.helperTextBizno}
              onChange={handleChangeInput('memberNm')}
            />
            {/* 생년월일 / 사업자번호 */}
            <TextField css={styles.singTextbox}
              error={errors.errorId}
              label={(valueRadio === 'PL') ? labels.labelsId : labels.labelsBizno}
              helperText={(valueRadio === 'PL') ? helperTexts.helperTextId : helperTexts.helperTextBizno}
              required
              id={(valueRadio === 'PL') ? 'birthday' : 'bizrno'}
              name={(valueRadio === 'PL') ? 'birthday' : 'bizrno'} 
              value={(valueRadio === 'PL') ? formValues.birthday : formValues.bizrno}
              type="number"
              onInput = {(e:ChangeEvent<HTMLInputElement>) =>{
                (valueRadio === 'PL') ? 
                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,8) :
                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10);
              }}
              variant="filled"
              fullWidth
              placeholder={(valueRadio === 'PL') ? "(입력 숫자만 예:20220101)" : "(입력 숫자만 예:2022010123423)"}
              onChange={(valueRadio === 'PL') ? handleChangeInput('birthday') : handleChangeInput('bizrno')}
            />
            {/* 이메일 */}
            <TextField css={styles.singTextbox}
              error={errors.errorEmail}
              label={labels.labelsEmail}
              helperText={helperTexts.helperTextEmail}
              required
              id="email"
              name={"email"}
              value={formValues.email} 
              variant="filled"
              fullWidth
              type="text"
              placeholder="인증 가능한 이메일 주소 입력"
              onChange={handleChangeInput('email')}
            />
            {/* 핸드폰번호 */}
            <TextField css={styles.singTextbox}
              error={errors.errorPassword}
              label={labels.labelsPassword}
              helperText={helperTexts.helperTextPassword}
              required
              id="mobileNo"
              name="mobileNo"
              value={formValues.mobileNo} 
              variant="filled"
              fullWidth
              type="number"
              placeholder="'-'제외한 숫자만 입력."
              onChange={handleChangeInput('mobileNo')}
            />
          <Stack spacing={2} direction="row" justifyContent="center" css={styles.signbtn}>
            <Button fullWidth variant="contained" type="submit" className="primary">다음</Button>
          </Stack>
        </Box>
        <ModalComponents
          open={open}
          type={'normal'}
          title={''}
          content={error}
          onConfirm={() => {
            setOpen(false);
          }}
          onClose={() => {
            setOpen(false);
          }}
        >
        </ModalComponents>
      </div>
    </section>
  )
}