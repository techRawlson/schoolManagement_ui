import { Card, CardBody, CardHeader, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { FcReading } from "react-icons/fc";
import { PiChalkboardTeacher } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { IoReturnUpBackOutline } from "react-icons/io5";

const Attendance = () => {
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
      <IoReturnUpBackOutline
            size={35}
            cursor="pointer"
            onClick={goback}
            style={{ marginLeft: 'auto', marginRight: '7%' }}
        />
       <SimpleGrid spacing={4} templateColumns='1fr 1fr' margin="auto" width="90vw" padding="0 8%">
        <Card cursor="pointer" onClick={() => nextPage("attedancemarking")}>
          <CardHeader>
            <Heading size='md' textAlign="center"> Attendance Marking </Heading>
          </CardHeader>
          <CardBody>

            <Stack m={18} spacing={4} display="flex"
              alignItems="center"
              justifyContent="center">
              <FcReading size={100} />
            </Stack>

          </CardBody>

        </Card> 
        <Card cursor="pointer" onClick={() => nextPage("attendancerecord")}>
          <CardHeader>
            <Heading size='md' textAlign="center"> Attendance Record</Heading>
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
export default Attendance;