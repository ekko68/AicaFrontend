export interface surveyInput {
    surveyId: string,
    questions : questions[]
}

export interface questions {
    questionId : string,
    answers : answer[]
}

export interface answer {
    answerId:string|null
    shortAnswer:string|null
}

export const initSurveyInput:surveyInput = {
    surveyId: "",
    questions: []
}