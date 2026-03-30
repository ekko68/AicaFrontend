export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const mainKeyword = [
  {
    id: 0,
    keyword: [
      'AI융합프로젝트',
      '데이터바우처 지원사업',
      '혁신창업리그',
      '광주AI창업캠프',
      'AI융합프로젝트',
      '데이터바우처 지원사업',
      '혁신창업리그',
      '광주AI창업캠프',
      '혁신창업리그',
      '광주AI창업캠프',
    ],
  },
  {
    id: 1,
    keyword: [
      '실증장비',
      '장비사용 견적요청',
      '장비사용신청',
      '장비사용신청',
      '장비사용신청',
      '실증장비',
      '장비사용 견적요청',
      '장비사용신청',
      '장비사용신청',
      '장비사용신청',
    ],
  },
];

// 최신검색어 (최대 5개)
export const searchKeywordsNew = [
  '장비사용신청',
  '장비사용견적요청',
  '장비사용관리',
  '자원 할당 관리',
  '자주 묻는 질문',
];

// 연관 검색어
export const searchKeywordsRelation = [
  '장비사용신청',
  '장비사용견적요청',
  '장비사용관리',
  '장비안내',
  '통합관리 장비',
  '건강관리 키트 장비',
];

// 인기 검색어
export const searchKeywordsPopular = [
  'AI융합프로젝트',
  '데이터바우처 지원사업',
  '혁신창업리그',
  '광주AI창업캠프',
];

export const searchResultInfo = {
  keyword: ['장비', '글로벌'],
  total: 35,
};

export const searchTabsData = [
  {
    id: 0,
    name: '전체',
    total: 35,
    data: [],
  },
  {
    id: 1,
    name: '사용자지원',
    total: 10,
    data: [],
  },
  {
    id: 2,
    name: '실증지원',
    total: 12,
    data: [],
  },
  {
    id: 3,
    name: '데이터유통',
    total: 8,
    data: [],
  },
  {
    id: 4,
    name: '안심구역',
    total: 5,
    data: [],
  },
];

export const filterKeywords1 = [
  { code: 'filter1-1', codeNm: '전체' },
  { code: 'filter1-2', codeNm: '제목' },
  { code: 'filter1-3', codeNm: '내용' },
];
export const filterKeywords2 = [
  { code: 'filter2-1', codeNm: '정확도순' },
  { code: 'filter2-2', codeNm: '최신순' },
];
export const filterKeywords3 = [
  { code: 'filter3-1', codeNm: '전체' },
  { code: 'filter3-2', codeNm: '오늘' },
  { code: 'filter3-3', codeNm: '한달' },
  { code: 'filter3-4', codeNm: '일년' },
];
