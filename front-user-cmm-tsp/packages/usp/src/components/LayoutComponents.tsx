import React, {useState} from 'react'
import Box from "@mui/material/Box";
import {Stack, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {styled} from "@mui/styles";
import {Color} from "~/components/StyleUtils";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import MUIPagination from "@mui/material/Pagination";

export const VerticalInterval: React.FC<{
  size: number | string
}> = props => <div style={{marginTop: props.size}}/>;

export const HorizontalInterval: React.FC<{
  size: number | string
}> = props => <div style={{marginLeft: props.size}}/>;

export const BlockContents: React.FC<{
  children?:any,
  title: string,
  maxHeight?: string,
  rightContent?: React.ReactNode
}> = props => {
  return <Box
    borderTop={1}
    borderColor={"#4063ec"}
    sx={{mb: "60px"}}>
    <Stack
      paddingX={"30px"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <h2>{props.title}dafdsfd</h2>
      {props.rightContent}
    </Stack>
    <Box style={{
      maxHeight: props.maxHeight || "300px",
      overflow: "auto"
    }}>
      {props.children}
    </Box>
  </Box>
}

export const CustomTabs: React.FC<{
  children?:any,
  tabs: string[],
  onClick?: (newValue: string) => void
}> = props => {
  const [value, setValue] = useState<string>(props.tabs[0]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (props.onClick) props.onClick(newValue);

    setValue(newValue);
  };

  return (
    <Box sx={{width: "100%", typography: "body1"}}>
      <TabContext value={value}>
        <Box sx={{borderBottom: 1, borderColor: Color.primary }} >
          <TabList onChange={handleChange} variant={'scrollable'} sx={{minHeight: '40px'}}>
            {
              props.tabs.map((m, i) => {
                return <TabContainer key={i} label={m} value={m}/>
              })
            }
          </TabList>
        </Box>
        {props.children}
      </TabContext>
    </Box>
  );
}

export const CustomTabsBlacks: React.FC<{
  children?:any,
  // tabs: string[],
  tabs: {name: string, count: number}[]
  onClick?: (newValue: string) => void
}> = props => {
  const [value, setValue] = useState<string>(props.tabs[0].name);
  
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (props.onClick) props.onClick(newValue);
    setValue(newValue);
  };
  return (
    <Box sx={{width: "100%", typography: "body1"}}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange}>
            {
              props.tabs.map((m, i) => { //
                return <TabContainerBlack key={i} label={<Stack direction={'row'} sx={{alignItems: 'flex-end'}}>
                  <Box>{m.name}</Box>
                  <Box className="count">{`(${m.count})`}</Box>
                </Stack>} value={m.name}/>
              })
            }
          </TabList>
        </Box>
        {props.children}
      </TabContext>
    </Box>
  );
}
const TabContainerBlack = styled(Tab)({
  "&.Mui-selected": {
    background: Color.darkBg,
    color: Color.white,
  },
  "& .count":{
    fontSize: '14px',
    fontWeight: '300',
    marginLeft: '4px',
  },
  border: "none",
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  color: Color.black,
  fontSize:'16px',
  minHeight: '40px',
  fontWeight: '400',
})

const TabContainer = styled(Tab)({
  "&.Mui-selected": {
    background: Color.primary,
    color: Color.white
  },
  border: "1px solid #a7aec9",
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  color: "#a7aec9"
})

export const Pagination: React.FC<{
  curPage: number,
  totalPage: number,
  rowsPerPage: number,
  handleChangeRowsPerPage: (event: any) => void,
  handleChangePage: (event: unknown, newPage: number) => void
  style?: React.CSSProperties;
}> = props => {
  return <Box style={props.style}>
    <Box sx={{display: "flex"}} justifyContent={"right"} alignItems={"center"}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native" sx={{pr: 2}}>
        Page {props.curPage + 1} / {props.totalPage}
      </InputLabel>
      <FormControl variant="standard">
        <Select value={props.rowsPerPage} onChange={props.handleChangeRowsPerPage}>
          {[5, 10, 15].map((v: any) => (
            <MenuItem key={v} value={v}>
              {v}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    <MUIPagination
      color="primary"
      count={props.totalPage}
      showFirstButton
      showLastButton
      page={props.curPage + 1}
      onChange={props.handleChangePage}
      style={{display: "flex", justifyContent: "center"}}
    />
  </Box>
}