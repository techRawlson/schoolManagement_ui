import { Button, Flex, FormControl, FormLabel, IconButton, Input, Select, Stack, StatUpArrow, Text } from "@chakra-ui/react"
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
import { IoArrowBack } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import Stafftimetable from "./StaffTimeTable";
import { DeleteIcon } from "@chakra-ui/icons";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { useData } from "../context/DataContext";
const Classtimetable = () => {
    const{Role,updateData}=useData()
    const [data, setData] = useState([])
    console.log(data)

    const [detail, setDetail,] = useState([])
    const [createNew, setcreateNew] = useState(false)
    const [create, setcreate] = useState(false)
    const getData = async () => {
        try {
            const data = await fetch('http://localhost:8086/api/timetable/full-timetable')
            const fdata = await data.json()
            //console.log(fdata)
            setData(fdata)
        } catch (error) {
            console.log(error)
        }
    }
    const getDetails = async () => {
        try {
            const data = await fetch('http://localhost:8082/api/students/get-AllClasses')
            const fdata = await data.json()
            //console.log(fdata)
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



    console.log(wednesdayTeacher)
    console.log(wednesdayStore)

    //create a new time table
    const body = {
        lectureNumber: lecture,
        startTime: currentStartTime,
        endTime: currentEndTime,
        className: classValue,
        session: session,
        section: section,
        monday: mondayTeacher == undefined ? '' : mondayTeacher + " " + mondaySubject,
        tuesday: tuesdayTeacher == undefined ? '' : tuesdayTeacher + " " + tuesdaySubject,
        wednesday: wednesdayTeacher == undefined ? '' : wednesdayTeacher + " " + wednesdaySubject,
        thursday: thursdayTeacher == undefined ? '' : thursdayTeacher + " " + thursdaySubject,
        friday: fridayTeacher == undefined ? '' : fridayTeacher + " " + fridaySubject,
    };

    const timeTable = async () => {
        let totalEntry = 0;
        let und = 0;
        const arr = [mondayTeacher, tuesdayTeacher, wednesdayTeacher, thursdayTeacher, fridayTeacher]
        arr.map((day) => (

            day == undefined || day == '' ? und++ : totalEntry++
        ))

        //Validation to the creating new Time table
        console.log(lecture)
        console.log(classValue)
        console.log(section)


        const dayCount = [1, 2, 3, 4, 5];
        let lect = 0;
        let tech = 0;
        console.log(staffTimedata)



        try {

            let body = {
                lectureNumber: lecture,
                startTime: currentStartTime,
                endTime: currentEndTime,
                className: classValue,
                session: session,
                section: section,
            };
            //this code is for table entries for class
            const entryTeachers = [mondayTeacher, tuesdayTeacher, wednesdayTeacher, thursdayTeacher, fridayTeacher]
            const entrySubjects = [mondaySubject, tuesdaySubject, wednesdaySubject, thursdaySubject, fridaySubject]
            const entryDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",];

            const bodyEntries = []; // Array to store entries for each day
            // Iterate over each day
            console.log(entryDays)
            console.log(days)
            let count = 0;
            entryTeachers.forEach((teach, i) => {
                const d = days.find((elm) => elm.day == entryDays[i])
                console.log(d)
                console.log(d ? true : false)
                console.log(entryTeachers[i])
                //    console.log
                if (entryTeachers[i] && d) { // Check if teacher exists and day is defined
                    console.log(teach)
                    console.log(entryDays[i])
                    const entry = {
                        lectureNumber: lecture,
                        startTime: currentStartTime,
                        endTime: currentEndTime,
                        className: classValue,
                        session: session,
                        section: section,
                        day: d.day, // Assign day
                        teacherName: teach, // Assign teacher name
                        subject: entrySubjects[i] // Assign subject
                    };
                    // count++;
                    bodyEntries.push(entry); // Add entry to array
                } else {
                    console.log("Nothing to add for day", entryDays[i]);
                }
            });

            console.log(bodyEntries)
            let status = 0;
            let check = [true, true, true, true, true]
            // Create an array to store promises
            const promises = bodyEntries?.map(async (elm, i) => {
                console.log(elm);
                try {
                    const response = await fetch('http://localhost:8086/api/timetable/create-timetable', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(elm),
                    });
                    status = response.status;
                    if (status >= 200 && status < 300) {
                        console.log(status);
                        check[i] = true
                        toast.success('Data created');
                        await getData()
                    } else {
                        check[i] = false
                        console.log(status);
                        toast.error('Teacher is not free');
                        setcreateNew(true)
                        setcreate(false)
                    }
                } catch (error) {
                    check = false;
                    console.log(error);
                }
            });

            // Wait for all promises to resolve
            await Promise.all(promises);
            //this code is for staff time table entries

            console.log(check)
            //create timetable for teachers
            arr.map(async (teach, i) => {
                console.log('hello')
                if (teach == undefined || teach == '') {
                    toast('Please select teachers')

                } else {
                    console.log(i)
                    if (i == 0) {
                        const body = {
                            lectureNumber: lecture,
                            startTime: currentStartTime,
                            endTime: currentEndTime,
                            className: classValue,
                            section: section,
                            teacherName: mondayTeacher,
                            teacherSubject: mondaySubject,
                            day: 'Monday',
                            session: session
                        };
                        if (check[i]) {
                            const staffTimeTableEnntry = await fetch('http://localhost:8086/api/LockedData/teachersData', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(body),
                            });
                            console.log(staffTimeTableEnntry)
                        }

                    } else if (i == 1) {
                        console.log("tuesdayTeacher")
                        const body = {
                            lectureNumber: lecture,
                            startTime: currentStartTime,
                            endTime: currentEndTime,
                            className: classValue,
                            section: section,
                            teacherName: tuesdayTeacher,
                            teacherSubject: tuesdaySubject,
                            day: 'Tuesday',
                            session: session
                        };
                        if (check[i]) {
                            const staffTimeTableEnntry = await fetch('http://localhost:8086/api/LockedData/teachersData', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(body),
                            });
                            console.log(staffTimeTableEnntry)
                        }

                    } else if (i == 2) {
                        console.log("wed teacher")
                        const body = {
                            lectureNumber: lecture,
                            startTime: currentStartTime,
                            endTime: currentEndTime,
                            className: classValue,
                            section: section,
                            teacherName: wednesdayTeacher,
                            teacherSubject: wednesdaySubject,
                            day: 'Wednesday',
                            session: session
                        };
                        if (check[i]) {
                            const staffTimeTableEnntry = await fetch('http://localhost:8086/api/LockedData/teachersData', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(body),
                            });
                            console.log(staffTimeTableEnntry)
                        }

                    } else if (i == 3) {
                        console.log("thursday teacher")
                        const body = {
                            lectureNumber: lecture,
                            startTime: currentStartTime,
                            endTime: currentEndTime,
                            className: classValue,
                            section: section,
                            teacherName: thursdayTeacher,
                            teacherSubject: thursdaySubject,
                            day: 'Thursday',
                            session: session
                        };
                        if (check[i]) {
                            const staffTimeTableEnntry = await fetch('http://localhost:8086/api/LockedData/teachersData', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(body),
                            });
                            console.log(staffTimeTableEnntry)
                        }

                    } else if (i == 4) {
                        console.log("friday teacher")
                        const body = {
                            lectureNumber: lecture,
                            startTime: currentStartTime,
                            endTime: currentEndTime,
                            className: classValue,
                            section: section,
                            teacherName: fridayTeacher,
                            teacherSubject: fridaySubject,
                            day: 'Friday',
                            session: session
                        };
                        if (check[i]) {
                            const staffTimeTableEnntry = await fetch('http://localhost:8086/api/LockedData/teachersData', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(body),
                            });
                            console.log(staffTimeTableEnntry)
                        }

                    }
                }
            })



            // const data = await response.json();







            setcreateNew(false)
            setDis(false)
            //empty all states
            setDisabledCheck(true)
            setCurrentEndTime('')
            setCurrentStartTime('')
            setMondayTeacher('')
            setMondaySubject('')
            setMondayStore([])
            setTuesdayTeacher('')
            setTuesdaySubject('')
            setTuesdayStore([])
            setWednesdayTeacher('')
            setWednesdaySubject('')
            setWednesdayStore([])
            setThursdayTeacher('')
            setThursdaySubject('')
            setThursdayStore([])
            setFridayTeacher('')
            setFridaySubject('')
            setFridayStore([])
            // setFridayStore('')
        } catch (error) {
            // toast.error("something went wrong")
            console.log(error);
        }
    }
    // };


    //store all staff
    const [staff, setStaff] = useState([])
    const getStaff = async () => {
        try {
            const data = await fetch("http://13.201.55.247:8083/api/staff/saved-Staff");
            const fdata = await data.json();

            setStaff(fdata)
        } catch (error) {
            console.log(error)
        }
    }

    const [filters, setFilters] = useState({
        data: false,
        class: "",
        section: "",
        year: "",

    });


    const [filteredData, setFilteredData] = useState([]);
    const [modifiedData, setModifiedData] = useState([]);
    const [dis, setDis] = useState(false)
    const [days, setDays] = useState([])

    const [totalSubjects, setTotalSubjects] = useState([]);
    const [uniqueSubject, setUniqeSuject] = useState([])

    console.log(totalSubjects)

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
    const dataFilter = (data) => {
        console.log(section)
        console.log(session)
        console.log(classValue)
        let filterData = data;
        console.log(filterData)
        const modifiedData = Object.values(data.reduce((acc, obj) => {
            const key = `${obj.className}-${obj.section}-${obj.session}-${obj.lectureNumber}`;
            if (!acc[key]) {
                acc[key] = { ...obj, days: [obj.day], subjects: [obj.subject], teachers: [obj.teacherName] };
            } else {
                acc[key] = {
                    ...acc[key],
                    days: [...acc[key].days, obj.day],
                    subjects: [...acc[key].subjects, obj.subject],
                    teachers: [...acc[key].teachers, obj.teacherName]
                };
            }
            delete acc[key].day; // Remove day property from the final object
            delete acc[key].subject; // Remove subject property from the final object
            delete acc[key].teacherName; // Remove teacherName property from the final object
            return acc;
        }, {}));

        // Convert React elements to strings for the 'days' property
        modifiedData.forEach(item => {
            console.log(item.days);
        });
        console.log(modifiedData);
        filterData = modifiedData
        console.log(filterData)
        setModifiedData(modifiedData)


console.log(filters)
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

        if (filters.class !== "" && filters.year !== "" && filters.section !== "") {
console.log("here")
            if (filterData.length > 0) {
                setcreate(true)
                setDis(false)
                // Iterate over each object in the data array
                // Create an empty object to store the subject counts
                const subjectCounts = {};
                filterData.forEach(item => {
                    item.subjects.forEach(subject => {
                        if (subjectCounts[subject]) {
                            subjectCounts[subject]++;
                        } else {
                            subjectCounts[subject] = 1;
                        }
                    });
                });

                setTotalSubjects(subjectCounts)

                setFilteredData(filterData)
                // Object to store aggregated data
                console.log(filterData)
                setShowMsg(false)
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
                setShowMsg(true)
                setDis(true)
                setFilteredData([])
                setTotalSubjects([])
                // setUpdateButton('')
                setcreateNew(false)
                setAddNew(false)
            }

        }

    };

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




    const [daysMap, setDaysMap] = useState([])

    const getDays = async () => {
        try {
            const data = await fetch('http://localhost:8086/api/days/days');
            const fdata = await data.json();
            // console.log(fdata);
            // Sort the days array based on the day property
            const desiredOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            const sortedDays = fdata.slice().sort((a, b) => {
                return desiredOrder.indexOf(a.day) - desiredOrder.indexOf(b.day);
            });

            if (sortedDays.length > 0) {
                setDays(sortedDays)

                const addSpaceBetweenLetters = str => str.split('').join(' ');

                // Map through the desiredOrder array and add space between letters in each item
                const spacedDesiredOrder = sortedDays.map(day => addSpaceBetweenLetters(day.day));
                // console.log(spacedDesiredOrder)
                setDaysMap(spacedDesiredOrder)


            } else {
                setDays([])
            }


        } catch (error) {
            setDays([])
            console.log(error);
        }

    }



    useEffect(() => {
        getData()
        getDetails()
        getStaff()

    }, [])

    useEffect(() => {
        getDays()
    }, [])


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
                const ab = await fetch(`http://13.201.55.247:8083/api/staff/${id}`)
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
            setShowMsg(false)
        } catch (error) {
            console.log(error)
        }
    }









    const create1 = () => {
        setcreateNew(true)
        setEditMode(null)

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


    useEffect(() => {
        disableTest()
    }
        , [lecture])




    const showStudentTimeTable = async () => {
        try {
            const studentId = localStorage.getItem('username');
            const response = await fetch(`http://localhost:8082/api/students/id/${studentId}`);
            const dataJson = await response.json();
            console.log(dataJson);
            setSession(dataJson.session);
            setClassValue(dataJson.className);
            setSection(dataJson.section);
            setFilters((prev) => ({
                ...prev,
                // classData: false,
                year: dataJson.session,
                class:dataJson.className,
                section:dataJson.section
            }));
            await getData()
            await dataFilter(data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if(Role=='student'){
            const fetchData = async () => {
                await showStudentTimeTable();
                // await getData()
            };
            fetchData(); 
        }
        
    }, []);



    useEffect(() => {
        dataFilter(data);
        //console.log("trigeered")
    }, [filters, data]);



    return <div style={{ minHeight: '100vh', minWidth: '100vw', fontFamily: 'Roboto' }}>
        <Navbar />
        <Flex >
            <IconButton as={IoArrowBack}
                size="md"
                cursor="pointer"
                onClick={goback}
                style={{ marginLeft: '3.1%', marginTop: '1%', marginBottom: '1%' }}

            />
        </Flex>
        <ToastContainer />
        <Stack display='flex' justifyContent='space-around' direction='row' alignItems='center'>
            <Flex margin="0 0 0  5%"
                direction="column" width={Role=='student'?'100vw':'65vw'} maxW="100vw">
                <Flex justifyContent='space-around' alignItems='center' >
                    <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
                        <FormLabel>Session</FormLabel>
                        <Select isRequired value={session} onChange={(e) => handleFilterYear(e.target.value)} disabled={Role=='student'?true:false}>
                            <option>Select</option>
                            {uniqueSessions?.map((elm, i) => (
                                <option key={i} value={elm}>{elm}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
                        <FormLabel>Class</FormLabel>
                        <Select isRequired value={classValue} onChange={(e) => handleFilterClass(e.target.value)} disabled={Role=='student'?true:false}>
                            <option>Select</option>
                            {uniqueClassNames?.map((elm, i) => (
                                <option key={i} value={elm}>{elm}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
                        <FormLabel>Section</FormLabel>
                        <Select isRequired value={section} onChange={(e) => handleFiltersection(e.target.value)} disabled={Role=='student'?true:false}>
                            <option>Select</option>
                            {uniqueSections?.map((elm, i) => (
                                <option key={i} value={elm}>{elm}</option>
                            ))}
                        </Select>
                    </FormControl>
                    {
                        Role=='student'?"":Role=='staff'?'': <FormControl isRequired justifyContent="space-between" alignItems="center" m="2% 1% 0 1%" display='flex'>
                        {
                            dis ? <div>
                                {createNew ?
                                    <div>
                                        <Button onClick={() => setcreateNew(false)}>Cancel</Button>
                                    </div>

                                    : <div>
                                        <Button onClick={() => createNewEntry()}>Add new</Button>
                                        <Button colorScheme="green">Print</Button>
                                    </div>

                                    }
                            </div> : <div>
                                {
                                    create ? <Button onClick={() => showUpdate()}>{updateButton}</Button> : ''

                                }

                            </div>


                        }


                    </FormControl>
                       
                    }
                    
                </Flex>
                <TableContainer style={{ overflowY: "scroll", msOverflowStyle: "none" }}>
                    <Table size='sm' variant="simple" style={tableStyle}>

                        {
                            filteredData?.length > 0 || createNew == true ?
                                <>
                                    <caption style={{ fontSize: '2vh' }}>Class Time Table {classValue == 'Select' ? '' : classValue}</caption>

                                    <Thead>
                                        <Tr>
                                            <Th style={thStyle}>Lecture No.</Th>
                                            <Th style={thStyle}>Start Time</Th>
                                            <Th style={thStyle}>End Time</Th>
                                            {
                                                daysMap?.map((day, i) => (
                                                    <Th key={i} style={thStyle}>{day}</Th>
                                                ))
                                            }


                                        </Tr>
                                    </Thead>
                                </>
                                : ''
                        }


                        {filteredData?.map((elm, i) => {

                            // Function to save changes
                            const saveChanges = async (id) => {
                                const teacherArray = [mondayTeacher, tuesdayTeacher, wednesdayTeacher, thursdayTeacher, fridayTeacher]
                                teacherArray?.map(async (teach, i) => {
                                    if (teach == '' || teach == undefined) {

                                        console.log('no updataes', teach)
                                    } else {
                                        console.log('lets update this', teach, i)
                                        const body = {
                                            teacherName: teach,
                                            subject: mondaySubject
                                        };
                                        if (i == 0) {
                                            const data = await fetch(`http://localhost:8086/api/timetable/update-timetable/${classValue}/${section}/${session}/${lectureEdit}/monday`, {
                                                method: 'put',
                                                headers: {
                                                    'Content-Type': 'application/json' // Specify the content type as JSON
                                                },
                                                body: JSON.stringify(body)
                                            })
                                            const fdata = await data.json()

                                            //now update the same entry in this staff time table
                                            const staffdata = await fetch(`http://localhost:8086/api/LockedData/update-Staff-Timetable/${classValue}/${section}/${session}/${lectureEdit}/monday`, {
                                                method: 'put',
                                                headers: {
                                                    'Content-Type': 'application/json' // Specify the content type as JSON
                                                },
                                                body: JSON.stringify(body)
                                            })
                                            const fstaffdata = await data.json()

                                        } else if (i == 1) {
                                            const body = {
                                                teacherName: teach,
                                                subject: tuesdaySubject
                                            };
                                            const data = await fetch(`http://localhost:8086/api/timetable/update-timetable/${classValue}/${section}/${session}/${lectureEdit}/tuesday`, {
                                                method: 'put',
                                                headers: {
                                                    'Content-Type': 'application/json' // Specify the content type as JSON
                                                },
                                                body: JSON.stringify(body)
                                            })
                                            const fdata = await data.json()
                                            console.log(fdata)
                                            //now update the same entry in this staff time table
                                            const staffdata = await fetch(`http://localhost:8086/api/LockedData/update-Staff-Timetable/${classValue}/${section}/${session}/${lectureEdit}/tuesday`, {
                                                method: 'put',
                                                headers: {
                                                    'Content-Type': 'application/json' // Specify the content type as JSON
                                                },
                                                body: JSON.stringify(body)
                                            })
                                            const fstaffdata = await data.json()
                                        } else if (i == 2) {

                                            const body = {
                                                teacherName: teach,
                                                subject: wednesdaySubject
                                            }


                                            const data = await fetch(`http://localhost:8086/api/timetable/update-timetable/${classValue}/${section}/${session}/${lectureEdit}/wednesday`, {
                                                method: 'put',
                                                headers: {
                                                    'Content-Type': 'application/json' // Specify the content type as JSON
                                                },
                                                body: JSON.stringify(body)
                                            })
                                            const fdata = await data.json()
                                            console.log(fdata)
                                            //now update the same entry in this staff time table
                                            const staffdata = await fetch(`http://localhost:8086/api/LockedData/update-Staff-Timetable/${classValue}/${section}/${session}/${lectureEdit}/wednesday`, {
                                                method: 'put',
                                                headers: {
                                                    'Content-Type': 'application/json' // Specify the content type as JSON
                                                },
                                                body: JSON.stringify(body)
                                            })
                                            const fstaffdata = await data.json()
                                        } else if (i == 3) {

                                            const body = {
                                                teacherName: teach,
                                                subject: thursdaySubject
                                            }


                                            const data = await fetch(`http://localhost:8086/api/timetable/update-timetable/${classValue}/${section}/${session}/${lectureEdit}/thursday`, {
                                                method: 'put',
                                                headers: {
                                                    'Content-Type': 'application/json' // Specify the content type as JSON
                                                },
                                                body: JSON.stringify(body)
                                            })
                                            const fdata = await data.json()
                                            console.log(fdata)
                                            //now update the same entry in this staff time table
                                            const staffdata = await fetch(`http://localhost:8086/api/LockedData/update-Staff-Timetable/${classValue}/${section}/${session}/${lectureEdit}/thursday`, {
                                                method: 'put',
                                                headers: {
                                                    'Content-Type': 'application/json' // Specify the content type as JSON
                                                },
                                                body: JSON.stringify(body)
                                            })
                                            const fstaffdata = await data.json()
                                        } else if (i == 4) {
                                            const body = {
                                                teacherName: teach,
                                                subject: fridaySubject
                                            }
                                            const data = await fetch(`http://localhost:8086/api/timetable/update-timetable/${classValue}/${section}/${session}/${lectureEdit}/friday`, {
                                                method: 'put',
                                                headers: {
                                                    'Content-Type': 'application/json' // Specify the content type as JSON
                                                },
                                                body: JSON.stringify(body)
                                            })
                                            const fdata = await data.json()
                                            console.log(fdata)
                                            //now update the same entry in this staff time table
                                            const staffdata = await fetch(`http://localhost:8086/api/LockedData/update-Staff-Timetable/${classValue}/${section}/${session}/${lectureEdit}/friday`, {
                                                method: 'put',
                                                headers: {
                                                    'Content-Type': 'application/json' // Specify the content type as JSON
                                                },
                                                body: JSON.stringify(body)
                                            })
                                            const fstaffdata = await data.json()

                                        }
                                    }
                                    await getData()
                                })


                                console.log(data)
                                console.log('reached')
                                try {

                                    setMondayTeacher('')
                                    setMondaySubject('')
                                    setMondayStore([])
                                    setTuesdayTeacher('')
                                    setTuesdaySubject('')
                                    setTuesdayStore([])
                                    setWednesdayTeacher('')
                                    setWednesdaySubject('')
                                    setWednesdayStore([])
                                    setThursdayTeacher('')
                                    setThursdaySubject('')
                                    setThursdayStore([])
                                    setFridayTeacher('')
                                    setFridaySubject('')
                                    setFridayStore([])



                                    // getData()


                                } catch (error) {
                                    console.log(error)
                                }
                                // Reset edit mode
                                setEditMode(false);
                            };
                            const mIndex = elm.days.indexOf('Tuesday')
                            console.log(mIndex)
                            return (
                                <Tbody key={i}>
                                    <Tr>
                                        <Td >
                                            <span> {elm.lectureNumber == null || elm.lectureNumber == 0 ? 1 : elm.lectureNumber}  </span>
                                        </Td>
                                        <Td ><input type="time" value={elm.startTime} disabled /></Td>
                                        <Td ><input type="time" value={elm.endTime} disabled /></Td>
                                        {/* Render Monday */}
                                        {

                                            editMode == elm.id && elm.days.find((elm) => elm == 'Monday') ?
                                                <Td  >
                                                    <Flex direction='column' alignItems="center">
                                                        {elm.teachers[elm.days.indexOf('Monday')]}
                                                        <Select onChange={(e) => get(e, 'monday')} >
                                                            <option>Select</option>
                                                            {staff?.map((elm, i) => (
                                                                <option key={i} value={elm.id}>{elm.name}</option>
                                                            ))}
                                                        </Select>
                                                        {elm.subjects[elm.days.indexOf('Monday')]}
                                                        <Select value={mondaySubject} onChange={(e) => setMondaySubject(e.target.value)} >
                                                            <option>Select</option>
                                                            {
                                                                mondayStore?.map((subject) => (
                                                                    <option>{subject}</option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </Flex>
                                                </Td>
                                                :
                                                <Td style={{ display: days.some(item => item.day === 'Monday') ? 'table-cell' : 'none' }} >
                                                    {
                                                        elm.days.find((elm) => elm == 'Monday') ? <Flex direction="column">
                                                            <Td >{elm.teachers[elm.days.indexOf('Monday')]}</Td>
                                                            <Td >{elm.subjects[elm.days.indexOf('Monday')]}  </Td>
                                                        </Flex> : ""
                                                    }
                                                </Td>



                                        }
                                        {
                                            editMode == elm.id && elm.days.find((elm) => elm == 'Tuesday') ?
                                                <Td>
                                                    <Flex direction='column' alignItems="center">
                                                        {elm.teachers[elm.days.indexOf('Tuesday')]}
                                                        <Select onChange={(e) => get(e, 'tuesday')} >
                                                            <option>Select</option>
                                                            {staff?.map((elm, i) => (
                                                                <option key={i} value={elm.id}>{elm.name}</option>
                                                            ))}
                                                        </Select>
                                                        {elm.subjects[elm.days.indexOf('Tuesday')]}
                                                        <Select value={tuesdaySubject} onChange={(e) => setTuesdaySubject(e.target.value)} >
                                                            <option>Select</option>
                                                            {
                                                                tuesdayStore?.map((subject) => (
                                                                    <option>{subject}</option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </Flex>
                                                </Td>
                                                : <Td style={{ display: days.some(item => item.day === 'Tuesday') ? 'table-cell' : 'none' }}>
                                                    {
                                                        elm.days.find((elm) => elm == 'Tuesday') ? <Flex direction="column">
                                                            <Td>{elm.teachers[elm.days.indexOf('Tuesday')]}</Td>
                                                            <Td>{elm.subjects[elm.days.indexOf('Tuesday')]}  </Td>
                                                        </Flex> : ""


                                                    }
                                                </Td>
                                        }
                                        {
                                            editMode == elm.id && elm.days.find((elm) => elm == 'Wednesday') ?
                                                <Td>
                                                    <Flex direction='column' alignItems="center">
                                                        {elm.teachers[elm.days.indexOf('Wednesday')]}
                                                        <Select onChange={(e) => get(e, 'wednesday')}>
                                                            <option>Select</option>
                                                            {staff?.map((elm, i) => (
                                                                <option key={i} value={elm.id}>{elm.name}</option>
                                                            ))}
                                                        </Select>
                                                        {elm.subjects[elm.days.indexOf('Wednesday')]}
                                                        <Select value={wednesdaySubject} onChange={(e) => setWednesdaySubject(e.target.value)} >
                                                            <option>Select</option>
                                                            {
                                                                wednesdayStore?.map((subject) => (
                                                                    <option>{subject}</option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </Flex>
                                                </Td>
                                                : <Td style={{ display: days.some(item => item.day === 'Wednesday') ? 'table-cell' : 'none' }}>
                                                    {
                                                        elm.days.find((elm) => elm == 'Wednesday') ? <Flex direction="column">
                                                            <Td>{elm.teachers[elm.days.indexOf('Wednesday')]}</Td>
                                                            <Td>{elm.subjects[elm.days.indexOf('Wednesday')]}  </Td>
                                                        </Flex> : ""
                                                    }
                                                </Td>
                                        }
                                        {
                                            editMode == elm.id && elm.days.find((elm) => elm == 'Thursday') ?
                                                <Td>
                                                    <Flex direction='column' alignItems="center">
                                                        {elm.teachers[elm.days.indexOf('Thursday')]}
                                                        <Select onChange={(e) => get(e, 'thursday')} >
                                                            <option>Select</option>
                                                            {staff?.map((elm, i) => (
                                                                <option key={i} value={elm.id}>{elm.name}</option>
                                                            ))}
                                                        </Select>
                                                        {elm.subjects[elm.days.indexOf('Thursday')]}
                                                        <Select value={thursdaySubject} onChange={(e) => setThursdaySubject(e.target.value)} >
                                                            <option>Select</option>
                                                            {
                                                                thursdayStore?.map((subject) => (
                                                                    <option>{subject}</option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </Flex>
                                                </Td>
                                                : <Td style={{ display: days.some(item => item.day === 'Thursday') ? 'table-cell' : 'none' }}>
                                                    {
                                                        elm.days.find((elm) => elm == 'Thursday') ? <Flex direction="column">
                                                            <Td>{elm.teachers[elm.days.indexOf('Thursday')]}</Td>
                                                            <Td>{elm.subjects[elm.days.indexOf('Thursday')]}  </Td>
                                                        </Flex> : ""
                                                    }
                                                </Td>
                                        }

                                        {
                                            editMode == elm.id && elm.days.find((elm) => elm == 'Friday') ?
                                                <Td>
                                                    <Flex direction='column' alignItems="center">
                                                        {elm.teachers[elm.days.indexOf('Friday')]}
                                                        <Select onChange={(e) => get(e, 'friday')} >
                                                            <option>Select</option>

                                                            {staff?.map((elm, i) => (
                                                                <option key={i} value={elm.id}>{elm.name}</option>
                                                            ))}
                                                        </Select>
                                                        {elm.subjects[elm.days.indexOf('Friday')]}
                                                        <Select value={fridaySubject} onChange={(e) => setFridaySubject(e.target.value)} >
                                                            <option>Select</option>
                                                            {
                                                                fridayStore?.map((subject) => (
                                                                    <option>{subject}</option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </Flex>
                                                </Td>
                                                : <Td style={{ display: days.some(item => item.day === 'Friday') ? 'table-cell' : 'none' }}>
                                                    {
                                                        elm.days.find((elm) => elm == 'Friday') ? <Flex direction="column">
                                                            <Td>{elm.teachers[elm.days.indexOf('Friday')]}</Td>
                                                            <Td>{elm.subjects[elm.days.indexOf('Friday')]}  </Td>
                                                        </Flex> : ""
                                                    }
                                                </Td>
                                        }



















                                        {
                                            update ? <Td>
                                                {editMode == elm.id ? (
                                                    <Button onClick={() => saveChanges(elm.id)}>Save</Button>
                                                ) : (
                                                    <Button onClick={() => eModeOn(elm.id, elm.lectureNumber)}><MdModeEditOutline size={32} /></Button>
                                                )}
                                            </Td> : ''
                                        }
                                        {
                                            update ? <Td>
                                                <Button bgColor="red" onClick={() => deleteEntry(elm.id, elm.lectureNumber)}><MdDelete size={32} /></Button>
                                            </Td> : ''
                                        }


                                    </Tr>
                                </Tbody>

                            );
                        })}


                        {
                            createNew ?
                                <Tbody>
                                    <Tr>
                                        <Td>
                                            {/* <Input  /> */}
                                            <Select onChange={(e) => get(e, 'periods')} >
                                                <option>Select</option>
                                                {periods?.map((elm, i) => (
                                                    <option key={i} value={elm.lectureNumber}>{elm.lectureNumber}</option>
                                                ))}
                                            </Select>
                                        </Td>
                                        <Td><Input type="time" value={currentStartTime} onChange={(e) => setStartTime(e.target.value)} disabled style={{ fontWeight: 'bolder' }} /></Td>
                                        <Td><Input type="time" value={currentEndTime} onChange={(e) => setEndTime(e.target.value)} disabled style={{ fontWeight: 'bolder' }} /></Td>


                                        {/* for monday */}
                                        {
                                            daysMap?.find((day) => day == 'M o n d a y') ? <Td  >
                                                <Flex direction='column'>
                                                    <Select onChange={(e) => get(e, 'monday')} disabled={disabledCheck}>
                                                        <option>Select</option>
                                                        {staff?.map((elm, i) => (
                                                            <option key={i} value={elm.id}>{elm.name}</option>
                                                        ))}
                                                    </Select>
                                                    <Select value={mondaySubject} onChange={(e) => setMondaySubject(e.target.value)} disabled={disabledCheck} required>
                                                        <option>Select</option>
                                                        {
                                                            mondayStore?.map((subject) => (
                                                                <option>{subject}</option>
                                                            ))
                                                        }
                                                    </Select>
                                                </Flex>
                                            </Td> : ""
                                        }


                                        {/* for tuesday */}
                                        {daysMap?.find((day) => day == 'T u e s d a y') ?
                                            <Td>
                                                <Flex direction='column'>
                                                    <Select onChange={(e) => get(e, 'tuesday')} disabled={disabledCheck}>
                                                        <option>Select</option>
                                                        {staff?.map((elm, i) => (
                                                            <option key={i} value={elm.id}>{elm.name}</option>
                                                        ))}
                                                    </Select>
                                                    <Select value={tuesdaySubject} onChange={(e) => setTuesdaySubject(e.target.value)} disabled={disabledCheck}>
                                                        <option>Select</option>
                                                        {
                                                            tuesdayStore?.map((subject) => (
                                                                <option>{subject}</option>
                                                            ))
                                                        }
                                                    </Select>
                                                </Flex>
                                            </Td> : ''
                                        }


                                        {/* for wednesday */}
                                        {
                                            daysMap?.find((day) => day == 'W e d n e s d a y') ?
                                                <Td>
                                                    <Flex direction='column'>
                                                        <Select onChange={(e) => get(e, 'wednesday')} disabled={disabledCheck}>
                                                            <option>Select</option>
                                                            {staff?.map((elm, i) => (
                                                                <option key={i} value={elm.id}>{elm.name}</option>
                                                            ))}
                                                        </Select>
                                                        <Select value={wednesdaySubject} onChange={(e) => setWednesdaySubject(e.target.value)} disabled={disabledCheck}>
                                                            <option>Select</option>
                                                            {
                                                                wednesdayStore?.map((subject) => (
                                                                    <option>{subject}</option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </Flex>
                                                </Td> : ''

                                        }

                                        {/* for thursday */}
                                        {
                                            daysMap?.find((day) => day == 'T h u r s d a y') ? <Td>
                                                <Flex direction='column'>
                                                    <Select onChange={(e) => get(e, 'thursday')} disabled={disabledCheck}>
                                                        <option>Select</option>
                                                        {staff?.map((elm, i) => (
                                                            <option key={i} value={elm.id}>{elm.name}</option>
                                                        ))}
                                                    </Select>
                                                    <Select value={thursdaySubject} onChange={(e) => setThursdaySubject(e.target.value)} disabled={disabledCheck}>
                                                        <option>Select</option>
                                                        {
                                                            thursdayStore?.map((subject) => (
                                                                <option>{subject}</option>
                                                            ))
                                                        }
                                                    </Select>
                                                </Flex>
                                            </Td> : ""
                                        }

                                        {/* for friday */}
                                        {
                                            daysMap?.find((day) => day == 'F r i d a y') ?
                                                <Td>
                                                    <Flex direction='column'>
                                                        <Select onChange={(e) => get(e, 'friday')} disabled={disabledCheck}>
                                                            <option>Select</option>

                                                            {staff?.map((elm, i) => (
                                                                <option key={i} value={elm.id}>{elm.name}</option>
                                                            ))}
                                                        </Select>
                                                        <Select value={fridaySubject} onChange={(e) => setFridaySubject(e.target.value)} disabled={disabledCheck}>
                                                            <option>Select</option>
                                                            {
                                                                fridayStore?.map((subject) => (
                                                                    <option>{subject}</option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </Flex>
                                                </Td> : ""
                                        }

                                        <Td display="flex" flexDir="column" justifyContent="space-between" >
                                            <Button onClick={() => timeTable()} margin="4%">Save</Button>
                                            <Button onClick={() => setcreateNew(false)} >Cancel</Button>
                                        </Td>



                                    </Tr>
                                </Tbody>
                                : ''
                        }


                    </Table>

                    {
                        showMsg ? <Text style={{ alignSelf: 'center', margin: "2% 10%", color: 'red' }}>it seems that time table does not exist for the above class selection.
                        {
                            Role=='student'?"":'Please click "Add New" button to add time table for this class.'
                        }
                        </Text> : ''
                    }

                </TableContainer>
                {
                    Role=='student'?'':Role=='staff'?'': <Stack marginLeft="85%" >
                    {
                        AddNew ? <Button onClick={() => create1()}>Add New row</Button> : ''

                    }

                </Stack>
                }

               

            </Flex>


{
    Role=='student'?"":<Flex margin='0.5% 0 0 5%' width="30vw">
    <TableContainer>
        <Table size='sm' variant="simple">
            <caption style={{ fontSize: '2vh' }}>Class Time Table {classValue == 'Select' ? '' : classValue.toUpperCase()} </caption>
            <Thead>
                <Tr>
                    <Th>S.No</Th>
                    <Th>Subjects</Th>
                    <Th>Total Lectures</Th>

                </Tr>
            </Thead>
            <Tbody>
                {Object.entries(totalSubjects).map(([subject, count], i) => (
                    <Tr key={subject}>
                        <Td>{i + 1}</Td>
                        <Td>{subject}</Td>
                        <Td>{count}</Td>
                    </Tr>
                ))}


            </Tbody>
        </Table>
    </TableContainer>
</Flex>
}
            

        </Stack>
    </div>

}
export default Classtimetable