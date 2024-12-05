import express from 'express'
import { getAllUsers, login, logout, register } from '../controllers/userController.js'
const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.get("/allusers",getAllUsers)
router.get("/logout",logout)


export default router