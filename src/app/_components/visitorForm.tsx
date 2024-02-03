"use client";
import React, { useState, useRef } from "react";
import { Form, Input, DatePicker, Button } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useReactToPrint } from "react-to-print";
import Ticket from "./ticket";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Kolkata");

// Define TicketInfo interface
interface TicketInfo {
	name: string;
	date: dayjs.Dayjs;
	mobileNumber: string;
	purposeOfVisit: string;
	vehicleNumber: string;
	visitingDepartment: string;
	remarks: string;
}

// Define VisitorForm component
const VisitorForm: React.FC = () => {
	const [form] = Form.useForm();
	const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(dayjs.tz());
	const [ticketInfo, setTicketInfo] = useState<TicketInfo | null>(null);

	const reactToPrintContent = React.useCallback(() => {
		return componentRef.current;
	}, []);

	const componentRef: React.MutableRefObject<HTMLDivElement | null> =
		useRef(null);

	const handlePrint = useReactToPrint({
		content: reactToPrintContent,
		documentTitle: "AwesomeFileName",
		removeAfterPrint: true,
	});

	const handleSubmit = (values: any) => {
		// Handle form submission here
		console.log("Form values:", values);

		// Generate ticket information
		const ticketData: TicketInfo = {
			name: values.name,
			date: currentDate,
			mobileNumber: values.mobileNumber,
			purposeOfVisit: values.purposeOfVisit,
			vehicleNumber: values.vehicleNumber,
			visitingDepartment: values.visitingDepartment,
			remarks: values.remarks,
		};

		setTicketInfo(ticketData);
	};

	return (
		<div>
			<Form
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				initialValues={{ date: currentDate }}>
				<Form.Item
					label="Name"
					name="name"
					rules={[
						{ required: true, message: "Please enter your name" },
					]}>
					<Input />
				</Form.Item>

				<Form.Item label="Date" name="date" hidden>
					<DatePicker />
				</Form.Item>

				<Form.Item
					label="Mobile Number"
					name="mobileNumber"
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
				<>
					<button onClick={handlePrint}>
						Print using a Functional Component with the
						useReactToPrint hook
					</button>

					<Ticket ref={componentRef} ticketInfo={ticketInfo} />
				</>
			)}
		</div>
	);
};

export default VisitorForm;
