import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Button, Text, Stack, Box } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { FiLogOut } from "react-icons/fi";
import { Divider } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <div style={{ backgroundColor: "#FFBF00" }}>
      <Stack direction={['column', 'row']} style={{ display: 'flex', justifyContent: 'space-around', alignItems: "center", width: "100vw" }} mb={5} mt={5}   >

        <AvatarGroup spacing='1rem'>
          <Avatar bg='red.500' />
        </AvatarGroup>

        <Box w='50%' h='40px' style={{ textAlign: "center" }} >
          <Text fontSize="4vh">Student Management System</Text>
        </Box>


        <FiLogOut size="30px" onClick={() => logOut()} style={{ textAlign: "center", cursor: 'pointer' }} />

      </Stack>
      <Divider color="black" borderWidth="2px" mt="1%" mb="2%" width="96%" alignSelf="center" orientation="horizontal" marginX="auto" />
    </div>
  )
}

export default Navbar
