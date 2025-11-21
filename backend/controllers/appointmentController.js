const Appointment = require("../models/Appointment.js");
const User = require("../models/user.js");


const createAppointment = async (req, res) => {
  try {
    console.log(" Incoming data:", req.body);

    const { patientId, doctorId, date, time, reason } = req.body;

    const appointment = new Appointment({
      patientId,
      doctorId,
      date: new Date(date),
      time,
      reason,
    });

    await appointment.save();
    res.status(201).json({
      success: true,
      message: "Appointment booked successfully!",
      appointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating appointment",
      error,
    });
  }
};

const getPatientAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;
    const appointments = await Appointment.find({ patientId }).populate(
      "doctorId",
      "name email"
    );
    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching patient appointments",
      error,
    });
  }
};


const getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctorId }).populate(
      "patientId",
      "name email"
    );
    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error(" Error fetching doctor appointments:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching doctor appointments",
      error,
    });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: "Cancelled" },
      { new: true }
    );
    if (!appointment)
      return res.status(404).json({ success: false, message: "Appointment not found" });

    res.status(200).json({ success: true, message: "Appointment cancelled", appointment });
  } catch (error) {
    console.error(" Error cancelling appointment:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  createAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  cancelAppointment,
};
