import React, {Fragment, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useGlobalConfigStore} from "../store/GlobalConfigStore";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {SelectIcon} from "../components/IconComponents";
import MenuItem from "@mui/material/MenuItem";
import {
  Button, Collapse,
  Drawer, FormControlLabel,
  Stack,
  Step,
  StepLabel, Stepper, Tab,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import {
  CheckBoxMobile,
  CheckboxStyle,
  CustomButton,
  CustomCheckBoxs,
  CustomIconButton,
} from "../components/ButtonComponents";
import {Color} from "../components/StyleUtils";
import {Body2, Body3, H1, H2} from "../components/TextComponents";
import {Icons} from "../components/IconContainer";
import {VerticalInterval} from "../components/LayoutComponents";
import {TabContext, TabList} from "@mui/lab";
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import styled from "@emotion/styled";
import BreadCrumb from "../components/BreadCrumb";
import {useScrollStore} from "../store/ScrollStore";
import {useScroll} from "../components/useScroll";

export const BannerContents: React.FC<{
  title: string
  subTitle?: string
  placeholder?: string
  onSearchClick?: (searchText: string, selectCategory?: string) => void
  tabs?: {
    tabValue: string
    items: string[]
    onClick: (selectTab: string) => void
  }
  stepper?: { activeStep: number, step: string[] }
  // 검색창 카테고리
  category?: string[]
  // 조건검색
  detail?: {
    column1Title: string
    column2Title: string
    condition: string[]
    onChangeDate: (start: Date, end: Date) => void
    onChangeCondition: (select: string[]) => void
  }
}> = props => {
  const [searchText, setSearchText] = useState<string>('')
  const [contentHeight, setContentHeight] = useState(180)
  const bannerContentRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLElement>(null)

  const {scrollDirection, isContraction, isLocking, setLocking} = useScrollStore()
  const {scrollY} = useScroll()
  const {isDesktop} = useGlobalConfigStore()
  const interactionTime = '0.3s'

  // 축소화될때 배너크기에 맞춰서 contentHeight 수정
  useEffect(() => {
    const timer = setInterval(() => {
      if (!!bannerContentRef && bannerContentRef.current) {
        setContentHeight(bannerContentRef.current.offsetHeight + 10)
      }
    })
    setTimeout(() => {
      clearInterval(timer)
    }, 300)
  }, [isContraction])

  // 배너박스를 locking할지 여부 판단 로직
  useEffect(() => {
    if (!!bannerContentRef && bannerContentRef.current) {
      setContentHeight(bannerContentRef.current.offsetHeight + 10)

      if (!!contentRef && contentRef.current) {
        const remainHeight = window.innerHeight - bannerContentRef.current.offsetHeight
        const footerSize = 400

        if ((contentRef.current.scrollHeight - remainHeight) + footerSize < 150) {
          if (!isLocking) setLocking(true)
        } else {
          if (isLocking) setLocking(false)
        }
      }
    }
  }, [bannerContentRef, contentRef, props.tabs?.tabValue])

  const bannerMarginTop = () => {
    // console.log('bannerDirection - ' + scrollDirection)
    if (isDesktop) {
      if (!isContraction) return 120
      else if (scrollDirection == 'up') return 120
      else return 60
    } else if (!isDesktop) {
      if (scrollDirection == 'up' || scrollY == 0) return 55
      else return 0
    }
  }

  return <Fragment>
    <Stack
      alignItems={'center'}
      sx={{
        width: '100%', height: '100%',
        marginTop: `${bannerMarginTop()}px`,
        transition: interactionTime
      }}
    >
      {/*<Box sx={{*/}
      {/*  position: 'absolute',*/}
      {/*  top: `${bannerMarginTop()}px`,*/}
      {/*  height: `${contentHeight - 10}px`,*/}
      {/*  left: 0,*/}
      {/*  right: 0,*/}
      {/*  backgroundColor: Color.darkBg,*/}
      {/*  transition: '0.3s'*/}
      {/*}}/>*/}
      <BannerContent
        ref={bannerContentRef}
        sx={{
          position: 'fixed',
          width: '100%',
          backgroundColor: Color.darkBg,
          color: Color.white,
          alignItems: 'center',
          justifyContent: 'center',
          clip: `rect(0,100%, ${contentHeight - 10}px,0)`,
          // paddingTop: `${(!isDesktop && isContraction) ? 0 : 15}px`,
          // paddingBottom: `${isContraction && !props.stepper && !props.tabs && !props.detail ? 30 : 0}px`,
          zIndex: 1
        }}>
        <Stack direction={isContraction ? 'row' : 'column'} sx={{width: '100%', maxWidth: '1260px'}}>
          {
            isDesktop && <Box className={'breadcrumb'} sx={{
              position: isContraction ? 'absolute' : 'relative',
              paddingTop: isContraction ? '30px' : '36px',
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%', maxWidth: '1260px'
            }}>
                  <BreadCrumb/>
              </Box>
          }
          {
            (!isContraction || isDesktop) &&
              <Box
                  sx={{
                    display: 'flex', width: '100%',
                    justifyContent: 'center',
                    paddingTop: isContraction ? '30px' : isDesktop ? '0' : '48px'
                  }}>
                  <H1 bold color={'white'}>{props.title}</H1>
              </Box>
          }
        </Stack>
        <Collapse
          in={(props.subTitle && !isContraction) || false}
          timeout={0.5} unmountOnExit
          sx={{textAlign: 'center', paddingTop: '10px'}}
        >
          <Body3 color={'white'} preLine style={{lineHeight: '30px'}}>
            {props.subTitle}
          </Body3>
        </Collapse>

        {
          props.stepper && <Box
            sx={{
              display: 'inline-grid', overflow: 'hidden',
              paddingTop: isContraction? '15px' : '24px'
          }}>
                <StepperStyle activeStep={props.stepper.activeStep} alternativeLabel
                              sx={{
                                width: isContraction ? '311px' : isDesktop ? 'auto' : '311px',
                                transition: interactionTime
                              }}>
                  {
                    props.stepper.step.map((m) => {
                      return <Step key={m}>
                        <StepLabel>{`${isContraction ? '' : m}`}</StepLabel>
                      </Step>
                    })
                  }
                </StepperStyle>
            {
              ((!props.tabs && !props.onSearchClick && !props.detail) || isContraction) &&
                <VerticalInterval size={'15px'}/>}
            {/*{*/}
            {/*  (props.tabs && !isContraction) && <VerticalInterval size={'15px'}/>*/}
            {/*}*/}
            </Box>
        }

        {
          props.onSearchClick && !isContraction && <Fragment>
                <SearchBar
                    searchText={searchText}
                    placeholder={props.placeholder}
                    category={props.category}
                    onChange={(text: string) => setSearchText(text)}
                    onSearchClick={(selectCategory?: string) => {
                      if (props.onSearchClick) {
                        props.onSearchClick(searchText, selectCategory)
                      }
                    }}/>
            {/*{*/}
            {/*  <VerticalInterval size={(!props.tabs && !props.detail) ? '40px' : '20px'}/>*/}
            {/*}*/}
            </Fragment>
        }

        {
          props.detail && <Collapse in={(props.detail && !isContraction) || false} timeout={0.5} unmountOnExit>
            <SearchDetailBox {...props.detail!}
                             mobile={isDesktop ? undefined : {title: '상세 조건'}}/>
            {/*{isDesktop && <VerticalInterval size={props.tabs ? '20px' : '40px'}/>}*/}
          </Collapse>
        }

        {
          props.tabs && <TabContext value={props.tabs.tabValue}>
                <Box sx={{
                  alignItems: 'left',
                  paddingTop: isContraction ? "12px" : "40px",
                  maxWidth: '1260px',
                  width: '100%',
                  marginLeft: !isDesktop ? '15px' : '0',
                  zIndex: 3,
                }}>
                    <TabList
                        variant={'scrollable'}
                        TabIndicatorProps={{
                          sx: {display: 'none'}
                        }}
                        onChange={(event: React.SyntheticEvent, newValue: string) => {
                          if (props.tabs) props.tabs.onClick(newValue)
                        }}>
                      {
                        props.tabs.items.map((m, i) => {
                          return <TabContainer key={i} label={m} value={m}/>
                        })
                      }
                    </TabList>
                </Box>
            </TabContext>
        }

        {
           !props.tabs && <Box sx={{
            paddingBottom: (isDesktop && isContraction) ? '30px' :
              isContraction ? '0' :
                isDesktop? '60px' : '48px'
          }}/>
        }
      </BannerContent>

      <BodyView
        contentRef={contentRef}
        isDesktop={isDesktop}
        contentHeight={contentHeight}
        interactionTime={interactionTime}>
        {props.children}
      </BodyView>
    </Stack>
  </Fragment>
}

// 화면 내용 View
const BodyView: React.FC<{
  isDesktop: boolean, contentHeight: number
  contentRef: React.Ref<HTMLElement>
  interactionTime: string
}> = props => {

  return <BodyContent
    ref={props.contentRef}
    isDesktop={props.isDesktop}
    sx={{
      maxWidth: props.isDesktop ? '1260px' : undefined,
      marginTop: `${props.contentHeight}px`,
      transition: props.interactionTime
    }}>
    {props.children}
  </BodyContent>
}

// 검색바
const SearchBar = (props: {
  searchText: string
  onChange: (searchText: string) => void
  onSearchClick: (selectCategory?: string) => void
  placeholder?: string
  category?: string[]
}) => {
  const {isDesktop} = useGlobalConfigStore()
  const [categoryValue, setCategoryValue] = useState(props.category ? props.category[0] : undefined)
  const searchButtonSize = isDesktop ? 140 : 100
  const height = isDesktop ? 60 : 50

  return <Stack
    direction={'row'}
    sx={{
      display: 'flex',
      paddingTop: isDesktop? '40px' : '32px',
      maxWidth: '760px',
      width: '100%',
      justifyContent: 'right',
      alignItems: 'end',
      paddingX: `${isDesktop ? '0px' : '15px'}`
    }}>
    <Box sx={{display: isDesktop ? 'flex' : "table", width: '100%', justifyContent: 'left'}}>
      {
        props.category && <SearchCategorySelect isDesktop={isDesktop}>
              <Select
                  sx={{fontFamily: 'Noto Sans CJK KR'}}
                  value={categoryValue}
                  IconComponent={SelectIcon}
                  onChange={(event: SelectChangeEvent) => {
                    setCategoryValue(event.target.value)
                  }}>
                {
                  props.category.map((m, i) => {
                    return <MenuItem key={i} sx={{
                      fontFamily: 'Noto Sans CJK KR', margin: '2px 5px', borderRadius: '5px',
                      '&:focus': {backgroundColor: '#f5f5f5'}, '&:hover': {backgroundColor: '#f5f5f5'}
                    }} value={m}>{m}</MenuItem>
                  })
                }
              </Select>
          </SearchCategorySelect>
      }

      <TextField
        value={props.searchText}
        placeholder={props.placeholder}
        InputProps={{
          type: 'search',
          sx: {
            'input': {
              '&::placeholder': {
                color: Color.warm_gray,
                opacity: 1
              }
            },
            borderRadius: '30px', height: '100%',
            padding: `0 ${searchButtonSize}px 0 ${(props.category && isDesktop) ? 120 : 10}px`
          }
        }}
        sx={{
          background: 'white',
          width: '100%', height: `${height}px`,
          borderRadius: '30px',
          justifyContent: 'center'
        }}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </Box>

    <CustomButton
      type={'listBack'} label={'검색'}
      onClick={() => props.onSearchClick(categoryValue)}
      style={{position: 'absolute', zIndex: 1, width: `${searchButtonSize}px`, height: `${height}px`}}
    />
  </Stack>
}

// 카테고리 선택
const SearchCategorySelect: React.FC<{ isDesktop: boolean }> = props => {
  if (props.isDesktop) {
    return <FormControl sx={{
      position: 'absolute', textAlign: "center", zIndex: 1,
      minWidth: '120px', height: '60px', justifyContent: 'center',
      '& .MuiOutlinedInput-notchedOutline': {border: 'none'},
    }}>
      {props.children}
    </FormControl>
  } else {
    return <FormControl sx={{
      width: '100%',
      marginBottom: '10px',
      paddingX: '10px',
      background: 'white',
      borderRadius: '30px',
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '& .MuiOutlinedInput-root': {
        backgroundColor: 'white',
        borderRadius: '30px',
        height: '50px'
      }
    }}>
      {props.children}
    </FormControl>
  }
}

const DetailHeight = (isContraction: boolean, isDesktop: boolean) => {
  if (isDesktop) return isContraction ? 0 : 202
  else return isContraction ? 0 : 36
}

const SearchDetailBox: React.FC<{
  column1Title: string
  column2Title: string
  condition: string[]
  onChangeDate: (start: Date, end: Date) => void
  onChangeCondition: (select: string[]) => void
  mobile?: {
    title: string
  }
}> = props => {
  const [start, setStart] = useState<Date>(new Date());
  const [end, setEnd] = useState<Date>(new Date());

  return <Box paddingTop={'20px'}>
    {
      props.mobile ? <DetailDrawerBox {...props}/> :
        <Stack sx={{
          maxWidth: '760px',
          backgroundColor: 'white',
          borderRadius: "10px"
        }}>
          <TableContainer>
            <Table
              sx={{minWidth: 750}}
              size={"small"}
            >
              <TableHead>
                <TableRow>
                  <TableCell width={'50%'} align={'center'} sx={{borderRight: "1px solid #d7dae6"}}>
                    <Body2 bold>{props.column1Title}</Body2>
                  </TableCell>
                  <TableCell width={'50%'} align={'center'}>
                    <Body2 bold>{props.column2Title}</Body2>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{
                  '.MuiTableCell-root': {
                    borderBottom: 'none'
                  }
                }}>
                  <TableCell sx={{borderRight: "1px solid #d7dae6", overflow: 'auto', justifyContent: 'start'}}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack direction={'row'} spacing={2} alignItems={'center'}
                             sx={{padding: '8px 0 30px', height: '132px'}}>
                        <FormControl fullWidth>
                          <DatePicker
                            value={start}
                            inputFormat={"yyyy-MM-dd"}
                            mask={"____-__-__"}
                            openTo={"day"}
                            views={['year', 'month', 'day']}
                            components={{
                              OpenPickerIcon: Icons.Calendar
                            }}
                            onChange={(newValue: Date | null) => {
                              if (newValue) {
                                setStart(newValue)
                                props.onChangeDate(newValue, end)
                              }
                            }}
                            renderInput={(params: any) => <TextField {...params} />}
                          />
                        </FormControl>
                        <span>~</span>
                        <FormControl fullWidth>
                          <DatePicker
                            value={end}
                            inputFormat={"yyyy-MM-dd"}
                            mask={"____-__-__"}
                            openTo={"day"}
                            views={['year', 'month', 'day']}
                            components={{
                              OpenPickerIcon: Icons.Calendar
                            }}
                            onChange={(newValue: Date | null) => {
                              if (newValue) {
                                setEnd(newValue)
                                props.onChangeDate(start, newValue)
                              }
                            }}
                            renderInput={(params: any) => <TextField {...params} />}
                          />
                        </FormControl>
                      </Stack>
                    </LocalizationProvider>
                  </TableCell>

                  <TableCell sx={{overflow: 'auto'}}>
                    <CustomCheckBoxs
                      allCheck
                      row width={'48%'}
                      checkbox={props.condition.map(m => {
                        return {label: m}
                      })}
                      style={{height: '132px'}}
                      onClick={props.onChangeCondition}/>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
    }
  </Box>
}

