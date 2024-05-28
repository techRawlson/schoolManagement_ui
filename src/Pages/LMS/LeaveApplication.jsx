import { Badge, Box, Button, Heading, Input, Select, Stack, Text, useDisclosure } from "@chakra-ui/react"
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
import Navbar from "../../components/Navbar"

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
import KeyValueTable from "./Table"
import { ToastContainer, toast } from "react-toastify"
import KeyValueTableAdmin from "./Tableadmin"
const LeaveApplication = () => {
    const [applicantId, setapplicantId] = useState(null)
    const [isAdmin, setisAdmin] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [fire, setFire] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [data, setData] = useState([])
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
    const getLoggedInuserDetail = async () => {
        try {
            const data = await fetch(`http://localhost:8090/api/Approval/staff/${localStorage.getItem('username')}`)
            const fdata = await data.json()
            console.log(fdata)
            setUser(fdata)
            const data1 = await fetch(`http://localhost:8090/api/staff-application/byApprover/${fdata.approver}`)
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
    const [user, setUser] = useState({})
    
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









    const adminPost = async (i) => {
        const body = {
            approvedDate: data[i].status == 'Approved' || data[i].status == 'Rejected' ? currentDate : '',
            status: data[i].status
        }
        try {
            console.log(body)
            const data1 = await fetch(`http://localhost:8090/api/staff-application/${data[i].id}`, {
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
                await getDetails()
            } else {
                toast.error("something went wrong")
            }

            console.log(body)
        } catch (error) {
            console.log(error)
        }
    }



    const handleChange = (i, value) => {
        try {
            let tdata = data;
            tdata[i].approvedDate = currentDate,
                tdata[i].status = value
            console.log(tdata)
        } catch (error) {
            console.log(error)
        }
    }

    const adminAction = (name) => {
        setOverlay(<OverlayTwo />)
        onOpen()
        setapplicantId(name)
    }

const reviewApplication=(id)=>{
    setOverlay(<OverlayTwo />)
    onOpen()
    setapplicantId(id)
}
    






    useEffect(() => {
        getCurrentDate()
        getDetails()
        getLoggedInuserDetail()
    }, [])
    //

    console.log(data)
    return <Stack height="100vh" width="100vw">
        <Navbar />
        <ToastContainer />
        {
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
                                <Th>Approver Comments</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                data?.map((elm) => (
                                    <Tr>
                                        <Td>{elm.leaveType}</Td>
                                        <Td>{elm.staffName}</Td>
                                        <Td>{elm.staffId}</Td>
                                        <Td>{elm.startDate}</Td>
                                        <Td>{elm.endDate}</Td>
                                        <Td>{elm.totalDays}</Td>
                                        <Td>{elm.status == null ? 'Pending' : elm.status}</Td>
                                        <Td>{elm.approver}</Td>
                                        <Td>{elm?.approvedDate == null ? 'Pending' : elm?.approvedDate}</Td>
                                        <Td>{elm.approverComment}</Td>
<Td>
    <Button bgColor="red" onClick={()=>reviewApplication(elm.id)}>Action</Button>
</Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
        }
        {
            isAdmin ? "" : <Button bgColor="orangered" borderRadius="10px" height="5%" alignSelf="flex-end" marginRight="1%" onClick={() => {
                setOverlay(<OverlayTwo />)
                onOpen()
            }}
            >New Request</Button>
        }


        {/* <Stack> */}
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
                {overlay}
                <ModalContent>
                    <ModalHeader>
                        <Badge colorScheme="red" fontSize="16px">  New Request</Badge>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Table>
                            <TableContainer>
                                <Table variant='striped' colorScheme='teal'>

                                    <Tbody>
                                       <Box p={5}>
                                                    <KeyValueTable
                                                        data={user}
                                                        fire={fire}
                                                        onClose={onClose}
                                                        setFire={setFire}
                                                        getDetails={getDetails}
                                                        applicantId={applicantId}
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


        {/* </Stack> */}
    </Stack>
}
export default LeaveApplication