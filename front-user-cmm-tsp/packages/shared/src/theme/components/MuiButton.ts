// import { Components } from '@mui/material';
// declare module '@mui/material/Button' {
//   interface ButtonPropsVariantOverrides {
//     test: true;
//   }
// }

import { Components } from "@mui/material/styles/components";

const theme: Components['MuiButton'] = {
  variants: [
    {
      props: { variant: 'text' },
      style: {
        textTransform: 'none',
      },
    },
  ],
};

export default theme;
