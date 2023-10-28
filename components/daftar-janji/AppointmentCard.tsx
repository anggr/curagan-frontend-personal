type AppointmentCardProps = {
  appointmentId: string;
  patientID: string;
  doctorID: string;
  datetime: string;
  status: string;
  patientName: string;
  doctorName: string;
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointmentId,
  patientID,
  doctorID,
  datetime,
  status,
  patientName,
  doctorName,
}) => {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">
        Appointment ID: {appointmentId}
      </h2>
      <p>Patient Name: {patientName}</p>
      <p>Doctor Name: {doctorName}</p>
      <p>Date & Time: {new Date(datetime).toLocaleString()}</p>
      <p>Status: {status}</p>
    </div>
  );
};

export default AppointmentCard;
