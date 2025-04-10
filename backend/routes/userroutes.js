import express from "express";
import { getUserForSidebar } from "../controllers/userController.js";
const router =express.Router()
//add the changes 
router.get("/all",getUserForSidebar)

export default router
