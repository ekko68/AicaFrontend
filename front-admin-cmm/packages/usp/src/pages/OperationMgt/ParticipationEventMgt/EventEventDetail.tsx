import {TitleContents} from "~/../../shared/src/components/LayoutComponents"
import {EventEventInfo} from "~/pages/OperationMgt/ParticipationEventMgt/Detail/EventEventInfo";

const EventEventDetail = () => {
  return <TitleContents title={'행사/이벤트 상세'}>
    <EventEventInfo/>
  </TitleContents>
}

export default EventEventDetail