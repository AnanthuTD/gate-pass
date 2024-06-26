"use client";

import React, { useState, useEffect } from "react";
import { Layout, Dropdown, Button, Grid, Avatar } from "antd";
import {
	UserOutlined,
	LogoutOutlined,
	BulbOutlined,
	SettingOutlined,
	QrcodeOutlined,
	OrderedListOutlined,
	UserAddOutlined,
} from "@ant-design/icons";
import { ConfigProvider, theme } from "antd";
import Image from "next/image";
import Title from "antd/es/typography/Title";
import type { MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "./lib/actions";

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
				className="mt-2 rounded-md"
				width={40} // Default width
				height={40} // Default height
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
				className="mt-2 rounded-md"
				width={35}
				height={35}
			/>
			<Link href={"/"} prefetch>
				<Title level={4} style={{ marginLeft: 10, marginBottom: 0 }}>
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
			key: 3,
			label: (
				<Link href={"details/"} prefetch={true}>
					Details
				</Link>
			),
			icon: <OrderedListOutlined />,
		},
		{
			key: 4,
			label: (
				<Link href={"/auth/signup"} prefetch={true}>
					Add User
				</Link>
			),
			icon: <UserAddOutlined />,
		},
		{
			key: 6,
			label: (
				<Link href={"/users"} prefetch={true}>
					List Users
				</Link>
			),
			icon: <UserOutlined />,
		},
		{
			key: 5,
			label: (
				<Button
					icon={<LogoutOutlined />}
					onClick={() => {
						LogOut();
					}}
				>
					Logout
				</Button>
			),
		},
	];

	const ScannerPathname = "/scanner";

	return (
		<ConfigProvider
			theme={{
				algorithm:
					currentTheme === "dark" ? darkAlgorithm : defaultAlgorithm,
			}}
		>
			<Layout className="h-screen">
				<Layout>
					<Header
						className="header"
						style={{
							background: "#fff",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							backgroundColor: "transparent",
							paddingInline: "0.5rem",
						}}
					>
						{screen.xl || screen.xxl || screen.lg ? logo : logo_md}
						<Title level={4} style={{ marginLeft: 10, marginBottom: 0 }}>
							Gate Pass
						</Title>
						<div className="flex items-center justify-center">
							{ScannerPathname !== pathname ? (
								<Link
									href="/scanner"
									className="inline-block mx-5"
									style={{ lineHeight: 0 }}
								>
									<QrcodeOutlined style={{ fontSize: "1.5rem" }} />
								</Link>
							) : null}
							<Dropdown trigger={["click"]} menu={{ items }}>
								{screen.xl || screen.xxl || screen.lg ? (
									<Button
										icon={<SettingOutlined />}
										style={{ marginRight: 10 }}
									>
										Settings
									</Button>
								) : (
									<Avatar size="default" icon={<SettingOutlined />} />
								)}
							</Dropdown>
						</div>
					</Header>
					<Content
						style={{
							margin: "24px 16px",
							minHeight: 280,
							border: "1px solid rgba(140, 140, 140, 0.35)",
							backgroundColor: "transparent",
						}}
						className="flex-grow"
						id="scrollableDiv"
					>
						{layoutRendered && children}
					</Content>
				</Layout>
			</Layout>
		</ConfigProvider>
	);
};

export default App;
