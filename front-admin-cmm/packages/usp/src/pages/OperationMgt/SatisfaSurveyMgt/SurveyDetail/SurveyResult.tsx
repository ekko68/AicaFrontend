import {Box, Stack} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import {
  TableDateTermCell,
  TableMultiTextFieldCell,
  TableTextCell,
  TableTextFieldCell
} from "shared/components/TableComponents";
import {CustomButton} from "shared/components/ButtonComponents";
import React, {useState} from "react";
import {SubContents, VerticalInterval} from "shared/components/LayoutComponents";
import {dummyResult, 질문답변데이터} from "~/pages/OperationMgt/SatisfaSurveyMgt/Model/Model";
import dataTable from "~/components/DataTable";
import {BarChart} from "@mui/icons-material";
import {ResponsiveBarCanvas} from "@nivo/bar";
import {ResponsivePieCanvas} from "@nivo/pie";
import {BarDatum} from "@nivo/bar/dist/types/types";
import TableCell from "@mui/material/TableCell";
import {SatisfaSurveyMgtService} from "~/pages/OperationMgt/SatisfaSurveyMgt/Service/SatisfaSurveyMgtService";

export const SurveyResult = () => {
  const [result, setResult] = useState<질문답변데이터[]>(dummyResult)
  const [searchDate, setSearchDate] = useState<{beginTime: Date, endTime: Date}>({
    beginTime: new Date(),
    endTime: new Date()
  })
  return <SubContents title={'조사결과'} maxHeight={'100%'}>
    <Stack spacing={'20px'}>
      <Stack direction={'row'} alignItems={'center'} spacing={'15px'}
             sx={{
               borderTop: '1px solid rgb(215, 218, 230)',
               borderBottom: '1px solid rgb(215, 218, 230)',
             }}>
        <TableContainer>
          <Table>
            <TableRow sx={{'> td': {borderBottom: 'none'}}}>
              <TableDateTermCell
                label={"조회기간"}
                thWidth={"12%"}
                onChange={(beginTime, endTime) => {
                  setSearchDate({beginTime: beginTime, endTime: endTime})
                }}/>
            </TableRow>
          </Table>
        </TableContainer>
        <CustomButton
          label={'조회'} type={"small"} color={"list"}
          onClick={async () => {
            // const res = await SatisfaSurveyMgtService.getResearchData(searchDate)
            // if (res.success){
            //   setResult(res)
            // }
          }}/>
        <CustomButton
          label={'전체기간 조회'} type={"small"} color={"list"}
          style={{width: '160px'}}
          onClick={async () => {
            // const res = await SatisfaSurveyMgtService.getAllResearchData()
            // if (res.success){
            //   setResult(res)
            // }
          }}/>
      </Stack>

      {
        result.map((m, i) => {
          return <ChartTable data={m}/>
        })
      }
    </Stack>
  </SubContents>
}

const ChartTable = (props: { data: 질문답변데이터 }) => {
  const [bar, setBar] = useState<{title: string, value: number}[]>([])
  const [pie,setPie] = useState<{ id: string, value: number }[]>([])

  if (props.data.데이터.질문유형 == '체크박스형' && props.data.데이터.항목 && bar.length == 0){
    setBar(props.data.데이터.항목.map((m,i) => {
      return {
        title: m,
        value: props.data.항목선택수?.at(i) || 0
      }
    }))
  }
  else if (props.data.데이터.질문유형 == '라디오버튼형' && props.data.데이터.항목 && pie.length == 0) {
    setPie(props.data.데이터.항목.map((m,i) => {
      return {
        id: m,
        value: props.data.항목선택수?.at(i) || 0
      }
    }))
  }

  return <TableContainer key={props.data.id} sx={{border: '1px solid rgb(215, 218, 230)'}}>
    <Table>
      <TableRow>
        <TableTextCell
          title={'질문'} label={props.data.데이터.질문}
          division thWidth={"12%"} tdWidth={'38%'}/>
        <TableTextCell
          title={'응답자 수'} label={props.data.응답자수.toString()}
          thWidth={"12%"} tdWidth={'38%'}/>
      </TableRow>

      <TableRow>
        {
          props.data.데이터.질문유형 == '체크박스형' && <TableCell colSpan={4} sx={{padding: '20px 200px'}}>
            <Box sx={{height: '100px', width: '100%'}}>
              <ResponsiveBarCanvas
                data={bar}
                keys={["value"]}
                margin={{ top: 5, right: 0, bottom: 20, left: 25 }}
                indexBy="title"
              />
            </Box>
          </TableCell>
        }
        {
          props.data.데이터.질문유형 == '라디오버튼형' && <TableCell colSpan={4} sx={{padding: '20px 200px'}}>
            <Box sx={{height: '200px'}}>
              <ResponsivePieCanvas
                data={pie}
                margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
                legends={[
                  {
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 140,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 60,
                    itemHeight: 14,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 14,
                    symbolShape: 'circle'
                  }
                ]}
              />
            </Box>
          </TableCell>
        }
        {
          props.data.데이터.질문유형 == '주관식유형' && <TableMultiTextFieldCell
            fixLabel label={'답변'} defaultLabel={props.data.답변}
            thWidth={"12%"} tdSpan={3}/>
        }
      </TableRow>
    </Table>
  </TableContainer>
}
// let userDamage: object[] = [];
// userDamage[i] = { [user.championName]: user.totalDamageDealtToChampions };


///Nivo Bar Graph Component
type BarDataProps = {
  data: BarDatum[];
};