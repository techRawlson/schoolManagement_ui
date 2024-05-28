import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Button, Text, Stack, Box, Badge, Flex } from '@chakra-ui/react'
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
  const [person, setPerson] = useState("")
  const getLoggedInPerson = async () => {
    const data = await fetch(`http://localhost:8090/api/Approval/staff/${localStorage.getItem('username')}`)
    const fdata = await data.json()
    console.log(fdata)
    setPerson(fdata.staffName)
  }
  useEffect(() => {
    getLoggedInPerson()
  }, [])
  return (
    // <div style={{ backgroundColor: "#FFBF00" }}>
    <Stack bgColor='#2196F3' direction={['column', 'row']} style={{ display: 'flex', justifyContent: 'space-around', alignItems: "center", width: '100vw', padding: '1.5%' }}     >
      <Flex justifyContent="space-between" width="6%" alignItems="center">
        {/* <Badge></Badge> */}
        <Badge>{person.split(" ").at(0)}</Badge>
        <AvatarGroup spacing='1rem'>

          <Avatar bg='red.500' />

        </AvatarGroup>
      </Flex>



      <Text fontSize="4vh">Student Management System</Text>

      <FiLogOut fontSize="4vh" onClick={() => logOut()} style={{ textAlign: "center", cursor: 'pointer' }} />

    </Stack>
    //
  )
}

export default Navbar
