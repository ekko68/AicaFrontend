import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function SearchRadio(props: any) {
  const { rdoData, labelledby } = props;
  const defaultVal = rdoData[0].codeNm;

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby={labelledby}
        defaultValue={defaultVal}
        name="radio-buttons-group"
      >
        {rdoData.map((data: any, i: number) => (
          <FormControlLabel
            value={data.codeNm}
            control={<Radio />}
            label={data.codeNm}
            key={i}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
