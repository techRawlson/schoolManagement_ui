import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Button, Text, Stack, Box, Badge, Flex, Menu, MenuButton, MenuList, MenuGroup, MenuItem, MenuDivider } from '@chakra-ui/react'
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
      const sortedAccToTime=getjson.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
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





  return (
    // <div style={{ backgroundColor: "#FFBF00" }}>
    <Stack bgColor='#2196F3' direction={['column', 'row']} style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", minWidth: '100vw', padding: '1.5%' }}     >
      <FiLogOut fontSize="4vh" onClick={() => logOut()} style={{ textAlign: "center", cursor: 'pointer' }} />

      <Text fontSize="4vh">Student Management System</Text>


      <Menu>
        <AvatarGroup spacing='1rem'>
          <Badge>{person}</Badge>
          <Avatar bg='red.500' />
          <MenuButton colorScheme='pink'>
            <Box style={{ cursor: 'pointer' }}  >
              <IoNotifications color="white" size="26" />
              <Box style={style}></Box>
            </Box>
          </MenuButton>
        </AvatarGroup>

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
                      bgColor="#f0f0f0" // Correcting the color for read notifications
                      color="#6c757d"
                      onClick={() => handleNotificationClick(notification.id)
                      }
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
                      onClick={() => handleNotificationClick(notification.id)
                      }
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
    </Stack >
    //
  )
}

export default Navbar
