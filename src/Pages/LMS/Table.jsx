import { Box, Table, Tbody, Tr, Td, Heading, Input, Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const KeyValueTable = ({ data, fire,setFire, onClose ,getDetails}) => {
    const [leave, setLeave] = useState("")
    const leaveTypes = data?.leaveBalances.map((elm) => elm)
    const [leaveStart, setleaveStart] = useState("")
    const [leaveEnd, setLeaveEnd] = useState("")
    const totalDays = Math.ceil(Math.abs(new Date(leaveStart) - new Date(leaveEnd)) / (1000 * 60 * 60 * 24))+1
    const [comments, setcomments] = useState("")
    const [currentDate, setcurrentDate] = useState("")
    const getCurrentDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        console.log(`${yyyy}-${mm}-${dd}`)
        setcurrentDate(`${yyyy}-${mm}-${dd}`)
        // return `${yyyy}-${mm}-${dd}`;
    };
    console.log(typeof (leaveStart))
    const body = {
        leaveType: leave,
        staffName: data.staffName,
        staffId: data.staffId,
        appliedDate: currentDate,
        startDate: leaveStart,
        endDate: leaveEnd,
        totalDays: totalDays,
        approver: data.approver,
        comment: comments,
        action: null,
        status: null
    }
    const post = async () => {

        try {
            const data = await fetch(`http://localhost:8090/api/staff-application/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            const fdata = await data.json()
            console.log(fdata)
            if (data.status >= 200 && data.status < 300) {
                toast.success("New request created")
                onClose()
                setFire(false)
                await getDetails()
            } else {
                toast.success("something went wrong")
            }

            console.log(body)
        } catch (error) {
            console.log(error)
        }
    }





    




   
    useEffect(() => {
        getCurrentDate()
    }, [])
    useEffect(() => {
        if (fire) {
            post()
        }

    }, [fire])

    return (
        <Box borderWidth="1px" borderRadius="md" overflow="hidden" p={5}>
            <ToastContainer/>
            <Table variant="striped">
                <Tbody>

                    <Tr >
                        <Td fontWeight="bold">Name</Td>
                        <Td>{data.staffName}</Td>
                    </Tr>
                    <Tr >
                        <Td fontWeight="bold">Emp Id</Td>
                        <Td>{data.staffId}</Td>
                    </Tr>
                    <Tr >
                        <Td fontWeight="bold">Approver</Td>
                        <Td>{data.approver}</Td>
                    </Tr>
                    <Tr >
                        <Td fontWeight="bold">
                            LeaveType

                        </Td>
                        <Td>
                            <Select onChange={(e) => setLeave(e.target.value)} >
                                <option>Select</option>
                                {
                                    leaveTypes?.map((elm) =>
                                        <option>{elm.leaveName}</option>
                                    )
                                }
                            </Select>
                        </Td>
                    </Tr>
                    <Tr >
                        <Td fontWeight="bold">
                            LeaveBalance
                        </Td>
                        <Td>
                            <Select disabled>
                                <option>{data?.leaveBalances?.find((elm) => elm?.leaveName == leave)?.value}</option>

                            </Select>
                        </Td>
                    </Tr>
                    <Tr >
                        <Td fontWeight="bold">Leave Start</Td>
                        <Td><Input type="date" value={leaveStart} onChange={(e) => setleaveStart(e.target.value)} min={currentDate} /></Td>
                    </Tr>
                    <Tr >
                        <Td fontWeight="bold">Leave Ends</Td>
                        <Td><Input type="date" value={leaveEnd} onChange={(e) => setLeaveEnd(e.target.value)} min={currentDate} /> </Td>
                    </Tr>
                    <Tr >
                        <Td fontWeight="bold">Total Days</Td>
                        <Td>{totalDays}</Td>
                    </Tr>
                    <Tr >
                        <Td fontWeight="bold">Comments</Td>
                        <Td><Input type='text' border="1px solid lightskyblue" onChange={(e) => setcomments(e.target.value)} fontSize="18px" /></Td>
                    </Tr>
                </Tbody>
            </Table>
        </Box>
    );
};

export default KeyValueTable