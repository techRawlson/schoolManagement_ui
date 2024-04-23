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
    MenuItem

} from '@chakra-ui/react'
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
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { IoReturnUpBackOutline } from 'react-icons/io5';
// import Student from '../Pages/Student';
function PaginatedStaff({ getData, searchRef, handleFilterSearch, itemsPerPage, totalItems, onPageChange, admYearRef, handleFilterYear, classData, handleFilter, clasRef, handleSectionFilter, secFilter }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [isVisible, setIsVisible] = useState(true)
    const [isOpen, setOpen] = useState(false)
    const [onOpen, setOnOpen] = useState(false)
    const [isClose, setIsClose] = useState(false)
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


    // Define the validation schema using Yup
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
    });



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

        body = {
            name: nameRef.current.value,
            gender: sexRef.current.value,
            mobile: parseInt(mobileRef.current.value, 12),
            address: addressRef.current.value,
            designation: classRef.current.value,
            dob: dobRef.current.value,
            department: depRef.current.value,
            date_of_joining: admRef.current.value,
            email: emailRef.current.value,
            staff_id: parseInt(staffIdRef.current.value, 12),
            subjects: []
        }
        try {
            console.log(body)

            // Create a new FormData object
            const formData = new FormData();
            // Loop through the student data and append each field to the FormData object
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
            if (file) {
                formData.append('profilePicture', file);
            }


            const data = await fetch("http://192.168.1.10:8083/api/staff/create-staff", {
                method: 'POST',
                body: formData
            })
            const fdata = await data.json()
            console.log(fdata)
            if (data.ok) {
                toast.success("Staff created successfully")
                setOpen(false)
                getData()
            } else {
                toast.error("Staff created successfully")
            }

        } catch (error) {
            console.log(error)
        }
    }
    const excelFile = useRef()
    let formData;
    const fileChange = async () => {
        try {
            const file = event.target.files[0];
            if (!file) {
                console.log("No file selected");
                return;
            }

            // Create a FormData object
            formData = new FormData();
            // Append the file to the FormData object
            formData.append('file', file);
        } catch (error) {
            console.log(error)
        }
    }
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


    console.log(classData)

    //go back to previous page
    const navigate = useNavigate()

    console.log(classData)

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
            const data = await fetch('http://192.168.1.10:8083/api/staff/all-subjects');
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
    return (
        <div>
            <>

            </>
            <div className="pagination-items">
                <div>
                    <Navbar />
                    <ToastContainer />
                    <Stack width="95%" orientation="horizontal" marginX="auto">
                        <Flex justifyContent="space-between" width="100%" mt="1%">
                            <Flex justifyContent="space-around">
                                <Input maxWidth="60%" placeholder='Search Name' ref={searchRef} onChange={handleFilterSearch} />
                                <Button maxW="30%" onClick={() => setOpen(true)}>
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
                                        <Th border="1px solid">STAFF ID</Th>
                                        <Th border="1px solid">SYSTEM ID</Th>
                                        <Th border="1px solid">Staff Name</Th>
                                        <Th border="1px solid">Designation</Th>

                                        <Th border="1px solid">Department</Th>
                                        <Th border="1px solid">Mobile</Th>
                                        <Th border="1px solid">Email</Th>
                                        <Th border="1px solid">Date of Joining</Th>
                                        <Th border="1px solid">Gender</Th>

                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        classData?.slice(startIndex, endIndex).map((elm, i) => (
                                            <Tr key={i} border="1px solid">
                                                <Td border="1px solid">{startIndex + i + 1}</Td>
                                                <Td border="1px solid">{elm.staffId}</Td>
                                                <Td border="1px solid">{elm.id}</Td>
                                                <Td border="1px solid">
                                                    <ChakraLink as={ReactRouterLink} to={`http://localhost:3000/staffdetails/${elm.id}`}>
                                                        {elm.name}
                                                    </ChakraLink>
                                                </Td>

                                                <Td border="1px solid">{elm.designation}</Td>

                                                <Td border="1px solid">{elm.department}</Td>
                                                <Td border="1px solid">{elm.mobile}</Td>
                                                <Td border="1px solid">{elm.email}</Td>
                                                <Td border="1px solid">{elm.dateOfJoining}</Td>
                                                <Td border="1px solid">{elm.gender}</Td>
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
                            <Formik initialValues={body}
                                validationSchema={validationSchema}
                                onSubmit={saveButton}>
                                {({ errors, touched }) => (
                                    <Form>
                                        <Flex justifyContent="space-between" alignItems="center" >
                                            <FormControl isRequired m="1">
                                                <FormLabel >Full Name</FormLabel>
                                                <Input id="name" name="name" placeholder="Your name" ref={nameRef} />
                                            </FormControl>
                                            <FormControl isRequired m="1">
                                                <FormLabel >Subject</FormLabel>
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

                                            </FormControl>
                                            <FormControl isRequired m="1">
                                                <FormLabel >Staff Id</FormLabel>
                                                <Input id="name" name="name" placeholder="name_0001" ref={staffIdRef} type='Number' />
                                            </FormControl>


                                        </Flex>
                                        <Flex>
                                            <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
                                                <FormLabel>Designation</FormLabel>
                                                <Select ref={classRef} isRequired >
                                                    <option >Select</option>
                                                    <option value='softwaredeveloper'>Software Developer</option>
                                                    <option value='mechanic'>Mechanic</option>
                                                    <option value='electrician'>Electrician</option>

                                                </Select>
                                            </FormControl>
                                            <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
                                                <FormLabel>Department</FormLabel>

                                                <Select ref={depRef} isRequired>
                                                    <option >Select</option>
                                                    <option value='A'>A</option>
                                                    <option value='B'>B</option>
                                                    <option value='C'>C</option>

                                                </Select>
                                            </FormControl>

                                        </Flex>

                                        <Flex justifyContent="space-between" alignItems="center">

                                            <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
                                                <FormLabel>Mobile</FormLabel>
                                                <Input
                                                    placeholder='Mobile'
                                                    type='Number'
                                                    ref={mobileRef}
                                                />
                                            </FormControl>
                                            <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
                                                <FormLabel>Address</FormLabel>
                                                <Input placeholder='Address' ref={addressRef} />
                                            </FormControl>

                                        </Flex>

                                        <Flex justifyContent="space-between" alignItems="center">

                                            <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
                                                <FormLabel>Date Of Joining</FormLabel>
                                                <Input placeholder='Admission Year'
                                                    type='date'
                                                    id="number"
                                                    name="number"

                                                    ref={admRef}

                                                />
                                            </FormControl>
                                            <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
                                                <FormLabel>Date of birth</FormLabel>
                                                <Input placeholder='dob' ref={dobRef} isRequired type='date' />
                                            </FormControl>
                                        </Flex>

                                        <Flex justifyContent="space-between" alignItems="center">

                                            <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
                                                <FormLabel>Sex</FormLabel>
                                                <Select ref={sexRef}>
                                                    <option >Select</option>
                                                    <option value='Male'>Male</option>
                                                    <option value='Female'>Female</option>
                                                    <option value='Other'>Other</option>
                                                </Select>
                                            </FormControl>


                                        </Flex >
                                        <Flex justifyContent="space-between" alignItems="center">

                                        </Flex>

                                        <Flex justifyContent="space-around" alignItems="center" >
                                            <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
                                                <FormLabel htmlFor="email">Email</FormLabel>
                                                <Input
                                                    placeholder='Email'
                                                    ref={emailRef}
                                                    id="email"
                                                    name="email"
                                                    type='email'
                                                />
                                            </FormControl>
                                            <FormControl isRequired justifyContent="space-between" alignItems="center" m="1">
                                                <FormLabel>Upload Image</FormLabel>
                                                <Input placeholder='Upload Image' type='file' ref={image} accept='image/jpeg' />
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

export default PaginatedStaff;
