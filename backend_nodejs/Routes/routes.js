const express = require('express')
const router = express()

const bookController = require("../Models/BooksModel/bookController")
const userAccountsController = require("../Models/UserAccountsModal/userAccountController")
const authController = require("../Models/AuthenticationModel/authControllers")

const verifyToken  = require("../middlewares/verifyToken" )
const roleAuthorization = require("../middlewares/roleAuthorization")
const verifyAccount = require("../middlewares/verifyAccount")

const loginNotificationController = require("../Models/ManageLoginModel/loginNotificationModel")

function Route(router){

  // Book
  router.get('/view', verifyToken, verifyAccount, bookController.getView)
  router.post('/add', verifyToken, verifyAccount, bookController.postAdd)
  router.delete('/delete/:id', verifyToken, verifyAccount, bookController.delete)
  router.put('/update/:id', verifyToken, verifyAccount, bookController.putUpdate)
  

  //Review
  router.get('/description/:id', verifyToken, verifyAccount, bookController.getDescription)
  router.put('/description/update/:id', verifyToken, verifyAccount, bookController.putUpdateDescription)
  router.post('/comment/update/:bookId', verifyToken, verifyAccount, bookController.postComment)
  router.get('/comment/:bookId', verifyToken, verifyAccount, bookController.getReview)

  //Image
  router.get('/image/:id', verifyToken, verifyAccount, bookController.getImage)
  router.post('/uploadImage/:id', verifyToken, verifyAccount, bookController.postUploadImage)
  router.delete('/deleteImage/:id', verifyToken, verifyAccount, bookController.deleteImage)

  // Account
  router.get('/manageUserAccounts', verifyToken, verifyAccount, userAccountsController.getUserAccount)
  router.post('/manageUserAccounts/add', verifyToken, verifyAccount, userAccountsController.postAdd)
  router.delete('/manageUserAccounts/delete/:id', verifyToken, verifyAccount, userAccountsController.delete)
  router.put('/manageUserAccounts/update/:id', verifyToken, verifyAccount, userAccountsController.putUpdate)

  
  router.post('/register',authController.postRegister)
  router.post('/login',roleAuthorization,authController.postLogin)
  router.post('/logout',authController.postLogout)

}

module.exports = Route