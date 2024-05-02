import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Flex, Stack, Grid, GridItem, Input, Button, FormControl, FormLabel } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup, Wrap } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoReturnUpBackOutline } from 'react-icons/io5';
const StudentDetails = () => {
    const notify = () => toast("Form Submitted Successfully");
    const [student, setStudent] = useState([])
    const [imageUrl, setImageUrl] = useState(false)
    const [imageData, setImageData] = useState('');
    const { id } = useParams();
    console.log(id)

    const getStudent = async () => {
        try {
            const data = await fetch(`http://192.168.1.10:8082/api/students/${id}`)
            const fdata = await data.json()
            console.log(fdata)
            if (fdata[0]?.profilePicture) {
                const byteCharacters = fdata[0].profilePicture;
                const byteNumbers = new Uint8Array(byteCharacters);
                const blob = new Blob([byteNumbers], { type: 'image/jpeg' });
                const imageUrl = URL.createObjectURL(blob);

                setImageData(imageUrl);
            }
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
                        picture=reader.result;
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
    
            // if (picture) {
                // Append the profile picture
                console.log('p',picture)
                formData.append('profilePicture', picture); // Use the image data directly, not a string
            // }
    
            console.log(formData); // Log the formData here to see the updated content
    
            const data = await fetch(`http://192.168.1.10:8082/api/students/update-student/${id}`, {
                method: 'PUT',
                body: formData
            });
            const dataf = await data.json();
            console.log(dataf);
    
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
    return (
        <Stack minH="100vh">
            <Navbar />
            <ToastContainer /> {/* Add this line */}
            <Stack width="80vw" m="0 auto">
                <Flex mb="5" justifyContent="space-between" alignItems="center" width="87vw">
                    <Flex >
                        <label htmlFor={`avatar-upload-${id}`}>
                            <Avatar
                                src={image || `http://192.168.1.10:8082/api/students/image/${id}`}
                                alt="Avatar"
                                style={dis ? {} : { cursor: 'pointer' }}
                                width="100px"
                                height="100px"
                            />
                            <input
                                id={`avatar-upload-${id}`}
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => handleFieldChange(e, 0, 'profilePicture')}
                                disabled={dis}
                            />
                        </label>
                    </Flex>
                    <Flex width="7.5%" >
                        <IoReturnUpBackOutline size="35" cursor="pointer" onClick={goback} />
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
                                    <FormLabel>ClassName</FormLabel>
                                    <Input
                                        w='100%' h='10' bg='white.500' value={std.className}
                                        onChange={(e) => handleFieldChange(e, i, 'className')}
                                        disabled={dis}
                                        fontWeight="bold"
                                    />
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
                                    <Input fontWeight="bold"
                                        w='100%' h='10' bg='white.500' value={std.section} onChange={(e) => handleFieldChange(e, i, 'section')} disabled={dis}
                                    />
                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Category</FormLabel>
                                    <Input fontWeight="bold"
                                        w='100%' h='10' bg='white.500' value={std.category} onChange={(e) => handleFieldChange(e, i, 'category')} disabled={dis}
                                    />
                                </FormControl>

                                <FormControl id="name">
                                    <FormLabel>Date of birth</FormLabel>
                                    <Input fontWeight="bold"
                                        w='100%' h='10' bg='white.500' value={std.dob} onChange={(e) => handleFieldChange(e, i, 'dob')} disabled={dis}
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
                                    <Input fontWeight="bold"
                                        w='100%' h='10' bg='white.500' value={std.sex} onChange={(e) => handleFieldChange(e, i, 'sex')} disabled={dis}
                                    />
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

export default StudentDetails
