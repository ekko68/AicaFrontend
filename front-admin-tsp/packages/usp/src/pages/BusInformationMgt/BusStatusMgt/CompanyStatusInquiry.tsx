// 사업정보관리/ -> 사업정보관리 페이지
import React from 'react';
import { TableCell } from '@mui/material';
import Grid from '@mui/material/Grid';
import { TableComponents } from 'shared/components/TableComponents';
import { bodyRows, headCells } from '~/pages/Temp/DummyData';
import { useState } from 'react';
import { BlockContents } from 'shared/components/LayoutComponents';
import { CustomButton } from '~/../../shared/src/components/ButtonComponents';

interface DashboardBoxProps {
  children?: React.ReactNode;
  title: string;
  cases: number;
}
interface ViewType01Props {
  vt_title: string;
  vt_tit01: string;
  vt_tit02: string;
  vt_num1: number;
  vt_num2: number;
}
interface ViewType02Props {
  vt_title: string;
  vt_title_sub: string;
  vt_num: number;
}
function ViewType01(props: ViewType01Props) {
  const { vt_title, vt_tit01, vt_tit02, vt_num1, vt_num2 } = props;
  return (
    <div>
      <h5>{vt_title}</h5>
      <div className="type_box">
        <div>
          <p>{vt_tit01}</p>
          <div className="num">
            <span>{vt_num1}</span>건
          </div>
        </div>
        <div>
          <p>{vt_tit02}</p>
          <div className="num">
            <span>{vt_num2}</span>건
          </div>
        </div>
      </div>
    </div>
  );
}
function ViewType02(props: ViewType02Props) {
  const { vt_title, vt_title_sub, vt_num } = props;
  return (
    <div className="vt02">
      <h5>{vt_title}</h5>
      <div className="type_box">
        <p>{vt_title_sub}</p>
        <div className="num">
          <span>{vt_num}</span>건
        </div>
      </div>
    </div>
  );
}

function DashboardBox(props: DashboardBoxProps) {
  const { title, cases, children } = props;

  return (
    <div className="dashboard_box">
      <div className="title">
        {title}
        <span className="cases">
          {cases}
          <span>건</span>
        </span>
      </div>
      {children}
    </div>
  );
}

function CompanyStatusInquiry() {
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
    rowCount: 0,
  });

  const Table = () => {
    return (<div/>
      // <TableComponents
      //   {...pagination}
      //   headCells={headCells}
      //   bodyRows={bodyRows}
      //   handleClick={(key: string) => {
      //     console.log(key);
      //   }}
      //   tableCell={(index: number) => {
      //     const data = bodyRows.at(index) as any;
      //
      //     return (
      //       <>
      //         {data ? (
      //           <>
      //             <TableCell sx={{ paddingLeft: 1 }}>{data.name}</TableCell>
      //             <TableCell align="right">{data.calories}</TableCell>
      //             <TableCell align="right">{data.fat}</TableCell>
      //             <TableCell align="right">{data.carbs}</TableCell>
      //             <TableCell align="right">{data.protein}</TableCell>
      //           </>
      //         ) : (
      //           <></>
      //         )}
      //       </>
      //     );
      //   }}
      // />
    );
  };

  return (
    <div className="main-container" style={{ paddingRight: '20px' }}>
      <div className='minWidth'>
        <BlockContents
          title={'미처리업무'}
          rightContent={<div className="rightContent">2020-12-11 16:03 기준</div>}
        ></BlockContents>
        <Grid container spacing={2.5} className="minWidth">
          <Grid item xs={4}>
            <DashboardBox title="사업신청관리" cases={112}>
              <ViewType01
                vt_title="사업신청"
                vt_tit01="신청"
                vt_tit02="보완요청"
                vt_num1={100}
                vt_num2={12}
              />
            </DashboardBox>
            <DashboardBox title="협약관리" cases={152}>
              <ViewType01
                vt_title="사업계획서 제출"
                vt_tit01="제출"
                vt_tit02="보완요청"
                vt_num1={100}
                vt_num2={12}
              />
              <ViewType02
                vt_title="전자협약"
                vt_title_sub="업체서명완료"
                vt_num={20}
              />
              <ViewType02
                vt_title="협약변경 신청"
                vt_title_sub="신청"
                vt_num={20}
              />
            </DashboardBox>
            <DashboardBox title="교육관리" cases={2}>
              <ViewType02
                vt_title="교육생매칭 대기"
                vt_title_sub="대기건"
                vt_num={2}
              />
            </DashboardBox>
          </Grid>
          <Grid item xs={4}>
            <DashboardBox title="평가관리" cases={112}>
              <ViewType01
                vt_title="발표자료 제출"
                vt_tit01="신청"
                vt_tit02="보완요청"
                vt_num1={100}
                vt_num2={12}
              />
            </DashboardBox>
            <DashboardBox title="과제관리" cases={104}>
              <ViewType01
                vt_title="중간보고 제출"
                vt_tit01="제출"
                vt_tit02="보완요청"
                vt_num1={80}
                vt_num2={12}
              />
              <ViewType01
                vt_title="결과보고 제출"
                vt_tit01="제출"
                vt_tit02="보완요청"
                vt_num1={10}
                vt_num2={2}
              />
            </DashboardBox>
            <DashboardBox title="입주관리" cases={246}>
              <ViewType02
                vt_title="시설예약 신청"
                vt_title_sub="신청"
                vt_num={20}
              />
              <ViewType01
                vt_title="입주성과 제출"
                vt_tit01="제출"
                vt_tit02="보완요청"
                vt_num1={10}
                vt_num2={12}
              />
              <ViewType01
                vt_title="입주연장관리"
                vt_tit01="신청"
                vt_tit02="접수완료(심의대기)"
                vt_num1={100}
                vt_num2={12}
              />
              <ViewType02
                vt_title="퇴실신청관리"
                vt_title_sub="시청"
                vt_num={2}
              />
            </DashboardBox>
          </Grid>
          <Grid item xs={4}>
            <DashboardBox title="선정관리" cases={112}>
              <ViewType02
                vt_title="발표자료 제출"
                vt_title_sub="대기"
                vt_num={12}
              />
              <ViewType01
                vt_title="이의신청"
                vt_tit01="신청"
                vt_tit02="접수완료(심의대기)"
                vt_num1={100}
                vt_num2={12}
              />
            </DashboardBox>
            <DashboardBox title="성과관리" cases={112}>
              <ViewType01
                vt_title="성과제출"
                vt_tit01="제출"
                vt_tit02="보완요청"
                vt_num1={100}
                vt_num2={12}
              />
            </DashboardBox>
            <DashboardBox title="운영관리" cases={52}>
              <ViewType02
                vt_title="전문가 신청"
                vt_title_sub="신청"
                vt_num={12}
              />
              <ViewType02
                vt_title="디딤널 신청"
                vt_title_sub="접수"
                vt_num={20}
              />
              <ViewType02
                vt_title="1:1문의 접수"
                vt_title_sub="접수"
                vt_num={20}
              />
            </DashboardBox>
          </Grid>
        </Grid>
        <BlockContents
          title={'공지사항'}
          rightContent={
            <CustomButton
              label={'더 보기'}
              type={'small'}
              color={'list'}
              style={{
                alignSelf: 'flex-end',
                marginBottom: '20px',
                marginRight: '-30px',
              }}
            />
          }
        ></BlockContents>
        <div className="dataTable type02 onlyBottomLine minWidth">
          <div className="dataTable_header"></div>
          <Table />
        </div>
      </div>
    </div>
  );
}

export default CompanyStatusInquiry;
