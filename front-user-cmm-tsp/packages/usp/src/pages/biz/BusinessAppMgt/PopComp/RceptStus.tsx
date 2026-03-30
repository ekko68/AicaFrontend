import React,{useEffect,useState} from "react";

/*
  공통: 접수상태 관리
  작성자: navycui
*/
const RceptStus:React.FC<{
  stus:string
  children?: React.ReactNode
}> = (props) =>  {
  const [colors,setColors] = useState('')

  useEffect(() => {
    if(!!props.stus){
      switch (props.stus) {
        case '임시저장' || '제출':
          setColors('purple')
        break;
        case '신청' || '승인' || '서명완료' || '제출요청' || '예약신청' || '접수':
          setColors('blue')
        break;      
        case '보완요청' || '심의완료' || '서명요청':
          setColors('green')
        break;
        case '반려':
          setColors('red')
        break;
        case '접수완료' || '제출' || '협약완료' || '예약확정' || '답변완료':
          setColors('black')
        break;
        case '신청취소' || '미제출' || '협약해지' || '예약취소':
          setColors('gray')
        break;     
        default:
          setColors('gray')
          break;
      }
    }
  }, []);

return (    
    <>
      <div className={`right_tag ` + colors}>
        <em>{props.stus ? props.stus : ''}</em>
      </div>
    </>
  )
}

export default RceptStus;
