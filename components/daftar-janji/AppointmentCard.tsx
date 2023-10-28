import React from 'react';
import { API_ACCEPT_APPOINTMENT, API_REJECT_APPOINTMENT } from '@/lib/ApiLinks';

type AppointmentCardProps = {
  appointmentId: string;
  patientID: string;
  doctorID: string;
  datetime: string;
  status: string;
  patientName: string;
  doctorName: string;
  onUpdateStatus: (appointmentId: string, newStatus: string) => void;
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointmentId,
  patientID,
  doctorID,
  datetime,
  status,
  patientName,
  doctorName,
  onUpdateStatus,
}) => {
  const token = localStorage.getItem('token');

  const handleAccept = async () => {
    try {
      const response = await fetch(API_ACCEPT_APPOINTMENT(appointmentId), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log('Accept response:', data);
      onUpdateStatus(appointmentId, 'Accepted');
    } catch (error) {
      console.error(
        'An error occurred while accepting the appointment:',
        error,
      );
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch(API_REJECT_APPOINTMENT(appointmentId), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log('Reject response:', data);
      onUpdateStatus(appointmentId, 'Rejected');
    } catch (error) {
      console.error(
        'An error occurred while rejecting the appointment:',
        error,
      );
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">
        Appointment ID: {appointmentId}
      </h2>
      <p>Patient Name: ({patientName})</p>
      <p>Doctor Name: ({doctorName})</p>
      <p>Date & Time: {new Date(datetime).toLocaleString()}</p>
      <p>Status: {status}</p>
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleAccept}
        >
          Accept
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleReject}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
