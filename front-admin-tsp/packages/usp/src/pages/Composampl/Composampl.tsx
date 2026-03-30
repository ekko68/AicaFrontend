import * as React from 'react';
import * as styles from './styles';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Pagination from '@mui/material/Pagination';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';

import AddBoxIcon from '@mui/icons-material/AddBox';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VerticalAlignBottomSharpIcon from '@mui/icons-material/VerticalAlignBottomSharp';

/* 탭 부분 데이터 랜딩 */
function Composampl() {
  /* Breadcrumb 부분 */
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      홈
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/getting-started/installation/"
    >
      메뉴명
    </Link>,
    <Typography key="3" color="text.primary">
      화면명
    </Typography>,
  ];
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  /**날짜 */
  const [value, setValue] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  );

  const handleChange2 = (newValue: Date | null) => {
    setValue(newValue);
  };

  /** 인풋 */

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: 'auto',
      padding: '10px 12px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));
  // icon
  /*function AddBoxIcon(props: SvgIconProps){
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }*/

  return (
    <div>
      <section css={styles.container}>
        {/* title 영역 Autocomplete */}
        <Box style={{ margin: 20 }}>
          <Typography
            variant="h3"
            component="div"
            textAlign="left"
            gutterBottom
          >
            COMPONENTS Sample
          </Typography>
        </Box>
        {/* 라디오박스 영역 FormControlLabel */}
        <FormControl style={{ margin: 20 }}>
          <FormLabel id="demo-radio-buttons-group-label">
            Radio button
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value=" disabled"
              disabled
              control={<Radio />}
              label="비활"
            />
          </RadioGroup>
        </FormControl>
        {/* 체크박스 영역 FormControlLabel */}
        <FormControl component="fieldset" style={{ margin: 20 }}>
          <FormLabel id="demo-radio-buttons-group-label">Check box</FormLabel>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="end"
              control={<Checkbox />}
              label="체크 1"
              labelPlacement="end"
            />
            <FormControlLabel
              value="end"
              control={<Checkbox />}
              label="체크 2"
              labelPlacement="end"
            />
            <FormControlLabel
              value="disabled"
              disabled
              control={<Checkbox />}
              label="비활"
              labelPlacement="end"
            />
          </FormGroup>
        </FormControl>

        {/* 페이징 Pagination */}
        <div style={{ margin: 20 }}>Paging indicator</div>
        <Stack spacing={2} style={{ margin: 20 }}>
          <Pagination
            count={10}
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </Stack>
        {/* input박스 영역 Autocomplete */}
        <div style={{ marginLeft: 20 }}>Input</div>
        <Autocomplete
          disablePortal
          style={{ margin: 20 }}
          id="combo-box-demo"
          options={top100Films}
          sx={{ m: 1, width: 300 }}
          renderInput={(params) => <TextField {...params} label="검색박스" />}
        />
        <Box sx={{ minWidth: 120, maxWidth: 300, margin: 2 }}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value={10}>선택박스</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          component="form"
          noValidate
          sx={{
            display: 'grid',
            gridTemplateColumns: { sm: '1fr 1fr' },
            gap: 2,
          }}
        >
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              inputtest
            </InputLabel>
            <BootstrapInput defaultValue="입력" id="bootstrap-input" />
          </FormControl>
        </Box>
        {/** 날짜 선택 */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3} sx={{ width: 300, marginTop: 5 }}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={handleChange2}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              label="Time"
              value={value}
              onChange={handleChange2}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
        {/* 버튼 영역 Button */}
        <div css={styles.btnstyle}>
          <div style={{ marginLeft: 20, marginTop: 40, marginBottom: 20 }}>
            Button
          </div>
          <Stack spacing={6} direction="row" style={{ marginLeft: 20 }}>
            <Button variant="outlined">목록</Button>
            <Button variant="contained" className="lg gray">
              부버튼
            </Button>
            <Button variant="contained" className="lg blue">
              주버튼
            </Button>
            <Button variant="contained" className="lg blue">
              확인
            </Button>
          </Stack>
          <Stack spacing={6} direction="row" style={{ margin: 20 }}>
            <Button size="large" className="md sky">
              목록 버튼
            </Button>
            <Button variant="contained" disabled size="medium" className="md">
              Disabled
            </Button>
            <Button variant="contained" size="large" className="md blue">
              검색
            </Button>
          </Stack>
        </div>
        {/* 순서컬럼 Breadcrumbs */}
        <Stack style={{ margin: 20 }}>
          <div style={{ marginBottom: 20, marginTop: 30 }}>Breadcrumb</div>
          <Breadcrumbs separator=">" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        {/** icons */}
        <div css={styles.link}>
          <div> icons / 아이콘 참고 url : </div>
          <a href="https://mui.com/components/material-icons/?theme=Sharp">
            https://mui.com/components/material-icons/?theme=Sharp
          </a>
          <Box
            sx={{
              '& > :not(style)': {
                m: 2,
              },
            }}
          >
            <AddBoxIcon />
            <AddBoxIcon color="primary" />
            <DisabledByDefaultOutlinedIcon color="primary" />
            <DisabledByDefaultRoundedIcon color="primary" />
            <DateRangeOutlinedIcon color="disabled" />
            <AddOutlinedIcon color="action" />
            <DeleteOutlineOutlinedIcon color="action" />
            <VerticalAlignBottomSharpIcon color="action" />
          </Box>
        </div>
        <div>
          <p>추가 커스텀 아이콘들</p>
          <div>
            <span className="ico ico-trash"></span>
            <span className="ico ico-plus"></span>
          </div>
        </div>
      </section>
    </div>
  );
}
/* 콤보박스 데이터 */
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
];
export default Composampl;
