import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Flex, Stack, Grid, GridItem, Input, Button, FormControl, FormLabel, Select, IconButton, Icon } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup, Wrap } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoArrowBack } from "react-icons/io5";

const StudentDetails = () => {

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
        <Stack minH="100vh">
            <Navbar />
            <ToastContainer /> {/* Add this line */}
            <Stack width="95vw" margin="0 3%">
                <Flex mb="5" justifyContent="space-between" alignItems="center" width="90vw">

                    <IconButton as={IoArrowBack} cursor="pointer" onClick={goback} size="sm" />

                    <Flex >
                        <label htmlFor={`avatar-upload-${id}`}>
                            <Avatar
                                src={image || `http://192.168.1.121:8082/api/images/${student[0]?.studentId}`}
                                alt="Avatar"
                                style={dis ? {} : { cursor: 'pointer' }}
                                width="100px"
                                height="100px"

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
                                    <FormLabel>StudentId</FormLabel>
                                    <Input
                                        w='100%' h='10' bg='white.500'
                                        value={std.studentId}
                                        fontWeight="bold"
                                        disabled
                                    />
                                </FormControl>
                                <FormControl id={`className-${i}`}>
                                    <FormLabel>ClassName</FormLabel>
                                    <Select
                                        disabled={dis}
                                        fontWeight="bold"
                                        w='100%'
                                        h='10'
                                        bg='white.500'
                                        value={std.className} // Ensure std.className is properly set
                                        onChange={(e) => handleFieldChange(e, i, 'className')}
                                    >
                                        {uniqueClassNames?.map((className, index) => (
                                            <option key={index} value={className}>
                                                {className}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Roll Number</FormLabel>
                                    <Input
                                        w='100%' h='10' bg='white.500' value={std.rollNumber} onChange={(e) => handleFieldChange(e, i, 'rollNumber')}
                                        disabled={dis}
                                        fontWeight="bold"
                                    />
                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Enrollment Number</FormLabel>
                                    <Input w='100%' h='10' bg='white.500' value={std.enrollmentNumber} onChange={(e) => handleFieldChange(e, i, 'enrollmentNumber')}
                                        disabled={dis}
                                        fontWeight="bold"
                                    />
                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Father's Name</FormLabel>
                                    <Input fontWeight="bold"
                                        w='100%' h='10' bg='white.500' value={std.fathersName} onChange={(e) => handleFieldChange(e, i, 'fathersName')} disabled={dis}
                                    />
                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Section</FormLabel>

                                    <Select
                                        disabled={dis}
                                        fontWeight="bold"
                                        w='100%' h='10'
                                        bg='white.500'
                                        // value={std.sex}
                                        onChange={(e) => handleFieldChange(e, i, 'section')}
                                    >
                                        {
                                            uniqueSections?.map((section, i) => (
                                                <option value={section}>{section}</option>
                                            ))
                                        }
                                    </Select>
                                   
                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        disabled={dis}
                                        fontWeight="bold"
                                        w='100%' h='10'
                                        bg='white.500'
                                        value={std.sex}
                                        onChange={(e) => handleFieldChange(e, i, 'category')}
                                    >
                                        <option value='GENERAL'>GENERAL</option>
                                        <option value='OBC'>OBC</option>
                                        <option value='SC'>SC</option>
                                        <option value='ST'>ST</option>
                                        <option value='OTHER'>OTHER</option>
                                    </Select>
                                </FormControl>

                                <FormControl id="name">
                                    <FormLabel>Date of birth</FormLabel>

                                    <Input fontWeight="bold" type='date'
                                        w='100%' h='10' bg='white.500' value={std.dob} onChange={(e) => handleFieldChange(e, i, 'dob')} disabled={dis}
                                        max={today}
                                    />
                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Email</FormLabel>
                                    <Input fontWeight="bold"
                                        w='100%' h='10' bg='white.500' value={std.email} onChange={(e) => handleFieldChange(e, i, 'email')} disabled={dis}
                                        type='Email'
                                    />
                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Mobile</FormLabel>
                                    <Input fontWeight="bold"
                                        w='100%' h='10' bg='white.500' value={std.mobile} onChange={(e) => handleFieldChange(e, i, 'mobile')} disabled={dis}
                                        maxLength="10"
                                        minLength="10"
                                    />
                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Admission year</FormLabel>
                                    <Input fontWeight="bold"
                                        w='100%' h='10' bg='white.500' value={std.admissionYear} onChange={(e) => handleFieldChange(e, i, 'admissionYear')} disabled={dis}
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
                                    <Select
                                        disabled={dis}
                                        fontWeight="bold"
                                        w='100%' h='10'
                                        bg='white.500'
                                        value={std.sex}
                                        onChange={(e) => handleFieldChange(e, i, 'sex')}
                                    >
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                        <option value='Other'>Other</option>
                                    </Select>

                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Session</FormLabel>
                                    <Select
                                        disabled={dis}
                                        fontWeight="bold"
                                        w='100%' h='10'
                                        bg='white.500'
                                        value={std.session}
                                        onChange={(e) => handleFieldChange(e, i, 'session')}
                                        
                                    >
                                        {
                                            uniqueSessions?.map((session, i) => (
                                                <option value={session}>{session}</option>
                                            ))
                                        }


                                    </Select>

                                </FormControl>
                            </Grid>

                        ))
                    }

                </Stack>

                {
                    Role == 'staff' ? '' : <Flex direction='row' justifyContent="flex-end" >
                        {
                            dis ? <Button bg="lightblue" onClick={() => editStudent()}>Edit</Button> : <Button bg="lightblue" onClick={submitStudent}>Submit</Button>
                        }
                        <Button colorScheme='green' margin="0 1rem">Print</Button>
                    </Flex>
                }




            </Stack>

        </Stack>
    )
}

export default StudentDetails
