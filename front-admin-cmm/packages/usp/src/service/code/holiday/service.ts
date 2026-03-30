export interface HolidaysQuery {
  year: string;
  ymdNm?: string;
}

export interface Summary {
  ym: string;
  totalDayCnt: number;
  saturdayCnt: number;
  sundayCnt: number;
  holidayCnt: number;
  dsgnHolidayCnt: number;
  exclHolidayCnt: number;
  workingDayCnt: number;
}

export interface Holiday {
  ymd: string;
  ymdNm: string;
  userDsgn: boolean;
}

export interface ExclHoliday {
  ymd: string;
  ymdNm: string;
  exclReason: string;
}
