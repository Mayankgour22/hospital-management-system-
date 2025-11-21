const express = require("express");
const appointmentController = require("../controllers/appointmentController.js");

const router = express.Router();

router.post("/", appointmentController.createAppointment);
router.get("/patient/:patientId", appointmentController.getPatientAppointments);
router.get("/doctor/:doctorId", appointmentController.getDoctorAppointments);
router.put("/:id/cancel", appointmentController.cancelAppointment); 

module.exports = router;
