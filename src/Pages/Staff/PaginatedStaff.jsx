import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaChevronDown, FaChevronUp, FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";
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
    FormErrorMessage,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverCloseButton,
    PopoverArrow,
    PopoverBody

} from '@chakra-ui/react'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
  } from '@chakra-ui/react'
import { ArrowLeftIcon, ChevronDownIcon, ChevronRightIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import { Link as ReactRouterLink, useLocation, useNavigate } from 'react-router-dom'
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
import { useDispatch, useSelector } from 'react-redux';
import { saveFormData, clearFormData } from '../Redux/formDataSlice';
// import Student from '../Pages/Student';
function PaginatedStaff({ filteredData, setFilteredData, setClassData, getData, searchRef, handleFilterSearch, itemsPerPage, totalItems, onPageChange, admYearRef, handleFilterYear, classData, handleFilter, clasRef, handleSectionFilter, secFilter }) {
    const today = new Date().toISOString().split('T')[0];
    const [currentPage, setCurrentPage] = useState(1);
    const [isVisible, setIsVisible] = useState(true)
    const [isOpen, setOpen] = useState(false)
    const [onOpen, setOnOpen] = useState(false)
    const [isClose, setIsClose] = useState(false)
    const [classValue, setClassValue] = useState('');
    const initialRef = useRef()
    const finalRef = useRef()
    const location = useLocation();
    const formData = useSelector((state) => state.formData.formData);
    console.log(formData)

    const designationOptions = [
        "principal",
        "vice_principal",
        "head_teacher",
        "teacher",
        "assistant_teacher",
        "counselor",
        "librarian",
        "administrative_staff",
        "school_nurse",
        "custodian",
        "coach",
        "it_support_staff",
        "department_head",
        "dean_of_students",
        "academic_advisor",
        "registrar",
        "office_manager",
        "receptionist",
        "extracurricular_coordinator",
        "substitute_teacher"
    ];
    //  <option value="high_school_diploma">High School Diploma</option>

    const departmentOptions = [
        "mathematics",
        "science",
        "english",
        "history",
        "physical_education",
        "music",
        "art",
        "foreign_languages",
        "technology",
        "counseling",
        "administration",
        "library",
        "nurse",
        "special_education",
        "extracurricular_activities",
        "student_affairs",
        "admissions",
        "finance",
        "human_resources",
        "it"
    ];



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

    const dispatch = useDispatch();


    const handle = () => {
        const formik = useFormikContext();
        console.log(formik)
        console.log(formData)
        if (formData) {
            setValues({
                name: formData.name || '',
                approver: formData.approver || '',
                designation: formData.designation || '',
                department: formData.department || '',
                mobile: formData.mobile || '',
                address: formData.address || '',
                doj: formData.dateOfJoining || '',
                dob: formData.dob || '',
                gender: formData.gender || '',
                email: formData.email || '',
                empId: formData.empId || '',
                fathersName: formData.fatherName || '',
                role: formData.role || '',
                alternateNumber: formData.alternateNumber || '',
                qualification: formData.qualification || ''
            });
        }

    }





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

    const [name, setName] = useState('');
    const [fathersName, setFathersName] = useState('');
    const [subject, setSubject] = useState('');
    const [sex, setSex] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [adm, setAdm] = useState('');
    const [dob, setDob] = useState('');
    const [dep, setDep] = useState('');
    const [email, setEmail] = useState('');
    const [staffId, setStaffId] = useState('');
    const [image, setImage] = useState(null);
    const [empId, setEmpId] = useState('');
    const [role, setRole] = useState('');
    const [alternateMob, setAlternateMob] = useState('');
    const [qualification, setQualification] = useState('');
    const [approver, setApprover] = useState('');
    const [dateOfJoining, setDateOfJoining] = useState('');

    let body;
    const saveButton = async () => {
        // Convert selectedItems array to a comma-separated string
        // console.log(typeof (admRef.current.value))
        const body = {
            name: formData.name,
            gender: formData.gender,
            mobile: parseInt(formData.mobile), // Assuming mobile is a string that needs to be parsed to an integer
            address: formData.address,
            designation: formData.designation,
            dob: formData.dob,
            department: formData.department,
            dateOfJoining: formData.dateOfJoining,
            email: formData.email,
            approver: formData.approver,
            subjects: formData.selectedItems, // Assuming selectedItems is a property in formData
            empId: formData.empId,
            fatherName: formData.fathersName,
            role: formData.role,
            alternateNumber: formData.alternateMob,

            qualification: formData.qualification,
        };


        console.log(body)

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
            const file = image?.current?.files[0];
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
            if (image?.current?.files[0]) {
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
    const handleMinimize = () => {
        if (isMinimized) {
            console.log('here')
            setIsMinimized(!isMinimized);
            handle()
            return;
        }
        setIsMinimized(!isMinimized);
    };



    //Sorting 
    const [filters, setFilters] = useState({
        classData: true,
        designation: "",
        department: "",
        search: false,
    });
    const [data, setData] = useState(classData)
    const [sortConfig, setSortConfig] = useState({ key: 'systemId', direction: 'ascending' });
    console.log(classData)

    console.log(sortConfig)
    const sortedData = React.useMemo(() => {

        let sortableData = filters.classData?[...classData]:[...filteredData];
        console.log(sortableData)
        if (sortConfig !== null) {
            sortableData.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                // Handle null or empty values to be less prioritized
                if (aValue === null || aValue === '') return 1;
                if (bValue === null || bValue === '') return -1;

                // Convert date strings to Date objects if sorting by dateOfJoining
                if (sortConfig.key === 'dateOfJoining') {
                    aValue = new Date(aValue);
                    bValue = new Date(bValue);
                }
                if (sortConfig.key === 'active') {
                    aValue = a[sortConfig.key] ? 1 : 0;
                    bValue = b[sortConfig.key] ? 1 : 0;
                  }


                // Normal sorting logic for non-null and non-empty values
                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        console.log(sortableData)
        filters.classData?setClassData(sortableData):setFilteredData(sortableData)
        return sortableData;
        console.log(sortableData)
    }, [data, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
        }
        return <FaSort />;
    };


    //filteration


    const [staffDat, setstaffDat] = useState([])
    const getStaffData = async () => {
        try {
            const data = await fetch("http://192.168.1.121:8083/api/staff/saved-Staff");
            const fdata = await data.json();
            console.log(fdata)
            setstaffDat(fdata)
        } catch (error) {
            console.log(error)
        }
    }



    // Extract unique sessions
    const uniqueNames = [...new Set(staffDat.map(elm => elm.name))].sort();
    // Extract unique class names

    const uniqueDesignatin = [...new Set(designationOptions.map(elm => elm))].sort();
    // Extract unique sections
    const uniquedepartmentOptions = [...new Set(departmentOptions.map(elm => elm))].sort();
    useEffect(() => {
        getStaffData()
    }, [])







    const [selectedDesignations, setSelectedDesignations] = useState([]);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
   


    // const [filteredData, setFilteredData] = useState([]);
    const dataFilter = () => {
        let filterData = classData;
        console.log(filterData)
        console.log(filters)
        console.log(filterData)
        //filter for Designation
        if (filters.designation !== "") {

            filterData = selectedDesignations.length > 0 ? filterData.filter(
                (ele) => selectedDesignations.includes(ele.designation)
            )
                : filterData;
        }
        console.log(filterData)
        //filter for Department
        if (filters.department !== "") {
            console.log(filters.year)
            console.log(filterData)
            filterData = filterData.filter(
                (ele) =>  selectedDepartments.length > 0 ?selectedDepartments.includes(ele.department):filterData
            );
        }
        console.log(filterData)
        if (!filters.search) {
            setFilteredData(filterData);
        }
        if (filters.search) {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            setSearchTimeout(
                setTimeout(() => {
                    SearchData();
                }, 500)
            );
        }
    };

    //filter change for StaffName  query
    const handleFilterName = (e) => {
        const value = e.target.value;
        setFilters((prev) => ({
            ...prev,
            classData: false,
            staffName: value,
        }));
    };
    // //filter change for Designation  query
    const handleFilterDesignation = (valueArray) => {

        setFilters((prev) => ({
            ...prev,
            classData: false,
            designation: valueArray,
        }));
    };
    // //filter change for Department  query
    const handleFilterDepartment = (valueArray) => {
        setFilters((prev) => ({
            ...prev,
            classData: false,
            department: valueArray,
        }));
    };
    useEffect(() => {
        dataFilter();
    }, [filters]);




    //multi select designation and department code from here
    const handleSelectdesignation = (designation) => {
        setSelectedDesignations(prevSelected => {
            const newSelected = prevSelected.includes(designation)
                ? prevSelected.filter(item => item !== designation)
                : [...prevSelected, designation];
            handleFilterDesignation(newSelected);
            return newSelected;
        });
    };
    console.log(selectedDesignations)


  

    const handleSelectdepartment = (department) => {
        setSelectedDepartments(prevSelected => {
            const newSelected = prevSelected.includes(department)
                ? prevSelected.filter(item => item !== department)
                : [...prevSelected, department];
            handleFilterDepartment(newSelected);
            return newSelected;
        });
    };






    const toCamelCase = (str) => {
        return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    };

    return (
        <div style={{ width: '100vw' }}>

            <div className="pagination-items">
                <div>
                    <Navbar />
                    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />} >
                        <BreadcrumbItem >
                            <BreadcrumbLink
                                as={ReactRouterLink}
                                to="/dashboard"
                                isCurrent={location.pathname === '/dashboard'}
                                color={location.pathname === '/dashboard' ? 'blue.400' : 'gray.400'}
                                fontWeight={location.pathname === '/dashboard' ? 'bold' : 'normal'}
                            >
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                as={ReactRouterLink}
                                to="/staff"
                                isCurrent={location.pathname === '/staff'}
                                color={location.pathname === '/staff' ? 'blue.400' : 'gray.400'}
                                fontWeight={location.pathname === '/staff' ? 'bold' : 'normal'}
                            >
                                Staff
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                as={ReactRouterLink}
                                // to={`/studentdetails/`}  // Interpolate 'id' into the route
                                isCurrent={location.pathname === `/studentdetails`}
                                color={location.pathname === `/studentdetails/` ? 'blue.400' : 'gray.400'}
                                fontWeight={location.pathname === `/studentdetails/` ? 'bold' : 'normal'}
                            >
                                Staff Details
                            </BreadcrumbLink>
                        </BreadcrumbItem>






                    </Breadcrumb>
                    <ToastContainer />

                    <Stack   >
                        <Flex justifyContent="space-between" mt="1%" flexWrap="wrap"  >

                            <Flex justifyContent="space-around" >
                                {/* <Select id="staffname" placeholder="Staff name" m="0 1rem" onChange={handleFilterName} name='staffname'>
                                    {
                                        uniqueNames?.map((elm) =>
                                            <option>{elm}</option>
                                        )
                                    }
                                </Select> */}


                                <Popover id='designation' name='designation'>
                                    <PopoverTrigger>
                                        <Button
                                            m='0 1rem'

                                            size='2xl'
                                            rightIcon={<ChevronDownIcon
                                            />}>
                                            Designations
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverBody >
                                            <Flex flexWrap="wrap" alignItems='center'>
                                                {designationOptions.map((designation, index) => (
                                                    <Checkbox
                                                        key={designation}
                                                        m='0 1rem'
                                                        flexBasis='50%'
                                                        //   isChecked={selectedDesignations.includes(designation)}
                                                        onChange={() => handleSelectdesignation(designation)}

                                                    >
                                                        {designation}
                                                    </Checkbox>
                                                ))}
                                            </Flex>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                                <Popover id='department' name='department'>
                                    <PopoverTrigger>
                                        <Button
                                            m='0 1rem'

                                            size='2xl'
                                            rightIcon={<ChevronDownIcon
                                            />}>
                                            Department
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverBody >
                                            <Flex flexWrap="wrap" alignItems='center'>
                                                {uniquedepartmentOptions.map((department, index) => (
                                                    <Checkbox
                                                        key={department}
                                                        m='0 1rem'
                                                        flexBasis='50%'
                                                        //   isChecked={selectedDesignations.includes(designation)}
                                                        onChange={() => handleSelectdepartment(department)}

                                                    >
                                                        {department}
                                                    </Checkbox>
                                                ))}
                                            </Flex>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>

                                <Input placeholder='Search Name' ref={searchRef} onChange={handleFilterSearch} margin='0 2vw 0 0' />
                                <Button onClick={() => {
                                    setOpen(true)
                                    setSelectedItems([])
                                }
                                } width='350px'>
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
                                        <Th
                                        >
                                            <Flex align="center">
                                                SYSTEM ID
                                            </Flex>
                                        </Th>
                                        <Th onClick={() => requestSort('name')}>
                                            <Flex align="center">
                                                Staff Name <Icon as={() => getSortIcon('name')} ml={2} />
                                            </Flex>
                                        </Th>
                                        <Th onClick={() => requestSort('designation')}>
                                            <Flex align="center">
                                                Designation <Icon as={() => getSortIcon('designation')} ml={2} />
                                            </Flex>
                                        </Th>
                                        <Th onClick={() => requestSort('department')}>
                                            <Flex align="center">
                                                Department <Icon as={() => getSortIcon('department')} ml={2} />
                                            </Flex>
                                        </Th>

                                        <Th>Email</Th>
                                        <Th>Mobile</Th>
                                        <Th onClick={() => requestSort('dateOfJoining')}>
                                            <Flex align="center">
                                                Date of Joining <Icon as={() => getSortIcon('dateOfJoining')} ml={2} />
                                            </Flex>
                                        </Th>
                                        <Th>Gender</Th>
                                        <Th>EMP. ID</Th>
                                        <Th onClick={() => requestSort('active')}>
                                            <Flex align="center">
                                                Status <Icon as={() => getSortIcon('active')} ml={2} />
                                            </Flex>
                                        </Th>
                                    </Tr>
                                </Thead>

                                {
                                    filters.classData ? <Tbody>
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
                                                <Td>{elm.email}</Td>
                                                <Td>{elm.mobile}</Td>

                                                <Td>{elm.dateOfJoining}</Td>
                                                <Td>{elm.gender}</Td>
                                                <Td>{elm.empId}</Td>
                                                <Td>{elm.active == true ? 'Active' : 'Inactivate'}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody> : <Tbody>
                                        {filteredData?.slice(startIndex, endIndex).map((elm, i) => (
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
                                                <Td>{elm.email}</Td>
                                                <Td>{elm.mobile}</Td>

                                                <Td>{elm.dateOfJoining}</Td>
                                                <Td>{elm.gender}</Td>
                                                <Td>{elm.empId}</Td>
                                                <Td>{elm.active == true ? 'Active' : 'Inactivate'}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                }




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
                {
                    !isMinimized && isOpen && <Modal
                        isOpen={isOpen}

                    >

                        <ModalOverlay />
                        <ModalContent minW="60%"
                            maxWidth={isMinimized ? "300px" : "600px"}
                            height={isMinimized ? "100px" : "auto"}
                            overflow={isMinimized ? "hidden" : "auto"}
                            transition="all 0.3s"
                        >

                            <ModalCloseButton onClick={() => setOpen(false)} />
                            <ModalBody pb={3} >
                                <ModalHeader display="flex" justifyContent="space-between" alignItems="center">
                                    Add New Staff
                                    {/* <IconButton
                                        aria-label="Minimize"
                                        icon={<FaChevronDown />}
                                        onClick={handleMinimize}
                                    /> */}
                                </ModalHeader>
                                <Formik
                                    initialValues={{
                                        name: '',
                                        approver: '',
                                        designation: '',
                                        department: '',
                                        mobile: '',
                                        address: '',
                                        dateOfJoining: '',
                                        dob: '',
                                        gender: '',
                                        email: '',
                                        empId: '',
                                        fathersName: '',
                                        alternateMob: ''
                                    }}
                                    validate={(values) => {
                                        const errors = {};
                                        console.log(values)
                                        dispatch(saveFormData(values));
                                        if (!values.name) {
                                            errors.name = 'Required';
                                        }
                                        if (!values.fathersName) {
                                            errors.fathersName = 'Required';
                                        }
                                        if (!values.approver) {
                                            errors.approver = 'Required';
                                        }
                                        if (!values.mobile) {
                                            errors.mobile = 'Required';
                                        } else if (!/^\d{10}$/i.test(values.mobile)) {
                                            errors.mobile = 'Invalid mobile number';
                                        }
                                        if (!values.dateOfJoining) {
                                            errors.dateOfJoining = 'Required';
                                        }
                                        if (!values.email) {
                                            errors.email = 'Required';
                                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                            errors.email = 'Invalid email address';
                                        }
                                        return errors;
                                    }}

                                    onSubmit={(values, { setSubmitting }) => {
                                        console.log(values)
                                        setTimeout(() => {
                                            saveButton();
                                            setSubmitting(false);
                                        }, 400);
                                    }}
                                >
                                    {({ isSubmitting, isValid, setValues }) => (
                                        <Form>
                                            <Flex justifyContent="space-around"  >
                                                <Field name="name">
                                                    {({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.name && form.touched.name} isRequired m="1">
                                                            <FormLabel htmlFor="name">Full Name</FormLabel>
                                                            <Input
                                                                {...field}
                                                                name="name"
                                                                id="name"
                                                                placeholder="Your name"


                                                            />
                                                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field name="empId">
                                                    {({ field, form }) => (
                                                        <FormControl
                                                            // isRequired
                                                            justifyContent="space-between"
                                                            alignItems="center"
                                                            m="1"
                                                        // isInvalid={form.errors.empId && form.touched.empId}
                                                        >
                                                            <FormLabel htmlFor="empId">Employee Id</FormLabel>
                                                            <Input
                                                                {...field}

                                                                placeholder="Employee Id"
                                                                type="text"
                                                                id="empId"
                                                                name="empId"
                                                            />

                                                            <FormErrorMessage>{form.errors.empId}</FormErrorMessage>
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
                                                                id="approver"
                                                                name="approver"
                                                            >
                                                                <option value="admin">admin</option>
                                                                {classData?.map((option, index) => (
                                                                    <option key={index} value={option.name}>{option.name}</option>
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
                                                            // isRequired
                                                            justifyContent="space-between"
                                                            alignItems="center"
                                                            m="1"
                                                            isInvalid={form.errors.designation && form.touched.designation}
                                                        >
                                                            <FormLabel>Designation</FormLabel>
                                                            <Select
                                                                {...field}
                                                                placeholder="Select"
                                                                id="designation"
                                                                name="designation"
                                                            >
                                                                {designationOptions.map((option, index) => (
                                                                    <option key={index} value={option}>
                                                                        {option.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                                                    </option>
                                                                ))}
                                                            </Select>

                                                            <FormErrorMessage>{form.errors.designation}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field name="qualification">
                                                    {({ field, form }) => (
                                                        <FormControl
                                                            // isRequired
                                                            justifyContent="space-between"
                                                            alignItems="center"
                                                            m="1"
                                                            isInvalid={form.errors.qualification && form.touched.qualification}
                                                        >
                                                            <FormLabel>Qualification</FormLabel>
                                                            <Select
                                                                {...field}

                                                                placeholder="Select"
                                                                id="qualification"
                                                                name="qualification"
                                                                mulitiple
                                                            >
                                                                <option value="high_school_diploma">High School Diploma</option>
                                                                <option value="associate_degree">Associate Degree</option>
                                                                <option value="bachelors_degree">Bachelor's Degree</option>
                                                                <option value="masters_degree">Master's Degree</option>
                                                                <option value="doctorate_degree">Doctorate Degree</option>
                                                                <option value="teaching_certificate">Teaching Certificate</option>
                                                                <option value="special_education_certification">Special Education Certification</option>
                                                                <option value="esl_certification">ESL Certification</option>
                                                                <option value="administration_certificate">Administration Certificate</option>
                                                                <option value="counseling_certificate">Counseling Certificate</option>
                                                                <option value="library_science_degree">Library Science Degree</option>
                                                                <option value="educational_technology_certificate">Educational Technology Certificate</option>
                                                                <option value="physical_education_certificate">Physical Education Certificate</option>
                                                                <option value="music_education_degree">Music Education Degree</option>
                                                                <option value="art_education_degree">Art Education Degree</option>
                                                                <option value="foreign_language_education_degree">Foreign Language Education Degree</option>
                                                            </Select>

                                                            <FormErrorMessage>{form.errors.qualification}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field name="department">
                                                    {({ field, form }) => (
                                                        <FormControl
                                                            // isRequired
                                                            justifyContent="space-between"
                                                            alignItems="center"
                                                            m="1"
                                                            isInvalid={form.errors.department && form.touched.department}
                                                        >
                                                            <FormLabel>Department</FormLabel>
                                                            <Select
                                                                {...field}

                                                                placeholder="Select"
                                                                id="department"
                                                                name="department"
                                                            >
                                                                <option value="mathematics">Mathematics Department</option>
                                                                <option value="science">Science Department</option>
                                                                <option value="english">English Department</option>
                                                                <option value="history">History Department</option>
                                                                <option value="physical_education">Physical Education Department</option>
                                                                <option value="art">Art Department</option>
                                                                <option value="music">Music Department</option>
                                                                <option value="foreign_languages">Foreign Languages Department</option>
                                                                <option value="special_education">Special Education Department</option>
                                                                <option value="technology">Technology Department</option>
                                                                <option value="social_studies">Social Studies Department</option>
                                                                <option value="business">Business Department</option>
                                                                <option value="health">Health Department</option>
                                                                <option value="counseling">Counseling Department</option>
                                                                <option value="library_media">Library Media Department</option>
                                                                <option value="career_technical_education">Career & Technical Education Department</option>
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
                                                                id="mobile"
                                                                name="mobile"
                                                            />

                                                            <FormErrorMessage>{form.errors.mobile}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field name="alternateMob">
                                                    {({ field, form }) => (
                                                        <FormControl
                                                            // isRequired
                                                            justifyContent="space-between"
                                                            alignItems="center"
                                                            m="1"
                                                        //isInvalid={form.errors.mobile && form.touched.mobile}
                                                        >
                                                            <FormLabel>Alternate Mobile</FormLabel>
                                                            <Input
                                                                {...field}

                                                                placeholder="Mobile"
                                                                type="number"
                                                                id="alternateMob"
                                                                name="alternateMob"
                                                            />

                                                            <FormErrorMessage>{form.errors.alternateMob}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field name="address">
                                                    {({ field, form }) => (
                                                        <FormControl
                                                            // isRequired
                                                            justifyContent="space-between"
                                                            alignItems="center"
                                                            m="1"
                                                        //isInvalid={form.errors.address && form.touched.address}
                                                        >
                                                            <FormLabel>Address</FormLabel>
                                                            <Input
                                                                {...field}

                                                                placeholder="Address"
                                                                id="address"
                                                                name="address"
                                                            />

                                                            <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>

                                            </Flex>

                                            <Flex justifyContent="space-between" >
                                                <Field name="fathersName">
                                                    {({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.fathersName && form.touched.fathersName} isRequired m="1">
                                                            <FormLabel htmlFor="fathersName">Father Name</FormLabel>
                                                            <Input
                                                                {...field}
                                                                id="fathersName"
                                                                placeholder="Your father's name"
                                                                name="fathersName"
                                                            />

                                                            <FormErrorMessage>{form.errors.fathersName}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field name="dateOfJoining">
                                                    {({ field, form }) => (
                                                        <FormControl
                                                            isRequired
                                                            justifyContent="space-between"
                                                            alignItems="center"
                                                            m="1"
                                                            isInvalid={form.errors.dateOfJoining && form.touched.dateOfJoining}
                                                        >
                                                            <FormLabel>Date Of Joining</FormLabel>
                                                            <Input
                                                                {...field}
                                                                placeholder="Date of joining"
                                                                type="date"
                                                                id="dateOfJoining"
                                                                name="dateOfJoining"
                                                            />

                                                            <FormErrorMessage>{form.errors.dateOfJoining}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field name="dob">
                                                    {({ field, form }) => (
                                                        <FormControl
                                                            //isRequired
                                                            justifyContent="space-between"
                                                            alignItems="center"
                                                            m="1"
                                                        //isInvalid={form.errors.dob && form.touched.dob}
                                                        >
                                                            <FormLabel>Date of birth</FormLabel>
                                                            <Input
                                                                {...field}

                                                                placeholder="Date of Birth"
                                                                type="date"
                                                                id="dob"
                                                                name="dob"
                                                                max={today} // Assuming `today` is defined in your component for the maximum date
                                                            />

                                                            <FormErrorMessage>{form.errors.dob}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                            </Flex>

                                            <Flex justifyContent="space-between" >
                                                <Field name="role">
                                                    {({ field, form }) => (
                                                        <FormControl isInvalid={form.errors.role && form.touched.role} m="1">
                                                            <FormLabel htmlFor="role">Role</FormLabel>
                                                            <Select
                                                                {...field}

                                                                id="role"
                                                                name="role"
                                                                placeholder="Select"
                                                            >
                                                                <option value="staff">Staff</option>
                                                                <option value="student">Student</option>
                                                                <option value="admin">Admin</option>
                                                            </Select>

                                                            <FormErrorMessage>{form.errors.role}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Field name="gender">
                                                    {({ field, form }) => (
                                                        <FormControl
                                                            // isRequired
                                                            justifyContent="space-between"
                                                            alignItems="center"
                                                            m="1"
                                                        // isInvalid={form.errors.gender && form.touched.gender}
                                                        >
                                                            <FormLabel>Gender</FormLabel>
                                                            <Select
                                                                {...field}

                                                                placeholder="Select"
                                                                id="gender"
                                                                name="gender"
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
                                                            // isRequired
                                                            justifyContent="space-between"
                                                            alignItems="center"
                                                            m="1"
                                                        //isInvalid={form.errors.email && form.touched.email}
                                                        >
                                                            <FormLabel htmlFor="email">Email</FormLabel>
                                                            <Input
                                                                {...field}

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
                                                <Button mr={3} onClick={() => {
                                                    setValues({
                                                        ...formData,
                                                    })
                                                }}>Restore</Button>

                                                <Button type="button" onClick={() => setOpen(false)} disabled={isSubmitting}>
                                                    Cancel
                                                </Button>

                                            </ModalFooter>
                                        </Form>)}


                                </Formik>
                            </ModalBody>


                        </ModalContent>
                    </Modal>
                }

                {/* {isMinimized && (
                    <IconButton
                        aria-label="Maximize"
                        icon={<FaChevronUp />}
                        onClick={handleMinimize}
                    />
                )} */}

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
