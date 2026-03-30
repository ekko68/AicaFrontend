// 공고알림/ -> 선정 결과 공고 페이지
// import React from "react"
import * as styles from './styles';
import {CssBaseline,Container} from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
function AnnouncementSelectionRes() {

  return (
      <Container component="main" maxWidth="xs" css={styles.container}>
        <CssBaseline />
        <h1>선정 결과 공고 페이지</h1>
      </Container>
  );
}

export default AnnouncementSelectionRes;


/*
ROOT	ROOT	/
menu-ADM010000	사업정보관리	    /BusInformationMgt
menu-ADM010100	사업정보관리	    /BusInformationMgt/BusInformationMgt
menu-ADM010101	사업정보관리	    /BusInformationMgt/BusInformationMgt/BusInformationMgt
menu-ADM010102	기준사업정보관리	/BusInformationMgt/BusInformationMgt/StdBusInformationMgt
menu-ADM010103	기준사업분류관리	/BusInformationMgt/BusInformationMgt/StdBusClassificationMgt
menu-ADM010104	사업비비목관리	    /BusInformationMgt/BusInformationMgt/MgtOfBusExpenses
menu-ADM010200	사업현황관리	    /BusInformationMgt/BusStatusMgt
menu-ADM010201	업체현황조회	    /BusInformationMgt/BusStatusMgt/CompanyStatusInquiry

menu-ADM020000	공고/접수	        /AnnouncementReception
menu-ADM020100	공고관리	        /AnnouncementReception/NoticeMgt
menu-ADM020101	지원사업공고관리	/AnnouncementReception/NoticeMgt/SupportProNotMgt
menu-ADM020102	선정결과공고관리	/AnnouncementReception/NoticeMgt/SelResAmtMgt
menu-ADM020200	접수관리	        /AnnouncementReception/ReceptionMgt
menu-ADM020201	신청접수관리	    /AnnouncementReception/ReceptionMgt/AppReceptionMgt
menu-ADM020202	상시접수관리	    /AnnouncementReception/ReceptionMgt/RegularReceptionMgt

menu-ADM030000	평가/선정	        /EvalSelection
menu-ADM030100	평가관리	        /EvalSelection/EvalMgt
menu-ADM030101	평가표관리	        /EvalSelection/EvalMgt/EvalSheetMgt
menu-ADM030102	평가계획관리	    /EvalSelection/EvalMgt/EvalPlanMgt
menu-ADM030200	평가위원회관리	    /EvalSelection/EvalCommitteeMgt
menu-ADM030201	평가위원 추출	    /EvalSelection/EvalCommitteeMgt/SelectionOfEvaluators
menu-ADM030202	평가위원 섭외	    /EvalSelection/EvalCommitteeMgt/RecCommMem
menu-ADM030300	평가진행관리	    /EvalSelection/EvalProgressMgt
menu-ADM030301	평가진행관리	    /EvalSelection/EvalProgressMgt/EvalProgressMgt
menu-ADM030302	발표자료관리	    /EvalSelection/EvalProgressMgt/PresentationDataMgt
menu-ADM030400	선정관리	        /EvalSelection/SelectionMgt
menu-ADM030401	선정관리	        /EvalSelection/SelectionMgt/SelectionMgt
menu-ADM030402	이의신청접수관리	/EvalSelection/SelectionMgt/MgtOfObjectionApp

menu-ADM040000	협약	            /Convention
menu-ADM040100	협약체결관리	    /Convention/MgtOfContractSigning
menu-ADM040101	사업계획서접수관리	 /Convention/MgtOfContractSigning/BusPlanReceptionMgt
menu-ADM040102	전자협약관리	    /Convention/MgtOfContractSigning/ElectronicAgtMgt
menu-ADM040200	협약관리	        /Convention/ContractMgt
menu-ADM040201	협약변경관리	    /Convention/ContractMgt/AgtChangeMgt
menu-ADM040202	협약변경내역	    /Convention/ContractMgt/AgtChangeDetails
menu-ADM040203	협약해지관리	    /Convention/ContractMgt/AgtTerminationMgt

menu-ADM050000	과제관리	        /TaskMgt
menu-ADM050100	보고서관리	        /TaskMgt/ReportMgt
menu-ADM050101	중간보고서관리	    /TaskMgt/ReportMgt/InterimReportMgt
menu-ADM050102	결과보고서관리	    /TaskMgt/ReportMgt/ResultReportMgt
menu-ADM050200	정산관리	        /TaskMgt/SettlementMgt
menu-ADM050201	정산관리	        /TaskMgt/SettlementMgt/SettlementMgt

menu-ADM060000	성과관리	        /PerformanceMgt
menu-ADM060100	성과관리	        /PerformanceMgt/PerformanceMgt
menu-ADM060200	성과현황조회	    /PerformanceMgt/PerformanceStatusInquiry








menu-ADM070000	교육관리	        /EducationMgt
menu-ADM070100	교육생관리	        /EducationMgt/TraineeMgt
menu-ADM070101	교육생매칭관리	    /EducationMgt/TraineeMgt/TraineeMatchingMgt
menu-ADM070102	교육생이력관리	    /EducationMgt/TraineeMgt/TraineeHistoryMgt
menu-ADM070200	교육운영관리	    /EducationMgt/EducationOperationMgt
menu-ADM070201	교육(LMS)관리	    /EducationMgt/EducationOperationMgt/EducationLmsMgt
menu-ADM070202	교육콘텐츠(LCMS)관리	/EducationMgt/EducationOperationMgt/EducationContentLcmsMgt








menu-ADM080000	입주시설관리	    /ResidentFacilityMgt
menu-ADM080100	시설관리	        /ResidentFacilityMgt/FacilityMgt
menu-ADM080101	시설예약관리	    /ResidentFacilityMgt/FacilityMgt/FacilityReservationMgt
menu-ADM080102	입주시설정보관리	/ResidentFacilityMgt/FacilityMgt/ResidentFacInfmtMgt
menu-ADM080200	입주업체관리	    /ResidentFacilityMgt/TenantCompMgt
menu-ADM080201	입주업체성과관리	/ResidentFacilityMgt/TenantCompMgt/TenantCompPerfMgt
menu-ADM080202	입주업체관리	    /ResidentFacilityMgt/TenantCompMgt/TenantCompMgt
menu-ADM080300	입퇴실관리	        /ResidentFacilityMgt/CheckOutMgt
menu-ADM080301	입주연장신청관리	/ResidentFacilityMgt/CheckOutMgt/MoveInExeAppMgt
menu-ADM080302	퇴실신청관리	    /ResidentFacilityMgt/CheckOutMgt/CheckOutAppMgt
menu-ADM080303	입주실현황	        /ResidentFacilityMgt/CheckOutMgt/StatusOccRooms

menu-ADM090000	자원할당관리	    /ResAllMgt
menu-ADM090100	자원할당관리	    /ResAllMgt/ResAllMgt
menu-ADM090200	자원할당현황조회	/ResAllMgt/ResAllStatusInquiry
menu-ADM090300	자원할당재고관리	/ResAllMgt/ResAllInventoryMgt

menu-ADM100000	운영관리	        /OperationMgt
menu-ADM100100	전문가관리	        /OperationMgt/ExpertMgt
menu-ADM100101	전문가신청관리	    /OperationMgt/ExpertMgt/ExpertAppMgt
menu-ADM100102	전문가정보관리	    /OperationMgt/ExpertMgt/ExpertInformationMgt
menu-ADM100103	전문가현황조회	    /OperationMgt/ExpertMgt/ExpertStatusInquiry
menu-ADM100104	전문가분류관리	    /OperationMgt/ExpertMgt/ExpertClassificationMgt
menu-ADM100200	만족도조사관리	    /OperationMgt/SatisfaSurveyMgt
menu-ADM100201	만족도조사관리	    /OperationMgt/SatisfaSurveyMgt/SatisfaSurveyMgt
menu-ADM100300	참여/이벤트관리	    /OperationMgt/ParticipationEventMgt
menu-ADM100301	디딤널관리	        /OperationMgt/ParticipationEventMgt/StepMgt
menu-ADM100302	자원정보공유관리	/OperationMgt/ParticipationEventMgt/ResourceInfmtSharMgt
menu-ADM100303	행사/이벤트관리	    /OperationMgt/ParticipationEventMgt/EventEventMgt
menu-ADM100400	사이트관리	        /OperationMgt/SiteMgt
menu-ADM100401	홈팝업창관리	    /OperationMgt/SiteMgt/HomePopUpWindowMgt
menu-ADM100402	홈배너관리	        /OperationMgt/SiteMgt/HomeBannerMgt
menu-ADM100403	약관관리	        /OperationMgt/SiteMgt/TermsAndConditionsMgt
menu-ADM100500	고객지원관리	    /OperationMgt/CustomerSupportMgt
menu-ADM100501	자주묻는질문관리	/OperationMgt/CustomerSupportMgt/FrequentlyAskedQut
menu-ADM100502	사용자 매뉴얼관리	/OperationMgt/CustomerSupportMgt/UserManualMgt
menu-ADM100503	자료실관리	        /OperationMgt/CustomerSupportMgt/ArchiveMgt
menu-ADM100504	1:1문의관리	        /OperationMgt/CustomerSupportMgt/1_1InquiryMgt
menu-ADM100505	공지사항관리	    /OperationMgt/CustomerSupportMgt/NoticeMgt
menu-ADM100506	관리자공지사항관리	/OperationMgt/CustomerSupportMgt/ManagerNoticeMgt
menu-ADM100600	회원관리	        /OperationMgt/MemberMgt
menu-ADM100601	회원관리	        /OperationMgt/MemberMgt/MemberMgt
menu-ADM100700	통계/로그	        /OperationMgt/StatsLogs
menu-ADM100701	기업현황	        /OperationMgt/StatsLogs/CompanyStatus
menu-ADM100702	사용자현황	        /OperationMgt/StatsLogs/UserStatus
menu-ADM100703	사업지원현황	    /OperationMgt/StatsLogs/ProSupportStatus
menu-ADM100704	실증장비이용현황	/OperationMgt/StatsLogs/DemEquipmentUseStus
menu-ADM100705	로그현황	        /OperationMgt/StatsLogs/LogStatus

menu-ADM110000	시스템관리	        /SystemMgt
menu-ADM110100	관리자관리	        /SystemMgt/ManagerMgt
menu-ADM110101	관리자계정관리	    /SystemMgt/ManagerMgt/AdministratorAccountMgt
menu-ADM110102	메뉴관리	        /SystemMgt/ManagerMgt/MenuMgt
menu-ADM110103	프로그램관리	    /SystemMgt/ManagerMgt/ProgramMgt
menu-ADM110104	권한관리	        /SystemMgt/ManagerMgt/PermissionMgt
menu-ADM110200	게시판관리	        /SystemMgt/BulletinBoardMgt
menu-ADM110201	게시판관리	        /SystemMgt/BulletinBoardMgt/BulletinBoardMgt
menu-ADM110202	문의게시판관리	    /SystemMgt/BulletinBoardMgt/InquiryBoardMgt
menu-ADM110300	코드관리	        /SystemMgt/CodeMgt
menu-ADM110301	공통코드관리	    /SystemMgt/CodeMgt/CommonCodeMgt
menu-ADM110302	휴일관리	        /SystemMgt/CodeMgt/HolidayMgt



*/