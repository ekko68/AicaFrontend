import * as styles from '~/styles/styles';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import BreadCrumb from '~/components/BreadCrumb';
import { Box, TextField, Stack, SelectChangeEvent, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from "react-router-dom";
import authentication from 'shared/authentication';
import { fetchQnaQuest } from '~/fetches';
import { intialErrorCategoryCd, intialErrorQuestion, intialErrorTitle, intialInputValues} from "~/models/ModelTreadmill";
import { FileUpload } from "./../EventNews/FileUpload";
import { useGlobalModalStore, useGlobalScroll, useScroll } from '../store/GlobalModalStore';
import { CustomSelect, CustomSelectMd } from '~/components/SelectBoxComponents';
import {CustomButton} from '~/components/ButtonComponents';
import { ModalComponents } from '~/components/ModalComponents';

// 이용지원/ ->  1:1 문의 페이지
function OneByOneInquiry() {
  const theme = useTheme();
  const {scrollY, direction} = useScroll();
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  const {addModal} = useGlobalModalStore();
  const navigate = useNavigate();
  const titleInput:any = useRef("");
  const questionInput:any = useRef("");
  const [title,setTitle] = useState("");
  const [question,setQuestion] = useState("");
  const [categoryCd, setCategoryCd] = useState("CATE-PERSNAL-01");
  const [files, setFiles]:any= useState([]);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [categoryCdError,setCategoryCdError] = useState(intialErrorCategoryCd);
  const [titleError,setTitleError] = useState(intialErrorTitle);
  const [questionError,setQuestionError] = useState(intialErrorQuestion);
  const [qnaQuest,setQnaQuest] = useState(intialInputValues);
  
  const changeCategoryCd = (event: SelectChangeEvent) => {
    setCategoryCd(event.target.value as string);
  };
  const changeTitle = () => {
    setTitle(titleInput.current.value);
  }
  const changeQuestion = () => {
    setQuestion(questionInput.current.value);
  }

  useEffect(() => {
    if(!!!authentication.getToken()){
      navigate(`/signin?nextUrl=${window.btoa(window.location.href)}`)
    }
  }, []);
  
  useEffect(()=>{
    setQnaQuest({
      categoryCd:categoryCd,
      title:title,
      question : question,
    })
  },[categoryCd,title,question])
  
  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.offsetHeight);
    }
  }, []);

  const send = (event:any) =>{
    if(!validate()){
      return;
    };
    try{

      const form = new FormData();
      form.append("qnaQuest", new Blob([JSON.stringify(qnaQuest)], {type: "application/json"}));
      for(let i=0; i<files.length; i++){
        form.append("file",files[i])
      }
      
      fetchQnaQuest(form,`${process.env.REACT_APP_USP_PERSNAL}`).then(()=>{
        setOpen(true)
        setError("1:1 문의가 등록되었습니다.")
        return
        // return navigate('../MyPage/InquiryMmt/OneByOneMmt');
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

  const validate = () => {
    let check = true;
    //문의구분 확인
    if(qnaQuest.categoryCd===""){
      setCategoryCdError({
        errorCategoryCd:true , helperCategoryCd:"문의구분을 선택하세요."
      });
      check = false;
    }else{
      setCategoryCdError({
        errorCategoryCd:false , helperCategoryCd:""
      });
    }
    //제목 확인
    if (qnaQuest.title===""){
      setTitleError({
        errorTitle:true, helperTitle:"제목을 입력하세요."
      })
      check = false;
    }else{
      setTitleError({
        errorTitle:false, helperTitle:""
      })
    }
    //문의내용 확인
    if (qnaQuest.question===""){
      setQuestionError({
        errorQuestion:true, helperQuestion:"문의내용을 입력하세요."
      })
      check = false;
    }else{
      setQuestionError({
        errorQuestion:false, helperQuestion:""
      })      
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
        <Box className="benner" component={'div'} ref={measuredRef} sx={{transform: direction ? 'translate(0, -81px)' : 'translate(0, -20px)' }}>
        <BreadCrumb />
          <div className="content">
            <div className="txtbox">
              <h2 className="tit" style={{ marginTop: 0 }}>
                1:1 문의
              </h2>
              <p>
                AICA에서 운영 및 지원하는 사업과 시설 전반에 대해 궁금하신 점을 문의하실 수 있습니다.<br className="pc"/>
                이외에도 개선점에 대한 의견이나 사업에 대한 아이디어가 있다면 전달하여 주시기 바랍니다.
              </p>
            </div>
          </div>
        </Box>
      </Box>
      <Box css={styles.sub_cont02} sx={{ marginTop:( scrollY ? (isMobile ? `${height  - 30 }px` : `${height - 90}px`) : `${height }px`)}}>
        {/* 상세 list 리스트 */}
        <div className="content">
          <div css={styles.detal_list}>
            <Box css={styles.inputBox}>
              <div className="inputtxt">문의구분<em>*</em></div>
              <div className='selbox'>
                <CustomSelect 
                value={categoryCd} 
                data={[{code:"CATE-PERSNAL-01", codeNm:"지원/신청"},{code:"CATE-PERSNAL-02", codeNm:"데이터/시스템"}]} 
                onClick={(selected) => {
                  setCategoryCd(selected)
                }}
                />
              </div>
              {/* 자주쓰는 셀렉트박스 컴포넌트화 */}
              {/* <FormControl sx={{ width: '220px'}}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={categoryCd}
                  onChange={changeCategoryCd}
                  sx={{ height: '48px'}}
                  error={categoryCdError.errorCategoryCd}
                  IconComponent = {SelectIcon}
                >
                  <MenuItem value="CATE-PERSNAL-01">지원/신청</MenuItem>
                  <MenuItem value="CATE-PERSNAL-02">데이터/시스템</MenuItem>
                </Select>
                <FormHelperText error={categoryCdError.errorCategoryCd}>{categoryCdError.helperCategoryCd}</FormHelperText>
              </FormControl> */}
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
                inputProps={{
                  maxLength: 50,
                }}
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
                inputProps={{
                  maxLength: 1000,
                }}
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
              <CustomButton label={'완료'} type={'listBack'} color={'primary'} onClick={send}/>
            </Stack>
          </div>
        </div>
      </Box>
    </div>
  );


}
export default OneByOneInquiry;
