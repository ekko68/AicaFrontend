import {BaseResponse} from "shared/utils/Model"
import { inputType } from '~/fetches/fetchIdTrouver';

export interface errorsType  { 
  errorLoginId: boolean
  errorName: boolean
  errorId: boolean
  errorBizno: boolean
  errorPassword: boolean
  errorEmail: boolean
}
export interface helperTextsType  { 
  helperTextName: string
  helperTextId: string
  helperTextBizno: string
  helperTextPassword: string
  helperTextEmail: string
  helperTextLoginId:string
  }
export interface labelsType {
  labelsLoginId:string
  labelsName: string
  labelsId: string
  labelsBizno: string
  labelsPassword: string
  labelsEmail: string
}

export interface ConditionType {
  id:string,
  name:string,
  label?:string,
  type:string,
  value:string,
  variant:string,
  fullWidth:boolean,
  helperText?: string,
  placeholder:string,
  error?: boolean,
  focused?:boolean,
  autoFocus?:boolean,
  required?:boolean,
  style?: React.CSSProperties | undefined,
}
export interface ConditionBoxs {
  name: ConditionType,
  id: ConditionType,
  biz: ConditionType,
  tel: ConditionType,
  email: ConditionType,
}

export interface PwState {
  amount: string;
  password: string;
  passOneRest:string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}
export interface LableState {
  passwordLable: string;
  passOneRestLable: string;
}

export interface ErrorState {
  passwordError: boolean;
  passOneRestError: boolean;
}

export type UserType = {
  loginId: string;
  passwd: string;
  errorId?:boolean, 
  errorPw?:boolean, 
  labelId?:string,
  labelPw?:string
  open: boolean
  isLock: boolean
};

export interface joinMemberType {
  loginId   :string
  passwd1	  :string
  passwd2	  :string
  memberNm?  :string
  memberType?:string
  email	    :string
  mobileNo?  :string
  chargerNm?: String,
  ceoNm?: string,
  jurirno?: String,
  certNoTel?:string,
  certNo? :string
  marketingReception?:boolean
  sessionId:string
  loginDisabled?:boolean,
  emailDisabled?:boolean,
  ertNoDisabled?:boolean,
  CertNoTel?:boolean,
  CertNoMaill?:boolean,
  emailCertKey?:string
  telCertKey?:string
}

export interface joinMembererrorsType  { 
  errorloginId: boolean
  errorpasswd1: boolean
  errorpasswd2: boolean
  erroremail: boolean
  errorcertNo: boolean
}
export interface joinMemberhelperTextsType  {
  helperTextloginId: string
  helperTextpasswd1: string
  helperTextpasswd2: string
  helperTextemail: string
  helperTextcertNo: string 
  }
export interface joinMemberlabelsType {
  labelsTextloginId: string
  labelsTextpasswd1: string
  labelsTextpasswd2: string
  labelsTextemail: string
  labelsTextcertNo: string 
}

export interface joinBizErrorType {
  memberNm:boolean,
  ceoNm:boolean,
  jurirno:boolean,
  chargerNm:boolean,
  mobileNo:boolean,
  email:boolean,
  certNo:boolean,
  loginId:boolean,
  passwd1:boolean,
  passwd2:boolean,
  bizNmlabel:string,
  ceoNamelabel:string,
  bizNolabel:string,
  mgrNmlabel:string,
  mgrTellabel:string,
  mgrEmaillabel:string,
  certNolabel:string,
  idlabel:string,
  passwordlabel:string,
  password2label:string
}

export interface TermCdimsiType  {
  termsType: string
  beginDay: string
  required: boolean
  consentYn:boolean
}
export interface emailRegType {
  email:string
}

export interface NiceIdResult {
  encodeData:string
  sessionId:string
}


export const  inithonBizErrors:joinBizErrorType = {
  memberNm:false,
  ceoNm:false,
  jurirno:false,
  chargerNm:false,
  mobileNo:false,
  email:false,
  certNo:false,
  loginId:false,
  passwd1:false,
  passwd2:false,
  bizNmlabel:"사업자명",
  ceoNamelabel:"대표자명",
  bizNolabel:"법인등록번호",
  mgrNmlabel:"담당자명",
  mgrTellabel:"담당자 휴대폰번호",
  mgrEmaillabel:"담당자 이메일",
  certNolabel:"인증번호",
  idlabel:"아이디",
  passwordlabel:"비밀번호",
  password2label:"비밀번호 확인"
}




