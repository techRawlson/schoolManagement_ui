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


const ModalForm = () => {
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

    const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  const [websocketService, setWebsocketService] = useState(null);

  useEffect(() => {
    const wsService = new WebSocketService('ws://192.168.1.121:8081/websocket');
    wsService.connect();
    setWebsocketService(wsService);

    wsService.onMessage((data) => {
      setReceivedMessage(data);
    });

    // Cleanup on component unmount
    return () => {
      wsService.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (websocketService) {
      websocketService.sendMessage(message);
      setMessage('');
    } else {
      console.error('WebSocketService is not initialized');
    }
  };

  
    

    console.log(receivedMessage)
    const handleSave = (e) => {
        e.preventDefault();
        if (message.trim()) {
            sendMessage();
          } else {
            console.warn('Message is empty');
          }
       
        console.log("hello")

        if (isEditing) {
            const updatedItems = items.map((item, index) =>
                index === currentIndex ? formData : item
            );
            setItems(updatedItems);
            setIsEditing(false);


        } else {

            formData.date = date;

            setItems([...items, formData]);
        }
        setFormData({ date: "", title: "", description: "" });
        onClose();
    };

    const handleEdit = (index) => {
        setCurrentIndex(index);
        setFormData(items[index]);
        setIsEditing(true);
        onOpen();
    };

    const handleDelete = (index) => {
        const filteredItems = items.filter((_, i) => i !== index);
        setItems(filteredItems);
    };

    return (
        <>
            <Button onClick={onOpen} colorScheme="teal" position="absolute" bottom="1rem" right="1rem">
                <GoPlusCircle size="40px" />
            </Button>

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

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSave}>
                            {isEditing ? "Update" : "Save"}
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
                                    <Flex as='span' flex='1' justifyContent="space-between" alignItems='center' margin="0 1rem">
                                        <Box bg='#2E8BC0' w='100px' p={1} color='white' whiteSpace="nowrap">
                                            {item.date}
                                        </Box>
                                        {item.title}
                                        <IoArrowDownCircleOutline size="30px" />
                                    </Flex>
                                    <IconButton
                                        backgroundColor="green"
                                        color="white"
                                        aria-label="Edit"
                                        icon={<EditIcon />}
                                        onClick={() => handleEdit(index)}
                                        mr={2}
                                    />
                                    <IconButton
                                        backgroundColor="red"
                                        color="white"
                                        aria-label="Delete"
                                        icon={<DeleteIcon />}
                                        onClick={() => handleDelete(index)}
                                    />
                                </AccordionButton>

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
