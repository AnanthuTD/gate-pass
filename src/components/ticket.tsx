import React, { useEffect, useRef } from "react";
import {
	Card,
	Typography,
	Divider,
	ConfigProvider,
	theme,
	Row,
	Col,
} from "antd";
import { QRCodeSVG } from "qrcode.react";
import dayjs from "@/lib/dayjs";
import { useReactToPrint } from "react-to-print";

const { Title, Text } = Typography;

interface TicketProps {
	ticketInfo: VisitorTicket;
}

const Ticket: React.FC<TicketProps> = ({ ticketInfo }) => {
	const reactToPrintContent = React.useCallback(() => {
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
		<ConfigProvider
			theme={{
				algorithm: theme.defaultAlgorithm,
				components: {
					Divider: {
						textPaddingInline: "0",
					},
				},
				token: {
					marginLG: 15,
				},
			}}
		>
			<div
				ref={componentRef}
				className="w-full bg-white flex flex-col mx-5"
				style={{ height: "50vh" }}
			>
				<Title
					level={2}
					className="text-center"
					style={{ marginBottom: "0" }}
				>
					MES College Marampally
				</Title>
				<Title level={3} className="text-center" style={{ marginTop: "0" }}>
					GATE PASS
				</Title>
				<div className="w-full flex">
					<div className="w-full w-3/4">
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
						{/* <div className="m-1"></div> */}
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
					</div>
					<div>
						<div className="flex justify-end items-end">
							<div>
								<Title level={3} className="mb-2">
									QR Code
								</Title>
								<QRCodeSVG value={String(ticketInfo?.id)} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</ConfigProvider>
	);
};

export default Ticket;
