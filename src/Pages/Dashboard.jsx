import React, { useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Button, Text, Stack, Box } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { PiChalkboardTeacher } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { ImBooks } from "react-icons/im";
import { MdCastForEducation } from "react-icons/md";
import { FcTodoList } from "react-icons/fc";
import { FcOvertime } from "react-icons/fc";
import { FcLeave, FcReading } from "react-icons/fc";
import { FcCalendar } from "react-icons/fc";
import { DataProvider, useData } from './context/DataContext';
import { GiPoliceOfficerHead } from "react-icons/gi";
import { GoFileDirectoryFill } from "react-icons/go";
import { MdPayment } from "react-icons/md"
import { FcSms } from "react-icons/fc";
import { FaBell } from "react-icons/fa6";
import { MdBeachAccess } from "react-icons/md";

import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
const Dashboard = () => {
  const { Role, updateData } = useData();
  console.log(Role)
  const navigate = useNavigate()
  const nextPage = (data) => {
    try {
      console.log(data)
      navigate(`/${data}`)
    } catch (error) {
      console.log(error)
    }
  }





  console.log(Role)

  return (
    <Stack minH="100vh" W="100vw" margin="0"  >

      <Navbar Role={Role} ok="ok" />

      <SimpleGrid templateColumns='1fr 1fr 1fr' margin="0" >

        {
          Role == 'student' ? "" : <Card
          cursor="pointer"
          onClick={() => nextPage("student")}
          sx={{
            transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#f0f0f0', // Change this to the desired highlight color
            },
          }}
        >
       
          <CardBody>
            <Stack m={18} spacing={4} display="flex" alignItems="center" justifyContent="center">
              <FcReading size={100} />
            </Stack>
          </CardBody>
          <CardHeader>
            <Heading size='md' textAlign="center"> Student </Heading>
          </CardHeader>
        </Card>
        }


        {
          Role == 'student' ? "" : Role == 'staff' ? '' : <Card cursor="pointer" onClick={() => nextPage("staff")} sx={{
            transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#f0f0f0', // Change this to the desired highlight color
            },
          }} >
           
            <CardBody>
              <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                <PiChalkboardTeacher size={100}
                  color='teal'
                />
              </Stack>
            </CardBody>
            <CardHeader>
              <Heading size='md' textAlign="center"> Staff</Heading>
            </CardHeader>

          </Card>
        }
        {
          Role == 'student' ? "" : Role == 'staff' ? "" : <Card cursor="pointer" onClick={() => nextPage("subjects")} sx={{
            transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#f0f0f0', // Change this to the desired highlight color
            },
          }}>
            
            <CardBody>
              <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                <ImBooks size={100}
                  color='pink' />
              </Stack>
            </CardBody>
            <CardHeader>
              <Heading size='md' textAlign="center"> Subjects</Heading>
            </CardHeader>

          </Card>
        }



        <Card cursor="pointer" onClick={() => nextPage(Role == 'student' ? 'classtimetable' : "timetable")} sx={{
            transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#f0f0f0', // Change this to the desired highlight color
            },
          }}>
          
          <CardBody>
            <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
              <FcOvertime size={95} />
            </Stack>
          </CardBody>
          <CardHeader>
            <Heading size='md' textAlign="center"> Time Table</Heading>
          </CardHeader>

        </Card>
        <Card cursor="pointer" onClick={() => nextPage(Role == 'student' ? 'studentrecord' : "attendance")} sx={{
            transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#f0f0f0', // Change this to the desired highlight color
            },
          }}>
         
          <CardBody>
            <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
              <FcTodoList size={95} />
            </Stack>
          </CardBody>
          <CardHeader>
            <Heading size='md' textAlign="center"> Attendance</Heading>
          </CardHeader>

        </Card>
        {
          Role == 'student' ? "" : <Card cursor="pointer" onClick={() => nextPage("lms")} sx={{
            transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#f0f0f0', // Change this to the desired highlight color
            },
          }} >
           
            <CardBody>
              <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                <FcLeave
                  size={95} />
              </Stack>
            </CardBody>
            <CardHeader>
              <Heading size='md' textAlign="center"> LMS</Heading>
            </CardHeader>

          </Card>
        }

        {
          Role == 'student' ? "" : Role == 'staff' ? "" :
            <Card cursor="pointer" onClick={() => nextPage("role")} sx={{
              transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                backgroundColor: '#f0f0f0', // Change this to the desired highlight color
              },
            }}>
            
              <CardBody>
                <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                  <GiPoliceOfficerHead
                    size={95}
                    color='lightblue'
                  />
                </Stack>
              </CardBody>
              <CardHeader>
                <Heading size='md' textAlign="center"> Roles</Heading>
              </CardHeader>

            </Card>
        }

        <Card cursor="pointer" onClick={() => nextPage("directory")} sx={{
            transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#f0f0f0', // Change this to the desired highlight color
            },
          }}>
          
          <CardBody>
            <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
              <GoFileDirectoryFill
                color='orange'
                size={95} />
            </Stack>
          </CardBody>
          <CardHeader>
            <Heading size='md' textAlign="center"> Directory</Heading>
          </CardHeader>

        </Card>
        <Card cursor="pointer" onClick={() => nextPage("holidays")} sx={{
            transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#f0f0f0', // Change this to the desired highlight color
            },
          }} >
          
          <CardBody>
            <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
              <MdBeachAccess
                color='tomato'
                size={95} />
            </Stack>
          </CardBody>
          <CardHeader>
            <Heading size='md' textAlign="center">HOLIDAYS</Heading>
          </CardHeader>

        </Card>
        <Card cursor="pointer" onClick={() => nextPage("annoucement")} sx={{
            transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#f0f0f0', // Change this to the desired highlight color
            },
          }} >
         
          <CardBody>
            <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
              <FaBell
                color='orangered'
                size={95} />
            </Stack>
          </CardBody>
          <CardHeader>
            <Heading size='md' textAlign="center"> Annoucement</Heading>
          </CardHeader>

        </Card>
        <Card cursor="pointer" onClick={() => nextPage("fees")} sx={{
            transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#f0f0f0', // Change this to the desired highlight color
            },
          }} >
        
          <CardBody>
            <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
              <MdPayment
                color='skyblue'
                size={95} />
            </Stack>
          </CardBody>
          <CardHeader>
            <Heading size='md' textAlign="center"> fees</Heading>
          </CardHeader>

        </Card>
        <Card cursor="pointer" onClick={() => nextPage("sms")} sx={{
            transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#f0f0f0', // Change this to the desired highlight color
            },
          }} >
       
          <CardBody>
            <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
              <FcSms
                size={95} />
            </Stack>
          </CardBody>
          <CardHeader>
            <Heading size='md' textAlign="center"> sms</Heading>
          </CardHeader>

        </Card>
        



      </SimpleGrid>
    </Stack>

  )
}

export default Dashboard
