
const knex = require('../../ConnectDB/ConnectDBKnex')

const Joi = require('joi')

const fs = require('fs').promises
const schemaImage = Joi.object({
    imageName: Joi.string().max(50),
    imageType: Joi.string().valid('image/gif', 'image/jpeg', 'image/jpg', 'image/pjpeg', 'image/x-png', 'image/png' ),
    base64Code: Joi.string().dataUri(),
})

const formSchema = Joi.object({
    bookId : Joi.string().min(5).max(10).required(),
    title : Joi.string().min(3).max(50).required(),
    category : Joi.string().min(5).max(20).required(),
    author : Joi.string().min(5).max(50).required(),
    publisher : Joi.string().min(5).max(50).required()
})

module.exports = {

    getView: async (req,res)=>{
        try{
            let result = await knex('Books')
                                    .select('*')
                                    .catch(err => {
                                        res.status(500).send({isErr: true, message: 'Can not get data'})
                                    })
            res.send(result)
        }catch(err){
            throw err
        }
    },

    postAdd: async (req,res)=>{

        try{
            // console.log('postAdd')
            const {bookId, title, category, author, publisher, imageName, imageType, base64Code, time} = req.body

            if(base64Code !== ''){
                try{
                    const {error} = await schemaImage.validateAsync({imageName, imageType, base64Code})

                    if(error){
                        switch (error.details[0].context.key){
                            case 'imageName':
                                 res.status(500).send({isErr: true, message: error.details[0].message})
                                break
                            case 'imageType':
                                 res.status(500).send({isErr: true, message: error.details[0].message})
                                break
                            case 'base64Code':
                                 res.status(500).send({isErr: true, message: error.details[0].message})
                                break
                            default:
                                 res.status(500).send({isErr: true, message: error.details[0].message})
                                break
                        }
                        return
                    }
                    else{
                        let imageBuffer = new Buffer.from(base64Code.split(',')[1], 'base64')
    
                        await fs.writeFile(`../Images/${time}_${imageName}`, imageBuffer, (err)=>{
                            if(err){
                                console.log(err)
                                res.status(500).send({isErr: true, message: "Upload fail"})
                                throw err
                            }
                        })
        
                        await knex('Books')
                                .insert({
                                    bookId, title, category, author, publisher,
                                    url: `../Images/${time}_${imageName}`
                                })
                                .catch(err => {
                                    res.status(500).send({isErr: true, message: "Create fail"})
                                    throw err
                                })
                        
                        return res.status(200).send({isErr: false, message: 'Successfull'})
                        
                    }
                }catch(err){
                    res.status(500).send({isErr: true, message: err})
                    throw err
                }
            }else{
                await knex('Books')
                .insert({
                    bookId, title, category, author, publisher
                })
                .catch(err => {

                    res.status(500).send({isErr: true, message: "Create fail"})
                    throw err
                })
            }

            res.status(200).send({isErr: false, message: "Create success"})

        }catch(err){
            console.log(err.details[0].message)
            return res.status(500).send(err.details[0].message)
            // throw err
        }
    },

    delete: async (req,res)=>{
        try{
            await knex('Books')
                    .where({id: req.params.id})
                    .del()
                    .catch(err => {
                        res.status(500).send({isErr: true, message: "Delete fail"})
                        throw err
                    })
                    
            let result = await knex('Books')
                            .count('title')
                            .catch(err => {
                                res.status(500).send({isErr: true, message: "Delete fail"})
                                throw err
                            })

            let count = result[0]['count(`title`)']

            await knex.raw(`alter table Books auto_increment = ${count}`)
                        .catch(err => {
                            res.status(500).send({isErr: true, message: "Delete fail"})
                            throw err
                        })
            res.status(200).send({isErr: false, message: 'Delete success'})
            
        }catch(err){
            res.status(500).send({isErr: true, message: "Delete fail"})
            throw err
        }
    },

    putUpdate: async (req,res)=>{
        try{
            await knex('Books')
                    .where({id: req.params.id})
                    .update({
                        bookId: req.body.bookId,  
                        title: req.body.title, 
                        category: req.body.category,
                        author: req.body.author,
                        publisher: req.body.publisher
                    })
                    .catch(err => {
                        res.status(500).send({isErr: true, message: "Update fail"})
                        throw err
                    })
            res.status(200).send({isErr: false, message: "Update successfully !"})
        }catch(err){
            res.status(500).send({isErr: true, message: err})
            throw err
        }
    },

    getDescription: async (req, res) => {
        try{
            let result = await knex('Books')
                                .select('description')
                                .where({id: req.params.id})
                                .catch(err => {
                                    res.status(500).send(err)
                                    throw err
                                })

            res.status(200).send(result)
        }catch(err){

        }
    },
    
    putUpdateDescription: async (req,res) => {
        try{
            await knex('Books').where({id: req.params.id}).update({
                description: req.body.description
            })

            res.status(200).send({message: "Update successfully !"})

        }catch(err){
            res.status(500).send(err)
        }
    },

    postComment: async (req, res) => {
        try{
            let [username, bookId, comment, date] = [req.body.username, req.params.bookId, req.body.comment, req.body.date]
            await knex('Review').where({bookId: req.params.bookId}).insert({
                username, bookId, comment, date
            })
            res.status(200).send({username, bookId, comment, date})
        }catch(err){
            throw err
        }
    },

    getReview: async (req, res) => {
        try{
            let results = await knex('Review')
                                .select('*')
                                .where({bookId: req.params.bookId})
                                .catch((err) => {
                                    throw err
                                })
            // console.log(results)
            res.status(200).send(results)
        }catch(err){
            throw err
        }
    },

    getImage: async (req, res) => {
        try{
            let results = await knex('Books')
                                .select('url')
                                .where({id: req.params.id})
                                .catch(err => {
                                    console.log(err)
                                    res.status(500).send({isErr: true, message: "Fail"})
                                })
            let url = results[0].url
            // console.log(url)
            if(url) {
                let url = results[0].url

                let buffer64 = await fs.readFile(url, { encoding: 'base64' }, (err) => {
                    if(err){
                        res.status(500).res.status(500).send({isErr: true, message: "Fail"})
                        throw err
                    }

                })

                buffer64 = "data:image;base64," + buffer64
                res.status(200).send(buffer64)
            }
            else res.send('')
        }catch(err){
            throw err
        }
    },

    postUploadImage: async (req,res) => {
        try{
            const {imageName, imageType, base64Code, time} = req.body
            
            try{
                const {error} = await schemaImage.validateAsync({imageName, imageType, base64Code})

                if(error){
                    switch (error.details[0].context.key){
                        case 'imageName':
                            res.status(500).send({message: error.details[0].message})
                            break
                        case 'imageType':
                            res.status(500).send({message: error.details[0].message})
                            break
                        case 'base64Code':
                            res.status(500).send({message: error.details[0].message})
                            break
                        default:
                            res.status(500).send({message: error.details[0].message})
                            break
                    }
                }
                else{
                    let imageBuffer = new Buffer.from(base64Code.split(',')[1], 'base64')
    
                    await fs.writeFile(`../Images/${time}_${imageName}`, imageBuffer, (err)=>{
                        if(err){
                            console.log(err)
                            res.status(500).send({isErr: true, message: "Upload fail"})
                        }
                    })
        
                    await knex('Books')
                            .update({url: `../Images/${time}_${imageName}`})
                            .where({id: req.params.id})
                            .catch(err => {
                                console.log(err)
                                res.status(500).send({isErr: true, message: "Upload fail"})
                            })
                            
                    res.status(200).send({isErr: false, message: "Upload success"})
                }
            }catch(err){
                res.status(500).send(err)
                throw err
            }

        }catch(err){
            res.status(500).send({isErr: true, message: "Upload fail"})
            throw err
        }
    },

    deleteImage: async (req, res) => {
        try{
            let result = await knex('Books')
                                .select('url')
                                .where({id: req.params.id})
                                .catch(err => {
                                    console.log(err)
                                    res.status(500).send({message: "Delete fail"})
                                })
            let url = result[0].url

            await fs.unlink(url, (err) => {
                console.log(err)
                res.status(500).send({message: "Delete fail"})
            })

            await knex('Books')
                    .update({url: ""})
                    .where({id: req.params.id})
                    .catch(err => {
                        console.log(err)
                        res.status(500).send({message: "Delete fail"})
                    })
                    
            res.status(200).send({message: "Delete success"})
        }catch(err){
            throw err
        }
    }
}
