import * as React from 'react';

import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';

export default function SearchRadioTotal(props: any) {
  const { rdoData, labelledby } = props;
  const defaultVal = rdoData[0].codeNm;

  return (
    <FormControl className="rdoTotalForm">
      <RadioGroup
        aria-labelledby={labelledby}
        defaultValue={defaultVal}
        name="radio-buttons-group"
      >
        {rdoData.map((data: any, i: number) => {
          if (i > 0) return false;
          return (
            <Box className="totalGroup">
              <FormControlLabel
                value={data.codeNm}
                control={<Radio />}
                label={data.codeNm}
                key={i}
              />
            </Box>
          );
        })}

        <ul className="rdolistGroup">
          {rdoData.map((data: any, i: number) => {
            if (i === 0) return false;
            return (
              <li>
                <FormControlLabel
                  value={data.codeNm}
                  control={<Radio />}
                  label={data.codeNm}
                  key={i}
                />
              </li>
            );
          })}
        </ul>
      </RadioGroup>
    </FormControl>
  );
}
