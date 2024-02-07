import React from "react";
import { Descriptions, Button, message } from "antd";
import dayjs from "@/lib/dayjs";

interface TicketProps {
	visitor: VisitorTicket;
}

const VisitorDetails: React.FC<TicketProps> = ({ visitor }) => {
	const setDepartureTime = async () => {
		try {
			const response = await fetch(`scanner/api/?id=${visitor.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				message.success("Marked");
			} else {
				message.error("Failed");
				console.error("Error setting departure time:", response.status);
			}
		} catch (error) {
			console.error("Error setting departure time:", error);
		}
	};

	return (
		<div>
			<Descriptions
				bordered
				column={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}>
				<Descriptions.Item label="ID">{visitor.id}</Descriptions.Item>
				<Descriptions.Item label="Name">
					{visitor.name}
				</Descriptions.Item>
				<Descriptions.Item label="Phone">
					{visitor.phone?.toString()}
				</Descriptions.Item>
				<Descriptions.Item label="Vehicle Number">
					{visitor.vehicleNumber}
				</Descriptions.Item>
				<Descriptions.Item label="Email">
					{visitor.email}
				</Descriptions.Item>
				<Descriptions.Item label="Arrival Time">
					{dayjs(visitor.arrivalTime).format("YYYY-MM-DD HH:mm:ss")}
				</Descriptions.Item>
				<Descriptions.Item label="Departure Time">
					{dayjs(visitor.departureTime).format("YYYY-MM-DD HH:mm:ss")}
				</Descriptions.Item>
				<Descriptions.Item label="Purpose of Visit">
					{visitor.purposeOfVisit}
				</Descriptions.Item>
				<Descriptions.Item label="Visited Department">
					{visitor.visitedDepartment}
				</Descriptions.Item>
				<Descriptions.Item label="Remarks">
					{visitor.remarks}
				</Descriptions.Item>
			</Descriptions>

			<Button type="primary" onClick={setDepartureTime}>
				Mark Departure Now
			</Button>
		</div>
	);
};

export default VisitorDetails;
