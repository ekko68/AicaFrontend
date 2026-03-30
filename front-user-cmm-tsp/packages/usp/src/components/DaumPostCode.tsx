import React, { useState } from 'react';
import DaumPostCode from 'react-daum-postcode';

/* 
  작성일    :   2022/06/14
  화면명    :   Daum 우편번호 서비스
  회면ID    :   UI-USP-FRN-0060101
  화면/개발 :   navycui
*/
export const DaumPost: React.FC<{ 
    
}> = (props) => {
    const handleComplete = (data:any) => {
        let fullAddress = data.address;
        let extraAddress = '';
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        //fullAddress -> 전체 주소반환
    }
    return (<DaumPostCode onComplete={handleComplete} className="post-code" />);
}
