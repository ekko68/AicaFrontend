const express = require("express"); // express 모듈 추가
const bodyParser = require("body-parser");  // body-parser 모듈 추가
const exec = require("child_process").exec; // child_process 모듈 추가
const app = express();
const port = 8888;

//NICE평가정보에서 발급한 본인인증 서비스 개발 정보(사이트 코드 , 사이트 패스워드)
const sSiteCode = "BY099";
const sSitePW = "VI6llMhRTL5A";

//모듈의 절대 경로(권한:755 , FTP업로드방식 : binary)
// ex) sModulePath = "C:\\module\\CPClient.exe";
//     sModulePath = "/root/modile/CPClient";
const sModulePath = "C:\\module\\CPClient_x64.exe";

const sAuthType = "";      	  //없으면 기본 선택화면, M(휴대폰), X(인증서공통), U(공동인증서), F(금융인증서), S(PASS인증서), C(신용카드)
const sCustomize 	= "";			  //없으면 기본 웹페이지 / Mobile : 모바일페이지


// 본인인증 처리 후, 결과 데이타를 리턴 받기위해 다음예제와 같이 http부터 입력합니다.
// 리턴url은 인증 전 인증페이지를 호출하기 전 url과 동일해야 합니다. ex) 인증 전 url : https://www.~ 리턴 url : https://www.~
const sReturnUrl = "http://localhost:8888/checkplus_success";	// 성공시 이동될 URL (방식 : 프로토콜을 포함한 절대 주소)
const sErrorUrl = "http://localhost:8888/checkplus_fail";	  	// 실패시 이동될 URL (방식 : 프로토콜을 포함한 절대 주소)

app.get("/", function(request: any, response: { send: (arg0: string) => void; }) {
  response.send("sample index page");
});

app.get("/checkplus_main", function(request: any, response: { render: (arg0: string, arg1: { sEncData: string; sRtnMSG: string; }) => void; }) {
  //업체 요청 번호 
  //세션등에 저장하여 데이터 위변조 검사 (인증후에 다시 전달) 
  const d = new Date();
  const sCPRequest = sSiteCode + "_" + d.getTime();let sPlaincData:any = "";
  let sEncData = "";
  let sRtnMSG = "";

  sPlaincData = "7:REQ_SEQ" + sCPRequest.length + ":" + sCPRequest +
                "8:SITECODE" + sSiteCode.length + ":" + sSiteCode +
                "9:AUTH_TYPE" + sAuthType.length + ":" + sAuthType +
                "7:RTN_URL" + sReturnUrl.length + ":" + sReturnUrl +
                "7:ERR_URL" + sErrorUrl.length + ":" + sErrorUrl +
                "9:CUSTOMIZE" + sCustomize.length + ":" + sCustomize;
  
    
  const cmd = sModulePath + " " + "ENC" + " " + sSiteCode + " " + sSitePW + " " + sPlaincData;

  const child = exec(cmd , {encoding: "euc-kr"});
  child.stdout.on("data", function(data: string) {
    sEncData += data;
  });
  child.on("close", function() {
    //
    //이곳에서 result처리 해야함. 
  
    //처리 결과 확인
    if (sEncData == "-1"){
      sRtnMSG = "암/복호화 시스템 오류입니다.";
    }
    else if (sEncData == "-2"){
      sRtnMSG = "암호화 처리 오류입니다.";
    }
    else if (sEncData == "-3"){
      sRtnMSG = "암호화 데이터 오류 입니다.";
    }
    else if (sEncData == "-9"){
      sRtnMSG = "입력값 오류 : 암호화 처리시, 필요한 파라미터 값을 확인해 주시기 바랍니다.";
    }
    else{
      sRtnMSG = "";
    }
    response.render("checkplus_main.ejs", {sEncData , sRtnMSG});
  });
});

