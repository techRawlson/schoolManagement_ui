import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Flex, Stack, Grid, GridItem, Input, Button, FormControl, FormLabel, Select, IconButton, Icon, Box } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup, Wrap } from '@chakra-ui/react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoArrowBack } from "react-icons/io5";
import { Link as ReactRouterLink } from 'react-router-dom'
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from '@chakra-ui/react'


const StudentDetails = () => {
    const location = useLocation();
    const Role = localStorage.getItem("Role")
    const notify = () => toast("Form Submitted Successfully");
    const [student, setStudent] = useState([])
    const [imageUrl, setImageUrl] = useState(false)
    const [imageData, setImageData] = useState('');
    const { id } = useParams();
    console.log(id)
    const imageRef = useRef()
    const getStudent = async () => {
        try {
            const data = await fetch(`http://192.168.1.121:8082/api/students/${id}`)
            const fdata = await data.json()
            console.log(fdata)

            setStudent([fdata])

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getStudent()

    }, [id])


    //update image
    //const imageUrl = `http://192.168.1.10:8082/api/students/update-image/${id}`;
    const [dis, setdis] = useState(true)
    const [image, setImage] = useState(null);

    console.log(student[0]?.studentId)


    // Function to convert data URI to Blob
    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };


    const editStudent = () => {
        setdis(!dis)
    }


    // const handleFieldChange = async (event, index, fieldName) => {
    //     try {
    //         // for profile picture
    //         if (fieldName === 'profilePicture') {
    //             const file = event.target.files[0];
    //             if (file && file.type.startsWith('image')) {
    //                 const reader = new FileReader();
    //                 reader.onload = () => {
    //                     console.log(reader.result); // Check the image data
    //                     setImage(reader.result); // Update the image state
    //                 };
    //                 reader.readAsDataURL(file);
    //             } else {
    //                 // Handle non-image file selection
    //             }
    //         }

    //         const { value } = event.target;
    //         console.log(value);
    //         const updatedStudents = [...student]; // Create a copy of the student array
    //         updatedStudents[index] = { ...updatedStudents[index], [fieldName]: value }; // Update the specified field of the specific student    
    //         console.log(updatedStudents);
    //         setStudent(updatedStudents);

    //         // Log the image state after updating
    //         console.log('Image state:', image);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // console.log('Image state:', image);


    // const submitStudent = async (e) => {
    //     e.preventDefault();
    //     try {
    //         // Create a new FormData object
    //         const formData = new FormData();

    //         // Loop through the student data and append each field to the FormData object
    //         Object.entries(student[0]).forEach(([key, value]) => {
    //             formData.append(key, value);
    //         });


    //         if (image) {
    //             // Append the profile picture
    //             formData.append('profilePicture', dataURItoBlob(image)); // Use the image data directly, not a string
    //         }

    //         console.log(formData); // Log the formData here to see the updated content

    //         const data = await fetch(`http://192.168.1.10:8082/api/students/update-student/${id}`, {
    //             method: 'PUT',
    //             body: formData
    //         });
    //         const dataf = await data.json();
    //         console.log(dataf);

    //         if (data.ok) {
    //             setImage(null);
    //             toast.success("Student details submitted successfully!");
    //             setdis(!dis);
    //         } else {
    //             toast.error("Failed to submit student details.");
    //         }
    //     } catch (error) {
    //         toast.error("Failed to submit student details.");
    //         console.log(error);
    //     }
    // };

    //go back to previous page
    const navigate = useNavigate()
    const goback = () => {
        navigate(-1)
    }



    //new code 
    let picture;
    const handleFieldChange = async (event, index, fieldName) => {
        try {
            // for profile picture
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
                } else {
                    // Handle non-image file selection
                }
            }

            const { value } = event.target;
            console.log(value);
            const updatedStudents = [...student]; // Create a copy of the student array
            updatedStudents[index] = { ...updatedStudents[index], [fieldName]: value }; // Update the specified field of the specific student    
            console.log(updatedStudents);
            setStudent(updatedStudents);

            // Log the image state after updating
            console.log('Image state:', image);
        } catch (error) {
            console.log(error);
        }
    };

    console.log('Image state:', image);
    const submitStudent = async (e) => {
        e.preventDefault();
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

            // Log the formData here to see the updated content
            console.log(student[0])
            const data = await fetch(`http://192.168.1.121:8082/api/students/update-student/${student[0]?.studentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(student[0])
            });

            //updateimage
            let formData2 = new FormData()
            const file = imageRef.current.files[0];
            console.log(file)
            if (file) {
                formData2.append('file', file);
            }

            const picture = await fetch(`http://192.168.1.121:8082/api/images/${student[0]?.studentId}`, {
                method: 'PUT',
                body: formData2,
            })
            console.log(picture)



            if (data.ok) {
                setImage(null);
                toast.success("Student details submitted successfully!");
                setdis(!dis);
            } else {
                toast.error("Failed to submit student details.");
            }
        } catch (error) {
            toast.error("Failed to submit student details.");
            console.log(error);
        }
    };
    const handleClick = (event) => {
        event.preventDefault();
        // Optionally, you can add further logic here if needed
      };
    const [clas, setClas] = useState([])
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
    console.log(student[0])
    const uniqueSections = [...new Set(clas.map(elm => elm.section))].sort();
    // Extract unique class names
    const uniqueClassNames = [...new Set(clas.map(elm => elm.className))].sort();
    // Extract unique sessions
    const uniqueSessions = [...new Set(clas.map(elm => elm.session))].sort();
    const today = new Date().toISOString().split('T')[0];
    return (
        <div style={{ width: '100vw', height: '100vh' }} >
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
                                isCurrent={location.pathname === '/student'}
                                color={location.pathname === '/student' ? 'blue.400' : 'gray.400'}
                                fontWeight={location.pathname === '/student' ? 'bold' : 'normal'}
                            >
                                Student
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
                                Student Details
                            </BreadcrumbLink>
                        </BreadcrumbItem>






                    </Breadcrumb>
            <ToastContainer /> {/* Add this line */}
            <Stack width="100vw" backgroundColor="white">
                <Flex justifyContent="space-between" alignItems="center" width="100%" margin="0 auto" padding="2vh 2vw">

                    

                    <Flex >
                        <label htmlFor={`avatar-upload-${id}`}>
                            <Avatar
                                src={image || `http://192.168.1.121:8082/api/images/${student[0]?.studentId}`}
                                alt="Avatar"
                                style={dis ? {} : { cursor: 'pointer' }}
                                boxSize="100px"

                            />
                            <input
                                id={`avatar-upload-${id}`}
                                type="file"
                                accept='image/jpeg'
                                style={{ display: 'none' }}
                                onChange={(e) => handleFieldChange(e, 0, 'profilePicture')}
                                disabled={dis}
                                ref={imageRef}
                                encType="multipart/form-data"
                            />
                        </label>
                    </Flex>


                </Flex>

                <Stack >
                    {student?.map((std, i) => (
                        <Box key={i} boxShadow="sm" overflow="hidden" >
                            <Flex wrap="wrap" gap={4} margin="0 4%" >
                                <FormControl id={`name-${i}`} flex="1 1 100%" flexBasis="240px">
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        bg="white.500"
                                        value={std.name}
                                        onChange={(e) => handleFieldChange(e, i, 'name')}
                                        disabled={dis}
                                        fontWeight="bold"
                                    />
                                </FormControl>
                                <FormControl id={`studentId-${i}`} flex="1 1 100%" flexBasis="240px">
                                    <FormLabel>StudentId</FormLabel>
                                    <Input
                                        bg="white.500"
                                        value={std.studentId}
                                        fontWeight="bold"
                                        disabled
                                    />
                                </FormControl>
                                <FormControl id={`className-${i}`} flex="1 1 100%" flexBasis="240px">
                                    <FormLabel>ClassName</FormLabel>
                                    <Select
                                        disabled={dis}
                                        fontWeight="bold"
                                        bg="white.500"
                                        value={std.className}
                                        onChange={(e) => handleFieldChange(e, i, 'className')}
                                    >
                                        {uniqueClassNames?.map((className, index) => (
                                            <option key={index} value={className}>
                                                {className}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl id={`rollNumber-${i}`} flex="1 1 100%" flexBasis="240px">
                                    <FormLabel>Roll Number</FormLabel>
                                    <Input
                                        bg="white.500"
                                        value={std.rollNumber}
                                        onChange={(e) => handleFieldChange(e, i, 'rollNumber')}
                                        disabled={dis}
                                        fontWeight="bold"
                                    />
                                </FormControl>
                                <FormControl id={`enrollmentNumber-${i}`} flex="1 1 100%" flexBasis="240px">
                                    <FormLabel>E. Number</FormLabel>
                                    <Input
                                        bg="white.500"
                                        value={std.enrollmentNumber}
                                        onChange={(e) => handleFieldChange(e, i, 'enrollmentNumber')}
                                        disabled={dis}
                                        fontWeight="bold"
                                    />
                                </FormControl>
                                <FormControl id={`fathersName-${i}`} flex="1 1 100%" flexBasis="240px">
                                    <FormLabel>Father's Name</FormLabel>
                                    <Input
                                        bg="white.500"
                                        value={std.fathersName}
                                        onChange={(e) => handleFieldChange(e, i, 'fathersName')}
                                        disabled={dis}
                                        fontWeight="bold"
                                    />
                                </FormControl>
                                <FormControl id={`section-${i}`} flex="1 1 100%" flexBasis="240px">
                                    <FormLabel>Section</FormLabel>
                                    <Select
                                        disabled={dis}
                                        fontWeight="bold"
                                        bg="white.500"
                                        onChange={(e) => handleFieldChange(e, i, 'section')}
                                    >
                                        {uniqueSections?.map((section, idx) => (
                                            <option key={idx} value={section}>
                                                {section}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl id={`category-${i}`} flex="1 1 100%" flexBasis="240px">
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        disabled={dis}
                                        fontWeight="bold"
                                        bg="white.500"
                                        value={std.sex}
                                        onChange={(e) => handleFieldChange(e, i, 'category')}
                                    >
                                        <option value="GENERAL">GENERAL</option>
                                        <option value="OBC">OBC</option>
                                        <option value="SC">SC</option>
                                        <option value="ST">ST</option>
                                        <option value="OTHER">OTHER</option>
                                    </Select>
                                </FormControl>
                                <FormControl id={`dob-${i}`} flex="1 1 100%" flexBasis="240px">
                                    <FormLabel>Date of birth</FormLabel>
                                    <Input
                                        bg="white.500"
                                        type="date"
                                        value={std.dob}
                                        onChange={(e) => handleFieldChange(e, i, 'dob')}
                                        disabled={dis}
                                        max={today}
                                        fontWeight="bold"
                                    />
                                </FormControl>
                                <FormControl id={`email-${i}`} flex="1 1 100%" flexBasis="240px">
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        bg="white.500"
                                        type="email"
                                        value={std.email}
                                        onChange={(e) => handleFieldChange(e, i, 'email')}
                                        disabled={dis}
                                        fontWeight="bold"
                                    />
                                </FormControl>
                                <FormControl id={`mobile-${i}`} flex="1 1 100%" flexBasis="240px">
                                    <FormLabel>Mobile</FormLabel>
                                    <Input
                                        bg="white.500"
                                        value={std.mobile}
                                        onChange={(e) => handleFieldChange(e, i, 'mobile')}
                                        disabled={dis}
                                        maxLength="10"
                                        minLength="10"
                                        fontWeight="bold"
                                    />
                                </FormControl>
                                <FormControl id={`admissionYear-${i}`} flex="1 1 100%" flexBasis="240px">
                                    <FormLabel>Adm. year</FormLabel>
                                    <Input
                                        bg="white.500"
                                        value={std.admissionYear}
                                        onChange={(e) => handleFieldChange(e, i, 'admissionYear')}
                                        disabled={dis}
                                        fontWeight="bold"
                                    />
                                </FormControl>
                                <FormControl id={`address-${i}`} flex="1 1 100%" flexBasis="240px">
                                    <FormLabel>Address</FormLabel>
                                    <Input
                                        bg="white.500"
                                        value={std.address}
                                        onChange={(e) => handleFieldChange(e, i, 'address')}
                                        disabled={dis}
                                        fontWeight="bold"
                                    />
                                </FormControl>
                                <FormControl id={`gender-${i}`} flex="1 1 100%" flexBasis="240px">
                                    <FormLabel>Gender</FormLabel>
                                    <Select
                                        disabled={dis}
                                        fontWeight="bold"
                                        bg="white.500"
                                        value={std.sex}
                                        onChange={(e) => handleFieldChange(e, i, 'sex')}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </Select>
                                </FormControl>
                                <FormControl id={`session-${i}`} flex="1 1 100%" flexBasis="240px">
                                    <FormLabel>Session</FormLabel>
                                    <Select
                                        disabled={dis}
                                        fontWeight="bold"
                                        bg="white.500"
                                        value={std.session}
                                        onChange={(e) => handleFieldChange(e, i, 'session')}
                                    >
                                        {uniqueSessions?.map((session, idx) => (
                                            <option key={idx} value={session}>
                                                {session}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Flex>
                        </Box>
                    ))}
                </Stack>

                {
                    Role == 'staff' ? '' : <Flex direction='row' justifyContent="flex-end" margin="2vh 5vh"  >
                        {
                            dis ? <Button bg="lightblue" onClick={() => editStudent()} margin="0 1vh">Edit</Button> : <Button bg="lightblue" onClick={submitStudent}>Submit</Button>
                        }

                    </Flex>
                }




            </Stack>

        </div>
    )
}

export default StudentDetails