interface selectInter {
  toggleDrawer: boolean,
  select: string[],
  allCheck: boolean
}

let selectInfo: selectInter = {
  toggleDrawer: false,
  select: [],
  allCheck: false
}

const DetailDrawerBox = (props: {
  column1Title: string
  column2Title: string
  condition: string[]
  onChangeDate: (start: Date, end: Date) => void
  onChangeCondition: (select: string[]) => void
  mobile?: {
    title: string
  }
}) => {
  const [start, setStart] = useState<Date>(new Date());
  const [end, setEnd] = useState<Date>(new Date());
  const [selectInformation, setSelectInformation] = useState<selectInter>(selectInfo)

  const handlerCheck = (label: string) => {
    const selectedIndex = selectInformation.select.indexOf(label);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectInformation.select, label);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectInformation.select.slice(1));
    } else if (selectedIndex === selectInformation.select.length - 1) {
      newSelected = newSelected.concat(selectInformation.select.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectInformation.select.slice(0, selectedIndex),
        selectInformation.select.slice(selectedIndex + 1)
      );
    }
    selectInfo.allCheck = props.condition.length == newSelected.length;

    setSelectInformation({select: newSelected, toggleDrawer: true, allCheck: selectInfo.allCheck})
  }

  return <Fragment>
    <Button onClick={() => {
      setSelectInformation({toggleDrawer: true, allCheck: selectInformation.allCheck, select: selectInfo.select})
    }}>
      <Body2 underline color={'white'}>상세정보 열기</Body2>
    </Button>
    <Drawer
      PaperProps={{
        sx: {
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          padding: '24px 15px 20px',
        }
      }}
      anchor={'bottom'}
      open={selectInformation.toggleDrawer}
      onClose={() => {
        setSelectInformation({
          toggleDrawer: false,
          allCheck: selectInfo.select.length == props.condition.length,
          select: selectInfo.select
        })
      }}
    >
      <Stack mb={'30px'}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <H2 bold>{props.mobile?.title}</H2>
          <CustomIconButton icon={Icons.Exit} onClick={() => {
            setSelectInformation({
              toggleDrawer: false,
              allCheck: selectInfo.select.length == props.condition.length,
              select: selectInfo.select
            })
          }}/>
        </Stack>
        <VerticalInterval size={'20px'}/>
        <Box>
          <Body2>{props.column1Title}</Body2>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack direction={'row'} spacing={2} alignItems={'center'} sx={{padding: '8px 0 30px'}}>
              <FormControl fullWidth>
                <DatePicker
                  value={start}
                  inputFormat={"yyyy-MM-dd"}
                  mask={"____-__-__"}
                  openTo={"day"}
                  views={['year', 'month', 'day']}
                  components={{
                    OpenPickerIcon: Icons.Calendar
                  }}
                  onChange={(newValue: Date | null) => {
                    if (newValue) setStart(newValue)
                  }}
                  renderInput={(params: any) => <TextField {...params} />}
                />
              </FormControl>
              <span>~</span>
              <FormControl fullWidth>
                <DatePicker
                  value={end}
                  inputFormat={"yyyy-MM-dd"}
                  mask={"____-__-__"}
                  openTo={"day"}
                  views={['year', 'month', 'day']}
                  components={{
                    OpenPickerIcon: Icons.Calendar
                  }}
                  onChange={(newValue: Date | null) => {
                    if (newValue) setEnd(newValue)
                  }}
                  renderInput={(params: any) => <TextField {...params} />}
                />
              </FormControl>
            </Stack>
          </LocalizationProvider>
        </Box>
        <Box>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Body2>{props.column2Title}</Body2>
            <FormControlLabel checked={selectInformation.allCheck} control={
              <CheckboxStyle
                onClick={() => {
                  setSelectInformation({allCheck: true, select: props.condition, toggleDrawer: true})
                  if (selectInformation.allCheck)
                    setSelectInformation({select: [], allCheck: false, toggleDrawer: true})
                }}/>} label={'전체'}/>
          </div>
          <Box sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            width: '100%'
          }}>
            {
              props.condition.map((m, i) => {
                return <CheckBoxMobile
                  key={m}
                  active={selectInformation.select.includes(m)}
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    handlerCheck(m)
                  }}
                  width={'48%'}>{m}</CheckBoxMobile>
              })
            }
          </Box>
        </Box>
      </Stack>
      <Box>
        <CustomButton
          type={'full'} label={'저장'}
          onClick={() => {
            setSelectInformation({
              toggleDrawer: false,
              allCheck: selectInformation.allCheck,
              select: selectInformation.select
            })
            selectInfo.select = selectInformation.select;
            props.onChangeCondition(selectInformation.select)
          }}/>
      </Box>
    </Drawer>
  </Fragment>
}

