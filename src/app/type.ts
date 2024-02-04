type VisitorTicket = {
	id?: number;
    name: string;
    phone: bigint;
    vehicleNumber?: string | null;
    email?: string | null;
    arrivalTime?: Date;
    departureTime?: Date | null;
    purposeOfVisit: string | null;
    visitedDepartment?: string | null;
    remarks?: string | null;
}