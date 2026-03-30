export const intialErrorConfirmInfo = {
    errorTaskNmKo:false,
    helperTaskNmKo:"",
    errorRspnberNm:false,
    helperRspnberNm:"",
    errorMbtlnum:false,
    helperMbtlnum:"",
    errorEmail:false,
    helperEmail:"",

}

export type TypeReason = {
    reqDt:string,
    reason:string
}
export type viewType = 'BusAppMgt' | 'PresentationDataMgt' | 'Objection' | 'BusinessPlanMgt' | 'ElectronicAgtMgt' | 'AgreementChangeMgt' | 'ReportSubmission' | 'PerformanceMgt' | 'ModalResAlloc' | 'FacilityReservationMmt' | 'ReportSubmissionDetail' | 'AgreementChangeMgtDetail' | 'SubmissionMaterials' | 'ElectronicAgtMgtDetail' | 'BusinessPlanMgtDetail' | 'ObjectionApply' ;
export type modalType = "small" | "time" | "large" | "largeList" | "full" | "fullLg" | "listBack" | "frontNomal" | "wauto" | "fileBtn" | "largeListBorder" | "modalBtn" | "modalBtn2" | "formbtn" | "modify" | undefined;
export type colorType = "outlined" | "primary" | "secondary" | "outlinedblack" | "outlinedgray" | "outlinedgwhite" | "outlinedgdark" | "list" | "item" | "disabled" | undefined;