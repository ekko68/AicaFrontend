import {Box, Stack} from "@mui/material";
import {BannerContents} from "shared/components/BannerContents";
import {HorizontalInterval, SubContents, VerticalInterval} from "shared/components/LayoutComponents";
import React, {useState} from "react";
import {Body1, Body3, Body4, H2} from "shared/components/TextComponents";
import {useNavigate} from "react-router-dom";
import styled from "@emotion/styled";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {CustomButton} from "shared/components/ButtonComponents";
import {Color} from "shared/components/StyleUtils";
import {Icons} from "shared/components/IconContainer";

const AboutNotice = () => {
  tempData.sort((a, b) => b.important - a.important)
  let temp = [...tempData];
  const arr2 = temp.splice(0, 5)
  const [arr, setArr] = useState<DefaultContentProps[]>(arr2);

  const AddArr = () => {
    const updated = [...arr]
    for (let i = 0; i < 5; ++i) {
      if (tempData.length > 5) {
        let arr3 = tempData.splice(5, 1)
        updated.push(arr3[0]);
      } else {
        break;
      }
    }
    setArr(updated);
  }

  return <BannerContents
    title={"공지사항"} subTitle={"AICA에서 안내하는 운영과 관련한 사항 등을 확인하실 수 있습니다."}
    placeholder={'어떤 공지사항을 찾고 계신가요?'}
    category={['전체', '전체2', '전체3']}
    onSearchClick={(searchText: string, selectCategory?: string) => {
    }}>
    <Stack width={"100%"} spacing={"20px"} marginBottom={'90px'}>
      <VerticalInterval size={"11px"}/>
      <Stack direction={'row'} alignItems={'baseline'}>
        <H2 bold>공지사항</H2>
        <HorizontalInterval size={'10px'}/>
        <Body4 bold color={Color.primary}>{tempData.length}</Body4>
        <Body3>건</Body3>
      </Stack>
      <Box sx={{borderTop: "1px solid #000000", overflow: 'hidden'}}>
        {
          arr.map(m => {
            return <Contents key={m.id} contentProps={m}/>
          })
        }
      </Box>
      <CustomButton
        type={'full'} color={'item'}
        label={
          <Stack direction={'row'} alignItems={'center'}>
            <Body4>더보기</Body4>
            <HorizontalInterval size={'16px'}/>
            <Icons.DownArrow/>
          </Stack>
        }
        onClick={AddArr}/>
    </Stack>
  </BannerContents>
}

export interface DefaultContentProps {
  title: string;
  isNew?: boolean;
  content?: string;
  important: number;
  lookup?: boolean;
  date?: string;
  id: number;
}

const Contents: React.FC<{
  contentProps: DefaultContentProps;
}> = (props) => {
  const {isDesktop} = useGlobalConfigStore()
  const isMobile = !isDesktop;
  const [lookup, setLookup] = useState(0);
  const navi = useNavigate();
  const OnClick = () => {
    setLookup(lookup + 1);
    navi(`/tsp/About/Notice/${props.contentProps.id}`)
  }

  return <>
    <MyButton onClick={OnClick}>
      <Box
        sx={{
          backgroundColor: props.contentProps.important == 1 ? '#f5f5f5' : 'unset',
          borderTop: '1px solid #d7dae6',
          width: '100%',
          padding: '30px'
        }}
        overflow={'hidden'}
        minHeight={'195px'}
        maxHeight={'195px'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        paddingLeft={'15px'}>
        <Box display={'flex'}>
          <Box display={'flex'} justifyContent={'left'} width={isMobile ? '80%' : '90%'} alignItems={'center'}
               sx={{marginBottom: '12px'}}>
            <Body1 bold ellipsis lineClamp={1} overflow={'hidden'}
                   style={{fontSize: isDesktop ? '20px' : '16px'}}>
              {props.contentProps.title}
            </Body1>
            {
              props.contentProps.isNew &&
              <NewBox>NEW</NewBox>
            }
          </Box>
          {
            props.contentProps.important > 0 &&
            <Box sx={{width: isMobile ? '20%' : '10%', paddingBottom: '12px'}} display={'flex'}
                 justifyContent={'end'} alignItems={'center'}>
              <Icons.BookMark/>
            </Box>
          }
        </Box>

        {props.contentProps.content && (
          <Box minHeight={'35px'} margin={'0 0 23px 0'} overflow={'hidden'}>
            <Body3 ellipsis lineClamp={2} overflow={'hidden'} color={Color.warm_gray} style={{lineHeight: '1.75'}}>
              {props.contentProps.content}
            </Body3>
          </Box>
        )}

        <Box display={'flex'} flexDirection={'row'} sx={{height: '16px'}}>
          <Body4 style={{paddingRight: '7px', color: Color.warm_gray}}>조회 <Body4>{lookup}</Body4></Body4>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{borderRight: '1px solid #cccccc', minHeight: '12px', maxHeight: '12px', width: '1px'}}></Box>
          </div>
          <Body4 style={{marginLeft: '8px', width: "90px", fontFamily: 'Roboto'}}>{props.contentProps.date}</Body4>
        </Box>
      </Box>
    </MyButton>
  </>
}

