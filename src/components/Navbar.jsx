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
    bottom: '2rem',
    left: '1rem',
    backgroundColor: 'red',
    minHeight: '2vh',
    maxWidth: '1vw',
    borderRadius: '50%',
    cursor: 'pointer',

  }
  const [notifications, setNotifications] = useState([]);
  const staffName = encodeURIComponent(localStorage.getItem("staffName"));

  




  const getNotification = () => {
    try {
      const eventSource = new EventSource(`http://localhost:8090/api/notifications/stream/${staffName}`);
  
      eventSource.onmessage = (event) => {
        console.log("New notification received");
        const data = JSON.parse(event.data);
        console.log(data);
        setNotifications((prevNotifications) => {
          const notificationSet = new Set(prevNotifications.map(notification => notification.id));
          if (!notificationSet.has(data.id)) {
            // Add the new notification only if its ID is not already in the set
            const notifi = [...prevNotifications, data];
            return notifi.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
          }
          return prevNotifications; // If the notification already exists, return the previous state
        });
      };
  
      eventSource.onerror = (error) => {
        console.error('EventSource failed: ', error);
        eventSource.close();
  
        // Attempt to reconnect after 5 seconds
        // setTimeout(() => {
        //   getNotification(staffName, setNotifications);
        // }, 5000);
      };
    } catch (error) {
      console.error('Failed to initialize EventSource:', error);
    }
  };
  

  useEffect(() => {
    if (staffName) {
      getNotification();
    } else {
      console.error("Staff name is undefined or null");
    }
  }, [staffName]);




  console.log(notifications)
  notifications.map((not) => console.log(not.message))



  const handleNotificationClick = async (id) => {
    
  console.log(id)
    try {
      const response = await fetch(`http://localhost:8090/api/${id}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRead: true }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      getNotification()
      // Optionally, you might want to refresh the notifications list here
  
      navigate("/lmsleaveapproval", { replace: true });
    } catch (error) {
      console.error('Failed to update notification:', error);
    }
  };

 

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    padding: '0.5rem',
    // backgroundColor: '#1a202c',
    borderRadius: '8px',
  };

  
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
            <Avatar bg="yellow.500" />
          </Flex>
          <Box style={{ cursor: 'pointer', outline: 'none !important' }}>
            <MenuButton>
              <IoNotifications color="white" size="30" />
              <Box style={style} id='dot' ></Box>
            </MenuButton>
           
          </Box>
        </Center>
      </div>

      <MenuList>
        <MenuGroup title='Notifications'>
          {notifications.map((notification, index) => (
            <MenuItem
              key={index}
              as='a'
              href='#'
              bgColor={notification.read ? "#f0f0f0" : "#e0f7fa"}
              color={notification.read ? "#6c757d" : "inherit"}
              onClick={() => handleNotificationClick(notification.id)}
            >
              {notification.message} from {notification.staffName}
            </MenuItem>
          ))}
        </MenuGroup>
      </MenuList>
    </Menu>
  
    </Box>


    //
  )
}

export default Navbar