app.use(bodyParser.urlencoded({extended: true}));
app.post("/checkplus_success", function(request: { body: { EncodeData: any; }; }, response: { render: (arg0: string, arg1: { sRtnMSG: any; requestnumber: any; authtype: any; errcode?: any; responsenumber?: string; name?: string; birthdate?: string; gender?: string; nationalinfo?: string; dupinfo?: string; conninfo?: string; mobileno?: string; mobileco?: string; }) => void; }) {
  let sEncData = request.body.EncodeData;
  let cmd = "";
  let  requestnumber:any = null;
  let  responsenumber:any = null;
  let  authtype:any = null;
  let  name:any = null;
  let  birthdate:any = null;
  let  gender:any = null;
  let  nationalinfo:any = null;
  let  dupinfo:any = null;
  let  conninfo:any = null;
  let  mobileno:any = null;
  let  mobileco:any = null;
  if( /^0-9a-zA-Z+\/=/.test(sEncData) == true){
    let sRtnMSG = "입력값 오류";
    let requestnumber = "";
    let authtype = "";
    let errcode = "";
    response.render("checkplus_fail.ejs", {sRtnMSG , requestnumber , authtype , errcode});
  }

  if(sEncData != "")
  {
     cmd = sModulePath + " " + "DEC" + " " + sSiteCode + " " + sSitePW + " " + sEncData;
  }let sDecData = "";

  const child = exec(cmd , {encoding: "euc-kr"});
  child.stdout.on("data", function(data: string) {
    sDecData += data;
  });
  child.on("close", function() {
    let sRtnMSG = "";
    //처리 결과 확인
    if (sDecData == "-1"){
      sRtnMSG = "암/복호화 시스템 오류";
    }
    else if (sDecData == "-4"){
      sRtnMSG = "복호화 처리 오류";
    }
    else if (sDecData == "-5"){
      sRtnMSG = "HASH값 불일치 - 복호화 데이터는 리턴됨";
    }
    else if (sDecData == "-6"){
      sRtnMSG = "복호화 데이터 오류";
    }
    else if (sDecData == "-9"){
      sRtnMSG = "입력값 오류";
    }
    else if (sDecData == "-12"){
      sRtnMSG = "사이트 비밀번호 오류";
    }
    else
    {
      //항목의 설명은 개발 가이드를 참조
      requestnumber = decodeURIComponent(GetValue(sDecData , "REQ_SEQ"));     //CP요청 번호 , main에서 생성한 값을 되돌려준다. 세션등에서 비교 가능
      responsenumber = decodeURIComponent(GetValue(sDecData , "RES_SEQ"));    //고유 번호 , 나이스에서 생성한 값을 되돌려준다.
      authtype = decodeURIComponent(GetValue(sDecData , "AUTH_TYPE"));        //인증수단
      name = decodeURIComponent(GetValue(sDecData , "UTF8_NAME"));            //이름
      birthdate = decodeURIComponent(GetValue(sDecData , "BIRTHDATE"));       //생년월일(YYYYMMDD)
      gender = decodeURIComponent(GetValue(sDecData , "GENDER"));             //성별
      nationalinfo = decodeURIComponent(GetValue(sDecData , "NATIONALINFO")); //내.외국인정보
      dupinfo = decodeURIComponent(GetValue(sDecData , "DI"));                //중복가입값(64byte)
      conninfo = decodeURIComponent(GetValue(sDecData , "CI"));               //연계정보 확인값(88byte)
      mobileno = decodeURIComponent(GetValue(sDecData , "MOBILE_NO"));        //휴대폰번호(계약된 경우)
      mobileco = decodeURIComponent(GetValue(sDecData , "MOBILE_CO"));        //통신사(계약된 경우)
    }
    

    response.render("checkplus_success.ejs", {sRtnMSG , requestnumber , responsenumber , authtype , name , birthdate , gender , nationalinfo , dupinfo , conninfo , mobileno , mobileco});
  });

});

