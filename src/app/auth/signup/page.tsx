"use client";
import { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { useRouter } from "next/navigation";
import Title from "antd/es/typography/Title";

const SignUpPage = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const signUp = async (userData: User) => {
		try {
			const response = await fetch("/signup/api", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			});

			if (!response.ok) {
				throw new Error("Failed to sign up");
			}

			return await response.json();
		} catch (error) {
			throw new Error("Failed to sign up");
		}
	};

	const onFinish = async (values: User) => {
		setLoading(true);
		try {
			const response = await signUp(values);
			if (response.ok) {
				message.success("Sign up successful! Please log in.");
				router.push("/login");
			} else {
				message.error("Sign up failed. Please try again.");
			}
		} catch (error) {
			console.error("Error signing up:", error);
			message.error("An error occurred. Please try again.");
		}
		setLoading(false);
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<Card style={{ width: 400 }}>
				<Title level={3}>Sign Up</Title>
				<Form onFinish={onFinish}>
					<Form.Item
						name="name"
						label="Name"
						rules={[
							{ required: true, message: "Please enter your name" },
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="email"
						label="Email"
						rules={[
							{ required: true, message: "Please enter your email" },
							{ type: "email", message: "Invalid email" },
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="password"
						label="Password"
						rules={[
							{ required: true, message: "Please enter your password" },
						]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" loading={loading}>
							Sign Up
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default SignUpPage;
