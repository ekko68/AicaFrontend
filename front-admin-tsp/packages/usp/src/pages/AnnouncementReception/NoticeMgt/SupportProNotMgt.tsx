// 공고/접수/ ->  지원사업공고관리 페이지
import React from "react"
import { BlockContents } from 'shared/components/LayoutComponents';
import { CustomButton } from 'shared/components/ButtonComponents';
import { Pagination, Stack, Grid, TextField } from '@mui/material';
import styled from '@emotion/styled';

interface ThumbsetProps {
  imgLink? : string;
  title: string;
}

function Thumbset(props: ThumbsetProps) {
  const { title, imgLink } = props;
  return (
    <div className="thumbSet">
      <div className="thumbImg"></div>
      <p>{title}</p>
    </div>
    )
}

function SupportProNotMgt() {
  return (
    <div className="main-container">
      <div className="minWidth">
      <BlockContents 
        title={'공모전관리'}
        rightContent={
          <div className="rightContent">홈 &gt; 메뉴명 &gt; 화면명</div>
        }
      ></BlockContents>
      <Stack
        flexDirection={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        className="searchSingle"
      >
        <TextField id="fullWidth" />
        <CustomButton label={'검색'} type={'small'} />
      </Stack>
      <Grid container spacing={2.5}>
        <Grid item xs={4} md={2.4}>
          <Thumbset title="[엑센트리벤처스] 엑센트리로켓단 8기 LEVEL-X 엑셀러레이팅 참여기업 모집공고"/>
        </Grid>
        <Grid item xs={4} md={2.4}>
          <Thumbset title="공모전 2"/>
        </Grid>
        <Grid item xs={4} md={2.4}>
          <Thumbset title="공모전 3"/>
        </Grid>
        <Grid item xs={4} md={2.4}>
          <Thumbset title="공모전 4"/>
        </Grid>
        <Grid item xs={4} md={2.4}>
          <Thumbset title="공모전 5"/>
        </Grid>
        <Grid item xs={4} md={2.4}>
          <Thumbset title="[엑센트리벤처스] 엑센트리로켓단 8기 LEVEL-X 엑셀러레이팅 참여기업 모집공고"/>
        </Grid>
        <Grid item xs={4} md={2.4}>
          <Thumbset title="공모전 6"/>
        </Grid>
        <Grid item xs={4} md={2.4}>
          <Thumbset title="[엑센트리벤처스] 엑센트리로켓단 8기 LEVEL-X 엑셀러레이팅 참여기업 모집공고"/>
        </Grid>
        <Grid item xs={4} md={2.4}>
          <Thumbset title="공모전 7"/>
        </Grid>
        <Grid item xs={4} md={2.4}>
          <Thumbset title="공모전 8"/>
        </Grid>
      </Grid>
      <Stack flexDirection={'row'} style={{marginTop:'47px'}} justifyContent={'center'}>
        <PaginationStyle count={10} />
      </Stack>
      <Stack flexDirection={'row'} style={{marginTop:'40px'}} justifyContent={'right'}>
        <CustomButton label={'자료등록'} />
      </Stack>
      </div>
    </div>
  );
}

export default SupportProNotMgt;

const PaginationStyle = styled(Pagination)`
  .Mui-selected {background-color:#1f2437;color: #fff;border-radius:4px}
`;