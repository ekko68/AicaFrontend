import React, {
  CSSProperties,
  Fragment,
  useEffect,
  useState
} from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Radio,
  RadioGroup, Stack, SvgIcon, Chip, checkboxClasses, CircularProgress
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {Color} from "../components/StyleUtils";
import styled from '@emotion/styled';
import shadows from '@mui/material/styles/shadows';

export interface DefaultCheckBoxProps {
  label: string;
  disabled?: boolean;
  checked?: boolean;
  checkedEvent?: any;
  contents?: string;
  subContents?: string;
  essential?: boolean;
}

export const CustomButton: React.FC<{
  label: string;
  actionType?:boolean;
  variant?: "text" | "outlined" | "contained" | undefined
  type?: keyof typeof ButtonStyles;
  color?: keyof typeof ButtonColorStyles;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}> = (props) => {
  const buttonStyle = props.type
    ? ButtonStyles[props.type]
    : ButtonStyles.large;
  const buttonColorStyle = props.color
    ? ButtonColorStyles[props.color]
    : ButtonColorStyles.primary;
  return (
    <ButtonCustom
      onClick={props.onClick}
      type={props.actionType ? 'submit' : 'button'}
      variant={!!props.variant ? props.variant : 'outlined'}
      style={{
        minWidth: buttonStyle.width,
        width: buttonStyle.width,
        height: buttonStyle.height,
        backgroundColor: props.disabled
          ? Color.gray_sub_button
          : buttonColorStyle.bg,
        color: buttonColorStyle.fg,
        borderRadius: buttonStyle.br,
        border: buttonColorStyle.border,
        padding: '0 15px',
        fontWeight: '400',
        fontSize: buttonStyle.fs,
        ...props.style,
      }}
      disabled={props.disabled}
    >
      {props.label}
    </ButtonCustom>
  );
};

export const CustomLoadingButton: React.FC<{
  label: string;
  type?: keyof typeof ButtonStyles;
  color?: keyof typeof ButtonColorStyles;
  loadingSize?: number
  loadingColor?: string
  onClick?: (event: React.MouseEvent<HTMLElement>) => Promise<any>;
  disabled?: boolean;
  style?: React.CSSProperties;
}> = (props) => {
  const [loading, setLoading] = useState(false)
  const buttonStyle = props.type
    ? ButtonStyles[props.type]
    : ButtonStyles.large;
  const buttonColorStyle = props.color
    ? ButtonColorStyles[props.color]
    : ButtonColorStyles.primary;
  return (
    <Button
      onClick={async (e) => {
        try {
          if (props.onClick) {
            setLoading(true)
            await props.onClick(e)
          }
        }catch (e){
          setLoading(false)
        }
        setLoading(false)
      }}

      style={{
        minWidth: buttonStyle.width,
        width: buttonStyle.width,
        height: buttonStyle.height,
        backgroundColor: props.disabled
          ? Color.gray_sub_button
          : buttonColorStyle.bg,
        color: buttonColorStyle.fg,
        borderRadius: buttonStyle.br,
        border: buttonColorStyle.border,
        padding: '0 15px',
        fontWeight: '400',
        fontSize: buttonStyle.fs,
        ...props.style,
      }}
      disabled={props.disabled}
      endIcon={loading && <CircularProgress
        size={props.loadingSize || 25}
        sx={{color: props.loadingColor || buttonColorStyle.fg}}
      />}
    >
      {props.label}
    </Button>
  );
};

