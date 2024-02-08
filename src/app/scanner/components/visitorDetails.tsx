import React, { Dispatch, SetStateAction } from "react";
import { Descriptions, Input } from "antd";
import dayjs from "@/lib/dayjs";
import SetDeparture from "./setDeparture";

interface TicketProps {
	visitor: VisitorTicket | undefined;
	ticketId: string | null;
	setTicketId: Dispatch<SetStateAction<string | null>>;
}
const { Search } = Input;

const VisitorDetails: React.FC<TicketProps> = ({
	visitor,
	ticketId,
	setTicketId,
}) => {
	return (
		<div>
			<Descriptions
				bordered
				column={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}>
				<Descriptions.Item label="ID">
					<Search
						placeholder="Ticket ID"
						defaultValue={ticketId || ""}
						addonBefore={"ID"}
						onSearch={setTicketId}
						value={ticketId || ""}
						onChange={(e) => setTicketId(e.target.value)}
					/>
				</Descriptions.Item>
				<Descriptions.Item label="Name">
					{visitor?.name}
				</Descriptions.Item>
				<Descriptions.Item label="Phone">
					{visitor?.phone?.toString()}
				</Descriptions.Item>
				<Descriptions.Item label="Vehicle Number">
					{visitor?.vehicleNumber}
				</Descriptions.Item>
				<Descriptions.Item label="Email">
					{visitor?.email}
				</Descriptions.Item>
				<Descriptions.Item label="Arrival Time">
					{dayjs(visitor?.arrivalTime).format("YYYY-MM-DD HH:mm:ss")}
				</Descriptions.Item>
				<Descriptions.Item label="Departure Time">
					{dayjs(visitor?.departureTime).format(
						"YYYY-MM-DD HH:mm:ss"
					)}
				</Descriptions.Item>
				<Descriptions.Item label="Purpose of Visit">
					{visitor?.purposeOfVisit}
				</Descriptions.Item>
				<Descriptions.Item label="Visited Department">
					{visitor?.visitedDepartment}
				</Descriptions.Item>
				<Descriptions.Item label="Remarks">
					{visitor?.remarks}
				</Descriptions.Item>
			</Descriptions>
			<div className="w-full justify-center flex my-3">
				<SetDeparture visitorId={visitor?.id} />
			</div>
		</div>
	);
};

export default VisitorDetails;
