/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import dayjs from 'dayjs';
import DatePicker from '~/components/DatePicker';

export default function SearchDatePicker(props: any) {
  const { quests, setQuests } = props;

  return (
    <>
      <DatePicker
        pickerType="two"
        questBeginDay={dayjs(quests.srchBeginDay, 'YYYYMMDD').toString()}
        questEndDay={dayjs(quests.srchEndDay, 'YYYYMMDD').toString()}
        changeStart={(startNewTime: Date | null) => {
          setQuests((prevState: any) => ({
            ...prevState,
            srchBeginDay: dayjs(startNewTime).format('YYYYMMDD').toString(),
          }));
        }}
        changeEnd={(endNewTime: Date | null) => {
          setQuests((prevState: any) => ({
            ...prevState,
            srchEndDay: dayjs(endNewTime).format('YYYYMMDD').toString(),
          }));
        }}
      />
    </>
  );
}
