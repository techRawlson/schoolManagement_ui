import { Stack, Card, CardHeader, CardBody, Heading, Flex, SimpleGrid } from "@chakra-ui/react"
import { ImBooks } from "react-icons/im";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

import { IoReturnUpBackOutline } from 'react-icons/io5';
const TimeTable = () => {
    const navigate = useNavigate()
    const nextPage = (data) => {
        try {
            console.log(data)
            navigate(`/${data}`)
        } catch (error) {
            console.log(error)
        }
    }
    //go back to previous page
    const goback = () => {
        navigate(-1)
    }
    return <>
        <Navbar />
        <Flex >
                <IoReturnUpBackOutline
                    size={35}
                    cursor="pointer"
                    onClick={goback}
                   style={{marginLeft:'auto',marginRight:'7%'}}
                    
                />
            </Flex>
        <Stack display='flex' flexDir='row' minH='80vh' minW='98vw'>
          


            <SimpleGrid spacing={4} templateColumns='1fr 1fr' minW='100%' alignItems='center' justifyContent='space-around' >

                <Card cursor="pointer" onClick={() => nextPage("classtimetable")} width='60%' margin="0 12%">
                    <CardHeader>
                        <Heading size='md' textAlign="center"> Class TImeTable</Heading>
                    </CardHeader>
                    <CardBody>
                        <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                            <ImBooks size={100} />
                        </Stack>
                    </CardBody>

                </Card>
                <Card cursor="pointer" onClick={() => nextPage("stafftimetable")} width='60%' margin="0 12%">
                    <CardHeader>
                        <Heading size='md' textAlign="center"> Staff TImeTable</Heading>
                    </CardHeader>
                    <CardBody>
                        <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                            <SlCalender size={95} />
                        </Stack>
                    </CardBody>

                </Card>
                <Card cursor="pointer" onClick={() => nextPage("periods")} width='60%' margin="0 12%">
                    <CardHeader>
                        <Heading size='md' textAlign="center"> Periods</Heading>
                    </CardHeader>
                    <CardBody>
                        <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                            <SlCalender size={95} />
                        </Stack>
                    </CardBody>

                </Card>
            </SimpleGrid>
        </Stack>
    </>

}
export default TimeTable