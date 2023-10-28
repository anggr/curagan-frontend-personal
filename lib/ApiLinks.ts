export const API_REGISTER_PATIENT =
  'https://curagan-be.up.railway.app/patient/auth/register';
export const API_LOGIN_PATIENT =
  'https://curagan-be.up.railway.app/patient/auth/login';
export const API_LOGIN_DOCTOR =
  'https://curagan-be.up.railway.app/doctor/auth/login';

export const API_PATIENT = 'https://curagan-be.up.railway.app/patient';
export const API_DOCTOR = 'https://curagan-be.up.railway.app/doctor';
export const API_APPOINTMENT = 'https://curagan-be.up.railway.app/appointments';
export const API_MY_APPOINTMENT =
  'https://curagan-be.up.railway.app/appointments/my-appointments';
export const API_APPOINTMENT_HISTORY =
  'https://curagan-be.up.railway.app/appointments/history';

export const API_MY_APPOINTMENTS_ID = (id: string) =>
  `https://curagan-be.up.railway.app/appointments/my-appointments/${id}`;
