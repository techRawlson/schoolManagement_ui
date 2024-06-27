
import { Card, CardBody, CardHeader, Heading, IconButton, SimpleGrid, Stack } from "@chakra-ui/react";
import { FcReading } from "react-icons/fc";
import { PiChalkboardTeacher } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { IoArrowBack } from "react-icons/io5";

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