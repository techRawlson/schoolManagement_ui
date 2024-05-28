import { Card, CardBody, CardHeader, Flex, Heading, Stack } from "@chakra-ui/react"
import Navbar from "../../components/Navbar"
import { MdCastForEducation } from "react-icons/md"
import { useNavigate } from "react-router-dom"

const Main = () => {
    const navigate = useNavigate()
    const nextPage = (data) => {
        try {
            console.log(data)
            navigate(`/${data}`)
        } catch (error) {
            console.log(error)
        }
    }
    return <Stack minW="100vw" minH="200vh" >
        <Navbar />
        <Flex
            justifyContent="space-around"
            alignItems="center"
            
            justifySelf="center"
            padding="5%"
            flexWrap="wrap"
        >
            <Card
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

            <Card
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
        </Flex>
    </Stack>
}
export default Main