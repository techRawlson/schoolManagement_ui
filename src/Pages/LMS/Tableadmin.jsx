import { Box, Table, Tbody, Tr, Td, Heading, Input, Select, ModalFooter, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const KeyValueTableAdmin = ({ data, fire, setFire, onClose, getDetails, applicantId, getLoggedInuserDetail }) => {
    const [user, setUser] = useState([])
    const [leave, setLeave] = useState("")
    const leaveTypes = data?.leaveBalances.map((elm) => elm)
    const [leaveStart, setleaveStart] = useState("")
    const [leaveEnd, setLeaveEnd] = useState("")
    const totalDays = Math.ceil(Math.abs(new Date(leaveStart) - new Date(leaveEnd)) / (1000 * 60 * 60 * 24)) + 1
    const [approverComments, setApprovercomments] = useState("")
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
    console.log(data)

    // const post = async (status) => {
    //     const body = {
    //         approver: data.approver,
    //         comment: approverComments,
    //         status: status
    //     }
    //     try {
    //         const data = await fetch(`http://localhost:8090/api/staff-application/create`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(body)
    //         })
    //         const fdata = await data.json()
    //         console.log(fdata)
    //         if (data.status >= 200 && data.status < 300) {
    //             toast.success("New request created")
    //             onClose()
    //             setFire(false)
           
    //         } else {
    //             toast.success("something went wrong")
    //         }

    //         console.log(body)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const adminPost = async (status) => {
        const body = {
            approvedDate: status == 'Approved' || status == 'Rejected' ? currentDate : '',
            status: status,
            approverComment:approverComments
        }
        try {
            console.log(body)
            const data1 = await fetch(`http://localhost:8090/api/staff-application/${applicantId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            const fdata = await data1.json()
            console.log(fdata)
            if (data1.ok) {
                toast.success("request updated")
                await getLoggedInuserDetail()
                onClose()
            } else {
                toast.error("something went wrong")
            }

            console.log(body)
        } catch (error) {
            console.log(error)
        }
    }



    const [leaveBalances, setleaveBalances] = useState([])
    const getUser = async () => {
        try {
            console.log(applicantId)
            const data1 = await fetch(`http://localhost:8090/api/staff-application/${applicantId}`)
            const fdata1 = await data1.json()
            console.log(fdata1)
            setUser(fdata1)
            const data2 = await fetch(`http://localhost:8090/api/Approval/staff/${data.staffId}`)
            const fdata2 = await data2.json()
            console.log(fdata2)
            setleaveBalances(fdata2)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUser()
    }, [])






    useEffect(() => {
        getCurrentDate()
    }, [])


    return (

        <Box borderWidth="1px" borderRadius="md" overflow="hidden" p={5}>
            <ToastContainer />
            <Table variant="striped">
                <Tbody>

                    <Tr >
                        <Td fontWeight="bold">Name</Td>
                        <Td>{user.staffName}</Td>
                    </Tr>
                    <Tr >
                        <Td fontWeight="bold">Emp Id</Td>
                        <Td>{user.staffId}</Td>
                    </Tr>
                    {/* <Tr >
                        <Td fontWeight="bold">Approver</Td>
                        <Td>{user.approver}</Td>
                    </Tr> */}
                    <Tr >
                        <Td fontWeight="bold">
                            LeaveType

                        </Td>
                        <Td>
                            <Select onChange={(e) => setLeave(e.target.value)} disabled value={user.leaveType}>
                                <option>Select</option>
                                {
                                    leaveTypes?.map((elm) =>
                                        <option>{elm.leaveName}</option>
                                    )
                                }
                            </Select>
                        </Td>
                    </Tr>
                    {/* <Tr >
                        <Td fontWeight="bold">
                            LeaveBalance
                        </Td>
                        <Td>
                            <Select disabled>
                                <option>{leaveBalances?.leaveBalances?.find((elm) => elm?.leaveName)?.value}</option>

                            </Select>
                        </Td>
                    </Tr> */}
                    <Tr >
                        <Td fontWeight="bold">Leave Start</Td>
                        <Td><Input type="date" value={user.startDate} disabled /></Td>
                    </Tr>
                    <Tr >
                        <Td fontWeight="bold">Leave Ends</Td>
                        <Td><Input type="date" value={user.endDate} disabled /> </Td>
                    </Tr>
                    <Tr >
                        <Td fontWeight="bold">Total Days</Td>
                        <Td>{user.totalDays}</Td>
                    </Tr>
                    <Tr >
                        <Td fontWeight="bold">Comments</Td>
                        <Td><Input type='text' border="1px solid lightskyblue" fontSize="18px" disabled value={user.comment} /></Td>
                    </Tr>
                    <Tr >
                        <Td fontWeight="bold">Approver Comment</Td>
                        <Td><Input type='text' border="1px solid lightskyblue" onChange={(e) => setApprovercomments(e.target.value)} fontSize="18px" /></Td>
                    </Tr>
                </Tbody>
            </Table>
            <ModalFooter display="flex" justifyContent="space-between">
                <Button  bgColor="Red" onClick={() => adminPost('Rejected')}>Reject</Button>
                <Button onClick={() => adminPost('Approved')} bgColor="lightgreen">Approve</Button>
            </ModalFooter>
        </Box>
    );
};

export default KeyValueTableAdmin