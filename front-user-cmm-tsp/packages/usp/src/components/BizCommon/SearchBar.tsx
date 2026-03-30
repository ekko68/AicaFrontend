import React, { useState,useEffect } from 'react';
import { Autocomplete, Button, FormControl, MenuItem, Select, Stack, TextField, SelectChangeEvent } from "@mui/material";
import { Color } from '~/components/StyleUtils';
import styled from '@emotion/styled';
import { SelectIcon } from '../IconComponents';
import { useScroll } from '~/pages/store/GlobalModalStore';

/*
  공통컴포넌트 : 서치바
*/
export const SearchBar:React.FC<{
  handleSearch:(searchInput:string | undefined) => void
  handleChangeSelect?:(selectInput:string | undefined) => void
  placehold?:string
}> = (props) => {

  const [searchInput,setSearchInput] = useState<string>();
  const {scrollY} = useScroll();
  const handleClickSearch = () => {
    if (props.handleSearch) props.handleSearch(searchInput);
  }
  
  useEffect(() => {
    if(!!props.handleChangeSelect){
      props.handleChangeSelect(searchInput)
    }
  }, [searchInput]);

  return(
    <InputStyle style={{display: scrollY ? 'none' : ''}}>
      <Autocomplete
        freeSolo
        disableClearable
        options={[]}
        value={searchInput ? searchInput : ''}
        onKeyDown={(event:any) => {
          if (event.key === 'Enter') {
            event.defaultMuiPrevented = true;
            handleClickSearch()
          }
        }}
        renderInput={(params) => (
          <TextField
            name='keyword'
            autoFocus
            placeholder={props.placehold ? props.placehold : ''}
            {...params}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
              setSearchInput(e.target.value);
            }}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }} 
          />
        )}
      />
      <Button
        variant="contained"
        className="search_btn"
        onClick={handleClickSearch}
      >
        검색
      </Button>
    </InputStyle>
  );
}

export const SelectSearchBar:React.FC<{  
  placehold?:string
  selectData?:any[]
  handleSearch:(searchInput:string,sel:string) => void
}> = (props) => {
  const {scrollY} = useScroll();
  const [searchInput,setSearchInput] = useState<string>('');
  const [currency, setCurrency] = useState('');

  const handleClickSearch = () => {
    if (props.handleSearch) props.handleSearch(searchInput,currency);
  }

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setCurrency(event.target.value);
  };

  return(
    <InputStyle style={{display: scrollY ? 'none' : ''}}>
      <Autocomplete
        freeSolo
        disableClearable
        options={[]}
        value={searchInput ? searchInput : ''}
        onKeyDown={(event:any) => {
          if (event.key === 'Enter') {
            event.defaultMuiPrevented = true;
            handleClickSearch()
          }
        }}
        renderInput={(params) => (
          <>
            <FormControl className="select_plus">
              <Select
                value={currency}
                onChange={handleChangeSelect}
                displayEmpty
                IconComponent = {SelectIcon}
                MenuProps={MenuProps}
              >
              {props.selectData ? props.selectData.map((option:any,key:number) => (
                <SelectItemStyle key={key} value={option.code}>
                    {option.codeNm}
                </SelectItemStyle>
              )) : []}
            </Select>
            </FormControl>
            <TextField
              name='keyword'
              className="select_text"
              autoFocus
              placeholder={props.placehold ? props.placehold : ''}
              {...params}
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                setSearchInput(e.target.value);
              }}
              InputProps={{
                ...params.InputProps,
                type: 'search',
                // endAdornment: (
                //   <InputAdornment position="end">
                //     <Button
                //       variant="contained"
                //       className="search_btn"
                //       onClick={handleClickSearch}
                //     >
                //       검색
                //     </Button>
                //   </InputAdornment>
                // ),
              }} 
            />
          </>
        )}
      />
      <Button
        variant="contained"
        className="search_btn"
        onClick={handleClickSearch}
      >
        검색
      </Button>
    </InputStyle>
  );
}

