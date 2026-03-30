// 사업/시설 -> 사업예약 페이지
import React from "react"
import { useState } from 'react';
import { FormControl, Select, SelectChangeEvent } from '@mui/material';
import { BlockContents } from 'shared/components/LayoutComponents';
import MenuItem from '@mui/material/MenuItem';
import { CustomButton, CustomIconButton } from "~/components/ButtonComponents";
import { Icons } from 'shared/components/IconContainer';

function RecCommMem() {
  const [age, setAge] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <div className="main-container">
      <div className="minWidth">
        <BlockContents 
          title={'협약변경내역 상세'}
          rightContent={
            <div className="rightContent">홈 &gt; 메뉴명 &gt; 화면명</div>
          }
        ></BlockContents>
        <div className="tableDefault topBdrBlue">
          <table>
            <colgroup>
              <col style={{width:'12%'}} />
              <col style={{width:'28%'}} />
              <col style={{width:'13%'}} />
              <col style={{width:'29%'}} />
              <col style={{width:'18%'}} />
            </colgroup>
            <thead>
              <tr>
                <th>등록일</th>
                <th>과제명</th>
                <th>사업연도</th>
                <th>사업명</th>
                <th>사업자명/이름</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>12345</td>
                <td>딥러닝 기반 버츄얼 휴먼 인플루언서 개발</td>
                <td className="tac">2021</td>
                <td>AI (시)제품/서비스 제작지원 사업</td>
                <td className="tac">㈜블루레몬</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="tableDefault topBdrBlue">
          <table>
            <colgroup>
              <col style={{width:'50%'}} />
              <col style={{width:'50%'}} />
            </colgroup>
            <thead>
              <tr>
                <td colSpan={2} className="changeItem">
                  <div className="inside">
                    <div className="tit">변경항목</div>
                    <FormControl size="small">
                      <Select value={age} onChange={handleChange} displayEmpty>
                        <MenuItem value="">신청자정보</MenuItem>
                        <MenuItem value="{2}">신청자정보2</MenuItem>
                        <MenuItem value="{3}">신청자정보3</MenuItem>
                      </Select>
                    </FormControl>
                    <div className="dateButton">
                      <CustomButton label={'2021-12-24'} type={'small'} color={'item'} />
                      <CustomButton label={'2021-12-24'} type={'small'} color={'item'} />
                      <CustomButton label={'2021-12-24'} type={'small'} color={'primary'} />
                      <CustomButton label={'2021-12-24'} type={'small'} color={'item'} />
                      <CustomButton label={'2021-12-24'} type={'small'} color={'item'} />
                      <CustomButton label={'2021-12-24'} type={'small'} color={'item'} />
                      <CustomButton label={'2021-12-24'} type={'small'} color={'item'} />
                      <div className="control">
                        <CustomIconButton icon={Icons.ArrowPrev} />
                        <CustomIconButton icon={Icons.ArrowNext} />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="td_tit_set">
                    <div className="tit">변경 전</div>
                    <div className="date">2021-12-01</div>
                  </div>
                </td>
                <td>
                  <div className="td_tit_set">
                    <div className="tit">변경 후</div>
                    <div className="date">2021-12-01</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="pt-10">
                  <div className="tableDefault type3">
                    <table>
                      <colgroup>
                        <col style={{width:'20%'}} />
                        <col style={{width:'30%'}} />
                        <col style={{width:'20%'}} />
                        <col style={{width:'30%'}} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th colSpan={4} className="hdr_tit">신청자정보</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>이름</th>
                          <td>이은영</td>
                          <th>생년월일</th>
                          <td className="fnt_roboto">1980-01-01</td>
                        </tr>
                        <tr>
                          <th>성별</th>
                          <td>여성</td>
                          <th>내외국인</th>
                          <td>내국인</td>
                        </tr>
                        <tr>
                          <th>휴대폰 번호</th>
                          <td className="fnt_roboto">010-1234-1234</td>
                          <th>이메일</th>
                          <td className="fnt_roboto">abc@gmail.com</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="tableDefault type3">
                    <table>
                    <colgroup>
                        <col style={{width:'30%'}} />
                        <col style={{width:'70%'}} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th colSpan={4} className="hdr_tit">과제정보</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>과제명/프로젝트명(국문)</th>
                          <td>과제명과제명과제명과제명과제명과제명과제명과제명과제명</td>
                        </tr>
                        <tr>
                          <th>과제분야</th>
                          <td>자동차</td>
                        </tr>
                        <tr>
                          <th>사업기간</th>
                          <td>협약 체결일 ~ 2021-12-31</td>
                        </tr>
                        <tr>
                          <th>사업기간(전체)</th>
                          <td>2021-06-01 ~ 2024-12.31(43개월)</td>
                        </tr>
                        <tr>
                          <th>사업기간(당해)</th>
                          <td>2021-06-01 ~ 2021-12.31(7개월)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="tableDefault type3">
                    <table>
                      <colgroup>
                        <col style={{width:'20%'}} />
                        <col style={{width:'30%'}} />
                        <col style={{width:'20%'}} />
                        <col style={{width:'30%'}} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th colSpan={4} className="hdr_tit">과제책임자</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>이름</th>
                          <td>김원희</td>
                          <th>생년월일</th>
                          <td className="fnt_roboto">1980-01-01</td>
                        </tr>
                        <tr>
                          <th>휴대폰 번호</th>
                          <td className="fnt_roboto">010-1234-1234</td>
                          <th>이메일</th>
                          <td className="fnt_roboto">abc@gmail.com</td>
                        </tr>
                        <tr>
                          <th>부서/학과</th>
                          <td>신규사업부</td>
                          <th>직위/직급</th>
                          <td>과장</td>
                        </tr>
                        <tr>
                          <th>주소</th>
                          <td>서울시 중구 1동</td>
                          <th>유선번호</th>
                          <td className="fnt_roboto">000-0000-0000</td>
                        </tr>
                        <tr>
                          <th>팩스번호</th>
                          <td className="fnt_roboto">000-0000-0000</td>
                          <th>과학기술인<br />등록번호</th>
                          <td className="fnt_roboto">11-11111</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="tableDefault type3">
                    <table>
                      <colgroup>
                        <col style={{width:'20%'}} />
                        <col style={{width:'30%'}} />
                        <col style={{width:'20%'}} />
                        <col style={{width:'30%'}} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th colSpan={4} className="hdr_tit">참여기관</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>참여업체<br />총 수</th>
                          <td>2</td>
                          <th>중견기관 수</th>
                          <td>2</td>
                        </tr>
                        <tr>
                          <th>기업(관)명</th>
                          <td>A기관</td>
                          <th>책임자명</th>
                          <td>김영희</td>
                        </tr>
                        <tr>
                          <th>직위/직급</th>
                          <td>부장</td>
                          <th>연락처</th>
                          <td className="fnt_roboto">000-0000-0000</td>
                        </tr>
                        <tr>
                          <th>휴대전화</th>
                          <td className="fnt_roboto">000-0000-0000</td>
                          <th>이메일</th>
                          <td className="fnt_roboto">abc@gmail.com</td>
                        </tr>
                        <tr>
                          <th>과학기술인<br />등록번호</th>
                          <td colSpan={3} className="fnt_roboto">24152324</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
                <td className="pt-10">
                  <div className="tableDefault type3">
                    <table>
                      <colgroup>
                        <col style={{width:'20%'}} />
                        <col style={{width:'30%'}} />
                        <col style={{width:'20%'}} />
                        <col style={{width:'30%'}} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th colSpan={4} className="hdr_tit">신청자정보</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th className="bg_type1">이름</th>
                          <td className="txt_clr1">이은영</td>
                          <th>생년월일</th>
                          <td className="fnt_roboto">1980-01-01</td>
                        </tr>
                        <tr>
                          <th>성별</th>
                          <td>여성</td>
                          <th>내외국인</th>
                          <td>내국인</td>
                        </tr>
                        <tr>
                          <th className="bg_type1">휴대폰 번호</th>
                          <td className="txt_clr1 fnt_roboto">010-1234-1234</td>
                          <th>이메일</th>
                          <td>abc@gmail.com</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="tableDefault type3">
                    <table>
                    <colgroup>
                        <col style={{width:'30%'}} />
                        <col style={{width:'70%'}} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th colSpan={4} className="hdr_tit">과제정보</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>과제명/프로젝트명(국문)</th>
                          <td>과제명과제명과제명과제명과제명과제명과제명과제명과제명</td>
                        </tr>
                        <tr>
                          <th>과제분야</th>
                          <td>자동차</td>
                        </tr>
                        <tr>
                          <th>사업기간</th>
                          <td>협약 체결일 ~ 2021-12-31</td>
                        </tr>
                        <tr>
                          <th>사업기간(전체)</th>
                          <td>2021-06-01 ~ 2024-12.31(43개월)</td>
                        </tr>
                        <tr>
                          <th>사업기간(당해)</th>
                          <td>2021-06-01 ~ 2021-12.31(7개월)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="tableDefault type3">
                    <table>
                      <colgroup>
                        <col style={{width:'20%'}} />
                        <col style={{width:'30%'}} />
                        <col style={{width:'20%'}} />
                        <col style={{width:'30%'}} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th colSpan={4} className="hdr_tit">과제책임자</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>이름</th>
                          <td>김원희</td>
                          <th>생년월일</th>
                          <td className="fnt_roboto">1980-01-01</td>
                        </tr>
                        <tr>
                          <th>휴대폰 번호</th>
                          <td className="fnt_roboto">010-1234-1234</td>
                          <th>이메일</th>
                          <td className="fnt_roboto">abc@gmail.com</td>
                        </tr>
                        <tr>
                          <th>부서/학과</th>
                          <td>신규사업부</td>
                          <th>직위/직급</th>
                          <td>과장</td>
                        </tr>
                        <tr>
                          <th>주소</th>
                          <td>서울시 중구 1동</td>
                          <th>유선번호</th>
                          <td className="fnt_roboto">000-0000-0000</td>
                        </tr>
                        <tr>
                          <th>팩스번호</th>
                          <td className="fnt_roboto">000-0000-0000</td>
                          <th>과학기술인<br />등록번호</th>
                          <td className="fnt_roboto">11-11111</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="tableDefault type3">
                    <table>
                      <colgroup>
                        <col style={{width:'20%'}} />
                        <col style={{width:'30%'}} />
                        <col style={{width:'20%'}} />
                        <col style={{width:'30%'}} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th colSpan={4} className="hdr_tit">참여기관</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>참여업체<br />총 수</th>
                          <td>2</td>
                          <th>중견기관 수</th>
                          <td>2</td>
                        </tr>
                        <tr>
                          <th>기업(관)명</th>
                          <td>A기관</td>
                          <th>책임자명</th>
                          <td>김영희</td>
                        </tr>
                        <tr>
                          <th>직위/직급</th>
                          <td>부장</td>
                          <th>연락처</th>
                          <td className="fnt_roboto">000-0000-0000</td>
                        </tr>
                        <tr>
                          <th>휴대전화</th>
                          <td className="fnt_roboto">000-0000-0000</td>
                          <th>이메일</th>
                          <td className="fnt_roboto">abc@gmail.com</td>
                        </tr>
                        <tr>
                          <th>과학기술인<br />등록번호</th>
                          <td colSpan={3} className="fnt_roboto">24152324</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="list_btm">
          <CustomButton label={'목록'} type={'largeList'} color={'outlined'} />
        </div>
      </div>
    </div>

  );
}

export default RecCommMem;
