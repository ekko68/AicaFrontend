// 만족도조사참여 -> 만족도조사참여
// import React from "react"
import * as styles from './styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import { Stack, Typography, TextField, useMediaQuery, useTheme } from '@mui/material';
import { CustomButton, CustomCheckBoxs, CustomRadioButtons} from '~/components/ButtonComponents';
import { useGlobalModalStore, useScroll } from '~/pages/store/GlobalModalStore';
import { useQuery } from 'react-query';
import { fetchSurveyGet, fetchSurveySave } from '~/fetches/fetchSurvey';
import { fetchGetCommCode } from '~/fetches';
import { useCallback, useEffect, useRef, useState } from 'react';
import { initSurveyInput, surveyInput } from '~/models/ModelSurvey';
import { ModalComponents } from '~/components/ModalComponents';
import { useGlobalScroll } from "~/pages/store/GlobalModalStore";
import { useNavigate } from 'react-router-dom';

function ParticipatInSfSy() {
  const isDetail = true;
  const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('md'));
const {scrollY, direction} = useScroll();
  const {addModal} = useGlobalModalStore();
  const [surveyAnsParam,setSurveyAnsParam] = useState<surveyInput>(initSurveyInput); 
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  const navigate = useNavigate()
   // 설문지 조회
  const {data:survey} = useQuery("fetchSurveyGet", async () => await fetchSurveyGet("survey-2da9c13d191f473d8043650e4cff4d68"),{
    onSuccess:(data:any)=>{
      const questions:any = [];
      // eslint-disable-next-line array-callback-return
      data.questionList.map((item:any,i:number)=>{
        const answers: { answerId: any; shortAnswer: string; }[] = [];
        // eslint-disable-next-line array-callback-return
        item.answerList.map((ans:any)=>{
          answers.push({answerId:ans.answerId,shortAnswer:""})
        })
        questions.push({questionId:data.questionList[i].questionId,answers:[]})
      })
      setSurveyAnsParam({surveyId:data.surveyId,questions:questions});
    },
    onError:(e:any)=>{
      setOpen(true);
      setError(e.response.data.message)
      // addModal({
      //   open: true,
      //   content: e.response.data.message,
      //   type: 'normal'
      // });
    }
  });

  const changeInput = (item:any,i:number) =>{
    const update = {...surveyAnsParam};
    update.questions[i].answers = item;
    setSurveyAnsParam(update);
  }
  const send = (event:any) =>{
    // if(!validate()){
    //   return;
    // };
    try{

      // const form = new FormData();
      // form.append("surveyAnsParam", new Blob([JSON.stringify(surveyAnsParam)], {type: "application/json"}));
    
      fetchSurveySave(surveyAnsParam).then().catch((e)=>{
        setOpen(true);
        setError(e.response.data.message)
        // addModal({
        //   open: true,
        //   content: e.response.data.message
        // });
      })
    } catch (e:any){
      if(!!e.response && e.response.data) return alert(e.response.data.message);
    }

  }

  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);

  return (
    <div css={styles.container}>
      <Box css={styles.sub_cont01} className={direction ? "fixed scrollaction" : "fixed"}>
        <Box className="benner" component={'div'} ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
          <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit">만족도조사</h2>
              <p className={isDetail?'nobtm':''}>
                AICA에서 주관하는 사업 또는 행사 등의 프로그램에 참여하신 후기를 작성하시면 됩니다.<br />
                보내주신 의견이 더 좋은 프로그램과 시스템을 만드는 데 기여합니다.
              </p>
            </div>
          </div>
        </Box>
      </Box>
      <Box sx={{ marginTop:( scrollY ? (isMobile ? `${height  - 30 }px` : `${height - 90}px`) : `${height }px`)}}>
        <div className='content_body'>
          <div className="content pt120">
            <Stack spacing={6} direction="column" className="sub_tit">
              <Typography variant="h4" component="div">
                창업지원사업 참여 만족도 설문조사
              </Typography>
            </Stack>
            <Box css={styles.box_graylist}>
              창업지업사업에 참여하신 분들을 대상으로 본 사업의 프로그램에 대한 만족도를 조사하고 있습니다.<br /> 
              의견을 보내주시면 향후 사업의 프로그램을 보완하는데 참고하겠습니다.<br />
              <p className='terms'>진행기간 2021-10-01 ~ 2021-12-31</p>
            </Box>
            <Stack css={styles.list_select}>
              <ul>
                {survey?survey.questionList.map((item:any,i:number)=>(
                  <Survey question={item} key={i} changeInput={changeInput} number={i}/>
                )
                ):null}
              </ul>
            </Stack>
            {survey?
            <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
              <CustomButton label={'취소'} type={'listBack'} color={'outlinedblack'} />
              <CustomButton label={'제출'} type={'listBack'} color={'primary'} onClick={send} />
            </Stack>
            :null}
          </div>
        </div>
      </Box>
      <ModalComponents open={open} type={'normal'} content={error} 
        onConfirm={() => { setOpen(false);navigate(-1); }} 
        onClose={() => { setOpen(false);navigate(-1);}}>
      </ModalComponents>
    </div>
  );
}

