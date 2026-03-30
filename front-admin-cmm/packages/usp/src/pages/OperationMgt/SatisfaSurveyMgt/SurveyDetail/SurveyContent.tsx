import {HorizontalInterval, SubContents, TitleContents} from "shared/components/LayoutComponents";
import TableContainer from "@mui/material/TableContainer";
import {Stack, Table, TableBody, TableRow} from "@mui/material";
import {
  TableDateTermCell, TableMultiTextFieldCell,
  TableRadioCell,
  TableSelectCell, TableTextCell, TableTextFieldButtonCell,
  TableTextFieldCell
} from "shared/components/TableComponents";
import {설문지기본정보, 설문지등록, 질문데이터, 질문유형, 포털구분} from "~/pages/OperationMgt/SatisfaSurveyMgt/Model/Model";
import {CustomButton} from "~/components/ButtonComponents";
import {checkValidity} from "shared/utils/validUtil";
import React, {useState} from "react";
import {SatisfaSurveyMgtService} from "~/pages/OperationMgt/SatisfaSurveyMgt/Service/SatisfaSurveyMgtService";
import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {dayFormat} from "shared/utils/stringUtils";
import {CustomIconButton} from "shared/components/ButtonComponents";
import {Icons} from "shared/components/IconContainer";
import {useNavigate} from "react-router-dom";

