import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
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
    Button,
    Stack,
    Flex,
    Input,
    Box,
    CloseButton,
    Text,
    Avatar,
    Toast,
    FormControl, FormLabel, FormErrorMessage,
    IconButton,
    Heading

} from '@chakra-ui/react'
import { useData } from '../context/DataContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Select } from '@chakra-ui/react'
import Navbar from '../../components/Navbar'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { IoArrowBack } from "react-icons/io5";
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';

// import Student from '../Pages/Student';
function Pagination({ getStudentData, searchRef, handleFilterSearch, itemsPerPage, totalItems, onPageChange, admYearRef, handleFilterYear, classData, handleFilter, clasRef, handleSectionFilter, secFilter }) {
    const { Role, updateData } = useData();
    const [currentPage, setCurrentPage] = useState(1);
    const [isVisible, setIsVisible] = useState(true)

    const [onOpen, setOnOpen] = useState(false)
    const [isClose, setIsClose] = useState(false)
    const initialRef = useRef()
    const finalRef = useRef()
    const [clas, setClas] = useState([])
    console.log(classData)
    // Extract unique sessions
    const uniqueSessions = [...new Set(clas.map(elm => elm.session))].sort();
    // Extract unique class names
    const uniqueClassNames = [...new Set(clas.map(elm => elm.className))].sort();
    // Extract unique sections
    const uniqueSections = [...new Set(clas.map(elm => elm.section))].sort();

    const [isOpenFile, setIsOpenFile] = useState(false)
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // onPageChange(pageNumber);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;


    // Render the items for the current page using the renderItems function








    const downloadPdf = async () => {

        try {
            // Define the URL of the API endpoint
            const url = 'http://192.168.1.121:9091/api/download/excel';

            // Make a GET request to the API endpoint
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // MIME type for Excel
                    // Include any additional headers (e.g., authorization) if required
                },
            });

            // Check if the response is OK
            if (response.ok) {
                // Get the response as a blob (binary data)
                const blob = await response.blob();

                // Create a URL for the blob
                const blobURL = URL.createObjectURL(blob);

                // Create a link element
                const link = document.createElement('a');

                // Set the link's href attribute to the blob URL
                link.href = blobURL;

                // Set the download attribute to specify the filename
                link.download = 'downloaded_file.xlsx';

                // Append the link to the document
                document.body.appendChild(link);

                // Programmatically trigger a click on the link to start the download
                link.click();

                // Remove the link from the document after the download starts
                document.body.removeChild(link);
            } else {
                console.error('Failed to download file:', response.statusText);
            }
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }


    // Determine the range of pages to display
    const getPageNumbers = () => {
        if (totalPages <= 3) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const start = Math.max(1, currentPage - 1);
        const end = Math.min(totalPages, currentPage + 1);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const pageNumbers = getPageNumbers();
    const sessionRef = useRef(null)
    const nameRef = useRef()
    const fatherRef = useRef()
    const sexRef = useRef()
    const mobileRef = useRef()
    const addressRef = useRef()
    const classRef = useRef(null)
    const sectionRef = useRef()
    const admRef = useRef()
    const dobRef = useRef()
    const catRef = useRef(null)
    const emailRef = useRef()
    const rollRef = useRef()
    const enrollRef = useRef()
    const [image, setImage] = useState(null)
    const handleChange = (e) => {
        const file = e.target.files[0];
        console.log("-----testing---", file);
        setImage(file);
    };

    let body;

    const excelFile = useRef()
    let formData;



    const today = new Date().toISOString().split('T')[0];
    console.log(sessionRef)

    const saveButton = async () => {
        // Collect student details
        // console.log()
        const body = {

            name: nameRef.current.value,
            fathersName: fatherRef?.current?.value,
            sex: sexRef?.current.value,
            mobile: parseInt(mobileRef?.current?.value),
            address: addressRef.current.value,
            className: classRef.current.value,
            category: catRef.current.value,
            dob: dobRef.current.value,
            section: sectionRef.current.value,
            session: parseInt(sessionRef.current.value),
            admissionYear: parseInt(admRef.current.value),
            email: emailRef.current.value,
            rollNumber: parseInt(rollRef.current.value),
            enrollmentNumber: parseInt(enrollRef.current.value),

        };
        console.log(body)
        // Create a new FormData object
        const formData = new FormData();

        // Loop through the student data and append each field to the FormData object
        Object.entries(body).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // Append the image file to the FormData object
        let formData2 = new FormData()
        const file = image
        console.log(file)
        if (file) {
            console.log(file)
            formData2.append('file', file);
        }

        try {
            const data = await fetch("http://192.168.1.121:8082/api/students/create-student", {
                method: 'POST',
                body: formData
            });

            if (!data.ok) {
                const errorMessage = await data.text() || 'Unknown error occurred';
                throw new Error(errorMessage);

            }


            const fdata = await data.json()
            console.log(fdata)
            console.log(data.status)

            if (data.status >= 200 && data.status < 300 && image != null) {
                const picture = await fetch(`http://192.168.1.121:8082/api/images/${fdata.studentId}`, {
                    method: 'post',
                    body: formData2,
                })

                if (!picture.ok) {
                    console.log(picture)
                    const errorMessage = await picture.text() || 'Unknown error occurred';
                    throw new Error(errorMessage);

                }
                console.log(picture)

            }

            const Login = await fetch("http://192.168.1.121:8081/api/Login/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: fdata.studentId,
                    password: fdata.password,
                    role: 'student',
                })
            })

            if (!Login.ok) {
                const errorMessage = await Login.text() || 'Unknown error occurred';
                throw new Error(errorMessage);

            }

            if (data.status >= 200 && data.status < 300) {
                await getStudentData()
                toast.success("Student created successfully");
                setOpen(false)
            } else {
                console.log(data.status)
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message || "Something went wrong");
            setOpen(false)
        }
    };

    // Function to handle file change
    const form = new FormData()
    const fileChange = () => {
        const file = excelFile.current.files[0];

        if (file) {
            console.log("File selected:", file);
        } else {
            console.log("No file selected");
        }
    };
    const uploadFileExcel = async () => {
        form.append('file', excelFile.current.files[0])

        try {

            const response = await fetch('http://192.168.1.121:8082/api/students/upload-excel', {
                method: 'POST',
                body: form,
            });
            if (response.ok) {
                toast.success("file uploaded successfully")
                console.log('File uploaded successfully');
                setIsOpenFile(false)

            } else {
                toast.error("someething went wrong")
                console.error('File upload failed');
                // Handle error (e.g. show an error message)
                setIsOpenFile(false)
            }

        } catch (error) {
            console.log(error)
            setIsOpenFile(false)
        }
    }


    const uploadImage = async (req, res) => {
        try {
            const upload = await fetch('http://192.168.1.121:8082/api/students/uploadImage')
            const uploadf = await upload.json()
            console.log(uploadf)
        } catch (error) {
            console.log(error)
        }
    }
    const navigate = useNavigate()
    const goback = () => {
        navigate(-1)
    }





    //for class
    const getClass = async () => {
        try {
            const data = await fetch('http://192.168.1.121:8082/api/students/get-AllClasses')
            const fdata = await data.json()
            console.log(fdata)
            setClas(fdata)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {

        getClass()
    }, [])



    const downloadFile = () => {
        const link = document.createElement('a');
        link.href = '../public/students.xlsx'; // URL to your Excel file
        link.download = 'studentsample.xlsx'; // Filename for the downloaded file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const saveButtonRef = useRef(null);





const initial={
    name: '',
    email: '',
    fathersname: '',
    mobile: '',
    address: '',
    class: null,
    section: '',
    gender: '',
    rollNo: '',
    category: '',
    session: '',
}
    const [isOpen, setIsOpen] = useState(false);
    const [initialFormData, setinitialFormData] = useState(initial);
    const [savedFormData, setSavedFormData] = useState(null);
console.log(savedFormData)
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleMinimize = () => {
        console.log(initialFormData)
        setIsOpen(false); 
        console.log(initialFormData)
        setSavedFormData(initialFormData); // Save current form data
        setinitialFormData({
            name: '',
            email: '',
            fathersname: '',
            mobile: '',
            address: '',
            class: null,
            section: '',
            gender: '',
            rollNo: '',
            category: '',
            session: '',
        }); // Clear form data to hide from modal
       // Hide the modal
      
    };

    const handleRestore = () => {
        console.log(savedFormData)
        setinitialFormData(savedFormData); // Restore the form data
        setIsOpen(true); // Show the modal
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData(prevData => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    // };


console.log(savedFormData)
    return (
        <div style={{ width: '100vw' }}>

            <div className="pagination-items">
                <div>
                    <Navbar />
                    <ToastContainer />
                    <Stack width="95%" orientation="horizontal" marginX="auto" >
                        
                        <Flex justifyContent="space-between" width="100%" mt="1%" alignItems="center">
                            <Flex width="7.5%" >
                                <IconButton background="none" size="sm" as={IoArrowBack} cursor="pointer" onClick={goback} />

                            </Flex>
                            <Flex width="50%" paddingRight="1" justifyContent="space-between">

                                <Select placeholder='Session' maxW="20%" onChange={handleFilterYear} ref={admYearRef}>
                                    {
                                        uniqueSessions?.map((session, i) => (
                                            <option value={session}>{session}</option>
                                        ))
                                    }


                                </Select>
                                <Select placeholder='Class' maxW="20%" onChange={handleFilter} ref={clasRef}>
                                    {
                                        uniqueClassNames?.map((className, i) => (
                                            <option value={className}>{className}</option>
                                        ))
                                    }

                                </Select>
                                <Select placeholder='Section' maxW="20%" onChange={handleSectionFilter} ref={secFilter}>
                                    {
                                        uniqueSections?.map((section, i) => (
                                            <option value={section}>{section}</option>
                                        ))
                                    }

                                </Select>
                                <Input maxW="20%" placeholder='Search Name' ref={searchRef} onChange={handleFilterSearch} />
                                {
                                    Role == 'staff' ? '' : <Button maxW="22%" onClick={() => setIsOpen(true)}>
                                        Add New
                                    </Button>
                                }

                            </Flex>

                        </Flex>

                        <TableContainer >
                            <Table size='sm' borderWidth="1px" borderColor="gray.200"  >
                                <Thead>
                                    <Tr maxWidth="10%" border="1px solid">
                                        <Th border="1px solid">Sr.No.</Th>
                                        <Th border="1px solid">Enrollment No.</Th>
                                        <Th border="1px solid">studentId</Th>
                                        <Th border="1px solid">Name</Th>
                                        <Th border="1px solid">Father Name</Th>
                                        <Th border="1px solid">Class Name</Th>
                                        <Th border="1px solid">Session</Th>
                                        <Th border="1px solid">Section</Th>
                                        <Th border="1px solid">Roll Number</Th>
                                        <Th border="1px solid">Gender</Th>

                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        classData?.slice(startIndex, endIndex).map((elm, i) => (
                                            <Tr key={i} border="1px solid">
                                                <Td border="1px solid">{startIndex + i + 1}</Td>

                                                <Td border="1px solid">{elm.enrollmentNumber}</Td>
                                                <Td border="1px solid">{elm.studentId}</Td>
                                                <Td border="1px solid">
                                                    <ChakraLink as={ReactRouterLink} to={`http://192.168.1.121:3000/studentdetails/${elm.id}`}>
                                                        {elm.name}
                                                    </ChakraLink>
                                                </Td>
                                                <Td border="1px solid">{elm.fathersName}</Td>
                                                <Td border="1px solid">{elm.className}</Td>
                                                <Td border="1px solid">{elm.session}</Td>
                                                <Td border="1px solid">{elm.section}</Td>
                                                <Td border="1px solid">{elm.rollNumber}</Td>
                                                <Td border="1px solid">{elm.sex}</Td>


                                            </Tr>
                                        ))

                                    }



                                </Tbody>
                                <Tfoot>
                                </Tfoot>

                            </Table>
                        </TableContainer>
                        <Stack display="flex"
                            flexDirection="row"
                            width="96%"
                            // bgColor="blue"
                            justifyContent="space-between"
                            m="2% auto"
                            alignItems="end"
                        >

                            <Stack
                                float="right"
                                mt="1%"
                                //   bg="red"
                                flexDir="row"

                                justifyContent="space-around"
                            >
                                <Button onClick={downloadPdf}>Download</Button>
                                {
                                    Role == 'staff' ? '' : <Button onClick={() => setIsOpenFile(true)}>Upload</Button>
                                }
                                <Button colorScheme='green' >Print</Button>
                            </Stack>


                        </Stack>
                    </Stack>

                </div>
            </div>

            <div className="pagination-controls" style={{
                width: "12%",
                margin: "1% auto",
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                fontSize: "15px",
                justifyContent: "space-between"
            }}>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    <FaArrowLeft />
                </button>
                {pageNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        disabled={currentPage === pageNumber}
                    >
                        {pageNumber}
                    </button>
                ))}
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    <FaArrowRight />
                </button>
            </div>
            <>


                <Modal
                    isOpen={isOpen} size="lg" closeOnOverlayClick={false}

                >

                    <Draggable handle=".modal-header">
                        <ModalContent
                            minW="60%"

                        >
                            <ModalCloseButton onClick={() => setIsOpen(false)} />
                            <ModalBody pb={3} >
                                <Heading textAlign="center" color="black" fontFamily="Roboto" fontSize="medium">Add New</Heading>
                                <Formik
                                    initialValues={initialFormData}
                                    validate={(values) => {
                                        console.log(values)
                                        setSavedFormData(values)
                                        const errors = {};
                                        if (!values.name) {
                                            errors.name = 'Name is Required';
                                        }
                                        if (!values.email) {
                                            errors.email = 'Email is required';
                                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                            errors.email = 'Invalid email address';
                                        } if (!values.fathersname) {
                                            errors.fathersname = 'Father\'s name is required';
                                        } if (!values.mobile) {
                                            errors.mobile = 'Mobile number is required';
                                        } else if (!/^\d{10}$/.test(values.mobile)) {
                                            errors.mobile = 'Mobile number must be 10 digits';
                                        }
                                        if (!values.class) {
                                            errors.class = 'Class is required';
                                        }
                                        if (!values.section) {
                                            errors.section = 'Section is required'; // Validation for section field
                                        }
                                        if (!values.gender) {
                                            errors.gender = 'Gender is required'; // Validation for section field
                                        }
                                        if (!values.rollNo) {
                                            errors.rollNo = 'Roll Number is required'; // Validation for section field
                                        }
                                        if (!values.category) {
                                            errors.category = 'Category is Required'
                                        }
                                        if (!values.session) {
                                            errors.session = 'Session is Required'
                                        }



                                        // Add validations for other fields
                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(() => {
                                            // alert(JSON.stringify(values, null, 2));
                                            console.log(values)
                                            console.log(form)
                                            saveButton()
                                            setSubmitting(false);
                                        }, 400);
                                    }}
                                >
                                    {({ isSubmitting, isValid }) => (
                                        <Form>
                                            <Flex justifyContent="space-between" alignItems="center" >
                                                <Field name="name">
                                                    {({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.name && form.touched.name} isRequired>
                                                            <FormLabel htmlFor="name">Name</FormLabel>
                                                            <Input {...field} id="name" placeholder="Name" ref={nameRef} />
                                                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field name="email" m="1">
                                                    {({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.email && form.touched.email} isRequired>
                                                            <FormLabel htmlFor="email">Email Address</FormLabel>
                                                            <Input {...field} id="email" placeholder="Email Address" ref={emailRef} />
                                                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field name="fathersname" m="1">
                                                    {({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.fathersname && form.touched.fathersname} isRequired m="1">
                                                            <FormLabel htmlFor="fathersname">Father Name</FormLabel>
                                                            <Input {...field} placeholder='Father name' ref={fatherRef} id="fathersname" name='fathersname' />
                                                            <FormErrorMessage>{form.errors.fathersname}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                            </Flex>

                                            <Flex justifyContent="space-between" alignItems="center">
                                                <Field name="mobile" m="1">
                                                    {({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.mobile && form.touched.mobile} isRequired m="1">
                                                            <FormLabel htmlFor="fathersname">Mobile</FormLabel>
                                                            <Input
                                                                {...field}
                                                                placeholder='Mobile'
                                                                ref={mobileRef}
                                                                id="mobile"
                                                                name='mobile'
                                                                maxLength={10} // Limit maximum length to 10 characters
                                                                type="tel"
                                                                onChange={(e) => {
                                                                    const value = e.target.value.replace(/[^\d]/g, ''); // Replace any non-digit character with an empty string
                                                                    form.setFieldValue('mobile', value); // Update the form value
                                                                }}
                                                                value={field.value} // Ensure controlled input behavior
                                                            />
                                                            <FormErrorMessage>{form.errors.mobile}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>

                                                <Field name="address" m="1">
                                                    {({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.address && form.touched.address} isRequired m="1">
                                                            <FormLabel htmlFor="Address">Address</FormLabel>
                                                            <Input {...field} placeholder='Address' ref={addressRef} id="address" name='address' />
                                                            <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>

                                                <Field name="class" m="1">
                                                    {({ field, form }) => (
                                                        <FormControl isInvalid={form.errors['class'] && form.touched['class']} isRequired m="1">
                                                            <FormLabel htmlFor="class">Class</FormLabel>
                                                            <Select {...field} ref={classRef} isRequired id="class" name='class'>
                                                                <option>Select</option>
                                                                {
                                                                    uniqueClassNames?.map((className, i) => (
                                                                        <option key={i} value={className}>{className}</option>
                                                                    ))
                                                                }
                                                            </Select>
                                                            <FormErrorMessage>{form.errors['class']}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>

                                            </Flex>

                                            <Flex>
                                                <Field name="section">
                                                    {({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.section && form.touched.section} isRequired>
                                                            <FormLabel htmlFor="section" >Section</FormLabel>
                                                            <Select {...field} ref={sectionRef} placeholder="Select">
                                                                {/* Empty option for placeholder */}

                                                                {uniqueSections?.map((section, i) => (

                                                                    <option key={i} value={section}>{section}</option>
                                                                ))}
                                                            </Select>
                                                            <FormErrorMessage>{form.errors.section}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>








                                                <FormControl isRequired m="1">
                                                    <FormLabel>Admission Year</FormLabel>
                                                    <Input placeholder='Admission Year'
                                                        id="number"
                                                        name="number"
                                                        type="Number"
                                                        ref={admRef}


                                                    />
                                                </FormControl>
                                                <FormControl isRequired>
                                                    <FormLabel>Date of birth</FormLabel>
                                                    <Input placeholder='dob' ref={dobRef} isRequired type='date' max={today} />
                                                </FormControl>
                                            </Flex>

                                            <Flex>
                                                <Field name="category">
                                                    {({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.category && form.touched.category} isRequired>
                                                            <FormLabel htmlFor="category">Category</FormLabel>
                                                            <Select {...field} ref={catRef} id="category" placeholder="Select" onChange={(e) => form.setFieldValue('category', e.target.value)}>

                                                                <option value='GENERAL'>GENERAL</option>
                                                                <option value='OBC'>OBC</option>
                                                                <option value='SC'>SC</option>
                                                                <option value='ST'>ST</option>
                                                                <option value='OTHER'>OTHER</option>
                                                            </Select>
                                                            <FormErrorMessage>{form.errors.category}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>

                                                <Field name="gender">
                                                    {({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.gender && form.touched.gender} isRequired>
                                                            <FormLabel htmlFor="gender">Gender</FormLabel>
                                                            <Select {...field} ref={sexRef} id="gender" placeholder="Select" onChange={(e) => form.setFieldValue('gender', e.target.value)}>

                                                                <option value='Male'>Male</option>
                                                                <option value='Female'>Female</option>
                                                                <option value='Other'>Other</option>
                                                            </Select>
                                                            <FormErrorMessage>{form.errors.gender}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>


                                                <Field name="rollNo">
                                                    {({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.rollNo && form.touched.rollNo} isRequired>
                                                            <FormLabel htmlFor="rollNo">Roll No.</FormLabel>
                                                            <Input {...field} ref={rollRef} id="rollNo" placeholder="Roll No." type="number" />
                                                            <FormErrorMessage>{form.errors.rollNo}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>

                                            </Flex>

                                            <Flex justifyContent="space-around">
                                                <FormControl isRequired maxW="45%">
                                                    <FormLabel>Enrollment No.</FormLabel>
                                                    <Input placeholder='Enrollment No.' ref={enrollRef} type='number' />
                                                </FormControl>
                                                <FormControl maxW="45%">
                                                    <FormLabel>Upload Image</FormLabel>
                                                    <Input placeholder='Upload Image' type='file' accept='image/jpeg' onChange={handleChange} />
                                                </FormControl>
                                                <Field name="session">
                                                    {({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.session && form.touched.session} isRequired>
                                                            <FormLabel htmlFor="session">Session</FormLabel>
                                                            <Select {...field} ref={sessionRef} id="session" placeholder="Select" onChange={(e) => form.setFieldValue('session', e.target.value)}>

                                                                {uniqueSessions?.map((sub, i) => (
                                                                    <option key={i} value={sub}>{sub}</option>
                                                                ))}
                                                            </Select>
                                                            <FormErrorMessage>{form.errors.session}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>

                                            </Flex>
                                            <ModalFooter>
                                                {/* <Button variant="outline" onClick={handleMinimize}>
                                                    Minimize
                                                </Button> */}
                                                <Button
                                                    colorScheme='blue'
                                                    mr={3}
                                                    onClick={() => saveButtonRef.current.click()}
                                                    disabled={!isValid || isSubmitting} // Disable if form is not valid or already submitting
                                                >
                                                    Save
                                                </Button>
                                                <Button onClick={() => setOpen(false)}>Cancel</Button>
                                                <Button type="submit" ref={saveButtonRef} style={{ display: 'none' }}>Hidden submit button</Button>
                                            </ModalFooter>
                                        </Form>

                                    )}


                                </Formik>
                            </ModalBody>


                        </ModalContent>
                    </Draggable>

                </Modal>
                {/* <Button onClick={handleRestore}>Restore Modal</Button> */}
            </>


            {/** her modal modification */}



            <>


                <Modal isOpen={isOpenFile} >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader display="flex" justifyContent="space-between" alignItems="center">Upload File <Button onClick={() => setIsOpenFile(false)}>X</Button></ModalHeader>
                        <ModalBody>
                        </ModalBody>
                        <ModalFooter display="flex" justifyContent="space-between" alignItems="center" flexDir="column">
                            <Box display="flex" justifyContent="space-between">
                                <Input type="file" maxW="50%" ref={excelFile} onChange={fileChange} accept=".xlsx,.xls" />
                                <Button colorScheme="green" onClick={uploadFileExcel}>Upload</Button>

                            </Box>
                            <a onClick={downloadFile} style={{ whiteSpace: 'noWrap', cursor: 'pointer' }}>Download Sample File </a>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>

        </div>
    );
}

export default Pagination;
