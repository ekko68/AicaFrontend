import { useState } from 'react';
import { ModalComponents } from '~/components/ModalComponents';

export const CommonModal = (open:boolean, error:string)=> {
    const [open1, setOpen] = useState(open);

    return (      
    <ModalComponents open={open} type={'normal'} content={error} 
    onConfirm={() => { setOpen(false) }} 
    onClose={() => { setOpen(false)}}>
    </ModalComponents>
  )
  }