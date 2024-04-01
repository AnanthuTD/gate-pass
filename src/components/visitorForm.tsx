"use client";
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import ReactThermalPrinterTicket from "./reactThermalPrinter";
import Ticket from "./ticket";
import Title from "antd/es/typography/Title";

const VisitorForm: React.FC = () => {
	const [form] = Form.useForm();
	const [ticketInfo, setTicketInfo] = useState<VisitorTicket | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (values: any) => {
		try {
			setLoading(true);
			const ticketData: VisitorTicket = {
				name: values.name,
				phone: values.phone,
				purposeOfVisit: values.purposeOfVisit,
				vehicleNumber: values.vehicleNumber,
				visitedDepartment: values.visitingDepartment,
				remarks: values.remarks,
			};

			const response = await fetch("api/", {
				method: "POST",
				body: JSON.stringify(ticketData),
			});

			const data = await response.json();

			if (!response.ok) {
				message.error(data?.message);
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			message.success(data?.message);

			setTicketInfo(data.visitor);
		} catch (error) {
			console.error("Error during API request:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<Form
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				size="large"
			>
				<Form.Item
					label={<Title level={5}>Name</Title>}
					name="name"
					rules={[{ required: true, message: "Please enter your name" }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label={<Title level={5}>Mobile Number</Title>}
					name="phone"
					rules={[
						{
							required: true,
							message: "Please enter your mobile number",
						},
						{
							pattern: /^[0-9]{10}$/,
							message: "Please enter a valid 10-digit mobile number",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label={<Title level={5}>Purpose of Visit</Title>}
					name="purposeOfVisit"
					rules={[
						{
							required: true,
							message: "Please enter the purpose of your visit",
						},
					]}
				>
					<Input.TextArea />
				</Form.Item>

				<Form.Item label={<Title level={5}>Vehicle Number</Title>} name="vehicleNumber">
					<Input />
				</Form.Item>

				<Form.Item label={<Title level={5}>Visiting Department</Title>} name="visitingDepartment">
					<Input />
				</Form.Item>

				<Form.Item label={<Title level={5}>Remarks</Title>} name="remarks">
					<Input.TextArea />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" loading={loading}>
						Submit
					</Button>
				</Form.Item>
			</Form>

			{ticketInfo && (
				<>
					<div>
						<Ticket ticketInfo={ticketInfo} />
					</div>
					<div>
						<ReactThermalPrinterTicket ticketInfo={ticketInfo} />
					</div>
				</>
			)}
		</div>
	);
};

export default VisitorForm;