const TabContainer = styled(Tab)`
  background-color: ${Color.line};
  color: ${Color.warm_gray};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-right: 1px;
  font-size: 16px;

  &.MuiTab-root {
    padding: 12px 32px;
  }

  &.Mui-selected {
    background: ${Color.white};
    color: ${Color.black};

    &.tabBlack {
      background: ${Color.black};
      color: ${Color.white};
    }
  }

  @media (max-width: 768px) {
    font-size: 14px;
    &.MuiTab-root {
      padding: 10px 24px;
    }
  }
`

const StepperStyle = styled(Stepper)`
  align-items: center;


  .MuiStepLabel-label {
    //font-family: 'Noto Sans CJK KR', serif;
    //letter-spacing: -1.4px;
  }

  .MuiStep-root {
    padding: 0;
    width: 110px;

    .Mui-active {
      color: #1CCDCC;
      border: none;
    }

    .Mui-completed {
      color: #707070;
      border: none;

      .MuiStepConnector-line {
        border-color: #0c101e;
        opacity: 50%;
      }
    }

    .Mui-disabled {
      color: #ccc;

      .MuiStepIcon-root {
        border: 1px solid #fff;
        border-radius: 50px;
      }
    }
  }

  .MuiStepConnector-root {
    left: calc(-50% + 17px);
    right: calc(50% + 17px);
    color: #cccccc;
    opacity: 50%;
    top: 17px;
  }

  .MuiStepIcon-root {
    background-color: transparent;
    width: 34px;
    height: 34px;

    &.Mui-completed {
      color: #000;
    }

    &.Mui-active {
      color: #1CCDCC;
    }
  }

  .MuiStepIcon-text {
    font-size: 11px;
    font-weight: 300;
  }
`

const BodyContent = styled(Box)<{ isDesktop: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 ${props => props.isDesktop ? 0 : 15}px;

  @media (min-width: 768px) and (max-width: 1280px) {
    padding: 0 20px;
  }
`

const BannerContent = styled(Stack)`
  .breadcrumb {
    @media (min-width: 768px) and (max-width: 1280px) {
      right: 20px;
    }
  }

  @media (min-width: 768px) and (max-width: 1280px) {
    padding: 0 20px;
  }
`