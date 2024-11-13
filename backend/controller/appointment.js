import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";


const sendAppointment = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone } = req.body; 
  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return next(new ErrorHandler("Por favor preencha todo o formulário de agendamento!", 400));
  }

  try {
    await Appointment.create({ firstName, lastName, email, date, time, phone });
    res.status(201).json({
      success: true,
      message: "Agendamento marcado com sucesso!",
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }
    return next(error);
  }
};


export default sendAppointment;

