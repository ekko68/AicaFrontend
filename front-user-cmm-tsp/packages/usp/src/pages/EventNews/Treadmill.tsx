import * as styles from '~/styles/styles';
import * as React from 'react';
import BreadCrumb from '~/components/BreadCrumb';
import { Box, TextField, Stack, useMediaQuery, useTheme} from '@mui/material';
import {CustomButton} from '~/components/ButtonComponents';
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQnaQuest } from '~/fetches';
import { FileUpload } from "./FileUpload";
import { intialErrorCategoryCd, intialErrorQuestion, intialErrorTitle, intialInputValues} from "~/models/ModelTreadmill";
import { useEffect } from "react";
import { useGlobalScroll, useScroll } from '../store/GlobalModalStore';
import { CustomSelect } from '~/components/SelectBoxComponents';
import { ModalComponents } from '~/components/ModalComponents';
import authentication from '~/../../shared/src/authentication';

function Treadmill() {
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  const theme = useTheme();
  const {scrollY, direction} = useScroll();
  const navigate = useNavigate();
  const titleInput:any = useRef("");
  const questionInput:any = useRef("");
  const [title,setTitle] = useState("");
  const [question,setQuestion] = useState("");
  const [categoryCd, setCategoryCd] = useState("CATE-STEP-01");
  const [files, setFiles]:any= useState([]);
  const [categoryCdError,setCategoryCdError] = useState(intialErrorCategoryCd);
  const [titleError,setTitleError] = useState(intialErrorTitle);
  const [questionError,setQuestionError] = useState(intialErrorQuestion);
  const [qnaQuest,setQnaQuest] = useState(intialInputValues);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));


  const changeTitle = () => {
    setTitle(titleInput.current.value);
  }
  const changeQuestion = () => {
    setQuestion(questionInput.current.value);
  }

  const [height, setHeight] = useState(0);
  const measuredRef = React.useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if(!!!authentication.getToken()){
      navigate(`/signin?nextUrl=${window.btoa(window.location.href)}`)
    }
  },[])

  useEffect(()=>{
    setQnaQuest({
      categoryCd:categoryCd,
      title:title,
      question : question,
    })
  },[categoryCd,title,question])

  const send = (event:any) =>{
    if(!validate(event,qnaQuest)){
      return;
    }
    try{

      const form = new FormData();
      form.append("qnaQuest", new Blob([JSON.stringify(qnaQuest)], {type: "application/json"}));
      for(let i=0; i<files.length; i++){
        form.append("file",files[i])
      }
    
      fetchQnaQuest(form,`${process.env.REACT_APP_STEP_FLAT}`).then(()=>{
        return navigate('../MyPage/UsageMmt/TreadmillMmt');
      }).catch((e)=>{
        setOpen(true);
        setError(e.response.data.message)
      });
      // .catch((e)=>{
      //   addModal({
      //     open: true,
      //     content: e.response.data.message
      //   });
      // })
    } catch (e:any){
      if(!!e.response && e.response.data) return alert(e.response.data.message);
    }

  }

  const validate = (event:any,qnaQuest:any) => {
    
    let check = true;
    console.log(qnaQuest)
    //문의구분 확인
    if(qnaQuest.categoryCd===""){
      setCategoryCdError({
        errorCategoryCd:true , helperCategoryCd:"문의구분을 선택하세요"
      });
      check = false;
    }else{
      setCategoryCdError({
        errorCategoryCd:false , helperCategoryCd:""
      });
      check = true;
    }
    //제목 확인
    if (qnaQuest.title===""){
      setTitleError({
        errorTitle:true, helperTitle:"제목을 입력하세요"
      })
      check = false;
    }else{
      setTitleError({
        errorTitle:false, helperTitle:""
      })
      check = true;
    }
    //문의내용 확인
    if (qnaQuest.question===""){
      setQuestionError({
        errorQuestion:true, helperQuestion:"문의내용을 입력하세요"
      })
      check = false;
    }else{
      setQuestionError({
        errorQuestion:false, helperQuestion:""
      })      
      check = true;
    }
    return check;
  }
  const handleDelete = (i:number) => {
    const update = [...files]
    update.splice(i,1)
    setFiles(update);
  };
  
  const handleUpload = (e:React.ChangeEvent<HTMLInputElement>) =>{
    let upfile:any = e.target.files;
    const update = [...files]
    for(var i = 0; i < upfile.length; i++){
        update.push(upfile[i]);
      }
    setFiles(update)
  }

  const goEventNews = () => {
    navigate('/EventNews');
  };
  return (
    <div css={styles.container}>
      <ModalComponents open={open} type={'normal'} content={error} 
        onConfirm={() => { setOpen(false) }} 
        onClose={() => { setOpen(false)}}>
      </ModalComponents>
      <Box css={styles.sub_cont01} className={direction ? "fixed scrollaction" : "fixed"}>
        <Box className="benner" ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
        <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit" style={{ marginTop: 0 }}>
                디딤널 문의 작성
              </h2>
              <p>
                AICA에게서 바라는 점이나 제안하고 싶은 내용을 접수하는<br className="mo"/> 곳입니다.<br className="pc"/>
                구인 및 구직 뿐만 아니라<br className="mo"/> 사업제안, AI 관련 사업에 필요한 도움을 전달하실 수 있습니다.
              </p>
            </div>
          </div>
        </Box>
      </Box>
      <Box css={styles.sub_cont02} sx={{ marginTop:( direction ? (isMobile ? `${height + 30 }px` : `${height}px`) : `${height}px` )}}>
        {/* 상세 list 리스트 */}
        <div className="content">
          <div css={styles.detal_list}>
            <Box css={styles.inputBox}>
              <div className="inputtxt">문의구분<em>*</em></div>
              <div className='selbox'>
              <CustomSelect 
                value={categoryCd} 
                data={[{code:"CATE-STEP-01", codeNm:"창업아이디어"},{code:"CATE-STEP-02", codeNm:"구인/구직"},{code:"CATE-STEP-03", codeNm:"제안/기타"},]} 
                onClick={(selected) => {
                  setCategoryCd(selected)
                }}
                />
              </div>
            </Box>
            <Box css={styles.inputBox}>
              <div className="inputtxt">제목<em>*</em></div>
              <TextField
                id="name" 
                variant="outlined"
                fullWidth
                onChange={changeTitle}
                inputRef={titleInput}
                error = {titleError.errorTitle}
                helperText = {titleError.helperTitle}
              />
            </Box>
            <Box css={styles.inputBox}>
              <div className="inputtxt">문의내용<em>*</em></div>
              <TextField
                id="outlined-multiline-static"
                className="scrollBox"
                multiline
                rows={4}
                onChange={changeQuestion}
                inputRef={questionInput}
                error = {questionError.errorQuestion}
                helperText = {questionError.helperQuestion}
              />
              <span className="count"><em>{question.length}</em>/1000</span>
            </Box>
            {/* 답변받을 이메일 부분 화면설계서에서 삭제 */}
            {/* <Box css={styles.inputBox}>
              <div className="inputtxt">답변받을 이메일<em>*</em></div>
              <TextField
                id="name" 
                variant="outlined"
                fullWidth
              />
            </Box> */}
            <Box css={styles.inputBox}>
              <div className="inputtxt" >파일첨부</div>
              <FileUpload
                files={files}
                handleDelete={handleDelete}
                handleUpload={handleUpload}
              />
            </Box>
            <hr className="m20"/>
            <Stack direction="row" justifyContent="center" spacing={2} css={styles.btnGroup}>
              <CustomButton label={'취소'} type={'listBack'} color={'outlinedblack'} onClick={()=>goEventNews()}/>
              <CustomButton label={'저장'} type={'listBack'} color={'primary'} onClick={send}/>
            </Stack>
          </div>
        </div>
      </Box>
    </div>
  );


}
export default Treadmill;
