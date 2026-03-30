import React, {useState} from "react"
import {
  Box,
  FormControl,
  InputLabel, MenuItem,
  Select,
  Stack,
  TableContainer,
  TableRow,
} from "@mui/material";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {
  SubContents,
  SimpleTextField, HorizontalInterval, VerticalInterval,
} from "shared/components/LayoutComponents";
import {CustomButton, FileUpload} from "shared/components/ButtonComponents";
import {BannerContents} from "shared/components/BannerContents";
import {useNavigate} from "react-router-dom";
import {useGlobalModalStore} from "shared/store/GlobalModalStore";
import {checkValidity} from "shared/utils/validUtil";
import {SelectChangeEvent} from "@mui/material/Select";
import {Body2, Body4} from "shared/components/TextComponents";
import {Color} from "shared/components/StyleUtils";

const AboutInquiry = () => {
  const {isDesktop} = useGlobalConfigStore()
  const isMobile = !isDesktop;
  const [inquiry, setInquiry] = useState("")
  const [files, setFiles]: any = useState([]);
  const [changeNumber, setChangeNumber] = useState(0);
  const navigate = useNavigate()
  const [aboutInquiry, setAboutInquiry] = useState<AboutInquiry>(tempData);
  const {addModal} = useGlobalModalStore()

  const handleChange = (event: SelectChangeEvent) => {
    setInquiry(event.target.value as string);
  }
  const handleDelete = (i: number) => {
    files.splice(i, 1)
    setFiles(files);
    setChangeNumber(changeNumber + 1);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let upfile: any = e.target.files;
    for (var i = 0; i < upfile.length; i++) {
      files.push(upfile[i]);
    }
    setFiles(files)
    setChangeNumber(changeNumber + 1);
  }

  return (
    <BannerContents title={"1:1 문의"}
                    subTitle={"AICA에서 운영 및 지원하는 사업과 시설 전반에 대해 궁금하신 점을 문의하실 수 있습니다.\n" +
                      " 이외에도 개선점에 대한 의견이나 사업에 대한 아이디어가 있다면 전달하여 주시기 바랍니다."}
    >
      <Stack width={"100%"} spacing={"10px"} style={{marginTop: "40px", marginBottom: "30px"}} component={'form'}
             id={'aboutInquiry'}>

        <Stack>
          <div style={{flexDirection:'row'}}>
          <Body2 weight={500} style={{lineHeight:'30px', marginRight:'4px'}}>문의구분</Body2>
          <Body2 color={Color.topaz} weight={500} style={{paddingLeft: '3px'}}>*</Body2>
          </div>
          <VerticalInterval size={'10px'}/>
          <Box style={{maxWidth: "217px"}}>
            <FormControl fullWidth>
              <InputLabel id={"selectLabel"}>선택</InputLabel>
              <Select
                required
                labelId={"selectLabel"}
                value={inquiry}
                label={"선택"}
                onChange={handleChange}>
                {
                  tempData.inquiryClassification.map((m, i) => {
                    return <MenuItem value={i} key={i}>{m}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Box>
        </Stack>
        <VerticalInterval size={'30px'}/>

        <Stack>
          <div style={{flexDirection:'row'}}>
            <Body2 weight={500} style={{lineHeight:'30px', marginRight:'4px'}}>제목</Body2>
            <Body2 color={Color.topaz} weight={500} style={{paddingLeft: '3px'}}>*</Body2>
          </div>
          <TableContainer style={{overflow: "hidden", height:'48px'}}>
            <SimpleTextField title fullWidth required placeholder={'제목을 입력해주세요.'} onChange={(s) => {
              setAboutInquiry({...aboutInquiry, title: s})
            }}/>
          </TableContainer>
        </Stack>
        <VerticalInterval size={'30px'}/>

        <Stack>
          <div style={{flexDirection:'row'}}>
            <Body2 weight={500} style={{lineHeight:'30px', marginRight:'4px'}}>문의 내용</Body2>
            <Body2 color={Color.topaz} weight={500} style={{paddingLeft: '3px'}}>*</Body2>
          </div>
          <TableContainer style={{overflow: "hidden"}}>
            <SimpleTextField fullWidth placeholder={'문의 내용을 입력해주세요.'} multiline required row={5} wordCount={1000} onChange={(s) => {
              setAboutInquiry({...aboutInquiry, inquiryDetails: s})
            }}/>
          </TableContainer>
        </Stack>
        <VerticalInterval size={'30px'}/>

        <Stack>
          <div style={{flexDirection:'row'}}>
            <Body2 weight={500} style={{lineHeight:'30px', marginRight:'4px'}}>답변 받을 이메일</Body2>
            <Body2 color={Color.topaz} weight={500} style={{paddingLeft: '3px'}}>*</Body2>
          </div>
          <TableContainer style={{overflow: "hidden", height:'48px'}}>
            <SimpleTextField title fullWidth required placeholder={'이메일을 입력해주세요.'} onChange={(s) => {
              setAboutInquiry({...aboutInquiry, email: s})
            }}/>
          </TableContainer>
        </Stack>
        <VerticalInterval size={'30px'}/>

        <Stack>
            <Body2 weight={500} style={{lineHeight:'30px', marginRight:'4px'}}>파일첨부</Body2>
          <FileUpload
            direction={isMobile ? 'column' : 'row'}
            isMobile={isMobile}
            label={<Body4 color={Color.azul}>파일첨부</Body4>}
            files={files}
            id={1}
            handleDelete={handleDelete}
            handleUpload={handleUpload}
          />
        </Stack>
        <VerticalInterval size={'30px'}/>

        <TableRow>
          <Box display={"flex"} justifyContent={"center"} paddingTop={'40px'} borderTop={'1px solid #d7dae6'}>
            <CustomButton type={"largeList"} label={"취소"} color={"outlinedblack"}
                          style={{borderRadius: "30px"}}
                          onClick={() => {
                            navigate('-1');
                          }}
            />
            <HorizontalInterval size={'20px'}/>
            <CustomButton type={"largeList"} label={"완료"} style={{borderRadius: "30px"}}
                          onClick={() => {
                            if (checkValidity('aboutInquiry')) {
                              addModal({open: true, isDist: true, type: 'normal', title: '접수가 완료되었습니다.',
                                onConfirm: ()=> {navigate('/tsp')}})
                            }
                          }}/>
          </Box>
        </TableRow>
      </Stack>
    </BannerContents>
  )
}

export default AboutInquiry

export interface AboutInquiry { // 1:1 문의
  inquiryClassification: string[] // 문의구분
  inquiryClassificationDetails: any // 선택값
  title: string // 제목
  inquiryDetails: string // 문의 내용
  email: string // 답변 받을 이메일
  //file:.. // 파일
}

const tempData: AboutInquiry = {
  inquiryClassification: ['선택1', '선택2'],
  inquiryClassificationDetails: '',
  title: '',
  inquiryDetails: '',
  email: '',
}