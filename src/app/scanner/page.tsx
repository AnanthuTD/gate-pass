"use client";
import { useEffect, useState } from "react";
import { Row, Col, Spin, Grid, Input, Button, Divider } from "antd";
import { QrcodeOutlined, CloseCircleOutlined } from "@ant-design/icons";
import QRScanner from "./components/QRScanner";
import VisitorDetails from "./components/visitorDetails";
import SetDeparture from "./components/setDeparture";

const { useBreakpoint } = Grid;
/* const dummyVisitor = {
	id: 1,
	name: "John Doe",
	phone: BigInt(1234567890),
	vehicleNumber: "ABC123",
	email: "john.doe@example.com",
	arrivalTime: new Date("2024-02-05T10:00:00Z"),
	departureTime: null,
	purposeOfVisit: "Meeting",
	visitedDepartment: "Sales",
	remarks: "VIP guest",
}; */

const Home: React.FC = () => {
	const [ticketId, setTicketId] = useState<string | null>(null);
	const [visitor, setVisitor] = useState<VisitorTicket | undefined>(
		undefined
	);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [showQR, setShowQR] = useState(true);
	const screens = useBreakpoint();

	useEffect(() => {
		setVisitor(undefined)
		if (ticketId !== null) {
			const numData = parseInt(ticketId, 10);
			if (!isNaN(numData)) {
				setLoading(true);
				fetch(`/scanner/api/?id=${numData}`)
					.then((res) => res.json())
					.then((fetchedVisitor) => {
						console.log(fetchedVisitor);
						setVisitor(fetchedVisitor);
					})
					.catch((err) => {
						console.error(err);
						setError("Error fetching visitor details");
					})
					.finally(() => {
						setLoading(false);
						// setTicketId(null);
					});
			}
		}
	}, [ticketId]);

	const toggleView = () => {
		setShowQR((prev) => !prev);
	};

	return (
		<>
			{screens.lg || screens.xl || screens.xxl ? null : (
				<Row gutter={[16, 16]} justify="center" align="middle">
					<Col xs={24} sm={24} md={12} lg={12}>
						<div className="flex justify-end">
							{
								!showQR ? (
									<QrcodeOutlined
										onClick={toggleView}
										style={{ fontSize: "1.5rem" }}
										className="m-3"
									/>
								) : null
								/*  (
								<CloseCircleOutlined
									style={{ color: "red", fontSize: "1.5rem" }}
									onClick={toggleView}
								/>
							) */
							}
						</div>
						{showQR ? (
							<>
								<Row>
									<QRScanner setTicketId={setTicketId} />
								</Row>
								<Row justify={"center"}>
									<Input.Search
										placeholder="Ticket ID"
										defaultValue={ticketId || ""}
										addonBefore={"ID"}
										onSearch={setTicketId}
										value={ticketId || ''}
										onChange={(e)=>setTicketId(e.target.value)}
									/>
								</Row>
								<Row justify={"center"} className="m-3">
									<Button
										onClick={toggleView}
										disabled={!visitor?.id}
										loading={loading}>
										Visitor Details
									</Button>
								</Row>
								<Divider />
								<Row justify={"center"} className="m-3">
									<SetDeparture visitorId={visitor?.id} />
								</Row>
							</>
						) : (
							<VisitorDetails visitor={visitor} ticketId={ticketId} setTicketId={setTicketId}/>
						)}
						{error && <p>{error}</p>}
					</Col>
				</Row>
			)}
			{screens.lg || screens.xl || screens.xxl ? (
				<Row gutter={[16, 16]} justify="space-around" className="mt-5">
					<Col xs={24} sm={24} lg={6} xl={6} xxl={6}>
						<QRScanner setTicketId={setTicketId} />
					</Col>
					<Col xs={24} sm={24} lg={15} xl={15} xxl={15}>
						<VisitorDetails visitor={visitor} ticketId={ticketId} setTicketId={setTicketId}/>
					</Col>
				</Row>
			) : null}
		</>
	);
};

export default Home;
