import React, {CSSProperties, useEffect, useState} from 'react';
import {Button, Checkbox, FormControlLabel, FormGroup, IconButton, Radio, RadioGroup} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {Color} from "../../../shared/src/components/StyleUtils";
import styled from '@emotion/styled';
import {Icons} from "../../../shared/src/components/IconContainer";

export interface DefaultCheckBoxProps {
  label: string;
  disabled?: boolean;
  checked?: boolean;
}

const ButtonStyles = {
  //버튼의 크기관련 요소
  large: {
    width:'200px',
    height: '56px',
    br: 0,
  },
  largeList: {
    width:'100px',
    height: '56px',
    br: 0,
  },
  small: {
    width: 'auto',
    height: '40px',
    br: 5,
  },
};
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
  list: {
    fg: Color.primary,
    bg: Color.list,
    border: 'none',
  },
  item: {
    fg: Color.brownishGrey,
    bg: Color.light_gray,
    border: 'none',
  },
};

export const CustomButton: React.FC<{
  label: string;
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
        margin: '5px',
        padding: '0 15px',
        fontWeight: 'bold',
        fontSize: '16px',
        ...props.style,
      }}
      disabled={props.disabled}
    >
      {props.label}
    </Button>
  );
};

export const CustomRadioButtons: React.FC<{
  data: string[];
  row?: boolean;
  justifyContent?: 'center' | 'right' | 'left';
  style?: CSSProperties;
  onClick?: (selected: string) => void;
}> = (props) => {
  const [value, setValue] = useState(props.data[0]);

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    if (props.onClick) props.onClick(value);
  };

  return (
    <FormControl>
      <RadioGroup row={props.row} value={value} onChange={handlerChange}>
        {props.data.map((m, i) => {
          return (
            <FormControlLabel
              key={i}
              value={m}
              control={<RadioStyle />}
              label={m}
            />
          );
        })}
      </RadioGroup>
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
}> = (props) => {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (props.onClick) props.onClick(selected);
  }, [selected]);

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
        {props.checkbox.map((m, i) => {
          return (
            <FormControlLabel
              key={i}
              control={
                <CheckboxStyle
                  {...m}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    handlerCheck(m.label);
                  }}
                />
              }
              label={m.label}
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
const IconButtonStyle = styled(IconButton)`
  border-radius:10px;
`

const RadioStyle = styled(Radio)`
  .MuiSvgIcon-root {
    width: 20px;
    height: 20px;
    border: 1px solid #d8dbe7;
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
      margin: -5px 0 0 -5px;
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

const CheckboxStyle = styled(Checkbox)`
  .MuiSvgIcon-root {
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 3px;
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
    border: 1px solid #d8dbe7;
    border-radius: 3px;
  }
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 10px;
    height: 6px;
    margin: -4px 0 0 -5px;
    border-left: 2px solid #d8dbe7;
    border-bottom: 2px solid #d8dbe7;
    transform: rotate(-45deg);
  }
  &.Mui-checked {
    &:before {
      border-color: #4063ec;
      background-color: #4063ec;
    }
    &:after {
      border-color: #fff;
    }
  }
`;
