import { Box, Flex, Heading, IconButton } from "@chakra-ui/react"
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
import { useData } from "./context/DataContext"
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { IoArrowBack } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
const Role = () => {


    const [data, setData] = useState([])


    const getData = async () => {
        try {
            const data1 = await fetch('http://localhost:8081/api/Login/allUsersLog')
            if (!data1.ok) {
                throw new Error('something went wrong')
            }
            const data1Json = await data1.json()
            console.log(data1Json)
            setData(data1Json)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    //go back to previous page
    const navigate = useNavigate()



    const goback = () => {
        navigate(-1)
    }
    return <div style={{ width: "100vw", margin: '0', padding: '0', boxSizing: 'border-box' }} >
        <Box >
            <Navbar />
            <Flex alignItems="center" >
                <IconButton background="none" size="sm" as={IoArrowBack} cursor="pointer" onClick={goback} left="2rem"/>
            </Flex>
            <TableContainer >
                <Table variant='simple' minH="100vh">
                    <Thead>
                        <Tr>
                            <Th>id</Th>
                            <Th>userId</Th>
                            <Th>password</Th>
                            <Th>Role</Th>
                            <Th>staffname</Th>
                            <Th>status</Th>
                        </Tr>
                    </Thead>
                    <Tbody >
                        {
                            data?.map((elm) => (
                                <Tr>
                                    <Td>{elm.id}</Td>
                                    <Td>{elm.userId}</Td>
                                    <Td >{elm.password}</Td>
                                    <Td>{elm.role}</Td>
                                    <Td>{elm.staffName}</Td>
                                    <Td>{elm.enabled == true ? 'Active' : 'Inactive'}</Td>
                                </Tr>
                            ))
                        }


                    </Tbody>

                </Table>
            </TableContainer>
        </Box>
    </div>
}
export default Role