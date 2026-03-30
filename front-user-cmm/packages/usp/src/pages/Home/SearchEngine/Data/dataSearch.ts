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

export const searchResultData = [
  {
    cate: 'recruit',
    name: '모집 공고',
    result: [
      {
        id: '0',
        image: '/images/main/cont02_01.png',
        pblancNm:
          '2021년도 글로벌 AI 제품·서비스 고도화 장비 지원기업 모집공고 장비 지원기업 모집공고',
        recomendCl: ['사업화'],
        rmndrDay: 30,
        rceptPd: '2021-11-21 ~ 2021-12-11 18:00',
        pblancSttus: '모집중',
        link: '/',
      },
      {
        id: '1',
        image: '/images/main/cont02_02.png',
        pblancNm:
          '11 2021년도 글로벌 AI 제품·서비스 고도화 장비 지원기업 모집공고',
        recomendCl: ['사업화'],
        rmndrDay: 30,
        rceptPd: '2021-11-21 ~ 2021-12-11 18:00',
        pblancSttus: '모집중',
        link: '/',
      },
      {
        id: '2',
        image: '/images/main/cont02_03.png',
        pblancNm:
          '22 2021년도 글로벌 AI 제품·서비스 고도화 장비 지원기업 모집공고',
        recomendCl: ['사업화'],
        rmndrDay: 30,
        rceptPd: '2021-11-21 ~ 2021-12-11 18:00',
        pblancSttus: '모집중',
        link: '/',
      },
      {
        id: '3',
        image: '/images/main/cont02_01.png',
        pblancNm:
          '2021년도 글로벌 AI 제품·서비스 고도화 장비 지원기업 모집공고 333',
        recomendCl: ['사업화'],
        rmndrDay: 30,
        rceptPd: '2021-11-21 ~ 2021-12-11 18:00',
        pblancSttus: '모집중',
        link: '/',
      },
      {
        id: '4',
        image: '/images/main/cont02_02.png',
        pblancNm:
          '2021년도 글로벌 AI 제품·서비스 고도화 장비 지원기업 모집공고 444',
        recomendCl: ['사업화'],
        rmndrDay: 30,
        rceptPd: '2021-11-21 ~ 2021-12-11 18:00',
        pblancSttus: '모집중',
        link: '/',
      },
      {
        id: '5',
        image: '/images/main/cont02_03.png',
        pblancNm:
          '2021년도 글로벌 AI 제품·서비스 고도화 장비 지원기업 모집공고',
        recomendCl: ['사업화'],
        rmndrDay: 30,
        rceptPd: '2021-11-21 ~ 2021-12-11 18:00',
        pblancSttus: '모집중',
        link: '/',
      },
      {
        id: '6',
        image: '/images/main/cont02_01.png',
        pblancNm:
          '2021년도 글로벌 AI 제품·서비스 고도화 장비 지원기업 모집공고2021년도 글로벌 AI 제품·서비스 고도화 장비 지원기업 모집공고',
        recomendCl: ['사업화'],
        rmndrDay: 30,
        rceptPd: '2021-11-21 ~ 2021-12-11 18:00',
        pblancSttus: '모집중',
        link: '/',
      },
      {
        id: '7',
        image: '/images/main/cont02_02.png',
        pblancNm:
          '2021년도 글로벌 AI 제품·서비스 고도화 장비 지원기업 모집공고 772021년도 글로벌 AI 제품·서비스 고도화 장비 지원기업 모집공고',
        recomendCl: ['사업화'],
        rmndrDay: 30,
        rceptPd: '2021-11-21 ~ 2021-12-11 18:00',
        pblancSttus: '모집중',
        link: '/',
      },
      {
        id: '8',
        image: '/images/main/cont02_03.png',
        pblancNm:
          '2021년도 글로벌 AI 제품·서비스 고도화 장비 지원기업 모집공고 88',
        recomendCl: ['사업화'],
        rmndrDay: 30,
        rceptPd: '2021-11-21 ~ 2021-12-11 18:00',
        pblancSttus: '모집중',
        link: '/',
      },
      {
        id: '9',
        image: '/images/main/cont02_01.png',
        pblancNm:
          '99 2021년도 글로벌 AI 제품·서비스 고도화 장비 지원기업 모집공고',
        recomendCl: ['사업화'],
        rmndrDay: 30,
        rceptPd: '2021-11-21 ~ 2021-12-11 18:00',
        pblancSttus: '모집중',
        link: '/',
      },
      {
        id: '10',
        image: '/images/main/cont02_02.png',
        pblancNm:
          '2021년도 글로벌 AI 제품·서비스 고도화 장비 지원기업 모집공고',
        recomendCl: ['사업화'],
        rmndrDay: 30,
        rceptPd: '2021-11-21 ~ 2021-12-11 18:00',
        pblancSttus: '모집중',
        link: '/',
      },
      {
        id: '11',
        image: '/images/main/cont02_03.png',
        pblancNm:
          '11 2021년도 글로벌 AI 제품·서비스 고도화 장비 지원기업 모집공고',
        recomendCl: ['사업화'],
        rmndrDay: 30,
        rceptPd: '2021-11-21 ~ 2021-12-11 18:00',
        pblancSttus: '모집중',
        link: '/',
      },
    ],
  },
  {
    cate: 'event',
    name: '행사/이벤트',
    result: [
      {
        eventNm:
          '장비기술혁신형 중소기업에 날개를 달다! 이노비즈 인증 기술혁신형 중소기업에 날개를 달다!',
        eventId: '0',
        eventImg: '/images/main/cont02_01.png',
        eventLink: '/',
        fmtBeginDay: '2021-11-21',
        fmtEndDay: '2021-12-11 18:00',
        readCnt: '192',
        fmtCreatedDay: '2021-11-21',
      },
      {
        eventNm:
          '기술혁신형 중소기업에 날개를 달다! 이노비즈 인증 기술혁신형 중소기업에 날개를 달다!기술혁신형 중소기업에 날개를 달다! 이노비즈 인증 기술혁신형 중소기업에 날개를 달다!',
        eventId: '1',
        eventImg: '/images/main/cont02_02.png',
        eventLink: '/',
        fmtBeginDay: '2021-11-21',
        fmtEndDay: '2021-12-11 18:00',
        readCnt: '192',
        fmtCreatedDay: '2021-11-21',
      },
      {
        eventNm:
          '기술혁신형 중소기업에 날개를 달다! 이노비즈 인증 기술혁신형 중소기업에 날개를 달다!',
        eventId: '2',
        eventImg: '/images/main/cont02_03.png',
        eventLink: '/',
        fmtBeginDay: '2021-11-21',
        fmtEndDay: '2021-12-11 18:00',
        readCnt: '192',
        fmtCreatedDay: '2021-11-21',
      },
    ],
  },
  {
    cate: 'qna',
    name: '자주묻는 질문',
    result: [
      {
        categoryCd: '지원/신청',
        title: '장비신청은 어떻게 하는 건가요?',
        link: '/',
      },
      {
        categoryCd: '장비/시설',
        title: '시설 예약과 장비 사용 신청 횟수 제한이 각각인가요?',
        link: '/',
      },
      {
        categoryCd: '가입/ 변경',
        title:
          '장비견적신청 하려면 가입을 해야지 할 수 있나요?장비견적신청 하려면 가입을 해야지 할 수 있나요?장비견적신청 하려면 가입을 해야지 할 수 있나요?장비견적신청 하려면 가입을 해야지 할 수 있나요?장비견적신청 하려면 가입을 해야지 할 수 있나요?',
        link: '/',
      },
    ],
  },
  {
    cate: 'notice',
    name: '공지사항',
    result: [
      {
        title:
          'AI 기반의 헬스케어 웨어러블 기기 관련한 업계 소식AI 기반의 헬스케어 웨어러블 기기 관련한 업계 소식AI 기반의 헬스케어 웨어러블 기기 관련한 업계 소식AI 기반의 헬스케어 웨어러블 기기 관련한 업계 소식AI 기반의 헬스케어 웨어러블 기기 관련한 업계 소식',
        article:
          '인공지능산업융합사업단에서는 인공지능 중심 산업융합 집적단지 조성사업의 일환으로 AI 직무능력 고도화 및 문제해결 능력을 갖춘 AI 실무인재 육성을 인공지능산업융합사업단에서는 인공지능 중심 산업융합 집적단지 조성사업의 일환으로 AI 직무능력 고도화 및 문제해결 능력을 갖춘 AI 실무인재 내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용인공지능산업융합사업단에서는 인공지능 중심 산업융합 집적단지 조성사업의 일환으로 AI 직무능력 고도화 및 문제해결 능력을 갖춘 AI 실무인재 육성을 인공지능산업융합사업단에서는 인공지능 중심 산업융합 집적단지 조성사업의 일환으로 AI 직무능력 고도화 및 문제해결 능력을 갖춘 AI 실무인재 내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
        date: '2021-12-02',
        readCnt: 192,
        write: 'Bluelemon',
        link: '/',
      },
      {
        title: 'OOOO 프로젝트에 함께 할 소프트엔지니어를 찾고 있습니다',
        article:
          '인공지능산업융합사업단에서는 인공지능 중심 산업융합 집적단지 조성사업의 일환으로 AI 직무능력 고도화 및 문제해결 능력을 갖춘 AI 실무인재 육성을 인공지능산업융합사업단에서는 인공지능 중심 산업융합 집적단지 조성사업의 일환으로 AI 직무능력 고도화 및 문제해결 능력을 갖춘 AI 실무인재 내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용인공지능산업융합사업단에서는 인공지능 중심 산업융합 집적단지 조성사업의 일환으로 AI 직무능력 고도화 및 문제해결 능력을 갖춘 AI 실무인재 육성을 인공지능산업융합사업단에서는 인공지능 중심 산업융합 집적단지 조성사업의 일환으로 AI 직무능력 고도화 및 문제해결 능력을 갖춘 AI 실무인재 내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
        date: '2021-12-02',
        readCnt: 192,
        write: 'Bluelemon',
        link: '/',
      },
      {
        title: '2021년도 글로벌 AI 제품·서비스고도화 지원기업 모집공고',
        article:
          '인공지능산업융합사업단에서는 인공지능 중심 산업융합 집적단지 조성사업의 일환으로 AI 직무능력 고도화 및 문제해결 능력을 갖춘 AI 실무인재 육성을 인공지능산업융합사업단에서는 인공지능 중심 산업융합 집적단지 조성사업의 일환으로 AI 직무능력 고도화 및 문제해결 능력을 갖춘 AI 실무인재 내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용인공지능산업융합사업단에서는 인공지능 중심 산업융합 집적단지 조성사업의 일환으로 AI 직무능력 고도화 및 문제해결 능력을 갖춘 AI 실무인재 육성을 인공지능산업융합사업단에서는 인공지능 중심 산업융합 집적단지 조성사업의 일환으로 AI 직무능력 고도화 및 문제해결 능력을 갖춘 AI 실무인재 내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
        date: '2021-12-02',
        readCnt: 192,
        write: 'Bluelemon',
        link: '/',
      },
    ],
  },
];
