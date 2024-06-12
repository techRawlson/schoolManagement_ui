import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Flex, Stack, Grid, GridItem, Input, Button, FormControl, FormLabel, Select, Toast, Icon, Menu, MenuButton, MenuList, MenuItem, Checkbox, IconButton } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup, Wrap } from '@chakra-ui/react'
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ArrowLeftIcon } from '@chakra-ui/icons'
import { MdClose } from 'react-icons/md';
import { IoArrowBack } from "react-icons/io5";
const StaffDetails = () => {
    const navigate = useNavigate()
    const [classData, setClassData] = useState([])
    const notify = () => toast("Form Submitted Successfully");
    const [student, setStudent] = useState([])
    const [imageUrl, setImageUrl] = useState(false)
    const [imageData, setImageData] = useState('');
    const { id } = useParams();
    const [subjects, setSubjects] = useState([])
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const imageRef = useRef()
    const getStudent = async () => {
        try {
            const data = await fetch(`http://192.168.1.118:8083/api/staff/${id}`)
            const fdata = await data.json()
            console.log(fdata)

            if (data.status >= 200 && data.status < 300) {
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
            console.log(formData)
            console.log(student[0])
            const data = await fetch(`http://192.168.1.118:8083/api/staff/update/${id}`, {
                method: 'PUT',
                body: formData,
            })
            const dataf = await data.json();
            console.log(dataf)


            const file = imageRef.current.files[0];
            let formData2 = new FormData()

            formData2.append('file', file);

            const pictureCheck = await fetch(`http://192.168.1.118:8083/api/staff-images/${id}`)
            console.log(pictureCheck.status)
            if (pictureCheck.status >= 200 && pictureCheck.status < 300) {
                const picture = await fetch(`http://192.168.1.118:8083/api/staff-images/${id}`, {
                    method: 'put',
                    body: formData2,
                })
            } else {
                const picture = await fetch(`http://192.168.1.118:8083/api/staff-images/${id}`, {
                    method: 'post',
                    body: formData2,
                })
            }
            if (data.ok) {
                toast.success("Student details submitted successfully!")
                setdis(!dis)
            } else {
                toast.error("Something went wrong!")
            }

        } catch (error) {
            toast.error(error)
            // console.log(error)
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
    const getData = async () => {
        try {
            const data = await fetch("http://192.168.1.118:8083/api/staff/saved-Staff");
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
            const data = await fetch('http://192.168.1.118:8083/api/staff/all-subjects');
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
    // console.log(imageRef.current.value=='')
    return (
        <Stack minH="100vh" id='staffDetails'>
            <Navbar />
            <ToastContainer /> {/* Add this line */}
          
                            
            <Stack  width="95vw" m="0 auto">
           
                <Flex justifyContent="space-between" >
                <IconButton background="none" size="sm" as={IoArrowBack} cursor="pointer" onClick={goback} />


                    <label htmlFor={`avatar-upload-${id}`}>
                        <Avatar
                            src={image || `http://192.168.1.118:8083/api/staff-images/${id}`}
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

                                <FormControl id="name" >
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
                                <FormControl id="name" name="name">
                                    <FormLabel>Designation</FormLabel>
                                    <Input
                                        w='100%' h='10' bg='white.500' value={std.designation}
                                        onChange={(e) => handleFieldChange(e, i, 'designation')}
                                        disabled={dis}
                                        fontWeight="bold"
                                        name='designation'
                                    />
                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Staff Id</FormLabel>
                                    <Input
                                        w='100%' h='10' bg='white.500' value={std.staffId} onChange={(e) => handleFieldChange(e, i, 'staffId')}
                                        disabled="true"
                                        fontWeight="bold"
                                        name='staffId'
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
                                        name='dateOfJoining'

                                    />
                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Department</FormLabel>
                                    <Input fontWeight="bold"
                                        name='department'
                                        w='100%' h='10' bg='white.500' value={std.department} onChange={(e) => handleFieldChange(e, i, 'department')} disabled={dis}
                                    />
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
                                <FormControl id="name">
                                    <FormLabel>Mobile</FormLabel>
                                    <Input fontWeight="bold"
                                        name='mobile'
                                        w='100%' h='10' bg='white.500' value={std.mobile} onChange={(e) => handleFieldChange(e, i, 'mobile')} disabled={dis}
                                    />
                                </FormControl>

                                <FormControl id="name">
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
                                        disabled={dis}>
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                        <option value='Other'>Other</option>
                                    </Select>


                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Approver</FormLabel>
                                    <Select fontWeight="bold"
                                        w='100%' h='10'
                                        bg='white.500'
                                        name='approver'
                                        value={std.approver}
                                        onChange={(e) => handleFieldChange(e, i, 'approver')}
                                        disabled={dis}>
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


                <Flex direction='row' justifyContent="flex-end" >
                    {
                        dis ? <Button bg="lightblue" onClick={() => editStudent()}>Edit</Button> : <Button bg="lightblue" onClick={submitStudent}>Submit</Button>
                    }

                </Flex>
            </Stack>
            <Button colorScheme="green" width="160px">Print</Button>
        </Stack>
    )
}

export default StaffDetails
