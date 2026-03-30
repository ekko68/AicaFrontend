import { useEffect, useState } from 'react';
import * as styles from './styles';
import dayjs from 'shared/libs/dayjs';
import useSWR from 'swr';
import api from '~/api';
import DataTable from '~/components/DataTable';
import Typography from '@mui/material/Typography';
import { GridColumns } from '@mui/x-data-grid';
import { LicenseInfo } from '@mui/x-license-pro';
import { DataGridPro } from '@mui/x-data-grid-pro';
LicenseInfo.setLicenseKey('4710a3119913b38e70c5bdde0aad559eT1JERVI6NDMwNTgsRVhQSVJZPTE2ODMyNTE3MDAwMDAsS0VZVkVSU0lPTj0x');

const fetcher = (url: string, params: any = {}) =>
  api({
    method: 'get',
    url,
    params: { page: params.page + 1, itemsPerPage: params.pageSize },
  });

export default () => {
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 3,
    rowCount: 0,
  });

  const [list, setList] = useState([]);

  const { data, isValidating } = useSWR(
    [`/common/api/boards/usp-notice/articles`, pagination],
    fetcher
  );

  const syncData = () => {
    if (!!data) {
      setList(() => data.list);

      // 게시물 총 갯수
      setPagination((state) => ({ ...state, rowCount: data.totalItems }));
    }
  };
  useEffect(syncData, [data]);

  const handleChange = (page: number) => {
    setPagination((state) => ({ ...state, page }));
  };

  const handleSizeChange = (pageSize: number) => {
    setPagination((state) => ({ ...state, pageSize }));
  };

  //* List 가 없을 때
  if (!list.length) return <div>loading...</div>;

  //* 데이터 로드 후 Datagrid 설정
  const rows = list.map((v: any) => {
    return {
      id: v.rn,
      title: v.title,
      updatedDt: dayjs(v.updatedDt).format('YYYY-MM-DD'),
    };
  });

  const columns:GridColumns = [
    { field: 'id', headerName: 'ID', width: 50, headerAlign: 'center' },
    { field: 'title', headerName: '제목', width: 150, headerAlign: 'center' },
    { field: 'updatedDt', headerName: '업데이트', width: 150, headerAlign: 'center' },
  ];

  return (
    <div css={styles.container}>
      <Typography variant="h6" gutterBottom component="div">
        게시글 목록
      </Typography>
      <Typography variant="h6" gutterBottom component="span">
        Total: {pagination.rowCount}
      </Typography>
      <DataTable
        loading={isValidating}
        {...pagination}
        {...{ columns, rows }}
        onPageChange={handleChange}
        onPageSizeChange={handleSizeChange}
      />
      {/* <DataGridProTest/> */}
    </div>
  );
};