// 참여이벤트/ ->  자원정보공유 의견 작성 페이지
// import React from "react"
import * as styles from '~/styles/styles';
import { Box, TextField, Stack} from '@mui/material';
import {CustomButton} from '~/components/ButtonComponents';
import { FileUpload } from "./FileUpload";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { intialErrorArticle, intialErrorTitle, intialInputValues} from "~/models/ModelResourceInfoSharing";
import { fetchBoardInsert } from "./../../fetches/fetchBoard";
import { useGlobalModalStore } from '../store/GlobalModalStore';
import { ModalComponents } from '~/components/ModalComponents';

function ResourceInfoSharing() {
  const [open, setOpen] = useState(false);
  const [error,setError] = useState("");
  const {addModal} = useGlobalModalStore();
  const boardId = process.env.REACT_APP_SHARE_INFO;
  const navigate = useNavigate();
  const titleInput:any = useRef("");
  const articleInput:any = useRef("");
  const [title,setTitle] = useState("");
  const [article,setarticle] = useState("");
  const [files, setFiles]:any= useState([]);
  const [titleError,setTitleError] = useState(intialErrorTitle);
  const [articleError,setarticleError] = useState(intialErrorArticle);
  const [board,setBoard] = useState(intialInputValues);
  const changeTitle = () => {
    setTitle(titleInput.current.value);
  }
  const changearticle = () => {
    setarticle(articleInput.current.value);
  }
  useEffect(()=>{
    setBoard({
      title:title,
      article : article,
    })
  },[title,article])
  
  const validate = (event:any,board:any) => {
    let check = true;
    //제목 확인
    if (board.title===""){
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
    //내용 확인
    if (board.article===""){
      setarticleError({
        errorArticle:true, helperArticle:"내용을 입력하세요"
      })
      check = false;
    }else{
      setarticleError({
        errorArticle:false, helperArticle:""
      })      
      check = true;
    }
    return check;
  }

  const send = (event:any) =>{
    if(!validate(event,board)){
      return;
    };
    try{

      const form = new FormData();
      form.append("article", new Blob([JSON.stringify(board)], {type: "application/json"}));
      for(let i=0; i<files.length; i++){
        form.append("attachment",files[i])
      }
      fetchBoardInsert(boardId,form).then(()=>{
        return navigate('../EventNews/ResInfoSharing');
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
    }  catch (e:any){
      if(!!e.response && e.response.data) return alert(e.response.data.message);
    }

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


  const goResInfoSharing = () => {
    navigate('/EventNews/ResInfoSharing');
  }
  return (
    <div css={styles.container}>
      <ModalComponents open={open} type={'normal'} content={error} 
        onConfirm={() => { setOpen(false) }} 
        onClose={() => { setOpen(false)}}>
      </ModalComponents>
      <Box css={styles.sub_cont01}>
        <div className="benner">
          <div className="content">
            <div className="txtbox">
              <h2 className="tit" style={{ marginTop: 0 }}>
                자원정보공유
              </h2>
              <p>
              AI 관련 사업에 대한 업계 소식이나 개선 및 보완이 필요한 부분에 대한 의견을 남겨주세요.<br className="pc"/>
              사업이나 프로젝트를 진행하면서 필요한 도움이나 자원에 대한 의견을 남겨 주시면 참고하여 더 나은 사업을 준비하겠습니다.
              </p>
            </div>
          </div>
        </div>
      </Box>
      <Box css={styles.sub_cont02}>
        {/* 상세 list 리스트 */}
        <div className="content">
          <div css={styles.detal_list}>
            {/* 수정일 경우에만 이름이 노출 */}
              {/* <Box css={styles.inputBox}>
                <div className="inputtxt">이름<em>*</em></div>
                <Box>최해군</Box>
              </Box> */}
            {/* 수정일 경우에만 이름이 노출 */}
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
              <div className="inputtxt">내용<em>*</em></div>
              <TextField
                id="outlined-multiline-static"
                className="scrollBox"
                multiline
                rows={4}
                onChange={changearticle}
                inputRef={articleInput}
                error = {articleError.errorArticle}
                helperText = {articleError.helperArticle}
                inputProps={{
                  maxLength: 1000,
                }}
              />
              <span className="count"><em>{article.length}</em>/1000</span>
            </Box>
            <Box css={styles.inputBox}>
              <div className="inputtxt">파일첨부</div>
              <FileUpload
                files={files}
                handleDelete={handleDelete}
                handleUpload={handleUpload}
              />
            </Box>
            <hr className="m20"/>
            <Stack direction="row" justifyContent="center" spacing={2} css={styles.btnGroup}>
              <CustomButton label={'취소'} type={'listBack'} color={'outlinedblack'}  onClick={()=>goResInfoSharing()}/>
              <CustomButton label={'저장'} type={'listBack'} color={'primary'} onClick={send}/>
            </Stack>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default ResourceInfoSharing;
