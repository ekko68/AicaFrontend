import React, {CSSProperties} from "react"
import {Button, Modal, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import {styled} from "@mui/styles";
import {VerticalInterval} from "~/components/LayoutComponents";
import {Icons} from "~/components/IconContainer"
import {ButtonComponents} from "~/components/ButtonComponents";
import { useNavigate } from 'react-router-dom';
type ModalType = "normal" | "confirm" | "sevenday" | "sevendayBiz" | 'save';
export type ModalParam = {
  open: boolean;
  content?: string;
  type?: ModalType;
  hideBackdrop?: boolean;
  title?: string;
  isDist?: boolean;
  noButton?: boolean;
  buttonName?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  outlinedblack?: boolean;
  borderRadius?: string;
  style?: CSSProperties;
}

export const ModalComponents: React.FC<{
  children?:any
  open: boolean,
  content?: string,
  type?: ModalType,
  hideBackdrop?: boolean,
  title?: string,
  onConfirm?: (type:string) => void,
  onClose?: (type:string) => void,
  style?: CSSProperties,
}> = props => {
  const type = props.type || "normal";
  const confirmLabel = type == "normal" ? "확인" : "예";
  // const navigate = useNavigate();

  const handlerConfirm = (event: React.MouseEvent<HTMLElement>) => {
    if (props.onConfirm) props.onConfirm("handlerConfirm")
  }

  const handlerExit = (event: React.MouseEvent<HTMLElement>) => {
    if(props.title == '602' || props.title == '603' || props.title == '407'){
      if (props.onConfirm) props.onConfirm(props.title)
    } else {
      if (props.onClose) props.onClose("handlerExit")
    }
  }

  const handlerExitClose = (event: React.MouseEvent<HTMLElement>) => {
    if (props.onClose) props.onClose("handlerExit")
  }

  const handlerModalClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (props.onClose) props.onClose("handlerModalClose")
  }

  const handlerOnChange = (event: React.MouseEvent<HTMLElement>) => {
    if (props.onClose) props.onClose("handlerOnChange")
  }

  const handlerOnChangeNew = (event: React.MouseEvent<HTMLElement>) => {
    if (props.onConfirm) props.onConfirm("handlerOnChangeNew")
  }


  return <>
    <Modal
      open={props.open}
      onClose={handlerModalClose}
      hideBackdrop={props.hideBackdrop}
    >
      <ModalBoxContainer>
        <Stack justifyContent={"space-between"} flexDirection={"column"}>
          <Box style={{position:'absolute', right: 0, top: 20}}>
            <Button style={{width: "24px", height: "24px"}} onClick={handlerExit}>
              {<Icons.Exit/>}
            </Button>
          </Box>

          <Box sx={{pb: "32px"}}>
            {
              props.children ? <>
                {
                  props.title ? <h2>{props.title}</h2> : <VerticalInterval size={"40px"}/>
                }
                {props.children}
              </> : <>
                {
                  props.title ?
                    <h2 style={{textAlign: "center", marginBottom: "20px" }}>{props.title}</h2> :
                    <VerticalInterval size={"40px"}/>
                }
                <p style={{textAlign: "center"}}>{props.content}</p>
              </>
            }
          </Box>

          <Stack justifyContent={"center"} direction={"row"} spacing={"10px"}>
            {type === 'confirm' && (
              <ButtonComponents
                label={'아니오'}
                onClick={handlerExitClose}
              />
            )}
            {/* <CustomButton type={'small'} label={confirmLabel} onClick={handlerConfirm}/> */}


            {type === "normal" && <ButtonComponents label={confirmLabel} onClick={handlerConfirm}/>}
            {
              type === "confirm" && <ButtonComponents type={"primary"} label={confirmLabel} onClick={handlerExit}/>
            }
            {
              type === "sevenday" && <ButtonComponents type={"popuplinebtn"} label={"정상계정 전환하기"} onClick={handlerOnChange}/>
            }
            {(type === "sevenday") && <ButtonComponents type={"popupbtn"} label={"새로 가입하기(14세 미만 이동)"} onClick={handlerOnChangeNew}/>}
            {
              type === "sevendayBiz" && <ButtonComponents type={"popuplinebtn"} label={"정상계정 전환하기"} onClick={handlerOnChange}/>
            }
            {(type === "sevendayBiz") && <ButtonComponents type={"popupbtn"} label={"가입정보입력(사업자)"} onClick={handlerOnChangeNew}/> }

          </Stack>
        </Stack>
      </ModalBoxContainer>
    </Modal>
  </>
}

const ModalBoxContainer = styled(Box)({
  position: 'absolute',
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "480px",
  backgroundColor: "white",
  borderRadius: '20px',
  margin: "18px 220px 18px 0",
  padding: "24px",
})