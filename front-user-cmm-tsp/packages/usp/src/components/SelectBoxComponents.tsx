import React, {useState} from 'react';
import { Select, FormControl, MenuItem, SelectChangeEvent, FormHelperText } from "@mui/material";
import { SelectIcon } from '~/components/IconComponents';
import { alwaysCurrencies } from "../pages/Notice/NoticeModel";
import { intialErrorCategoryCd } from "~/models/ModelTreadmill";
import styled from '@emotion/styled';

export const CustomSelectMd: React.FC<{
    setSortOrdertab?: (key: string) => void
    }> = (props) => {
    const [categoryCd, setCategoryCd] = useState("");
    const changeCategoryCd = (event: SelectChangeEvent) => {
        setCategoryCd(event.target.value as string);
    };
    const [categoryCdError,setCategoryCdError] = useState(intialErrorCategoryCd);
    return (
        <SelectStyle sx={{width: '100%'}}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryCd}
                onChange={changeCategoryCd}
                error={categoryCdError.errorCategoryCd}
                IconComponent = {SelectIcon}
                MenuProps={MenuProps}
            >
                <SelectItemStyle value="CATE-STEP-01">창업아이디어</SelectItemStyle>
                <SelectItemStyle value="CATE-STEP-02">구인/구직</SelectItemStyle>
                <SelectItemStyle value="CATE-STEP-03">제안/기타</SelectItemStyle>
            </Select>
            <FormHelperText error={categoryCdError.errorCategoryCd}>{categoryCdError.helperCategoryCd}</FormHelperText>
        </SelectStyle>
    );
};

export const CustomSelect: React.FC<{
    value: string;
    data: any[];
    onClick?: (selected: string) => void
    }> = (props) => {
    const change = (event: SelectChangeEvent) => {
        if (props.onClick) props.onClick(event.target.value);
    };
    return (
        <SelectStyle sx={{width: '100%'}}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.value}
                onChange={change}
                IconComponent = {SelectIcon}
                MenuProps={MenuProps}
            >
                {props.data.map((m:any , i:number) => (
                <SelectItemStyle value={m.code} key={i}>{m.codeNm}</SelectItemStyle>
                ))}
            </Select>
        </SelectStyle>
    );
};

export const CustomSelectSubmitDay: React.FC<{
    value: string;
    data: any[]
    onClick?: (selected: string) => void
    }> = (props) => {
    const change = (event: SelectChangeEvent) => {
        if (props.onClick) props.onClick(event.target.value);
    };
    return (
        <SelectStyle sx={{width: '100%'}}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.value}
                onChange={change}
                IconComponent = {SelectIcon}
                MenuProps={MenuProps}
            >
                {props.data.map((m:any , i:number) => (
                <SelectItemStyle value={m.rsltHistId} key={i}>{m.presentnDate}</SelectItemStyle>
                ))}
            </Select>
        </SelectStyle>
    );
};
const MenuProps = {
    PaperProps: {
        style: {
            width: 'auto',
            marginTop: '4px',
            padding: '4px',
            boxShadow: 'none',
            border: '1px solid #ccc',
            borderRadius: '5px',
        },
    },
};

const SelectItemStyle = styled(MenuItem)`
    font-size: 16px;
    letter-spacing: -0.64px;
    font-family: Noto Sans CJK KR;
    padding: 0 12px;
    min-height: 40px !important;
    border-radius: 3px;
    margin-bottom: 4px;
    height:44px;
    line-height: 2.2;
    &:first-of-type{
        margin-top: -8px;
    }
    &:last-of-type{
        margin-bottom: -8px;
    }
    &.Mui-selected{
        background-color: #f5f5f5;
        &:hover,  &:focus-visible{
            background-color: #f5f5f5;
        }
    }
`;

const SelectStyle = styled(FormControl)`
    .MuiSelect-select{
        padding-top: 12px;
        padding-bottom: 13px;
    }
   .MuiOutlinedInput-root{
        border-color: #ccc;
        .MuiOutlinedInput-notchedOutline{
            border-color: #ccc;
            border-width: 1px;
        }
        &.Mui-focused, &:hover {
            .MuiOutlinedInput-notchedOutline{
                border-color: #ccc;
                border-width: 1px;
            }
        }
    }
`;