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
import { ToastContainer, toast } from "react-toastify"
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
    // const getData = async () => {
    //     console.log(LDetails)
    //     try {
    //         const data = await fetch("http://localhost:8083/api/staff/saved-Staff");
    //         const fdata = await data.json();
    //         console.log(fdata)
    //         setClassData(fdata)



    //         if (fdata.length > 0) {
    //             const data = await fetch('http://localhost:8090/api/LVM/All-Data')
    //             const LD1 = await data.json()
    //             const LD = await LD1.filter((elm) => elm.checkBox == true)
    //             console.log(LD)

    //             const dataFromAllotedTavle = await fetch('http://localhost:8090/api/Approval/All-Data')
    //             const dataFromAllotedTavlejson = await dataFromAllotedTavle.json()
    //             console.log(dataFromAllotedTavlejson)
    //             let result = fdata.map(elm => {
    //                 const foundData = dataFromAllotedTavlejson.find((e) => e.staffName == elm.name && e.approver == elm.approver && e.department == elm.department)
    //                 console.log(foundData)
    //                 if (foundData) {
    //                     return foundData
    //                 } else {
    //                     let obj = {
    //                         staffName: elm.name,
    //                         staffId: elm.staffId,
    //                         department: elm.department,
    //                         approver: elm.approver,
    //                         leaveProvided: LD?.map(slot => ({
    //                             leaveName: slot.leaveType,
    //                             value: null,

    //                         })),
    //                         leaveBalances: LD?.map(slot => ({
    //                             leaveName: slot.leaveType,
    //                             value: null,

    //                         }))

    //                     };
    //                     return obj;
    //                 }

    //             });

    //             // Update mainData once with the entire result array
          
    //             setMainData([...mainData, ...result]);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }


    // }
    const getData = async () => {
        console.log(LDetails);
        try {
          const data = await fetch('http://localhost:8083/api/staff/saved-Staff');
          const fdata = await data.json();
          console.log(fdata);
          setClassData(fdata);
    
          if (fdata.length > 0) {
            const data = await fetch('http://localhost:8090/api/LVM/All-Data');
            const LD1 = await data.json();
            const LD = LD1.filter((elm) => elm.checkBox === true);
            console.log(LD);
    
            const dataFromAllotedTable = await fetch('http://localhost:8090/api/Approval/All-Data');
            const dataFromAllotedTableJson = await dataFromAllotedTable.json();
            console.log(dataFromAllotedTableJson);
    
            let result = fdata.map((elm) => {
              const foundData = dataFromAllotedTableJson.find(
                (e) =>
                  e.staffName === elm.name &&
                  e.approver === elm.approver &&
                  e.department === elm.department
              );
              console.log(foundData);
              if (foundData) {
                return foundData;
              } else {
                let obj = {
                  staffName: elm.name,
                  staffId: elm.staffId,
                  department: elm.department,
                  approver: elm.approver,
                  leaveProvided: LD?.map((slot) => ({
                    leaveName: slot.leaveType,
                    value: null,
                  })),
                  leaveBalances: LD?.map((slot) => ({
                    leaveName: slot.leaveType,
                    value: null,
                  })),
                };
                return obj;
              }
            });
    
            // Ensure no duplicates in mainData
            const uniqueResult = result.filter(
              (item) => !mainData.some((data) => data.staffId === item.staffId)
            );
    
            setMainData((prevMainData) => [...prevMainData, ...uniqueResult]);
          }
        } catch (error) {
          console.log(error);
        }
      };
    console.log(mainData)









    useEffect(() => {
        getAllotment()
        getLDetails()
        getData()

    }, [])

    // Handle change function to update state
    const handleChange = (index, field, value) => {
        const updatedStaffData = [...mainData];
        updatedStaffData[index][field] = value;
        setMainData(updatedStaffData);
    };

    // Handle change function for leaveProvided property
    const handleLeaveChange = (staffIndex, leaveIndex, value) => {
        console.log(staffIndex, leaveIndex, value)
        const updatedStaffData = [...mainData];
        updatedStaffData[staffIndex].leaveProvided[leaveIndex].value = value;
        updatedStaffData[staffIndex].leaveBalances[leaveIndex].value = value;
        setMainData(updatedStaffData);
    };


    const postAllotment = async () => {

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
                    setEditId(null)
                } else {
                    toast.error('something went wrong')
                }

            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                console.log(mainData[editId])
                const dat = await fetch('http://localhost:8090/api/Approval/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(mainData[editId])
                })
                if (dat.status >= 200 && dat.status < 300) {
                    toast.success('created')
                    await getData()
                    setEditId(null)
                } else {
                    toast.error('something went wrong')
                }

            } catch (error) {
                console.log(error)
            }
        }





    }


    return <>

        <Stack minW="100vw" maxW="100vw" minH="100vh">
            <Navbar />
            <ToastContainer />
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
                                    {LDetails?.map((elm, index) => {
                                        if (elm.checkBox) {
                                            return (
                                                <>
                                                    <Th fontSize="16px" border="none" >
                                                        {elm.shortForm}
                                                    </Th>
                                                    <Th border="none">
                                                    </Th>
                                                    <Th border="none">
                                                    </Th>
                                                    <Th border="none">
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
                                    {LDetails?.map((elm, index) => {
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

                            {mainData?.map((elm, i) => (
                                <Tr>
                                    <Td fontSize="16px" borderRight="1px solid black" borderLeft="1px solid black" textAlign="center">{elm.staffName} </Td>
                                    <Td fontSize="16px" borderRight="1px solid black" borderLeft="1px solid black" textAlign="center">{elm.staffId}</Td>
                                    <Td fontSize="16px" borderRight="1px solid black" borderLeft="1px solid black" textAlign="center">{elm.department}</Td>
                                    <Td fontSize="16px" borderRight="1px solid black" borderLeft="1px solid black" textAlign="center">{elm.approver}</Td>

                                    <Td borderRight="1px solid black" borderLeft="1px solid black"  >
                                        {elm.leaveProvided?.map((el, index) => {
                                            // if (el.checkBox) {
                                            return (
                                                <Td fontSize="16px" border="none" textAlign="center" key={index}>

                                                    <Input type="number" value={el.value} onChange={(e) => handleLeaveChange(i, index, parseInt(e.target.value))} disabled={editId == i ? false : true} />
                                                </Td>
                                            );
                                            // }
                                            // return null;
                                        })}
                                    </Td>
                                    <Td>
                                        {elm.leaveBalances?.map((el, index) => {
                                            // if (el.checkBox) {
                                            return (
                                                <Td fontSize="16px" border="none" textAlign="center" key={index}>
                                                    <Input type="number" value={el.value} disabled />

                                                </Td>
                                            );
                                            // }
                                            // return null;
                                        })}
                                    </Td>
                                    <Td>
                                        <Box>
                                            {
                                                editId == i ? <Button bgColor="greenyellow" onClick={postAllotment}>Save</Button> : <Button onClick={() => setEditId(i)} bgColor="teal">Edit</Button>
                                            }

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