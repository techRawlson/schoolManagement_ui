import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Flex, Stack, Grid, GridItem, Input, Button, FormControl, FormLabel, Select, Toast, Icon, Menu, MenuButton, MenuList, MenuItem, Checkbox, IconButton, useDisclosure, InputRightElement, InputGroup } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup, Wrap } from '@chakra-ui/react'
import { Navigate, useParams, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowLeftIcon, ChevronRightIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { MdClose } from 'react-icons/md';
import { IoArrowBack } from "react-icons/io5";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink ,
    BreadcrumbSeparator,
  } from '@chakra-ui/react'
  import { Link as ReactRouterLink } from 'react-router-dom'
const StaffDetails = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const location = useLocation();
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const navigate = useNavigate()
    const [classData, setClassData] = useState([])
    const notify = () => toast("Form Submitted Successfully");
    const [student, setStudent] = useState([])
    const [imageUrl, setImageUrl] = useState(false)
    const [imageData, setImageData] = useState('');
    const { id } = useParams();
    const [staffImageId, setstaffImageId] = useState('')
    const [subjects, setSubjects] = useState([])
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const imageRef = useRef()
    const getStudent = async () => {
        try {
            const data = await fetch(`http://192.168.1.121:8083/api/staff/${id}`)
            const fdata = await data.json()
            console.log(fdata)

            if (data.status >= 200 && data.status < 300) {
                setStudent([fdata])
                setSelectedItems(fdata.subjects)
                setstaffImageId(fdata.staffId)
            }
        } catch (error) {
            console.log(error)
            alert("user does not exists")
            navigate(-1)
        }
    }
    console.log(staffImageId)
    useEffect(() => {
        getStudent()
    }, [id])

    const [image, setImage] = useState(null);
    const [dis, setdis] = useState(true)
    const editStudent = () => {
        setdis(!dis)
    }
    let picture;
    const handleFieldChange = async (event, index, fieldName) => {
        if (fieldName === 'profilePicture') {
            const file = event.target.files[0];
            if (file && file.type.startsWith('image')) {
                const reader = new FileReader();
                reader.onload = () => {
                    picture = reader.result;
                    console.log(reader.result); // Check the image data
                    setImage(reader.result); // Update the image state
                };
                reader.readAsDataURL(file);
            }
        } else {
            const { name, value } = event.target;
            const newData = [...student];

            newData[0][name] = value;

            console.log(newData); // This will log the updated data to the console
            setStudent(newData);
        }
    };

    console.log(student)
    const submitStudent = async () => {
        try {
            console.log("kamal h")
            console.log(selectedItems)
            const formData = new FormData();
    
            // Loop through student data and append each field (except 'profilePicture') to formData
            student.forEach(std => {
              Object.entries(std).forEach(([key, value]) => {
                if (key !== 'profilePicture') {
                  formData.append(key, value);
                }
              });
            });
        
            // Clear existing 'subjects' property in formData
            formData.delete('subjects');
            
            // Append selected subjects (assuming 'selectedItems' is an array of subject IDs)
            if(selectedItems.length>0){
                selectedItems.forEach((item, index) => {
                    formData.append(`subjects`, item);
                  });
            }else{
                formData.append('subjects',''); 
            }
            
        
            console.log(...formData.entries()); 
      
          // Perform PUT request to update student data
          const response = await fetch(`http://192.168.1.121:8083/api/staff/update/${id}`, {
            method: 'PUT',
            body: formData,
          });
      
          if (!response.ok) {
            const er=await response.text()
            throw new Error(`Failed to update student data: ${er}`);
          }
      
          // Handle profile picture update
          const file = imageRef.current.files[0];
          const formData2 = new FormData();
          formData2.append('file', file);
      
          // Check if staff image exists (assuming 'staffImageId' is defined)
          const pictureCheck = await fetch(`http://192.168.1.121:8083/api/staff-images/${staffImageId}`);
          
          if (pictureCheck.ok) {
            // If staff image exists, update it
            await fetch(`http://192.168.1.121:8083/api/staff-images/${staffImageId}`, {
              method: 'PUT',
              body: formData2,
            });
          } else {
            // If staff image does not exist, create a new one
            await fetch(`http://192.168.1.121:8083/api/staff-images/${staffImageId}`, {
              method: 'POST',
              body: formData2,
            });
          }
      
          // Success message and state update
          toast.success("Student details submitted successfully!");
          setdis(!dis); // Example: toggle dis state
      
        } catch (error) {
          console.error( error);
          toast.error(`${error}`);
        }
      };
      

    const goback = () => {
        navigate(-1)
    }


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
    const getData = async () => {
        try {
            const data = await fetch("http://192.168.1.121:8083/api/staff/saved-Staff");
            const fdata = await data.json();
            console.log(fdata)
            setClassData(fdata)
        } catch (error) {
            console.log(error)
        }
    }

    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };
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
    const handleItemClick = (event, value) => {
        event.stopPropagation(); // Prevent event propagation
        if (selectedItems.includes(value)) {
            setSelectedItems(selectedItems.filter((item) => item !== value));
        } else {
            setSelectedItems([...selectedItems, value]);
        }



    };

    useEffect(() => {
        getSubjects()
        getData()
    }, [])
    //change password code
    const [passwords, setPasswords] = useState({
        newPassword: '',
        confirmPassword: '',
        oldPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setPasswords((prevPasswords) => ({
            ...prevPasswords,
            [name]: value,
        }));
        console.log(passwords)
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };
    // console.log(imageRef.current.value=='')

    const changePassword = async (e) => {
        e.preventDefault();
        try {
            const userId = student[0].staffId;

            // Params for the URLs
            const params = new URLSearchParams({
                newPassword: passwords.newPassword,
                confirmNewPassword: passwords.confirmPassword,
                oldPassword: passwords.oldPassword,
            });
            const params1 = new URLSearchParams({
                newPassword: passwords.newPassword,
                // confirmNewPassword: passwords.confirmPassword,
                // oldPassword: passwords.oldPassword,
            });

            // URLs for both user and staff
            const staffUrl = `http://192.168.1.121:8083/api/staff/${userId}/reset-password?${params.toString()}`;
            const userUrl = `http://192.168.1.121:8081/api/Login/${userId}/update-password?${params1.toString()}`;

            // Fetch request for staff
            const staffResponse = await fetch(staffUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer your-token-here', // If authentication is required
                },
            });

            if (!staffResponse.ok) {
                const errorData = await staffResponse.text();
                throw new Error(`${errorData}`);
            }
            console.log(passwords.newPassword)
            // Fetch request for user
            const userResponse = await fetch(userUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers as required
                },

            });

            if (!userResponse.ok) {
                const errorData = await userResponse.text();
                console.log(errorData)
                throw new Error(` ${errorData}`);
            }

            // Fetch additional data after successful password updates
            await getData();

            // Show success toast notification
            toast.success('Password changed successfully');
        } catch (error) {
            console.error('Error:', error); // Log the error for debugging
            toast.error(error.message || 'Failed to change password'); // Display error message in toast
        } finally {
            onClose(); // Close any modal or UI component after completion
        }
    };






  const goTimeTable = (name,empId) => {
    const userInfo={
        name,
        empId
    }
    console.log(userInfo)
    // Redirect to the desired page
    const userInfoString = encodeURIComponent(JSON.stringify(userInfo));
    navigate(`/stafftimetable?user=${userInfoString}`);
  };



  console.log(selectedItems)
    return (
        <Stack minH="100vh" id='staffDetails'>
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
                                to="/student"
                                isCurrent={location.pathname === '/staff'}
                                color={location.pathname === '/student' ? 'blue.400' : 'gray.400'}
                                fontWeight={location.pathname === '/student' ? 'bold' : 'normal'}
                            >
                                Staff
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                as={ReactRouterLink}
                                // to={`/studentdetails/`}  // Interpolate 'id' into the route
                                isCurrent={location.pathname === `/studentdetails/`}
                                color={location.pathname === `/studentdetails/` ? 'blue.400' : 'gray.400'}
                                fontWeight={location.pathname === `/studentdetails/` ? 'bold' : 'normal'}
                            >
                                Staff Details
                            </BreadcrumbLink>
                        </BreadcrumbItem>






                    </Breadcrumb>
            <ToastContainer /> {/* Add this line */}


            <Stack width="95vw" m="0 auto">

                <Flex justifyContent="space-between" >


                    <label htmlFor={`avatar-upload-${id}`}>
                        <Avatar
                            src={image || `http://192.168.1.121:8083/api/staff-images/${staffImageId}`}
                            alt="Avatar"
                            style={dis ? {} : { cursor: 'pointer' }}




                        />
                        <input
                            id={`avatar-upload-${id}`}
                            type={dis ? '' : 'file'}
                            accept='image/jpeg'
                            style={{ display: 'none' }}
                            onChange={(e) => handleFieldChange(e, 0, 'profilePicture')}
                            disabled={dis}
                            ref={imageRef}
                            encType="multipart/form-data"
                        />
                    </label>
                </Flex>

                <Stack>
                    {
                        student?.map((std, i) => (
                            <Grid templateColumns='repeat(4, 1fr)' gap={2} key={i} minH="55vh" >

                                <FormControl id="name" isRequired>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        w='100%'
                                        h='10'
                                        bg='white.500'
                                        value={std.name}
                                        name="name"
                                        onChange={(e) => handleFieldChange(e, i, 'name')}
                                        disabled={dis}
                                        fontWeight="bold"
                                    />
                                </FormControl>
                                <FormControl id="empId" >
                                    <FormLabel>Emp ID</FormLabel>
                                    <Input
                                        w='100%'
                                        h='10'
                                        bg='white.500'
                                        value={std.empId}
                                        name="empId"
                                        onChange={(e) => handleFieldChange(e, i, 'empId')}
                                        disabled={dis}
                                        fontWeight="bold"
                                        placeholder='your employee id'
                                    />
                                </FormControl>
                                <FormControl id="fatherName" isRequired>
                                    <FormLabel>Father Name</FormLabel>
                                    <Input
                                        w='100%'
                                        h='10'
                                        bg='white.500'
                                        value={std.fatherName}
                                        name="fatherName"
                                        onChange={(e) => handleFieldChange(e, i, 'fatherName')}
                                        disabled={dis}
                                        fontWeight="bold"
                                    />
                                </FormControl>
                                <FormControl id="role">
                                    <FormLabel>Role</FormLabel>
                                    <Select
                                        w='100%' h='10' bg='white.500' value={std.role}
                                        name="role"
                                        onChange={(e) => handleFieldChange(e, i, 'role')}
                                        disabled={dis}
                                        fontWeight="bold"
                                        placeholder='select'
                                    >
                                        <option value="staff">Staff</option>
                                        <option value="student">Student</option>
                                        <option value="admin">Admin</option>
                                    </Select>
                                </FormControl>



                                <FormControl id="designation" name="designation">
                                    <FormLabel>Designation</FormLabel>
                                    <Select
                                        w='100%' h='10' bg='white.500' value={std.designation}
                                        onChange={(e) => handleFieldChange(e, i, 'designation')}
                                        disabled={dis}
                                        fontWeight="bold"
                                        name='designation'
                                        placeholder='select'
                                    >
                                        <option value="principal">Principal</option>
                                        <option value="vice_principal">Vice Principal</option>
                                        <option value="head_teacher">Head Teacher</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="assistant_teacher">Assistant Teacher</option>
                                        <option value="counselor">Counselor</option>
                                        <option value="librarian">Librarian</option>
                                        <option value="administrative_staff">Administrative Staff</option>
                                        <option value="school_nurse">School Nurse</option>
                                        <option value="custodian">Custodian</option>
                                        <option value="coach">Coach</option>
                                        <option value="it_support_staff">IT Support Staff</option>
                                        <option value="department_head">Department Head</option>
                                        <option value="dean_of_students">Dean of Students</option>
                                        <option value="academic_advisor">Academic Advisor</option>
                                        <option value="registrar">Registrar</option>
                                        <option value="office_manager">Office Manager</option>
                                        <option value="receptionist">Receptionist</option>
                                        <option value="extracurricular_coordinator">Extracurricular Coordinator</option>
                                        <option value="substitute_teacher">Substitute Teacher</option>
                                    </Select>
                                </FormControl>

                                <FormControl id="name">
                                    <FormLabel>System Id</FormLabel>
                                    <Input
                                        w='100%' h='10' bg='white.500' value={std.staffId} onChange={(e) => handleFieldChange(e, i, 'staffId')}
                                        disabled="true"
                                        fontWeight="bold"
                                        name='staffId'
                                    />
                                </FormControl>
                                <FormControl id="name" isRequired>
                                    <FormLabel>Date Of Joining</FormLabel>
                                    <Input type='date'
                                        w='100%' h='10'
                                        bg='white.500'
                                        value={std.dateOfJoining} onChange={(e) => handleFieldChange(e, i, 'dateOfJoining')}
                                        disabled={dis}
                                        fontWeight="bold"
                                        name='dateOfJoining'

                                    />

                                </FormControl>
                                <FormControl id="qualification" >
                                    <FormLabel>Qualification</FormLabel>
                                    <Select
                                        w='100%'
                                        h='10'
                                        bg='white.500'
                                        value={std.qualification}
                                        name="qualification"
                                        onChange={(e) => handleFieldChange(e, i, 'qualification')}
                                        disabled={dis}
                                        fontWeight="bold"
                                        // {...field}
                                        placeholder="Select"
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


                                </FormControl>
                                <FormControl id="department" name="department">
                                    <FormLabel>Department</FormLabel>
                                    <Select
                                        w='100%' h='10' bg='white.500' value={std.department}
                                        onChange={(e) => handleFieldChange(e, i, 'department')}
                                        disabled={dis}
                                        fontWeight="bold"
                                        name='department'
                                        placeholder='Select'
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
                                </FormControl>



                                <FormControl id="name">
                                    <FormLabel>Date of birth</FormLabel>
                                    <Input fontWeight="bold"
                                        type='date'
                                        w='100%'
                                        h='10'
                                        bg='white.500'
                                        name='dob'
                                        value={std.dob} onChange={(e) => handleFieldChange(e, i, 'dob')} disabled={dis}
                                    />
                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Email</FormLabel>
                                    <Input fontWeight="bold"
                                        name="email"

                                        w='100%' h='10' bg='white.500' value={std.email} onChange={(e) => handleFieldChange(e, i, 'email')} disabled={dis}
                                    />
                                </FormControl>
                                <FormControl id="name" isRequired>
                                    <FormLabel>Mobile</FormLabel>
                                    <Input fontWeight="bold"
                                        name='mobile'
                                        w='100%' h='10' bg='white.500' value={std.mobile} onChange={(e) => handleFieldChange(e, i, 'mobile')} disabled={dis}
                                    />
                                </FormControl>
                                <FormControl id="alternateMobile" >
                                    <FormLabel>Alternate Mobile</FormLabel>
                                    <Input
                                        w='100%'
                                        h='10'
                                        bg='white.500'
                                        value={std.alternateNumber}
                                        name="alternateNumber"
                                        onChange={(e) => handleFieldChange(e, i, 'alternateNumber')}
                                        disabled={dis}
                                        fontWeight="bold"
                                    />
                                </FormControl>

                                <FormControl id="adreess">
                                    <FormLabel>Address</FormLabel>
                                    <Input fontWeight="bold"
                                        name='address'
                                        w='100%' h='10' bg='white.500' value={std.address} onChange={(e) => handleFieldChange(e, i, 'address')} disabled={dis}
                                    />
                                </FormControl>

                                <FormControl id="name">
                                    <FormLabel>Gender</FormLabel>
                                    <Select fontWeight="bold"
                                        w='100%' h='10'
                                        bg='white.500'
                                        name='gender'
                                        value={std.gender}
                                        onChange={(e) => handleFieldChange(e, i, 'gender')}
                                        disabled={dis}
                                        placeholder='select'
                                    >
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                        <option value='Other'>Other</option>
                                    </Select>


                                </FormControl>
                                <FormControl id="name" isRequired>
                                    <FormLabel>Approver</FormLabel>
                                    <Select fontWeight="bold"
                                        w='100%' h='10'
                                        bg='white.500'
                                        name='approver'
                                        placeholder='select'
                                        value={std.approver}
                                        onChange={(e) => handleFieldChange(e, i, 'approver')}
                                        disabled={dis}>
                                        <option value="admin">Admin</option>
                                        {
                                            classData?.map((elm) => (
                                                <option value={elm.name}>{elm.name}</option>
                                            ))
                                        }
                                    </Select>


                                </FormControl>
                                <FormControl>
                                    {
                                        dis ? "" :
                                            <>
                                                <FormControl  m="1">
                                                    <FormLabel >Subject</FormLabel>
                                                    <Menu isOpen={isMenuOpen} onClose={handleMenuClose}>
                                                        <MenuButton as={Button} rightIcon={<></>} onClick={handleMenuToggle}>
                                                            Select Items
                                                        </MenuButton>
                                                        <MenuList onClick={(e, i) => e.stopPropagation()}>
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
                                            </>
                                    } </FormControl>


                                <FormControl>
                                    <FormLabel>Subject</FormLabel>
                                    <Flex>
                                        {selectedItems.map((item, index) => (
                                            <Button
                                                key={index}
                                                m={1}
                                                colorScheme="teal"
                                                variant="outline"
                                                size="sm"
                                                rightIcon={<Icon as={MdClose} />}
                                                onClick={dis ? "" : () => handleDeleteItem(index)}
                                                disabled={dis} // Set the disabled prop based on the dis variable
                                                cursor={dis ? 'not-allowed' : 'pointer'} // Set cursor based on dis
                                            >
                                                {item}
                                            </Button>
                                        ))}
                                    </Flex>
                                </FormControl>
                              

                            </Grid>

                        ))
                    }

                </Stack>
{
    student[0]?.active==true? <Flex direction='row' justifyContent="flex-end" >
    {
        dis ? <Button bg="lightblue" onClick={() => editStudent()}>Edit</Button> : <Button bg="lightblue" onClick={submitStudent}>Submit</Button>
    }
    <Button bg='teal' color='white' ml='3vw' onClick={onOpen}>Reset Password</Button>
    <Button bg='teal' color='white' ml='3vw' onClick={()=>goTimeTable(student[0].name,student[0].empId)}>Time Table</Button>
    
</Flex>:''
}

               
            </Stack>
            <>


                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Reset Password</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6} >
                            <FormControl>
                                <FormLabel>Old Password</FormLabel>
                                <Input ref={initialRef} placeholder='Old Password' onChange={handleChange} name='oldPassword' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>New Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        name='newPassword'
                                        placeholder='New Password'
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={handleChange}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <IconButton
                                            h='1.75rem'
                                            size='sm'
                                            onClick={togglePasswordVisibility}
                                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Confirm New Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        name='confirmPassword'
                                        placeholder='Confrim New Password'
                                        type={showPassword1 ? 'text' : 'password'}
                                        onChange={handleChange}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <IconButton
                                            h='1.75rem'
                                            size='sm'
                                            onClick={togglePasswordVisibility1}
                                            icon={showPassword1 ? <ViewOffIcon /> : <ViewIcon />}
                                            aria-label={showPassword1 ? 'Hide password' : 'Show password'}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={(e) => changePassword(e)}>
                                Submit
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        </Stack>
    )
}

export default StaffDetails