const ButtonStyles_old = {
  primary: {
    width: '200px',
    height: '60px',
    bg: Color.primary,
    fg: 'white',
    border: '',
    fs: '18px',
    br: '34px',
    letter: '-0.72px'
  },
  sub: {
    width: '200px',
    height: '60px',
    bg: Color.gray_sub_button,
    fg: 'white',
    border: '',
    fs: '18px',
    br: '24px',
    letter: '-0.72px'
  },
  line: {
    width: '200px',
    height: '60px',
    bg: Color.white,
    fg: Color.black,
    border: Color.black,
    fs: '18px',
    br: '24px',
    letter: '-0.72px'
  },
  listbtn: {
    width: '200px',
    height: '60px',
    bg: Color.white,
    fg: Color.black,
    border: '',
    fs: '18px',
    br: '24px',
    letter: '-0.72px'
  },
  // 탈퇴여부 팝업버튼
  popupbtn: {
    width: '170px',
    height: '48px',
    bg: Color.primary,
    fg: Color.white,
    border: '',
    fs: '14px',
    br: '24px',
    letter: '-0.56px'
  },
  popuplinebtn: {
    width: '170px',
    height: '48px',
    bg: Color.white,
    fg: Color.primary,
    border: '1px solid #4063ec',
    fs: '14px',
    br: '24px',
    letter: '-0.56px'
  },
};
export const ButtonComponents: React.FC<{
  label: string;
  type?: keyof typeof ButtonStyles_old;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
}> = (props) => {
  const style = props.type ? ButtonStyles_old[props.type] : ButtonStyles_old.primary;

  return (
    <Button
      onClick={props.onClick}
      style={{
        width: style.width,
        height: style.height,
        backgroundColor: style.bg,
        color: style.fg,
        border: style.border,
        minWidth: '65px',
        padding: '0 20px',
        fontWeight: '400',
        fontSize: style.fs,
        borderRadius: style.br,
        letterSpacing: style.letter,

      }}
      disabled={props.disabled}
    >
      {props.label}
    </Button>
  );
};

export const CustomRadioButtons: React.FC<{
  data: any[]
  defaultData?: string
  row?: boolean
  justifyContent?: 'center' | 'right' | 'left'
  style?: CSSProperties
  onClick?: (selected: string) => void
}> = (props) => {
  let initIndex = 0;
  if (props.defaultData)
    initIndex = props.data.findIndex(i => props.defaultData == i)
  const [value, setValue] = useState(props.data[initIndex > 0 ? initIndex : 0]);

  useEffect(() => {
    if (!!props.defaultData) {
      setValue(props.defaultData)
    }
  }, [props.defaultData])

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (props.onClick) props.onClick(event.target.value);
  };

  return (
    <FormControl>
      <RadioGroupStyle row={props.row} value={value} onChange={handlerChange}>
        {props.data.map((m, i) => {
          return (
            <FormControlLabel
              key={i}
              value={m.code}
              control={<RadioStyle />}
              label={m.codeNm}
            />
          );
        })}
      </RadioGroupStyle>
    </FormControl>
  );
};

export const CustomAgreementButtons: React.FC<{
  data: any[]
  defaultData?: string
  row?: boolean
  justifyContent?: 'center' | 'right' | 'left'
  style?: CSSProperties
  onClick?: (selected: string) => void
}> = (props) => {
  let initIndex = 0;
  if (props.defaultData)
    initIndex = props.data.findIndex(i => props.defaultData == i)
  const [value, setValue] = useState(props.data[initIndex > 0 ? initIndex : 0]);

  useEffect(() => {
    if (!!props.defaultData) {
      setValue(props.defaultData)
    }
  }, [props.defaultData])

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(props.defaultData!=="승인"){
      setValue(event.target.value);
    }
    if (props.onClick&&props.defaultData!=="승인") props.onClick(event.target.value);
  };

  return (
    <FormControl>
      <RadioGroupStyle row={props.row} value={value} onChange={handlerChange}>
        {props.data.map((m, i) => {
          return (
            <FormControlLabel
              key={i}
              value={m.code}
              control={<RadioStyle />}
              label={m.codeNm}
            />
          );
        })}
      </RadioGroupStyle>
    </FormControl>
  );
};

export const CustomCheckBoxs: React.FC<{
  checkbox: DefaultCheckBoxProps[];
  row?: boolean;
  justifyContent?: 'center' | 'right' | 'left';
  children?: React.ReactNode;
  style?: CSSProperties;
  onClick?: (selected: string[]) => void;
  mobile?: boolean
  width?: string
}> = (props) => {
  const [selected, setSelected] = useState<string[]>([]);
  useEffect(()=>{
    const update: any[] | ((prevState: string[]) => string[]) = [];
    props.checkbox.map((item:any)=>{
      if(item.checked===true){
        update.push(item.label);
      }
    })
    setSelected(update)
  },[props.checkbox])

  useEffect(() => {
    if (props.onClick) props.onClick(selected);
  }, [selected])

  const handlerCheck = (label: string) => {
    const selectedIndex = selected.indexOf(label);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, label);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected)
  };

  const Mobile = () => {
    return <Box sx={{
      display: 'inline-flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '100%'
    }}>
      {
        props.checkbox.map((m, i) => {
          return <CheckBoxMobile
            key={m.label}
            active={selected.includes(m.label)}
            width={props.width}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              handlerCheck(m.label)
            }}>{m.label}</CheckBoxMobile>
        })
      }
    </Box>
  }

  const Desktop = () => {
    return <FormControl>
      <FormGroup
        row={props.row}
        style={{
          justifyContent: props.justifyContent,
          ...props.style,
        }}
      >
        {
          props.checkbox.map((m, i) => {
            return <FormControlLabel
              key={i}
              style={{width: props.width}}
              control={
                <CheckboxStyle
                  {...m}
                  checked={selected.includes(m.label)}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    handlerCheck(m.label);
                  }}
                />
              }
              label={m.label}
            />
          })}
        {props.children}
      </FormGroup>
    </FormControl>
  }

  return <Fragment>
    {props.mobile ? <Mobile/> : <Desktop/>}
  </Fragment>
};

