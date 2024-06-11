import { Box, Button, Card, CardBody, CardHeader, Flex, FormControl, FormLabel, Heading, IconButton, Input, Select, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { FcReading } from "react-icons/fc";
import { PiChalkboardTeacher } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
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

import PieChart from "./Piechart";
import { IoArrowBack } from "react-icons/io5";
import { useData } from "../context/DataContext";
const StudentRecord = () => {
  const { Role, updateData } = useData()
  const [showMsg, setshowMsg] = useState(false)
  const [session, setSession] = useState();
  const [classValue, setClassValue] = useState('');
  const [section, setSection] = useState('');
  const [student, setStudent] = useState('');
  const [sId, setSid] = useState('')
  const [rollNumber, setRollNumber] = useState('')
  const [fdate, setFdate] = useState('')
  const [tdate, settdate] = useState('')


  const [data, setData] = useState([])
  const [detail, setDetail,] = useState([])
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
      //console.log(fdata)
      setDetail(fdata)
    } catch (error) {
      console.log(error)
    }
  }

  //filteratrion part
  const [filteredData, setFilteredData] = useState([]);
  // Extract unique sessions
  // const uniqueSessions = [...new Set(detail.map(elm => elm.session))].sort();
  // Extract unique class names
  const uniqueClassNames = [...new Set(detail.map(elm => elm.className))].sort();

  const [uniqueStudent, setuniqueStudent] = useState([])
  const [uniqueSections, setuniqueSections] = useState([])
  const [uniqueStudentRollNumber, setuniqueStudentRollNumber] = useState([])

  //get classnames



  //get section names
  const getSectionNames = () => {
    const sect = data.filter(elm => elm.className == classValue).map((cl) => cl.section)
    console.log(sect)
    const uniqueSection = [...new Set(sect)]
    console.log(uniqueSection)
    setuniqueSections(uniqueSection)
  }
  useEffect(() => {
    getSectionNames()
  }, [classValue])

  //get roll Number
  const getRollNumber = () => {
    console.log(student)
    console.log(classValue)
    console.log(section)

    const section1 = data.filter(elm => elm.name == student && elm.className == classValue && elm.section == section).map((cl) => cl.rollNumber)
    console.log(section1)
    const uniqueSection = [...new Set(section1)]
    console.log(uniqueSection)
    setuniqueStudentRollNumber(uniqueSection)
  }
  useEffect(() => {
    getRollNumber()
  }, [student])



  //get Student names
  const getStudentNames = () => {
    const sect = data.filter(elm => elm.className == classValue && elm.section == section).map((cl) => cl.name)
    console.log(sect)
    const uniqueSection = [...new Set(sect)]
    console.log(uniqueSection)
    setuniqueStudent(uniqueSection)
  }
  useEffect(() => {
    getStudentNames()
  }, [section])






  const [filters, setFilters] = useState({
    data: false,
    class: "",
    section: "",
    year: "",
    student: '',
    sId: '',
    rollNumber: '',
    fdate: '',
    tdate: ''
  });


  // const dataFilter = (data) => {
  //   let filterData = data;
  //   console.log(filterData)






  //   //filter for session
  //   if (filters.year !== "") {
  //     filterData = filterData.filter(
  //       (ele) => ele.session == filters.year
  //     );
  //   }
  //   console.log(filterData)
  //   //filter for class
  //   if (filters.class !== "") {
  //     filterData = filterData.filter(
  //       (ele) => ele.className === filters.class
  //     );
  //   }
  //   console.log(filterData)
  //   //filter for section
  //   if (filters.section !== "") {
  //     filterData = filterData.filter(
  //       (ele) => ele.section === filters.section
  //     );
  //   }
  //   //filter for Student
  //   if (filters.student !== "") {
  //     filterData = filterData.filter(
  //       (ele) => ele.name === filters.student
  //     );
  //   } //filter for section
  //   if (filters.sId !== "") {
  //     filterData = filterData.filter(
  //       (ele) => ele.id === filters.sId
  //     );
  //   } //filter for section
  //   if (filters.rollNumber !== "") {
  //     filterData = filterData.filter(
  //       (ele) => ele.rollNumber === filters.rollNumber
  //     );
  //   }

  //   console.log(filteredData)








  //   console.log(filterData)

  //   if (filters.class !== "" && filters.year !== "" && filters.section !== "" && filters.student !== "" && filters.sId !== '' && filters.rollNumber !== '' && filters.fDate !== '' && filters.tDate !== '') {

  //     console.log("time to fire the api")

  //   }

  // };

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
  //filter change for student name
  const handleFilterStudent = (value) => {
    console.log(value)
    setStudent(value)
    setFilters((prev) => ({
      ...prev,
      // classData: false,
      student: value
    }));
  };
  //filter change for student name
  const handleFilterStudentId = (value) => {
    //console.log(value)
    setSid(value)
    setFilters((prev) => ({
      ...prev,
      // classData: false,
      sId: value
    }));
  };
  //filter change for student name
  const handleFilterRollNumber = (value) => {
    //console.log(value)
    setRollNumber(value)
    setFilters((prev) => ({
      ...prev,
      // classData: false,
      rollNumber: value
    }));
  };
  const handleFilterfDate = (value) => {

    setFdate(value)
    setFilters((prev) => ({
      ...prev,
      // classData: false,
      fdate: value
    }));
  };
  const handleFilterttDate = (value) => {
    console.log(value)
    settdate(value)
    setFilters((prev) => ({
      ...prev,
      // classData: false,
      tdate: value
    }));
  };


  const [] = useState([])
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
  const [totalDates, setTotalDates] = useState([])
  console.log(totalDates)
  const [attendance, setAttendance] = useState([])
  console.log(attendance)

  // Prepare the present and absent lists
  const [presentAbsent, setPresentAbsent] = useState([])
  console.log(presentAbsent)
  const [present, setPresent] = useState([])
  const [absent, setAbsent] = useState([])


  const getAttendance = async () => {
    console.log(filters)

    if (filters.student !== "" && filters.section !== "" && filters.class !== '' && filters.rollNumber !== '' && filters.fdate !== '' && filters.tdate !== '') {
      try {
        const data = await fetch(`http://localhost:8088/api/Attendance/search/${classValue}/${section}/${student}/${rollNumber}/${fdate}/${tdate}`);
        const fdata = await data.json()
        console.log(fdata)

        if (fdata.length ==0) {
          console.log(fdata.length)
          setshowMsg(true)
        }else{
          console.log(fdata.length)
          setshowMsg(false)
        }

        
        const fdata1 = removeDuplicatesAndMerge(fdata)
        setAttendance(fdata1)
        const datesBetween = getDatesBetween(fdate, tdate);
        const formattedDates = datesBetween.map(date => date.toISOString().split('T')[0]);
        console.log(formattedDates)
        setTotalDates(formattedDates)

        const attendanceDict = {};

        // Iterate over the attendance records
        for (let i = 0; i < fdata1[0]?.attendance?.length; i++) {
          const currentDate = fdata1[0].date[i];
          const present = fdata1[0].attendance[i] === "true";

          if (!(currentDate in attendanceDict)) {
            attendanceDict[currentDate] = present;
          } else {
            attendanceDict[currentDate] = attendanceDict[currentDate] || present;
          }
        }


        let present = [];
        let absent = [];
        for (const [date, status] of Object.entries(attendanceDict)) {
          if (status) {
            present.push(date);

          } else {
            absent.push(date);

          }
        }

        setPresent(present)
        setAbsent(absent)
        setPresentAbsent([...present, ...absent, absent, present])
        console.log("Present:", present);
        console.log("Absent:", absent);





      } catch (error) {
        console.log(error)
      }





    } else {
      console.log("missing")
    }


  }







  useEffect(() => {
    console.log(filters)


    getAttendance()
  }, [filters]);


  useEffect(() => {
    getData()
    getDetails()

  }, [])

  const navigate = useNavigate()
  const goback = () => {
    navigate(-1)
  }




  const showStudentTimeTable = async () => {
    try {
      const studentId = localStorage.getItem('username');
      const response = await fetch(`http://localhost:8082/api/students/id/${studentId}`);
      const dataJson = await response.json();
      console.log(dataJson);
      // setSession(dataJson.session);
      setStudent(dataJson.name)
      setClassValue(dataJson.className);
      setSection(dataJson.section);
      setRollNumber(dataJson.rollNumber)
      setFilters((prev) => ({
        ...prev,
        // classData: false,
        student: dataJson.name,
        section: dataJson.section,
        class: dataJson.className,
        rollNumber: dataJson.rollNumber,
      }));
      await getAttendance()

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Role == 'student') {
      const fetchData = async () => {
        await showStudentTimeTable();
        // await getData()
      };
      fetchData();
    }

  }, []);


  return <Stack width="100vw">
    <Navbar />

    <Flex >
      <IconButton as={IoArrowBack}
        background="none"
        cursor="pointer"
        onClick={goback}
        style={{ marginLeft: '3%' }}

      />
    </Flex>
    <Stack height="100vh" width="60vw" margin="0 auto 10% auto">
      <Flex justifyContent='space-around' alignItems='center'>




        <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
          <FormLabel>Class</FormLabel>
          <Box>
            <Input
              list="class"
              value={classValue}
              onChange={(e) => handleFilterClass(e.target.value)}
              placeholder="Select a Class"
              disabled={Role == 'student' ? true : false}

            />
            <datalist id="class">
              {uniqueClassNames.map((option, index) => (
                <option key={index} value={option} />
              ))}
            </datalist>
          </Box>
        </FormControl>  <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
          <FormLabel>Section</FormLabel>
          <Box>
            <Input
              list="section"
              value={section}
              onChange={(e) => handleFiltersection(e.target.value)}
              placeholder="Select a Section"
              disabled={Role == 'student' ? true : false}

            />
            <datalist id="section">
              {uniqueSections.map((option, index) => (
                <option key={index} value={option} />
              ))}
            </datalist>
          </Box>
        </FormControl>
        <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
          <FormLabel>Student</FormLabel>
          <Box>
            <Input
              list="students"
              value={student}
              onChange={(e) => handleFilterStudent(e.target.value)}
              placeholder="Select a Student"
              disabled={Role == 'student' ? true : false}

            />
            <datalist id="students">
              {uniqueStudent.map((option, index) => (
                <option key={index} value={option} />
              ))}
            </datalist>
          </Box>
        </FormControl>
        <FormControl>
          <FormLabel>Roll Number</FormLabel>
          <Box>
            <Input
              list="rollNumber"
              value={rollNumber}
              onChange={(e) => handleFilterRollNumber(e.target.value)}
              placeholder="Select a Roll Number"
              disabled={Role == 'student' ? true : false}

            />
            <datalist id="rollNumber">
              {uniqueStudentRollNumber.map((option, index) => (
                <option key={index} value={option} />
              ))}
            </datalist>
          </Box>

        </FormControl>




        <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
          <FormLabel textAlign="center">Date Range</FormLabel>
          <Flex>
            <Input type="date" m="1" value={fdate} onChange={(e) => handleFilterfDate(e.target.value)} />
            <Input type="date" m="1" value={tdate} onChange={(e) => handleFilterttDate(e.target.value)} />
          </Flex>

        </FormControl>


      </Flex>
      {
        showMsg ==true? <Text color="red" textAlign="center">Data not available</Text> : ''
      }

      {
        attendance?.length > 0 ?
          <Flex justify="space-around" alignItems="center" minW="100%" margin="4% auto" >

            <Box overflowY="auto" maxHeight="400px" width="75%" textAlign="center" alignItems="center" bgColor="teal" color="white" >
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th textAlign="center" color="white" >Date</Th>
                      <Th textAlign="center" color="white">Attendance</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {totalDates?.map((elm) => (
                      <Tr key={elm}>
                        <Td textAlign="center">{elm}</Td>
                        {presentAbsent?.includes(elm) ? (
                          present.includes(elm) ? (
                            <Td textAlign="center">Present</Td>
                          ) : (
                            <Td textAlign="center">Absent</Td>
                          )
                        ) : (
                          <Td textAlign="center">No Record</Td>
                        )}
                      </Tr>
                    ))}
                   
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>


            <Box alignItems="center" height="100%" width="60%" justifyContent='space-around' display="flex">
              <PieChart p={present} a={absent} pb={totalDates} />
            </Box>
          </Flex> : ""
          
      }
      
    </Stack>
    <Button width="160px" colorScheme="green" position="absolute" bottom="2rem" left="5rem">Print</Button>
    
  </Stack>
}
export default StudentRecord;