import { Card, CardBody, CardHeader, Flex, Heading, Stack } from "@chakra-ui/react"
import Navbar from "../components/Navbar"
import { MdCastForEducation } from "react-icons/md"

const Main = () => {
    return <Stack minW="100vh" minH="100vh" >
        <Navbar />
        <Flex justifyContent="space-around" alignItems="center"  height="86vh" justifySelf="center"  padding="5%" >
            <Card cursor="pointer" onClick={() => nextPage("lmsdefinition")} width="18%"  height="55%" bgColor="#3B8FF2"> 
                <CardHeader>
                    <Heading size='md' textAlign="center"> LEAVE DEFINITION</Heading>
                </CardHeader>
                <CardBody>
                    <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                        <MdCastForEducation
                            size={95} />
                    </Stack>
                </CardBody>

            </Card><Card cursor="pointer" onClick={() => nextPage("lms")} width="18%" height="55%" bgColor="#F37A7E">
                <CardHeader>
                    <Heading size='md' textAlign="center"> LEAVES ALLOTMENT</Heading>
                </CardHeader>
                <CardBody>
                    <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                        <MdCastForEducation
                            size={95} />
                    </Stack>
                </CardBody>

            </Card><Card cursor="pointer" onClick={() => nextPage("lms")} width="18%" height="55%" bgColor="#33B1AB">
                <CardHeader>
                    <Heading size='md' textAlign="center"> LEAVE APPLICATION</Heading>
                </CardHeader>
                <CardBody>
                    <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                        <MdCastForEducation
                            size={95} />
                    </Stack>
                </CardBody>

            </Card><Card cursor="pointer" onClick={() => nextPage("lms")} width="18%"  height="55%" bgColor="#1E1E2C" color="white">
                <CardHeader>
                    <Heading size='md' textAlign="center">STAFF LMS</Heading>
                </CardHeader>
                <CardBody>
                    <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                        <MdCastForEducation
                            size={95} />
                    </Stack>
                </CardBody>

            </Card><Card cursor="pointer" onClick={() => nextPage("lms")} width="18%"  height="55%" bgColor="#E0B40F">
                <CardHeader>
                    <Heading size='md' textAlign="center"> LEAVE APPROVALS</Heading>
                </CardHeader>
                <CardBody>
                    <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                        <MdCastForEducation
                            size={95} />
                    </Stack>
                </CardBody>

            </Card>
        </Flex>
    </Stack>
}
export default Main