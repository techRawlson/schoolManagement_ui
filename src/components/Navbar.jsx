import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Button, Text, Stack, Box, Badge, Flex, Menu, MenuButton, MenuList, MenuGroup, MenuItem, MenuDivider, Center } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { FiLogOut } from "react-icons/fi";
import { Divider } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { IoNotifications } from "react-icons/io5";
import './Navbar.css'
import { useMediaQuery } from 'react-responsive';
const Navbar = () => {
  //for resposiveness
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 601px) and (max-width: 900px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 901px)' });






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
    bottom: '1.7rem',
    left: '0.9rem',
    backgroundColor: 'red',
    minHeight: '1vh',
    maxWidth: '1vw',
    borderRadius: '50%',
    cursor: 'pointer',

  }
  const mobileStyle = {
    position: 'relative',
    bottom: '1.8rem',
    left: '1.1rem',
    backgroundColor: 'red',
    minHeight: '1.4vh',
    maxWidth: '1vw',
    borderRadius: '50%',
    cursor: 'pointer'
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
            return notifi.sort((a, b) =>   new Date(b.timestamp) -new Date(a.timestamp)).filter((fil)=>fil.status==0);
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
      const response = await fetch(`http://localhost:8090/api/all/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ isRead: true }),
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
        flexDirection: isDesktop || isTablet ? 'row' : 'column',
        justifyContent: 'space-between',
        alignItems: "center",
        padding: '1.5% 0',
        width: '100vw',
        margin: '0',  // Reset margin to 0
        overflowX: 'hidden' // Hide horizontal scrollbar
      }}
    >




      {
        isDesktop || isTablet ? <span  >
          <FiLogOut onClick={() => logOut()} style={{ color: 'white', textAlign: "center", cursor: 'pointer', marginLeft: isDesktop ? '2.4rem' : '2rem' }} />
        </span> : ''
      }

      {
        isMobile ?
          <Flex justifyContent="space-between" alignItems="center" width="100vw" bgColor="light" color="white">
            <Box display="flex" justifyContent="space-around" alignItems="center" width="100%">
              <span>
                <FiLogOut onClick={() => logOut()} style={{ textAlign: "center", cursor: 'pointer', marginLeft: isDesktop ? '2.4rem' : '.08rem' }} />
              </span>
              <Text textAlign="center" >
                Student Management System
              </Text>

              <Menu>
                <Flex alignItems="center" justifyContent="space-between" padding="0 1rem" flexDir="column">
                  <Box display="flex" gap="1rem" alignItems="center" >
                    <Avatar bg="red.500" />
                    <MenuButton padding="11% 0 0 0">
                      <IoNotifications color="white" size="32" />
                      <Box style={mobileStyle} id='dot' ></Box>
                    </MenuButton>

                  </Box>
                  <span style={{ color: 'white' }}>{person}</span>



                </Flex>
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

          </Flex>
          : ''

      }

      {
        isDesktop || isTablet ? <Text textAlign="center" color="White" marginLeft="5rem">

          Student Management System
        </Text> : ''
      }


      {
        isDesktop || isTablet ? <Menu>
          <div style={gridContainerStyle}>
            <Center padding="0 1rem">
              <Flex alignItems="center" justifyContent="space-between" padding="0 1rem" gap="1rem">
                <Avatar bg="red.500" />
                <span fontSize="80%" style={{ color: 'white' }}>{person}</span>
              </Flex>
              <Box style={{ cursor: 'pointer', outline: 'none !important' }}>
                <MenuButton paddingTop="80%">
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
        </Menu> : ''
      }



    </Box>


    //
  )
}

export default Navbar
