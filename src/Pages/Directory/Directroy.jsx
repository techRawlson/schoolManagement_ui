import React, { useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Stack, Table, Tbody, Td, Th, Thead, Tr, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import Navbar from '../../components/Navbar';

const UserForm = ({ formData, handleChange, handleSubmit }) => (
  <Box as="form" onSubmit={handleSubmit}>
    <Stack spacing={4}>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input type="text" name="name" value={formData.name} onChange={handleChange} />
      </FormControl>
      <FormControl id="phone" isRequired>
        <FormLabel>Phone</FormLabel>
        <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
      </FormControl>
      <FormControl id="department" isRequired>
        <FormLabel>Department</FormLabel>
        <Input type="text" name="department" value={formData.department} onChange={handleChange} />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input type="email" name="email" value={formData.email} onChange={handleChange} />
      </FormControl>
      <Flex justify="center">
        <Button type="submit" colorScheme="blue" minW="140px" mt={4}>Submit</Button>
      </Flex>
    </Stack>
  </Box>
);

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    department: '',
    email: ''
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
      email: ''
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
      email: ''
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
            <Th>Name</Th>
            <Th>Phone</Th>
            <Th>Department</Th>
            <Th>Email</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, index) => (
            <Tr key={index}>
              <Td>{user.name}</Td>
              <Td>{user.phone}</Td>
              <Td>{user.department}</Td>
              <Td>{user.email}</Td>
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

export default App;
