import { Box, Input, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useEditable } from "@chakra-ui/react"
import Navbar from "../../components/Navbar"
import { useEffect ,useState} from "react"

const LeaveBalances=()=>{

    const [mainData, setMainData] = useState([])
    const [LDetails, setLDetails] = useState([])
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
            // setClassData(staffData);
    
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
                    const unique=uniqueResult.filter((elm)=>elm.staffId==localStorage.getItem("username"))
                    // console.log(unique)
                    return [...prevMainData, ...unique];
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        getLDetails()
        getData()
    },[])
    return <Box   minH="100vh">
        <Navbar/>
        <Stack  minH="95vh" >
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

                                        {elm?.leaveProvided?.map((el, index) => {

                                            return (
                                                <Td fontSize="16px" border="none" textAlign="center" key={index}>

                                                    <Input type="number" value={el.value}  />
                                                </Td>
                                            );


                                        })}
                                    </Td>
                                    <Td>

                                        {
                                            elm.leaveBalances?.map((el, index) => {
                                                return (
                                                    <Td fontSize="16px" border="none" textAlign="center" key={index}>
                                                        <Input type="number" value={el.value} disabled />

                                                    </Td>
                                                );
                                            })
                                        }
                                    </Td>
                                   

                                </Tr>
                            ))}
                       
                                   

                                
                           

                        </Tbody>
                    </Table>
                </TableContainer>
            </Stack>
    </Box>
}
export default LeaveBalances