export const regExpPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,16}$/; // check password
export const emailReg =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; // check email

export const intialLoginValues:UserType = { loginId: "", passwd: "", errorId:false, errorPw:false, labelId:"로그인",labelPw:"비밀번호",open:false,isLock:false};
export const intialValues:inputType = { loginId:"",memberNm: "", birthday: "",bizrno: "",mobileNo: "",email: "",key:""};

export const iniNames = {id:'name', name:'userName', error: false, autoFocus:true, helperText: '',variant:'outlined', value:'', label:'이름', required: true ,type:'search', placeholder:'이름입력하세요', fullWidth:true }
export const iniId    = {id:'id',   name:'userId', error: false, autoFocus:false, helperText: '',variant:'outlined', value:'', label:'생년월일', required: true ,type:'number', placeholder:'id입력하세요', fullWidth:true}
export const iniBiz   = {id:'biz',  name:'userBizno', error: false, autoFocus:false, helperText: '',variant:'outlined', value:'', label:'사업자번호', required: true ,type:'number', placeholder:'사업자 번호 입력하세요', fullWidth:true}
export const iniTel   = {id:'tel',  name:'userPassword', error: false, autoFocus:false, helperText: '',variant:'outlined', value:'', label:'핸드폰번호', required: true ,type:'password', placeholder:'핸드폰번호 입력하세요', fullWidth:true}
export const iniEmail = {id:'emall', name:'userEmail', error: false, autoFocus:false, helperText: '',variant:'outlined', value:'', label:'이메일', required: true ,type:'email', placeholder:'이메일 입력하세요', fullWidth:true }

export const intialValuesErrors:errorsType = {errorLoginId: false,errorName: false, errorId:false, errorBizno:false, errorPassword:false, errorEmail:false,};
export const intialValuesHptx:helperTextsType = {helperTextLoginId:'',helperTextName:'', helperTextId:'', helperTextBizno:'', helperTextPassword:'', helperTextEmail:'',};
export const intialValuesLab:labelsType = {labelsLoginId:'아이디',labelsName:'이름', labelsId:'생년월일', labelsBizno:'사업자번호', labelsPassword:'핸드폰번호', labelsEmail:'이메일',};
export const intialValuesLabBiz:labelsType = {labelsLoginId:'아이디',labelsName:'사업자명', labelsId:'사업자명', labelsBizno:'사업자번호', labelsPassword:'핸드폰번호', labelsEmail:'이메일',};

export const  initSetErrors:errorsType = { errorLoginId: false,errorName: false, errorId:false, errorBizno:false, errorPassword:false, errorEmail:false};
export const  initSetLabels:labelsType = { labelsLoginId:'아이디',labelsName:'이름', labelsId:'생년월일', labelsBizno:'사업자번호', labelsPassword:'핸드폰번호', labelsEmail:'이메일'};
export const initSetHelperTexts:helperTextsType = {helperTextLoginId:'', helperTextName:'', helperTextId:'', helperTextBizno:'', helperTextPassword:'', helperTextEmail:''};

export const  inithonMemberErrors:joinMembererrorsType = { errorloginId: false,errorpasswd1: false, errorpasswd2:false, erroremail:false, errorcertNo:false};
export const  inithonMemberLabels:joinMemberlabelsType = { labelsTextloginId:'아이디',labelsTextpasswd1:'비밀번호', labelsTextpasswd2:'비밀번호 확인', labelsTextemail:'이메일', labelsTextcertNo:'인증번호'};
export const  inithonMemberHelperTexts:joinMemberhelperTextsType = {helperTextloginId:'', helperTextpasswd1:'', helperTextpasswd2:'', helperTextemail:'', helperTextcertNo:''};

export const inithonMember:joinMemberType = { 
  loginId: "" ,
  passwd1: "",
  passwd2: "",
  email: "",
  sessionId:"",
}

export const inithonBiz:joinMemberType = {
  loginId   :"",
  passwd1	  :"",
  passwd2	  :"",
  memberNm  :"",
  memberType:"",
  email	    :"",
  mobileNo  :"",
  chargerNm: "",
  ceoNm: "",
  jurirno: "",
  certNoTel:"",
  certNo :"",
  marketingReception:false,
  sessionId:"",
  loginDisabled:false,
  emailDisabled:false,
  ertNoDisabled:false,
  CertNoTel:false,
  CertNoMaill:false,
  emailCertKey:"",
  telCertKey:""
}