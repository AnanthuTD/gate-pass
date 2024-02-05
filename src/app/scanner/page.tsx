"use client";
import { Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import QRScanner from "./QRScanner";
import VisitorDetails from "./visitorDetails";

const Home: React.FC = () => {
	const [data, setData] = useState<string | null>(null);
	const [visitor, setVisitor] = useState<VisitorTicket | null>(null);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (data !== null) {
			const numData = parseInt(data);
			if (!isNaN(numData)) {
				setLoading(true);

				fetch(`scanner/api/?id=${numData}`)
					.then((res) => res.json())
					.then((fetchedVisitor: VisitorTicket) => {
						console.log(fetchedVisitor);
						
						setVisitor(fetchedVisitor);
						setModalVisible(true);
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

	const handleOk = () => {
		setModalVisible(false);
	};

	const handleCancel = () => {
		setModalVisible(false);
	};

	return (
		<div>
			<QRScanner data={data} setData={setData} />
			<Modal
				title="Visitor Details"
				open={modalVisible}
				onOk={handleOk}
				onCancel={handleCancel}>
				{loading ? (
					<Spin size="large" tip="Loading..." />
				) : error ? (
					<p>{error}</p>
				) : (
					visitor && <VisitorDetails visitor={visitor} />
				)}
			</Modal>
		</div>
	);
};

export default Home;