app.get("/checkplus_success", function(request: { param: (arg0: string) => any; }, response: { render: (arg0: string, arg1: { sRtnMSG: any; requestnumber: any; authtype: any; errcode?: any; responsenumber?: string; name?: string; birthdate?: string; gender?: string; nationalinfo?: string; dupinfo?: string; conninfo?: string; mobileno?: string; mobileco?: string; }) => void; }) {
  let cmd = "";
  let sEndData:any = request.param('EncodeData')
  let requestnumber:any = null;
  let responsenumber:any = null;
  let authtype:any = null;
  let name:any = null;
  let birthdate:any = null;
  let gender:any = null;
  let nationalinfo:any = null;
  let dupinfo:any = null;
  let conninfo:any = null;
  let mobileno:any = null;
  let mobileco:any = null;

  if( /^0-9a-zA-Z+\/=/.test(sEndData) == true){
    const sRtnMSG = "입력값 오류";
    const requestnumber = "";
    const authtype = "";
    const errcode = "";
    response.render("checkplus_fail.ejs", {sRtnMSG , requestnumber , authtype , errcode});
  }

  if(sEndData != "")
  {
     cmd = sModulePath + " " + "DEC" + " " + sSiteCode + " " + sSitePW + " " + sEndData;
  }let sDecData = "";

  const child = exec(cmd , {encoding: "euc-kr"});
  child.stdout.on("data", function(data: string) {
    sDecData += data;
  });
  child.on("close", function() {let sRtnMSG = "";
    //처리 결과 확인
    if (sDecData == "-1"){
      sRtnMSG = "암/복호화 시스템 오류";
    }
    else if (sDecData == "-4"){
      sRtnMSG = "복호화 처리 오류";
    }
    else if (sDecData == "-5"){
      sRtnMSG = "HASH값 불일치 - 복호화 데이터는 리턴됨";
    }
    else if (sDecData == "-6"){
      sRtnMSG = "복호화 데이터 오류";
    }
    else if (sDecData == "-9"){
      sRtnMSG = "입력값 오류";
    }
    else if (sDecData == "-12"){
      sRtnMSG = "사이트 비밀번호 오류";
    }
    else
    {
      //항목의 설명은 개발 가이드를 참조
      requestnumber = decodeURIComponent(GetValue(sDecData , "REQ_SEQ"));     //CP요청 번호 , main에서 생성한 값을 되돌려준다. 세션등에서 비교 가능
      responsenumber = decodeURIComponent(GetValue(sDecData , "RES_SEQ"));    //고유 번호 , 나이스에서 생성한 값을 되돌려준다.
      authtype = decodeURIComponent(GetValue(sDecData , "AUTH_TYPE"));        //인증수단
      name = decodeURIComponent(GetValue(sDecData , "UTF8_NAME"));            //이름
      birthdate = decodeURIComponent(GetValue(sDecData , "BIRTHDATE"));       //생년월일(YYYYMMDD)
      gender = decodeURIComponent(GetValue(sDecData , "GENDER"));             //성별
      nationalinfo = decodeURIComponent(GetValue(sDecData , "NATIONALINFO")); //내.외국인정보
      dupinfo = decodeURIComponent(GetValue(sDecData , "DI"));                //중복가입값(64byte)
      conninfo = decodeURIComponent(GetValue(sDecData , "CI"));               //연계정보 확인값(88byte)
      mobileno = decodeURIComponent(GetValue(sDecData , "MOBILE_NO"));        //휴대폰번호(계약된 경우)
      mobileco = decodeURIComponent(GetValue(sDecData , "MOBILE_CO"));        //통신사(계약된 경우)
    }
    

    response.render("checkplus_success.ejs", {sRtnMSG , requestnumber , responsenumber , authtype , name , birthdate , gender , nationalinfo , dupinfo , conninfo , mobileno , mobileco});
  });

});

app.post("/checkplus_fail", function(request: { body: { EncodeData: any; }; }, response: { render: (arg0: string, arg1: { sRtnMSG: any; requestnumber: any; authtype: any; errcode: any; }) => void; }) {
  const sEncData = request.body.EncodeData;
  let cmd = "";
  let requestnumber:any = null;
  let authtype:any = null;
  let errcode:any = null;
  if( /^0-9a-zA-Z+\/=/.test(sEncData) == true){
    const sRtnMSG = "입력값 오류";
    const requestnumber = "";
    const authtype = "";
    const errcode = "";
    response.render("checkplus_fail.ejs", {sRtnMSG , requestnumber , authtype , errcode});
  }
  
  if(sEncData != "")
  {
     cmd = sModulePath + " " + "DEC" + " " + sSiteCode + " " + sSitePW + " " + sEncData;
  }let sDecData = "";

  const child = exec(cmd , {encoding: "euc-kr"});
  child.stdout.on("data", function(data: string) {
    sDecData += data;
  });
  child.on("close", function() {let sRtnMSG = "";
    //처리 결과 확인
    if (sDecData == "-1"){
      sRtnMSG = "암/복호화 시스템 오류";
    }
    else if (sDecData == "-4"){
      sRtnMSG = "복호화 처리 오류";
    }
    else if (sDecData == "-5"){
      sRtnMSG = "HASH값 불일치 - 복호화 데이터는 리턴됨";
    }
    else if (sDecData == "-6"){
      sRtnMSG = "복호화 데이터 오류";
    }
    else if (sDecData == "-9"){
      sRtnMSG = "입력값 오류";
    }
    else if (sDecData == "-12"){
      sRtnMSG = "사이트 비밀번호 오류";
    }
    else
    {
      //항목의 설명은 개발 가이드를 참조
      requestnumber = decodeURIComponent(GetValue(sDecData , "REQ_SEQ"));     //CP요청 번호 , main에서 생성한 값을 되돌려준다. 세션등에서 비교 가능
      authtype = decodeURIComponent(GetValue(sDecData , "AUTH_TYPE"));        //인증수단
      errcode = decodeURIComponent(GetValue(sDecData , "ERR_CODE"));          //본인인증 실패 코드
    }

    response.render("checkplus_fail.ejs", {sRtnMSG , requestnumber , authtype , errcode});
  });
});