const InputStyle = styled(Stack)`
  position: relative;
  max-width: 780px;
  margin: 0 auto;
  .select_new{
    .MuiInputAdornment-root{
      margin-right: 0;
    }
  }
  .MuiInputLabel-root {
    line-height: 1.8em;
    padding-left: 30px;
    color: ${Color.warm_gray};
    &.Mui-focused{
      display: none;
    }
  }
  .Mui-ficused {
    display: none;
    border: none;
    .MuiInputLabel-root {
      display: none;
      font-size: 0;
    }
    .MuiOutlinedInput-root {
      font-size: 0;
    }
  }
  .MuiAutocomplete-root {
    width: 100%;
    .select_plus{
      position: absolute;
      left: 0;
      width: 130px;
      z-index: 1;
      .MuiOutlinedInput-root{
        width: 100%;
      }
      .MuiSelect-iconOutlined{
        background: none;
      }
      .MuiSelect-select{
        color: #707070;
        font-family: 'Noto Sans CJK KR';
        text-align: left;
        padding-left: 40px;
        padding-right: 25px;
      }
      .MuiOutlinedInput-notchedOutline{
        border: none;
      }
      .MuiSelect-icon{
        right: 0;
      }
    }
    .select_text{
      .MuiOutlinedInput-root{
        padding-left: 110px;
      }
    }
    .MuiOutlinedInput-root {
      background-color: ${Color.white};
      border-radius: 30px;
      height: 60px;
      width: calc(100% - 10px);
      padding: 0;
      input::placeholder {
        color: ${Color.warm_gray};
        opacity: 1;
        font-weight: 300;
      }
    }
    &.Mui-focused {
      border: none;
    }
    .MuiOutlinedInput-root{
      &:hover{
        .MuiOutlinedInput-notchedOutline{
          border: none;
        }
      }
      &.Mui-focused {
        border: none;
        .MuiOutlinedInput-notchedOutline{
          border: none;
        }
      }
      .MuiAutocomplete-input {
        padding: 7.5px 4px 7.5px 40px;
        font-weight: 400;
        letter-spacing: -0.64px;
        color: ${Color.black};
        font-family: 'Noto Sans CJK KR';
        &::placeholder {
          color:#707070;
          opacity: 1;
          font-weight: 400;
        }
      }
    }
  }
  .search_btn {
    position: absolute;
    right: 0px;
    border-radius: 30px;
    width: 140px;
    height: 60px;
    padding-top: 0;
    background-color: ${Color.azul};
    font-size: 18px;
    font-weight: 400;
    letter-spacing: -0.72px;
    padding: 0;
    margin-top: 0;
    &:hover{
      background-color: ${Color.azul};
      box-shadow: 3px 3px 8px 0 rgba(64, 99, 236, 0.44);
    } 
  }
  @media (min-width: 320px) and (max-width: 768px) {
    margin: 0 auto;
    .MuiAutocomplete-root {
      width: 100%;
      .select_plus{
        position: relative;
        width: 100%;
        z-index: 1;
        margin-bottom: 10px;
        .MuiOutlinedInput-root{
          width: 100%;
        }
        .MuiSelect-select{
          text-align: left;
          font-size: 14px;
          font-weight: 400 !important;
          padding-left: 25px;
          width: 100%;
        }
        .MuiOutlinedInput-notchedOutline{
          border: none;
        }
        .MuiSelect-icon{
          right: 20px;
        }
      }
      .select_text{
        .MuiOutlinedInput-root{
          padding-left:  0;
        }
      }
      .MuiOutlinedInput-root{
        height: 50px;
        .MuiAutocomplete-input {
          padding: 5px 51px 5px 25px;
          font-size: 14px;
          letter-spacing: -0.56px;
          font-weight: 400;
        }
      }
    }
    
    .search_btn {
      right: 0;
      width: 80px;
      height: 50px;
      border-radius: 25px;
      font-weight: 300;
      font-size: 16px;
      letter-spacing: -0.64px;
      bottom: 0;
    }
  }
`;

const MenuProps = {
  PaperProps: {
      style: {
          width: '120px',
          marginTop: '5px',
          padding: '5px',
          boxShadow: 'none',
          border: '1px solid #e0e0e0',
          borderRadius: '10px',
      },
  },
};

const SelectItemStyle = styled(MenuItem)`
  width: 100%;
  max-width: 120px;
  height: 50px;
  margin-bottom: 5px;
  font-size: 16px;
  letter-spacing: -0.64px;
  font-family: Noto Sans CJK KR;
  padding: 4px 12px 4px 35px;
  border-radius: 5px;
  line-height: 2.5;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  
  &:first-of-type{
    margin-top: -8px;
  }
  &:last-of-type{
    margin-bottom: -8px;
  }
  &.MuiMenuItem-root{
    padding: 4px 12px 4px 35px;
    margin-bottom: 5px;
    display: block;
    text-align: left;
    &:last-of-type{
      margin-bottom: -8px;
    }
  }
  &:hover,  &:focus-visible{
    background-color: #f5f5f5;
    border-radius: 5px;
  }
  &.Mui-selected{
    background-color: #f5f5f5;
    border-radius: 5px;
    &:hover,  &:focus-visible, &.Mui-selected{
      background-color: #f5f5f5;
      border-radius: 5px;
    }
  }
  @media (min-width: 320px) and (max-width: 768px) {
    font-size: 14px;
    max-width: 100%;
    padding: 4px 12px 4px 20px;
    line-height: 2;
    height: 40px;
    min-height: 40px;
  }
`;