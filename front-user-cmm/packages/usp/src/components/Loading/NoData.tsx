import { Container, Box } from "@mui/material";
import styled from '@emotion/styled';

const NoData = () =>  {
  return (
    <NoDataBox>
      <Box className="icon_errBox">
        <img src="/images/subpage/icon_error_gray.png" />
      </Box>
      게시물이 없습니다.
    </NoDataBox>
  );
}

export default NoData;

const NoDataBox = styled(Container)`
  padding: 60px 30px;
  margin-top: -1px;
  width: 100%;
  text-align: center;
  font-size: 18px;
  line-height: 1.56;
  letter-spacing: -0.72px;
  color: #222;
  font-weight: 400;
  font-family: "Noto Sans CJK KR", "Roboto";
  border-top: 1px solid #1f2437;
  border-bottom: 1px solid #e0e0e0;
  .icon_errBox{
    margin-bottom: 30px;
    line-height: 1;
  }
  @media (min-width: 320px) and (max-width: 768px) {
    padding: 48px 15px;
    letter-spacing: -0.64px;
    font-size: 16px;
    .icon_errBox{
      margin-bottom: 20px;
    }
  }
`