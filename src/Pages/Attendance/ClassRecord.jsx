import { Button, Card, CardBody, CardHeader, Checkbox, Flex, FormControl, FormLabel, Heading, IconButton, Input, Select, SimpleGrid, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { FcReading } from "react-icons/fc";
import { PiChalkboardTeacher } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { IoArrowBack } from "react-icons/io5";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

const ClassRecord = () => {
    const navigate = useNavigate()
    const [session, setSession] = useState();
    const [showMsg, setShowMsg] = useState(false)
    const [classValue, setClassValue] = useState('');
    const [section, setSection] = useState('');
    const [detail, setDetail,] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [createNew, setcreateNew] = useState(false)
    const [fDate, setFDate] = useState('')
    const [tDate, setTDate] = useState('')
    const [totalDates, setTotalDates] = useState([])
    const daysMap = ['Sr.No', 'Student Id', 'Student', 'F Name', 'Roll Number',];





    const [filters, setFilters] = useState({
        data: false,
        class: "",
        section: "",
        year: "",
        slot: '',
        fDate: ''


    });
    //filteratrion part
    // Extract unique sessions
    const uniqueSessions = [...new Set(detail.map(elm => elm.session))].sort();
    // Extract unique class names
    const uniqueClassNames = [...new Set(detail.map(elm => elm.className))].sort();
    // Extract unique sections
    const uniqueSections = [...new Set(detail.map(elm => elm.section))].sort();

    const goback = () => {
        navigate(-1)
    }
    const getData = async () => {
        try {
            const data = await fetch('http://192.168.1.121:8082/api/students/savedData')
            const fdata = await data.json()
            console.log(fdata)
            // setData(fdata)
        } catch (error) {
            console.log(error)
        }
    }
    const getDetails = async () => {
        try {
            const data = await fetch('http://192.168.1.121:8082/api/students/get-AllClasses')
            const fdata = await data.json()
            console.log(fdata)
            setDetail(fdata)
        } catch (error) {
            console.log(error)
        }
    }
    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
        borderCollapse: 'collapse'
    };
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
    const removeDuplicatesAndMerge = (arr) => {
        const resultMap = new Map();

        arr.forEach(item => {
            const identifier = JSON.stringify({
                className: item.className,
                section: item.section,
                session: item.session,
                studentName: item.studentName,
                rollNumber: item.rollNumber,
                fathersName: item.fathersName,
                studentId: item.studentId,
                teacherName: item.teacherName,
            });

            if (!resultMap.has(identifier)) {
                resultMap.set(identifier, {
                    ...item,
                    attendance: [item.attendance],
                    date: [item.date],
                    //   time: [item.time],
                    slot: [item.slot]
                });
            } else {
                const existingItem = resultMap.get(identifier);
                existingItem.attendance.push(item.attendance);
                existingItem.date.push(item.date);
                // existingItem.time.push(item.time);
                existingItem.slot.push(item.slot);
            }

        });

        // Ensure every entry has exactly two values, filling with empty strings if necessary


        return Array.from(resultMap.values());
    };


    const [Attendance, setAttendance] = useState([])
    const [uniqueDates, setUniqueDates] = useState([])
    const [Dates, setDates] = useState([])
    const [uniqueSortedDates, setuniqueSortedDates] = useState([])


    //get dates 
    function getDatesBetween(startDate, endDate) {
        // Convert the input dates to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Array to hold the dates
        const dates = [];

        // Loop to add dates to the array
        while (start <= end) {
            // Push the current date to the array
            dates.push(new Date(start));
            // Increment the date by one day
            start.setDate(start.getDate() + 1);
        }

        return dates;
    }
    const getAttendance = async () => {
        console.log(classValue)
        console.log(section)
        console.log(session)
        console.log(fDate)
        console.log(tDate)

        if (classValue != '' && section != '' && session != '' && fDate != '' & tDate != '') {
            console.log(classValue, section, session)
            try {
                const data = await fetch(`http://192.168.1.121:8088/api/Attendance/attendance/${classValue}/${section}/${session}/range/${fDate}/${tDate}`);
                const fdata = await data.json();
                console.log(fdata)


                const fdata1 = removeDuplicatesAndMerge(fdata)
                console.log(fdata1)
                const arr = []
                fdata1?.map((elm, i) => (
                    elm.date?.map((d) => (
                        arr.push(d)
                    ))
                ))
                console.log(arr)
                setDates(arr)
                const setArr = new Set(arr)
                const unique = Array.from(setArr)
                const sorted = unique.sort()
                setUniqueDates(unique)
                setuniqueSortedDates(sorted)
                const fdataSorted=fdata1.sort((a, b) => a.studentId - b.studentId)
                setAttendance(fdataSorted)

                console.log(fdata1)
                const datesBetween = getDatesBetween(fDate, tDate);
                const formattedDates = datesBetween.map(date => date.toISOString().split('T')[0]);
                console.log(formattedDates)
                setTotalDates(formattedDates)
                if (fdata1.length > 0) {
                    setShowMsg(false)
                } else {
                    setShowMsg(true)
                }





            } catch (error) {
                console.log(error)
            }
        }

    }

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
    const cellStyle = {
        padding: '8px',        // Adjust padding for cell content
        border: '1px solid #ccc',  // Add border around cells
        textAlign: 'left',     // Align cell content to the left
        minWidth: '100px',     // Set minimum width for each cell
        maxWidth: '200px',     // Set maximum width for each cell
        overflow: 'hidden',    // Hide content overflow within cells
        whiteSpace: 'nowrap',  // Prevent line breaks within cells
        textOverflow: 'ellipsis',// Display ellipsis (...) for overflowed text
        textAlign: 'center'
    };
    useEffect(() => {
        getData()
        getDetails()
        getAttendance()

    }, [filters, fDate, tDate])
    console.log(uniqueDates)
    console.log(Dates)
    return <Stack h="100vh">
        <Navbar />
        <Flex >
            <IconButton as={IoArrowBack}
                background="none"
                cursor="pointer"
                onClick={goback}
                style={{ marginLeft: '3%' }}

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

                    <FormControl isRequired justifyContent="space-between" alignItems="center">
                        <FormLabel textAlign="center"> From/To Date</FormLabel>
                        <Flex justifyContent="center" gap="10px">
                            <Input value={fDate} type="date" onChange={(e) => setFDate(e.target.value)} max={new Date().toISOString().split('T')[0]} maxW="40%" />
                            <Input value={tDate} type="date" onChange={(e) => setTDate(e.target.value)} max={new Date().toISOString().split('T')[0]} maxW="40%" />
                        </Flex>
                    </FormControl>


                </Flex>
                <TableContainer style={{ overflowY: "scroll", msOverflowStyle: "none" }}>
                    <Table size='sm' variant="simple" style={tableStyle}>

                        {
                            Attendance?.length > 0 ?
                                <>
                                    <caption style={{ fontSize: '2vh' }}>Class Time Table {classValue == 'Select' ? '' : classValue}</caption>

                                    <Thead>
                                        <Tr>

                                            {
                                                daysMap?.map((day, i) => (
                                                    <Th key={i} style={cellStyle}>{day}</Th>
                                                ))
                                            }
                                            {
                                                totalDates?.map((day, i) => (
                                                    <Th key={i} style={cellStyle}>{day}</Th>
                                                ))
                                            }
                                            <Th style={cellStyle}>Attendnce%</Th>

                                        </Tr>
                                    </Thead>
                                </>
                                : ''
                        }
                        {Attendance?.length > 0 ? (
                            <Tbody>
                                {Attendance.map((item, index) => {
                                    const countPresent = item.attendance
                                    console.log(countPresent)
                                    let count = [];
                                    const attendanceByDate = {};

                                    // Group attendance by date
                                    for (let i = 0; i < item.date.length; i++) {
                                        const date = item.date[i];
                                        const attendance = item.attendance[i] === "true";

                                        if (!attendanceByDate[date]) {
                                            attendanceByDate[date] = false;
                                        }
                                        attendanceByDate[date] = attendanceByDate[date] || attendance;
                                    }

                                    // Calculate present days
                                    const presentDays = Object.values(attendanceByDate).filter(attended => attended).length;
                                    const totalDays = Object.keys(attendanceByDate).length;

                                    // Calculate present percentage
                                    const presentPercentage = (presentDays / totalDays) * 100;
                                    console.log(`${item.studentName} is present ${presentPercentage.toFixed(2)}% of the days.`);

                                    return (
                                        <>{
                                            <Tr key={index} textAlign="center">
                                                <Td style={cellStyle}>{index + 1}</Td>
                                                <Td style={cellStyle}>{item.studentId}</Td>
                                                <Td style={cellStyle}>{item.studentName}</Td>
                                                <Td style={cellStyle}>{item.fathersName}</Td>
                                                <Td style={cellStyle}>{item.rollNumber}</Td>
                                                {totalDates.map((att, i) => {

                                                    if (!item.date.find((d) => d == att)) {

                                                        return (
                                                            <Td style={cellStyle} direction="row" key={i} textAlign="center">
                                                                <Flex alignItems="center" textAlign="end" justifyContent="space-around">
                                                                    <Td>No record</Td>
                                                                    <Td>No record</Td>
                                                                </Flex>
                                                            </Td>
                                                        )
                                                    } else {
                                                        const dateIndex = item.date.indexOf(att);

                                                        const slot1 = item.slot[dateIndex] === '1st';
                                                        const slot4 = item.slot[dateIndex + 1] === '1st';

                                                        const slot2 = item.slot[dateIndex] === '2nd';
                                                        const slot3 = item.slot[dateIndex + 1] === '2nd';

                                                        //code for attendance%
                                                        let slot5 = ''
                                                        if (slot1) {
                                                            slot5 = 0;
                                                        } else if (slot4) {
                                                            slot5 = 1;
                                                        }

                                                        let slot = '';

                                                        if (slot2) {
                                                            slot = 0;
                                                        } else if (slot3) {
                                                            slot = 1;
                                                        }


                                                        //code for 1st slot
                                                        const attendance1 = item.attendance[dateIndex] === 'true' ? 'Present' : 'Absent';
                                                        const attendance4 = item.attendance[dateIndex + 1] === 'true' ? 'Present' : 'Absent';

                                                        //code for 2nd slot
                                                        const attendance2 = item.attendance[dateIndex] === 'true' ? 'Present' : 'Absent';
                                                        const attendance3 = item.attendance[dateIndex + 1] === 'true' ? 'Present' : 'Absent';

                                                        return (
                                                            <Td style={cellStyle} direction="row" key={i} textAlign="center">
                                                                <Flex alignItems="center" textAlign="end" justifyContent="space-around">
                                                                    {slot5 === 0 || slot5 === 1 ? (
                                                                        <Td>{slot5 === 0 ? attendance1 : attendance4}</Td>
                                                                    ) : (
                                                                        <Td>No record</Td>

                                                                    )}
                                                                    {slot === 0 || slot === 1 ? (
                                                                        <Td>{slot === 0 ? attendance2 : attendance3}</Td>
                                                                    ) : (
                                                                        <Td>No record</Td>
                                                                    )}
                                                                </Flex>
                                                            </Td>
                                                        )
                                                    };
                                                })}
                                                <Td alignItems="center" textAlign="center">{presentPercentage.toFixed(2)}%</Td>
                                            </Tr>
                                        }

                                        </>
                                    )


                                })}
                            </Tbody>
                        ) : ''}

                        {
                            showMsg ? <Text style={{ alignSelf: 'center', margin: "2% 10%", color: 'red', fontSize: '24px' }}>it seems that record does not exist for the above class selection..</Text> : ''
                        }
                    </Table>
                </TableContainer>
                

            </Flex>
        </Stack>
    </Stack>
}
export default ClassRecord;