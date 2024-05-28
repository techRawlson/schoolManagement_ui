import { Box, Button, Heading, Input, Select } from "@chakra-ui/react"
import Navbar from "../../components/Navbar"
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { useEffect, useState } from "react"
const LeaveApproval = () => {
    const [data, setData] = useState([])
    const getDetails = async () => {
        try {
            console.log(localStorage.getItem("approver"))
            const data = await fetch(`http://localhost:8090/api/staff-application/byApprover/${localStorage.getItem("staffName")}`)
            const fdata = await data.json()
            console.log(fdata)
            setData(fdata)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getDetails()
    }, [])
    return <Box minH="100vh">
        <Navbar />
        <Box>
            <TableContainer width="96vw" margin="0 auto">
                <Table size='lg'>
                    <Thead>
                        <Tr>
                            <Th>Type</Th>
                            <Th>Staff</Th>
                            <Th>Staff Id</Th>
                            <Th>Start Date</Th>
                            <Th>End Date</Th>
                            <Th>Total Days</Th>
                            <Th>Status</Th>
                            <Th> Approver</Th>
                            <Th>Approved Date</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data?.map((elm, i) => (
                                <Tr>
                                    <Td>{elm.leaveType}</Td>
                                    <Td>{elm.staffName}</Td>
                                    <Td>{elm.staffId}</Td>
                                    <Td>{elm.startDate}</Td>
                                    <Td>{elm.endDate}</Td>
                                    <Td>{elm.totalDays}</Td>
                                    <Td>
                                        {
                                            elm.status == null ? 'Pending' : elm.status
                                        }
                                    </Td>
                                    <Td>{elm.approver}</Td>
                                    <Td><Input type="date" value={elm.approvedDate} disabled /></Td>
                                    <Td>
                                        <Select onChange={(e) => handleChange(i, e.target.value)}>
                                            <option value="pending">Pending</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Reject">Reject</option>
                                        </Select>
                                    </Td>
                                    <Td>
                                        <Button bgColor="red" >Action</Button>
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    </Box>
}
export default LeaveApproval