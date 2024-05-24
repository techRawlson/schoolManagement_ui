import { Box, Button, Checkbox, Input, Stack } from "@chakra-ui/react"
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
import { ToastContainer, toast } from "react-toastify"
import Navbar from "../../components/Navbar"


const LeaveDefinition = () => {
    const [data, setData] = useState([])
    const getDetails = async () => {
        try {
            const data = await fetch('http://localhost:8090/api/LVM/All-Data')
            const fdata = await data.json()
            console.log(fdata)
            setData(fdata)
        } catch (error) {
            console.log(error)
        }
    }
    const [edit, setEdit] = useState(false)








    useEffect(() => {
        getDetails()
    }, [])

    console.log(data)



    const editData = async (value, i) => {

    
        try {
            let editd = [...data];
            editd[i] = {
                ...editd[i],
                checkBox: !value
            };
            setData(editd)
        } catch (error) {
            console.log(error)
        }
    }

    const Update = async () => {
        console.log(data)
        try {
            const da = await fetch('http://localhost:8090/api/LVM/checkbox', {
                method: 'PUT', // or 'GET', 'PUT', 'DELETE', etc. depending on the request
                headers: {
                    'Content-Type': 'application/json', // specifies the type of content being sent
                },
                body: JSON.stringify(data)
            })
            if (da.status >= 200 && da.status <= 299) {
                toast.success('updated successfully')
                await getDetails()
                setEdit(false)
            }

        } catch (error) {
            console.log(error)
        }
    }



    return <Stack minH="100vh" minW="100vw" fontSize="16px">
        <Navbar/>
        <ToastContainer/>
        <Box >
            <Stack maxW="60vw" margin="0 auto" >
                <TableContainer>
                    <Table size='sm'>
                        <Thead>
                            <Tr>
                                <Th fontSize="16px">S.No.</Th>
                                <Th fontSize="16px">Leave Type</Th>
                                <Th fontSize="16px">Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                edit == false ? data?.map((elm, i) => (
                                    <Tr >
                                        <Td fontSize="16px" >{i + 1}</Td>
                                        <Td fontSize="16px" >{elm.leaveType}</Td>
                                        <Td fontSize="16px" >{elm.checkBox==true?'True ':'False'}</Td>
                                    </Tr>
                                )) :
                                    data?.map((elm, i) => (
                                        <Tr>
                                            <Td fontSize="16px">{i + 1}</Td>
                                            <Td fontSize="16px">{elm.leaveType}</Td>
                                            <Td fontSize="16px"><Checkbox isChecked={elm.checkBox ==true ? true : false} onChange={() => editData(elm.checkBox, i)} /></Td>
                                        </Tr>
                                    ))

                            }
                            {
                                edit == false && data.length > 0 ?
                                    <Td>
                                        <Button onClick={() => setEdit(true)} bgColor="orangered">Edit</Button>
                                    </Td> : ""
                            }
                            {
                                edit == true ? <Td>
                                    <Button bgColor="green" onClick={() => Update()}>Update</Button>
                                </Td> : ''
                            }




                        </Tbody>

                    </Table>
                </TableContainer>
            </Stack>
        </Box>

    </Stack>
}
export default LeaveDefinition