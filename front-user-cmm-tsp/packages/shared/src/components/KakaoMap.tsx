// import { useState } from 'react';
import {Map,MapMarker} from 'react-kakao-maps-sdk';
/* 
작성일    :   2022/06/14
화면명    :   카카오 지도
회면ID    :   UI-USP-FRN-0420501
화면/개발 :   navycui
*/
type coord = {
  lat:number,
  lng:number,
}
export const KakaoMaps:React.FC<{
  position:coord
  title?: string
}> = (props) =>{

  return (
    <Map
      center={props.position}
      draggable={false}
      zoomable={false}
      style={{ width: "100%", height: "405px", zIndex: 0 }}
    >
      <MapMarker position={props.position}>
        <div style={{color:"#000"}}>{props.title}</div>
      </MapMarker>
    </Map>
  );
}

