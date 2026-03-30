import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TitleContents, SubContents } from 'shared/components/LayoutComponents';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';

import {
  TableSelectCell,
  TableTextFieldCell,
  TableTextCell,
  TableHeaderCell,
  TableBodyCell,
} from 'shared/components/TableComponents';
import { CustomButton } from '~/components/ButtonComponents';
import { AdminHistory } from '~/service/system/admin/Service';
import { AxiosGet, AxiosPut } from '~/../../shared/src/libs/axios';
import { useNavigate } from 'react-router-dom';
import { useGetAuthonrity } from '~/../../shared/src/utils/hooks/useGetAuthonrity';

import {
  ModifyAdminData,
  AdminDetailData,
} from '~/service/system/admin/Service';
import { isValidEmail } from '~/../../shared/src/utils/validation/email';
import { isValidIp } from '~/../../shared/src/utils/validation/ip';
import {
  useGetGlobalCode,
  CodeType,
} from '~/../../shared/src/utils/hooks/useGetGlobalCode';

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > button:first-child {
    margin-right: 4px;
  }
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Information = ({ detailData, setDetailData }) => {
  const { id } = useParams();
  const deptCode: CodeType[] = useGetGlobalCode('DEPT_CD');
  const deptNames = deptCode.map(({ codeNm }) => codeNm);
  const { authorityNames } = useGetAuthonrity();

  const statusCode: CodeType[] = useGetGlobalCode('MEMBER_ST');
  const statusNames = statusCode
    .filter(({ codeNm }) => ['정상', '중지'].includes(codeNm))
    .map(({ codeNm }) => codeNm);

  const onChangeHandelr = useCallback(
    (name, value) => {
      setDetailData({ ...detailData, [name]: value });
    },
    [detailData]
  );

  const initPassword = useCallback(async () => {
    try {
      await AxiosPut(`/member/api/insiders/${id}/passwd-init`);
    } catch (error: any) {
      console.error(error);
    }
  }, []);

  return (
    <SubContents title="계정정보" maxHeight="100%">
      <TableContainer sx={{ borderTop: '1px solid #d7dae6' }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableTextCell
                label={detailData.loginId}
                title="아이디"
                thWidth={'12%'}
                tdWidth={'30%'}
                division
              />
              <TableTextFieldCell
                defaultLabel={detailData.memberNm}
                required={true}
                label={'이름'}
                thWidth={'12%'}
                tdWidth={'30%'}
                onChange={(selected: string) => {
                  onChangeHandelr('memberNm', selected);
                }}
              />
            </TableRow>
            <TableRow>
              <TableSelectCell
                division
                required={true}
                label={'부서'}
                thWidth={'12%'}
                tdWidth={'30%'}
                selectLabel={deptNames}
                defaultLabel={detailData.deptNm}
                onClick={(selected: string) => {
                  onChangeHandelr('deptNm', selected);
                }}
              />
              <TableTextFieldCell
                label={'직급'}
                defaultLabel={detailData.positionNm}
                thWidth={'12%'}
                tdWidth={'30%'}
                onChange={(selected: string) => {
                  onChangeHandelr('positionNm', selected);
                }}
              />
            </TableRow>
            <TableRow>
              <TableSelectCell
                division
                required={true}
                label={'권한'}
                thWidth={'12%'}
                tdWidth={'30%'}
                selectLabel={authorityNames}
                defaultLabel={detailData.authorityId}
                onClick={(selected: string) => {
                  onChangeHandelr('authorityId', selected);
                }}
              />
              <TableTextFieldCell
                defaultLabel={detailData.email}
                required={true}
                label={'이메일'}
                thWidth={'12%'}
                tdWidth={'30%'}
                onChange={(selected: string) => {
                  onChangeHandelr('email', selected);
                }}
              />
            </TableRow>
            <TableRow>
              <TableTextFieldCell
                defaultLabel={detailData.telNo}
                division
                required={true}
                label={'전화번호'}
                thWidth={'12%'}
                tdWidth={'30%'}
                onChange={(selected: string) => {
                  onChangeHandelr('telNo', selected);
                }}
              />
              <TableTextFieldCell
                defaultLabel={detailData.mobileNo}
                required={true}
                label={'휴대폰번호'}
                thWidth={'12%'}
                tdWidth={'30%'}
                onChange={(selected: string) => {
                  onChangeHandelr('mobileNo', selected);
                }}
              />
            </TableRow>
            <TableRow>
              <TableTextFieldCell
                tdSpan={3}
                defaultLabel={detailData.memberIps}
                label={'IP주소'}
                thWidth={'12%'}
                tdWidth={'30%'}
                onChange={(selected: string) => {
                  onChangeHandelr('memberIps', selected);
                }}
                additionContent={
                  <span>
                    {`'/'로 구분하여 복수 등록 가능합니다.(예: 123.123.123.1/123.123.123.2/123.123.123.*)`}
                  </span>
                }
              />
            </TableRow>
            <TableRow>
              <TableHeaderCell
                width={'12%'}
                style={{ borderRight: '1px solid #d7dae6' }}
              >
                비밀번호
              </TableHeaderCell>
              <TableBodyCell
                width={'30$'}
                sx={{
                  borderRight: '1px solid #d7dae6',
                }}
              >
                <CustomButton
                  onClick={initPassword}
                  label={'비밀번호 초기화'}
                  type={'small'}
                  color={'primary'}
                />
              </TableBodyCell>
              <TableSelectCell
                medium
                label={'상태'}
                thWidth={'12%'}
                tdWidth={'30%'}
                selectLabel={statusNames}
                defaultLabel={detailData.memberSt}
                onClick={(selected: string) => {
                  onChangeHandelr('memberSt', selected);
                }}
              />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>
  );
};

const History = () => {
  const [historyData, setHistoryData] = useState<AdminHistory[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const requestHistory = async () => {
      try {
        const response = await AxiosGet(`/member/api/insiders/${id}/hist`);
        setHistoryData(response.list);
      } catch (error: any) {
        console.error(error);
      }
    };

    requestHistory();
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>변경일시</TableCell>
              <TableCell>작업내용</TableCell>
              <TableCell>처리자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData.map((row, index) => (
              <TableRow key={row.histId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.fmtHistDt}</TableCell>
                <TableCell>{row.workCn}</TableCell>
                <TableCell>{row.workerNm}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [detailData, setDetailData] = useState<Partial<AdminDetailData>>({});
  const { authorityIds } = useGetAuthonrity();
  const deptCode: CodeType[] = useGetGlobalCode('DEPT_CD');
  const statusCode: CodeType[] = useGetGlobalCode('MEMBER_ST');

  const extractData = (data) => {
    const {
      loginId,
      memberId,
      memberNm,
      positionNm,
      telNo,
      mobileNo,
      email,
      memberIps,
      authorityNm,
      memberStNm,
      deptNm,
    } = data;

    const obj = {
      loginId,
      memberId,
      memberNm,
      positionNm,
      telNo,
      mobileNo,
      email,
      memberIps,
      deptNm,
      authorityId: authorityNm,
      memberSt: memberStNm,
    };

    setDetailData(obj);
  };

  useEffect(() => {
    const requestMemberDetail = async () => {
      try {
        const response = await AxiosGet(`/member/api/insiders/${id}`);
        extractData(response);
      } catch (error: any) {
        console.error(error);
      }
    };

    requestMemberDetail();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const verifyIps = (ips) => {
    const ipsToArray = ips.split('/');

    if (ipsToArray.length >= 51) {
      return false;
    }

    const findinValidIp = ipsToArray.some((ip: string) => !isValidIp(ip));

    return !findinValidIp;
  };

  const isValidData = (data) => {
    const REQUIRED_VALUES: string[] = [
      'memberId',
      'memberNm',
      'deptNm',
      'authorityId',
      'email',
      'telNo',
      'mobileNo',
    ];

    const isFullFill: boolean = REQUIRED_VALUES.every((key) => !!data[key]);

    if (!isFullFill) {
      //필수 값이 다 채워져있지 않음
      return { isValid: false };
    }

    const email: string = data.email || '';

    if (!isValidEmail(email)) {
      //email이 유효하지 않음
      return { isValid: false };
    }

    const memberIps = data.memberIps || '';

    if (!!memberIps && !verifyIps(memberIps)) {
      //ip주소가 50개가 넘거나 유효하지 않은 ip가 있음
      return { isValid: false };
    }

    return { isValid: true };
  };

  const onModifyHandler = async () => {
    const clone = { ...detailData };

    const { isValid } = isValidData(clone);

    if (!isValid) {
      return;
    }

    if (!!clone.authorityId) {
      clone.authorityId = authorityIds[clone.authorityId];
    }

    delete clone.loginId;

    const findDeptCode = deptCode.find(
      (codes: CodeType) => codes.codeNm === clone.deptNm
    )!.code;

    clone.deptNm = findDeptCode;

    if (!!clone.memberSt) {
      const findStatusCode = statusCode.find(
        (codes: CodeType) => codes.codeNm === clone.memberSt
      )!.code;

      clone.memberSt = findStatusCode;
    }

    const body = [
      'memberId',
      'memberNm',
      'deptNm',
      'positionNm',
      'authorityId',
      'telNo',
      'mobileNo',
      'email',
      'memberIps',
      'memberSt',
    ].reduce((body, key) => {
      if (!!clone[key]) {
        body[key] = clone[key];
      }

      return body;
    }, {});

    try {
      const res = await AxiosPut(`/member/api/insiders/${id}`, body);
      extractData(res);
    } catch (error: any) {}
  };

  const moveAdminList = useCallback(() => {
    navigate('/SystemMgt/ManagerMgt/AdministratorAccountMgt');
  }, [navigate]);

  return (
    <TitleContents title={'관리자계정 상세'}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={handleChange}>
            <Tab label="계정정보" {...a11yProps(0)} />
            <Tab label="처리내역" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tabIndex} index={0}>
          <Information detailData={detailData} setDetailData={setDetailData} />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <History />
        </TabPanel>
      </Box>
      <Bottom>
        {tabIndex === 0 && (
          <CustomButton
            label={'저장'}
            type={'large'}
            color={'primary'}
            onClick={onModifyHandler}
          />
        )}
        <CustomButton
          label={'목록'}
          type={'large'}
          color={'secondary'}
          onClick={moveAdminList}
        />
      </Bottom>
    </TitleContents>
  );
};

export default Detail;
