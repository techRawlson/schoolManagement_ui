import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Button, Text, Stack, Box, Badge, Flex } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { FiLogOut } from "react-icons/fi";
import { Divider } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { IoNotifications } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  const [person, setPerson] = useState("")

  useEffect(() => {
    setPerson(localStorage.getItem('username'))
  }, [])
  const style={
    position: 'relative',
    bottom: '4.8vh',
    right: '-1vw',
    backgroundColor:'red',
    minHeight:'1.8vh',
    maxWidth:'1vw',
    borderRadius:'50%',


  }
  return (
    // <div style={{ backgroundColor: "#FFBF00" }}>
    <Stack bgColor='#2196F3' direction={['column', 'row']} style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", minWidth: '99vw', padding: '1.5%' }}     >
      <FiLogOut fontSize="4vh" onClick={() => logOut()} style={{ textAlign: "center", cursor: 'pointer' }} />

      <Text fontSize="4vh">Student Management System</Text>
      <Flex justifyContent="space-between"  alignItems="center" >
        <AvatarGroup spacing='1rem'>
          <Badge>{person}</Badge>
          <Avatar bg='red.500' />

        </AvatarGroup>
        <Box>
        <IoNotifications color="white" size="26"/>
        <Box   style={style}></Box>
        </Box>
       
      </Flex>


    </Stack>
    //
  )
}

export default Navbar
