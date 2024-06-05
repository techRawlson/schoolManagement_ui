import { Box, Table, Tbody, Tr, Td, Heading, Input, Select, ModalFooter, Button, Badge } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const KeyValueTableAdmin = ({ data, fire, setFire, onClose, getDetails, applicantId, getLoggedInuserDetail }) => {
    const [user, setUser] = useState([])
    const [leave, setLeave] = useState("")

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
    console.log(user)
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
        const ap = localStorage.getItem('staffName')
        const body = {
            approvedDate: status == 'Approved' || status == 'Rejected' ? currentDate : '',
            status: status,
            approverComment: approverComments,
            leaveType: user.leaveType,
            startDate: user.startDate,
            endDate: user.endDate,
            totalDays: user.totalDays,
            comment: user.comment,
            approvedBy: ap
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
            //clearing all notifiations here

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

    const notificationClear = async () => {
        const response = await fetch(`http://localhost:8090/api/all/read`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({ isRead: true }),
        });
    }









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
                            {user.leaveType}
                        </Td>
                    </Tr>

                    <Tr >
                        <Td fontWeight="bold">Leave Start</Td>
                        <Td>{user.startDate}</Td>
                    </Tr>
                    <Tr >
                        <Td fontWeight="bold">Leave Ends</Td>
                        <Td>{user.endDate}</Td>
                    </Tr>
                    <Tr >
                        <Td fontWeight="bold">Total Days</Td>
                        <Td>{user.totalDays}</Td>
                    </Tr>
                    <Tr >
                        <Td fontWeight="bold">Comments</Td>
                        <Td>{user.comment}</Td>
                    </Tr>
                    {
                        user.status == null ? "" : <Tr >
                            <Td fontWeight="bold">{user.status} By</Td>
                            <Td>{user.approvedBy}</Td>
                        </Tr>
                    }

                    <Tr >
                        <Td fontWeight="bold">{user.status} Comment</Td>
                        <Td>
                            {
                                user.status == null || user.status == '' ? <Input
                                    type='text'
                                    border="1px solid lightskyblue"
                                    onChange={(e) => setApprovercomments(e.target.value)}
                                    fontSize="18px"
                                /> : <>{user.approverComment}</>
                            }</Td>
                    </Tr>


                </Tbody>
            </Table>
            <>
                {user.status == null || user.status === '' ? (
                    <ModalFooter display="flex" justifyContent="space-between">
                        <Button bgColor="red" onClick={() => adminPost('Rejected')}>
                            Reject
                        </Button>
                        <Button onClick={() => adminPost('Approved')} bgColor="lightgreen">
                            Approve
                        </Button>
                    </ModalFooter>
                ) : (
                    <Badge
                        colorScheme={user.status === 'Approved' ? 'green' : 'red'}
                        px={4}
                        py={2}
                        fontSize="lg"
                        marginLeft="70%"
                        marginTop="5%"
                    >
                        {user.status}
                    </Badge>
                )}
            </>
        </Box>
    );
};

export default KeyValueTableAdmin