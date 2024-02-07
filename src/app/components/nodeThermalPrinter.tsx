// NodeThermalPrinterTicket.jsx

import React, { useEffect } from "react";
import { Card, Typography, Divider } from "antd";
import { QRCodeSVG } from "qrcode.react";
import dayjs from "@/lib/dayjs";
import ThermalPrinter from "node-thermal-printer";

const { Title, Text } = Typography;

const NodeThermalPrinterTicket = ({
	ticketInfo,
}: {
	ticketInfo: VisitorTicket;
}) => {
	useEffect(() => {
		const printer = new ThermalPrinter({
			type: "epson",
			interface: "tcp://localhost:60000",
		});

		printer.alignCenter();
		printer.println("Ticket Information");
		printer.drawLine();
		printer.bold(true);
		printer.println(`Name: ${ticketInfo.name}`);
		printer.bold(false);
		printer.drawLine();
		printer.println(
			`Arrival Time: ${dayjs
				.tz(ticketInfo.arrivalTime)
				.format("YYYY-MM-DD HH:mm:ss")}`
		);
		printer.drawLine();
		printer.println(`Mobile Number: ${String(ticketInfo.phone)}`);
		printer.drawLine();
		printer.println(`Purpose of Visit: ${ticketInfo.purposeOfVisit}`);
		printer.drawLine();
		printer.println(`Vehicle Number: ${ticketInfo.vehicleNumber}`);
		printer.drawLine();
		printer.println(`Visiting Department: ${ticketInfo.visitedDepartment}`);
		printer.drawLine();
		printer.println(`Remarks: ${ticketInfo.remarks}`);
		printer.drawLine();
		printer.println("QR Code:");
		printer.qr(`ID: ${String(ticketInfo?.id)}`);
		printer.drawLine();

		printer.cut();
		printer.execute();
	}, [ticketInfo]);

	return (
		<Card className="w-full max-w-md mx-auto bg-white shadow-md rounded-md">
			<Title level={2}>Ticket Information</Title>
			<Text>
				<span className="font-bold">Name:</span> {ticketInfo.name}
			</Text>
			<Divider />
			<Text>
				<span className="font-bold">Arrival Time:</span>{" "}
				{dayjs.tz(ticketInfo.arrivalTime).format("YYYY-MM-DD HH:mm:ss")}
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
				<span className="font-bold">Remarks:</span> {ticketInfo.remarks}
			</Text>
			<Divider />
			<Title level={3} className="mb-2">
				QR Code
			</Title>
			<QRCodeSVG value={String(ticketInfo?.id)} />
		</Card>
	);
};

export default NodeThermalPrinterTicket;
