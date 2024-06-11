import { Badge, Box, Button, Heading, IconButton, Input, Select, Stack, Text, useDisclosure } from "@chakra-ui/react"
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
import './LeaveApplication.css'
import { IoArrowBack, IoReturnUpBackOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
const LeaveApplication = () => {
    const navigate = useNavigate()
    const[edit,setEdit]=useState(false)
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
    setEdit(true)
    console.log(id)
    setapplicantId(id)
}
    






    useEffect(() => {
        getCurrentDate()
        getDetails()
        getLoggedInuserDetail()
    }, [])
    //
    const goback = () => {
        navigate(-1)
    }
    console.log(data)
    return <Stack height="100vh" width="100vw" >
        <Navbar />
        <IconButton as={IoArrowBack}

            size="md"
            cursor="pointer"
            onClick={goback}
            style={{ marginLeft:  '7%' }}

        />
        <ToastContainer />
        {
                <TableContainer width="96vw" margin="0 auto" >
                <Table size='lg' className="font-size-22">
                    <Thead className="font-size-22">
                        <Tr className="font-size-22">
                            <Th className="font-size-22">Type</Th>
                            <Th className="font-size-22">Staff</Th>
                            <Th className="font-size-22">Staff Id</Th>
                            <Th className="font-size-22">Start Date</Th>
                            <Th className="font-size-22">End Date</Th>
                            <Th className="font-size-22">Total Days</Th>
                            <Th className="font-size-22">Status</Th>
                            <Th className="font-size-22">Approver</Th>
                            <Th className="font-size-22">Approved Date</Th>
                            <Th className="font-size-22"> Comment</Th>
                            <Th className="font-size-22">Approver Comments</Th>
                            <Th className="font-size-22">Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody className="font-size-22">
                        {
                            data?.map((elm) => (
                                <Tr className="font-size-22">
                                    <Td className="font-size-22">{elm.leaveType}</Td>
                                    <Td className="font-size-22">{elm.staffName}</Td>
                                    <Td className="font-size-22">{elm.staffId}</Td>
                                    <Td className="font-size-22">{elm.startDate}</Td>
                                    <Td className="font-size-22">{elm.endDate}</Td>
                                    <Td className="font-size-22">{elm.totalDays}</Td>
                                    <Td className="font-size-22">{elm.status == null ? 'Pending' : elm.status}</Td>
                                    <Td className="font-size-22">{elm.approvedBy==null?elm.approver:elm.approvedBy}</Td>
                                    <Td className="font-size-22">{elm?.approvedDate == null ? 'Pending' : elm?.approvedDate}</Td>
                                    <Td className="font-size-22">{elm.comment}</Td>
                                    <Td className="font-size-22">{elm.approverComment}</Td>
                                    <Td className="font-size-22">
                                        <Button bgColor="lightgreen" onClick={() => reviewApplication(elm.id)}>Edit</Button>
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
                <Button width="160px" colorScheme="green" position="absolute" bottom="2rem" left="5rem">Print</Button>

            </TableContainer>
            
        }
        {
            isAdmin ? "" : <Button bgColor="orangered" borderRadius="10px" height="5%" alignSelf="flex-end" marginRight="1%" onClick={() => {
                setEdit(false)
                setOverlay(<OverlayTwo />)
                onOpen()
            }}
            >New Request</Button>
        }


      
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
                {overlay}
                <ModalContent  >
                    <ModalHeader>
                        <Badge colorScheme="red" fontSize="16px">  {edit==true?'':'New Request'}</Badge>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody overflowY="auto">
                        <Table>
                            <TableContainer>
                                <Table variant='striped' colorScheme='teal'>

                                    <Tbody>
                                       {
                                       <KeyValueTable
                                        edit={edit}
                                        data={user}
                                        users={user}
                                        fire={fire}
                                        onClose={onClose}
                                        setFire={setFire}
                                        getDetails={getLoggedInuserDetail}
                                        applicantId={applicantId}
                                    />
                                       }
                                                    
                                                
                                        


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