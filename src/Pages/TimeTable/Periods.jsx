import { Button, Flex, Input, Stack, Text, Toast } from "@chakra-ui/react"
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
    Select,
    Switch,
    useColorModeValue
} from '@chakra-ui/react'
import { useEffect, useState } from "react"
import { IoReturnUpBackOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import Navbar from "../../components/Navbar"
const Periods = () => {
    const [periods, setPeriods] = useState([])
    const [days, setDays] = useState([])
    const [create, setcreate] = useState(false)
    const [createDay, setCreateDay] = useState(false)
    const [lecture, setLecture] = useState('')
    const [startTime, setStartTime] = useState('')
    const [dayNo, sayDayNo] = useState('')
    const [dayName, setDayName] = useState('')
    const [endTime, setendTime] = useState('')
    const navigate = useNavigate()

    const d = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const submit = async () => {
        const body = {
            lectureNumber: parseInt(lecture),
            startTime: startTime,
            endTime: endTime
        }
        console.log(body)
        try {
            const data = await fetch('http://localhost:8086/api/periods/create-periods', {
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
            const data = await fetch('http://localhost:8086/api/periods/lectures');
            const fdata = await data.json();
            console.log(fdata);
            setPeriods(fdata)

        } catch (error) {
            console.log(error);
        }

    }
    const Delete = async (id) => {
        try {
            const data = await fetch(`http://localhost:8086/api/periods/delete/${id}`, {
                method: 'delete'
            });
            // const fdata = await data.json();
            // console.log(fdata);
            if (data.ok) {
                toast.success('deleted')
                getPeriods()
            } else {
                toast.error('something went wrong')
            }
        } catch (error) {
            toast.error('something went wrong')
            console.log(error);
        }

    }


    const goback = () => {
        navigate(-1)
    }
    //Code for days
    const submitDay = async () => {
        const body = {
            day: dayName,
        }
        if (body.day == null || body.day == '') {
            toast.error('please select day')
        } else {
            try {
                const data = await fetch('http://localhost:8086/api/days/create-day', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json' // Specify the content type as JSON
                    },
                    body: JSON.stringify(body)
                });

                const fdata = await data.json();
                console.log(fdata);

                if (data.status >= 200 && data.status < 300) {
                    toast.success("created")
                    setCreateDay(false)
                    setDayName('')
                    await getDays()

                } else {
                    toast.error('something went wrong');
                }

            } catch (error) {
                // toast.error('something went wrong');
                console.log(error);
            }
        }
        console.log(body)


    }

    const getDays = async () => {
        try {
            const data = await fetch('http://localhost:8086/api/days/days');
            const fdata = await data.json();
            console.log(fdata);
            if (fdata.length > 0) {
                const weekdaysMap = {
                    "Sunday": 0,
                    "Monday": 1,
                    "Tuesday": 2,
                    "Wednesday": 3,
                    "Thursday": 4,
                    "Friday": 5,
                    "Saturday": 6
                };

                // Custom sorting function based on the index of each day name within the week
                fdata.sort((a, b) => {
                    const indexA = weekdaysMap[a.day];
                    const indexB = weekdaysMap[b.day];
                    return indexA - indexB;
                });
                setDays(fdata)
            } else {
                setDays([])
            }


        } catch (error) {
            setDays([])
            console.log(error);
        }

    }

    const DeleteDay = async (id) => {
        try {
            const data = await fetch(`http://localhost:8086/api/days/delete/${id}`, {
                method: 'delete'
            });
            // const fdata = await data.json();
            // console.log(fdata);
            if (data.ok) {
                toast.success('deleted')
                await getDays()
            } else {
                toast.error("something went wrong")
            }
        } catch (error) {
            toast.error("something went wrong")
            console.log(error);
        }

    }

    const trackColor = useColorModeValue("gray.200", "gray.700");
    const switchColor = useColorModeValue("green", "lightgreen");

    useEffect(() => {
        getPeriods()
        getDays()
    }, [])
    console.log(days);
    return <Stack minH="100vh" alignItems="center" >
        <Navbar />
        <ToastContainer />
        <Flex minW="100vw" alignItems="center" justifyContent="space-around" margin="0 0 1.5% 0">
            <h1 s></h1>
            <IoReturnUpBackOutline
                size={35}
                cursor="pointer"
                onClick={goback}
                style={{ marginLeft: 'auto', marginRight: '7%' }}

            />
        </Flex>
        <Flex justifyContent="space-around" minWidth="80vw">
            <TableContainer>
                <Text padding="0 40%" fontWeight="bolder">Lecture Schedule</Text>                <Table variant='simple'>
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
            <TableContainer>
                <Text padding="0 40%" fontWeight="bolder">Lecture Days</Text>
                <Table variant='simple'  >
                    <Thead>
                        <Tr>

                            <Th>Day Name</Th>

                            {/* <Th>
                                <Button onClick={() => setCreateDay(true)}>Add New</Button>
                            </Th> */}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            days?.map((elm, i) => (
                                <Tr alignItems="center" justifyContent="space-around">

                                    <Td>
                                        <Input value={elm.day} disabled />
                                    </Td>


                                    <Td>
                                        <Switch
                                            colorScheme={switchColor}
                                            trackColor={{ base: trackColor, md: trackColor }}
                                            size='lg'
                                            onClick={() => DeleteDay(elm.id)}
                                        />
                                        </Td>

                                </Tr>
                            ))
                        }
                        {createDay ? <Tr alignItems="center" justifyContent="space-around" >

                            <Td>
                                <Select onChange={(e) => setDayName(e.target.value)}>
                                    <option disabled>Select</option>
                                    {d?.map((day, i) => (
                                        <option key={i} value={day}>{day}</option>
                                    ))}
                                </Select>

                            </Td>

                            <Td > <Button onClick={() => submitDay()}>Save</Button>
                                <Button onClick={() => setCreateDay(!createDay)} margin="0 5%">Cancel</Button>

                            </Td>



                        </Tr> : ''}

                    </Tbody>
                    <Tfoot>

                    </Tfoot>
                </Table>
            </TableContainer>
        </Flex>


    </Stack>
}

export default Periods