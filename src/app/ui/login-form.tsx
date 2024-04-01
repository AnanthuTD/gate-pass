"use client";

import { Form, Input, Button, Typography, message, Card } from "antd";
import { UserOutlined, LockOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { authenticate } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

const { Text } = Typography;

export default function LoginForm() {
	const [errorMessage, dispatch] = useFormState(authenticate, undefined);

	return (
		<Form onFinish={dispatch} className="space-y-3">
			<Card className="flex-1 rounded-lg px-6 pb-4 pt-8">
				<h1 className={`mb-3 text-2xl`}>Please log in to continue.</h1>
				<div className="w-full">
					<Form.Item
						name="email"
						rules={[
							{
								required: true,
								message: "Please enter your email address.",
							},
							{
								type: "email",
								message: "Please enter a valid email address.",
							},
						]}
					>
						<Input
							prefix={<UserOutlined className="site-form-item-icon" />}
							placeholder="Email"
						/>
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{ required: true, message: "Please enter your password." },
						]}
					>
						<Input
							prefix={<LockOutlined />}
							type="password"
							placeholder="Password"
						/>
					</Form.Item>
				</div>
				<LoginButton />
				<div
					className="flex h-8 items-end space-x-1"
					aria-live="polite"
					aria-atomic="true"
				>
					{errorMessage && (
						<>
							<ExclamationCircleOutlined className="h-5 w-5 text-red-500" style={{color:'red'}}/>
							<Text type="danger" className="text-sm">
								{errorMessage}
							</Text>
						</>
					)}
				</div>
			</Card>
		</Form>
	);
}

function LoginButton() {
	const { pending } = useFormStatus();

	return (
		<Button
			className="mt-4 w-full bg-black"
			aria-disabled={pending}
			htmlType="submit"
		>
			<div className="flex justify-around w-fit m-auto">Log in</div>
		</Button>
	);
}
