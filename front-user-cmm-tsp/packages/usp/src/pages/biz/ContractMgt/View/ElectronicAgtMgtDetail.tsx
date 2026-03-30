import { useState } from 'react';
import * as styles from '../styles';
import BreadCrumb from '~/components/BreadCrumb';
import Box from '@mui/material/Box';
import {Stack, Button } from '@mui/material';
import fetchDownload from '~/fetches/fetchDownload';
import { useGlobalModalStore } from '~/pages/store/GlobalModalStore';
import { CustomButton } from 'shared/components/ButtonComponents';
import { ModalReasonConfirm } from '../../BusinessAppMgt/PopComp/ModalReasonConfirm';

// 전자협약상세
function ElectronicAgtMgtDetail() {
  const isDetail = true;
  const {addModal} = useGlobalModalStore();
  const [attachmentFileList2,setAttachmentFileList2]:any = useState();
  const download = async (rsltId:string,attachmentId:string) =>{ 
    fetchDownload(`${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/rslt/${rsltId}/hist/atchmnfl/${attachmentId}`)
    .then()
    .catch((e)=>{
      let status = e.response.status;
      console.log(status);
      
      if(status === 400){
        addModal({
          open: true,
          content: "파일이 없습니다."
        })
      }
      });
  }
  const downloadAll = async (rsltId:string) =>{ 
    fetchDownload(`${process.env.REACT_APP_DOMAIN_PMS_BNET}/pms/api/front/rslt/${rsltId}/hist/atchmnfl`)
    .then()
    .catch((e)=>{
      let status = e.response.status;
      console.log(status);
      
      if(status === 400){
        addModal({
          open: true,
          content: "파일이 없습니다."
        })
      }
      });
  }
  return (
    <div css={styles.container}>
    <Box css={styles.sub_cont01}>
      <div className="benner">
        <BreadCrumb />
        <div className="content">
          <div className="txtbox">
            <h2 className="tit">전자협약 상세</h2>
            <p className={isDetail?'nobtm':''}>사업계획서 접수가 완료된 과제의 협약을 진행하고 협약서를 조회 및 다운로드 받을 수 있습니다.</p>
          </div>
        </div>
      </div>
      <div className='content_body'>
        <div className="content">
          <Box css={styles.table}>
            <div className="detail_table"> 
              <dl>
                <dt>협약상태</dt>
                <dd className='blue'>서명요청</dd>
              </dl>
            </div>
          </Box>
          <h4 className="tbl_title">{/* css특성때문에 집어넣었어요. 삭제하지마세요. */}</h4>
          <h4 className="tbl_title">협약서 정보</h4>
          <Box css={styles.table}>
            <div className="detail_table type2">
              <dl>
                <dt>과제명</dt>
                <dd>딥러닝 기반 버츄얼 휴면 인플루언서 개발</dd>
              </dl>
              <dl>
                <dt>협약일자</dt>
                <dd>2021-11-12</dd>
              </dl>
              <dl>
                <dt>협약기간</dt>
                <dd>2021-11-12 ~ 2022-12-12</dd>
              </dl>
              <dl className='horz'>
                <dt>협약금액<span className='unit'>(단위:천원)</span></dt>
                <dd>
                  <div className='tableDefault_scroll'>
                    <table className="tableDefault type5">
                      <colgroup>
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                      </colgroup>
                      <thead>
                        <tr>
                          <th rowSpan={2}>지원금</th>
                          <th colSpan={3}>민간부담금</th>
                          <th rowSpan={2}>합계</th>
                        </tr>
                        <tr>
                          <th>현금</th>
                          <th>현물</th>
                          <th>소계</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="tar">200,000</td>
                          <td className="tar">200,000</td>
                          <td className="tar">200,000</td>
                          <td className="tar">200,000</td>
                          <td className="tar">200,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </dd>
              </dl>
              <dl className='horz'>
                <dt>협약주체</dt>
                <dd>
                  <div className='tableDefault_scroll'>
                    <table className="tableDefault type5">
                      <colgroup>
                        <col style={{width:'20%'}} />
                        <col style={{width:'20%'}} />
                        <col style={{width:'20%'}} />
                        <col />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>기업명</th>
                          <th>대표자명</th>
                          <th>사업자등록번호</th>
                          <th>서명</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>인공지능산업융합사업단</td>
                          <td>김철수</td>
                          <td>111-111111-11</td>
                          <td className='blue'>서명완료 (2021-11-12 14ㅣ30)</td>
                        </tr>
                        <tr>
                          <td>인공지능산업융합사업단</td>
                          <td>김철수</td>
                          <td>111-111111-11</td>
                          <td className='blue'>서명완료 (2021-11-12 14ㅣ30)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </dd>
              </dl>
              <dl className='horz'>
                <dt>참여기업</dt>
                <dd>
                  <div className='tableDefault_scroll'>
                    <table className="tableDefault type5">
                      <colgroup>
                        <col style={{width:'20%'}} />
                        <col style={{width:'20%'}} />
                        <col style={{width:'20%'}} />
                        <col />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>기업명</th>
                          <th>대표자명</th>
                          <th>사업자등록번호</th>
                          <th>서명</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>인공지능산업융합사업단</td>
                          <td>김철수</td>
                          <td>111-111111-11</td>
                          <td className='blue'>서명완료 (2021-11-12 14ㅣ30)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </dd>
              </dl>
              <dl className='horz'>
                <dt>참여기업</dt>
                <dd>작성한 협약서 본문이 출력됩니다. 작성한 협약서 본문이 출력됩니다. 작성한 협약서 본문이 출력됩니다. 작성한 협약서 본문이 출력됩니다. 작성한 협약서 본문이 출력됩니다. 작성한 협약서 본문이 출력됩니다. 작성한 협약서 본문이 출력됩니다.</dd>
              </dl>
            </div>
          </Box>
          <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} className='tbl_title'>
            <h4>첨부파일</h4>
          </Stack>
          <Stack css={styles.attatchedFile}>
            {attachmentFileList2 ? attachmentFileList2.map((item:any)=>(
            <Stack css={styles.btnDown}>
              <Button onClick={() => download("rslt-6f894bba44fb426c8a5327a44ef76bbe",item.attachmentId)}>
                <span>{item.fileNm}</span>
              </Button>
            </Stack>
            ))
            :null}
          </Stack>
          <h4 className="tbl_title">해지정보</h4>
          <Box css={styles.table}>
            <div className="detail_table"> 
              <dl>
                <dt>해지일</dt>
                <dd>2021-11-01</dd>
              </dl>
              <dl>
                <dt>해지사유</dt>
                <dd>사업중도포기</dd>
              </dl>
            </div>
          </Box>
          <Stack direction="row" justifyContent="center" spacing={2} sx={{marginTop: '40px'}} css={styles.btn_next}>
            <CustomButton label={'서명'} type={'listBack'} color={'primary'} />
          </Stack>
          <Stack css={styles.btnDown} sx={{marginTop: '40px'}}>
            <ModalReasonConfirm 
              applyId='lastsor-a4de44b79ccf42649b878ddc3a2d88a4' 
              viewNm='ElectronicAgtMgtDetail' 
              title='협약서 다운로드'
              variant='outlined'
              label='협약서 다운로드'
              type='frontNomal'
              color='outlined'
            />
          </Stack>
        </div>
      </div>
    </Box>
    </div>
  );
}

export default ElectronicAgtMgtDetail;