export const CustomIconButton: React.FC<{
  icon: () => React.ReactNode
  startText?: string
  endText?: string
  style?: React.CSSProperties;
  onClick?: () => void
}> = props => {
  return <IconButtonStyle
    onClick={props.onClick}
    style={props.style}
  >
    {props.startText}
    {props.icon()}
    {props.endText}
  </IconButtonStyle>
}

export const FileUpload: React.FC<{
  files: never[];
  label: string;
  id?: number;
  handleDelete: any;
  handleUpload: any;
  direction?: "row" | "column"
  isMobile?: boolean
}> = props => {
  const Input = styled('input')({
    display: 'none',
  });

  function onClickUpload() {
    let myInput: any = document.getElementById("contained-button-file" + props.id);
    myInput.click();
  }

  return (
    <Stack direction={props.direction} justifyContent="left" sx={{paddingY: '10px'}}>
      <Input hidden accept="*.*" id={"contained-button-file" + props.id} multiple type="file" onChange={(e) => {
        props.handleUpload(e)
      }}/>
      <CustomButton style={{borderRadius: "20px", marginLeft:'5px'}} label={props.label} type={'small'}
                    color={'outlined'}
                    onClick={onClickUpload}/>
      {!!props.files ? props.files.map((item: any, i: number) => (
        <Chip sx={{padding: "19px 0px",marginY:props.isMobile? '10px' : '0px',marginLeft:props.isMobile? '0px' : '10px', borderRadius: "20px", width: props.isMobile ? "200px" : "auto"}}
              key={props.id} variant="outlined" label={item.name} onDelete={() => props.handleDelete(i)}
              deleteIcon={<DeletIcon/>}/>
      )) : null}
    </Stack>
  );
}

export const DeletIcon: React.FC<{}> = (props) => {
  return (
    <SvgIcon {...props}>
      <svg id="icon_X" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        <rect id="사각형_2664" data-name="사각형 2664" width="20" height="20" fill="#c5c7cf" opacity="0"/>
        <rect id="사각형_2665" data-name="사각형 2665" width="2" height="16" rx="1"
              transform="translate(4 5.414) rotate(-45)" fill="#ccc"/>
        <rect id="사각형_2666" data-name="사각형 2666" width="2" height="16" rx="1"
              transform="translate(15.314 4) rotate(45)" fill="#ccc"/>
      </svg>
    </SvgIcon>
  );
}

const ButtonStyles = {
  //버튼의 크기관련 요소
  large: {
    width:'200px',
    height: '56px',
    br: 0,
    fs: '18px'
  },
  largeList: {
    width:'100px',
    height: '56px',
    br: 0,
    fs: '16px'
  },
  small: {
    width: 'auto',
    height: '40px',
    br: 5,
    fs: '14px'
  },
  full: {
    width: '100%',
    height: '48px',
    br: 30,
    fs: '15px'
  },
  fullLg: {
    width: '100%',
    height: '60',
    br: 30,
    fs: '18px'
  },
  listBack: {
    width: '140px',
    height: '60px',
    br: 30,
    fs: '18px'
  },
  frontNomal: {
    width: '200px',
    height: '60px',
    br: 30,
    fs: '18px'
  },
  wauto: {
    width: 'auto',
    height: '60px',
    br: 30,
    fs: '18px'
  },
  fileBtn: {
    width: '100px',
    height: '48px',
    br: 30,
    fs: '14px'
  },
  largeListBorder: {
    width: '100px',
    height: '56px',
    br: 30,
    fs: '16px'
  },
  modalBtn: {
    width: '140px',
    height: '48px',
    br: 30,
    fs: '14px'
  },
  modalBtn2: {
    width: '100px',
    height: '48px',
    br: 30,
    fs: '14px'
  },
  formbtn: {
    width: '220px',
    height: '60px',
    br: 30,
    fs: '18px'
  },
  time:{
    width: '140px',
    height: '50px',
    br: 5,
    fs: '16px'
  },
  modify:{
    width: 'auto',
    height: '48px',
    br: 30,
    fs: '16px'
  }

}

