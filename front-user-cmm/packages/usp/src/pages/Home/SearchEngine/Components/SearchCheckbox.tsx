import * as React from 'react';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function SearchCheckbox(props: any) {
  const { ckData, maxNum, bval } = props;

  const [ckedTotal, setCkedTotal] = useState<boolean>(false);
  const [ckedSelect, setCkedSelect] = useState<any>(bval);

  useEffect(() => {
    ckedSelect.includes(false) ? setCkedTotal(false) : setCkedTotal(true);
  }, [ckedSelect]);

  const handleTotalClick = () => {
    const copyArr: any[] = [...ckedSelect];
    if (!ckedTotal) {
      for (let i = 0; i < maxNum; i++) {
        copyArr[i] = true;
      }
    } else {
      for (let i = 0; i < maxNum; i++) {
        copyArr[i] = false;
      }
    }
    setCkedSelect(copyArr);
    setCkedTotal(!ckedTotal);
  };

  const handleCkboxClick = (idx: number) => {
    const copyArr: any[] = [...ckedSelect];
    copyArr[idx] = !copyArr[idx];
    setCkedSelect(copyArr);
  };

  const children = (
    <Box className="childBox">
      {ckData.map((data: any, idx: number) => {
        if (idx === 0) return false;
        const curridx = idx - 1;
        return (
          <FormControlLabel
            label={data.codeNm}
            control={
              <Checkbox
                checked={ckedSelect[curridx]}
                onClick={() => {
                  handleCkboxClick(curridx);
                }}
              />
            }
            className={'labelChild'}
            key={idx}
          />
        );
      })}
    </Box>
  );

  return (
    <>
      <FormControlLabel
        label={ckData[0].codeNm}
        control={
          <Checkbox
            checked={ckedTotal}
            indeterminate={ckedTotal}
            onClick={handleTotalClick}
          />
        }
        className={'labelTotal'}
      />
      {children}
    </>
  );
}
