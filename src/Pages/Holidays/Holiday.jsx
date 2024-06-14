import React, { useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Stack, Table, Tbody, Td, Th, Thead, Tr, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Select } from '@chakra-ui/react';
import Navbar from '../../components/Navbar';

const UserForm = ({ formData, handleChange, handleSubmit }) => (
  <Box as="form" onSubmit={handleSubmit}>
    <Stack spacing={4}>
      {/* <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input type="text" name="name" value={formData.name} onChange={handleChange} />
      </FormControl> */}
      <FormControl id="phone" isRequired>
        <FormLabel>Holiday</FormLabel>
        <Input type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </FormControl>
      <FormControl id="department" isRequired>
        <FormLabel>Date</FormLabel>
        <Input type="date" name="department" value={formData.department} onChange={handleChange} />
      </FormControl>
      <FormControl id="dayOfWeek" isRequired>
        <FormLabel>Day of Week</FormLabel>
        <Select name="dayOfWeek" value={formData.dayOfWeek} onChange={handleChange} placeholder="Select day">
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </Select>
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
    name: '',
    phone: '',
    department: '',
    dayOfWeek: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedUsers = users.map((user, index) => 
        index === editingIndex ? formData : user
      );
      setUsers(updatedUsers);
    } else {
      setUsers([...users, formData]);
    }
    setFormData({
      name: '',
      phone: '',
      department: '',
      dayOfWeek: ''
    });
    setEditingIndex(null);
    onClose();
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(users[index]);
    onOpen();
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const handleAddUser = () => {
    setFormData({
      name: '',
      phone: '',
      department: '',
      dayOfWeek: ''
    });
    setEditingIndex(null);
    onOpen();
  };

  return (
    <Box  minH="100vh">
  
      <Navbar/>
      <Table variant="simple">
        <Thead>
          <Tr>
            {/* <Th>Name</Th> */}
            <Th>holiday</Th>
            <Th>Date</Th>
            <Th>Day</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, index) => (
            <Tr key={index}>
              {/* <Td>{user.name}</Td> */}
              <Td>{user.phone}</Td>
              <Td>{user.department}</Td>
              <Td>{user.dayOfWeek}</Td>
              <Td>
                <Button size="sm" colorScheme="yellow" onClick={() => handleEdit(index)}>Edit</Button>
                <Button size="sm" colorScheme="red" ml={2} onClick={() => handleDelete(index)}>Delete</Button>
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
    </Box>
  );
};

export default Holiday;