const ButtonColorStyles = {
  //버튼의 색상관련 요소
  primary: {
    fg: Color.white,
    bg: Color.primary,
    border: 'none',
    '&:hover' : {
      boxShadow: '3px 3px 8px 0 rgba(64, 99, 236, 0.44)',
    }
  },
  secondary: {
    fg: Color.white,
    bg: Color.secondary,
    border: 'none',
  },
  outlined: {
    border: '1px solid' + Color.primary,
    fg: Color.primary,
    bg: Color.white,
  },
  outlinedblack: {
    fg: Color.black,
    bg: Color.white,
    border: '1px solid' + Color.black,
  },
  outlinedgray: {
    fg: Color.black,
    bg: Color.white,
    border: '1px solid' + Color.gray,
  },
  outlinedgwhite: {
    fg: Color.white,
    bg: "none",
    border: '1px solid' + Color.white,
  },
  outlinedgdark: {
    fg: Color.white,
    bg: Color.darkBg,
    border: '1px solid' + Color.white,
  },
  list: {
    fg: Color.primary,
    bg: Color.list,
    border: 'none',
  },
  item: {
    fg: Color.brownish_gray,
    bg: Color.light_gray02,
    border: 'none',
  },
  disabled: {
    fg: Color.warm_gray,
    bg: Color.light_gray02,
    border: '1px solid' + Color.line
  }
}

const ButtonCustom = styled(Button)`
  /* &:hover {
    box-shadow: ${props => props.color !== 'primary' ? '3px 3px 8px 0 rgba(64, 99, 236, 0.44)' : '3px 3px 8px 0 rgba(0, 0, 0, 0.1)'};
  } */
`

const IconButtonStyle = styled(IconButton)`
  border-radius: 10px;
`

const RadioGroupStyle = styled(RadioGroup)`
  .MuiFormControlLabel-root{
    margin-left: 0;
    margin-right: 50px;
  }
  
  @media (min-width: 320px) and (max-width: 850px) {
    justify-content: flex-start;
    .MuiTypography-root{font-size: 14px;}
    .MuiFormControlLabel-root{
      margin-right: 20px;
    }
  }
`;

const RadioStyle = styled(Radio)`
  padding: 0;
  .MuiSvgIcon-root {
    width: 20px;
    height: 20px;
    border: 1px solid #ccc;
    margin-right: 6px;
    border-radius: 100%;
    path {
      display: none;
    }
  }
  &.Mui-checked {
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 10px;
      height: 10px;
      margin: -5px 0 0 -8px;
      border-radius: 100%;
      background-color: #4063ec;
    }
    .MuiSvgIcon-root {
      position: relative;
      border-color: #4063ec;
      &[data-testid='RadioButtonCheckedIcon'] {
        display: none;
      }
    }
  }
`;

const CheckBoxMobile = styled(Button)<{ active: boolean, width?: string }>`
  display: flex;
  margin: 8px 0;
  width: ${props => props.width ? props.width : '120px'};
  color: ${props => props.active ? Color.white : Color.warm_gray};
  background-color: ${props => props.active ? Color.primary : Color.white};
  border: ${props => props.active ? 'none' : `1px solid ${Color.warm_gray}`};
  height: 48px;
  border-radius: 24px;

  &:hover {
    background-color: ${props => props.active ? Color.primary : Color.white};
  }
`

const CheckboxStyle = styled(Checkbox)`
  padding: 0;
  &.MuiCheckbox-root{
    padding: 0;
    margin-right: 10px;
    margin-left: 11px;
  }
  .MuiSvgIcon-root {
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 4px;
    path {
      display: none;
    }
  }

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border-radius: 3px;
    border: 1px solid #ccc;
  }
  &.Mui-checked {
    &:before {
      border: none;
      background-color: #4063ec;
      background:  url('/images/common/checkbox_active.png');
    }
    .MuiSvgIcon-root{
      background: none;
    }
  }
`;