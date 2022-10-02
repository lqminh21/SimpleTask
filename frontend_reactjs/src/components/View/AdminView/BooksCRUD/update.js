import { useEffect, useMemo, useState } from "react";

import { Form, FormField } from "semantic-ui-react";
import { Modal, ModalHeader, ModalContent, ModalActions } from "semantic-ui-react"
import { Button } from "semantic-ui-react"
import { Input } from "semantic-ui-react"
import { Label } from "semantic-ui-react"

import formSchema from './FormSchema/formSchema'

import axiosBaseURL from "../../../AxiosBaseURL/axiosBaseURL";

export default function Update({bookInfo, getData, displayToast}){

    const [open, setOpen] = useState(false)

    const [book, setBook] = useState({
        bookId: bookInfo.bookId,
        title: bookInfo.title,
        category: bookInfo.category,
        author: bookInfo.author,
        publisher: bookInfo.publisher
    })

    const [inputFormErr, setInputFormErr] = useState({
        bookId: '',
        title: '',
        category: '',
        author: '',
        publisher: ''
    }) 

    const ValidateInputForm = () => {

        let {bookId, title, category, author, publisher} = book

        return formSchema.validate({bookId, title, category, author, publisher},{ abortEarly: false })

    }

    const onChangeBookId = (e) => { 
        setBook(prev => ({...prev, bookId: e.target.value})) 
    }

    const onChangeTitle = (e) => {
        setBook(prev => ({...prev, title: e.target.value}))
    }

    const onChangeCategory = (e) => {
        setBook(prev => ({...prev, category: e.target.value}))
    }

    const onChangeAuthor = (e) => {
        setBook(prev => ({...prev, author: e.target.value}))
    }

    const onChangePublisher = (e) => {
        setBook(prev => ({...prev, publisher: e.target.value}))
    }

    const putData = async () => {
        try{

            let {bookId, title, category, author, publisher} = book

            let res = await axiosBaseURL.put(`update/${bookInfo.id}`,
            {
                bookId, title, category, author, publisher
            })

            let {isErr, message} = res.data

            if(isErr)   displayToast(message,'update')
            else{
                getData()
                displayToast(message,'update')
            }
        }catch(err){
            displayToast('Update fail','update')
        }
    }

    const handleSubmit = () =>{
        const {error} = ValidateInputForm()
        if(!error){
            setOpen(false)
            putData()
        }
        else{
            error.details.map(err => {
                switch(err.path[0]){
                    case 'bookId':
                        setInputFormErr(prev => ({...prev, bookId: err.message}))
                        break
                    case 'title':
                        setInputFormErr(prev => ({...prev, title: err.message}))
                        break
                    case 'category' :
                        setInputFormErr(prev => ({...prev, category: err.message}))
                        break
                    case 'author' : 
                       setInputFormErr(prev => ({...prev, author: err.message}))
                       break
                    case 'publisher' :
                        setInputFormErr(prev => ({...prev, publisher: err.message}))
                        break
                    default:
                }
            })
        }
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
                        <Input placeholder="Enter Book Code" onChange={onChangeBookId} value = {book.bookId} />
                        {inputFormErr.bookId ? <Label>{inputFormErr.bookId}</Label> : ""}
                    </FormField>
                    <FormField>
                        <Input placeholder="Enter Title" onChange={onChangeTitle} value = {book.title}/>
                        {inputFormErr.title ? <Label>{inputFormErr.title}</Label> : ""}
                    </FormField>
                    <FormField>
                        <Input placeholder="Enter Category" onChange={onChangeCategory} value = {book.category}/>
                        {inputFormErr.category ? <Label>{inputFormErr.category}</Label> : ""}
                    </FormField>
                    <FormField>
                        <Input placeholder="Enter Author" onChange={onChangeAuthor} value = {book.author}/>
                        {inputFormErr.author ? <Label>{inputFormErr.author}</Label> : ""}
                    </FormField>
                    <FormField>
                        <Input placeholder="Enter Publisher" onChange={onChangePublisher} value = {book.publisher}/>
                        {inputFormErr.publisher ? <Label>{inputFormErr.publisher}</Label> : ""}
                    </FormField>
                </Form>
            </ModalContent>
            <ModalActions>
                <Button color="blue" onClick={handleSubmit}>Update</Button>
                <Button color="red" onClick={() => setOpen(false)}>Cancel</Button>
            </ModalActions>
        </Modal>
    )
}