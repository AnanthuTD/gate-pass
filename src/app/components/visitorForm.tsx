"use client";
import React, { useState, useRef } from "react";
import { Form, Input, Button, message } from "antd";
import Ticket from "./ticket";

const VisitorForm: React.FC = () => {
	const [form] = Form.useForm();
	const [ticketInfo, setTicketInfo] = useState<VisitorTicket | null>(null);

	const handleSubmit = async (values: any) => {
		try {
			console.log("Form values:", values);

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
		}
	};

	return (
		<div>
			<Form form={form} layout="vertical" onFinish={handleSubmit}>
				<Form.Item
					label="Name"
					name="name"
					rules={[
						{ required: true, message: "Please enter your name" },
					]}>
					<Input />
				</Form.Item>

				<Form.Item
					label="Mobile Number"
					name="phone"
					rules={[
						{
							required: true,
							message: "Please enter your mobile number",
						},
						{
							pattern: /^[0-9]{10}$/,
							message:
								"Please enter a valid 10-digit mobile number",
						},
					]}>
					<Input />
				</Form.Item>

				<Form.Item
					label="Purpose of Visit"
					name="purposeOfVisit"
					rules={[
						{
							required: true,
							message: "Please enter the purpose of your visit",
						},
					]}>
					<Input.TextArea />
				</Form.Item>

				<Form.Item label="Vehicle Number" name="vehicleNumber">
					<Input />
				</Form.Item>

				<Form.Item
					label="Visiting Department"
					name="visitingDepartment">
					<Input />
				</Form.Item>

				<Form.Item label="Remarks" name="remarks">
					<Input.TextArea />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>

			{ticketInfo && (
				<div hidden>
					<Ticket ticketInfo={ticketInfo} />
				</div>
			)}
		</div>
	);
};

export default VisitorForm;
