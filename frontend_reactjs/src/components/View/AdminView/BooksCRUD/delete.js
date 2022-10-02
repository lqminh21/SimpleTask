import { useEffect, useState } from "react";

import { Button, Modal, ModalHeader, ModalContent, ModalActions } from "semantic-ui-react";
import axiosBaseURL from "../../../AxiosBaseURL/axiosBaseURL";


export default function Delete({bookInfo, getData, displayToast}){
    const [open, setOpen] = useState(false)

    const deleteData = async () => {
        try{
            let res = await axiosBaseURL.delete(`/delete/${bookInfo.id}`)
            
            let {isErr, message} = res.data

            if(isErr) displayToast(message,'delete')
            else{
                displayToast(message,'delete')
                getData()
            }
        }catch(err){
            displayToast(err,'delete')
        }
    }

    const handleSubmit = async (e) =>{
        setOpen(false)
        deleteData()
    }

    return(
        <Modal
            closeIcon
            open={open}
            trigger={<Button icon="trash" inverted={true} color="red"></Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            
            <ModalHeader>Delete Form</ModalHeader>
            <ModalContent>Do you want delete this ?</ModalContent>
            <ModalActions>
                <Button color="red" onClick={handleSubmit}>Delete</Button>
                <Button color="green" onClick={() => setOpen(false)}>Cancel</Button>
            </ModalActions>
        </Modal>
    )
}