import React, { useState, useCallback } from 'react';

import { TitleContents, SubContents } from 'shared/components/LayoutComponents';
import TableContainer from '@mui/material/TableContainer';
import { CustomButton } from 'shared/components/ButtonComponents';
import {
  TableSelectCell,
  TableTextFieldCell,
  TableTextFieldButtonCell,
} from 'shared/components/TableComponents';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import styled from '@emotion/styled';

import { VerticalInterval } from 'shared/components/LayoutComponents';
import { CreateAdminData } from '~/service/system/admin/Service';

import { useNavigate } from 'react-router-dom';

import { AxiosPost } from '~/../../shared/src/libs/axios';
import { isValidEmail } from '~/../../shared/src/utils/validation/email';
import { isValidIp } from '~/../../shared/src/utils/validation/ip';
import { useGetAuthonrity } from '~/../../shared/src/utils/hooks/useGetAuthonrity';
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

const Add = () => {
  const { authorityIds, authorityNames } = useGetAuthonrity();
  const deptCode: CodeType[] = useGetGlobalCode('DEPT_CD');
  const deptNames = deptCode.map(({ codeNm }) => codeNm);
  const navigate = useNavigate();
  const [data, setData] = useState<Partial<CreateAdminData>>({});
  const [isDuplicateCheckCompleted, setIsDuplicateCheckCompleted] =
    useState<boolean>(false);

  const moveAdminList = useCallback(() => {
    navigate('/SystemMgt/ManagerMgt/AdministratorAccountMgt');
  }, [navigate]);

  const onChangeHandler = useCallback(
    (name, value) => {
      setData({ ...data, [name]: value });
    },
    [data]
  );

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
      'loginId',
      'memberNm',
      'deptNm',
      'authorityId',
      'email',
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

  const onSubmit = useCallback(async () => {
    if (!isDuplicateCheckCompleted) {
      //아이디 중복검사를 하지 않음
      return;
    }
    const clone: Partial<CreateAdminData> = { ...data };
    if (!!clone.authorityId) {
      clone.authorityId = authorityIds[clone.authorityId];
    }

    clone.deptNm = deptCode.find(
      (c: CodeType) => c.codeNm === clone.deptNm
    )!.code;

    const { isValid } = isValidData(clone);

    if (!isValid) {
      return;
    }

    try {
      const { memberId } = await AxiosPost('/member/api/insiders', clone);
      navigate(`/adminDetail/${memberId}`);
    } catch (error: any) {
      console.error(error);
    }
  }, [data, navigate, isDuplicateCheckCompleted]);

  const idDoubleCheck = async () => {
    const loginId = data.loginId;

    if (!loginId) {
      return;
    }

    const frm = new FormData();
    frm.append('loginId', loginId);

    try {
      const { duplicateYn } = await AxiosPost(
        '/member/api/insiders/verify/login-id',
        frm,
        {
          contentType: 'formData',
        }
      );
      if (duplicateYn) {
        alert('아이디가 중복입니다.');
      } else {
        alert('사용 가능한 아이디입니다.');
      }

      setIsDuplicateCheckCompleted(!duplicateYn);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <TitleContents title={'관리자계정 등록'}>
      <SubContents maxHeight="100%" title="계정정보">
        <TableContainer sx={{ borderTop: '1px solid #d7dae6' }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableTextFieldButtonCell
                  buttonLabel="중복확인"
                  division
                  label={'아이디'}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  required={true}
                  buttonDisabled={!data.loginId}
                  buttonOnclick={idDoubleCheck}
                  onChange={(selected: string) => {
                    onChangeHandler('loginId', selected);
                    setIsDuplicateCheckCompleted(false);
                  }}
                />
                <TableTextFieldCell
                  label={'이름'}
                  required={true}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  onChange={(selected: string) => {
                    onChangeHandler('memberNm', selected);
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
                  onClick={(selected: string) => {
                    onChangeHandler('deptNm', selected);
                  }}
                />
                <TableTextFieldCell
                  label={'직급'}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  onChange={(selected: string) => {
                    onChangeHandler('positionNm', selected);
                  }}
                />
              </TableRow>
              <TableRow>
                <TableSelectCell
                  division
                  required={true}
                  label={'권한'}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  selectLabel={authorityNames}
                  onClick={(selected: string) => {
                    onChangeHandler('authorityId', selected);
                  }}
                />
                <TableTextFieldCell
                  required={true}
                  label={'이메일'}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  onChange={(selected: string) => {
                    onChangeHandler('email', selected);
                  }}
                />
              </TableRow>
              <TableRow>
                <TableTextFieldCell
                  division
                  required={true}
                  label={'전화번호'}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  onChange={(selected: string) => {
                    onChangeHandler('telNo', selected);
                  }}
                />
                <TableTextFieldCell
                  required={true}
                  label={'휴대폰번호'}
                  thWidth={'12%'}
                  tdWidth={'38%'}
                  onChange={(selected: string) => {
                    onChangeHandler('mobileNo', selected);
                  }}
                />
              </TableRow>
              <TableRow>
                <TableTextFieldCell
                  label={'IP주소'}
                  thWidth={'12%'}
                  tdSpan={3}
                  onChange={(selected: string) => {
                    onChangeHandler('memberIps', selected);
                  }}
                  additionContent={<span>
                    {`'/'로 구분하여 복수 등록 가능합니다. (예: 123.123.123.1/123.123.123.2/123.123.123.*)`}
                </span>}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SubContents>
      <VerticalInterval size={'40px'} />
      <Bottom>
        <CustomButton
          label={'저장'}
          type={'large'}
          color={'primary'}
          onClick={onSubmit}
        />
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

export default Add;
