import { useMemo, useRef, useState } from "react";
import Joi from "joi";
import axios from "axios";


import axiosBaseURL from "../../../AxiosBaseURL/axiosBaseURL";

import { Button, ButtonContent, Icon,Message,Grid, GridColumn, Modal, ModalActions, ModalContent, ModalHeader, Segment, Label } from "semantic-ui-react";
import { Form, FormField}  from "semantic-ui-react"
import { Input }  from "semantic-ui-react"

import processUpload from "./UploadImage/processUpload";
import formSchema from './FormSchema/formSchema'

import { Image } from "semantic-ui-react"

const imageSchema = Joi.object({
    name: Joi.string().required(),
    size: Joi.number().integer().max(100000).required(),
    type: Joi.string().valid('image/gif', 'image/jpeg', 'image/pjpeg', 'image/jpg', 'image/x-png', 'image/png'),
})

export default function Create ({getData, displayToast }) {

    // let token = window.localStorage.getItem('token')
    const [open, setOpen] = useState(false)

    const [bookInfo, setBookInfo] = useState({
        bookId: '',
        title: '',
        category: '',
        author: '',
        publisher: ''
    })

    const [inputFormErr, setInputFormErr] = useState({
        bookId: '',
        title: '',
        category: '',
        author: '',
        publisher: ''
    }) 

    const [errImageInput, setErrImageInput] = useState('')

    const [base64Code, setBase64Code] = useState('')
    let imageName = useRef('')
    let imageType = useRef('')



    const ValidateInputForm = () => {

        let {bookId, title, category, author, publisher} = bookInfo

        return formSchema.validate({bookId, title, category, author, publisher},{ abortEarly: false })

    }
    
    
    const uploadImage = async (e) => {
        try{
            const file = e.target.files[0]
            // setFile(file)
            const {name, size, type, base64} = await processUpload(file)
            imageName.current = name
            imageType.current = type
            setBase64Code(base64)

            const {error} = imageSchema.validate({name, size, type})

            if(error){
                switch (error.details[0].context.key){
                    case 'name':
                        setErrImageInput(error.details[0].message)
                        setBase64Code("")
                        break
                    case 'size':
                        setErrImageInput(error.details[0].message)
                        setBase64Code("")
                        break
                    case 'type':
                        setErrImageInput(error.details[0].message)
                        setBase64Code("")
                        break
                    default:
                        setErrImageInput("An unknown error occurred")
                        setBase64Code("")
                        break
                }
            }
            
        }catch(err){
            console.log(err)
        }
    }

    const deleteImage = async () => {
        try{
            await axiosBaseURL.delete(`/deleteImage/${bookInfo.id}`)
            setBase64Code('')
        }catch(err){
            throw err
        }
    }

    const postCreateData = async () => {
        try{
            // let {bookId, title, category, author, publisher} = bookInfo
            // let token = window.localStorage.getItem('token')
            // const options = {
            //     method: 'POST',
            //     headers: {
            //         authorization: 'Bearer ' + token,
            //         'Content-Type': 'application/json' 
            //       },
            //     body: {
            //         bookId, title, category, author, publisher,
            //         imageName: imageName.current,
            //         imageType: imageType.current,
            //         base64Code: base64Code,
            //     },
            // }
            // let res = await fetch('http://localhost:8080/add', options)

            let {bookId, title, category, author, publisher} = bookInfo

            let res = await axiosBaseURL.post('/add',{

                bookId, title, category, author, publisher,

                imageName: imageName.current,
                imageType: imageType.current,
                base64Code: base64Code,
                time: new Date()
            })

            let {isErr, message} = res.data

            if(isErr)   displayToast(message, 'create')
            else{
                getData()
                displayToast(message, 'create')

                setBookInfo({
                    bookId: '',
                    title: '',
                    category: '',
                    author: '',
                    publisher: ''
                })
                setBase64Code('')
            }
            
        }catch(err){
            displayToast(err.response.data.message.details[0].message,'create')
            
        }
    }


    const onChangeBookId = (e) => { 
        setBookInfo(prev => ({...prev, bookId: e.target.value})) 
    }

    const onChangeTitle = (e) => {
        setBookInfo(prev => ({...prev, title: e.target.value}))
    }
    const onChangeCategory = (e) => {
        setBookInfo(prev => ({...prev, category: e.target.value}))
    }
    const onChangeAuthor = (e) => {
        setBookInfo(prev => ({...prev, author: e.target.value}))
    }
    const onChangePublisher = (e) => {
        setBookInfo(prev => ({...prev, publisher: e.target.value}))
    }
    
    const handleOnchange = (e) => {
        uploadImage(e)
    }

    const handleSubmit = async (e) =>{
        const {error} = ValidateInputForm()
        if(!error){
            await postCreateData()
            setOpen(false)
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

        // postCreateData()
        // setOpen(false)
    }

    return(
        <Modal
            closeIcon
            open = {open}
            trigger = {<Button 
                            icon="plus" 
                            inverted
                            color="green"
                        ></Button>}
            onClose = {() => setOpen(false)}
            onOpen = {() => setOpen(true)}
        >
            <ModalHeader>Create Form</ModalHeader>
            <ModalContent>
                <Grid columns={3}>
                    <GridColumn width={1}>                           
                        {base64Code ? 
                            <Button 
                                floated="left"
                                size="small"
                                icon='trash'
                                inverted={true} 
                                        
                                color="red" 
                                onClick={() => setBase64Code('')}
                            /> : ''                           
                         }
                        </GridColumn>
                    <GridColumn width={4}>
                    <Form style={{height: '300px'}}>
                        {/* <label>File input & upload </label> */}
                        {base64Code ? 
                            <FormField>
                                <Image 
                                    style={{height: 300, width:200}} 
                                    src={base64Code}
                                ></Image>
                            </FormField> :
                            
                            <FormField style={{padding: '50px'}}>
                                {errImageInput ? <Message>{errImageInput}</Message> : ''}
                                <Button as="label" htmlFor="file" type="button" animated="fade">
                                    <ButtonContent visible>
                                        <Icon name="file" />
                                    </ButtonContent>
                                    <ButtonContent hidden>Choose a File</ButtonContent>
                                </Button>
                                    <input
                                        type="file"
                                        id="file"
                                        accept="image/*"
                                        hidden
                                        onChange={handleOnchange}
                                    />
                            </FormField>
                        }
                
                    </Form>
                    </GridColumn>
                    <GridColumn>
                        <Segment>
                        <Form>
                            <FormField>
                                <Input placeholder="Enter Book Code" onChange={onChangeBookId} value = {bookInfo.bookId} />
                                {inputFormErr.bookId ? <Label>{inputFormErr.bookId}</Label> : ""}
                            </FormField>
                            <FormField>
                                <Input placeholder="Enter Title" onChange={onChangeTitle} value = {bookInfo.title}/>
                                {inputFormErr.title ? <Label>{inputFormErr.title}</Label> : ""}
                            </FormField>
                            <FormField>
                                <Input placeholder="Enter Category" onChange={onChangeCategory} value = {bookInfo.category}/>
                                {inputFormErr.category ? <Label>{inputFormErr.category}</Label> : ""}
                            </FormField>
                            <FormField>
                                <Input placeholder="Enter Author" onChange={onChangeAuthor} value = {bookInfo.author}/>
                                {inputFormErr.author ? <Label>{inputFormErr.author}</Label> : ""}
                            </FormField>
                            <FormField>
                                <Input placeholder="Enter Publisher" onChange={onChangePublisher} value = {bookInfo.publisher}/>
                                {inputFormErr.publisher ? <Label>{inputFormErr.publisher}</Label> : ""}
                            </FormField>
                        </Form>
                        </Segment>
                    </GridColumn>
                </Grid>
            </ModalContent>
            <ModalActions>
                <Button color="green" onClick={handleSubmit}>Add</Button>
                <Button color="blue" onClick={() => setOpen(false)}>Cancel</Button>
            </ModalActions>
        </Modal>
    )
}


// const emptyString = () => {
//     bookIdErr.current = '',
//     titleErr.current = '',
//     categoryErr.current = '',
//     authorErr.current = '',
//     publisherErr.current = ''
// }