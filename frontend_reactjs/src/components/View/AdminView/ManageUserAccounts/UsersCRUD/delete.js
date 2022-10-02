import { useState } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalContent, ModalActions } from "semantic-ui-react";
import axiosBaseURL from "../../../../AxiosBaseURL/axiosBaseURL";

export default function Delete({user, getData}){
    const [open, setOpen] = useState(false)

    const deleteData = async () => {
        await axiosBaseURL.delete(`manageUserAccounts/delete/${user.id}`)
        getData()
    }

    const handleSubmit = async () =>{
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