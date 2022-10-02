import Joi from "joi";

const formSchema = Joi.object({
    bookId : Joi.string().min(5).max(10).required(),
    title : Joi.string().min(3).max(50).required(),
    category : Joi.string().min(5).max(20).required(),
    author : Joi.string().min(5).max(50).required(),
    publisher : Joi.string().min(5).max(50).required()
})

export default formSchema
