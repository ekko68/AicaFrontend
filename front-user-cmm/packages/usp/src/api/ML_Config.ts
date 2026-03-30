import { useState, useEffect } from "react";
import $ from 'jquery'

const cpUrl = window.location.port != ""?window.location.hostname+":"+window.location.port:window.location.hostname;
const mlMainUrl = window.location.protocol+"//"+( window.location.port != ""?window.location.hostname+":"+window.location.port:window.location.hostname );
const mlDirPath = "/MagicLine4Web/ML4Web/";
const childHtml = "Child.html";

export const useScript = (src:string) => {
    // Keep track of script status ("idle", "loading", "ready", "error")
    const [status, setStatus] = useState(src ? "loading" : "idle");
    useEffect(
        () => {
            
            // Allow falsy src value if waiting on other data needed for
            // constructing the script URL passed to this hook.
            if (!src) {
                setStatus("idle");
                return;
            }

            // Fetch existing script element by src
            // It may have been added by another intance of this hook
            let script:any = document.querySelector(`script[src="${src}"]`);

            if (!script) {
                // Create script
                script = document.createElement("script");
                script.src = src;
                script.async = true;
                script.setAttribute("data-status", "loading");
                // Add script to document body
                document.body.appendChild(script);

                // Store status in attribute on script
                // This can be read by other instances of this hook
                const setAttributeFromEvent = (event:any) => {
                    script.setAttribute(
                        "data-status",
                        event.type === "load" ? "ready" : "error"
                    );
                };

                script.addEventListener("load", setAttributeFromEvent);
                script.addEventListener("error", setAttributeFromEvent);
            } else {
                // Grab existing script status from attribute and set to state.
                setStatus(script.getAttribute("data-status"));
            }

            // Script event handler to update status in state
            // Note: Even if the script already exists we still need to add
            // event handlers to update the state for *this* hook instance.
            const setStateFromEvent = (event:any) => {
                setStatus(event.type === "load" ? "ready" : "error");
            };

            // Add event listeners
            script.addEventListener("load", setStateFromEvent);
            script.addEventListener("error", setStateFromEvent);

            // Remove event listeners on cleanup
            return () => {
                if (script) {
                    script.removeEventListener("load", setStateFromEvent);
                    script.removeEventListener("error", setStateFromEvent);
                }
            };
        },
        [src] // Only re-run effect if script src changes
    );

    return status;
}
export const MagiclineApi = (src:string) =>{
	const callback:any ="";
	const defaultOptions = {
        sign:{signType:"MakeSignData",msg:"",messageType:"",signOpt:{ds_pki_sign:['OPT_USE_CONTNET_INFO'], ds_pki_rsa:'rsa15', ds_pki_hash:'sha256',ds_msg_decode:"false",ds_pki_sign_type:"signeddata"}},
        signPdfOpt:{ds_pki_sign:['OPT_USE_CONTNET_INFO','OPT_USE_PKCS7','OPT_NO_CONTENT','OPT_HASHED_CONTENT'], ds_pki_rsa:'rsa15', ds_pki_hash:'sha256',ds_msg_decode:"true"},
        encOpt:{ds_pki_rsa:'rsa15'},
        signedenvOpt:{ds_pki_sign:['OPT_USE_CONTNET_INFO'], ds_pki_rsa:'rsa15', ds_pki_algo:'SEED-CBC'},
        // 추가
        idn : "",
        vidType : "",
        certOidfilter:"", //1.2.410.100001.2.2.1,1.2.410.200005.1.1.4
        certExpirefilter:true, //false:만료 인증서 보여주기, true:보여주지 않기
        //mrs2 옵션 설정
        saveStorageList : ["web","hdd"],
        exportStorageList : ["web", "hdd"],
        exportStorageSelect : "web",
        browser_notice_show	: false,
        //특허청 전자서명 옵션
        kipoSignOpt:{signType:"MakeSignData",msg:"",messageType:"",signOpt:{ds_pki_sign:['OPT_USE_CONTNET_INFO', 'OPT_HASHED_CONTENT'], ds_pki_rsa:'rsa15', ds_pki_hash:'sha256',ds_msg_decode:"hash",ds_pki_sign_type:"signeddata"}},
	}
    	/**
	 * send 할 메시지를 생성
	 */
	const MakeRequestJsonMessage = ( functionName:string, functionParameter:any, option:any ) => {
		var temp = 
			{
				"funcName" : functionName,
				"funcParam" : functionParameter
			}
		return JSON.stringify( temp );
	}
	
	/**
	 * SignedData
	 */
//      const MakeSignData = ( msg;string , signOpt:any, callback:any ) => {
		
// 		magiclineApi.callback = callback;
// 		var param = defaultOptions.sign;
// 		param.signType = "MakeSignData";
		
// 		// Param Mapping
// 		if( msg!=null && typeof(msg)!='undefined' && msg!='' ){
// 			param.msg = msg;
// 		}
		
// 		// 본인확인 (IDN) 입력시 서명 원문 맵핑
// //		if(msg instanceof HTMLFormElement){
// 		if(typeof(msg) == 'object' && typeof(msg.signData) != "undefined"){
// 			//param.msg = msg.signData.value;
			
// 			if(typeof(msg.signData.length) != "undefined"){
// 				param.msg = new Array();
// 				for(var i = 0; i < msg.signData.length; i++){
// 					param.msg[i] = msg.signData[i].value;
// 				}
// 			}else{
// 				param.msg = msg.signData.value;
// 			}
// 		}
		
// 		if(msg.idn != null && msg.idn != ""){
// 			param.idn = msg.idn.value;
// 		}
		
// 		if(msg.vidType != null && msg.vidType != ""){
// 			param.vidType = msg.vidType.value;							
// 		}
		
// 		param.signOpt.ds_pki_sign_type = "signeddata";
// 		param.signOpt.cert_filter_expire = defaultOptions.certExpirefilter;
// 		param.signOpt.cert_filter_oid = defaultOptions.certOidfilter;

// 		param.certOidfilter = defaultOptions.certOidfilter;
// 		param.certExpirefilter = defaultOptions.certExpirefilter;
		
// 		var funcName = param.signType;
// 		var option = null;
		
// 		var request = MakeRequestJsonMessage(funcName, param, option );
		
// 		addEventLisner( callback );
// 		ML_sendPostMessage( request );
// 	}



    return defaultOptions;
}