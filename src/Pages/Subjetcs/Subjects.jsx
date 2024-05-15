import { Button, Flex, Heading, Icon, Input, Select, Stack, Text } from "@chakra-ui/react"
import Navbar from "../../components/Navbar"
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
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
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
const Subject = () => {
    //for subjects
    const [staff, setStaff] = useState([])
    const [subjects, setSubjects] = useState([])
    console.log(subjects)
    const [clas, setClas] = useState([])
    const uniqeIds = [...new Set(staff.map(elm => elm.staffId))].sort();

    const getSubjects = async () => {
        try {
            const data = await fetch('http://localhost:8083/api/staff/all-subjects')
            const fdata = await data.json()
            setSubjects(fdata)
        } catch (error) {
            console.log(error)
        }
    }
    //for class
    const getClass = async () => {
        try {
            const data = await fetch('http://localhost:8082/api/students/get-AllClasses')
            const fdata = await data.json()
            console.log(fdata)
            setClas(fdata)
        } catch (error) {
            console.log(error)
        }
    }

    //create subjects
    const subjectRef = useRef()
    const createSubjects = async () => {

        console.log(subjectRef.current.value)
        try {
            const data = await fetch(`http://localhost:8083/api/staff/create-subject?name=${encodeURIComponent(subjectRef.current.value)}`, {
                method: 'POST',
            });
            const fdata = await data.json()
            if (data.ok) {
                toast.success('subject Added Successfully')
                getSubjects()
                // subjectRef.current.value = '';
            } else {
                toast.error('Oops !sommething went wrong')
            }

        } catch (error) {
            console.log(error)
        }
    }


    //create class
    const classRef = useRef()
    const sectionRef = useRef()
    const sessionRef = useRef()
    const createClass = async () => {

        console.log(classRef.current.value)
        try {
            const data = await fetch(`http://localhost:8082/api/students/create-class?classname=${encodeURIComponent(classRef.current.value)}&section=${encodeURIComponent(sectionRef.current.value)}&session=${encodeURIComponent(sessionRef.current.value)}`, {
                method: 'POST',
            });

            console.log('Response Redirected:', data.redirected);
            console.log('Response Text:', data.statusText);
            console.log('Response Body Used:', data.bodyUsed);

            if (!data.ok) {

                toast.error('Oops! Something went wrong');
            } else {
                toast.success('Class added successfully');
                getClass();
            }


        } catch (error) {
            console.error('Error:', error);
        }
    }


    //main table

    const getMainTable = async () => {
        try {
            const data = await fetch('http://localhost:8083/api/staff/saved-Staff')
            const fdata = await data.json()
            console.log(fdata)
            setStaff(fdata)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getSubjects()
        getClass()
        getMainTable()
    }, [])
    const deleteSubject = async (id) => {
        try {
            console.log(id)
            const data = await fetch(`http://localhost:8083/api/staff/delete-Subject/${id}`, {
                method: 'DELETE'
            })

            await getSubjects()
            if (data.ok) {
                console.log("ok")
                toast.success('deleted')
            } else {
                console.log("not ok")
                toast.error('failed')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const deleteClass = async (id) => {
        try {
            console.log(id)
            const data = await fetch(`http://localhost:8082/api/students/delete-class/${id}`, {
                method: 'DELETE'
            })

            await getClass()
            if (data.ok) {
                console.log("ok")
                toast.success('deleted')
            } else {
                console.log("not ok")
                toast.error('failed')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const admsubjectRef = useRef()
    const staffIdRef = useRef()
    const staffNameRef = useRef()
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [filteredData, setFilteredData] = useState([])
    console.log(filteredData)
    const [filters, setFilters] = useState({
        staffData: true,
        subject: "",
        staffName: '',
        staffId: '',
        serialNumber: ''

    });
    console.log(filters)
    console.log(staff
    )
    const dataFilter = () => {
        let filterData = staff;

        //filter for subject
        // if (filters.class !== "") {
        //     filterData = filterData.filter(
        //         (ele) => ele.className === filters.class
        //     );
        // }
        console.log(filterData)
        //filter the data based on subject
        if (filters.subject !== "") {
            console.log("Filtering by subject:", filters.subject);
            filterData = filterData.map(elm => {
                // Check if the property containing the array exists and is not empty
                if (Array.isArray(elm.subjects) && elm.subjects.length > 0) {
                    // Filter the array to remove non-matching elements
                    const filteredArray = elm.subjects.filter(element => {
                        return element === filters.subject;
                    });
                    console.log("Filtered array:", filteredArray);

                    // Create a new object with the filtered array
                    return {
                        ...elm,
                        subjects: filteredArray
                    };
                } else {
                    return null; // Exclude objects with no array or empty array
                }
            }).filter(Boolean);
            filterData = filterData.filter(elm => {
                // Check if the property containing the array exists and is not empty
                if (Array.isArray(elm.subjects) && elm.subjects.length > 0) {
                    // Check if any element in the array matches the filter
                    const matchingElements = elm.subjects.filter(element => {
                        return element === filters.subject;
                    });
                    console.log("Matching elements:", matchingElements);
                    return matchingElements.length > 0;
                } else {
                    // Handle case where the property containing the array is empty or undefined
                    return false; // Exclude objects with no matching elements from the filtered data
                }
            });
        }

        //filter the data based on staff name
        if (filters.staffName !== "") {
            filterData = filterData.filter(
                (ele) => ele.name === filters.staffName
            );
        }
        console.log(filterData)

        //filter the data based on staffId
        if (filters.staffId !== "") {
            filterData = filterData.filter(
                (ele) => ele.staffId === filters.staffId
            );
        }
        console.log(filterData)

        //filter the data based on subject
        // Filter the data based on subject
        if (filters.subject !== "") {
            filterData = filterData.filter(
                (ele) => ele.subjects.some((subject) => subject === filters.subject)
            );
            console.log(filterData)
        }

        console.log(filterData)
        setFilteredData(filterData)
        console.log(filterData)


    };
    const [inputValue, setInputValue] = useState("");


    console.log(inputValue)

    //filter change for Subject  query
    const handleFilterSubject = () => {
        setFilters((prev) => ({
            ...prev,
            staffData: false,
            subject: admsubjectRef.current.value,
        }));
    };
    const handleFilterStaffId = () => {
        setFilters((prev) => ({
            ...prev,
            staffData: false,
            staffId: staffIdRef.current.value,
        }));
    };
    const handleFilterStaffName = () => {
        setFilters((prev) => ({
            ...prev,
            staffData: false,
            staffName: staffNameRef.current.value,
        }));
    };
    useEffect(() => {
        dataFilter();
    }, [filters]);



    const validationSchema1 = Yup.object().shape({
        subject: Yup.string().required("Subject is required"),

    });
    const validationSchema2 = Yup.object().shape({
        class: Yup.string().required("Class is required"),
        section: Yup.string().required("Section is required"),
    });


    //go back to previous page
    const navigate = useNavigate()
    const goback = () => {
        navigate(-1)
    }






    //for staff subjects only
    const [staffsubjects, setStaffsubjects] = useState({});
    console.log(staffsubjects)
    useEffect(() => {
        // Function to fetch subjects based on staff IDs
        const fetchSubjects = async () => {
            const subjectsData = {};

            // Loop through each staff member to fetch subjects
            for (const elm of staff) {
                try {
                    const response = await fetch(`http://localhost:8083/api/staff/${elm.id}/subjects `);
                    const data = await response.json();
                    subjectsData[elm.id] = data; // Store subjects data by staff ID
                } catch (error) {
                    console.error(`Error fetching subjects for staff ID ${elm.id}:`, error);
                }
            }

            // Update state with fetched subjects data
            setStaffsubjects(subjectsData);
        };

        // Call fetchSubjects function when component mounts
        fetchSubjects();
    }, [staff]);
    return (

        <Stack minH="100vh" maxW='100vw'>
            <Navbar />
            <ToastContainer />
            <Flex alignSelf='end' width="7.5%" mt='-5'>
                <IoReturnUpBackOutline size="35" cursor="pointer" onClick={goback} />
            </Flex>
            <Stack display="flex" flexDir="row" justifyContent="space-around" >

                <Stack width="30%">
                    {/* <Stack justifyContent="space-around" alignItems="center" display="flex" flexDir="row">
                        <Input type="text" ref={subjectRef} placeholder="subject" />
                        <Button colorScheme='blue' onClick={() => createSubjects()}>Add</Button>
                    </Stack> */}
                    <Formik
                        initialValues={{ subject: "" }}
                        onSubmit={(values, actions) => {
                            createSubjects(values);
                            actions.resetForm(); // Reset form after submission
                        }}
                        validationSchema={validationSchema1}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Stack justifyContent="space-around" display="flex" flexDir="row">
                                    <Field name="subject">
                                        {({ field }) => (
                                            <Flex flexDir="column" alignItems="center" justifyContent="space-around">
                                                <Input {...field} ref={subjectRef} placeholder="Subject" />
                                                <ErrorMessage name="subject" component="div" style={{ color: 'red' }} />
                                            </Flex>

                                        )}
                                    </Field>

                                    <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>Add</Button>
                                </Stack>
                            </Form>
                        )}
                    </Formik>



                    <TableContainer style={{ maxHeight: '70vh', overflowY: 'scroll' }} css={{
                        "&::-webkit-scrollbar": {
                            width: "0 !important", // For Chrome, Safari, and Opera
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "transparent", // For Chrome, Safari, and Opera
                        },
                        scrollbarWidth: "none", // For Firefox
                        msOverflowStyle: "none", // For IE and Edge
                    }}>
                        <Table variant='striped' colorScheme='teal' size='sm'>

                            <Thead>
                                <Tr>
                                    <Th >Id</Th>
                                    <Th>Subjects</Th>
                                </Tr>
                            </Thead>
                            <Tbody>

                                {subjects?.map((subject, index) => (
                                    <Tr key={index} style={{ height: "30px" }} >
                                        <Td>{subject.id}</Td>
                                        <Td>{subject.name}</Td>
                                        <Td><Button size='sm' onClick={() => deleteSubject(subject.id)}>Delete</Button></Td>
                                    </Tr>
                                ))}

                            </Tbody>

                        </Table>
                    </TableContainer>
                </Stack>
                <Stack width="30%">

                    <Formik
                        initialValues={{ class: "", section: "", session: "" }}
                        onSubmit={(values, actions) => {
                            createClass(values);
                            actions.resetForm(); // Reset form after submission
                        }}
                        validationSchema={validationSchema2}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Stack justifyContent="space-around" alignItems="center" display="flex" flexDir="row">
                                    <Field name="class">
                                        {({ field }) => (
                                            <Stack justifyContent="space-around" alignItems="center" display="flex" flexDir="column">
                                                <Input {...field} ref={classRef} placeholder="Class" />
                                                <ErrorMessage name="class" component="div" style={{ color: 'red' }} />
                                            </Stack>
                                        )}
                                    </Field>
                                    <Field name="section">
                                        {({ field }) => (
                                            <Stack justifyContent="space-around" alignItems="center" display="flex" flexDir="column">
                                                <Input {...field} ref={sectionRef} placeholder="Section" />
                                                <ErrorMessage name="section" component="div" style={{ color: 'red' }} />
                                            </Stack>
                                        )}
                                    </Field>
                                    <Field name="session">
                                        {({ field }) => (
                                            <Stack justifyContent="space-around" alignItems="center" display="flex" flexDir="column">
                                                <Input {...field} ref={sessionRef} placeholder="Session" />
                                                <ErrorMessage name="session" component="div" style={{ color: 'red' }} />
                                            </Stack>
                                        )}
                                    </Field>
                                    <Button colorScheme="blue" type="submit" isLoading={isSubmitting} >Add</Button>
                                </Stack>
                            </Form>
                        )}
                    </Formik>

                    <TableContainer style={{ maxHeight: '80vh', overflowY: 'scroll' }} css={{
                        "&::-webkit-scrollbar": {
                            width: "0 !important", // For Chrome, Safari, and Opera
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "transparent", // For Chrome, Safari, and Opera
                        },
                        scrollbarWidth: "none", // For Firefox
                        msOverflowStyle: "none", // For IE and Edge
                    }}>
                        <Table variant='striped' colorScheme='teal' size='sm'>

                            <Thead>
                                <Tr>
                                    <Th >Id</Th>
                                    <Th>Class</Th>
                                    <Th>Section</Th>
                                    <Th>Session</Th>
                                </Tr>
                            </Thead>
                            <Tbody>

                                {clas?.map((subject, index) => (
                                    <Tr key={index} style={{ height: "30px" }} >
                                        <Td>{subject.id}</Td>
                                        <Td>{subject.className}</Td>
                                        <Td>{subject.section}</Td>
                                        <Td>{subject.session}</Td>
                                        <Td><Button size='sm' onClick={() => deleteClass(subject.id)}>Delete</Button></Td>
                                    </Tr>
                                ))}

                            </Tbody>

                        </Table>
                    </TableContainer>
                </Stack>

                <Stack width="40%" >

                    <TableContainer style={{ maxHeight: '80vh', overflowY: 'scroll' }} css={{
                        "&::-webkit-scrollbar": {
                            width: "0 !important", // For Chrome, Safari, and Opera
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "transparent", // For Chrome, Safari, and Opera
                        },
                        scrollbarWidth: "none", // For Firefox
                        msOverflowStyle: "none", // For IE and Edge
                    }}>
                        <Table variant='striped' colorScheme='teal' size='sm'>

                            <Thead>
                                <Tr>
                                    <Th>S.No.</Th>
                                    <Th><Select placeholder='Staff Id' width='100px' onChange={handleFilterStaffId} ref={staffIdRef}>
                                        <option value='8'>1</option>
                                        <option value='9'>9</option>
                                        {
                                            uniqeIds?.map((elm, i) => (
                                                <option value={elm}>{elm}</option>
                                            ))
                                        }

                                    </Select></Th>
                                    <Th><Select placeholder='Staff Name' onChange={handleFilterStaffName} ref={staffNameRef}>
                                        {
                                            staff?.map((elm, i) => (
                                                <option value={elm.name}>{elm.name}</option>
                                            ))
                                        }

                                    </Select></Th>
                                    <Th><Select placeholder='Subjects' width='100px' onChange={handleFilterSubject} ref={admsubjectRef}>
                                        {
                                            subjects?.map((elm, i) => (
                                                <option value={elm.name}>{elm.name}</option>
                                            ))
                                        }

                                    </Select></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {filters.staffData ?
                                    staff?.map((elm, i) => {

                                        return <Tr key={`${i}`}>
                                            <Td>{i + 1}</Td>
                                            <Td>{elm.id}</Td>
                                            <Td>{elm.name}</Td>
                                            <Td>
                                                {staffsubjects[elm.id] ? (
                                                    <ul>
                                                        {staffsubjects[elm.id].map((subject) => (

                                                            <Button
                                                                key={subject}
                                                                m={1}
                                                                colorScheme="black"
                                                                variant="outline"
                                                                size="sm"

                                                                cursor="default"
                                                            >
                                                                {subject}
                                                            </Button>
                                                        ))}
                                                    </ul>



                                                ) : (
                                                    <span>Loading subjects...</span>
                                                )}
                                            </Td>
                                        </Tr>
                                    }
                                    )

                                    : filteredData?.map((elm, i) => {

                                        return <Tr key={`${i}`}>
                                            <Td>{i + 1}</Td>
                                            <Td>{elm.id}</Td>
                                            <Td>{elm.name}</Td>
                                            <Td>
                                                {staffsubjects[elm.id] ? (
                                                    <ul>
                                                        {staffsubjects[elm.id].map((subject) => (

                                                            <Button
                                                                key={subject}
                                                                m={1}
                                                                colorScheme="black"
                                                                variant="outline"
                                                                size="sm"

                                                                cursor="default"
                                                            >
                                                                {subject}
                                                            </Button>
                                                        ))}
                                                    </ul>



                                                ) : (
                                                    <span>Loading subjects...</span>
                                                )}
                                            </Td>
                                        </Tr>
                                    }
                                    )

                                }


                            </Tbody>

                        </Table>
                    </TableContainer>
                </Stack>
            </Stack>

        </Stack>

    )
}
export default Subject