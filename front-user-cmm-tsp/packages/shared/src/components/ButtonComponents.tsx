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
  RadioGroup, Stack, SvgIcon, Chip
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {Color} from "../components/StyleUtils";
import styled from '@emotion/styled';
import {Body3, Body4} from "../components/TextComponents";
import {useGlobalConfigStore} from "../store/GlobalConfigStore";

export interface DefaultCheckBoxProps {
  label: string;
  disabled?: boolean;
  checked?: boolean;
  checkedEvent?: any;
  content?: string;
  subContents?: string;
  essential?: boolean;
}

export const CustomButton: React.FC<{
  label:  React.ReactNode;
  actionType?: boolean;
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
    <Button
      onClick={props.onClick}
      type={props.actionType ? 'submit' : 'button'}
      style={{
        minWidth: '65px',
        width: buttonStyle.width,
        height: buttonStyle.height,
        backgroundColor: props.disabled
          ? Color.gray_sub_button
          : buttonColorStyle.bg,
        color: buttonColorStyle.fg,
        borderRadius: buttonStyle.br,
        border: buttonColorStyle.border,
        padding: '0 15px',
        fontWeight: '300',
        letterSpacing: '-0.6px',
        fontSize: buttonStyle.fs,
        // '&:hover': {
        //   backgroundColor: props.disabled
        //     ? Color.gray_sub_button
        //     : buttonColorStyle.bg,
        // },
        ...props.style,
      }}
      disabled={props.disabled}
    >
      {props.label}
    </Button>
  );
};

export const CustomRadioButtons: React.FC<{
  data: string[]
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
      <RadioGroup row={props.row} value={value} onChange={handlerChange}>
        {props.data.map((m, i) => {
          return (
            <FormControlLabel
              key={i}
              value={m}
              control={<RadioStyle/>}
              label={<Body3>{m}</Body3>}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export const CustomCheckBoxs: React.FC<{
  checkbox: DefaultCheckBoxProps[];
  initValue?: string[];
  allCheck?: boolean;
  row?: boolean;
  justifyContent?: 'center' | 'right' | 'left';
  children?: React.ReactNode;
  style?: CSSProperties;
  onClick?: (selected: string[]) => void;
  mobile?: boolean
  width?: string
}> = (props) => {
  const [selected, setSelected] = useState<string[]>(props.initValue ? props.initValue : []);

  useEffect(() => {
    if (props.onClick) props.onClick(selected);
  }, [selected])

  const AllCheckVari = (currentSelected: string, newSelected: string[]) => {
    let allSelected: string[] = props.checkbox.map(m => m.label).concat('전체')

    if (currentSelected == '전체') {
      if (newSelected.includes('전체')) {
        return allSelected
      }
      return []
    }
    return newSelected.filter(f => f != '전체')
  }

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

    if (props.allCheck) newSelected = AllCheckVari(label, newSelected);

    setSelected(newSelected)
  };

  const CheckBox = () => {
    if (props.allCheck) return [{label: '전체'}].concat(props.checkbox)

    return props.checkbox
  }

  const Mobile = () => {
    return <Box sx={{
      display: 'inline-flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '100%'
    }}>
      {
        CheckBox().map((m, i) => {
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
          CheckBox().map((m, i) => {
            return <FormControlLabel
              key={i}
              style={{width: m.label == '전체' ? '100%' : props.width, margin:'5px 0px'}}
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

export const CustomCheckBoxes: React.FC<{
  checkbox: string[]
  defaultSelected?: string[]
  isAll?: boolean
  row?: boolean
  justifyContent?: 'center' | 'right' | 'left'
  children?: React.ReactNode
  style?: CSSProperties
  onClick?: (selected: string[]) => void;
}> = (props) => {
  const [selected, setSelected] = useState<string[]>(props.defaultSelected? props.defaultSelected : []);

  useEffect(() => {
    if (props.defaultSelected) setSelected(props.defaultSelected)
  }, [props.defaultSelected])

  useEffect(() => {
    if (props.onClick) props.onClick(selected);
  }, [selected]);

  useEffect(() => {
    if (props.isAll != undefined) {
      if (props.isAll) {
        setSelected(props.checkbox)
      } else if (!props.isAll && selected.length == props.checkbox.length){
        setSelected([])
      }
    }
  }, [props.isAll])

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
    setSelected(newSelected);
  };

  return (
    <FormControl>
      <FormGroup
        row={props.row}
        style={{
          justifyContent: props.justifyContent,
          ...props.style,
        }}
      >
        {
          props.checkbox.map((m, i) => {
            return (
              <FormControlLabel
                key={i}
                control={
                  <CheckboxStyle
                    checked={selected.includes(m)}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      handlerCheck(m);
                    }}
                  />
                }
                label={m}
              />
            );
          })}
        {props.children}
      </FormGroup>
    </FormControl>
  );
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
  label: string | React.ReactNode;
  id?: number;
  handleDelete: any;
  handleUpload: any;
  direction?: "row" | "column"
  isMobile?: boolean
  buttonStyle?: React.CSSProperties
  chipStyle?: React.CSSProperties
}> = props => {
  const Input = styled('input')({
    display: 'none',
  });

  function onClickUpload() {
    let myInput: any = document.getElementById("contained-button-file" + props.id);
    myInput.click();
  }

  return (
    <Stack direction={props.direction} justifyContent="left">
      <Input hidden accept="*.*" id={"contained-button-file" + props.id} multiple type="file" onChange={(e) => {
        props.handleUpload(e)
      }}/>
      <CustomButton style={{borderRadius: "24px",margin:'5px 0', minWidth: '110px', maxWidth:'110px', height:'48px',...props.buttonStyle}} label={props.label} type={'small'}
                    color={'outlined'}
                    onClick={onClickUpload}/>
      <div>
        {!!props.files ? props.files.map((item: any, i: number) => (
          <Chip sx={{padding: "24px", borderRadius: "24px",margin:'5px 0', width: 'auto', height:'48px', fontSize:'14px', marginLeft:'10px', ...props.chipStyle}}
                key={props.id} variant="outlined" label={<Body4>{item.name}</Body4>} onDelete={() => props.handleDelete(i)}
                deleteIcon={<DeletIcon/>}/>
        )) : null}
      </div>
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
  large2: {
    width: '200px',
    height: '56px',
    br: 0,
    fs: '16px'
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
    height: '50px',
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
    br: 24,
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
    bg: "",
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

const IconButtonStyle = styled(IconButton)`
  border-radius: 10px;
`

const RadioStyle = styled(Radio)`
  margin-left: 3px;

  .MuiSvgIcon-root {
    width: 20px;
    height: 20px;
    border: 1px solid #ccc;
    border-radius: 100%;
    margin-right: 6px;
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

export const CheckBoxMobile = styled(Button)<{ active: boolean, width?: string }>`
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

export const CheckboxStyle = styled(Checkbox)`
  &.MuiCheckbox-root {
    padding: 0;
    margin-right: 10px;
    margin-left: 11px;
  }
  
  .MuiSvgIcon-root {
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 4px;
    margin-right: 6px;
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
    margin: -5px 0 0 -8px;
    border-radius: 3px;
    border: 1px solid #ccc;
  }

  &.Mui-checked {
    &:before {
      border: none;
      background-color: #4063ec;
      background:  url('/images/common/checkbox_active.png');
    }
  }
`;
