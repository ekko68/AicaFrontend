import {BannerContents} from "shared/components/BannerContents";
import {Box, Stack} from "@mui/material";
import {CustomCheckBoxs} from "shared/components/ButtonComponents";
import {useState} from "react";
import {VerticalInterval} from "shared/components/LayoutComponents";

const BannerTemp = () => {
  const [option, setOption] = useState<string[]>([])
  return <BannerContents
    title={'테스트 뷰'}
    subTitle={option.includes('subTitle')? '실증장비 및 실증자원 사용 절차를 확인해 보세요.' : undefined}
    stepper={option.includes('stepper')? {
      activeStep: 2,
      step: ['test1','test2','test3','test4','test5']
    } : undefined}
    category={option.includes('category')? ['test1','test2'] : undefined}
    onSearchClick={option.includes('search')? ()=>{} : undefined}
    detail={option.includes('detail')? {
      column1Title: '날짜',
      column2Title: '조건',
      condition: ['1번','2번','3번','4번','5번','6번'],
      onChangeDate: () => {},
      onChangeCondition: () => {}
    }: undefined}
    tabs={option.includes('tab')? {
      tabValue: 'test1',
      items: ['test1','test2','test3','test4','test5'],
      onClick: () => {}
    }: undefined}
  >
    <Stack width={'100%'} height={'3000px'}>
      <VerticalInterval size={'100px'}/>
      <CustomCheckBoxs
        row checkbox={['subTitle', 'stepper', 'search', 'category', 'detail', 'tab'].map(m => {
          return {label: m}
        })}
        onClick={(selected) => {
          setOption(selected)
        }}
      />
    </Stack>
  </BannerContents>
}

export default BannerTemp