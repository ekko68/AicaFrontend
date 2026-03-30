import api from "~/api";

// 설문 답변용-기본정보 조회 (PRG-COM-SVA-01)
export const fetchSurveyGet = (surveyId:string) =>
  api({
    method: 'Get',
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/survey-ans/${surveyId}`,
  });

//설문 답변용-질문 답변 저장 (PRG-COM-SVA-03)
export const fetchSurveySave = (surveyAnsParam:any) =>
  api({
    method: 'Post',
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/survey-ans/${surveyAnsParam.surveyId}/ans`,  
    data:surveyAnsParam 
  })