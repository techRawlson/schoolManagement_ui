// ModalForm.js
import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useDisclosure,
    Box,
    List,
    ListItem,
    ListIcon,
    IconButton,
    AccordionItem,
    AccordionButton,
    Flex,
    AccordionPanel,
    Accordion,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { GoPlusCircle } from "react-icons/go";
import WebSocketService from "../../components/WebSocketService";
import { useData } from "../context/DataContext";


const ModalForm = () => {
    const { Role, updateData } = useData();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [date, setDate] = useState('');
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({ date: '', title: "", description: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    // Set default date to today's date
    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setDate(formattedDate);
    }, []);

    const [message, setMessage] = useState('i am the king');
    const [receivedMessage, setReceivedMessage] = useState('');
    const [websocketService, setWebsocketService] = useState(null);

    // useEffect(() => {
    //     // Create a new instance of WebSocketService
    //     const wsService = new WebSocketService('ws://192.168.1.121:8081/websocket');

    //     // Connect to the WebSocket server
    //     wsService.connect();

    //     // Set the WebSocketService instance in state
    //     setWebsocketService(wsService);

    //     // Listen for incoming messages
    //     wsService.onMessage((data) => {
    //         console.log('Received:', data);
    //         setReceivedMessage(data); // Update state with received message
    //     });

    //     // Cleanup on component unmount
    //     return () => {
    //         wsService.disconnect(); // Disconnect WebSocket when component unmounts
    //     };
    // }, []); // Empty dependency array ensures this effect runs only once on component mount

    const sendMessage = () => {
        if (websocketService) {
            console.log('Sending message:', message);
            websocketService.sendMessage(message); // Send message via WebSocketService
        } else {
            console.error('WebSocketService is not initialized');
        }
    };


    console.log(receivedMessage)
    const [files, setFiles] = useState([]);

    const handleSave = async (e) => {
        const data = new FormData();
        // Assuming date is a Date object
        data.append('date', date); // Using ISO string format
        // Adding other formData fields
        data.append('title', formData.title);
        data.append('description', formData.description);
        console.log(files)
        for (let i = 0; i < files.length; i++) {
            data.append('file', files[i]);
        }
        try {
            const response = await fetch('http://192.168.1.121:8082/api/documents/create', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                body: data
                // body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorResponseData = await response.json();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${JSON.stringify(errorResponseData)}`);
            }

            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.error('Error:', error);
        }



        setFormData({
            holidayName: '',
            date: '',
            dayOfWeek: ''
        });
        setFormData({ date: "", title: "", description: "" });
        onClose();
    }
    // console.log(formData1)

    const handleEdit = (index) => {
        setCurrentIndex(index);
        setFormData(items[index]);
        setIsEditing(true);
        onOpen();
    };

    const handleDelete = async (id) => {
        console.log(id);

        try {
            const response = await fetch(`http://192.168.1.121:8082/api/documents/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            // const result = await response.json();
            // console.log(result);
            await fetchEmployees()

        } catch (error) {
            console.error('There was an error with the deletion:', error);
        }
    };

    const fetchEmployees = async () => {
        console.log("here before fetching")
        try {
            // Ensure the URL is properly formatted
            const response = await fetch('http://192.168.1.121:8082/api/documents/all');

            // Check if the response status is OK (200)
            if (!response.ok) {
                console.log(response)
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log(response)
            // Parse the JSON data
            const employeeData = await response.json();

            // Log the fetched data
            console.log(employeeData);

            // Update the state with the fetched data
            setItems(employeeData);
        } catch (error) {
            // Provide a more descriptive error message
            console.error('Error fetching employee data:', error);
        }
    };
    useEffect(() => {
        fetchEmployees()
    }, [])




    const handleFileChange = (event) => {
        const fileList = event.target.files; // Access the FileList object

        // Log the FileList object to see its contents
        console.log(fileList);

        // You can loop through fileList if multiple files are selected
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            console.log(`File ${i + 1}:`, file.name, file.size, file.type);
            // Perform further actions like uploading files, storing file information, etc.
        }
        setFiles(fileList)
    };
    const handleDownload = (id) => {
        const downloadUrl = `http://192.168.1.121:8082/api/documents/download/${id}`;
        fetch(downloadUrl)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `file_${id}`); // No specific extension
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch(error => console.error('Error downloading file:', error));
    };



    return (
        <>{
            Role == 'admin' ? <Button onClick={onOpen} colorScheme="teal" position="absolute" bottom="1rem" right="1rem">
                <GoPlusCircle size="40px" />
            </Button> : ''
        }


            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Enter Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Date</FormLabel>
                            <Input
                                type="date"
                                name="date"
                                value={date}
                                // onChange={handleChange}
                                disabled
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Title</FormLabel>
                            <Input
                                type="text"
                                name="title"
                                placeholder="Enter title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                name="description"
                                placeholder="Enter description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </ModalBody>

                    <FormControl mt={4} as="form" encType="multipart/form-data">
                        <FormLabel htmlFor="fileInput">Upload a file:</FormLabel>
                        <input
                            type="file"
                            id="fileInput"
                            name="file"
                            accept=".pdf, .doc, .docx, .xls, .xlsx, image/*" // Adjust as needed
                            multiple // Allow multiple file selection
                            onChange={handleFileChange} // Handle file change event
                        />
                    </FormControl>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSave}>
                            {isEditing ? "Update" : "Publish"}
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Box mt={4}>



                <Accordion defaultIndex={[0]} allowMultiple>

                    {items.map((item, index) => (
                        <AccordionItem padding="0 1rem">
                            <h2>
                                <AccordionButton>
                                    <Flex as='span' flex='1' justifyContent="space-between" alignItems='center' margin="0 1rem" textAlign='center'>
                                        <Box bg='#2E8BC0' w='100px' p={1} color='white' whiteSpace="nowrap">
                                            {item.date}
                                        </Box>
                                        <p>{item.title}</p>


                                    </Flex>

                                    <Flex flex='1' justifyContent='flex-end'>
                                        <IconButton
                                            mr='3rem'
                                            backgroundColor="green"
                                            color="white"
                                            fontSize='24px'
                                            fontWeight='bolder'
                                            aria-label="Delete"
                                            icon={<IoArrowDownCircleOutline />}
                                            onClick={() => handleDownload(item.id)}
                                        />
                                        {
                                            Role == 'admin' ? <IconButton
                                                backgroundColor="red"
                                                color="white"
                                                aria-label="Delete"
                                                icon={<DeleteIcon />}
                                                onClick={() => handleDelete(item.id)}
                                            /> : ''
                                        }

                                    </Flex>


                                </AccordionButton>
                                {/* <Button onClick={() => handleDownload(item.id)}>download</Button> */}
                            </h2>
                            <AccordionPanel pb={2} textAlign="center">
                                {item.description}
                                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae aperiam commodi beatae necessitatibus autem earum rem modi voluptatem voluptatibus accusamus, mollitia dignissimos magnam corrupti facilis, nam error quas omnis sequi! */}

                            </AccordionPanel>
                        </AccordionItem>

                    ))}

                </Accordion>

            </Box>
        </>
    );
};

export default ModalForm;
