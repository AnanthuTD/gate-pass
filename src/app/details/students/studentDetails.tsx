interface Props {
	visitors?:StudentTicket[]; // Pass data as a prop
	setVisitors?: React.Dispatch<React.SetStateAction<StudentTicket[]>>; // Pass setData as a prop
}

const StudentDetails: React.FC<Props> = ({ visitors, setVisitors }) => {
  return (
    <div>Nothing here :)</div>
  )
}

export default StudentDetails