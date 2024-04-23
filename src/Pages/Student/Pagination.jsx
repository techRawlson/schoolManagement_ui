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
    FormControl, FormLabel, FormErrorMessage

} from '@chakra-ui/react'

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
import { IoReturnUpBackOutline } from "react-icons/io5";


import * as Yup from 'yup';
import { Link } from 'react-router-dom';
// import Student from '../Pages/Student';
function Pagination({ searchRef, handleFilterSearch, itemsPerPage, totalItems, onPageChange, admYearRef, handleFilterYear, classData, handleFilter, clasRef, handleSectionFilter, secFilter }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [isVisible, setIsVisible] = useState(true)
    const [isOpen, setOpen] = useState(false)
    const [onOpen, setOnOpen] = useState(false)
    const [isClose, setIsClose] = useState(false)
    const initialRef = useRef()
    const finalRef = useRef()

    const [isOpenFile, setIsOpenFile] = useState(false)
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        onPageChange(pageNumber);
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


    // useEffect(() => {
    //     const keys = new Set();
    //     classData?.forEach(obj => {
    //         Object.keys(obj).forEach(key => {
    //             keys.add(key);
    //         });
    //     });
    //     setUniqueKeys(keys);
    // }, [classData]);






    const downloadPdf = async () => {

        try {
            // Define the URL of the API endpoint
            const url = 'http://192.168.1.10:9091/api/download/excel';

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

    const nameRef = useRef()
    const fatherRef = useRef()
    const sexRef = useRef()
    const mobileRef = useRef()
    const addressRef = useRef()
    const classRef = useRef()
    const sectionRef = useRef()
    const admRef = useRef()
    const dobRef = useRef()
    const catRef = useRef()
    const emailRef = useRef()
    const rollRef = useRef()
    const enrollRef = useRef()
    const image = useRef()

    let body;

    const excelFile = useRef()
    let formData;






    const saveButton = async () => {
        // Collect student details
        const body = {
            name: nameRef.current.value,
            fathersName: fatherRef.current.value,
            sex: sexRef.current.value,
            mobile: parseInt(mobileRef.current.value, 12),
            address: addressRef.current.value,
            className: classRef.current.value,
            category: catRef.current.value,
            dob: dobRef.current.value,
            section: sectionRef.current.value,
            admissionYear: parseInt(admRef.current.value, 12),
            email: emailRef.current.value,
            rollNumber: parseInt(rollRef.current.value, 12),
            enrollmentNumber: parseInt(enrollRef.current.value, 12),
        };
        console.log(body)
        // Create a new FormData object
        const formData = new FormData();

        // Loop through the student data and append each field to the FormData object
        Object.entries(body).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // Append the image file to the FormData object
        const file = image.current.files[0];
        if (file) {
            formData.append('profilePicture', file);
        }

        try {
            const data = await fetch("http://192.168.1.10:8082/api/students/create-student", {
                method: 'POST',
                body: formData
            });

            if (data.ok) {
                toast.success("Student created successfully");
                setOpen(false)
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    // Function to handle file change
    const fileChange = () => {
        const file = image.current.files[0];
        if (file) {
            console.log("File selected:", file);
        } else {
            console.log("No file selected");
        }
    };
    const uploadFileExcel = async () => {
        try {

            const response = await fetch('http://192.168.1.10:5173/api/upload-excel', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('File uploaded successfully');
                // Handle successful upload (e.g. show a success message)
            } else {
                console.error('File upload failed');
                // Handle error (e.g. show an error message)
            }

        } catch (error) {
            console.log(error)
        }
    }


    const uploadImage = async (req, res) => {
        try {
            const upload = await fetch('http://localhost:8082/api/students/uploadImage')
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


    return (
        <div>
            <>

            </>
            <div className="pagination-items">
                <div>
                    <Navbar />
                    <ToastContainer />
                    <Stack width="95%" orientation="horizontal" marginX="auto" >
                        <Flex justifyContent="space-between" width="100%" mt="1%" alignItems="center">
                            <Flex width="50%" paddingRight="1" justifyContent="space-between">
                                <Select placeholder='Session' maxW="20%" onChange={handleFilterYear} ref={admYearRef}>
                                    <option value='2022'>2022</option>
                                    <option value='2023'>2023</option>
                                    <option value='2024'>2024</option>
                                </Select>
                                <Select placeholder='Class' maxW="20%" onChange={handleFilter} ref={clasRef}>
                                    <option value='10th'>10th</option>
                                    <option value='11th'>11th</option>
                                    <option value='12th'>12th</option>
                                </Select>
                                <Select placeholder='Section' maxW="20%" onChange={handleSectionFilter} ref={secFilter}>
                                    <option value='A'>A</option>
                                    <option value='B'>B</option>
                                    <option value='C'>c</option>
                                </Select>
                                <Input maxW="20%" placeholder='Search Name' ref={searchRef} onChange={handleFilterSearch} />
                                <Button maxW="22%" onClick={() => setOpen(true)}>
                                    Add New
                                </Button>
                            </Flex>
                            <Flex width="7.5%" >
                                <IoReturnUpBackOutline size="35" cursor="pointer" onClick={goback} />
                            </Flex>
                        </Flex>

                        <TableContainer minH="45vh">
                            <Table size='sm' borderWidth="1px" borderColor="gray.200"  >
                                <Thead>
                                    <Tr maxWidth="10%" border="1px solid">
                                        {/* {[...uniqueKeys]?.map((key, index) => (
                <Th key={index}>{key}</Th>
              ))} */}
                                        <Th border="1px solid">Sr.No.</Th>
                                        
                                        <Th border="1px solid">Name</Th>
                                        <Th border="1px solid">Class Name</Th>
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
                                                <Td border="1px solid">
                                                    <ChakraLink as={ReactRouterLink} to={`http://localhost:3000/studentdetails/${elm.id}`}>
                                                        {elm.name}
                                                    </ChakraLink>
                                                </Td>
                                                <Td border="1px solid">{elm.className}</Td>
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
                                <Button onClick={() => setIsOpenFile(true)}>Upload</Button>
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
                    isOpen={isOpen}

                >
                    <ModalOverlay />
                    <ModalContent minW="60%">
                        <ModalHeader>Add New</ModalHeader>
                        <ModalCloseButton onClick={() => setOpen(false)} />
                        <ModalBody pb={3}>
                            <Formik initialValues={
                                { email: '', password: '' }
                            }
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.name) {
                                        errors.name = 'Required';
                                    }

                                    if (!values.email) {
                                        errors.email = 'Required';
                                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                        errors.email = 'Invalid email address';
                                    }
                                    if (!values.password) {
                                        errors.password = 'Required';
                                    } else if (values.password.length < 6) {
                                        errors.password = 'Password must be at least 6 characters long';
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        alert(JSON.stringify(values, null, 2));
                                        setSubmitting(false);
                                    }, 400);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <Flex justifyContent="space-between" alignItems="center" >
                                            <Field name="name">
                                                {({ field, form }) => (
                                                    <FormControl isInvalid={form.errors.name && form.touched.name}>
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

                                            <FormControl isRequired m="1">
                                                <FormLabel  >Father Name</FormLabel>
                                                <Input placeholder='Father name' ref={fatherRef} />
                                            </FormControl>

                                        </Flex>

                                        <Flex justifyContent="space-between" alignItems="center">

                                            <FormControl isRequired>
                                                <FormLabel>Mobile</FormLabel>
                                                <Input
                                                    placeholder='Mobile'
                                                    type='Number'
                                                    ref={mobileRef}
                                                />
                                            </FormControl>
                                            <FormControl isRequired m="1">
                                                <FormLabel>Address</FormLabel>
                                                <Input placeholder='Address' ref={addressRef} />
                                            </FormControl>
                                            <FormControl isRequired>
                                                <FormLabel>Class</FormLabel>
                                                <Select ref={classRef} isRequired >
                                                    <option >Select</option>
                                                    <option value='10th'>10th</option>
                                                    <option value='11th'>11th</option>
                                                    <option value='12th'>12th</option>

                                                </Select>
                                            </FormControl>
                                        </Flex>

                                        <Flex>
                                            <FormControl isRequired>
                                                <FormLabel>Section</FormLabel>

                                                <Select ref={sectionRef} isRequired>
                                                    <option >Select</option>
                                                    <option value='A'>A</option>
                                                    <option value='B'>B</option>
                                                    <option value='C'>C</option>

                                                </Select>
                                            </FormControl>
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
                                                <Input placeholder='dob' ref={dobRef} isRequired type='date' />
                                            </FormControl>
                                        </Flex>

                                        <Flex>
                                            <FormControl isRequired>
                                                <FormLabel>Category</FormLabel>

                                                <Select ref={catRef}>
                                                    <option >Select</option>
                                                    <option value='GENERAL'>GENERAL</option>
                                                    <option value='OBC'>OBC</option>
                                                    <option value='SC'>SC</option>
                                                    <option value='ST'>ST</option>
                                                    <option value='OTHER'>OTHER</option>
                                                </Select>
                                            </FormControl>
                                            <FormControl isRequired>
                                                <FormLabel>Sex</FormLabel>
                                                <Select ref={sexRef}>
                                                    <option >Select</option>
                                                    <option value='Male'>Male</option>
                                                    <option value='Female'>Female</option>
                                                    <option value='Other'>Other</option>
                                                </Select>
                                            </FormControl>

                                            <FormControl isRequired>
                                                <FormLabel>Roll No.</FormLabel>
                                                <Input placeholder='Roll No.' ref={rollRef} type='number' />
                                            </FormControl>
                                        </Flex>

                                        <Flex justifyContent="space-around">
                                            <FormControl isRequired maxW="45%">
                                                <FormLabel>Enrollment No.</FormLabel>
                                                <Input placeholder='Enrollment No.' ref={enrollRef} type='number' />
                                            </FormControl>
                                            <FormControl isRequired maxW="45%">
                                                <FormLabel>Upload Image</FormLabel>
                                                <Input placeholder='Upload Image' type='file' ref={image} accept='image/jpeg' onChange={fileChange} />
                                            </FormControl>
                                        </Flex>

                                    </Form>)}


                            </Formik>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={() => saveButton()} >
                                Save
                            </Button>
                            <Button onClick={() => setOpen(false)} >Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
            <>


                <Modal isOpen={isOpenFile} >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader display="flex" justifyContent="space-between" alignItems="center">Upload File <Button onClick={() => setIsOpenFile(false)}>X</Button></ModalHeader>
                        <ModalBody>
                        </ModalBody>
                        <ModalFooter display="flex" justifyContent="space-between" alignItems="center">
                            <Input type="file" maxW="50%" ref={excelFile} onChange={fileChange} accept=".xlsx,.xls" />
                            <Button variant='ghost' onClick={uploadFileExcel}>Upload</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>

        </div>
    );
}

export default Pagination;