const tempData: DefaultContentProps[] = [{
  title: "2021년도2021년도2021년도2021년도2021년도2021년도2021년도2021년도2021년도2021년도2021년도2021년도2021년도2021년도2021년도2021년도",
  important: 1,
  id: 0,
  content: "인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..인공지능..지능..",
  lookup: true,

  isNew: true,
  date: "2012.21.21"
},
  {
    title: "2022년도", important: 0, id: 1,
    content: "본문내용이 출력됩니다. 본문내용이 출력됩니다. 본문내용이 출력됩니다. 본문내용이 출력됩니다. 본문내용이 출력됩니다. 본문내용이 출력됩니다. 본문내용이 출력됩니다. 본문내용이 출력됩니다. 본문내용이 출력됩니다. 본문내용이 출력됩니다. 본문내용이 출력됩니다.",
    isNew: true, date: "2011.21.21"
  },
  {
    title: "2023년도", important: 0, id: 2,
    content: "본문내용이 출력됩니다.",
    date: "5551.21.21"
  },
  {
    title: "2023년도", important: 0, id: 3,
    content: "본문내용이 출력됩니다.",
    isNew: true, date: "5555.21.21"
  },
  {
    title: "2023년도", important: 0, id: 4,
    content: "본문내용이 출력됩니다.",
    isNew: true, date: "5555.21.21"
  }, {
    title: "2021년도", important: 0, id: 5,
    content: "본문내용이 출력됩니다.",
    lookup: true,
    isNew: true, date: "2011.21.21"
  },
  {
    title: "2022년도", important: 0, id: 6,
    content: "본문내용이 출력됩니다.",
    isNew: true, date: "2011.21.21"
  },
  {
    title: "2023년도", important: 0, id: 7,
    content: "본문내용이 출력됩니다.",
    date: "5555.21.21"
  },
  {
    title: "2023년도", important: 0, id: 8,
    content: "본문내용이 출력됩니다.",
    isNew: true, date: "5555.21.21"
  },
  {
    title: "2023년도", important: 0, id: 9,
    content: "본문내용이 출력됩니다.",
    isNew: true, date: "5555.21.21"
  }, {
    title: "2023년도", important: 0, id: 10,
    content: "본문내용이 출력됩니다.",
    isNew: true, date: "5555.21.21"
  }, {
    title: "2023년도", important: 0, id: 11,
    content: "본문내용이 출력됩니다.",
    isNew: true, date: "5555.21.21"
  }, {
    title: "2023년도", important: 0, id: 12,
    content: "본문내용이 출력됩니다.",
    isNew: true, date: "5555.21.21"
  }, {
    title: "2023년도", important: 0, id: 14,
    content: "본문내용이 출력됩니다.14",
    isNew: true, date: "5555.21.21"
  }, {
    title: "2023년도", important: 0, id: 13,
    content: "본문내용이 출력됩니다.15",
    isNew: true, date: "5555.21.21"
  }, {
    title: "2023년도", important: 0, id: 15,
    content: "본문내용이 출력됩니다.16",
    isNew: true, date: "5555.21.21"
  },]

const MyButton = styled('button')`
  width: 100%;
  padding: 0;
`

const MyH = styled('h4')`
  font-weight: bold;

  margin-bottom: 0;
  min-width: 54px;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const NewBox = styled('div')`
  background-color: #1ccdcc;
  border-radius: 5px;
  margin-left: 17px;
  height: 30px;
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: white;
`

const MyBody = styled('body')`
  font-size: medium;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  text-overflow: ellipsis;
  text-align: left;
  overflow: hidden;
  line-height: 1.2em;
  height: 2.4em;
`

const MyH5 = styled('h5')`
  display: flex;
  justify-content: left;
  border-right: 1px solid #d7dae6;
  margin: 0;
  width: 55px;
`

export default AboutNotice