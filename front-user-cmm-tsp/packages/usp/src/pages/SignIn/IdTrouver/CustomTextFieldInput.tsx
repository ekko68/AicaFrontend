
/* eslint-disable @typescript-eslint/no-use-before-define */
import React,{ ChangeEvent } from 'react';
import * as styles from '../styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ConditionBoxs } from '../../../models/ModelSignin';

/* 공통 INPUT:(TextField) component*/
export const CustomTextFieldInput: React.FC<{
  radiotypes: string     // 
  options:ConditionBoxs
  // handleOnInput?: (e:ChangeEvent<HTMLInputElement>) => void,
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}> = (props) => {
  
  // const { name, id, biz, email, } = props.options;

  return (
    <Box component="form" noValidate autoComplete="off" >
      {
        Object.values(props.options).map((m,i)=>{
          console.log({...m})
          return(

            <React.Fragment key={i}>
               <TextField 
                  {...m} 
                  css={styles.singTextbox}
                  // onInput={(props.handleOnInput) ? props.handleOnInput : undefined } 
                  onChange={(props.handleOnChange) ? props.handleOnChange : undefined }/>
              </React.Fragment>
            )
          }
        )
            
      }
    </Box>
  );
};




/* eslint-disable @typescript-eslint/no-use-before-define */
// import React,{ useState, ChangeEvent } from 'react';
// import * as styles from './styles';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import {ConditionType,ConditionBoxs,
//          inputType,iniNames,iniId,iniBiz,iniTel,iniEmail,intialValues} from '../../../models/ModelSignin';
// import { CustomTextFieldInput } from './CustomTextFieldInput';

// /*
//   화면: 아이디 찾기
//   작성자: Seongeonjoo / navycui
//   작성일: 20220513
// */

// export default function IdTrouver() {
//   // const checked = useRef();
//   const [valueRadio, setValueRadio] = useState<string>('PL');
//   const [formValues, setFormValues] = useState(intialValues);

//   const [name,  setName ] = useState<ConditionType>(iniNames);
//   const [id,    setId   ] = useState<ConditionType>(iniId);
//   const [biz,   setBiz  ] = useState<ConditionType>(iniBiz);
//   const [tel,   setPw   ] = useState<ConditionType>(iniTel);
//   const [email, setEmal ] = useState<ConditionType>(iniEmail);
  
//   const [condition, setCondition] = useState<ConditionBoxs>({name,id,biz,tel,email});

//   // 라디오 이벤트
//   const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
//     let valbox = (event.target as HTMLInputElement).value
//     setValueRadio((event.target as HTMLInputElement).value);

//     // setLabels({...labels,labelsName:"이름 다시 입력하세요"});
//     // setFocused({...focused,focusedName:true});
//     // setErrors({...errors,errorName:true});
 
//     // setHelperTexts({...helperTexts,helperTextName:"haijunsdfsdfsdfsdf"});

//   };

//   // 다음 이벤트
//   const handleNextSubmit = (e:React.MouseEvent<HTMLElement>) => {
//     console.log(e.target);
//   };

//   // 입력 이벤트
//   const handleChangeInput = (prop: keyof inputType) => (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormValues({
//       ...formValues,
//       [e.target.name]: e.target.value,
//     });
//   };
 
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (valueRadio === 'best') {
//       // setHelperText('You got it!');
//       // setErrors(false);
//     } else if (valueRadio === 'worst') {
//       // setHelperText('Sorry, wrong answer!');
//       // setErrors(true);
//     } else {
//       // setHelperText('Please select an option.');
//       // setErrors(true);
//     }
//   };

//   return (
//     <section css={styles.container}>
//       <div css={styles.content}>
//         <div className="tit">
//           <h1>아이디 찾기</h1>
//           <p>가입 시 입력한 회원정보를 입력해 주세요.</p>
//         </div>
//           <Box 
//             component="form"
//             noValidate
//             autoComplete="off"
//             css={styles.singTextbox}>
//             <RadioGroup
//               row
//               defaultValue='PL'
//               aria-labelledby="demo-row-radio-buttons-group-label"
//               name="row-radio-buttons-group"
//               onChange={handleChangeRadio}
//             >
//              <FormControlLabel value='PL' control={<Radio />} name="personal" label="개인" />
//              <FormControlLabel value='BIZ' control={<Radio />} name="buisnessman" label="사업자"/>
            
//             </RadioGroup>
//           </Box>
//           <CustomTextFieldInput
//             radiotypes={valueRadio}
//             options={condition}
//             handleOnChange={(e:React.ChangeEvent<HTMLInputElement>) => {
//               if(e.target.id === "name"){
//                 console.log(e.target.id);
//               }
//               setCondition({...condition,[e.target.id]:{value:e.target.value}})
//             }}
//             // handleOnInput = {(e:ChangeEvent<HTMLInputElement>) =>{
//             //   console.log(e.target.getAttributeNames());
//             // }}
//           />
//           <Stack spacing={2} direction="row" css={styles.signbtn}>
//             <Button fullWidth variant="contained" type="button" onClick={handleNextSubmit}>다음</Button>
//             {/* <NavLink to={'signin/IdTrouverFind'}>{'다음'}</NavLink> */}
//           </Stack>
//       </div>
//     </section>
//   )
// }