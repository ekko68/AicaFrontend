// 공고/접수/ ->  선정결과공고관리 페이지
import React from "react"
import ReactPlayer from 'react-player/lazy'
import { BlockContents } from 'shared/components/LayoutComponents';
import { CustomIconButton } from 'shared/components/ButtonComponents';
import { Slider  } from '@mui/material';
import { Icons } from 'shared/components/IconContainer';
//import styled from '@emotion/styled';
interface MoviePlayerProps {
  url : string;
}
function MoviePlayer(props:MoviePlayerProps){
  const {url} = props;
  return(
    <>
      <div className="moviePlayer">
        {/*<ReactPlayer*/}
        {/*    url={url}    // 플레이어 url*/}
        {/*    width='100%'         // 플레이어 크기 (가로)*/}
        {/*    height='100%'        // 플레이어 크기 (세로)*/}
        {/*    playing={false}      // 자동 재생 on*/}
        {/*    muted={true}         // 자동 재생 on*/}
        {/*    controls={false}     // 플레이어 컨트롤 노출 여부*/}
        {/*    light={false}        // 플레이어 모드*/}
        {/*/>*/}
        <div className="btn_play">
          <CustomIconButton icon={Icons.PlayLg} />
        </div>
        <div className="control">
          <div className="time_status">
          00:01 / 02:30
          </div>
          <Slider
            className="progress"
            aria-label="Progress"
            defaultValue={50}
          />
          <div className="buttons">
            <CustomIconButton icon={Icons.PlaySm} />
            {/* <CustomIconButton icon={Icons.Pause} /> */}
            <div className="volume">
              <CustomIconButton icon={Icons.Speaker} />
              {/* <CustomIconButton icon={Icons.Mute} /> */}
              <div className="slider show">{/* slider에 show로 제어하세요. */}
                <Slider
                  aria-label="Volume"
                  defaultValue={50}
                />
              </div>
            </div>
            <div className="fs">
              <CustomIconButton icon={Icons.Fullscreen}  />
              {/* <CustomIconButton icon={Icons.Backscreen}  /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
function SelResAmtMgt() {

  return (
    <div className="main-container">
      <div className="minWidth">
        <BlockContents 
          title={'공모전 관리 상세'}
          rightContent={
            <div className="rightContent">홈 &gt; 메뉴명 &gt; 화면명</div>
          }
        ></BlockContents>
        <div className='tableDefault onlyBottomLine'>
          <div className='table_header'></div>
          <table>
            <colgroup>
              <col style={{width:'12%'}} />
              <col style={{width:'38%'}} />
              <col style={{width:'12%'}} />
              <col style={{width:'38%'}} />
            </colgroup>
            <tbody>
            <tr>
              <th>제목</th>
              <td>공모전1</td>
              <th>동영상 파일</th>
              <td>공모전 동영상.mp4</td>
            </tr>
            <tr>
              <td colSpan={4}>
                <MoviePlayer url={'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'} />
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SelResAmtMgt;
