import { useState } from "react";
import axios from "axios";

import axiosBaseURL from "../../../../AxiosBaseURL/axiosBaseURL";

import { Button, Modal, ModalActions, ModalContent, ModalHeader } from "semantic-ui-react";
import { Form, FormField}  from "semantic-ui-react"
import { Input }  from "semantic-ui-react"

export default function Create ({getData}) {

    const [open, setOpen] = useState(false)

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()

    const createData = async () => {
        let token = window.localStorage.getItem('token')
        await axiosBaseURL.post('manageUserAccounts/add',
        {
            username, password, email
        })
        getData()
    }

    const handleSubmit = () =>{
        setOpen(false)
        createData()
    }

    return(
        <Modal
            closeIcon
            open = {open}
            trigger = {<Button icon="book plus" inverted={true} color="green"></Button>}
            onClose = {() => setOpen(false)}
            onOpen = {() => setOpen(true)}
        >
            <ModalHeader>Create Form</ModalHeader>
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
                <Button color="green" onClick={handleSubmit}>Add</Button>
                <Button color="blue" onClick={() => setOpen(false)}>Cancel</Button>
            </ModalActions>
        </Modal>
    )
}