import React from 'react';
import dayjs from 'dayjs';
import QRCode from "qrcode.react";

interface TicketInfo {
	name: string;
	date: dayjs.Dayjs;
	mobileNumber: string;
	purposeOfVisit: string;
	vehicleNumber: string;
	visitingDepartment: string;
	remarks: string;
}

interface TicketProps {
	ticketInfo: TicketInfo;
}

const Ticket = React.forwardRef<HTMLDivElement, TicketProps>(
  function TicketComponent({ ticketInfo }, ref) {
    return (
      <>
        <div ref={ref} className="w-full max-w-md mx-auto p-4 bg-transparent shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-4">Ticket Information</h2>
          <p className="mb-2"><span className="font-bold">Name:</span> {ticketInfo.name}</p>
          <p className="mb-2"><span className="font-bold">Date:</span> {ticketInfo.date.format("YYYY-MM-DD")}</p>
          <p className="mb-2"><span className="font-bold">Mobile Number:</span> {ticketInfo.mobileNumber}</p>
          <p className="mb-2"><span className="font-bold">Purpose of Visit:</span> {ticketInfo.purposeOfVisit}</p>
          <p className="mb-2"><span className="font-bold">Vehicle Number:</span> {ticketInfo.vehicleNumber}</p>
          <p className="mb-2"><span className="font-bold">Visiting Department:</span> {ticketInfo.visitingDepartment}</p>
          <p className="mb-4"><span className="font-bold">Remarks:</span> {ticketInfo.remarks}</p>
          <h3 className="text-lg font-bold mb-2">QR Code</h3>
          <QRCode value={JSON.stringify(ticketInfo)} />
        </div>
      </>
    );
  }
);

Ticket.displayName = 'Ticket';

export default Ticket;
