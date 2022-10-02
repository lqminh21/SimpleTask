import { useState } from "react";
import axios from "axios";

import { Form, FormField } from "semantic-ui-react";
import { Modal, ModalHeader, ModalContent, ModalActions } from "semantic-ui-react"
import { Button } from "semantic-ui-react"
import { Input } from "semantic-ui-react"
import axiosBaseURL from "../../../../AxiosBaseURL/axiosBaseURL";

export default function Update({user,getData}){

    const [open, setOpen] = useState(false)

    const [username, setUsername] = useState(user.username)
    const [password, setPassword] = useState(user.password)
    const [email, setEmail] = useState(user.email)

    const putData = async () => {
        await axiosBaseURL.put(`manageUserAccounts/update/${user.id}`,
        {
            username, password, email
        })
        getData()
    }

    const handleSubmit = () =>{
        setOpen(false)
        putData()
    }

    return(
        <Modal
            closeIcon
            open={open}
            trigger={<Button icon="edit" inverted={true} color="blue"></Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <ModalHeader>Update Form</ModalHeader>
            <ModalContent>
                <Form>
                <FormField>
                        <Input placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} value = {username} />
                    </FormField>
                    <FormField>
                        <Input placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} value = {password}/>
                    </FormField>
                    <FormField>
                        <Input placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} value = {email}/>
                    </FormField>
                </Form>
            </ModalContent>
            <ModalActions>
                <Button color="red" onClick={handleSubmit}>Update</Button>
                <Button color="green" onClick={() => setOpen(false)}>Cancel</Button>
            </ModalActions>
        </Modal>
    )
}