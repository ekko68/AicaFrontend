import {Stack} from "@mui/material";
import {BannerContents} from "shared/components/BannerContents";
import {VerticalInterval} from "shared/components/LayoutComponents";
import {KakaoMaps} from "shared/components/KakaoMap";
import styled from "@emotion/styled";
import {Body1, Body3} from "shared/components/TextComponents";
import {Color} from "shared/components/StyleUtils";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";

const AboutMap = () => {
  const {isDesktop} = useGlobalConfigStore();
  return <BannerContents title={"오시는 길"} subTitle={'AICA 실증센터 오시는 길을 안내 드립니다.'}>
    <Stack width={'100%'} style={{marginBottom: '120px'}}>
      <VerticalInterval size={isDesktop ? '60px' : '40px'}/>
      <h2 style={{fontWeight:'bold'}}>오시는 길</h2>
      <VerticalInterval size={'20px'}/>
      <Stack>
        <Body1 bold style={{fontSize: isDesktop? '20px' : '16px'}}>{'Ai 자동차 실증센터'}</Body1>
        <VerticalInterval size={isDesktop ? '30px' : '24px'}/>
        <Body3 weight={500}>주소</Body3>
        <VerticalInterval size={isDesktop ? '10px' : '6px'}/>
        <Body3 color={Color.warm_gray}>광주그린카진흥원 기술지원동 (주소: 광주광역시 광산구 삼거동 509)</Body3>
        <MapDiv>
          <KakaoMaps position={{lat:35.168668,lng:126.676409}} title={"광주그린카진흥원"}/>
        </MapDiv>
      </Stack>

      <VerticalInterval size={'40px'}/>
      <Stack>
        <Body1 bold style={{fontSize: isDesktop? '20px' : '16px'}}>{'Ai 에너지 실증센터'}</Body1>
        <VerticalInterval size={isDesktop ? '30px' : '24px'}/>
        <Body3 weight={500}>주소</Body3>
        <VerticalInterval size={isDesktop ? '10px' : '6px'}/>
        <Body3 color={Color.warm_gray}>한국광기술원 연구원, 실험동 (주소:광주광역시 북구 월출동 971-35)</Body3>
        <MapDiv>
          <KakaoMaps position={{lat:35.231864,lng:126.860485}} title={"한국광기술원"}/>
        </MapDiv>
      </Stack>

      <VerticalInterval size={'40px'}/>
      <Stack>
        <Body1 bold style={{fontSize: isDesktop? '20px' : '16px'}}>{'Ai 헬스케어 실증센터'}</Body1>
        <VerticalInterval size={isDesktop ? '30px' : '24px'}/>
        <Body3 weight={500}>주소</Body3>
        <VerticalInterval size={isDesktop ? '10px' : '6px'}/>
        <Body3 color={Color.warm_gray}>빛고을노인건강타운 복지관 (주소:광주광역시 남구 덕남길 7)</Body3>
        <MapDiv>
          <KakaoMaps position={{lat:35.099938,lng:126.896946}} title={"빛고을노인건강타운"}/>
        </MapDiv>
      </Stack>
    </Stack>
  </BannerContents>
}

const MapDiv = styled('div')`
  min-height: 400px;
  margin-top: 40px;
  background-color: #f5f5f5;
`

export default AboutMap