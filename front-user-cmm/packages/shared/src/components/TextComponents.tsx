import React, {CSSProperties} from 'react'
import styled from "@emotion/styled";
import {useGlobalConfigStore} from "../store/GlobalConfigStore";
import {Color} from "../components/StyleUtils";

type TextProps = {
  bold?: boolean
  weight?: number
  color?: string
  underline?: boolean
  preLine?: boolean
  ellipsis?: boolean
  nowrap?: boolean
  overflow?: 'hidden' | 'auto'
  className?: string
  listItem?: boolean

  // align
  center?: boolean
  right?: boolean

  lineClamp?: number

  style?: CSSProperties
}

const TextStyles = {
  h1: {
    "desktop": {fontSize: 48, letterSpacing: -1.92, lineHeight: 70},
    "mobile": {fontSize: 28, letterSpacing: -1.12, lineHeight: 40}
  },
  h2: {
    "desktop": {fontSize: 28, letterSpacing: -1.12, lineHeight: 44},
    "mobile": {fontSize: 24, letterSpacing: -0.96, lineHeight: 36}
  },
  h3: {
    "desktop": {fontSize: 24, letterSpacing: -0.96, lineHeight: 36},
    "mobile": {fontSize: 20, letterSpacing: -0.8, lineHeight: 32}
  },
  h4: {
    "desktop": {fontSize: 20, letterSpacing: -0.85, lineHeight: 32},
    "mobile": {fontSize: 16, letterSpacing: -0.64, lineHeight: 28}
  },
  body1: {
    "desktop": {fontSize: 20, letterSpacing: -0.8, lineHeight: 32},
    "mobile": {fontSize: 18, letterSpacing: -0.72, lineHeight: 30}
  },
  body2: {
    "desktop": {fontSize: 18, letterSpacing: -0.72, lineHeight: 30},
    "mobile": {fontSize: 16, letterSpacing: -0.64, lineHeight: 28}
  },
  body3: {
    "desktop": {fontSize: 16, letterSpacing: -0.64, lineHeight: 28},
    "mobile": {fontSize: 14, letterSpacing: -0.56, lineHeight: 26}
  },
  body4: {
    "desktop": {fontSize: 14, letterSpacing: -0.56, lineHeight: 26},
    "mobile": {fontSize: 13, letterSpacing: -0.52, lineHeight: 23}
  },
  body5: {
    "desktop": {fontSize: 18, letterSpacing: -0.72, lineHeight: 30},
    "mobile": {fontSize: 14, letterSpacing: -0.56, lineHeight: 26}
  }
}

const BuildTextStyle: React.FC<TextProps & { type: keyof typeof TextStyles }> = props => {
  const {isDesktop} = useGlobalConfigStore()
  const style = isDesktop ? TextStyles[props.type].desktop : TextStyles[props.type].mobile
  // const View = Text(style.fontSize, style.letterSpacing, style.lineHeight)

  // return <View {...props}>
  //   {props.children}
  // </View>

  return <Text
    fontSize={style.fontSize}
    letterSpacing={style.letterSpacing}
    lineHeight={style.lineHeight}
    {...props}
  >
    {props.children}
  </Text>
}

export const H1: React.FC<TextProps> = props => <BuildTextStyle type={"h1"} {...props}/>
export const H2: React.FC<TextProps> = props => <BuildTextStyle type={"h2"} {...props}/>
export const H3: React.FC<TextProps> = props => <BuildTextStyle type={"h3"} {...props}/>

export const Body1: React.FC<TextProps> = props => <BuildTextStyle type={"body1"} {...props}/>
export const Body2: React.FC<TextProps> = props => <BuildTextStyle type={"body2"} {...props}/>
export const Body3: React.FC<TextProps> = props => <BuildTextStyle type={"body3"} {...props}/>
export const Body4: React.FC<TextProps> = props => <BuildTextStyle type={"body4"} {...props}/>


const Text = styled("span")<TextProps & {fontSize: number, letterSpacing: number, lineHeight: number}>`
  display: ${props => props.lineClamp? '-webkit-box' : props.listItem? 'list-item' : 'unset'};
  font-size: ${props => props.fontSize}px;
  white-space: ${props => props.preLine? 'pre-line' : props.nowrap? 'nowrap' : 'normal'};
  font-weight: ${props => props.weight? props.weight
          : props.bold ? 700 : 400};
  font-stretch: normal;
  font-style: normal;
  line-height: ${props => props.lineHeight}px;
  letter-spacing: ${props => props.letterSpacing}px;
  text-decoration: ${props=> props.underline? 'underline' : 'none'};
  text-align: ${props => props.center ? 'center'
          : props.right ? 'right' : 'left'};
  color: ${props => props.color || '#222222'};
  
  text-overflow: ${props => props.ellipsis? 'ellipsis' : 'unset'};
  overflow: ${props => props.overflow || 'unset'};

  -webkit-line-clamp: ${props => props.lineClamp || 1};
  -webkit-box-orient: ${props => props.lineClamp? 'vertical' : 'unset'};
  
  margin-left: ${props => props.listItem? `${props.fontSize * 0.5}px` : '0'};
  font-family: 'Noto Sans CJK KR','Roboto' !important;
  
  ::marker{
    content: "•";
    font-size: ${props => props.fontSize}px;
    color: ${Color.warm_gray};
  }
`