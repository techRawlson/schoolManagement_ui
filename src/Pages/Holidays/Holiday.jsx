import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Stack, Table, Tbody, Td, Th, Thead, Tr, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, useEditable, Toast } from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import { date } from 'yup';

const UserForm = ({ formData, handleChange, handleSubmit }) => (
  <Box as="form" onSubmit={handleSubmit}>
    <Stack spacing={4}>
      <FormControl id="name" isRequired>
        <FormLabel>Holiday</FormLabel>
        <Input type="text" name="holidayName" value={formData.holidayName} onChange={handleChange} />
      </FormControl>
      <FormControl id="department" isRequired>
        <FormLabel>Date</FormLabel>
        <Input type="date" name="date" value={formData.date} onChange={handleChange} />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Day of week</FormLabel>
        <Input type="text" name="dayOfWeek" value={formData.dayOfWeek} onChange={handleChange} />
      </FormControl>
      <Flex justify="center">
        <Button type="submit" colorScheme="blue" minW="140px" mt={4}>Submit</Button>
      </Flex>
    </Stack>
  </Box>
);

const Holiday = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    holidayName: '',
    date: '',
    dayOfWeek: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);

console.log(formData)

  const fetchEmployees = async () => {
    try {
      // Ensure the URL is properly formatted
      const response = await fetch('http://192.168.1.121:8083/holidays/all');

      // Check if the response status is OK (200)
      if (!response.ok) {
        console.log()
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON data
      const employeeData = await response.json();

      // Log the fetched data
      console.log(employeeData);

      // Update the state with the fetched data
      setUsers(employeeData);
    } catch (error) {
      // Provide a more descriptive error message
      console.error('Error fetching employee data:', error);
    }
  };







  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    const url = 'http://192.168.1.121:8083/holidays/create';
    // Log the URL to ensure it's correct
    console.log('URL:', url);
    try {
      const data = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log(data)
      setFormData({
        holidayName: '',
        date: '',
        dayOfWeek: ''
      });
      setEditingIndex(null);
      onClose();
      fetchEmployees()
    } catch (error) {
      console.log(error)
    }

  };

  const handleEdit = async (index, id) => {
    setEditingIndex(index);
    console.log(index)
    setFormData(users[index]);
    console.log(users[index])
    onOpen();
    const data = await fetch(`192.268.1.121:8083/employees/${id}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(users[index])
    });

  };

  const handleDelete = async (id) => {
    const url = `http://192.168.1.121:8083/holidays/${id}/delete`;

    try {
      // Validate the URL using the URL constructor
      new URL(url);

      const response = await fetch(url, {
        method: 'DELETE', // Assuming DELETE method for delete operation
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }




      toast.success('Deleted Successfully')
     await fetchEmployees()
    } catch (error) {
      console.error('Failed to delete:', error);
      toast.error('could not delete')
      // Optionally display an error message to the user
    }
  };


  const handleAddUser = () => {
    setFormData({
      holidayName: '',
      date: '',
      dayOfWeek: '',
    });
    setEditingIndex(null);
    onOpen();
  };




  useEffect(() => {
    fetchEmployees()
  }, [])
  return (
    <Box minH="100vh">
      <ToastContainer />
      <Navbar />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>phone</Th>
            <Th>Department</Th>

            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, index) => (
            <Tr key={index}>
              <Td>{user.holidayName}</Td>
              <Td>{user.date}</Td>
              <Td>{user.dayOfWeek}</Td>
             
              <Td>
                <Button size="sm" colorScheme="yellow" onClick={() => handleEdit(index, user.id)}>Edit</Button>
                <Button size="sm" colorScheme="red" ml={2} onClick={() => handleDelete(user.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button onClick={handleAddUser} colorScheme="blue" mb={4}>Add User</Button>
      <Modal isOpen={isOpen} onClose={() => { onClose(); setEditingIndex(null); }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingIndex !== null ? 'Edit User' : 'Add User'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UserForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleFormSubmit}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>)
};

export default Holiday;
