export type InputType = {
    title : string;
    article : string;
    notice? : boolean,
    posting? : boolean,
}

export type QnaType = {
    errorTitle?:boolean, 
    errorArticle?:boolean, 
    helperTitle?:string
    helperArticle?:string
  };

export interface errorsType  { 
  errorTitle: boolean
  errorArticle: boolean
}
export interface helperTextsType  { 
  helperTextTitle: string
  helperTextArticle: string
  }

export const intialInputValues : InputType = {title: "",article: ""}
export const intialQnaErrorValues:QnaType = {errorTitle:false, errorArticle:false, helperTitle:"",helperArticle:""};
export const intialErrorTitle = {errorTitle:false, helperTitle:""}
export const intialErrorArticle = {errorArticle:false, helperArticle:""}
