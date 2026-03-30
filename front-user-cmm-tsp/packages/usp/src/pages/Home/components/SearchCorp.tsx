import * as React from 'react';
import { useState, useEffect } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { CustomButton } from '~/components/ButtonComponents';

import { breakpoint, common } from '../styles/styleCommon';
import {
  SlideContainer,
  SlideContents,
  SlideTitle,
} from '../styles/styleHomeElem';

import {
  SearchCorpInpGroup,
  SwiperSearchCorpInpGroup,
} from './SearchCorpInpGroup';
import { fetchGetCommCode } from '~/fetches';
import { useQuery } from 'react-query';
import { fetchRecomendPblanc } from '~/fetches/fetchNotice';

export const SearchCorp: React.FC<{
  swiper: any;
  propOnResultSearch: any;
  propSearchData: any;
}> = (props) => {
  const [isMobile, setIsMobile] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);
  const [checkedCkbox, setCheckedCkbox] = useState<string>("");
  const [checkedRdobox, setCheckedRdobox] = useState<string>("");

  const handleCheckedCkbox = (elem: any) => {
    const checked = elem.checked;
    if (checked) {
      if(checkedCkbox===""){
        setCheckedCkbox(checkedCkbox+elem.value);
      }else{
        setCheckedCkbox(checkedCkbox+","+elem.value);
      }
    } else {
      if(checkedCkbox.includes(",")){
        setCheckedCkbox(checkedCkbox.replace(","+elem.value,""))
      }else{
        setCheckedCkbox(checkedCkbox.replace(elem.value,""))
      }
    }
  };

  const handleCheckedRdobox = (elem: any) => {
    const checked = elem.checked;
    if (checked) {
      setCheckedRdobox(elem.value);
    }
  };

  useEffect(() => {
    checkedCkbox!=="" && checkedRdobox!==""
      ? setIsDisabled(false)
      : setIsDisabled(true);
  }, [checkedCkbox, checkedRdobox]);

  const containerBg = css`
    background: ${common.bg_grey};
  `;

  const contentsCss = css`
    display: flex;
    flex-wrap: wrap;
    padding-left: ${common.pdxM};
    padding-right: ${common.pdxM};

    @media (min-width: ${breakpoint.desk1920}) {
      padding-left: ${common.pdxL};
      padding-right: ${common.pdxL};
    }

    @media (max-width: 1400px) {
      padding-left: ${common.pdxSM};
      padding-right: ${common.pdxSM};
    }

    @media (max-width: 1000px) {
      padding-left: 50px;
      padding-right: 50px;
    }

    @media (max-width: ${breakpoint.mobile}) {
      padding: 15vw ${common.sz15} 5vw;
    }
  `;

  const SlideTitleCss = css`
    b {
      color: ${common.azul};
    }
  `;

  const getSearchResultData = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/type');
    const data = await response.json();
    const names = data.results.map((r: any) => r.name); // extracting 'name' prop into array of names

    props.propSearchData(names);
  };

  const handleSearchCorpResult = (e: React.MouseEvent) => {
    const params = {
      fntnRecomendClCd : checkedRdobox,
      recomendCl : checkedCkbox
    }
    fetchRecomendPblanc(params).then((res:any)=>{
      props.propSearchData(res.list);
    })
    e.stopPropagation();
    props.propOnResultSearch(true);
    props.swiper.slideNext();
  };

  useEffect(() => {
    const updateWindowDimensions = () => {
      window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);
    };

    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);

    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);
    //사업정보
    const [checkBoxFNTN,setFNTN]:any = useState([]);
    //교육정보
    const [checkBoxBSR,setBSR]:any = useState([]);
    // 코드 조회
    const getCommCode = () => {
  
      fetchGetCommCode("RECOMEND_CL")
          .then((res) => {
            const update = [...checkBoxFNTN];
            const update2 = [...checkBoxBSR];
            res.list.map((item:any)=>{
              if(item.code.includes("FNTN")){
                let infoNtcn = {
                  codeNm : item.codeNm.replace(")","").split("(")[0],
                  child : item.codeNm.replace(")","").split("(")[1],
                  code : item.code
                };
                update.push(infoNtcn);
              }else if(item.code.includes("BSR")){
                let infoNtcn = {
                  codeNm : item.codeNm,
                  code : item.code
                };
                update2.push(infoNtcn);
              }
            })
            setFNTN(update);
            setBSR(update2);
          })
    };
    useEffect(()=>{
      getCommCode();
    },[])


  return (
    <SlideContainer css={containerBg}>
      <SlideContents css={contentsCss}>
        <SearchCorpLeftGroup>
          <SlideTitle css={SlideTitleCss}>
            <span>
              나에게 맞는
              <br />
              <b>사업 찾기</b>
            </span>
          </SlideTitle>
          <SearchCorpLeftFigure />
        </SearchCorpLeftGroup>
        <SearchCorpRightGroup>
          <SearchCorpRightInfoTxt>
            나의 창업단계와 관심사업을 선택하여 <br />
            나에게 맞는 사업공고를 빠르게 찾아볼 수 있습니다.
          </SearchCorpRightInfoTxt>
          <SearchCorpRightStepGroup>
            {isMobile ? (
              <SwiperSearchCorpInpGroup
                FNTN = {checkBoxFNTN}
                BSR = {checkBoxBSR}
                onCheckedCkbox={handleCheckedCkbox}
                onCheckedRdobox={handleCheckedRdobox}
                checkedRdobox={checkedRdobox}
              />
            ) : (
              <SearchCorpInpGroup
                FNTN = {checkBoxFNTN}
                BSR = {checkBoxBSR}
                onCheckedCkbox={handleCheckedCkbox}
                onCheckedRdobox={handleCheckedRdobox}
              />
            )}

            <SearchCorpRightBtnGroup>
              <CustomButton
                label={'사업 찾기'}
                type={'fullLg'}
                color={'primary'}
                onClick={handleSearchCorpResult}
                disabled={isDisabled}
                style={{}}
              />
            </SearchCorpRightBtnGroup>
          </SearchCorpRightStepGroup>
        </SearchCorpRightGroup>
      </SlideContents>
    </SlideContainer>
  );
};

