import { Button, Flex, FormControl, FormLabel, Input, Select, Stack, StatUpArrow, Text } from "@chakra-ui/react"
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
import { IoAddSharp } from "react-icons/io5";

import { ToastContainer, toast } from "react-toastify"
const Classtimetable = () => {
    const [data, setData] = useState([])


    const [detail, setDetail,] = useState([])
    const [createNew, setcreateNew] = useState(false)
    const [create, setcreate] = useState(false)
    const getData = async () => {
        try {
            const data = await fetch('http://192.168.1.81:8086/api/timetable/full-timetable')
            const fdata = await data.json()
            //console.log(fdata)
            setData(fdata)
        } catch (error) {
            console.log(error)
        }
    }
    const getDetails = async () => {
        try {
            const data = await fetch('http://192.168.1.81:8082/api/students/get-AllClasses')
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
    const [AddNew, setAddNew] = useState(false);
    const [disabledCheck, setDisabledCheck] = useState(true)
    const [update, setUpdate] = useState(false);
    const [updateButton, setUpdateButton] = useState('Update');
    const [currentStartTime, setCurrentStartTime] = useState()
    const [currentEndTime, setCurrentEndTime] = useState()
    const [editMode, setEditMode] = useState('');
    const [lecture, setLecture] = useState(null);
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
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

    //console.log(mondayTeacher, mondaySubject)
    //console.log(tuesdayTeacher, tuesdaySubject)
    //console.log(wednesdayTeacher, wednesdaySubject)
    //console.log(thursdayTeacher, thursdaySubject)
    //console.log(fridayTeacher, fridaySubject)

    //create a new time table
    const body = {
        lectureNumber: lecture,
        startTime: currentStartTime,
        endTime: currentEndTime,
        className: classValue,
        session: session,
        section: section,
        monday: mondayTeacher + " " + mondaySubject,
        tuesday: tuesdayTeacher + " " + tuesdaySubject,
        wednesday: wednesdayTeacher + " " + wednesdaySubject,
        thursday: thursdayTeacher + " " + thursdaySubject,
        friday: fridayTeacher + " " + fridaySubject,
    };
    const timeTable = async () => {
        try {


            console.log(body);

            const response = await fetch('http://192.168.1.81:8086/api/timetable/create-timetable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });


            const data = await response.json();
            setcreateNew(false)
            setDis(false)
            const data1 = await fetch('http://192.168.1.81:8086/api/timetable/full-timetable')
            const fdata = await data1.json()
            //console.log(fdata)
            dataFilter(fdata);
            console.log(fdata);

            //empty all states
            setCurrentEndTime('')
            setCurrentStartTime('')
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
            toast.error("something went wrong")
            console.log(error);
        }
    };


    //store all staff
    const [staff, setStaff] = useState([])
    const getStaff = async () => {
        try {
            const data = await fetch("http://192.168.1.81:8083/api/staff/saved-Staff");
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
    const [dis, setDis] = useState(false)


    const [totalSubjects, setTotalSubjects] = useState([]);
    const subjects = new Set(totalSubjects);
    const subjectsArray = Array.from(subjects).filter((elm, i) => elm != "")


    //filteratrion part
    const dataFilter = (data) => {

        let filterData = data;
        //console.log(filterData)
        //filter for session
        if (filters.year !== "") {
            filterData = filterData.filter(
                (ele) => ele.session == filters.year
            );
        }

        //filter for class
        if (filters.class !== "") {
            filterData = filterData.filter(
                (ele) => ele.className === filters.class
            );
        }

        //filter for section
        if (filters.section !== "") {
            filterData = filterData.filter(
                (ele) => ele.section === filters.section
            );
        }



        if (filters.class !== "" && filters.year !== "" && filters.section !== "") {

            if (filterData.length > 0) {
                setcreate(true)
                setDis(false)
                setFilteredData(filterData)

                // Create an array to store the subjects temporarily
                let tempSubjects = [];

                filterData.forEach(elm => {
                    const stringToSplit1 = elm.monday;
                    const stringToSplit2 = elm.tuesday;
                    const stringToSplit3 = elm.wednesday;
                    const stringToSplit4 = elm.thursday;
                    const stringToSplit5 = elm.friday;
                    const arr = [stringToSplit1, stringToSplit2, stringToSplit3, stringToSplit4, stringToSplit5];

                    arr.forEach(e => {
                        const parts = e.split(" ");
                        if (parts.length > 1) {
                            const laterPart = parts.slice(1).join(" ");
                            tempSubjects.push(laterPart);
                        }
                    });
                });

                // After processing all subjects, update totalSubjects
                setTotalSubjects(tempSubjects);
                setUpdateButton('Update')
                setAddNew(true)
            }

            else {
                const customToastStyle = {
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '14px',
                };
                toast.error("This data is not available.if you want to create,click on the add new button", {
                    style: customToastStyle
                })
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



    useEffect(() => {
        dataFilter(data);
        //console.log("trigeered")
    }, [filters, data]);







    useEffect(() => {
        getData()
        getDetails()
        getStaff()
    }, [])




    const get = async (e, day) => {

        const id = e?.target?.value
        console.log(day, id)
        if (day == 'periods' && id !== 'Select') {
            const id = e.target.value;
            console.log(e.target.value)

            try {
                const data = await fetch(`http://192.168.1.81:8086/api/periods/lecture/${id}`);
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
                const ab = await fetch(`http://192.168.1.81:8083/api/staff/get-staff/${id}`)
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
            const data = await fetch('http://192.168.1.81:8086/api/periods/lectures');
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





    // Function to split the day name into parts after the second space
    const splitDayName = (dayName) => {
        const parts = dayName.split(" ");
        if (parts.length > 1) {
            return {
                firstLine: parts.slice(0, 1).join(" "),
                secondLine: parts.slice(1).join(" ")
            };
        } else {
            return {
                firstLine: parts.join(" "),
                secondLine: ""
            };
        }
    };



    const create1 = () => {
        setcreateNew(true)
        setEditMode(null)
    }



    const deleteEntry = async (id) => {
        try {
            const del = await fetch(`http://192.168.1.81:8086/api/timetable/${id}`, {
                method: 'delete'
            })

            await getData()
            dataFilter(data)
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


    return <div style={{ minHeight: '100vh', minWidth: '100vw' }}>
        <Navbar />
        <ToastContainer />
        <Stack display='flex' justifyContent='space-around' direction='row' alignItems='center'>
            <Flex direction="column" width="65vw" maxW="85vw">
                <Flex justifyContent='space-around' alignItems='center'>
                    <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
                        <FormLabel>Session</FormLabel>
                        <Select isRequired value={session} onChange={(e) => handleFilterYear(e.target.value)}>
                            <option>Select</option>
                            {detail?.map((elm, i) => (
                                <option key={i} value={elm.session}>{elm.session}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
                        <FormLabel>Class</FormLabel>
                        <Select isRequired value={classValue} onChange={(e) => handleFilterClass(e.target.value)}>
                            <option>Select</option>
                            {detail?.map((elm, i) => (
                                <option key={i} value={elm.className}>{elm.className}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
                        <FormLabel>Section</FormLabel>
                        <Select isRequired value={section} onChange={(e) => handleFiltersection(e.target.value)}>
                            <option>Select</option>
                            {detail?.map((elm, i) => (
                                <option key={i} value={elm.section}>{elm.section}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl isRequired justifyContent="space-between" alignItems="center" m="4% 1% 0 1%" display='flex'>
                        {
                            dis ? <div>
                                {createNew ?
                                    <div>
                                        <Button onClick={() => setcreateNew(false)}>Cancel</Button>
                                    </div>
                                    : <Button onClick={() => createNewEntry()}>Add new</Button>}
                            </div> : <div>
                                {
                                    create ? <Button onClick={() => showUpdate()}>{updateButton}</Button> : ''

                                }

                            </div>


                        }


                    </FormControl>
                </Flex>
                <TableContainer style={{ overflowY: "scroll", msOverflowStyle: "none" }}>
                    <Table size='sm' variant="simple">

                        {
                            filteredData?.length > 0 || createNew == true ?
                                <>
                                    <caption style={{ backgroundColor: 'lightgreen' }}>Class Time Table {classValue == 'Select' ? '' : classValue}</caption>

                                    <Thead>
                                        <Tr>
                                            <Th>Lecture No.</Th>
                                            <Th>Start Time</Th>
                                            <Th>End Time</Th>
                                            <Th>M o n d a y   </Th>
                                            <Th>T u e s d a y</Th>
                                            <Th>W e d n e s d a y</Th>
                                            <Th>T h u r s d a y</Th>
                                            <Th>F r i d a y</Th>
                                        </Tr>
                                    </Thead>
                                </>
                                : ''
                        }


                        {filteredData?.map((elm, i) => {
                            // Split the day names into parts
                            const mondayParts = splitDayName(elm.monday);
                            const tuesdayParts = splitDayName(elm.tuesday);
                            const wednesdayParts = splitDayName(elm.wednesday);
                            const thursdayParts = splitDayName(elm.thursday);
                            const fridayParts = splitDayName(elm.friday);



                            // Function to save changes
                            const saveChanges = async (id) => {
                                //console.log(id)
                                const newData = await fetch(`http://192.168.1.81:8086/api/timetable/get/${id}`)
                                const fNewData = await newData.json()

                                console.log(fNewData)

                                const mon = splitDayName(fNewData.monday)
                                const tue = splitDayName(fNewData.tuesday)
                                const wed = splitDayName(fNewData.wednesday)
                                const thu = splitDayName(fNewData.thursday)
                                const fri = splitDayName(fNewData.friday)
                                const monday = mon.firstLine + " " + mon.secondLine
                                const tuesday = tue.firstLine + " " + tue.secondLine
                                const wednesday = wed.firstLine + " " + wed.secondLine
                                const thursday = thu.firstLine + " " + thu.secondLine
                                const friday = fri.firstLine + " " + fri.secondLine
                                const body = {
                                    monday: mondayTeacher == '' ? monday : mondayTeacher + " " + mondaySubject,
                                    tuesday: tuesdayTeacher == '' ? tuesday : tuesdayTeacher + " " + tuesdaySubject,
                                    wednesday: wednesdayTeacher == '' ? wednesday : wednesdayTeacher + " " + wednesdaySubject,
                                    thursday: thursdayTeacher == '' ? thursday : thursdayTeacher + " " + thursdaySubject,
                                    friday: fridayTeacher == '' ? friday : fridayTeacher + " " + fridaySubject,
                                }
                                console.log(body)
                                // Implement save functionality here, e.g., update database or state
                                try {
                                    const data = await fetch(`http://192.168.1.81:8086/api/timetable/update/${id}`, {
                                        method: 'put',
                                        headers: {
                                            'Content-Type': 'application/json' // Specify the content type as JSON
                                        },
                                        body: JSON.stringify(body)
                                    })
                                    const fdata = await data.json()

                                    const data1 = await fetch('http://192.168.1.81:8086/api/timetable/full-timetable')
                                    const fdata1 = await data1.json()
                                    console.log(fdata1)
                                    // setData(fdata1)

                                    dataFilter(fdata1)


                                    //empty all states

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

                            return (
                                <Tbody key={i}>
                                    <Tr>
                                        <Td>
                                            <span> {elm.lectureNumber == null || elm.lectureNumber == 0 ? 1 : elm.lectureNumber}  </span>
                                        </Td>
                                        <Td><input type="time" value={elm.startTime} disabled /></Td>
                                        <Td><input type="time" value={elm.endTime} disabled /></Td>
                                        {/* Render Monday */}
                                        <Td>

                                            {
                                                editMode == elm.id ? mondayParts.firstLine : ''
                                            }
                                            <div>{editMode == elm.id ?

                                                <Select onChange={(e) => get(e, 'monday')}  >
                                                    <option value="">Select</option>
                                                    {staff?.map((elm, i) => (
                                                        <option key={i} value={elm.id}>{elm.name}</option>
                                                    ))}
                                                </Select>

                                                : mondayParts.firstLine}
                                            </div>
                                            {
                                                editMode == elm.id ? mondayParts.secondLine : ''
                                            }
                                            <div>

                                                {editMode == elm.id ?

                                                    <Select value={mondaySubject} onChange={(e) => setMondaySubject(e.target.value)}>
                                                        <option>Select</option>
                                                        {
                                                            mondayStore?.map((subject) => (
                                                                <option>{subject}</option>
                                                            ))
                                                        }
                                                    </Select>
                                                    : mondayParts.secondLine}</div>
                                        </Td>
                                        {/* Render Tuesday */}
                                        <Td>
                                            {
                                                editMode == elm.id ? tuesdayParts.firstLine : ''
                                            }
                                            <div>
                                                {editMode == elm.id ?
                                                    <Select onChange={(e) => get(e, 'tuesday')}>
                                                        <option>Select</option>
                                                        {staff?.map((elm, i) => (
                                                            <option key={i} value={elm.id}>{elm.name}</option>
                                                        ))}
                                                    </Select>
                                                    : tuesdayParts.firstLine}</div>
                                            <div>
                                                {
                                                    editMode == elm.id ? tuesdayParts.secondLine : ''
                                                }
                                                {editMode == elm.id ?
                                                    <Select value={tuesdaySubject} onChange={(e) => setTuesdaySubject(e.target.value)}>
                                                        <option>Select</option>
                                                        {
                                                            tuesdayStore?.map((subject) => (
                                                                <option>{subject}</option>
                                                            ))
                                                        }
                                                    </Select>
                                                    : tuesdayParts.secondLine}</div>
                                        </Td>
                                        {/* Render Wednesday */}
                                        <Td>
                                            {
                                                editMode == elm.id ? wednesdayParts.firstLine : ''
                                            }
                                            <div>{editMode == elm.id ?
                                                <Select onChange={(e) => get(e, 'wednesday')}>
                                                    <option>Select</option>
                                                    {staff?.map((elm, i) => (
                                                        <option key={i} value={elm.id}>{elm.name}</option>
                                                    ))}
                                                </Select>
                                                : wednesdayParts.firstLine}</div>
                                            <div>{
                                                editMode == elm.id ? wednesdayParts.secondLine : ''
                                            }
                                                {editMode == elm.id ?

                                                    <Select value={wednesdaySubject} onChange={(e) => setWednesdaySubject(e.target.value)}>
                                                        <option>Select</option>
                                                        {
                                                            wednesdayStore?.map((subject) => (
                                                                <option>{subject}</option>
                                                            ))
                                                        }
                                                    </Select>
                                                    : wednesdayParts.secondLine}</div>
                                        </Td>
                                        {/* Render Thursday */}
                                        <Td >
                                            {
                                                editMode == elm.id ? thursdayParts.firstLine : ''
                                            }
                                            <div>{editMode == elm.id ?
                                                <Select onChange={(e) => get(e, 'thursday')}>
                                                    <option>Select</option>
                                                    {staff?.map((elm, i) => (
                                                        <option key={i} value={elm.id}>{elm.name}</option>
                                                    ))}
                                                </Select>
                                                : thursdayParts.firstLine}</div>
                                            <div>
                                                {
                                                    editMode == elm.id ? thursdayParts.secondLine : ''
                                                }
                                                {editMode == elm.id ?
                                                    <Select value={thursdaySubject} onChange={(e) => setThursdaySubject(e.target.value)}>
                                                        <option>Select</option>
                                                        {
                                                            thursdayStore?.map((subject) => (
                                                                <option>{subject}</option>
                                                            ))
                                                        }
                                                    </Select>
                                                    : thursdayParts.secondLine}</div>
                                        </Td>
                                        {/* Render Friday */}
                                        <Td>
                                            {
                                                editMode == elm.id ? fridayParts.firstLine : ''
                                            }
                                            <div>{editMode == elm.id ?
                                                <Select onChange={(e) => get(e, 'friday')}>
                                                    <option>Select</option>
                                                    {staff?.map((elm, i) => (
                                                        <option key={i} value={elm.id}>{elm.name}</option>
                                                    ))}
                                                </Select>
                                                : fridayParts.firstLine}</div>
                                            <div>
                                                {
                                                    editMode == elm.id ? fridayParts.secondLine : ''
                                                }
                                                {editMode == elm.id ?
                                                    <Select value={fridaySubject} onChange={(e) => setFridaySubject(e.target.value)}>
                                                        <option>Select</option>
                                                        {
                                                            fridayStore?.map((subject) => (
                                                                <option>{subject}</option>
                                                            ))
                                                        }
                                                    </Select>
                                                    : fridayParts.secondLine}</div>
                                        </Td>
                                        {/* Render edit button or save button based on edit mode */}
                                        {
                                            update ? <Td>
                                                {editMode == elm.id ? (
                                                    <Button onClick={() => saveChanges(elm.id)}>Save</Button>
                                                ) : (
                                                    <Button onClick={() => editModeOn(elm.id)}>Edit</Button>
                                                )}
                                            </Td> : ''
                                        }
                                        {
                                            update ? <Td>
                                                <Button bgColor="red" onClick={() => deleteEntry(elm.id)}>Delete</Button>
                                            </Td> : ''
                                        }


                                    </Tr>
                                </Tbody>

                            );
                        })}


                        {
                            createNew ? <Tbody>
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
                                    <Td  >
                                        <Flex direction='column'>
                                            <Select onChange={(e) => get(e, 'monday')} disabled={disabledCheck}>
                                                <option>Select</option>
                                                {staff?.map((elm, i) => (
                                                    <option key={i} value={elm.id}>{elm.name}</option>
                                                ))}
                                            </Select>
                                            <Select value={mondaySubject} onChange={(e) => setMondaySubject(e.target.value)} disabled={disabledCheck}>
                                                <option>Select</option>
                                                {
                                                    mondayStore?.map((subject) => (
                                                        <option>{subject}</option>
                                                    ))
                                                }
                                            </Select>
                                        </Flex>
                                    </Td>
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
                                    </Td>
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
                                    </Td>
                                    <Td>
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
                                    </Td>
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
                                    </Td>
                                    <Td display="flex" flexDir="column" justifyContent="space-between" >
                                        <Button onClick={() => timeTable()} margin="4%">Save</Button>
                                        <Button onClick={() => setcreateNew(false)} >Cancel</Button>
                                    </Td>
                                    


                                </Tr>
                            </Tbody> : ''
                        }

                    </Table>


                </TableContainer>
                <Stack marginLeft="85%" >
                    {
                        AddNew ? <Button onClick={() => create1()}>Add New row</Button> : ''

                    }

                </Stack>

            </Flex>




            <Flex margin='2% 0 0 0' width="30vw">
                <TableContainer>
                    <Table size='sm' variant="simple">
                        <caption style={{ backgroundColor: 'lightgreen' }}>Class Time Table {classValue == 'Select' ? '' : classValue} </caption>
                        <Thead>
                            <Tr>
                                <Th>S.No</Th>
                                <Th>Subjects</Th>
                                <Th>Total Lectures</Th>

                            </Tr>
                        </Thead>
                        <Tbody>
                            {subjectsArray?.map((elm, i) => {
                                let count = 0;
                                totalSubjects?.map((e, i) => {
                                    if (e == elm) {

                                        count++;
                                    }
                                }
                                )
                                return (<Tr key={i}>
                                    <Td>{i + 1}</Td>
                                    <Td>{elm}</Td>
                                    <Td>{count}</Td>



                                </Tr>)
                            }
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>

        </Stack>
    </div>

}
export default Classtimetable