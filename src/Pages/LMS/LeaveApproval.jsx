import { Badge, Box, Button, Heading, IconButton, Input, Select, useDisclosure } from "@chakra-ui/react"
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
import { IoArrowBack, IoReturnUpBackOutline } from "react-icons/io5"
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


    
    useEffect(() => {
        // Define the asynchronous function
        const onPageLoad = async () => {
          console.log("User has reached the specific page");
          
          try {
            const response = await fetch(`http://localhost:8090/api/all/read`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              // body: JSON.stringify({ isRead: true }), // Uncomment and use if the body is required
            });
    
            if (response.ok) {
              const data = await response.json();
              console.log('Response data:', data);
            } else {
              console.error('Failed to fetch:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        // Call the asynchronous function
        onPageLoad();
      }, []); 

    return <Box minH="100vh">
        <Navbar />
        <IconButton as={IoArrowBack}

            size="md"
            cursor="pointer"
            onClick={goback}
            style={{ marginLeft: '7%' }}

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
                                    <Td className="font-size-22">{elm.approvedBy == null ? elm.approver : elm.approvedBy}</Td>

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
                                        <Button bgColor={elm.status == null ? 'red' : 'grey'}
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
            <Button width="160px" colorScheme="green" position="absolute" bottom="2rem" left="5rem">Print</Button>

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