const SearchCorpLeftGroup = styled('div')`
  width: 46%;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;
const SearchCorpLeftFigure = styled('figure')`
  width: 100%;
  height: 390px;
  margin: 0;
  padding: 0;
  background: url('/images/main/main_corp_search_ico.png') no-repeat right
    center / contain;
  margin-top: ${common.sz14};

  @media (min-width: ${breakpoint.desk1280}) and (max-height: ${breakpoint.height740}) {
    height: 350px;
  }

  @media (max-width: 1000px) {
    display: none;
  }
`;
const SearchCorpRightGroup = styled('div')`
  width: 54%;
  padding-left: ${common.sz60};

  @media (max-width: 1000px) {
    width: 100%;
    margin-top: ${common.sz30};
    padding-left: 0;
  }
  @media (max-width: ${breakpoint.mobile}) {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    margin-top: ${common.sz10};
  }
`;
const SearchCorpRightInfoTxt = styled('p')`
  font-size: ${common.sz20};
  color: ${common.brownish_gray};
  line-height: 1.7;
  letter-spacing: -0.06em;

  @media (max-width: ${breakpoint.mobile}) {
    font-size: ${common.sz16};
    line-height: ${common.sz24};
  }
`;
const SearchCorpRightStepGroup = styled('form')`
  margin-top: ${common.sz40};

  @media (min-width: ${breakpoint.desk1280}) and (max-height: ${breakpoint.height740}) {
    margin-top: ${common.sz20};
  }

  @media (max-width: 1000px) {
    margin-top: ${common.sz30};
  }

  @media (max-width: ${breakpoint.mobile}) {
    position: relative;
    flex-grow: 1;
    width: calc(100% + 30px);
    margin: ${common.sz20} -${common.sz15} 0;

    > .swiper-container {
      height: 100%;
    }
    .swiper-slide {
      padding: 0 ${common.sz15};
      background: ${common.bg_grey};
    }
  }
`;

const SearchCorpRightBtnGroup = styled('div')`
  height: ${common.sz60};
  margin-top: ${common.sz60};
  cursor: not-allowed;

  > button {
    height: 100%;
    cursor: ${common.cursor_click};
  }

  @media (min-width: ${breakpoint.desk1280}) and (max-height: ${breakpoint.height740}) {
    margin-top: ${common.sz40};
  }
  @media (max-width: ${breakpoint.mobile}) {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    margin-top: 0;
    padding: 0 15px;
    z-index: 10;
  }
`;
