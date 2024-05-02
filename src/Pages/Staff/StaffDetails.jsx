import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Flex, Stack, Grid, GridItem, Input, Button, FormControl, FormLabel, Select, Toast, Icon, Menu, MenuButton, MenuList, MenuItem, Checkbox } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup, Wrap } from '@chakra-ui/react'
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
const StaffDetails = () => {
    const navigate = useNavigate()
    const notify = () => toast("Form Submitted Successfully");
    const [student, setStudent] = useState([])
    const [imageUrl, setImageUrl] = useState(false)
    const [imageData, setImageData] = useState('');
    const { id } = useParams();
    const [subjects, setSubjects] = useState([])
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const getStudent = async () => {
        try {
            const data = await fetch(`http://192.168.1.10:8083/api/staff/get-staff/${id}`)
            const fdata = await data.json()
            console.log(fdata)

            if (data.ok) {
                setStudent([fdata])
                setSelectedItems(fdata.subjects)
            }
        } catch (error) {
            console.log(error)
            alert("user does not exists")
            navigate(-1)
        }
    }

    useEffect(() => {
        getStudent()
    }, [id])


    const [dis, setdis] = useState(true)
    const editStudent = () => {
        setdis(!dis)
    }
    const handleFieldChange = async (event, index, fieldName) => {
        try {
            const { value } = event.target;
            console.log(value)
            const updatedStudents = [...student]; // Create a copy of the student array
            updatedStudents[index] = { ...updatedStudents[index], [fieldName]: value }; // Update the specified field of the specific student
            setStudent(updatedStudents);
            if (fieldName == 'subject') {
                console.log('event', event.target.value, index)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const submitStudent = async () => {
        try {
            // Create a new FormData object
            const formData = new FormData();
            // Loop through the student data and append each field to the FormData object
            student.forEach(std => {
                Object.entries(std).forEach(([key, value]) => {
                    if (key !== 'profilePicture') {
                        formData.append(key, value);
                    }
                    
                });
            });
            //for subject items
            
           
            
            // Clear existing 'subjects' property in formData
            formData.delete('subjects');
            
            // Append the new 'subjects' array to formData
            selectedItems.forEach(item => {
              formData.append('subjects', item);
            });
            
            

            console.log(student[0])
            const data = await fetch(`http://192.168.1.10:8083/api/staff/update/${id}`, {
                method: 'PUT',
                body: formData,
            })
            const dataf = await data.json();
            console.log(dataf)
            if (data.ok) {
                toast.success("Student details submitted successfully!")
                setdis(!dis)
            } else {
                toast.error("Student details submitted successfully!")
            }

        } catch (error) {
            toast.error("Student details submitted successfully!")
            console.log(error)
        }
    }

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
  

    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };
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
    const handleItemClick = (event, value) => {
        event.stopPropagation(); // Prevent event propagation
        if (selectedItems.includes(value)) {
            setSelectedItems(selectedItems.filter((item) => item !== value));
        } else {
            setSelectedItems([...selectedItems, value]);
        }

        // if (Array.isArray(student[0].subjects)) {
        //     const newArray = [...selectedItems, ...student[0].subjects];
        //     const unique = new Set(newArray)
        //     const original = Array.from(unique)
        //     console.log(original);
        // } else {
        //     console.error('student.subjects is not an array');
        // }
        // const uniqueArray=new Set()

    };
    
    useEffect(() => {
        getSubjects()
       
    }, [])
    console.log(selectedItems)
    return (
        <Stack minH="100vh" id='staffDetails'>
            <Navbar />
            <ToastContainer /> {/* Add this line */}
            <Stack maxW="80vw" width="80vw" m="0 auto">
                <Stack direction='row' mb="5" width="80vw" justifyContent="space-between">
                    <Avatar src={`http://192.168.1.10:8083/api/staff/image/${id}`} borderRadius="6%" size="lg" />
                    <IoReturnUpBackOutline size="35" cursor="pointer" onClick={goback} />
                </Stack>

                <Stack>
                    {
                        student?.map((std, i) => (
                            <Grid templateColumns='repeat(4, 1fr)' gap={2} key={i} minH="55vh" >

                                <FormControl id="name">
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        w='100%'
                                        h='10'
                                        bg='white.500'
                                        value={std.name}
                                        onChange={(e) => handleFieldChange(e, i, 'name')}
                                        disabled={dis}
                                        fontWeight="bold"
                                    />
                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Designation</FormLabel>
                                    <Input
                                        w='100%' h='10' bg='white.500' value={std.designation}
                                        onChange={(e) => handleFieldChange(e, i, 'designation')}
                                        disabled={dis}
                                        fontWeight="bold"
                                    />
                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Staff Id</FormLabel>
                                    <Input
                                        w='100%' h='10' bg='white.500' value={std.staffId} onChange={(e) => handleFieldChange(e, i, 'staffId')}
                                        disabled={dis}
                                        fontWeight="bold"
                                    />
                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Date Of Joining</FormLabel>
                                    <Input type='date'
                                        w='100%' h='10'
                                        bg='white.500'
                                        value={std.dateOfJoining} onChange={(e) => handleFieldChange(e, i, 'dateOfJoining')}
                                        disabled={dis}
                                        fontWeight="bold"

                                    />
                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Department</FormLabel>
                                    <Input fontWeight="bold"
                                        w='100%' h='10' bg='white.500' value={std.department} onChange={(e) => handleFieldChange(e, i, 'department')} disabled={dis}
                                    />
                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Mobile</FormLabel>
                                    <Input fontWeight="bold"
                                        w='100%' h='10' bg='white.500' value={std.mobile} onChange={(e) => handleFieldChange(e, i, 'mobile')} disabled={dis}
                                    />
                                </FormControl>


                                <FormControl id="name">
                                    <FormLabel>Date of birth</FormLabel>
                                    <Input fontWeight="bold"
                                        type='date'
                                        w='100%'
                                        h='10'
                                        bg='white.500'
                                        value={std.dob} onChange={(e) => handleFieldChange(e, i, 'dob')} disabled={dis}
                                    />
                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Email</FormLabel>
                                    <Input fontWeight="bold"
                                        w='100%' h='10' bg='white.500' value={std.email} onChange={(e) => handleFieldChange(e, i, 'email')} disabled={dis}
                                    />
                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Mobile</FormLabel>
                                    <Input fontWeight="bold"
                                        w='100%' h='10' bg='white.500' value={std.mobile} onChange={(e) => handleFieldChange(e, i, 'mobile')} disabled={dis}
                                    />
                                </FormControl>

                                <FormControl id="name">
                                    <FormLabel>Address</FormLabel>
                                    <Input fontWeight="bold"
                                        w='100%' h='10' bg='white.500' value={std.address} onChange={(e) => handleFieldChange(e, i, 'address')} disabled={dis}
                                    />
                                </FormControl>

                                <FormControl id="name">
                                    <FormLabel>Gender</FormLabel>
                                    <Select fontWeight="bold"
                                        w='100%' h='10'
                                        bg='white.500'
                                        value={std.gender}
                                        onChange={(e) => handleFieldChange(e, i, 'gender')}
                                        disabled={dis}>
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                        <option value='Other'>Other</option>
                                    </Select>


                                </FormControl>
                                <FormControl>
                                    {
                                        dis ? "" :
                                            <>
                                                <FormControl isRequired m="1">
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
                                <FormLabel >Subject</FormLabel>
                                    <Flex >
                                    
                                        {selectedItems.map((item, index) => (
                                            <Button
                                            key={index}
                                            m={1}
                                            colorScheme="teal"
                                            variant="outline"
                                            size="sm"
                                            rightIcon={<Icon as={MdClose} />}
                                            onClick={() => handleDeleteItem(index)}
                                            disabled={dis} // Set the disabled prop based on the dis variable
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


                <Flex direction='row' justifyContent="flex-end" >
                    {
                        dis ? <Button bg="lightblue" onClick={() => editStudent()}>Edit</Button> : <Button bg="lightblue" onClick={submitStudent}>Submit</Button>
                    }

                </Flex>
            </Stack>

        </Stack>
    )
}

export default StaffDetails
