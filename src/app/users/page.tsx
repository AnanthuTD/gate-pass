"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";

function UserList() {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const response = await fetch("/api/users");
			if (!response.ok) {
				throw new Error(`Failed to fetch users: ${response.status}`);
			}
			const data = await response.json();
			setUsers(data.users);
		} catch (error) {
			console.error("Error fetching users:", error);
			message.error("Failed to fetch users");
		}
	};

	const deleteUser = async (email: string) => {
		try {
			const response = await fetch("/api/users", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});
			if (!response.ok) {
				throw new Error(`Failed to delete user: ${response.status}`);
			}
			message.success("User deleted successfully");
			fetchUsers();
		} catch (error) {
			console.error("Error deleting user:", error);
			message.error("Failed to delete user");
		}
	};

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		users.length > 1
			? {
					title: "Action",
					key: "action",
					render: (text, record: User) => (
						<Button
							type="link"
							danger
							onClick={() => deleteUser(record.email)}
						>
							Delete
						</Button>
					),
			  }
			:{},
	];

	return <Table className="mt-5" dataSource={users} columns={columns} />;
}

export default UserList;
