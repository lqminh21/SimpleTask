import { memo, useEffect, useState } from "react";
import axios from "axios";

import axiosBaseURL from "../../../AxiosBaseURL/axiosBaseURL";

import { Divider, Feed, Header, Label, List, Modal, ModalActions, ModalContent, ModalHeader } from "semantic-ui-react";
import { Table, TableHeaderCell, TableCell, TableHeader, TableRow, TableBody } from "semantic-ui-react"
import {Grid, GridColumn, GridRow} from "semantic-ui-react"
import { Form, FormField, FormTextArea, FormButton} from "semantic-ui-react"
import {Comment, CommentContent, CommentAuthor, CommentMetadata, CommentText} from "semantic-ui-react"
import { Button } from "semantic-ui-react"
import { Transition } from "semantic-ui-react";
import { Segment }  from "semantic-ui-react"
import { Image } from "semantic-ui-react"

import UploadImage from "./UploadImage/uploadImage";

function Display ({bookInfo, displayToast}) {

    const [description, setDescription] = useState(bookInfo.description ? bookInfo.description : "")
    const [comment, setComment] = useState("")
    const [listReview, setListReview] = useState([])

    const [base64Image, setBase64Image] = useState("")

    const [openModal, setOpenModal] = useState(false)
    const [openTextAreaDescription, setOpenTextAreaDescription] = useState(false)
    const [openTextAreaComment, setOpenTextAreaComment] = useState(false)

    const [role, setRole] = useState(localStorage.getItem('role') === 'admin' ? true : false)

    const getDescription = async () => {
        try{
            let res = await axiosBaseURL.get(`description/${bookInfo.id}`)
            let result = res.data[0].description
            setDescription(result)
        }catch(err){
            throw err
        }
    }
    
    const putUpdateDescription = async () => {
        await axiosBaseURL.put(`/description/update/${bookInfo.id}`,{
            description
        })
    }

    const getComment = async () => {
        try{
            let res = await axiosBaseURL.get(`/comment/${bookInfo.bookId}`)
            setListReview(res.data.map(review => ({
                summary: review.username,
                date: review.date,
                extraText: review.comment
            })))
        }catch(err){
            throw err
        }
    }

    const postComment = async () => {
        try{
            let res = await axiosBaseURL.post(`/comment/update/${bookInfo.bookId}`,{
                username: localStorage.getItem("username"), 
                comment, 
                bookId: bookInfo.bookId, 
                date: new Date()
            })
            let commentInfo = res.data
            getComment()
            // setListReview(prev => [...prev,{
            //     username: commentInfo.username,
            //     bookId: commentInfo.bookId,
            //     comment: commentInfo.comment,
            //     date: commentInfo.date
            // }])
        }catch(err){
            throw err
        }
    }


    const getImage = async () => {
        try{
            let res = await axiosBaseURL.get(`/image/${bookInfo.id}`)
            setBase64Image(res.data)
        }catch(err){
            throw err
        }
    }

    const deleteImage = async () => {
        try{
            let res = await axiosBaseURL.delete(`/deleteImage/${bookInfo.id}`)

            let { message } = res.data
            displayToast(message)
        }catch(err){
            throw err
        }
    }

    const handleSubmitDescription = () =>{
        setOpenTextAreaDescription(false)
        putUpdateDescription()
    }

    const handleSubmitComment = () => {
        setOpenTextAreaComment(false)
        postComment()
        getComment()
    }

    const handleDeleteImage = () => {
        setBase64Image('')
        deleteImage()
    }

    const handleDisplayView = () => {
        getImage()
        getComment()
        getDescription()
    }

    // useEffect(() => {
    //     getComment()
    //     getDescription()
    // },[])
    
    // console.log("display rerender")

    return(
        <Modal
            closeIcon
            open = {openModal}
            trigger = {<Button onClick={handleDisplayView} icon="eye" inverted={true} color="green"></Button>}
            
            onClose = {() => setOpenModal(false)}
            onOpen = {() => setOpenModal(true)}
        >
            <ModalHeader></ModalHeader>
            <ModalContent scrolling>
                <Grid columns={3} >
                    <GridRow>
                        <GridColumn width={1}>
                            {
                                role ?                             
                                <Button 
                                    floated="left"
                                    size="small"
                                    icon='trash'
                                    inverted={true} 
                                    
                                    color="red" 
                                    onClick={handleDeleteImage}
                                /> : ""
                            }
                        </GridColumn>
                        <GridColumn width={5}>
                            <GridRow>
                                <GridColumn>
                                    {
                                        role ? (
                                            base64Image ? 
                                            <>
                                                <Image 
                                                    // label={{ as: 'a', corner: 'left', icon: 'delete', onClick: {handleDeleteImage}}}
                                                    style={{height: 250, width:200}} 
                                                    src={base64Image}
                                                ></Image>
                                            </>:
                                            <UploadImage bookInfo={bookInfo} setBase64Image={setBase64Image} displayToast={displayToast}/>
                                        ) : 
                                        <Image 
                                            // label={{ as: 'a', corner: 'left', icon: 'delete', onClick: {handleDeleteImage}}}
                                            style={{height: 250, width:200}} 
                                            src={base64Image ? base64Image : ''}
                                        ></Image>
                                    }  
                                </GridColumn>
                            </GridRow>
                        <GridRow>
                                <Table size="small">
                                    <TableRow>
                                        <Header style={{marginTop: 10}}>Book Infomation</Header>
                                    </TableRow>
                                    <TableRow>
                                        <TableHeaderCell>No</TableHeaderCell>
                                        <TableCell>{bookInfo.id}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHeaderCell>Book Code</TableHeaderCell>
                                        <TableCell>{bookInfo.bookId}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHeaderCell>Title</TableHeaderCell>
                                        <TableCell>{bookInfo.title}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHeaderCell>Category</TableHeaderCell>
                                        <TableCell>{bookInfo.category}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHeaderCell>Author</TableHeaderCell>
                                        <TableCell>{bookInfo.author}</TableCell>
                                    </TableRow> 
                                    <TableRow>
                                        <TableHeaderCell>Publisher</TableHeaderCell>
                                        <TableCell>{bookInfo.publisher}</TableCell>
                                    </TableRow>
                                </Table>
                    </GridRow>
                        </GridColumn>
                        <GridColumn width={10}>
                            <GridRow>
                                <Label as='a' size="large" color='green' ribbon>Description</Label>
                                {role ? 
                                <Button
                                    icon='edit' 
                                    size='tiny'
                                    inverted={true} 
                                    
                                    color="green"
                                    onClick={() => setOpenTextAreaDescription(!openTextAreaDescription)} 
                                ></Button> : ""}
                            </GridRow>
                            <GridRow stretched>
                                <Transition visible={openTextAreaDescription} animation='scale' duration={500}>
                                    <Form>
                                        <FormTextArea value={description} onChange={(e) => setDescription(e.target.value)}></FormTextArea>
                                        <FormButton onClick={handleSubmitDescription}>Submit</FormButton>
                                    </Form>
                                </Transition>
                            </GridRow>
                            <GridRow stretched>
                                <Transition visible={!openTextAreaDescription} animation='scale' duration={500}>
                                    <Segment>
                                    <Form style={{height: 200}}>
                                        <FormField>{description}</FormField>
                                    </Form>
                                    </Segment>

                                </Transition>
                            </GridRow>
                            <GridRow>
                                <Button icon='comment outline' onClick={() => setOpenTextAreaComment(!openTextAreaComment)} ></Button>
                            </GridRow>
                            <GridRow>
                                <Transition visible={openTextAreaComment} animation='scale' duration={500}>
                                    <Form>
                                        <FormTextArea onChange={(e) => setComment(e.target.value)}></FormTextArea>
                                        <FormButton onClick={handleSubmitComment}>Submit</FormButton>
                                    </Form>
                                </Transition>
                            </GridRow>
                            <GridRow>
                                <Segment>
                                {/* <Comment>
                                    {listReview.map(review => (
                                        <CommentContent>
                                            <CommentAuthor as='a'>{review.username}</CommentAuthor>
                                            <CommentMetadata>{review.date}</CommentMetadata>
                                            <CommentText>{review.comment}</CommentText>
                                        </CommentContent>
                                        
                                    ))}
                                </Comment> */}
                                <Feed events={listReview}/>
                                
                                </Segment>
                            </GridRow>
                        </GridColumn>
                    </GridRow>
                </Grid>
            </ModalContent>
        </Modal>
    )
}

export default memo(Display)