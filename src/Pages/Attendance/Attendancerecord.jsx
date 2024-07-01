
import { Card, CardBody, CardHeader, Heading, IconButton, SimpleGrid, Stack } from "@chakra-ui/react";
import { FcReading } from "react-icons/fc";
import { PiChalkboardTeacher } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { IoArrowBack } from "react-icons/io5";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink ,
    BreadcrumbSeparator,
  } from '@chakra-ui/react'
  import { Link as ReactRouterLink } from 'react-router-dom'
  import { ChevronRightIcon } from "@chakra-ui/icons";
const Attendancerecord = () => {
    const navigate = useNavigate()
    const nextPage = (data) => {
        try {
            console.log(data)
            navigate(`/${data}`)
        } catch (error) {
            console.log(error)
        }
    }
    const goback = () => {
        navigate(-1)
    }
   
    return <Stack h="100vh">
        <Navbar/>
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />} >
                        <BreadcrumbItem >
                            <BreadcrumbLink
                                as={ReactRouterLink}
                                to="/dashboard"
                                isCurrent={location.pathname === '/dashboard'}
                                color={location.pathname === '/dashboard' ? 'blue.400' : 'gray.400'}
                                fontWeight={location.pathname === '/dashboard' ? 'bold' : 'normal'}
                            >
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                as={ReactRouterLink}
                                to="/attendance"
                                isCurrent={location.pathname === '/attendance'}
                                color={location.pathname === '/attendance' ? 'blue.400' : 'gray.400'}
                                fontWeight={location.pathname === '/attendance' ? 'bold' : 'normal'}
                            >
                                Attendance
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                as={ReactRouterLink}
                                to="/attendancerecord"
                                isCurrent={location.pathname === '/attendancerecord'}
                                color={location.pathname === '/attendancerecord' ? 'blue.400' : 'gray.400'}
                                fontWeight={location.pathname === '/attendancerecord' ? 'bold' : 'normal'}
                            >
                                Attendance Record
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                       






                    </Breadcrumb>
        <SimpleGrid spacing={4} templateColumns='1fr 1fr' margin="auto" width="90vw" padding="0 8%">
            <Card cursor="pointer" onClick={() => nextPage("classrecord")}>
                <CardHeader>
                    <Heading size='md' textAlign="center"> Class Attendance Record </Heading>
                </CardHeader>
                <CardBody>

                    <Stack m={18} spacing={4} display="flex"
                        alignItems="center"
                        justifyContent="center">
                        <FcReading size={100} />
                    </Stack>

                </CardBody>

            </Card>
            <Card cursor="pointer" onClick={() => nextPage("studentrecord")}>
                <CardHeader>
                    <Heading size='md' textAlign="center">Student  Attendance Record</Heading>
                </CardHeader>
                <CardBody>
                    <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                        <PiChalkboardTeacher size={100} />
                    </Stack>
                </CardBody>

            </Card>
        </SimpleGrid>
    </Stack>
}
export default Attendancerecord