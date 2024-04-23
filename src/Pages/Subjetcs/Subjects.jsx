import { Button, Heading, Input, Stack, Text } from "@chakra-ui/react"
import Navbar from "../../components/Navbar"
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
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
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
const Subject = () => {
    //for subjects
    const [subjects, setSubjects] = useState([])
    const [clas, setClas] = useState([])
    const getSubjects = async () => {
        try {
            const data = await fetch('http://192.168.1.10:8083/api/staff/all-subjects')
            const fdata = await data.json()
            setSubjects(fdata)
        } catch (error) {
            console.log(error)
        }
    }
    //for class
    const getClass = async () => {
        try {
            const data = await fetch('http://192.168.1.10:8082/api/students/get-AllClasses')
            const fdata = await data.json()
            console.log(fdata)
            setClas(fdata)
        } catch (error) {
            console.log(error)
        }
    }

    //create subjects
    const subjectRef = useRef()
    const createSubjects = async () => {

        console.log(subjectRef.current.value)
        try {
            const data = await fetch(`http://192.168.1.10:8083/api/staff/create-subject?name=${encodeURIComponent(subjectRef.current.value)}`, {
                method: 'POST',
            });
            const fdata = await data.json()
            if (data.ok) {
                toast.success('subject Added Successfully')
                getSubjects()
                subjectRef.current = null;
            } else {
                toast.error('Oops !sommething went wrong')
            }

        } catch (error) {
            console.log(error)
        }
    }


    //create class
    const classRef = useRef()
    const sectionRef = useRef()
    const createClass = async () => {

        console.log(classRef.current.value)
        try {
            const data = await fetch(`http://192.168.1.10:8082/api/students/create-class?classname=${encodeURIComponent(classRef.current.value)}&section=${encodeURIComponent(sectionRef.current.value)}`, {
                method: 'POST',
            });
            const fdata = await data.json();
            if (data.ok) {
                toast.success('Class added successfully');
                getClass();
                subjectRef.current.value = '';
                subjectRef.current = null;
            } else {
                toast.error('Oops! Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    //main table
    const [staff, setStaff] = useState([])
    const getMainTable = async () => {
        try {
            const data = await fetch('http://192.168.1.10:8083/api/staff/saved-Staff')
            const fdata = await data.json()
            console.log(fdata)
            setStaff(fdata)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getSubjects()
        getClass()
        getMainTable()
    }, [])
    return (

        <Stack minH="100vh" >
            <Navbar />
            <Stack display="flex" flexDir="row" justifyContent="space-around" >
                <Card style={{ maxHeight: '80vh', overflowY: 'scroll' }} css={{
                    "&::-webkit-scrollbar": {
                        width: "0 !important", // For Chrome, Safari, and Opera
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "transparent", // For Chrome, Safari, and Opera
                    },
                    scrollbarWidth: "none", // For Firefox
                    msOverflowStyle: "none", // For IE and Edge
                }}>

                    <CardHeader>
                        <Heading size='md'> Add Subjects</Heading>
                    </CardHeader>
                    <CardBody >
                        <Stack justifyContent="space-around" alignItems="center" display="flex" flexDir="row">
                            <Input type="text" ref={subjectRef} placeholder="subject" />
                            <Button colorScheme='blue' onClick={() => createSubjects()}>Add</Button>
                        </Stack>
                        <TableContainer>
                            <Table variant='striped' colorScheme='teal' >
                                {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                                <Thead>
                                    <Tr >
                                        <Th >Id</Th>
                                        <Th>Subjects</Th>

                                    </Tr>
                                </Thead>
                                <Tbody >
                                    {subjects?.map((subject, index) => (
                                        <Tr key={index} height="30px" bgColor="red">
                                            <Td>{subject.id}</Td>
                                            <Td>{subject.name}</Td>
                                        </Tr>
                                    ))}


                                </Tbody>

                            </Table>
                        </TableContainer>
                    </CardBody>



                </Card>
                <Card style={{ maxHeight: '80vh', overflowY: 'scroll' }} css={{
                    "&::-webkit-scrollbar": {
                        width: "0 !important", // For Chrome, Safari, and Opera
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "transparent", // For Chrome, Safari, and Opera
                    },
                    scrollbarWidth: "none", // For Firefox
                    msOverflowStyle: "none", // For IE and Edge
                }}>

                    <CardHeader>
                        <Heading size='md'> Add Classes</Heading>
                    </CardHeader>
                    <CardBody >
                        <Stack justifyContent="space-around" alignItems="center" display="flex" flexDir="row">
                            <Input type="text" ref={classRef} placeholder="class" />
                            <Input type="text" ref={sectionRef} placeholder="section" />
                            <Button colorScheme='blue' onClick={() => createClass()}>Add</Button>
                        </Stack>
                        <TableContainer>
                            <Table variant='striped' colorScheme='teal'>
                                {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                                <Thead>
                                    <Tr>
                                        <Th>Id</Th>
                                        <Th>Classes</Th>
                                        <Th>Section</Th>

                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        clas?.map((elm, i) => (
                                            <Tr>
                                                <Td>{elm.id}</Td>
                                                <Td>{elm.className}</Td>
                                                <Td>{elm.section}</Td>
                                            </Tr>
                                        ))
                                    }


                                </Tbody>

                            </Table>
                        </TableContainer>
                    </CardBody>
                    <CardFooter>

                    </CardFooter>


                </Card>
                <Card style={{ maxHeight: '80vh', overflowY: 'scroll', overflowX: 'hidden' }}>

                    <CardHeader>
                        <Heading size='md'> Main Table</Heading>
                    </CardHeader>
                    <CardBody mt="6.6vh">

                        <TableContainer>
                            <Table variant='striped' colorScheme='teal' >
                                {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                                <Thead>
                                    <Tr>
                                        <Th>S.No.</Th>
                                        <Th>Staff Id</Th>
                                        <Th>Staff</Th>
                                        <Th>Subjects</Th>

                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        staff?.map((elm, i) => (
                                            <Tr>
                                                <Td>{i + 1}</Td>
                                                <Td>{elm.id}</Td>
                                                <Td>{elm.name}</Td>
                                                <Td>{elm.subjects.length > 1 ? elm.subjects.map((elm) => (elm + ',  ')) : elm.subjects.map((elm) => (elm))}</Td>


                                            </Tr>
                                        ))
                                    }


                                </Tbody>

                            </Table>
                        </TableContainer>
                    </CardBody>
                    <CardFooter>

                    </CardFooter>


                </Card>


            </Stack>



        </Stack>

    )
}
export default Subject