export const SurveyContent = () => {
  const [basicInfo, setBasicInfo] = useState<설문지기본정보>()
  const [question, setQuestion] = useState<질문데이터[]>([])
  const navigate = useNavigate()
  const {addModal} = useGlobalModalStore()

  return <Stack spacing={'20px'}>
    <SubContents id={'SurveryContent'} title={'기본정보'} maxHeight={'100%'}
                 rightContent={<Stack direction={'row'}>
                   <CustomButton
                     label={"기본정보 저장"} type={"small"} color={"list"}
                     onClick={() => {
                       if (checkValidity('SurveryContent') && basicInfo) {
                         // const res = await SatisfaSurveyMgtService.putRegister(basicInfo)
                         // if (!res.success) return
                         //
                         // setBasicInfo({...res})
                         addModal({open: true, isDist: true, content: '저장되었습니다.'})
                       }
                     }}
                   />
                 </Stack>}>
      <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableSelectCell
                label={'포털구분'} selectLabel={포털구분} defaultLabel={basicInfo?.포털구분 || undefined}
                division required thWidth={"13%"} tdWidth={"21%"}
                onClick={(selectValue) => {
                  setBasicInfo({...basicInfo!, 포털구분: selectValue})
                }}/>

              <TableTextCell
                title={'등록일'} label={basicInfo ? dayFormat(basicInfo.등록일) : ''}
                division thWidth={"13%"} tdWidth={"21%"}
              />

              <TableTextCell
                title={'진행상태'} label={basicInfo?.진행상태 || ''}
                thWidth={"13%"} tdWidth={"21%"}
              />
            </TableRow>

            <TableRow>
              <TableTextFieldCell
                label={"설문지명"} defaultLabel={basicInfo?.설문지명 || undefined}
                required division thWidth={"13%"} tdSpan={3}
                onChange={(text) => {
                  setBasicInfo({...basicInfo!, 설문지명: text})
                }}
              />

              <TableRadioCell
                label={'사용여부'} radioLabel={['사용', '사용안함']}
                defaultLabel={basicInfo ? basicInfo.사용여부 ? '사용' : '사용안함' : '사용'}
                row thWidth={"13%"} tdWidth={"21%"}
                onClick={(selected) => {
                  setBasicInfo({...basicInfo!, 사용여부: (selected == '사용')})
                }}/>
            </TableRow>

            <TableRow>
              <TableDateTermCell
                division label={'진행기간'}
                thWidth={"13%"} tdSpan={3}
                onChange={(beginTime, endTime) => {
                  setBasicInfo({...basicInfo!, 진행시작일자: beginTime.getTime(), 진행시종료일자: endTime.getTime()})
                }}/>

              <TableRadioCell
                label={'중복응답'} radioLabel={['허용', '불가']}
                defaultLabel={basicInfo ? basicInfo.중복응답 ? '허용' : '불가' : '허용'}
                row thWidth={"13%"} tdWidth={"21%"}
                onClick={(selected) => {
                  setBasicInfo({...basicInfo!, 중복응답: (selected == '허용')})
                }}/>
            </TableRow>

            <TableRow>
              <TableTextCell
                title={"설문지경로"} label={basicInfo?.설문지경로 || ''}
                rightContent={
                  <CustomButton label={"복사"} type={"small"} color={"list"}
                                onClick={() => {
                                }}/>
                }
                thWidth={"13%"} tdSpan={5}
              />
            </TableRow>

            <TableRow>
              <TableTextFieldCell
                required multiline label={'설명'}
                thWidth={"13%"} tdSpan={5} wordCount={1000}
                onChange={(text) => {
                  setBasicInfo({...basicInfo!, 설명: text})
                }}
              />
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
    </SubContents>

    {
      question && question.map((m, i) => {
        return <SubContents title={`질문 ${i + 1}`} key={`question-${i}`} id={`question-${i}`} rightContent={
          <Stack direction={'row'} spacing={'10px'}>
            <CustomButton
              label={"질문삭제"} type={"small"} color={"list"}
              onClick={() => {
                setQuestion(question.filter(f => f.id != m.id))
              }}
            />
            <CustomIconButton icon={Icons.UpArrow} onClick={() => {
              if (i > 0) {
                let temp = JSON.parse(JSON.stringify(question))
                temp[i] = temp.at(i - 1)!
                temp[i - 1] = m
                setQuestion(temp)
              }
            }}/>
            <CustomIconButton icon={Icons.DownArrow} onClick={() => {
              if (i < question.length - 1) {
                let temp = JSON.parse(JSON.stringify(question))
                temp[i] = temp.at(i + 1)!
                temp[i + 1] = m
                setQuestion(temp)
              }
            }}/>
          </Stack>
        }>
          <TableContainer sx={{borderTop: "1px solid #d7dae6"}}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableSelectCell
                    required label={'질문유형'} defaultLabel={m.질문유형}
                    selectLabel={['주관식유형', '라디오버튼형', '체크박스형']}
                    division thWidth={"13%"} tdWidth={"21%"}
                    onClick={(selectValue) => {
                      if (['주관식유형', '라디오버튼형', '체크박스형'].includes(selectValue)){
                        const isSubjective = selectValue == '주관식유형'
                        setQuestion(question.map(n => {
                          return {
                            ...n,
                            질문유형: n.id == m.id? selectValue as 질문유형 : n.질문유형,
                            항목: !isSubjective? n.항목 || [''] : n.항목
                          }
                        }))
                      }
                    }}/>

                  <TableRadioCell
                    label={'필수여부'} radioLabel={['필수', '선택']}
                    defaultLabel={m.필수여부 ? '필수' : '선택'}
                    row thWidth={"13%"} tdSpan={3}
                    onClick={(selected) => {
                      question.map(n => {
                        if (m.id == n.id) n.필수여부 = selected == '필수'
                      })
                    }}/>
                </TableRow>

                <TableRow>
                  <TableTextFieldCell
                    required label={'질문'} defaultLabel={m.질문}
                    thWidth={"13%"} tdSpan={5} wordCount={50}
                    additionDirection={'row'} additionContent={
                      <Stack direction={'row'}>
                        <HorizontalInterval size={'10px'}/>
                        {
                          ['라디오버튼형', '체크박스형'].includes(m.질문유형.toString()) && <CustomButton
                            label={"항목추가"} type={"small"} color={"list"}
                            style={{margin: 0, width: '90px'}}
                            onClick={() => {
                              setQuestion(question.map((n,j) => {
                                return {
                                  ...n,
                                  항목: i == j? n.항목?.concat('') || [] : n.항목
                                }
                              }))
                            }}
                          />}
                      </Stack>
                    }
                    onChange={(text) => {
                      question.map(n => {
                        if (m.id == n.id) n.질문 = text
                      })
                    }}
                  />
                </TableRow>

                {
                  ['라디오버튼형', '체크박스형'].includes(m.질문유형.toString()) && <TableRow>
                  <TableMultiTextFieldCell
                    required label={'항목'} defaultLabel={m.항목}
                    thWidth={"13%"} tdSpan={5}
                    rightContent={['Direction','Trash']}
                    onChange={(list) => {
                      question.map(n => {
                        if (m.id == n.id) n.항목 = list
                      })
                    }}
                  />
                </TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
        </SubContents>
      })
    }

    <Stack flexDirection={"row"} justifyContent={"space-between"} sx={{width: "100%", marginTop: "40px"}}>
      <CustomButton
        label={"목록"} type={"largeList"} color={"outlined"}
        onClick={() => {
          navigate('/OperationMgt/SatisfaSurveyMgt/SatisfaSurveyMgt')
        }}
      />

      <Stack direction={'row'} spacing={'10px'}>
        <CustomButton
          label={"질문추가"}
          onClick={() => {
            const random = Math.random()
            setQuestion(question.concat({
              id: `temp-${random}`,
              질문유형: '주관식유형',
              필수여부: true,
              질문: ''
            }))
          }}
        />

        <CustomButton
          label={"질문저장"}
          onClick={async () => {
            let validity = true
            question.map((m,i) => {
              if (!checkValidity(`question-${i}`)){
                if (validity) validity = false
              }
            })

            if (validity){
              // const res = await SatisfaSurveyMgtService.putQuestion(question)
              // if (!res.success) return
              // setQuestion({...res})

              addModal({open: true, isDist: true, content: '저장되었습니다.',})
            }
          }}
        />
      </Stack>
    </Stack>
  </Stack>
}