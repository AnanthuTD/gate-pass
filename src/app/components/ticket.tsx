"use client";
import React, { useEffect, useRef } from "react";
import { Card, Typography, Divider, ConfigProvider, theme } from "antd";
import { QRCodeSVG } from "qrcode.react";
import dayjs from "@/lib/dayjs";
import { useReactToPrint } from "react-to-print";

const { Title, Text } = Typography;

interface TicketProps {
	ticketInfo: VisitorTicket;
}

const Ticket: React.FC<TicketProps> = ({ ticketInfo }) => {
	const reactToPrintContent = React.useCallback(() => {
		console.log(componentRef.current);

		return componentRef.current;
	}, []);

	const componentRef: React.MutableRefObject<HTMLDivElement | null> =
		useRef(null);

	const handlePrint = useReactToPrint({
		content: reactToPrintContent,
		documentTitle: "visitor-ticket",
		removeAfterPrint: true,
	});

	useEffect(() => {
		handlePrint();
	}, [handlePrint]);

	return (
		<ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
			<Card
				ref={componentRef}
				className="w-full max-w-md mx-auto bg-white shadow-md rounded-md"
				title={<Title level={2}>Ticket Information</Title>}>
				<Text>
					<span className="font-bold">Name:</span> {ticketInfo.name}
				</Text>
				<Divider />
				<Text>
					<span className="font-bold">Arrival Time:</span>{" "}
					{dayjs
						.tz(ticketInfo.arrivalTime)
						.format("YYYY-MM-DD HH:mm:ss")}
				</Text>
				<Divider />
				<Text>
					<span className="font-bold">Mobile Number:</span>{" "}
					{String(ticketInfo.phone)}
				</Text>
				<Divider />
				<Text>
					<span className="font-bold">Purpose of Visit:</span>{" "}
					{ticketInfo.purposeOfVisit}
				</Text>
				<Divider />
				<Text>
					<span className="font-bold">Vehicle Number:</span>{" "}
					{ticketInfo.vehicleNumber}
				</Text>
				<Divider />
				<Text>
					<span className="font-bold">Visiting Department:</span>{" "}
					{ticketInfo.visitedDepartment}
				</Text>
				<Divider />
				<Text>
					<span className="font-bold">Remarks:</span>{" "}
					{ticketInfo.remarks}
				</Text>
				<Divider />
				<Title level={3} className="mb-2">
					QR Code
				</Title>
				<QRCodeSVG value={String(ticketInfo?.id)} />
			</Card>
		</ConfigProvider>
	);
};

export default Ticket;
