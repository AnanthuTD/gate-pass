"use client";
import React, { useState } from "react";
import {
	Br,
	Cut,
	Line,
	Printer,
	Text,
	Row,
	render,
} from "react-thermal-printer";
import dayjs from "@/lib/dayjs"; // Import dayjs for date formatting
import { QRCodeSVG } from "qrcode.react";

const ReactThermalPrinterTicket = ({
	ticketInfo,
}: {
	ticketInfo: VisitorTicket;
}) => {
	const [ticketUint8Array, setTicketUint8Array] = useState<Uint8Array | null>(
		null
	);
	const [ticketPreview, setTicketPreview] = useState<JSX.Element | null>(
		null
	);

	const generatePreview = async () => {
		const preview = (
				<Printer type="epson" width={42}>
					<Text size={{ width: 2, height: 2 }}>Visitor Ticket</Text>
					<Br />
					<Line />
					<Row left="Name" right={ticketInfo.name} />
					<Row
						left="Arrival Time"
						right={dayjs
							.tz(ticketInfo.arrivalTime)
							.format("YYYY-MM-DD HH:mm:ss")}
					/>
					<Row
						left="Mobile Number"
						right={String(ticketInfo.phone)}
					/>
					<Row
						left="Purpose of Visit"
						right={ticketInfo.purposeOfVisit || ""}
					/>
					<Row
						left="Vehicle Number"
						right={ticketInfo.vehicleNumber || ""}
					/>
					<Row
						left="Visiting Department"
						right={ticketInfo.visitedDepartment || ""}
					/>
					<Row left="Remarks" right={ticketInfo.remarks || ""} />
					<Line />
					<Br />
					<Text align="center">
						<QRCodeSVG value={String(ticketInfo?.id)} />
					</Text>
					<Cut />
				</Printer>
		);
		setTicketPreview(preview);
		try {
			const ticketData: Uint8Array = await render(preview);
            setTicketUint8Array(ticketData);
		} catch (error) {
			console.error(error);
		}
	};

	const printTicket = async () => {
		try {
			generatePreview();
			if (ticketUint8Array) {
				// Print data using your thermal printer
				console.log("Printing ticket:", ticketUint8Array);
			}
		} catch (error) {
			console.error("Error printing ticket:", error);
			// Handle error gracefully, e.g., display a user-friendly message
		}
	};

	return (
		<div>
			{/* Ticket preview */}
			{ticketPreview}

			{/* Print button */}
			<button onClick={printTicket}>Print Ticket</button>
		</div>
	);
};

export default ReactThermalPrinterTicket;
