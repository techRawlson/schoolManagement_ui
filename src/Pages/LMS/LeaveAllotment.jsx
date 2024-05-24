import { Box, Button, Flex, Input, Select, Stack, Text } from "@chakra-ui/react"
import Navbar from "../../components/Navbar"
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
const LmsLeaveallotment = () => {
    const [classData, setClassData] = useState([])

    const [data, setData] = useState([])
    const [mainData, setMainData] = useState([])
    const getLDetails = async () => {
        try {
            const data = await fetch('http://localhost:8090/api/LVM/All-Data')
            const fdata = await data.json()
            console.log(fdata)
            setData(fdata)
        } catch (error) {
            console.log(error)
        }
    }
    const getData = async () => {
        try {
            const data = await fetch("http://localhost:8083/api/staff/saved-Staff");
            const fdata = await data.json();
            console.log(fdata)
            setClassData(fdata)

            if (classData.length > 0) {
                let result = classData.map(elm => {
                    let obj = {};
                    obj.id = elm.id;
                    obj.staffName = elm.staffName;
                    obj.staffId = elm.staffId;
                    obj.department = elm.department;
                    obj.approver = elm.approver;
                    obj.leaveProvided = data?.map(slot => {
                        let ob = {};
                        ob.leaveName = slot.leaveName;
                        ob.value = 0;
                        return ob;
                    });
                    setMainData(obj);
                })
            }
            console.log(mainData)
        } catch (error) {
            console.log(error)
        }
    }

    console.log(classData)


    const [allotment, setAllotment] = useState([])
    const getAllotment = async () => {
        try {
            const data = await fetch('http://localhost:8090/api/Approval/All-Data')
            const dataf = await data.json();
            if (dataf.length > 0) {
                setAllotment(dataf)
            }
        } catch (error) {
            console.log(error)
        }
    }







    useEffect(() => {
        getData()
        getLDetails()
        getAllotment()
    }, [])
    console.log(allotment)
    return <>
        {/* <Stack  minW="100vw" maxW="100vw" minH="100vh">
            <Navbar />
            <Stack  maxWidth="70%" margin="0 auto">
                <TableContainer >
                    <Table size='sm' >
                        <Thead>

                            <Tr>
                                <Th>Staff Name</Th>
                                <Th>Staff Id</Th>
                                <Th>Department</Th>
                                <Th>Approver</Th>
                                <Th alignItems="center" justifyContent="space-around">
                                    Provided


                                </Th>
                                <Th alignItems="center" justifyContent="space-around">
                                    Balance
                                </Th>



                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td></Td>
                                <Td></Td>
                                <Td></Td>
                                <Td></Td>
                                <Td>
                                    {
                                        data?.map((elm, index) => {
                                            if (elm.checkBox) { // Changed to strict equality and check for truthiness
                                                return (

                                                    <Td>
                                                        {elm.leaveType}
                                                    </Td>

                                                );
                                            }
                                            return null; // Ensure a value is returned for each iteration
                                        })
                                    }
                                </Td>
                                <Td>
                                    {
                                        data?.map((elm, index) => {
                                            if (elm.checkBox) { // Changed to strict equality and check for truthiness
                                                return (

                                                    <Td>
                                                        {elm.leaveType}
                                                    </Td>

                                                );
                                            }
                                            return null; // Ensure a value is returned for each iteration
                                        })
                                    }
                                </Td>

                            </Tr>
                            {
                                classData?.map((elm) => (
                                    <Tr>

                                        <Td>{elm.name}</Td>
                                        <Td>{elm.staffId}</Td>
                                        <Td>{elm.department}</Td>
                                        <Td>{elm.approver}</Td>
                                        <Td>
                                            <Td>inches</Td>
                                            <Td>inches</Td>
                                            <Td>inches</Td>
                                            <Td>inches</Td>
                                        </Td>
                                        <Td>
                                            <Td>inches</Td>
                                            <Td>inches</Td>
                                            <Td>inches</Td>
                                            <Td>inches</Td>
                                        </Td>

                                    </Tr>
                                ))
                            }





                            <Tr>

                                <Td>inches</Td>
                                <Td>inches</Td>
                                <Td>inches</Td>
                                <Td>inches</Td>
                                <Td>
                                    <Td>inches</Td>
                                    <Td>inches</Td>
                                    <Td>inches</Td>
                                    <Td>inches</Td>
                                </Td>
                                <Td>
                                    <Td>inches</Td>
                                    <Td>inches</Td>
                                    <Td>inches</Td>
                                    <Td>inches</Td>
                                </Td>

                            </Tr>

                        </Tbody>

                    </Table>
                </TableContainer>
            </Stack>
        </Stack> */}
        <Stack minW="100vw" maxW="100vw" minH="100vh">
            <Navbar />
            <Stack maxWidth="85%" margin="0 auto">
                <TableContainer>
                    <Table size='sm' variant='striped' colorScheme="white">
                        <Thead>
                            <Tr>
                                <Th fontSize="16px">Staff Name</Th>
                                <Th fontSize="16px">Staff Id</Th>
                                <Th fontSize="16px">Department</Th>
                                <Th fontSize="16px">Approver</Th>
                                <Th padding="0 1%">
                                    {data?.map((elm, index) => {
                                        if (elm.checkBox) {
                                            return (
                                                <>
                                                    <Th fontSize="16px" border="none" >
                                                        {elm.shortForm}
                                                    </Th>
                                                    <Th border="none">
                                                    </Th>
                                                </>

                                            );
                                        }
                                        return null;
                                    })}
                                </Th>
                                <Th >
                                    {data?.map((elm, index) => {
                                        if (elm.checkBox) {
                                            return (
                                                <>
                                                    <Th fontSize="16px" border="none">
                                                        {elm.shortForm}
                                                    </Th>
                                                    <Th border="none">
                                                    </Th>
                                                </>

                                            );
                                        }
                                        return null;
                                    })}
                                </Th>



                            </Tr>

                        </Thead>
                        <Tbody>

                            {classData?.map((elm) => (
                                <Tr>
                                    <Td fontSize="16px"  borderRight="1px solid black" borderLeft="1px solid black" textAlign="center">{elm.name} </Td>
                                    <Td fontSize="16px"  borderRight="1px solid black" borderLeft="1px solid black"  textAlign="center">{elm.staffId}</Td>
                                    <Td fontSize="16px"  borderRight="1px solid black" borderLeft="1px solid black"  textAlign="center">{elm.department}</Td>
                                    <Td fontSize="16px"  borderRight="1px solid black" borderLeft="1px solid black"  textAlign="center">{elm.approver}</Td>

                                    <Td borderRight="1px solid black" borderLeft="1px solid black"  >
                                        {data?.map((elm, index) => {
                                            if (elm.checkBox) {
                                                return (
                                                    <Td fontSize="16px" border="none"  textAlign="center"> 
                                                        
                                                        <Input type="number"/>
                                                    </Td>
                                                );
                                            }
                                            return null;
                                        })}
                                    </Td>
                                    <Td>
                                        {data?.map((elm, index) => {
                                            if (elm.checkBox) {
                                                return (
                                                    <Td fontSize="16px" border="none"   textAlign="center">
                                                        <Input type="number" value="1"/>
                                                        {/* <Td border="none"></Td> */}
                                                    </Td>
                                                );
                                            }
                                            return null;
                                        })}
                                    </Td>
                                    <Td>
                                        <Box>
                                            <Button>Save</Button>
                                        </Box>
                                    </Td>

                                </Tr>
                            ))}

                        </Tbody>
                    </Table>
                </TableContainer>
            </Stack>
        </Stack>


    </>
}
export default LmsLeaveallotment