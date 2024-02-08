"use client";

import React, { useState, useEffect } from "react";
import { Layout, Dropdown, Button, Grid, Avatar } from "antd";
import {
	UserOutlined,
	LogoutOutlined,
	BulbOutlined,
	SettingOutlined,
	QrcodeOutlined,
} from "@ant-design/icons";
import { ConfigProvider, theme } from "antd";
import Image from "next/image";
import Title from "antd/es/typography/Title";
import type { MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Header, Content } = Layout;
const { darkAlgorithm, defaultAlgorithm } = theme;
const { useBreakpoint } = Grid;

interface AppProps {
	children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }: AppProps) => {
	const [layoutRendered, setLayoutRendered] = useState<boolean>(false);
	const [currentTheme, setCurrentTheme] = useState<string>("dark");
	const screen = useBreakpoint();
	const pathname = usePathname();

	useEffect(() => {
		setLayoutRendered(true);
	}, []);

	const toggleTheme = () => {
		setCurrentTheme(currentTheme === "dark" ? "default" : "dark");
	};

	const logo = (
		<div className="logo flex justify-center items-center">
			{/* Add your logo component here */}
			<Image
				src="/MES_logo.jpg"
				alt="Logo"
				className="rounded-md"
				width={50} // Default width
				height={50} // Default height
			/>
			<Link href={"/"}>
				<Title level={3} style={{ marginLeft: 10, marginBottom: 0 }}>
					MES College Marampally
				</Title>
			</Link>
		</div>
	);

	const logo_md = (
		<div className="logo flex justify-center items-center">
			{/* Add your logo component here */}
			<Image
				src="/MES_logo.jpg"
				alt="Logo"
				className="rounded-md"
				width={35}
				height={35}
			/>
			<Link href={"/"} prefetch>
				<Title level={3} style={{ marginLeft: 10, marginBottom: 0 }}>
					MES
				</Title>
			</Link>
		</div>
	);

	const items: MenuProps["items"] = [
		{
			key: 1,
			label: "Toggle Theme",
			onClick: toggleTheme,
			icon: <BulbOutlined />,
		},
		{
			key: 2,
			label: "Profile",
			icon: <UserOutlined />,
		},
		{
			key: 3,
			label: <Button icon={<LogoutOutlined />}>Logout</Button>,
		},
	];

	const ScannerPathname = "/scanner";

	return (
		<ConfigProvider
			theme={{
				algorithm:
					currentTheme === "dark" ? darkAlgorithm : defaultAlgorithm,
			}}>
			<Layout className="h-screen">
				<Layout>
					<Header
						className="header"
						style={{
							background: "#fff", // Replace with actual color or variable
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							backgroundColor: "transparent",
							paddingInline: "0.5rem",
						}}>
						{screen.xs || screen.sm || screen.md ? logo_md : logo}
						<div className="flex items-center justify-center">
							{ScannerPathname !== pathname ? (
								<Link
									href="/scanner"
									className="inline-block mx-5"
									style={{ lineHeight: 0 }}>
									<QrcodeOutlined
										style={{ fontSize: "1.5rem" }}
									/>
								</Link>
							) : null}
							<Dropdown trigger={["click"]} menu={{ items }}>
								{screen.xs || screen.sm || screen.md ? (
									<Avatar
										size="default"
										icon={<SettingOutlined />}
									/>
								) : (
									<Button
										icon={<SettingOutlined />}
										style={{ marginRight: 10 }}>
										Settings
									</Button>
								)}
							</Dropdown>
						</div>
					</Header>
					<Content
						style={{
							margin: "24px 16px",
							minHeight: 280,
							background: "#f0f2f5", // Replace with actual color or variable
							overflow: "auto",
							padding: "0 16px",
							border: "1px solid rgba(140, 140, 140, 0.35)",
							backgroundColor: "transparent",
						}}
						className="flex-grow"
						id="scrollableDiv">
						{layoutRendered && children}
					</Content>
				</Layout>
			</Layout>
		</ConfigProvider>
	);
};

export default App;
