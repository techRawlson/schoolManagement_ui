import { Box, Table, Tbody, Tr, Td, Heading, Input, Select, ModalFooter, Button, Badge } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './LeaveApplication.css'
const KeyValueTable = ({ data, users, fire, setFire, onClose, getDetails, applicantId, edit }) => {
    const [user, setUser] = useState([])
    const [leave, setLeave] = useState("")

    const [leaveStart, setleaveStart] = useState("")
    const [leaveEnd, setLeaveEnd] = useState("")
    const [totalDays, setTotalDays] = useState("")
    const d = users?.leaveBalances?.find((elm) => elm.leaveName == user.leaveType)?.value

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

    const body = {
        staffName: users.staffName,
        staffId: users.staffId,
        approver: users.approver,
        appliedDate: currentDate,
        approvedDate: null,
        endDate: leaveEnd,
        startDate: leaveStart,
        totalDays: totalDays,
        comment: comments,
        status: null,
        leaveType: leave,





    }
    const post = async () => {
        console.log(body)
        const time = new Date().toISOString()
        console.log(time)
        const approver = users.approver
        try {
            const users = await fetch(`http://localhost:8090/api/staff-application/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            if (users.status >= 200 && users.status < 300) {
                const tim = await fetch(`http://localhost:8090/api-notifications/sendNotification `, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: 'New notification',
                        approverName: approver,
                        timestamp: time,
                        isRead: false,
                        staffName: localStorage.getItem("staffName")
                    })
                })
                console.log(tim.status)
            }





            if (users.status >= 200 && users.status < 300) {
                toast.success("New request created")
                onClose()
                setFire(false)
                await getDetails()
            } else {
                const tex = await users.text()
                console.log(tex)
                toast.error(tex)
            }

            console.log(body)
        } catch (error) {
            console.log(error)
        }
    }

    const updateEntry = async (stat) => {
        const appBy = localStorage.getItem("staffName")
        console.log(appBy)
        const body = {
            comment: user.comment,
            leaveType: user.leaveType,
            startDate: user.startDate,
            endDate: user.endDate,
            totalDays: user.totalDays,
            approverComment: user.approverComment,
            approvedDate: currentDate,
            status: stat,
            approvedBy: appBy
        }
        console.log(body)
        console.log(applicantId)
        try {
            const users = await fetch(`http://localhost:8090/api/staff-application/${applicantId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            const fusers = await users.json()
            console.log(fusers)
            if (users.status >= 200 && users.status < 300) {
                toast.success("New request updated")
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


    const deleteEntry = async () => {
        try {
            console.log(applicantId)
            const users = await fetch(`http://localhost:8090/api/staff-application/leave-applications/${applicantId}`, {
                method: 'delete'
            })
            const fusers = await users.json()
            console.log(fusers)
            if (users.status >= 200 && users.status < 300) {
                toast.success("application deleted")
            } else {
                toast.error("something went wrong")
            }
        } catch (error) {
            console.log(error)
        }
    }


    const getUser = async () => {
        try {
            console.log(applicantId)
            const users = await fetch(`http://localhost:8090/api/staff-application/${applicantId}`)
            const fusers = await users.json()
            console.log(fusers)
            setUser(fusers)
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

    console.log(user)
    console.log(data)

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'leave':
                setLeave(value);
                break;
            case 'leaveStart':
                setleaveStart(value);
                break;
            case 'leaveEnd':
                setLeaveEnd(value);
                break;
            case 'comments':
                setcomments(value);
                break;
            default:
                break;
        }


    };
    useEffect(() => {
        if (leaveStart && leaveEnd) {
            const start = new Date(leaveStart);
            const end = new Date(leaveEnd);
            if (start <= end) {
                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                setTotalDays(diffDays);
            }
        }
    }, [leaveStart, leaveEnd]);
    console.log(leave)





    const handleChange1 = (name, value) => {
        console.log(name, value);
        console.log(user);

        // Update the user state with the new value
        const updatedUser = {
            ...user,
            [name]: value
        };

        setUser(updatedUser);

        if (name === "startDate" || name === "endDate") {
            let start = new Date(updatedUser.startDate);
            let end = new Date(updatedUser.endDate);

            if (name === "startDate") {
                start = new Date(value);
            } else if (name === "endDate") {
                end = new Date(value);
            }

            console.log(name);
            if (start <= end) {
                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                console.log(diffDays);
                setUser(prevUser => ({
                    ...prevUser,
                    totalDays: diffDays
                }));
            }
        }

        console.log(user);
    };
    console.log(user)


    const [leaveTypesAvailavle, setleaveTypesAvailavle] = useState([])
    const getleaveTypesAvailavle = async () => {
        try {
            const data = await fetch('http://localhost:8090/api/LVM/All-Data')
            const fdata = await data.json()
            console.log(fdata)
            const onlyTrue = fdata.filter((elm) => elm.checkBox == true)
            setleaveTypesAvailavle(onlyTrue)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getleaveTypesAvailavle()
    }, [])





    return (

        <Box borderWidth="1px" overflow="scroll" className="font-size-22" height="100%" width="100%">
            <ToastContainer />
            {
                edit ?
                    <Table variant="striped" className="font-size-22">
                        <Tbody className="font-size-22">

                            <Tr className="font-size-22">
                                <Td fontWeight="bold" className="font-size-22">Name</Td>
                                <Td className="font-size-22">{user.staffName}</Td>
                            </Tr>
                            <Tr className="font-size-22">
                                <Td fontWeight="bold" className="font-size-22">Emp Id</Td>
                                <Td className="font-size-22">{user.staffId}</Td>
                            </Tr>
                            <Tr className="font-size-22">
                                <Td fontWeight="bold" className="font-size-22">Approver</Td>
                                <Td className="font-size-22">{user.approver}</Td>
                            </Tr>
                            {/* <Tr className="font-size-22">
                        <Td fontWeight="bold" className="font-size-22">Leave Balance</Td>
                        <Td className="font-size-22">{d}</Td>
                    </Tr> */}
                            <Tr className="font-size-22">
                                <Td fontWeight="bold" className="font-size-22">Status</Td>
                                <Td className="font-size-22">{user.status == null || user.status == '' ? '' : user.status}</Td>
                            </Tr>
                            <Tr className="font-size-22">
                                <Td fontWeight="bold" className="font-size-22">Leave Type</Td>
                                <Td className="font-size-22">
                                    {/* <Select
                                name="leaveType"
                                onChange={(e) => {
                                    handleChange1(e.target.name, e.target.value);
                                }}
                                value={user.leaveType}
                                className="font-size-22"
                                disabled
                            >
                                {
                                    leaveTypesAvailavle?.map((elm) =>
                                        <option className="font-size-22" value={elm.leaveType}>{elm.leaveType}</option>

                                    )
                                }
                            </Select> */}
                                    {user.leaveType}
                                </Td>
                            </Tr>
                            <Tr className="font-size-22">
                                <Td fontWeight="bold" className="font-size-22">Leave Start</Td>
                                <Td className="font-size-22">
                                    {/* <Input
                                type="date"
                                name="startDate"
                                value={user.startDate}
                                onChange={(e) => {
                                    handleChange1(e.target.name, e.target.value);
                                }}
                                min={currentDate}
                                className="font-size-22"
                                disabled
                            /> */}
                                    {user.startDate}
                                </Td>
                            </Tr>
                            <Tr className="font-size-22">
                                <Td fontWeight="bold" className="font-size-22">Leave Ends</Td>
                                <Td className="font-size-22">
                                    {/* <Input
                                type="date"
                                name="endDate"
                                value={user.endDate}
                                onChange={(e) => {
                                    handleChange1(e.target.name, e.target.value);
                                }}
                                min={currentDate}
                                className="font-size-22"
                                disabled
                            /> */}
                                    {user.endDate}
                                </Td>
                            </Tr>
                            <Tr className="font-size-22">
                                <Td fontWeight="bold" className="font-size-22">Total Days</Td>
                                <Td className="font-size-22">{user.totalDays}</Td>
                            </Tr>
                            <Tr className="font-size-22">
                                <Td fontWeight="bold" className="font-size-22">Comments</Td>

                                <Td>
                                    {user.comment}
                                </Td>

                            </Tr>
                            {
                                user.status == null ? "" : <Tr >
                                    <Td fontWeight="bold">{user.status} By</Td>
                                    <Td>{user.approvedBy}</Td>
                                </Tr>
                            }
                            {
                                user.status == null ? "" :
                                    <Tr className="font-size-22">
                                        <Td fontWeight="bold" className="font-size-22">{user.status} Comment</Td>
                                        <Td className="font-size-22">{user.approverComment}</Td>
                                    </Tr>

                            }

                            {
                                user.status == null || user.status == '' ? <ModalFooter display="flex" justifyContent="space-between" className="font-size-22">
                                    <Button bgColor="red" className="font-size-22" onClick={() => updateEntry('Rejected')}>Reject</Button>
                                </ModalFooter> : ''
                            }
                            {
                                user.status == null ? "" : <Badge
                                    colorScheme={user.status === 'Approved' ? 'green' : 'red'}
                                    px={4}
                                    py={2}
                                    fontSize="lg"
                                    marginLeft="70%"
                                    marginTop="5%"
                                >
                                    {user.status}
                                </Badge>
                            }
                        </Tbody>
                    </Table>
                    :
                    <Box>
                        <Table variant="striped" className="font-size-22">
                            <Tbody className="font-size-22">
                                <Tr className="font-size-22">
                                    <Td fontWeight="bold" className="font-size-22">Name</Td>
                                    <Td className="font-size-22">{users.staffName}</Td>
                                </Tr>
                                <Tr className="font-size-22">
                                    <Td fontWeight="bold" className="font-size-22">Emp Id</Td>
                                    <Td className="font-size-22">{users.staffId}</Td>
                                </Tr>
                                <Tr className="font-size-22">
                                    <Td fontWeight="bold" className="font-size-22">Approver</Td>
                                    <Td className="font-size-22">{users.approver}</Td>
                                </Tr>
                                <Tr className="font-size-22">
                                    <Td fontWeight="bold" className="font-size-22">LeaveType</Td>
                                    <Td className="font-size-22">
                                        <Select name="leave" onChange={handleChange} value={leave} className="font-size-22">
                                            <option className="font-size-22">Select</option>
                                            {
                                                leaveTypesAvailavle?.map((elm) =>
                                                    <option className="font-size-22" value={elm.leaveType}>{elm.leaveType}</option>

                                                )
                                            }
                                        </Select>
                                    </Td>
                                </Tr>
                                <Tr className="font-size-22">
                                    <Td fontWeight="bold" className="font-size-22">Leave Balance</Td>
                                    <Td className="font-size-22">{users?.leaveBalances?.find((elm) => elm.leaveName == leave) != undefined ? users?.leaveBalances?.find((elm) => elm.leaveName == leave).value : ''}</Td>
                                </Tr>
                                <Tr className="font-size-22">
                                    <Td fontWeight="bold" className="font-size-22">Leave Start</Td>
                                    <Td className="font-size-22">
                                        <Input
                                            type="date"
                                            name="leaveStart"
                                            value={leaveStart}
                                            onChange={handleChange}
                                            min={currentDate}
                                            className="font-size-22"
                                        />
                                    </Td>
                                </Tr>
                                <Tr className="font-size-22">
                                    <Td fontWeight="bold" className="font-size-22">Leave Ends</Td>
                                    <Td className="font-size-22">
                                        <Input
                                            type="date"
                                            name="leaveEnd"
                                            value={leaveEnd}
                                            onChange={handleChange}
                                            min={currentDate}
                                            className="font-size-22"
                                        />
                                    </Td>
                                </Tr>
                                <Tr className="font-size-22">
                                    <Td fontWeight="bold" className="font-size-22">Total Days</Td>
                                    <Td className="font-size-22">{totalDays}</Td>
                                </Tr>
                                <Tr className="font-size-22">
                                    <Td fontWeight="bold" className="font-size-22">Comments</Td>
                                    <Td className="font-size-22">
                                        <Input
                                            type="text"
                                            name="comments"
                                            border="1px solid lightskyblue"
                                            onChange={handleChange}
                                            value={comments}
                                            className="font-size-22"
                                        />
                                    </Td>
                                </Tr>

                            </Tbody>
                        </Table>
                        <ModalFooter display="flex" justifyContent="space-between" className="font-size-22">
                            <Button onClick={onClose} bgColor="red" className="font-size-22">Cancel</Button>
                            <Button onClick={() => post()} bgColor="lightgreen" className="font-size-22">Submit</Button>
                        </ModalFooter>
                    </Box>
            }




        </Box>

    );
};

export default KeyValueTable