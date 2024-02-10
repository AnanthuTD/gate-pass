type ExtendedVisitorTicket = VisitorTicket & { id: number };
type StudentTicket = {
	id: number;
    name: string,
    program: string,
    semester: number,
    arrivalTime?: Date | undefined;
};
