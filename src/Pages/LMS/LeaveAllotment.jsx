import { Box, Button, Flex, IconButton, Input, Select, Stack, Text } from "@chakra-ui/react"
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
import { ToastContainer, toast } from "react-toastify"
import { IoArrowBack, IoReturnUpBackOutline } from "react-icons/io5"
const LmsLeaveallotment = () => {
    const [classData, setClassData] = useState([])
    const [LDetails, setLDetails] = useState([])
    const [mainData, setMainData] = useState([])
    const [edit, setData] = useState(true)
    const [editId, setEditId] = useState(null)





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

    const getLDetails = async () => {
        try {
            const data = await fetch('http://localhost:8090/api/LVM/All-Data')
            const fdata = await data.json()
            console.log(fdata)
            setLDetails(fdata)
        } catch (error) {
            console.log(error)
        }
    }
 

    const getData = async () => {
        console.log(LDetails);
        try {
            const staffResponse = await fetch('http://localhost:8083/api/staff/saved-Staff');
            const staffData = await staffResponse.json();
            console.log(staffData);
            setClassData(staffData);
    
            if (staffData.length > 0) {
                const lvmResponse = await fetch('http://localhost:8090/api/LVM/All-Data');
                const lvmData = await lvmResponse.json();
                const filteredLvmData = lvmData.filter(elm => elm.checkBox === true);
                console.log(filteredLvmData);
    
                const approvalResponse = await fetch('http://localhost:8090/api/Approval/All-Data');
                const approvalData = await approvalResponse.json();
                console.log(approvalData);
    
                const processedData = staffData.map(staff => {
                    const foundData = approvalData.find(
                        e => e.staffName === staff.name &&
                             e.approver === staff.approver &&
                             e.department === staff.department
                    );
                    if (foundData) {
                        foundData.leaveProvided = filteredLvmData.map(slot => {
                            const match = foundData.leaveProvided.find(elm => elm.leaveName === slot.leaveType);
                            return match || { leaveName: slot.leaveType, value: null };
                        });
                        foundData.leaveBalances = filteredLvmData.map(slot => {
                            const match = foundData.leaveBalances.find(elm => elm.leaveName === slot.leaveType);
                            return match || { leaveName: slot.leaveType, value: null };
                        });
                        return foundData;
                    } else {
                        return {
                            staffName: staff.name,
                            staffId: staff.staffId,
                            department: staff.department,
                            approver: staff.approver,
                            leaveProvided: filteredLvmData.map(slot => ({ leaveName: slot.leaveType, value: null })),
                            leaveBalances: filteredLvmData.map(slot => ({ leaveName: slot.leaveType, value: null })),
                        };
                    }
                });
    console.log(processedData)
                setMainData(prevMainData => {
                    const uniqueResult = processedData.filter(
                        item => !prevMainData.some(data => data.staffId === item.staffId)
                    );
                    console.log(uniqueResult)
                    return [...prevMainData, ...uniqueResult];
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    

    const goback = () => {
        navigate(-1)
    }


   

    

    // Handle change function for leaveProvided property
    const handleLeaveChange = (staffIndex, leaveIndex, value) => {
        console.log(staffIndex, leaveIndex, value)
        const updatedStaffData = [...mainData];
        updatedStaffData[staffIndex].leaveProvided[leaveIndex].value = value;
        updatedStaffData[staffIndex].leaveBalances[leaveIndex].value = value;
        setMainData(updatedStaffData);
    };

    const [editButtonDisable, setEditButtonDisable] = useState(false)
    const postAllotment = async () => {
        console.log(editId)
        console.log(mainData)
        console.log(mainData[editId])
        console.log(mainData[editId].id)
       
        const dataFromAllotedTavle = await fetch(`http://localhost:8090/api/Approval/${mainData[editId].id}`)
        const dataFromAllotedTavlejson = await dataFromAllotedTavle.json()
        console.log(dataFromAllotedTavlejson)
        if (dataFromAllotedTavle.status >= 200 && dataFromAllotedTavle.status < 300) {
            try {
                console.log(mainData[editId])
                const dat = await fetch(`http://localhost:8090/api/Approval/${mainData[editId].id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(mainData[editId])
                })

                if (dat.status >= 200 && dat.status < 300) {
                    toast.success('Updated')
                    setEditButtonDisable(true)
                } else {
                    toast.error('something went wrong')
                }

            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                console.log(mainData[editId]);
                const response = await fetch('http://localhost:8090/api/Approval/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(mainData[editId])
                });
        
                if (response.status >= 200 && response.status < 300) {
                    toast.success('Created successfully');
                    await getData();
                    setEditButtonDisable(true);
                    window.location.reload();
                } else {
                    toast.error('Something went wrong');
                }
            } catch (error) {
                console.log(error);
            }

        }
    }
    const trueLdetails = LDetails.filter((elm) => elm.checkBox == true)
    console.log(mainData)
    console.log(trueLdetails)
    useEffect(() => {
        getAllotment()
        getLDetails()
        getData()

    }, [])
    return <>

<Stack minH="100vh" minW="100%" overflow="scroll" bgColor="white">
            <Navbar />
            <IconButton as={IoArrowBack}
            size="md"
            cursor="pointer"
            onClick={goback}
            style={{ marginLeft: '2%' }}

        />
            <ToastContainer />
            <Stack   >
                <TableContainer>
                    <Table size="sm" variant="striped" colorScheme="white">
                        <Thead>
                            <Tr>
                                <Th fontSize={['12px', '14px', '16px']}></Th>
                                <Th fontSize={['12px', '14px', '16px']}></Th>
                                <Th fontSize={['12px', '14px', '16px']}></Th>
                                <Th fontSize={['12px', '14px', '16px']}></Th>
                                <Th padding="0 1%">
                                    <>
                                        <Th fontSize={['12px', '14px', '16px']} border="none"></Th>
                                        <Th border="none"></Th>
                                        <Th border="none"></Th>
                                        <Th border="none"></Th>
                                        <Th border="none"></Th>
                                        <Th border="none" fontSize={['12px', '14px', '200%']}>
                                            Alloted Balance
                                        </Th>
                                    </>
                                </Th>
                                <Th>
                                    <>
                                        <Th fontSize={['12px', '14px', '16px']} border="none"></Th>
                                        <Th border="none"></Th>
                                        <Th border="none" fontSize={['12px', '14px', '200%']}>
                                            Remaining Balance
                                        </Th>
                                    </>
                                </Th>
                            </Tr>
                        </Thead>
                        <Thead>
                            <Tr>
                                <Th fontSize={['12px', '14px', '16px']}>Staff Name</Th>
                                <Th fontSize={['12px', '14px', '16px']}>Staff Id</Th>
                                <Th fontSize={['12px', '14px', '16px']}>Department</Th>
                                <Th fontSize={['12px', '14px', '16px']}>Approver</Th>
                                <Th padding="0 1%">
                                    {LDetails?.map((elm, index) => {
                                        if (elm.checkBox) {
                                            return (
                                                <>
                                                    <Th fontSize={['12px', '14px', '16px']} border="none">
                                                        {elm.shortForm}
                                                    </Th>
                                                    <Th border="none"></Th>
                                                    <Th border="none"></Th>
                                                    <Th border="none"></Th>
                                                    <Th border="none"></Th>
                                                </>
                                            );
                                        }
                                        return null;
                                    })}
                                </Th>
                                <Th>
                                    {LDetails?.map((elm, index) => {
                                        if (elm.checkBox) {
                                            return (
                                                <>
                                                    <Th fontSize={['12px', '14px', '16px']} border="none">
                                                        {elm.shortForm}
                                                    </Th>
                                                    <Th border="none"></Th>
                                                </>
                                            );
                                        }
                                        return null;
                                    })}
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {mainData?.map((elm, i) => (
                                <Tr key={i}>
                                    <Td fontSize={['12px', '14px', '16px']} borderRight="1px solid black" borderLeft="1px solid black" textAlign="center">
                                        {elm.staffName}
                                    </Td>
                                    <Td fontSize={['12px', '14px', '16px']} borderRight="1px solid black" borderLeft="1px solid black" textAlign="center">
                                        {elm.staffId}
                                    </Td>
                                    <Td fontSize={['12px', '14px', '16px']} borderRight="1px solid black" borderLeft="1px solid black" textAlign="center">
                                        {elm.department}
                                    </Td>
                                    <Td fontSize={['12px', '14px', '16px']} borderRight="1px solid black" borderLeft="1px solid black" textAlign="center">
                                        {elm.approver}
                                    </Td>
                                    <Td borderRight="1px solid black" borderLeft="1px solid black">
                                        {elm?.leaveProvided?.map((el, index) => (
                                            <Td fontSize={['12px', '14px', '16px']} border="none" textAlign="center" key={index}>
                                                <Input
                                                    type="number"
                                                    value={el.value}
                                                    onChange={(e) => handleLeaveChange(i, index, parseInt(e.target.value))}
                                                    disabled={editId !== i && !editButtonDisable}
                                                />
                                            </Td>
                                        ))}
                                    </Td>
                                    <Td>
                                        {elm.leaveBalances?.map((el, index) => (
                                            <Td fontSize={['12px', '14px', '16px']} border="none" textAlign="center" key={index}>
                                                <Input type="number" value={el.value} disabled />
                                            </Td>
                                        ))}
                                    </Td>
                                    <Td>
                                        <Box>
                                            {editId === i && !editButtonDisable ? (
                                                <Button bgColor="greenyellow" onClick={postAllotment} fontSize={['12px', '14px', '16px']}>
                                                    Save
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() => {
                                                        setEditId(i);
                                                        setEditButtonDisable(false);
                                                    }}
                                                    bgColor="teal"
                                                    fontSize={['12px', '14px', '16px']}
                                                >
                                                    Edit
                                                </Button>
                                            )}
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