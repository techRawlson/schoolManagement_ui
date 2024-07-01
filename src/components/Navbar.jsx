import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Button, Text, Stack, Box, Badge, Flex, Menu, MenuButton, MenuList, MenuGroup, MenuItem, MenuDivider, Center, IconButton } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { FiLogOut } from "react-icons/fi";
import { Divider } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { IoArrowBack, IoNotifications } from "react-icons/io5";
import './Navbar.css'
import { useMediaQuery } from 'react-responsive';
import { useData } from '../Pages/context/DataContext';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import WebSocketService from './WebSocketService';
const Navbar = () => {
  //for resposiveness
  const { Role, updateData } = useData();
  const [person, setPerson] = useState("")
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 601px) and (max-width: 900px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 901px)' });
  console.log(Role)
  // console.log(ok)
  const username = localStorage.getItem("username")
  console.log(username)

  const [id, setId] = useState([])
  const [pictureId, setpictureId] = useState('')
  console.log(id)
  const getData = async () => {
    try {
      const data = await fetch(
        Role == 'staff' ?
          "http://192.168.1.121:8083/api/staff/saved-Staff" :
          "http://192.168.1.121:8082/api/students/savedData"

      );
      const fdata = await data.json();
      console.log(fdata)
      // setClassData(fdata)
      const staffId = fdata.filter((elm) => elm.staffId == username)
      const studentId = fdata.filter((elm) => elm.studentId == username)
      console.log(staffId)
      console.log(studentId)
      const ids = Role == 'staff' ? staffId : studentId
      console.log(ids)
      setPerson(ids[0]?.name)
      const i = ids[0]?.id
      const p=Role == 'staff' ?ids[0]?.staffId:ids[0]?.studentId
      console.log(p)
      setpictureId(p)
      
      console.log(ids)
      setId(i)
    } catch (error) {
      console.log(error)
    }
  }


console.log(pictureId)



  const nextPage = (data) => {
    try {
      console.log("data")
      navigate(`/${data}`)
    } catch (error) {
      console.log(error)
    }
  }




  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('staffname')
    navigate('/login')
  }


  // useEffect(() => {
  //   setPerson(localStorage.getItem('username'))
  // }, [])
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








  useEffect(() => {
    // Function to subscribe to notifications from the first API
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
              const updatedNotifications = [...prevNotifications, data];
              return updatedNotifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).filter((notification) => notification.read === 0);
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

    // Function to subscribe to notifications from the second API (documents)
    const getDocumentNotification = () => {
      try {
        const eventSource = new EventSource(`http://192.168.1.121:8082/api/documents/stream`);

        eventSource.onmessage = (event) => {
          console.log("New document notification received");
          const data = JSON.parse(event.data);
          console.log(data);
          // Handle document notifications similarly to how you handle regular notifications
          // Update 'setNotifications' state based on your requirements
          setNotifications([...notifications,data.document]);
        };

        eventSource.onerror = (error) => {
          console.error('EventSource for documents failed: ', error);
          eventSource.close();

          // Attempt to reconnect after 5 seconds
          // setTimeout(() => {
          //   getDocumentNotification();
          // }, 5000);
        };
      } catch (error) {
        console.error('Failed to initialize EventSource for documents:', error);
      }
    };

    // Call both functions to subscribe to notifications
    getNotification();
    getDocumentNotification();

    
    // Clean up function to close EventSource connections
    return () => {
      // Close EventSource connections when component unmounts or is updated
      // This ensures no memory leaks or open connections
      // eventSource.close(); // Close eventSource connections here if needed
    };
  }, [staffName]);














  console.log(notifications)



  const handleNotificationClick = async (id) => {

    console.log(id)
    //this code is for leave application notification
    // try {
    //   const response = await fetch(`http://localhost:8090/api/all/read`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     // body: JSON.stringify({ isRead: true }),
    //   });

    //   if (!response.ok) {
    //     throw new Error(`Error: ${response.status} ${response.statusText}`);
    //   }
    //   getNotification()
    //   // Optionally, you might want to refresh the notifications list here

    //   navigate("/lmsleaveapproval", { replace: true });
    // } catch (error) {
    //   console.error('Failed to update notification:', error);
    // }

    navigate('/annoucement')

    




  };



  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    padding: '0.5rem',
    // backgroundColor: '#1a202c',
    borderRadius: '8px',
  };

  useEffect(() => {
    getData()
  }, [Role])


 


  const goback = () => {
      navigate(-1)
  }

  
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
        isDesktop || isTablet ? <span  style={{ display:'flex',alignItems:'center'}}>
                <IconButton as={IoArrowBack} cursor="pointer" onClick={goback} size="sm" m='2vw'  background='#2196F3' justifyContent='center' textAlign='center'/>
          <FiLogOut as={Button} onClick={() => logOut()} style={{ color: 'white', textAlign: "center", cursor: 'pointer', marginLeft: isDesktop ? '2.4rem' : '2rem'}} />
    

        </span> : ''
      }

      {
        isMobile ?
          <Flex justifyContent="space-between" alignItems="center" width="100vw" bgColor="light" color="white">
            <Box display="flex" justifyContent="space-around" alignItems="center" width="100%">
              <span>
                <FiLogOut onClick={() => logOut()} style={{ textAlign: "center", cursor: 'pointer', marginLeft: isDesktop ? '2.4rem' : '.08rem' }} />
              </span>
              <Text textAlign="center"  >
                Rawlson Technologies
              </Text>

              <Menu>
                <Flex alignItems="center" justifyContent="space-between" padding="0 1rem" flexDir="column">
                  <Box display="flex" gap="1rem" alignItems="center" >
                    <Avatar bg="red.500" onClick={() => nextPage("hello")} />
                    <MenuButton padding="9% 0 0 0">
                      <IoNotifications color="white" size="32" />

                      {
                        notifications.length > 0 ? <Box style={mobileStyle} id='dot' ></Box> : ''
                      }


                    </MenuButton>

                  </Box>
                  <span style={{ color: 'white' }} >{person}</span>



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
        isDesktop || isTablet ? <Text textAlign="center" marginLeft="5rem" color='green.9000'>

          Rawlson Technologies
        </Text> : ''
      }


      {
        isDesktop || isTablet ? <Menu>
          <div style={gridContainerStyle}>
            <Center padding="0 1rem">
              <Flex alignItems="center" justifyContent="space-between" padding="0 1rem" gap="1rem">

                <ChakraLink
                  as={ReactRouterLink}
                  to={Role === 'student' ? `/studentdetails/${id}` : `/staffdetails/${id}`}

                >
                  <Avatar cursor="pointer" src={Role=='staff'?`http://192.168.1.121:8083/api/staff-images/${pictureId}`:`http://192.168.1.121:8082/api/images/${pictureId}`} />
                </ChakraLink>
                <span fontSize="80%" style={{ color: 'white' }}>{person}</span>
              </Flex>
              <Box style={{ cursor: 'pointer', outline: 'none !important' }}>
                <MenuButton paddingTop="32%" mr="1rem">
                  <IoNotifications size="32" color="yellow" />
                  {
                    notifications?.length > 0 ? <Box style={style} id='dot' ></Box> : ''
                  }

                </MenuButton>

              </Box>
            </Center>
          </div>

          <MenuList>
            <MenuGroup title='Notifications'>
              {notifications?.map((notification, index) => (
                <MenuItem
                  key={index}
                  as='a'
                  href='#'
                  bgColor={notification.read ? "#f0f0f0" : "#e0f7fa"}
                  color={notification.read ? "#6c757d" : "inherit"}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  {notification.title} 
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
