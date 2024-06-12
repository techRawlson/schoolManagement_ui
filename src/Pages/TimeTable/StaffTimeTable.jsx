import { Button, Flex, FormControl, FormLabel, Heading, IconButton, Select, Stack, Text, filter } from "@chakra-ui/react"
import Navbar from '../../components/Navbar'
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

import { IoArrowBack } from "react-icons/io5";
import { useEffect, useState } from "react"
import { IoReturnUpBackOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { useData } from "../context/DataContext";
const Stafftimetable = () => {
    const { Role, updateData } = useData()
    const [data, setData] = useState([])
    const getData = async () => {
        try {
            const data = await fetch('http://13.201.41.106:8086/api/LockedData/lecturedata')
            const fdata = await data.json()
            console.log(fdata)
            setData(fdata)
        } catch (error) {
            console.log(error)
        }
    }




    useEffect(() => {
        getData()

    }, [])
    console.log(data)

    let newDb = [];
    let Db = [];

    data?.map((tt, i) => {
        if (tt.lectureNumber <= 10) {

            const obj = {
                lecture: tt.lectureNumber,
                startTime: tt.startTime,
                endTime: tt.endTime,
                teacherName: tt.teacherName,
                session: tt.session

            };

            if (tt.day === 'Monday') {
                obj.monday = tt.teacherSubject + " " + tt.className + " " + tt.section;
            } else if (tt.day === 'Tuesday') {
                obj.tuesday = tt.teacherSubject + " " + tt.className + " " + tt.section;
            } else if (tt.day === 'Wednesday') {
                obj.wednesday = tt.teacherSubject + " " + tt.className + " " + tt.section;
            } else if (tt.day === 'Thursday') {
                obj.thursday = tt.teacherSubject + " " + tt.className + " " + tt.section;
            } else if (tt.day === 'Friday') {
                obj.friday = tt.teacherSubject + " " + tt.className + " " + tt.section;
            }
            newDb.push(obj);
            // console.log(obj);
        }
    });

    console.log(newDb)



    // Object to store aggregated data
    const aggregatedData = {};

    // Iterate through the array
    newDb.forEach(obj => {
        // Create a unique key based on name and lectureNumber
        const key = `${obj.teacherName}_${obj.lecture}_${obj.session}`;

        // Check if the key already exists in the aggregated data
        if (aggregatedData[key]) {
            // If exists, merge the properties of the current object with existing one
            Object.assign(aggregatedData[key], obj);
        } else {
            // If not exists, create a new object with current object's properties
            aggregatedData[key] = { ...obj };
        }
    });

    // Convert the aggregated data object into an array of objects
    const resultArray = Object.values(aggregatedData);

    const [session, setSession] = useState(false)
    const [eId, setEId] = useState(0)
    const [show, setShow] = useState(false)
    const [teacher, setTeacher] = useState('');
    const [classValue, setClassValue] = useState('');
    const [section, setSection] = useState('');
    const [dis, setDis] = useState(false)
    const [classData, setClassData] = useState([])
    const [clas, setClas] = useState([])

    const getTeachers = async () => {
        try {
            const data = await fetch("http://13.201.55.247:8083/api/staff/saved-Staff");
            const fdata = await data.json();

            setClassData(fdata)
        } catch (error) {
            console.log(error)
        }
    }

    const getClass = async () => {
        try {
            const data = await fetch('http://3.111.52.90:8082/api/students/get-AllClasses')
            const fdata = await data.json()

            setClas(fdata)
        } catch (error) {
            console.log(error)
        }
    }


    //filtereation part
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({
        data: false,
        teacher: "",
        session: "",
        eId: ''

    });



    const [showError, setshowError] = useState(false)
    const dataFilter = (data) => {

        let filterData = data;
        console.log(filterData)
        //filter for teacher
        if (filters.teacher !== "") {
            filterData = filterData.filter(
                (ele) => ele.teacherName == filters.teacher
            );
        }
        console.log(filterData)
        //filter for session
        if (filters.session !== "") {
            filterData = filterData.filter(
                (ele) => ele.session == filters.session
            );
        }
        console.log(filterData)

        if (filters.session !== "" && filters.teacher !== "" && filters.eId != '') {
            console.log(filters)
            if (filterData.length > 0) {
                setDis(false)
                setShow(true)
                console.log(filterData)
                setFilteredData(filterData)

                setshowError(false)

                // After processing all subjects, update totalSubjects


            }

            else {
                const customToastStyle = {
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '14px',
                };
                // toast.error("This data is not available.if you want to create,click on the add new button", {
                //     style: customToastStyle
                // })
                setShow(false)
                setDis(true)
                setFilteredData([])
                setshowError(true)
                // setUpdateButton('')
            }

        }

    };









    //filter chnage for techer
    const handleFilterTeacher = (value) => {
        setTeacher(value)
        setFilters((prev) => ({
            ...prev,
            // classData: false,
            teacher: value,
        }));
    };
    //filter chnage for session
    const handleFilterSession = (value) => {
        setSession(value)
        setFilters((prev) => ({
            ...prev,
            // classData: false,
            session: value,
        }));
    };
    //filter chnage for EmpId
    const handleFilterEmpId = (value) => {
        setEId(value)
        setFilters((prev) => ({
            ...prev,
            // classData: false,
            eId: value,
        }));
    };


    useEffect(() => {
        dataFilter(resultArray);
        //console.log("trigeered")
    }, [filters, data]);




    useEffect(() => {
        getTeachers()
        getClass()
    }, [])

    //filteratrion part
    const uniqueSessions = [...new Set(clas.map(elm => elm.session))].sort();
    // CSS styles
    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
    };

    const thStyle = {
        border: '1px solid black',
        padding: '8px',
        textAlign: 'left'
    };

    const tdStyle = {
        border: '1px solid black',
        padding: '8px',
        textAlign: 'center'
    };
    const navigate = useNavigate()
    const goback = () => {
        navigate(-1)
    }




    const staffId = localStorage.getItem("username")

    const showStudentTimeTable = async () => {
        try {
            const studentId = localStorage.getItem('username');
            const response = await fetch(`http://13.201.55.247:8083/api/staff/staff/${staffId}`);
            const dataJson = await response.json();
            console.log(dataJson);

            setEId(staffId)
            setTeacher(dataJson.name)

            setFilters((prev) => ({
                ...prev,
                // classData: false,
                eId: staffId,
                teacher: dataJson.name
            }));
            await getData()
            await dataFilter(data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (Role == 'staff') {
            const fetchData = async () => {
                await showStudentTimeTable();
                // await getData()
            };
            fetchData();
        }

    }, []);
















    return <div style={{ minHeight: '100vh', Width: '100vw' }}>
        <Navbar />
        <Flex >
            <IconButton as={IoArrowBack}
                background="none"
                cursor="pointer"
                onClick={goback}
                style={{ marginLeft: '3%' }}

            />
        </Flex>

        <Stack style={{ maxWidth: '70vw', margin: '0 auto' }}>
            <Flex alignItems='center' >
                <FormControl isRequired justifyContent="space-between" alignItems="center" m="1" maxW="20%">
                    <FormLabel>Session</FormLabel>
                    <Select isRequired value={session} onChange={(e) => handleFilterSession(e.target.value)}>
                        <option>Select</option>
                        {
                            uniqueSessions?.map((elm, i) => (
                                <option key={i}>{elm}</option>
                            ))
                        }

                    </Select>
                </FormControl>
                <FormControl isRequired justifyContent="space-between" alignItems="center" m="1" w="20%">
                    <FormLabel>Teacher</FormLabel>
                    <Select isRequired value={teacher} onChange={(e) => handleFilterTeacher(e.target.value)}>
                        <option>Select</option>
                        {
                            classData?.map((elm, i) => (
                                <option key={i}>{elm.name}</option>
                            ))
                        }

                    </Select>
                </FormControl>

                <FormControl isRequired justifyContent="space-between" alignItems="center" m="1" maxW="20%">
                    <FormLabel>Employee Id</FormLabel>
                    {
                        Role == 'staff' ? <Select isRequired value={eId} >
                            <option value={staffId}>{staffId}</option>



                        </Select> : <Select isRequired value={eId} onChange={(e) => handleFilterEmpId(e.target.value)}>
                            <option>Select</option>
                            <option>1</option>
                            <option>2</option>


                        </Select>
                    }

                </FormControl>


            </Flex>
            <TableContainer>
                {
                    show ?
                        <Table variant='striped' colorScheme='teal' style={tableStyle}>
                            <caption style={{ padding: "1%", fontSize: "1.5vh" }}>{teacher === 'Select' ? '' : filters.teacher.toUpperCase()}</caption>
                            <thead>
                                <tr>
                                    <th style={thStyle}>Lecture</th>
                                    <th style={thStyle}>Start Time</th>
                                    <th style={thStyle}>End Time</th>
                                    <th style={thStyle}>Monday</th>
                                    <th style={thStyle}>Tuesday</th>
                                    <th style={thStyle}>Wednesday</th>
                                    <th style={thStyle}>Thursday</th>
                                    <th style={thStyle}>Friday</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((entry, i) => (
                                    <tr key={i}>
                                        <td style={tdStyle}>{entry.lecture}</td>
                                        <td style={tdStyle}>{entry.startTime}</td>
                                        <td style={tdStyle}>{entry.endTime}</td>
                                        <td style={tdStyle}>{entry.monday}</td>
                                        <td style={tdStyle}>{entry.tuesday}</td>
                                        <td style={tdStyle}>{entry.wednesday}</td>
                                        <td style={tdStyle}>{entry.thursday}</td>
                                        <td style={tdStyle}>{entry.friday}</td>
                                    </tr>
                                ))}
                            </tbody>



                        </Table>

                        : ""
                }
                {
                    showError && !show ? <Text color="red" fontWeight="bold">It seems no timetable present for this techer</Text>:''
}
            </TableContainer>
            <Button width="160px" colorScheme="green" position="absolute" bottom="2rem" left="5rem">Print</Button>

        </Stack>
    </div>

}
export default Stafftimetable




