import { useState } from 'react';
import {Map,MapMarker,CustomOverlayMap} from 'react-kakao-maps-sdk';
/*
작성일    :   2022/06/14
화면명    :   카카오 지도
회면ID    :   UI-USP-FRN-0420501
화면/개발 :   navycui
*/
type code = {
  lat:number,
  lng:number,
}
export const KakaoMaps:React.FC<{
  url:code,
  urls?:code[]
}> = (props) =>{

  return (
    // <CustomOverlayStyle>
      <Map
        center={props.url}
        draggable={true}
        zoomable={true}
        style={{ width: "100%", height: "405px" }}
      >
        <CustomOverlayMap           
          position={props.url}>
          <div className="label" style={{color: "#000"}}>
            <span className="left"></span>
            <span className="center">광주 AI 창업캠프</span>
            <span className="right"></span>
          </div>
        </CustomOverlayMap>
        <MapMarker position={props.url}></MapMarker>
      </Map>
  );
}
// const CustomOverlayStyle = styled(CustomOverlay)`
  
// `;
