export interface TimeListResponse{
    mvnFcId : string,
    ymd : string,
    cutoffTimeList: CutoffTimeList[],

}

export interface CutoffTimeList{
    time: string | null
  }

export type InputType = {
    mvnFcId: string,
    rsvtDay: string,
    rsvtBgngTm: string,
    rsvtEndTm: string,
    rsvtNope: number|null,
    utztnPurpose?: string

}

export type QnaType = {
    errorCategoryCd?:boolean, 
    errorTitle?:boolean, 
    errorQuestion?:boolean, 
    helperCategoryCd?:string,
    helperTitle?:string
    helperQuestion?:string
  };

export interface errorsType  { 
  errorCategoryCd: boolean
  errorTitle: boolean
  errorQuestion: boolean
}
export interface helperTextsType  { 
  helperTextCategoryCd: string
  helperTextTitle: string
  helperTextQuestion: string
  }

export const intialInputValues : InputType = {mvnFcId: "", rsvtDay: "",rsvtBgngTm: "",rsvtEndTm:"",rsvtNope:null,utztnPurpose:""}
export const intialQnaErrorValues:QnaType = {errorCategoryCd:false, errorTitle:false, errorQuestion:false, helperCategoryCd:"",helperTitle:"",helperQuestion:""};
export const intialErrorCategoryCd = {errorCategoryCd:false, helperCategoryCd:""}
export const intialErrorTitle = {errorTitle:false, helperTitle:""}
export const intialErrorQuestion = {errorQuestion:false, helperQuestion:""}  