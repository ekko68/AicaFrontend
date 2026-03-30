import api from '~/api';

//설문 답변용-기본정보 조회 (PRG-COM-SVA-01)
export const fetchParticipatGet = (surveyId: string) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/survey-ans/${surveyId}`,
    method:'get',
  })

//설문 답변용-질문 답변 저장 (PRG-COM-SVA-03)
export const fetchParticipatSave = (form:FormData,surveyId: string) =>
  api({
    url: `${process.env.REACT_APP_DOMAIN_COMMON_BNET}/common/api/survey-ans/${surveyId}/ans`,
    method:'post',
    data:form
  })

