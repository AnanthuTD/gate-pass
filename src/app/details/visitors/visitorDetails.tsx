"use client";
import React, { useEffect, useState } from "react";
import {
	Table,
	Button,
	Space,
	Popconfirm,
	message,
	TableColumnsType,
	Divider,
	Spin,
} from "antd";
import SetDeparture from "../../scanner/components/setDeparture";
import InfiniteScroll from "react-infinite-scroll-component";
import { getVisitorCount } from "./action";

interface Props {
	// Remove visitors prop
}

const VisitorTable: React.FC<Props> = () => {
	const [visitors, setVisitors] = useState<ExtendedVisitorTicket[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [pagination, setPagination] = useState<{
		current: number;
		pageSize: number;
	}>({ current: 1, pageSize: 10 });
	const [addedDataLength, setAddedDataLength] = useState(0);
	const [hasMoreData, setHasMoreData] = useState(true);
	const [totalDataCount, setTotalDataCount] = useState(1);

	useEffect(() => {
		setLoading(true);
		getVisitorCount()
			.then((totalCount) => {
				setTotalDataCount(totalCount);
				fetchVisitors();
			})
			.catch((error) => {
				console.error("Error fetching visitor count:", error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const fetchVisitors = async () => {
		try {
			setLoading(true);
			const response = await fetch(
				`details/visitors/api/?page=${pagination.current}&pageSize=${pagination.pageSize}`,
				{ cache: "no-cache" }
			);

			if (!response.ok) {
				throw new Error("Failed to fetch visitors");
			}
			const fetchedVisitors = await response.json();
			setAddedDataLength(fetchedVisitors.length);

			// Add fetched visitors to state
			setVisitors((prevVisitors) => [
				...prevVisitors,
				...fetchedVisitors,
			]);
			setPagination((prevPagination) => ({
				...prevPagination,
				current: prevPagination.current + 1,
			}));
		} catch (error) {
			console.error("Error fetching visitors:", error);
			message.error("Failed to fetch visitors");
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: number) => {
		try {
			let visitorId = undefined;
			const newVisitors = visitors.filter((visitor) => {
				if (visitor.id !== id) return true;
				visitorId = visitor.id;
			});

			const response = await fetch(`details/visitors/api?id=${id}`, {
				method: "DELETE",
			});
			if (!response.ok) {
				throw new Error("Failed to delete visitor");
			}
			setVisitors(newVisitors);
			message.success(`Visitor with ID ${id} deleted successfully`);
		} catch (error) {
			console.error("Error deleting visitor:", error);
			message.error("Failed to delete visitor");
		}
	};

	const handleDepartureSuccess = (visitorId: number) => {
		const updatedVisitors = visitors.map((visitor) => {
			if (visitor.id === visitorId) {
				return {
					...visitor,
					departedTime: new Date().toISOString(), 
				};
			}
			return visitor;
		});
		// Update the visitors state with the updated visitor
		setVisitors(updatedVisitors);
		message.success(
			`Departure time for visitor with ID ${visitorId} updated successfully`
		);
	};

	const columns: TableColumnsType<ExtendedVisitorTicket> = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "Vehicle Number",
			dataIndex: "vehicleNumber",
			key: "vehicleNumber",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Arrival Time",
			dataIndex: "arrivalTime",
			key: "arrivalTime",
		},
		{
			title: "Departure Time",
			dataIndex: "departureTime",
			key: "departureTime",
		},
		{
			title: "Purpose of Visit",
			dataIndex: "purposeOfVisit",
			key: "purposeOfVisit",
		},
		{
			title: "Visited Department",
			dataIndex: "visitedDepartment",
			key: "visitedDepartment",
		},
		{
			title: "Remarks",
			dataIndex: "remarks",
			key: "remarks",
		},
		{
			title: "Action",
			key: "action",
			fixed: "right",
			render: (text: any, record: ExtendedVisitorTicket) => (
				<Space size="middle" key={record.id}>
					{!record?.departureTime ? (
						<SetDeparture visitorId={record.id} onSuccess={handleDepartureSuccess} />
					) : null}
					<Popconfirm
						title="Are you sure to delete this visitor?"
						onConfirm={() => handleDelete(record.id)}
						okText="Yes"
						cancelText="No">
						<Button danger>Delete</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	useEffect(() => {
		if (!totalDataCount) return;
		if (addedDataLength < pagination.pageSize) {
			setHasMoreData(false);
		} else {
			setHasMoreData(visitors.length < totalDataCount);
		}
	}, [visitors, totalDataCount]);

	return (
		<>
			<InfiniteScroll
				dataLength={visitors.length}
				next={fetchVisitors}
				hasMore={hasMoreData}
				loader={
					<Divider plain>
						<Spin />
					</Divider>
				}
				endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
				scrollableTarget="scrollableDiv" // Provide the ID of the scrollable element
			>
				<Table
					columns={columns}
					dataSource={visitors}
					scroll={{ x: true }}
					pagination={false}
					loading={loading}
					id="scrollableDiv"
					rowKey={(record) => record.id}
				/>
			</InfiniteScroll>
		</>
	);
};

export default VisitorTable;
