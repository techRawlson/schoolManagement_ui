import { Card, CardBody, CardHeader, Flex, Heading, IconButton, Stack } from "@chakra-ui/react"
import Navbar from "../../components/Navbar"
import { MdCastForEducation } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { IoArrowBack } from "react-icons/io5"

const Main = () => {
    const Role = localStorage.getItem("Role")
    const navigate = useNavigate()
    const goback = () => {
        navigate(-1)
    }
    const nextPage = (data) => {
        try {
            console.log(data)
            navigate(`/${data}`)
        } catch (error) {
            console.log(error)
        }
    }
    return <Stack minW="98.7vw" minH="98vh" >
        <Navbar />
        <IconButton as={IoArrowBack}
            size="md"
            cursor="pointer"
            onClick={goback}
            style={{ marginLeft: '7%' }}

        />
        <Flex
            justifyContent="space-around"
            alignItems="center"

            justifySelf="center"
            padding="5%"
            flexWrap="wrap"
        >
            {
                Role == 'staff' ? "" : <Card
                    cursor="pointer"
                    onClick={() => nextPage("lmsdefinition")}
                    width={['90%', '45%', '30%', '18%']}
                    height={['40%', '40%', '50%', '55%']}
                    bgColor="#3B8FF2"
                    margin="1%"
                >
                    <CardHeader>
                        <Heading size="md" textAlign="center">LEAVE DEFINITION</Heading>
                    </CardHeader>
                    <CardBody>
                        <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                            <MdCastForEducation size={95} />
                        </Stack>
                    </CardBody>
                </Card>
            }

            {
                Role == 'staff' ? "" : <Card
                    cursor="pointer"
                    onClick={() => nextPage("lmsleaveallotment")}
                    width={['90%', '45%', '30%', '18%']}
                    height={['40%', '40%', '50%', '55%']}
                    bgColor="#F37A7E"
                    margin="1%"
                >
                    <CardHeader>
                        <Heading size="md" textAlign="center">LEAVES ALLOTMENT</Heading>
                    </CardHeader>
                    <CardBody>
                        <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                            <MdCastForEducation size={95} />
                        </Stack>
                    </CardBody>
                </Card>
            }


            <Card
                cursor="pointer"
                onClick={() => nextPage("lmsleaveapplication")}
                width={['90%', '45%', '30%', '18%']}
                height={['40%', '40%', '50%', '55%']}
                bgColor="#33B1AB"
                margin="1%"
            >
                <CardHeader>
                    <Heading size="md" textAlign="center">LEAVE APPLICATION</Heading>
                </CardHeader>
                <CardBody>
                    <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                        <MdCastForEducation size={95} />
                    </Stack>
                </CardBody>
            </Card>

            <Card
                cursor="pointer"
                onClick={() => nextPage("lms")}
                width={['90%', '45%', '30%', '18%']}
                height={['40%', '40%', '50%', '55%']}
                bgColor="#1E1E2C"
                color="white"
                margin="1%"
            >
                <CardHeader>
                    <Heading size="md" textAlign="center">STAFF LMS</Heading>
                </CardHeader>
                <CardBody>
                    <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                        <MdCastForEducation size={95} />
                    </Stack>
                </CardBody>
            </Card>

            <Card
                cursor="pointer"
                onClick={() => nextPage("lmsleaveapproval")}
                width={['90%', '45%', '30%', '18%']}
                height={['40%', '40%', '50%', '55%']}
                bgColor="#E0B40F"
                margin="1%"
            >
                <CardHeader>
                    <Heading size="md" textAlign="center">LEAVE APPROVALS</Heading>
                </CardHeader>
                <CardBody>
                    <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                        <MdCastForEducation size={95} />
                    </Stack>
                </CardBody>
            </Card>
            <Card
                cursor="pointer"
                onClick={() => nextPage("lmsbalance")}
                width={['90%', '45%', '30%', '18%']}
                height={['40%', '40%', '50%', '55%']}
                bgColor="orangered"
                margin="1%"
            >
                <CardHeader>
                    <Heading size="md" textAlign="center">LEAVE BALANCE</Heading>
                </CardHeader>
                <CardBody>
                    <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                        <MdCastForEducation size={95} />
                    </Stack>
                </CardBody>
            </Card>
        </Flex>
    </Stack>
}
export default Main