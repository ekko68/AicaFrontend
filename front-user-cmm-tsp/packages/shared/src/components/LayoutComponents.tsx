import React, {CSSProperties, useEffect, useLayoutEffect, useState} from 'react'
import Box from '@mui/material/Box';
import {
  FormControlLabel,
  FormGroup,
  InputLabel,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tab,
  TextField,
} from '@mui/material';
import {Color} from '../components/StyleUtils';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styled from '@emotion/styled';
import {TabContext, TabList} from "@mui/lab";
import MUIPagination from "@mui/material/Pagination";
import {DefaultCheckBoxProps} from "../components/ButtonComponents";
import TableContainer from "@mui/material/TableContainer";
import {CheckboxStyle} from "../components/TableComponents";
import {Body2, Body3, Body4} from "../components/TextComponents";
import Typography from "@mui/material/Typography";
import {useGlobalConfigStore} from "../store/GlobalConfigStore";

export const VerticalInterval: React.FC<{
  size: number | string;
}> = (props) => <div style={{marginTop: props.size}}/>;

export const HorizontalInterval: React.FC<{
  size: number | string;
}> = (props) => <div style={{marginLeft: props.size}}/>;

export const BlockContents: React.FC<{
  children?: any,
  title?: string;
  title_sub?: string;
  maxHeight?: string;
  rightContent?: React.ReactNode;
}> = (props) => {
  return (
    <Box>
      <Stack
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        marginRight={'30px'}
      >
        {props.title && (
          <h2 style={{margin: '60px 0 20px 0', fontSize: '1.625rem'}}>
            {props.title}
          </h2>
        )}
        {props.title_sub && (
          <div
            style={{
              margin: '16px 30px',
              fontSize: '1.25rem',
              fontWeight: 'bold',
            }}
          >
            {props.title_sub}
          </div>
        )}
        {props.rightContent}
      </Stack>
      <Box
        style={{
          maxHeight: props.maxHeight || '300px',
          overflow: 'auto',
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export const CustomTabs: React.FC<{
  children?: any;
  tabs: string[];
  onClick?: (newValue: string) => void;
}> = (props) => {
  const [value, setValue] = useState<string>(props.tabs[0]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (props.onClick) props.onClick(newValue);

    setValue(newValue);
  };

  return (
    <Box sx={{width: '100%', typography: 'body1'}}>
      <TabContext value={value}>
        <Box sx={{borderBottom: 1, borderColor: Color.primary}}>
          <TabList onChange={handleChange} variant={'scrollable'}>
            {props.tabs.map((m, i) => {
              return <TabContainer key={i} label={m} value={m}/>;
            })}
          </TabList>
        </Box>
      </TabContext>
    </Box>
  );
}

const TabContainer = styled(Tab)({
  // border: '1px solid #a7aec9',
  background: Color.line,
  color: Color.warm_gray,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  marginRight: '1px',
  fontSize: '16px',

  '&.Mui-selected': {
    background: Color.white,
    color: Color.black,
    '&.tabBlack': {
      background: Color.black,
      color: Color.white,
    }
  },
});

export const Pagination: React.FC<{
  curPage: number;
  totalPage: number;
  rowsPerPage: number;
  handleChangeRowsPerPage: (event: any) => void;
  handleChangePage: (event: unknown, newPage: number) => void;
  style?: React.CSSProperties;
}> = (props) => {

  return <Box style={props.style}>
    <Box
      sx={{display: 'flex', color: '#666'}}
      justifyContent={'right'}
      alignItems={'center'}
    >
      <InputLabel
        variant='standard'
        htmlFor='uncontrolled-native'
        sx={{pr: 2}}
      >
        Page {props.curPage + 1} / {props.totalPage}
      </InputLabel>
      <FormControl variant='standard'>
        <SelectStyle
          className='select'
          value={props.rowsPerPage}
          onChange={props.handleChangeRowsPerPage}
        >
          {[5, 10, 15].map((v: any) => (
            <MenuItem key={v} value={v}>
              {v}개씩
            </MenuItem>
          ))}
        </SelectStyle>
      </FormControl>
    </Box>
    <MUIPagination
      color='primary'
      count={props.totalPage}
      showFirstButton
      showLastButton
      page={props.curPage + 1}
      onChange={props.handleChangePage}
      style={{display: 'flex', justifyContent: 'center'}}
    />
  </Box>
}

export const LnbListItem: React.FC<{
  id: string
  label: string
  depth: number
  url: string
  isChild: boolean
  active: boolean
  icon?: React.ReactNode
  onClick?: (id: string, url: string, isChild: boolean) => void
}> = props => {
  const padding = props.depth * 20;
  const className = props.active ? 'active' : undefined

  return <ListItemButton
    className={className}
    sx={{pl: padding.toString() + 'px'}}
    onClick={() => {
      if (props.onClick) props.onClick(props.id, props.url, props.isChild)
    }}>
    {
      props.icon && <ListItemIcon>
        {props.icon}
        </ListItemIcon>
    }
    <ListItemText primary={
      props.label
    }/>
  </ListItemButton>
}

export const SimpleTextField: React.FC<{
  required?: boolean
  label?: string
  defaultLabel?: string
  multiline?: boolean
  row?: number
  placeholder?: string
  wordCount?: number | any
  fullWidth?: boolean
  title?: boolean
  onChange?: (text: string) => void
}> = props => {
  const [value, setValue] = useState<string>('');
  useLayoutEffect(() => {
    if (!!props.defaultLabel) {
      setValue(props.defaultLabel)
    }
  }, [props.defaultLabel])

  return <Box height={'180px'} overflow={'hidden'}>
    <FormControl fullWidth={props.fullWidth}>
      {props.title ?
        <TextFieldTitleContainer
          //label={props.label || "내용"}
          required={props.required}
          value={value}
          size={"small"}
          placeholder={props.placeholder}
          multiline={props.multiline}
          rows={props.row}
          onChange={(e) => {
            if (props.onChange)
              props.onChange(e.target.value)
            setValue(e.target.value)
            if (props.wordCount <= value.length) {
              setValue(value.slice(0, -1));
              alert("제한글자를 지켜주세요")
            }
          }}/>
        :
        <TextFieldContainer
          //label={props.label || "내용"}
          required={props.required}
          value={value}
          size={"small"}
          placeholder={props.placeholder}
          multiline={props.multiline}
          rows={props.row}
          onChange={(e) => {
            if (props.onChange)
              props.onChange(e.target.value)
            setValue(e.target.value)
            if (props.wordCount <= value.length) {
              setValue(value.slice(0, -1));
              alert("제한글자를 지켜주세요")
            }
          }}/>}
    </FormControl>
    {props.wordCount && <WordCount curWord={value.length} maxWord={props.wordCount}/>}
  </Box>
}

export const WordCount: React.FC<{
  curWord: number
  maxWord: string | number
  style?: React.CSSProperties
}> = props => {
  return <Box display={"flex"} justifyContent={"right"}
              style={{...props.style}}>
    <Body3 color={Color.brownish_gray} style={{height:'19px', width:'52px',marginRight:'-3px'}}>
      {props.curWord + "/" + props.maxWord}</Body3>
  </Box>
}

export const SubContents: React.FC<{
  title: string
  contentCount?: number
  borderTop?: string
  hideDivision?: boolean
  fileSize?: boolean;
  maxHeight?: string
  overflow?: boolean
  required?: boolean
  marginBottom?: string
  rightContent?: React.ReactNode;
  style?: React.CSSProperties;
}> = (props) => {
  return (
    <Box sx={{width: "100%", borderTop: props.borderTop || "none"}}>
      <Stack
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        marginRight={'30px'}
        marginBottom={props.marginBottom}>
        {props.title && (
          <Body2 weight={500} style={{paddingLeft: "0px", display: "flex", ...props.style}}>
            {props.title}{props.contentCount && <h5 style={{margin: "5px"}}>{props.contentCount}건</h5>}
            {props.fileSize &&
                <Body4 style={{paddingTop: '4px', marginLeft: '5px', fontSize: '14px'}} color={Color.warm_gray}>(제한용량
                    20MB)</Body4>}
            {props.required && <Body4 color={Color.topaz} weight={500} style={{paddingLeft: '3px'}}>*</Body4>}
          </Body2>
        )}
        {props.rightContent}
      </Stack>
      <Box
        sx={{
          maxHeight: props.maxHeight || '300px',
          overflow: props.overflow ? 'hidden' : 'auto',
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export const ConsentLayout: React.FC<{
  checkbox: DefaultCheckBoxProps;
  subCheckbox: DefaultCheckBoxProps[];
  onClick?: (selected: string[]) => void;
  isMobile?: boolean
  onChange?: any
  checked?: boolean
  row?: boolean
  justifyContent?: 'center' | 'right' | 'left'
  style?: CSSProperties
}> = (props) => {

  return <>
    <FormControl>
      <FormGroup
        row={props.row}
        sx={{justifyContent: props.justifyContent, ...props.style, marginBottom: '20px'}}>
        <FormControlLabel
          label={<Body2 weight={500} style={{fontSize: props.isMobile? '14px' : '18px'}}>{props.checkbox.label}</Body2>}
          control={<CheckboxStyle
            onChange={props.onChange} checked={props.checked}/>}
        />
      </FormGroup>
    </FormControl>
    <TableContainer
      sx={{borderTop: "1px solid #000000", width: "100%", overflow: "hidden", borderColor: '#pinkish-grey'}}>
      <FormControl fullWidth>
        <FormGroup
          row={props.row}
          sx={{justifyContent: props.justifyContent, ...props.style}}>
          {
            props.subCheckbox.map((m, i) => {
              return <div key={i}>
                <div style={{display: 'flex'}}>
                  <FormControlLabel
                    control={
                      <CheckboxStyle
                        onChange={m.checkedEvent} checked={m.checked}
                        sx={{marginLeft: "3px", marginTop: '20px'}}
                      />}
                    sx={{alignItems: 'end'}}
                    label={<><Body3>{m.label}</Body3>
                      {m.essential && <Body3 weight={500} style={{marginLeft:'4px'}} color={Color.azul}>(필수)</Body3>}</>}
                  />
                </div>
                <div style={{
                  height: "120px",
                  border: "1px solid #d7dae6",
                  borderRadius: "5px",
                  padding: "16px 20px 16px 16px",
                  overflow: "auto",
                  width: "100%",
                  marginTop: '20px'
                }}>
                  <Body3 lineClamp={1} style={{lineHeight: '28px'}}>{m.content}</Body3>
                  <Body3 style={{whiteSpace: 'pre-wrap', lineHeight: '28px'}}>{m.subContents}</Body3>
                </div>
              </div>
            })}
        </FormGroup>
      </FormControl>
    </TableContainer>
  </>
}


const SelectStyle = styled(Select)`
  border: 1px solid #d7dae6;
  width: 121px;
  height: 40px;
  padding: 0;

  .MuiSelect-select {
    padding: 0 20px 0 16px;
    height: 40px;
    line-height: 40px;
  }

  .MuiSvgIcon-root {
    margin-right: 10px;
  }
`

const TextFieldContainer = styled(TextField)`
  .MuiInputBase-root {
    height: 150px;
    align-items: baseline;
  }
`

const TextFieldTitleContainer = styled(TextField)`
  .MuiInputBase-root {
    height: 40px;
    align-items: baseline;
  }
`

