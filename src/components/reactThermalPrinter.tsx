"use client";
import React, { useState, useEffect } from "react";
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
import { Button, Radio } from "antd";
// import { connect } from "node:net";

const ReactThermalPrinterTicket = ({
	ticketInfo,
}: {
	ticketInfo: VisitorTicket;
}) => {
	const [ticketUint8Array, setTicketUint8Array] = useState<Uint8Array | null>(
		null
	);
	const [ticketPreview, setTicketPreview] = useState<JSX.Element | null>(null);
	const [connectionType, setConnectionType] = useState<"serial" | "network">(
		"serial"
	);

	// Retrieve the connection type from local storage when the component mounts
	useEffect(() => {
		const savedConnectionType = localStorage.getItem("connectionType");
		if (savedConnectionType) {
			setConnectionType(savedConnectionType as "serial" | "network");
		}
	}, []);

	// Store the connection type in local storage whenever it changes
	const handleConnectionTypeChange = (e: any) => {
		const selectedType = e.target.value;
		setConnectionType(selectedType);
		localStorage.setItem("connectionType", selectedType);
	};

	const generatePreview = async () => {
		const preview = (
			<Printer type="epson" width={42}>
				<Text size={{ width: 2, height: 2 }} align="center" bold={true}>
					MES Collage Marampally
				</Text>
				<Line />
				<Row left="ID" right={String(ticketInfo.id)} />
				<Row left="Name" right={ticketInfo.name} />
				<Row
					left="Arrival Time"
					right={dayjs
						.tz(ticketInfo.arrivalTime)
						.format("YYYY-MM-DD HH:mm:ss")}
				/>
				<Row left="Mobile Number" right={String(ticketInfo.phone)} />
				<Row
					left="Purpose of Visit"
					right={ticketInfo.purposeOfVisit || ""}
				/>
				<Row left="Vehicle Number" right={ticketInfo.vehicleNumber || ""} />
				<Row
					left="Visiting Department"
					right={ticketInfo.visitedDepartment || ""}
				/>
				<Row left="Remarks" right={ticketInfo.remarks || ""} />
				<Line />
				<Br />
				<Text align="center">
					<QRCodeSVG
						className="outline-8 outline-white outline m-2"
						value={String(ticketInfo?.id)}
					/>
				</Text>
				<Cut />
			</Printer>
		);
		setTicketPreview(preview);
		try {
			const ticketData: Uint8Array = await render(preview);
			return ticketData;
			// setTicketUint8Array(ticketData);
		} catch (error) {
			console.error(error);
		}
		return null;
	};

	const printTicket = async () => {
		try {
			const ticketData = await generatePreview();
			console.log(ticketData);
			
			if (ticketData) {
				if (connectionType === "serial") {
					const port = await window.navigator.serial.requestPort();
					await port.open({ baudRate: 9600 });
					const writer = port.writable?.getWriter();
					if (writer != null) {
						await writer.write(ticketData);
						writer.releaseLock();
					}
				} /* else if (connectionType === "network") {
					const conn = connect(
						{
							host: "192.168.0.99",
							port: 9100,
							timeout: 3000,
						},
						() => {
							conn.write(Buffer.from(ticketUint8Array), () => {
								conn.destroy();
							});
						}
					);
				} */
			}
		} catch (error) {
			console.error("Error printing ticket:", error);
			// Handle error gracefully, e.g., display a user-friendly message
		}
	};

	return (
		<div>
			{/* Ticket preview */}
			<div className="">{ticketPreview}</div>

			{/* Connection type selection */}
			<Radio.Group
				onChange={handleConnectionTypeChange}
				value={connectionType}
			>
				<Radio value="serial">Serial</Radio>
				<Radio value="network">Network</Radio>
			</Radio.Group>

			{/* Print button */}
			<Button onClick={printTicket}>Print Ticket</Button>
		</div>
	);
};

export default ReactThermalPrinterTicket;
