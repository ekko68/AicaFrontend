import { SvgIcon } from '@mui/material';
import React from 'react';

//달력 아이콘
export const DateIcon: React.FC<{
}> = (props) => {
  return (
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24">  
    <image id="image0" width="24" height="24" x="0" y="-1px"
      href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
      AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAIVBMVEVHcEwAAAAsLCwzMzMi
      IiK7u7v///+fsPVGZ+2Tp/RXdu665jJpAAAABHRSTlMACsP2Cg0w6AAAAAFiS0dEBmFmuH0AAAAH
      dElNRQfmBRIIDzJ/ZV6sAAAAUklEQVQY02NgwAdY4ASDkAsUOAkwMKimpaQBQUpaqgIDg1saDDig
      cUxgelwM8ClD41RMS+8EEhBOx7KMLiAB4cwoy2wHEjQ2QBXGBnkOxdtIAAClNlGhx2tjbwAAACV0
      RVh0ZGF0ZTpjcmVhdGUAMjAyMi0wNS0xOFQwODoxNTo1MCswMDowMN23v0kAAAAldEVYdGRhdGU6
      bW9kaWZ5ADIwMjItMDUtMThUMDg6MTU6NTArMDA6MDCs6gf1AAAAAElFTkSuQmCC" />
  </svg>
  );
}
//달력 아이콘
export const DeletIcon: React.FC<{
}> = (props) => {
  return (
    <SvgIcon {...props}>
      <svg id="icon_X" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        <rect id="사각형_2664" data-name="사각형 2664" width="20" height="20" fill="#c5c7cf" opacity="0"/>
        <rect id="사각형_2665" data-name="사각형 2665" width="2" height="16" rx="1" transform="translate(4 5.414) rotate(-45)" fill="#ccc"/>
        <rect id="사각형_2666" data-name="사각형 2666" width="2" height="16" rx="1" transform="translate(15.314 4) rotate(45)" fill="#ccc"/>
      </svg>
    </SvgIcon>
  );
}

//select 아이콘
export const SelectIcon: React.FC<{
}> = (props) => {
  return (
    <SvgIcon {...props}>
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="5px" y="9px" width="13px" height="8px" viewBox="0 0 13 8" enableBackground="new 0 0 13 8">  
        <image id="image0" width="13" height="8" x="0" y="0"
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAICAQAAACIL71EAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
        AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElN
        RQfmBgoCAAoPZXqLAAAAaElEQVQI11XOQRWAIBRE0QcJaCIRtIENJMK3gTb4FUhgBLSBNiGCCwVx
        VnPmbsaIZ2LVTJNnswSEJO4HCSFYFi78h+JJOKKqAXHsdJwMmisEMNDgzFbgpYpAgUoVD+3LYkvR
        TE9k/J7efMEja90L+oYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDYtMTBUMDI6MDA6MDcrMDA6
        MDCdTeTnAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA2LTEwVDAyOjAwOjA3KzAwOjAw7BBcWwAA
        AABJRU5ErkJggg==" />
      </svg>
    </SvgIcon>
  );
}

//trash 아이콘
export const TrashIcon: React.FC<{
}> = (props) => {
  return (
    <img src="/images/common/icon_trash.png" />
  );
}

//plus 아이콘
export const PlusIcon: React.FC<{
}> = (props) => {
  return (
    <img src="/images/common/icon_plus.png" />
  );
}

//Question 아이콘
export const QuestionIcon: React.FC<{
}> = (props) => {
  return (
    <span className='icon_question'></span>
  );
}
