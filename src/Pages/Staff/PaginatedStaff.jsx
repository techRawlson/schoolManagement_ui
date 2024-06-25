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
    Checkbox,
    MenuButton,
    Menu,
    MenuList,
    MenuItem,
    Icon,
    IconButton,
    FormErrorMessage

} from '@chakra-ui/react'
import { ArrowLeftIcon } from '@chakra-ui/icons'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
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
    FormControl,
    FormLabel
} from '@chakra-ui/react'
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { MdClose } from 'react-icons/md';
import { useData } from '../context/DataContext';
// import Student from '../Pages/Student';
function PaginatedStaff({ getData, searchRef, handleFilterSearch, itemsPerPage, totalItems, onPageChange, admYearRef, handleFilterYear, classData, handleFilter, clasRef, handleSectionFilter, secFilter }) {
    const today = new Date().toISOString().split('T')[0];
    const [currentPage, setCurrentPage] = useState(1);
    const [isVisible, setIsVisible] = useState(true)
    const [isOpen, setOpen] = useState(false)
    const [onOpen, setOnOpen] = useState(false)
    const [isClose, setIsClose] = useState(false)
    const [classValue, setClassValue] = useState('');
    const initialRef = useRef()
    const finalRef = useRef()

    //////staff subject--------------------------
    const options = [
        { value: 'HINDI', label: 'HINDI' },
        { value: 'ENGLISH', label: 'ENGLSIH' },
        { value: 'MATHS', label: 'MATHS' },
        { value: 'SOS', label: 'SOS' },
        { value: 'SCIENCE', label: 'SCIENCE' },
    ];
    const [selectedItems, setSelectedItems] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    //////0----------------------------------------------
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









    const downloadPdf = async () => {

        try {
            // Define the URL of the API endpoint
            const url = 'http://192.168.1.121:9091/download/staff/excel';

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
    const subjectRef = useRef()
    const sexRef = useRef()
    const mobileRef = useRef()
    const addressRef = useRef()
    const classRef = useRef()
    const admRef = useRef()
    const dobRef = useRef()
    const depRef = useRef()
    const emailRef = useRef()
    const staffIdRef = useRef()
    const image = useRef()

    let body;
    const saveButton = async () => {
        // Convert selectedItems array to a comma-separated string
        console.log(typeof (admRef.current.value))
        body = {
            name: nameRef?.current?.value,
            gender: sexRef?.current?.value,
            mobile: parseInt(mobileRef?.current?.value),
            address: addressRef?.current?.value,
            designation: classRef?.current?.value,
            dob: dobRef?.current?.value,
            department: depRef?.current?.value,
            dateOfJoining: admRef?.current?.value,
            email: emailRef?.current?.value,
            staffId: staffIdRef?.current?.value,
            approver: classValue,
            subjects: selectedItems
        }

        try {
            // Create a new FormData object
            const formData = new FormData();

            // Loop through the student data and append each field to the FormData object
            Object.entries(body).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    // Append each item of the array as a separate value for the 'subjects' key
                    selectedItems.forEach(item => {
                        formData.append('subjects', item);
                    });
                } else {
                    formData.append(key, value);
                }
            });

            // Append the image file to the FormData object
            const file = image.current.files[0];
            let formData2 = new FormData();
            formData2.append('file', file);

            // Create staff entry
            const staffResponse = await fetch("http://192.168.1.121:8083/api/staff/create-staff", {
                method: 'POST',
                body: formData
            });
            if (!staffResponse.ok) {
                const errorMessage = await staffResponse.text() || 'Unknown error occurred';
                throw new Error(errorMessage);
            }
            const staffData = await staffResponse.json();

            // Create login entry
            const loginResponse = await fetch("http://192.168.1.121:8081/api/Login/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: staffData.staffId,
                    password: staffData.password,
                    role: 'staff',
                    staffName: staffData.name,
                })
            });
            if (!loginResponse.ok) {
                const errorMessage = await loginResponse.text() || 'Unknown error occurred';
                throw new Error(errorMessage);

            }
            if (image.current.files[0]) {
                const pictureResponse = await fetch(`http://192.168.1.121:8083/api/staff-images/${staffData.staffId}`, {
                    method: 'post',
                    body: formData2,
                });
                if (!pictureResponse.ok) {
                    const er = await pictureResponse.text()
                    console.log(er)
                    const errorMessage = await pictureResponse.text() || 'Picture could not upload';
                    setOpen(false)
                    throw new Error(errorMessage);

                }

            }
            // Upload staff image


            // If everything is successful, show success toast and close modal
            toast.success("Staff created successfully");
            setOpen(false);
            await getData();
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Something went wrong");
            setOpen(false);
        }

    }
    const excelFile = useRef()
    let form = new FormData()
    let file;
    const fileChange = async () => {
        file = excelFile.current.files[0];
        if (file) {
            console.log("File selected:", file);
        } else {
            console.log("No file selected");
        }
    }
    const uploadFileExcel = async () => {
        try {
            form.append('file', file);
            const response = await fetch('http://192.168.1.121:8083/api/staff/upload-excel', {
                method: 'POST',
                body: form,
            });

            if (response.ok) {
                toast.success("file uploaded successfully")
                console.log('File uploaded successfully');
                setIsOpenFile(false)
                // Handle successful upload (e.g. show a success message)
            } else {
                toast.error("file could not upload")
                console.error('File upload failed');
                setIsOpenFile(false)
                // Handle error (e.g. show an error message)
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




    //go back to previous page
    const navigate = useNavigate()



    const goback = () => {
        navigate(-1)
    }


    const handleItemClick = (event, value) => {
        event.stopPropagation(); // Prevent event propagation
        if (selectedItems.includes(value)) {
            setSelectedItems(selectedItems.filter((item) => item !== value));
        } else {
            setSelectedItems([...selectedItems, value]);
        }
    };
    console.log(selectedItems)

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };
    console.log(selectedItems)
    const [subjects, setSubjects] = useState([])
    const getSubjects = async () => {
        try {
            const data = await fetch('http://192.168.1.121:8083/api/staff/all-subjects');
            const fdata = await data.json();
            console.log(fdata)
            setSubjects(fdata)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getSubjects()
    }, [])


    const handleDeleteItem = async (index) => {
        try {

            setSelectedItems((prevItems) => {
                // Create a new array excluding the item to be deleted
                return prevItems.filter((_, i) => i !== index);
            });

        } catch (error) {
            console.log(error)
        }
    }

    const downloadFile = () => {
        const link = document.createElement('a');
        link.href = '../public/staff.xlsx'; // URL to your Excel file
        link.download = 'Sample.xlsx'; // Filename for the downloaded file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const [isMinimized, setIsMinimized] = useState(false);
    return (
        <div>
            <>

            </>
            <div className="pagination-items">
                <div>
                    <Navbar />
                    <ToastContainer />

                    <Stack   >
                        <Flex justifyContent="space-between" mt="1%" flexWrap="wrap">
                            <Flex alignItems="center" >
                                <IconButton background="none" size="sm" as={IoArrowBack} cursor="pointer" onClick={goback} />
                            </Flex>
                            <Flex justifyContent="space-around">
                                <Input placeholder='Search Name' ref={searchRef} onChange={handleFilterSearch} />
                                <Button onClick={() => setOpen(true)}>
                                    Add New
                                </Button>
                            </Flex>


                        </Flex>

                        <TableContainer
                            maxWidth="100%"
                            overflowX="auto"
                            whiteSpace="nowrap"
                            sx={{
                                '::-webkit-scrollbar': {
                                    height: '8px',
                                },
                                '::-webkit-scrollbar-thumb': {
                                    background: 'gray',
                                    borderRadius: '10px',
                                },
                            }}
                        >
                            <Table size="sm" borderWidth="1px" borderColor="gray.200">
                                <Thead>
                                    <Tr>
                                        <Th>Sr.No.</Th>
                                        <Th>STAFF ID</Th>
                                        <Th>Staff Name</Th>
                                        <Th>Designation</Th>
                                        <Th>Department</Th>
                                        <Th>Mobile</Th>
                                        <Th>Email</Th>
                                        <Th>Date of Joining</Th>
                                        <Th>Gender</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {classData?.slice(startIndex, endIndex).map((elm, i) => (
                                        <Tr key={i}>
                                            <Td>{startIndex + i + 1}</Td>
                                            <Td>{elm.staffId}</Td>
                                            <Td>
                                                <ChakraLink as={ReactRouterLink} to={`/staffdetails/${elm.id}`}>
                                                    {elm.name}
                                                </ChakraLink>
                                            </Td>
                                            <Td>{elm.designation}</Td>
                                            <Td>{elm.department}</Td>
                                            <Td>{elm.mobile}</Td>
                                            <Td>{elm.email}</Td>
                                            <Td>{elm.dateOfJoining}</Td>
                                            <Td>{elm.gender}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
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
                    isOpen={isOpen} size={isMinimized ? "sm" : "lg"}

                >
                    <ModalOverlay />
                    <ModalContent minW="60%">
                        <Button colorScheme="blue" margin="0.5rem 0.2rem" onClick={() => setIsMinimized(!isMinimized)} size="sm" width="120px" >
                            {isMinimized ? "Maximize" : "Minimize"}
                        </Button>

                        <ModalCloseButton onClick={() => setOpen(false)} />
                        <ModalBody pb={3} style={{ display: isMinimized ? "none" : "block" }}>
                            <ModalHeader textAlign="center" fontFamily="Roboto">Add New Staff</ModalHeader>
                            <Formik initialValues={{
                                name: '',
                                approver: '',
                                designation: '',
                                department: '',
                                mobile: '',
                                address: '',
                                doj: '',
                                dob: '',
                                gender: '',
                                email: '',


                            }}
                                validate={(values) => {
                                    const errors = {};

                                    if (!values.name) {
                                        errors.name = 'Required';
                                    }

                                    if (!values.approver) {
                                        errors.approver = 'Required';
                                    }

                                    if (!values.designation) {
                                        errors.designation = 'Required';
                                    }

                                    if (!values.department) {
                                        errors.department = 'Required';
                                    }

                                    if (!values.mobile) {
                                        errors.mobile = 'Required';
                                    } else if (!/^\d{10}$/i.test(values.mobile)) {
                                        errors.mobile = 'Invalid mobile number';
                                    }

                                    if (!values.address) {
                                        errors.address = 'Required';
                                    }

                                    if (!values.doj) {
                                        errors.doj = 'Required';
                                    }

                                    if (!values.dob) {
                                        errors.dob = 'Required';
                                    }

                                    if (!values.gender) {
                                        errors.gender = 'Required';
                                    }

                                    if (!values.email) {
                                        errors.email = 'Required';
                                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                        errors.email = 'Invalid email address';
                                    }

                                    return errors;
                                }}

                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        saveButton()
                                        setSubmitting(false);
                                    }, 400);
                                }}
                            >
                                {({ isSubmitting, isValid }) => (
                                    <Form>
                                        <Flex justifyContent="space-around"  >
                                            <Field name="name">
                                                {({ field, form }) => (
                                                    <FormControl isInvalid={form.errors.name && form.touched.name} isRequired m="1">
                                                        <FormLabel htmlFor="name">Full Name</FormLabel>
                                                        <Input {...field} id="name" placeholder="Your name" ref={nameRef} />
                                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>

                                            <Field name="approver">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isRequired
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        m="1"
                                                        maxW="50%"
                                                        isInvalid={form.errors.approver && form.touched.approver}
                                                    >
                                                        <FormLabel>Approver</FormLabel>
                                                        
                                                        <Select
                                                            {...field}
                                                            list="class"
                                                            placeholder="Select Approver"
                                                        >
                                                            {classData.map((option, index) => (
                                                                <option key={index}>{option.name}</option>
                                                            ))}
                                                        </Select>


                                                        <FormErrorMessage>{form.errors.approver}</FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>


                                        </Flex>

                                        <Flex>
                                            <Field name="designation">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isRequired
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        m="1"
                                                        isInvalid={form.errors.designation && form.touched.designation}
                                                    >
                                                        <FormLabel>Designation</FormLabel>
                                                        <Select
                                                            {...field}
                                                            ref={classRef}
                                                            placeholder="Select"
                                                        >

                                                            <option value="softwaredeveloper">Software Developer</option>
                                                            <option value="mechanic">Mechanic</option>
                                                            <option value="electrician">Electrician</option>
                                                        </Select>
                                                        <FormErrorMessage>{form.errors.designation}</FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="department">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isRequired
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        m="1"
                                                        isInvalid={form.errors.department && form.touched.department}
                                                    >
                                                        <FormLabel>Department</FormLabel>
                                                        <Select
                                                            {...field}
                                                            ref={depRef}
                                                            placeholder="Select"
                                                        >

                                                            <option value="A">A</option>
                                                            <option value="B">B</option>
                                                            <option value="C">C</option>
                                                        </Select>
                                                        <FormErrorMessage>{form.errors.department}</FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>

                                        </Flex>

                                        <Flex justifyContent="space-between" >

                                            <Field name="mobile">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isRequired
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        m="1"
                                                        isInvalid={form.errors.mobile && form.touched.mobile}
                                                    >
                                                        <FormLabel>Mobile</FormLabel>
                                                        <Input
                                                            {...field}
                                                            placeholder="Mobile"
                                                            type="number"
                                                            ref={mobileRef}
                                                        />
                                                        <FormErrorMessage>{form.errors.mobile}</FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="address">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isRequired
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        m="1"
                                                        isInvalid={form.errors.address && form.touched.address}
                                                    >
                                                        <FormLabel>Address</FormLabel>
                                                        <Input
                                                            {...field}
                                                            placeholder="Address"
                                                            ref={addressRef}
                                                        />
                                                        <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>

                                        </Flex>

                                        <Flex justifyContent="space-between" >

                                            <Field name="doj">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isRequired
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        m="1"
                                                        isInvalid={form.errors.doj && form.touched.doj}
                                                    >
                                                        <FormLabel>Date Of Joining</FormLabel>
                                                        <Input
                                                            {...field}
                                                            placeholder="Date of joining"
                                                            type="date"
                                                            ref={admRef}
                                                        />
                                                        <FormErrorMessage>{form.errors.doj}</FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="dob">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isRequired
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        m="1"
                                                        isInvalid={form.errors.dob && form.touched.dob}
                                                    >
                                                        <FormLabel>Date of birth</FormLabel>
                                                        <Input
                                                            {...field}
                                                            placeholder="dob"
                                                            type="date"
                                                            ref={dobRef}
                                                            max={today}
                                                        />
                                                        <FormErrorMessage>{form.errors.dob}</FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </Flex>

                                        <Flex justifyContent="space-between" >

                                            <Field name="gender">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isRequired
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        m="1"
                                                        isInvalid={form.errors.gender && form.touched.gender}
                                                    >
                                                        <FormLabel>Gender</FormLabel>
                                                        <Select
                                                            {...field}
                                                            ref={sexRef}
                                                            placeholder="Select"
                                                        >
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Other">Other</option>
                                                        </Select>
                                                        <FormErrorMessage>{form.errors.gender}</FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <FormControl m="1">
                                                <FormLabel >Subject</FormLabel>
                                                <Flex>
                                                    <Menu isOpen={isMenuOpen} onClose={handleMenuClose}>
                                                        <MenuButton as={Button} rightIcon={<></>} onClick={handleMenuToggle}>
                                                            Select Items
                                                        </MenuButton>
                                                        <MenuList onClick={(e) => e.stopPropagation()}>
                                                            {subjects.map((option) => (
                                                                <MenuItem key={option.name} onClick={(e) => e.stopPropagation()}>
                                                                    <Checkbox
                                                                        isChecked={selectedItems.includes(option.name)}
                                                                        onChange={(e) => handleItemClick(e, option.name)}
                                                                        size="sm"
                                                                    >
                                                                        {option.name}
                                                                    </Checkbox>
                                                                </MenuItem>
                                                            ))}
                                                        </MenuList>
                                                    </Menu>
                                                    <Flex>
                                                        {selectedItems.map((item, index) => (
                                                            <Button
                                                                key={index}
                                                                m={1}
                                                                colorScheme="teal"
                                                                variant="outline"
                                                                size="sm"
                                                                rightIcon={<Icon as={MdClose} />}
                                                                onClick={() => handleDeleteItem(index)}
                                                            // Set the disabled prop based on the dis variable
                                                            // Set cursor based on dis
                                                            >
                                                                {item}
                                                            </Button>
                                                        ))}
                                                    </Flex>
                                                </Flex>


                                            </FormControl>


                                        </Flex >

                                        <Flex justifyContent="space-around"  >
                                            <Field name="email">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isRequired
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        m="1"
                                                        isInvalid={form.errors.email && form.touched.email}
                                                    >
                                                        <FormLabel htmlFor="email">Email</FormLabel>
                                                        <Input
                                                            {...field}
                                                            ref={emailRef}
                                                            placeholder="Email"
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                        />
                                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <FormControl justifyContent="space-between" alignItems="center" m="1">
                                                <FormLabel>Upload Image</FormLabel>
                                                <Input placeholder='Upload Image' type='file' ref={image} accept='image/jpeg' />
                                            </FormControl>
                                        </Flex>


                                        <ModalFooter>
                                            <Button colorScheme='blue' mr={3} type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
                                                Save
                                            </Button>
                                            <Button type="button" onClick={() => setOpen(false)} disabled={isSubmitting}>
                                                Cancel
                                            </Button>
                                        </ModalFooter>
                                    </Form>)}


                            </Formik>
                        </ModalBody>


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
                        <ModalFooter display="flex" justifyContent="space-between" alignItems="center" flexDir="column">
                            <Box display="flex" justifyContent="space-between">
                                <Input type="file" maxW="50%" ref={excelFile} onChange={fileChange} accept=".xlsx,.xls" />
                                <Button colorScheme='green' onClick={uploadFileExcel}>Upload</Button>
                                <Button colorScheme='green' >Print</Button>
                            </Box>

                            <a onClick={downloadFile} style={{ whiteSpace: 'noWrap', cursor: 'pointer' }}>Download Sample File </a>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>



        </div>
    );
}

export default PaginatedStaff;
