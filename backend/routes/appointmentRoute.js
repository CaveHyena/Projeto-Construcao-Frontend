import express from "express";
import sendAppointment from "../controller/appointment.js";

const router = express.Router();

router.post("/send", sendAppointment);

export default router;
