import { Button, Flex, Input, Stack, Toast } from "@chakra-ui/react"
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
import { IoReturnUpBackOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
const Periods = () => {
    const [periods, setPeriods] = useState([])
    const [create, setcreate] = useState(false)
    const [lecture, setLecture] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setendTime] = useState('')
    const navigate = useNavigate()


    const submit = async () => {
        const body = {
            lectureNumber: parseInt(lecture),
            startTime: startTime,
            endTime: endTime
        }
        console.log(body)
        try {
            const data = await fetch('http://192.168.1.81:8086/api/periods/create-periods', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json' // Specify the content type as JSON
                },
                body: JSON.stringify(body)
            });

            const fdata = await data.json();
            console.log(fdata);

            if (data.ok) {
                toast.success('created');
                setLecture('')
                setStartTime('')
                setendTime('')
                getPeriods()
                setcreate(false)
            } else {
                toast.error('something went wrong');
            }
        } catch (error) {
            toast.error('something went wrong');
            console.log(error);
        }

    }

    const getPeriods = async () => {
        try {
            const data = await fetch('http://192.168.1.81:8086/api/periods/lectures');
            const fdata = await data.json();
            console.log(fdata);
            setPeriods(fdata)

        } catch (error) {
            console.log(error);
        }

    }
    const Delete = async (id) => {
        try {
            const data = await fetch(`http://192.168.1.81:8086/api/periods/delete/${id}`, {
                method: 'delete'
            });
            // const fdata = await data.json();
            // console.log(fdata);
            if (data.ok) {
                toast.success('deleted')
                getPeriods()
            } else {
                data.error('something went wrong')
            }
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        getPeriods()
    }, [])
  
    const goback = () => {
        navigate(-1)
    }
    return <Stack minH="100vh" alignItems="center" >
       
        <Flex minW="100vw" alignItems="center" justifyContent="space-around"> 
        <h1 s>Periods</h1>
                <IoReturnUpBackOutline
                    size={35}
                    cursor="pointer"
                    onClick={goback}
                   style={{marginLeft:'auto',marginRight:'7%'}}
                    
                />
            </Flex>
        <ToastContainer />
        <TableContainer>
            
            <Table variant='simple'  >

                <Thead>
                    <Tr>
                        <Th>Lecture Number</Th>
                        <Th>Start Time</Th>
                        <Th>End Time</Th>
                        <Th>
                            
                                 <Button onClick={() => setcreate(true)}>Add New</Button>
                            

                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        periods?.map((elm, i) => (
                            <Tr alignItems="center" justifyContent="space-around">
                                <Td>
                                    <Input type='Number' width="50%" value={elm.lectureNumber} onChange={(e) => setLecture(e.target.value)} />
                                </Td>
                                <Td>
                                    <Input type='time' value={elm.startTime} onChange={(e) => setStartTime(e.target.value)} />
                                </Td>
                                <Td>
                                    <Input type='time' value={elm.endTime} onChange={(e) => setendTime(e.target.value)} />
                                </Td>

                                <Td> <Button bgColor="red" onClick={() => Delete(elm.id)}>Delete</Button></Td>

                            </Tr>
                        ))
                    }
                    {create ? <Tr alignItems="center" justifyContent="space-around">
                        <Td>
                            <Input type='Number' width="50%" value={lecture} onChange={(e) => setLecture(e.target.value)} />
                        </Td>
                        <Td>
                            <Input type='time' value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        </Td>
                        <Td>
                            <Input type='time' value={endTime} onChange={(e) => setendTime(e.target.value)} />
                        </Td>
                        <Td > <Button onClick={() => submit()}>Save</Button>
                        <Button onClick={() => setcreate(!create)} margin="0 5%">Cancel</Button>
                        
                        </Td>
                        
                       

                    </Tr> : ''}

                </Tbody>
                <Tfoot>

                </Tfoot>
            </Table>
        </TableContainer>
    </Stack>
}

export default Periods