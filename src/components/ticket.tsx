import React, { useEffect, useRef } from "react";
import { Typography, Divider, ConfigProvider, theme, Row, Col } from "antd";
import { QRCodeSVG } from "qrcode.react";
import dayjs from "@/lib/dayjs";
import { useReactToPrint } from "react-to-print";
import Image from "next/image";

const { Title, Text } = Typography;

interface TicketProps {
	ticketInfo: VisitorTicket;
}

const Ticket: React.FC<TicketProps> = ({ ticketInfo }) => {
	const componentRef = useRef<HTMLDivElement | null>(null);

	const reactToPrintContent = React.useCallback(() => {
		return componentRef.current;
	}, []);

	const handlePrint = useReactToPrint({
		content: reactToPrintContent,
		documentTitle: "visitor-ticket",
		removeAfterPrint: true,
	});

	useEffect(() => {
		handlePrint();
	}, [handlePrint]);

	return (
		<div style={{ display: "none" }}>
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
					className="w-full bg-white flex flex-col mx-5 pt-10"
					style={{ height: "50vh" }}
				>
					<div className="flex justify-center items-center">
						<Image
							src="/MES_logo.jpg"
							alt="Logo"
							className="mt-2 rounded-md"
							width={40} // Default width
							height={40} // Default height
						/>
						<Title
							level={2}
							className="text-center"
							style={{ marginBottom: "0" }}
						>
							MES COLLEGE MARAMPALLY
						</Title>
					</div>
					<Title level={3} className="text-center" style={{ marginTop: "0" }}>
						GATE PASS
					</Title>
					<Row gutter={[16, 16]}>
						<Col span={16}>
							<Text>
								<span className="font-bold">ID:</span> {ticketInfo.id}
							</Text>
							<Divider />
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
						</Col>
						<Col
							span={8}
							className="flex flex-col justify-center items-center"
						>
							<Title level={3} className="mb-2">
								QR Code
							</Title>
							<QRCodeSVG value={String(ticketInfo?.id)} size={128} />
							<div className="mt-5">
								<Text className="font-bold">Signature: </Text>
							</div>
						</Col>
					</Row>
				</div>
			</ConfigProvider>
		</div>
	);
};

export default Ticket;
