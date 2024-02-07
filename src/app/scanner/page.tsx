// Home component
"use client";
import { useEffect, useState } from "react";
import { Row, Col, Spin, Button, Card } from "antd"; // Import Row and Col for responsive layout
import QRScanner from "./components/QRScanner";
import VisitorDetails from "./components/visitorDetails";
import { QrcodeOutlined, CloseCircleOutlined } from "@ant-design/icons";

const dummyVisitor: VisitorTicket = {
	name: "John Doe",
	phone: BigInt(1234567890),
	vehicleNumber: "ABC123",
	email: "john.doe@example.com",
	arrivalTime: new Date("2024-02-05T10:00:00Z"),
	departureTime: null,
	purposeOfVisit: "Meeting",
	visitedDepartment: "Sales",
	remarks: "VIP guest",
};

const Home: React.FC = () => {
	const [data, setData] = useState<string | null>(null);
	const [visitor, setVisitor] = useState<VisitorTicket | null>(dummyVisitor);
	const [flip, setFlip] = useState(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [showQR, setShowQR] = useState(true);

	useEffect(() => {
		if (data !== null) {
			const numData = parseInt(data, 10);
			if (!isNaN(numData)) {
				setLoading(true);

				fetch(`/api/scanner?id=${numData}`)
					.then((res) => res.json())
					.then((fetchedVisitor: VisitorTicket) => {
						console.log(fetchedVisitor);

						setVisitor(fetchedVisitor);
						setFlip(true);
					})
					.catch((err) => {
						console.error(err);
						setError("Error fetching visitor details");
					})
					.finally(() => {
						setLoading(false);
						setData(null);
					});
			}
		}
	}, [data]);

	const toggleView = () => {
		setShowQR((prev) => !prev);
		setFlip(false);
	};

	return (
		<Row gutter={[16, 16]} justify="center" align="middle">
			<Col xs={24} sm={12} md={12} lg={12}>
				<div className="flex w-full flex-col items-end h-full justify-center p-2">
					{!showQR ? (
						<QrcodeOutlined onClick={toggleView} />
					) : (
						<CloseCircleOutlined
							style={{ color: "red" }}
							onClick={toggleView}
						/>
					)}
				</div>
				{showQR ? (
					<QRScanner />
				) : visitor ? (
					<VisitorDetails visitor={visitor} />
				) : null}
				{loading ? (
					<Spin size="large" tip="Loading..." />
				) : error ? (
					<p>{error}</p>
				) : null}
			</Col>
		</Row>
	);
};

export default Home;
