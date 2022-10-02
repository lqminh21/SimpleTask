import axios from "axios";
import { memo, useState } from "react";
import { Form, FormButton, FormField, FormInput, Input, Icon, Message } from "semantic-ui-react";
import { Button, ButtonContent } from "semantic-ui-react"
import { Image } from "semantic-ui-react"
import axiosBaseURL from "../../../../AxiosBaseURL/axiosBaseURL";
import processUpload from './processUpload'
import Joi from "joi";


const UploadImage = ({bookInfo, displayToast}) => {

    const [UrlData, setUrlData] = useState('')

    const [err, setErr] = useState('')

    const schema = Joi.object({
        name: Joi.string().required(),
        size: Joi.number().integer().max(100000).required(),
        type: Joi.string().valid('image/gif', 'image/jpeg', 'image/pjpeg', 'image/jpg', 'image/x-png', 'image/png')
        // base64: Joi.string().dataUri().required()
    })
    
    const uploadImage = async (e) => {
        try{
            const file = e.target.files[0]
            
            const {name, size, type, base64} = await processUpload(file)
            const {error} = schema.validate({name, size, type})

            if(error){
                switch (error.details[0].context.key){
                    case 'name':
                        setErr(error.details[0].message)
                        setUrlData("")
                        break
                    case 'size':
                        setErr(error.details[0].message)
                        setUrlData("")
                        break
                    case 'type':
                        setErr(error.details[0].message)
                        setUrlData("")
                        break
                    default:
                        setErr("An unknown error occurred")
                        setUrlData("")
                        break
                }
            }
            else{
                setUrlData(base64)
                postImageUpload(file.name, file.type, base64)
            }
            
        }catch(err){
            throw err
        }
    }

    const handleOnchange = (e) => {
        uploadImage(e)
    }

    const postImageUpload = async (name,type,base64) => {
        try{
            let res = await axiosBaseURL.post(`/uploadImage/${bookInfo.id}`,{
                imageName: name,
                imageType: type,
                base64Code: base64,
                time: new Date()
            })

            let {isErr, message} = res.data

            displayToast(message, 'create')

        }catch(err){
            displayToast(err.response.data.details[0].message)
            console.log(err)
        }
    }

    console.log('upload image render')

    return (
        <Form style={{height: '300px'}}>
            {UrlData ? 
                <FormField>
                    <Image 
                        style={{height: 300, width:200}} 
                        src={UrlData}
                    ></Image>
                </FormField> :
                
                <FormField style={{padding: '50px'}}>
                    {err ? <Message>{err}</Message> : ''}
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
    )
}

export default memo(UploadImage)