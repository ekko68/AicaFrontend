import {useGlobalModalStore} from "~/store/GlobalModalStore";
import {ModalComponents} from "shared/components/ModalComponents";

export const GlobalModals = () => {
  const store = useGlobalModalStore()
  if (store.modal.length == 0) return <div/>

  const lastModal = store.modal[store.modal.length - 1];
  return <ModalComponents
    {...lastModal}
    onClose={() => {
      store.closeModal(lastModal)
      if (lastModal.onClose) lastModal.onClose();
    }}
    onConfirm={() => {
      store.closeModal(lastModal)
      if (lastModal.onConfirm) lastModal.onConfirm();
    }}
  />
}