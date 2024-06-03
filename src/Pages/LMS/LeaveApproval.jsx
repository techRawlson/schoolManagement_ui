import { Badge, Box, Button, Heading, Input, Select, useDisclosure } from "@chakra-ui/react"
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

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useEffect, useState } from "react"
import KeyValueTableAdmin from "./Tableadmin"
import { IoReturnUpBackOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
const LeaveApproval = () => {
    const navigate = useNavigate()
    const [applicantId, setapplicantId] = useState(null)
    const [data, setData] = useState([])
    const [fire, setFire] = useState(false)

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const [user, setUser] = useState({})
    const getLoggedInuserDetail = async () => {
        try {
            const data = await fetch(`http://localhost:8090/api/Approval/staff/${localStorage.getItem('username')}`)
            const fdata = await data.json()
            console.log(fdata)
            setUser(fdata)
            const data1 = await fetch(`http://localhost:8090/api/staff-application/byApprover/${fdata.staffName}`)
            const fdata2 = await data1.json()
            console.log(fdata2)
            setData(fdata2)
        } catch (error) {
            console.log(error)
        }
    }
    const getDetails = async () => {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const OverlayTwo = () => (
        <ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='80%'
            backdropBlur='2px'
        />
    )
    const [overlay, setOverlay] = useState(<OverlayOne />)



    const adminAction = (id) => {
        setOverlay(<OverlayTwo />)
        onOpen()
        setapplicantId(id)
    }



    useEffect(() => {
        getDetails()
        getLoggedInuserDetail()
    }, [])



    const goback = () => {
        navigate(-1)
    }

    return <Box minH="100vh">
        <Navbar />
        <IoReturnUpBackOutline

size={35}
cursor="pointer"
onClick={goback}
style={{ marginLeft: 'auto', marginRight: '7%' }}

/>
        <Box >
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
                                                elm.status == null ? '' : elm.status
                                            }
                                        </Td>
                                        <Td className="font-size-22">{elm.approvedBy==null?elm.approver:elm.approvedBy}</Td>

                                        <Td><Input type="date" value={elm.approvedDate} disabled /></Td>
                                        {/* <Td>
                                        <Select onChange={(e) => handleChange(i, e.target.value)}>
                                            <option value="pending">Pending</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Reject">Reject</option>
                                        </Select>
                                    </Td> */}
                                        {/* onClick={() => adminPost(i)} */}
                                        <Td>
                                            <Button bgColor="red"
                                                onClick={() => {
                                                    adminAction(elm.id)
                                                }}
                                            >Action</Button>
                                            {/* <Button bgColor="red" onClick={()=>}>Action</Button> */}
                                        </Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
                <>
            <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
                {overlay}
                <ModalContent>
                    <ModalHeader>
                        {/* <Badge colorScheme="red" fontSize="16px">  New Request</Badge> */}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Table>
                            <TableContainer>
                                <Table variant='striped' colorScheme='teal'>

                                    <Tbody>
                                       
                                                <Box p={5}>
                                                    <KeyValueTableAdmin
                                                        applicantId={applicantId}
                                                        data={user}
                                                        fire={fire}
                                                        onClose={onClose}
                                                        setFire={setFire}
                                                        getLoggedInuserDetail={getLoggedInuserDetail}
                                                      
                                                    />
                                                </Box>


                                    </Tbody>

                                </Table>
                            </TableContainer>
                        </Table>
                    </ModalBody>
                    
                     
                    

                </ModalContent>
            </Modal>
        </>
        </Box>
    </Box>
}
export default LeaveApproval