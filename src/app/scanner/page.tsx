// Home component
"use client";
import { useEffect, useState } from "react";
import { Row, Col, Spin, Button, ConfigProvider, theme, Card } from "antd"; // Import Row and Col for responsive layout
import QRScanner from "./QRScanner";
import VisitorDetails from "./visitorDetails";
import { motion } from "framer-motion";

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
		<ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
			<Row gutter={[16, 16]} justify="center" align="middle">
				<Col xs={24} sm={12} md={12} lg={12}>
					<Card
						style={{
							transformStyle: "preserve-3d",
							backfaceVisibility: "hidden",
						}}
						>
						<motion.div
							animate={{ rotateX: flip ? 180 : 0 }}
							transition={{ duration: 0.5 }}
							style={{
								transformStyle: "preserve-3d",
								backfaceVisibility: "hidden",
							}}>
							{showQR ? (
								<QRScanner data={data} setData={setData} />
							) : visitor ? (
								<VisitorDetails visitor={visitor} />
							) : null}
							{loading ? (
								<Spin size="large" tip="Loading..." />
							) : error ? (
								<p>{error}</p>
							) : (
								<div>
									<Button onClick={toggleView}>
										Switch View
									</Button>
								</div>
							)}
						</motion.div>
					</Card>
				</Col>
			</Row>
		</ConfigProvider>
	);
};

export default Home;