app.get("/checkplus_fail", function(request: { param: (arg0: string) => any; }, response: { render: (arg0: string, arg1: { sRtnMSG: any; requestnumber: any; authtype: any; errcode: any; }) => void; }) {
  //chrome80 대응
  const sEncData = request.param('EncodeData')
  let requestnumber:any = null;
  let authtype:any = null;
  let errcode:any = null;
  let cmd = "";

  if( /^0-9a-zA-Z+\/=/.test(sEncData) == true){
    const sRtnMSG = "입력값 오류";
    const requestnumber = "";
    const authtype = "";
    const errcode = "";
    response.render("checkplus_fail.ejs", {sRtnMSG , requestnumber , authtype , errcode});
  }
  
  if(sEncData != "")
  {
     cmd = sModulePath + " " + "DEC" + " " + sSiteCode + " " + sSitePW + " " + sEncData;
  }let sDecData = "";

  const child = exec(cmd , {encoding: "euc-kr"});
  child.stdout.on("data", function(data: string) {
    sDecData += data;
  });
  child.on("close", function() {let sRtnMSG = "";
    //처리 결과 확인
    if (sDecData == "-1"){
      sRtnMSG = "암/복호화 시스템 오류";
    }
    else if (sDecData == "-4"){
      sRtnMSG = "복호화 처리 오류";
    }
    else if (sDecData == "-5"){
      sRtnMSG = "HASH값 불일치 - 복호화 데이터는 리턴됨";
    }
    else if (sDecData == "-6"){
      sRtnMSG = "복호화 데이터 오류";
    }
    else if (sDecData == "-9"){
      sRtnMSG = "입력값 오류";
    }
    else if (sDecData == "-12"){
      sRtnMSG = "사이트 비밀번호 오류";
    }
    else
    {
      //항목의 설명은 개발 가이드를 참조
      const requestnumber = decodeURIComponent(GetValue(sDecData , "REQ_SEQ"));     //CP요청 번호 , main에서 생성한 값을 되돌려준다. 세션등에서 비교 가능
      const authtype = decodeURIComponent(GetValue(sDecData , "AUTH_TYPE"));        //인증수단
      const errcode = decodeURIComponent(GetValue(sDecData , "ERR_CODE"));          //본인인증 실패 코드
    }

    response.render("checkplus_fail.ejs", {sRtnMSG , requestnumber , authtype , errcode});
  });
});

function GetValue(plaindata: string , key: string){
  const arrData = plaindata.split(":");
  let value = "";
  let i:any = "";
  for( i in arrData){
    const item = arrData[i];
    if(item.indexOf(key) == 0)
    {
      const valLen = parseInt(item.replace(key, ""));
      arrData[i++];
      value = arrData[i].substr(0 ,valLen);
      break;
    }
  }
  return value;
}

app.listen(port, function(err: any) {
  
  if (err) {
    return 
  }
});


// import express, { Request, Response, NextFunction } from 'express';

// const app = express();


// app.get('/welcome', (req: Request, res: Response, next: NextFunction) => {
//     res.send('welcome!');
// });

// app.listen('1234', () => {
//     
//   ################################################
//   🛡️  Server listening on port: 1234🛡️
//   ################################################
// `);
// });