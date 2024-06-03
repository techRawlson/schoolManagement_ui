import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Button, Text, Stack, Box, Badge, Flex, Menu, MenuButton, MenuList, MenuGroup, MenuItem, MenuDivider, Center } from '@chakra-ui/react'
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
  const style = {
    position: 'relative',
    bottom: '4.4vh',
    right: '-1.05vw',
    backgroundColor: 'red',
    minHeight: '1.8vh',
    maxWidth: '1vw',
    borderRadius: '50%',
    cursor: 'pointer',

  }
  const [notifications, setNotifications] = useState([]);
  const [staffName, setStaffName] = useState(localStorage.getItem("staffName"));


  const getNotification = async () => {
    try {
      const get = await fetch(`http://localhost:8090/api-notifications/${staffName}`)
      const getjson = await get.json()
      const sortedAccToTime = getjson.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      console.log(sortedAccToTime)
      setNotifications(sortedAccToTime)
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    getNotification()
  }, [])





  console.log(notifications)
  notifications.map((not) => console.log(not.message))



  const handleNotificationClick = async (id) => {
    try {



      const updateToRead = await fetch(`http://localhost:8090/api-notifications/markAsRead/${id}`, {
        method: 'PUT',
        body: {
          isRead: true,
        }
      })
      navigate("/lmsleaveapproval", { replace: true })
      await getNotification()
    } catch (error) {
      console.log(error)
    }


  };

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gridGap: '10px',
  }



  return (
    // //<div style={{ backgroundColor: "#FFBF00" }}>
    <Box
      fontSize="150%"
      bgColor='#2196F3'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: "center",
        padding: '1.5% 0',
        width: '100vw',
        margin: '0',  // Reset margin to 0
        overflowX: 'hidden' // Hide horizontal scrollbar
      }}
    >
     
<Text>
<FiLogOut onClick={() => logOut()} style={{ textAlign: "center", cursor: 'pointer',marginLeft:'2.4rem' }}  />
</Text>
      <Text textAlign="center" >
      
        Student Management System
        </Text>

      <Menu>

      <div style={gridContainerStyle}>
      <Center padding="0 1rem">
        <Flex alignItems="center" justifyContent="space-between" padding="0 1rem">
          <Text color="white" fontSize="80%">{person}</Text>
          <Avatar bg="yellow.500"></Avatar>
        </Flex>
        <Box style={{ cursor: 'pointer', outline: 'none !important' }}>
          <IoNotifications color="white" size="26" />
          <Box style={style}></Box>
        </Box>
      </Center>
    </div>

        <MenuList>
          <MenuGroup title='Notifications'>
            {
              notifications.map((notification, index) => {
                if (notification.read === true) {
                  return (
                    <MenuItem
                      key={index}
                      as='a'
                      href='#'
                      bgColor="#f0f0f0"
                      color="#6c757d"
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      {notification.message} from {notification.staffName}
                    </MenuItem>
                  );
                } else {
                  return (
                    <MenuItem
                      key={index}
                      as='a'
                      href='#'
                      bgColor="#e0f7fa"
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      {notification.message} from {notification.staffName}
                    </MenuItem>
                  );
                }
              })
            }
          </MenuGroup>
        </MenuList>
      </Menu>
    </Box>


    //
  )
}

export default Navbar
