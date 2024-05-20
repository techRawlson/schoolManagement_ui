import { Button, Card, CardBody, CardHeader, Flex, FormControl, FormLabel, Heading, Input, Select, SimpleGrid, Stack } from "@chakra-ui/react";
import { FcReading } from "react-icons/fc";
import { PiChalkboardTeacher } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";

const StudentRecord = () => {
  const [session, setSession] = useState();
  const [classValue, setClassValue] = useState('');
  const [section, setSection] = useState('');

  const [data, setData] = useState([])
  const [detail, setDetail,] = useState([])
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
  //filteratrion part
  const [filteredData, setFilteredData] = useState([]);
  // Extract unique sessions
  const uniqueSessions = [...new Set(detail.map(elm => elm.session))].sort();
  // Extract unique class names
  const uniqueClassNames = [...new Set(detail.map(elm => elm.className))].sort();
  // Extract unique sections
  const uniqueSections = [...new Set(detail.map(elm => elm.section))].sort();
  console.log(uniqueClassNames)
  console.log(detail)
  const [filters, setFilters] = useState({
    data: false,
    class: "",
    section: "",
    year: "",

});
  const dataFilter = (data) => {
    let filterData = data;
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

    if (filters.class !== "" && filters.year !== "" && filters.section !== "") {

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



  useEffect(() => {
    dataFilter(data);
    //console.log("trigeered")
  }, [filters, data]);




  return <Stack h="100vh">
    <Navbar />
    <Stack height="100vh" width="100vw">
      <Flex justifyContent='space-around' alignItems='center'>
        <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
          <FormLabel>Session</FormLabel>
          <Select  value={session} onChange={(e) => handleFilterYear(e.target.value)}>
            <option>Select</option>
            {uniqueSessions?.map((elm, i) => (
              <option key={i} value={elm}>{elm}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
          <FormLabel>Class</FormLabel>
          <Select  value={classValue} onChange={(e) => handleFilterClass(e.target.value)}>
            <option>Select</option>
            {uniqueClassNames?.map((elm, i) => (
              <option key={i} value={elm}>{elm}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl  justifyContent="space-between" alignItems="center" m="1">
          <FormLabel>Section</FormLabel>
          <Select  value={section} onChange={(e) => handleFiltersection(e.target.value)}>
            <option>Select</option>
            {uniqueSections?.map((elm, i) => (
              <option key={i} value={elm}>{elm}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
          <FormLabel>Student</FormLabel>
          <Select  value={section} onChange={(e) => handleFiltersection(e.target.value)}>
            <option>Select</option>
            {uniqueSections?.map((elm, i) => (
              <option key={i} value={elm}>{elm}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl  justifyContent="space-between" alignItems="center" m="1">
          <FormLabel>Student Id</FormLabel>
          <Select isRequired value={section} onChange={(e) => handleFiltersection(e.target.value)}>
            <option>Select</option>
            {uniqueSections?.map((elm, i) => (
              <option key={i} value={elm}>{elm}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl  justifyContent="space-between" alignItems="center" m="1">
          <FormLabel>Roll Number</FormLabel>
          <Select isRequired value={section} onChange={(e) => handleFiltersection(e.target.value)}>
            <option>Select</option>
            {uniqueSections?.map((elm, i) => (
              <option key={i} value={elm}>{elm}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl  justifyContent="space-between" alignItems="center" m="1">
        <FormLabel>Date Range</FormLabel>
          <Flex>
          <Input type="date"/>
          <Input type="date"/>
          </Flex>
       
        </FormControl>
        
      
      </Flex>

    </Stack>
  </Stack>
}
export default StudentRecord;