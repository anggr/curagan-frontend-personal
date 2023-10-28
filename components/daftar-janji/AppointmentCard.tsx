import React, { useState, useEffect } from 'react';
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
  const [notification, setNotification] = useState<string | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleAccept = async () => {
    try {
      const response = await fetch(API_ACCEPT_APPOINTMENT(appointmentId), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotification('Appointment has been accepted.');
        onUpdateStatus(appointmentId, 'Accepted');
      } else {
        setNotification('Failed to accept the appointment.');
      }
    } catch (error) {
      setNotification('An error occurred while accepting the appointment.');
    }
  };

  const [rejectionReason, setRejectionReason] = useState<string>('FULL_BOOKED');

  const handleReject = async () => {
    try {
      const response = await fetch(API_REJECT_APPOINTMENT(appointmentId), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rejectionReason }),
      });
      if (response.ok) {
        const data = await response.json();
        setNotification('Appointment has been rejected.');
        onUpdateStatus(appointmentId, 'Rejected');
      } else {
        setNotification('Failed to reject the appointment.');
      }
    } catch (error) {
      setNotification('An error occurred while rejecting the appointment.');
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      {notification && (
        <div className="bg-green-200 p-2 mb-4">{notification}</div>
      )}

      <p>Patient Name: {patientName}</p>
      <p>Doctor Name: {doctorName}</p>
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
          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          onClick={handleReject}
        >
          Reject
        </button>
        <select
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
        >
          <option value="FULL_BOOKED">Full Booked</option>
          <option value="NOT_ON_DUTY">Not on Duty</option>
          <option value="OUT_OF_EXPERTISE">Out of Expertise</option>
          <option value="UNAVAILABLE">Unavailable</option>
        </select>
      </div>
    </div>
  );
};

export default AppointmentCard;
