// import { Stack } from "@chakra-ui/react"
import { Badge, Button, Checkbox, Flex, FormControl, FormLabel, Input, Select, Stack, StatUpArrow, Text } from "@chakra-ui/react"
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
import { useEffect, useRef, useState } from "react"
import { IoAddSharp, IoReturnUpBackOutline } from "react-icons/io5";

import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
// import Stafftimetable from "./StaffTimeTable";
import { DeleteIcon } from "@chakra-ui/icons";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { useSelector } from 'react-redux';
const AttendanceMarking = ({ user }) => {
    // const user = useSelector(state => state);
    console.log(user)

    const [data, setData] = useState([])
    console.log(data)

    const [detail, setDetail,] = useState([])
    const [createNew, setcreateNew] = useState(false)
    const [create, setcreate] = useState(true)
    const getData = async () => {
        try {
            const data = await fetch('http://localhost:8082/api/students/savedData')
            const fdata = await data.json()
            console.log(fdata)



            setData(fdata)
        } catch (error) {
            console.log(error)
        }
    }
    const getDetails = async () => {
        try {
            const data = await fetch('http://localhost:8082/api/students/get-AllClasses')
            const fdata = await data.json()
            console.log(fdata)
            setDetail(fdata)
        } catch (error) {
            console.log(error)
        }
    }




    //
    // const[]=useState()
    //AddNew
    const [staffTimedata, setStaffTimedata] = useState([])
    const navigate = useNavigate()
    const [AddNew, setAddNew] = useState(false);
    const [disabledCheck, setDisabledCheck] = useState(true)
    const [update, setUpdate] = useState(false);
    const [updateButton, setUpdateButton] = useState('Update');
    const [currentStartTime, setCurrentStartTime] = useState()
    const [currentEndTime, setCurrentEndTime] = useState()
    const [editMode, setEditMode] = useState('');
    const [lecture, setLecture] = useState(null);
    const [session, setSession] = useState();
    const [classValue, setClassValue] = useState('');
    const [section, setSection] = useState('');
    const [mondayTeacher, setMondayTeacher] = useState('');
    const [mondaySubject, setMondaySubject] = useState('');
    const [tuesdayTeacher, setTuesdayTeacher] = useState('');
    const [tuesdaySubject, setTuesdaySubject] = useState('');
    const [wednesdayTeacher, setWednesdayTeacher] = useState('');
    const [wednesdaySubject, setWednesdaySubject] = useState('');
    const [thursdayTeacher, setThursdayTeacher] = useState('');
    const [thursdaySubject, setThursdaySubject] = useState('');
    const [fridayTeacher, setFridayTeacher] = useState('');
    const [fridaySubject, setFridaySubject] = useState('');

    // setting subjects of respective teachers 
    const [mondayStore, setMondayStore] = useState([]);
    const [tuesdayStore, setTuesdayStore] = useState([]);
    const [wednesdayStore, setWednesdayStore] = useState([]);
    const [thursdayStore, setThursdayStore] = useState([]);
    const [fridayStore, setFridayStore] = useState([]);


    //states for slot booking
    const [slot, setSlot] = useState('')
    console.log(wednesdayTeacher)
    console.log(wednesdayStore)

    //getting current date
    const [date, setDate] = useState('')
    // Create a new Date object to represent the current local date and time
    const currentDate = new Date();

    // Get the current local time components
    const hours = currentDate.getHours(); // Get the current hour (0-23)
    const minutes = currentDate.getMinutes(); // Get the current minute (0-59)
    const seconds = currentDate.getSeconds(); // Get the current second (0-59)

    // Format the current local time as HH:mm:ss (e.g., 10:30:45)
    const formattedTime = `${hours}:${minutes}:${seconds}`;






    // };


    //store all staff
    // const submittedDate
    const [Attendance, setAttendance] = useState([])
    const getAttendance = async () => {
        console.log(classValue)
        console.log(section)
        console.log(session)
        console.log(date)
        console.log(slot)
        if (classValue != '' && section != '' && session != '' && date != '' & slot != '') {
            console.log(classValue, section, session)
            try {
                const data = await fetch(`http://localhost:8088/api/Attendance/attendance/${classValue}/${section}/${session}/${date}/${slot}`);
                const fdata = await data.json();
                console.log(fdata)
                setAttendance(fdata)
            } catch (error) {
                console.log(error)
            }
        }

    }

    const [filters, setFilters] = useState({
        data: false,
        class: "",
        section: "",
        year: "",
        slot: '',
        date: ''


    });


    const [filteredData, setFilteredData] = useState([]);
    const [modifiedData, setModifiedData] = useState([]);
    const [dis, setDis] = useState(false)
    const [days, setDays] = useState([])
    const [dbTeacherName, setDbTeacherName] = useState('')
    const [dbTime, setDbTime] = useState(null)

    const [showMsg, setShowMsg] = useState(false)

    //filteratrion part
    // Extract unique sessions
    const uniqueSessions = [...new Set(detail.map(elm => elm.session))].sort();
    // Extract unique class names
    const uniqueClassNames = [...new Set(detail.map(elm => elm.className))].sort();
    // Extract unique sections
    const uniqueSections = [...new Set(detail.map(elm => elm.section))].sort();
    console.log(uniqueClassNames)
    console.log(detail)
    console.log(Attendance)
    const dataFilter = (data) => {

        let filterData;
        if (Attendance.length > 0) {
            filterData = Attendance;
            console.log('first block')
            setDbTeacherName(filterData[0].teacherName)
            setDbTime(filterData[0].time)
            setcreate(false)
        } else {
            setcreate(true)
            const newData = [];

            data?.map((student) => {
                const obj = {}
                obj.attendance = 'true',
                    obj.className = student.className,
                    obj.fathersName = student.fathersName,
                    obj.section = student.section,
                    obj.session = student.session,
                    obj.studentId = student.id,
                    obj.studentName = student.name,
                    obj.rollNumber = student.rollNumber,
                    obj.date = date,
                    obj.time = formattedTime,
                    obj.slot = slot == '1st' ? '1st' : '2nd',
                    obj.teacherName = localStorage.getItem("username"),
                    newData.push(obj)
            })
            console.log(newData)
            filterData = newData
        }

        console.log(filterData)

        //filter for session
        if (filters.year !== "") {
            filterData = filterData.filter(
                (ele) => ele.session == filters.year
            );
        }
        console.log(filterData)
        //filter for class
        if (filters.class !== "") {
            filterData = filterData.filter(
                (ele) => ele.className === filters.class
            );
        }
        console.log(filterData)
        //filter for section
        if (filters.section !== "") {
            filterData = filterData.filter(
                (ele) => ele.section === filters.section
            );
        }

        console.log(filterData)

        if (filters.class !== "" && filters.year !== "" && filters.section !== "" && filters.slot != '' && filters.date != '') {

            if (filterData.length > 0) {
                // setcreate(true)
                setDis(false)


                setFilteredData(filterData)
                // Object to store aggregated data
                console.log(filterData)





                // // Create an array to store the subjects temporarily
                // let tempSubjects = [];

                // filterData.forEach(elm => {
                //     const stringToSplit1 = elm.monday;
                //     const stringToSplit2 = elm.tuesday;
                //     const stringToSplit3 = elm.wednesday;
                //     const stringToSplit4 = elm.thursday;
                //     const stringToSplit5 = elm.friday;
                //     const arr = [stringToSplit1, stringToSplit2, stringToSplit3, stringToSplit4, stringToSplit5];

                //     arr.forEach(e => {
                //         const parts = e.split(" ");
                //         if (parts.length > 1) {
                //             const laterPart = parts.slice(1).join(" ");
                //             tempSubjects.push(laterPart);
                //         }
                //     });
                // });

                // After processing all subjects, update totalSubjects
                // setTotalSubjects(tempSubjects);
                setUpdateButton('Update')
                setAddNew(true)
            }

            else {
                const customToastStyle = {
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '14px',
                };
                // toast.error("This data is not available.if you want to create,click on the add new button", {
                //     style: customToastStyle
                // })

                setDis(true)
                setFilteredData([])
                // setTotalSubjects([])
                // setUpdateButton('')
                setcreateNew(false)
                setAddNew(false)
            }

        }

    };
    console.log(filteredData)
    //filter change for class  query
    const handleFilterClass = (value) => {
        setClassValue(value)
        setFilters((prev) => ({
            ...prev,
            // classData: false,
            class: value,
        }));
    };
    //filter change for section  query
    const handleFiltersection = (value) => {
        //console.log(value)
        setSection(value)
        setFilters((prev) => ({
            ...prev,
            // classData: false,
            section: value,
        }));
    };

    //filter change for admissionYear  query
    const handleFilterYear = (value) => {
        //console.log(value)
        setSession(value)
        setFilters((prev) => ({
            ...prev,
            // classData: false,
            year: value,
        }));
    };

    //filter change for slot
    const handleFilterSlot = (value) => {
        console.log(value)
        setSlot(value)
        setFilters((prev) => ({
            ...prev,
            // classData: false,
            slot: value,
        }));
    };
    //filter change for date
    const handleFilterDate = (value) => {
        //console.log(value)
        setDate(value)
        setFilters((prev) => ({
            ...prev,
            // classData: false,
            date: value,
        }));
    };

    console.log(filters)









    useEffect(() => {
        dataFilter(data);
        //console.log("trigeered")
    }, [filters, data, slot, date, Attendance]);

    // const [daysMap, setDaysMap] = useState([])
    const daysMap = ['Sr.No', 'Student Id', 'Student', 'F Name', 'Roll Number', 'Attendance'];




    useEffect(() => {
        getData()
        getDetails()
        getAttendance()

    }, [filters])

    // useEffect(() => {
    //     getAttendance()
    //     dataFilter(data)
    // }, [data])




    const get = async (e, day) => {

        const id = e?.target?.value
        console.log(day, id)
        if (day == 'periods' && id !== 'Select') {
            const id = e.target.value;
            console.log(e.target.value)

            try {
                const data = await fetch(`http://localhost:8086/api/periods/lecture/${id}`);
                const fdata = await data.json();
                //console.log(fdata);
                setLecture(e.target.value)
                setCurrentStartTime(fdata.startTime)
                setCurrentEndTime(fdata.endTime)
            } catch (error) {
                console.log(error);
            }
        } else if (day == 'periods' && id == 'Select') {
            setLecture('')
            setCurrentStartTime('')
            setCurrentEndTime('')
        }
        else {
            try {
                const ab = await fetch(`http://localhost:8083/api/staff/${id}`)
                const fab = await ab.json()
                if (day == 'monday') {

                    setMondayTeacher(fab.name)
                    setMondayStore(fab.subjects)
                }
                else if (day == 'tuesday') {

                    setTuesdayTeacher(fab.name)
                    setTuesdayStore(fab.subjects)
                }
                else if (day == 'wednesday') {
                    setWednesdayTeacher(fab.name)
                    setWednesdayStore(fab.subjects)
                }
                else if (day == 'thursday') {
                    setThursdayTeacher(fab.name)
                    setThursdayStore(fab.subjects)
                }
                else if (day == 'friday') {
                    setFridayTeacher(fab.name)
                    setFridayStore(fab.subjects)
                }

            } catch (error) {
                console.log(error)
            }
        }


    }




    //filter the time table
    //console.log(totalSubjects)

    const editModeOn = (id) => {
        //console.log(id)
        try {
            setEditMode(id)
            setcreateNew(false)
        } catch (error) {
            console.log(error)
        }
    }

    const [periods, setPeriods] = useState([])
    const getPeriods = async () => {
        try {
            const data = await fetch('http://localhost:8086/api/periods/lectures');
            const fdata = await data.json();
            //console.log(fdata);
            setPeriods(fdata)
        } catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {
        getPeriods()
    }
        , [])

    const createNewEntry = () => {
        try {
            setcreateNew(true)

        } catch (error) {
            console.log(error)
        }
    }








    const create1 = async (d) => {
        console.log(filteredData)
        try {
            const response = await fetch('http://localhost:8088/api/Attendance/attendance/bulk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Specify the content type as JSON
                },
                body: JSON.stringify(filteredData) // Convert filteredData to JSON string
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            toast.success('attendance submitted')
            await getAttendance()
            // const responseData = await response.json(); // Parse response data as JSON
            // console.log(responseData); // Log the parsed JSON data
        } catch (error) {
            console.error('Error:', error); // Log any errors that occur during fetch or parsing
        }
    };
    //update exsisting entries of the data
    const update1 = async () => {
        console.log(filteredData)
        try {
            const data = await fetch(`http://localhost:8088/api/Attendance/attendance/${classValue}/${section}/${session}/${date}/${slot}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json' // Specify the content type as JSON
                },
                body: JSON.stringify(filteredData) // Co
            })

        } catch (error) {
            console.log(error)
        }
    }




    const deleteEntry = async (id, lec) => {


        try {
            //delete from class time table data
            const del = await fetch(`http://localhost:8086/api/timetable/${classValue}/${section}/${session}/${lec}`, {
                method: 'delete'
            })
            //delete from staff time table data
            const del2 = await fetch(`http://localhost:8086/api/LockedData/${classValue}/${section}/${session}/${lec}`, {
                method: 'delete'
            })
            await getData()

        } catch (error) {
            console.log(error)
        }
    }



    const showUpdate = () => {
        try {
            if (update) {
                setUpdate(false)
                setUpdateButton('Update')
                setcreateNew(false)
            } else {
                setUpdate(true)
                setUpdateButton('Cancel')

            }

        } catch (error) {
            console.log(error)
        }
    }


    const disableTest = () => {
        if (lecture == null || lecture == '') {
            setDisabledCheck(true)
        } else {
            setDisabledCheck(false)
        }
    }


    useEffect(() => {
        disableTest()
    }
        , [lecture])


    const goback = () => {
        navigate(-1)
    }

    const getDataFromStaffTimeTable = async () => {
        try {
            const data = await fetch('http://localhost:8086/api/LockedData/lecturedata')
            const fdata = await data.json()
            //console.log(fdata)
            setStaffTimedata(fdata)
        } catch (error) {
            console.log(error)
        }
    }




    useEffect(() => {
        getDataFromStaffTimeTable()

    }, [])



    const [lectureEdit, setLectureEdit] = useState(null)

    const eModeOn = (a, b) => {
        setEditMode(a)
        setLectureEdit(b)
    }
    console.log(filteredData)
    // CSS styles
    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
        borderCollapse: 'collapse'
    };

    const thStyle = {
        border: '1px solid black',
        padding: '8px',
        textAlign: 'left'
    };

    const tdStyle = {
        border: '1px solid black',
        padding: '8px',
        textAlign: 'left'
    };

    const changeCheckBox = (item, index, event) => {
        try {
            let val = event.target.checked
            console.log(val)
            let updatedStudent = [...filteredData];
            updatedStudent[index].attendance = String(val)
            console.log(updatedStudent)
            //   console.log(data)
            setFilteredData(updatedStudent)


        } catch (error) {
            console.log(error)
        }
    }
    console.log(filteredData)
    const cellStyle = {
        padding: '8px',        // Adjust padding for cell content
        border: '1px solid #ccc',  // Add border around cells
        textAlign: 'left',     // Align cell content to the left
        minWidth: '100px',     // Set minimum width for each cell
        maxWidth: '200px',     // Set maximum width for each cell
        overflow: 'hidden',    // Hide content overflow within cells
        whiteSpace: 'nowrap',  // Prevent line breaks within cells
        textOverflow: 'ellipsis',// Display ellipsis (...) for overflowed text
        textAlign:'center'  
      };

    return <div style={{ minHeight: '100vh', minWidth: '100vw', fontFamily: 'Roboto' }}>
        <Navbar />
        <Flex >
            <IoReturnUpBackOutline
                size={35}
                cursor="pointer"
                onClick={goback}
                style={{ marginLeft: 'auto', marginRight: '7%' }}

            />
        </Flex>
        <ToastContainer />
        <Stack display='flex' justifyContent='space-around' direction='row' alignItems='center'>
            <Flex margin="0 0 0  5%"
                direction="column" width="65vw" maxW="80vw">
                <Flex justifyContent='space-around' alignItems='center'>
                    <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
                        <FormLabel textAlign="center">Session</FormLabel>
                        <Select isRequired value={session} onChange={(e) => handleFilterYear(e.target.value)}>
                            <option>Select</option>
                            {uniqueSessions?.map((elm, i) => (
                                <option key={i} value={elm}>{elm}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
                        <FormLabel textAlign="center">Class</FormLabel>
                        <Select isRequired value={classValue} onChange={(e) => handleFilterClass(e.target.value)}>
                            <option>Select</option>
                            {uniqueClassNames?.map((elm, i) => (
                                <option key={i} value={elm}>{elm}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
                        <FormLabel textAlign="center">Section</FormLabel>
                        <Select isRequired value={section} onChange={(e) => handleFiltersection(e.target.value)}>
                            <option>Select</option>
                            {uniqueSections?.map((elm, i) => (
                                <option key={i} value={elm}>{elm}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl isRequired alignItems="center" m="1">
                        <FormLabel textAlign="center">Choose Slot</FormLabel >
                        <Flex direction='row' justifyContent="space-around" >
                            <Button colorScheme={slot == '1st' ? 'green' : 'teal'} value={slot} onClick={() => handleFilterSlot('1st')} width="30%">1st</Button>
                            <Button colorScheme={slot == '2nd' ? 'green' : 'teal'} value={slot} onClick={() => handleFilterSlot('2nd')} width="30%">2nd</Button>
                        </Flex>
                    </FormControl>
                    <FormControl isRequired justifyContent="space-between" alignItems="center">
                        <FormLabel textAlign="center">Date</FormLabel>

                        <Input value={date} type="date" onChange={(e) => handleFilterDate(e.target.value)} max={new Date().toISOString().split('T')[0]}/>

                    </FormControl>

                    {/* <FormControl isRequired justifyContent="space-between" alignItems="center" m="2% 1% 0 1%" display='flex'>
                        {
                            dis ? <div>
                                {createNew ?
                                    <div>
                                        <Button onClick={() => setcreateNew(false)}>Cancel</Button>
                                    </div>

                                    : <div>
                                        <Button onClick={() => createNewEntry()}>Add new</Button>
                                    </div>}
                            </div> : <div>
                                {
                                    create ? <Button onClick={() => showUpdate()}>{updateButton}</Button> : ''

                                }

                            </div>


                        }


                    </FormControl> */}
                </Flex>
                <TableContainer style={{ overflowY: "scroll", msOverflowStyle: "none" }}>
                    <Table size='sm' variant="simple" style={tableStyle}>

                        {
                            filteredData?.length > 0 || createNew == true ?
                                <>
                                    <caption style={{ fontSize: '2vh' }}>Class Time Table {classValue == 'Select' ? '' : classValue}</caption>

                                    <Thead>
                                        <Tr>

                                            {
                                                daysMap?.map((day, i) => (
                                                    <Th key={i} style={cellStyle}>{day}</Th>
                                                ))
                                            }


                                        </Tr>
                                    </Thead>
                                </>
                                : ''
                        }

                        <Tbody>
                            {filteredData.map((item, index) => (
                                 <tr key={index}>
                                 <td style={cellStyle}>{index + 1}</td>
                                 <td style={cellStyle}>{item.studentId}</td>
                                 <td style={cellStyle}>{item.studentName}</td>
                                 <td style={cellStyle}>{item.fathersName}</td>
                                 <td style={cellStyle}>{item.rollNumber}</td>
                                 <td style={cellStyle}>
                                   {/* Assuming Checkbox component is imported and used correctly */}
                                   <Checkbox
                                     isChecked={item.attendance === 'true'}
                                     onChange={(event) => changeCheckBox(item, index, event)}
                                     size="lg"
                                   />
                                 </td>
                               </tr>
                            ))}
                        </Tbody>








                    </Table>

                    {
                        showMsg ? <Text style={{ alignSelf: 'center', margin: "2% 10%", color: 'red' }}>it seems that time table does not exist for the above class selection.Please click "Add New" button to add time table for this class.</Text> : ''
                    }

                </TableContainer>
                <Stack display="flex" flexDirection="row" width="100%" justifyContent="space-between" alignItems="center">

                    {
                        create ? "" : <Stack gap="0.0rem">

                            <Badge colorScheme="red" textColor="black" fontSize="small">Submitted By: {dbTeacherName}</Badge>
                            <Badge colorScheme="red" textColor="black" fontSize="small">Submitted At: {dbTime}</Badge>


                        </Stack>
                    }
                    {
                        filteredData?.length > 0 ? <Stack width="10%">
                            {
                                create ? <Button onClick={() => create1()} bgColor="green">Submit</Button> : <Button onClick={() => update1()} bgColor="green">Update</Button>

                            }

                        </Stack> : ''
                    }
                </Stack>




            </Flex>



        </Stack>
    </div>



}
export default AttendanceMarking