export default ParticipatInSfSy;

export const Survey: React.FC<{
  question : any;
  changeInput : any;
  number : number;
}> = (props) => {
    const textInput:any = useRef("");
    // 공통 코드 조회
    const {data:questionType} = useQuery("QUEST_STATUS", async () => await fetchGetCommCode("SURVEY_QUESTION_TYPE"));
    //다중선택
    if(questionType&&props.question.questionType===questionType.list[0].code){
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const box: { label: any; }[] = [];
      // eslint-disable-next-line array-callback-return
      props.question.answerList.map((item:any)=>{
        box.push({label : item.answerCn})
      })
      return(
        <li>
        <p><i>Q 0{props.question.questionNo}.</i> {props.question.questionCn}<span>(복수선택 가능){props.question.required?"(필수)":null}</span></p>
        <CustomCheckBoxs
          checkbox={box}
          //[{ label: '더 세분화된 영역의 전문가' },{ label: '다양한 교육 프로그램' },];
          onClick={(s: string[]) => {
            if (s.length > 0){
              const answerId: { answerId: any; shortAnswer: string; }[] = [];
              // eslint-disable-next-line array-callback-return
              props.question.answerList.map((item:any)=>{
                s.map((label)=>{
                  if(label===item.answerCn){
                    answerId.push({answerId : item.answerId,shortAnswer:""})
                  }
                })
              })
              props.changeInput(answerId,props.number)
            }
          }}
        />
      </li>
      )
    }else if(questionType&&props.question.questionType===questionType.list[1].code){
      //객관식
      const radio: { code: any; codeNm: any; }[] = [];
      props.question.answerList.map((item:any)=>{
        radio.push({code:item.answerId,codeNm:item.answerCn})
      })
      const radioData = {list : radio};
      return(
        <li>
        <p><i>Q 0{props.question.questionNo}.</i> {props.question.questionCn}<span>{props.question.required?"(필수)":null}</span></p>
        <CustomRadioButtons
          data={radioData?radioData.list:[]}
          onClick={(selected) => {
            const answerId = [{answerId : selected,shortAnswer:""}];
            props.changeInput(answerId,props.number)
          }}
        />
      </li>
      )
    }else if(questionType&&props.question.questionType===questionType.list[2].code){
      //주관식
      const changeText = () => {
        const answerId = [{answerId : props.question.answerList[0].answerId,shortAnswer:textInput.current.value}]
        props.changeInput(answerId,props.number)
      }
      return(
        <li>
        <p><i>Q 0{props.question.questionNo}.</i> {props.question.questionCn}<span>{props.question.required?"(필수)":null}</span></p>
        <TextField
          id="outlined-multiline-static"
          onChange={changeText}
          inputRef={textInput}
          multiline rows={4} 
          className="textfield_tp01" 
          inputProps={{
            maxLength: 1000,
          }}
        />
        <div className='tf_count'>1/1000</div>
      </li>
      )
    }
    return null;
  
};