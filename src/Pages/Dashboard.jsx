import React, { useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Button, Text, Stack, Box } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { PiChalkboardTeacher } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { ImBooks } from "react-icons/im";
import { MdCastForEducation } from "react-icons/md";


import { FcLeave, FcReading } from "react-icons/fc";


// import { AiOutlineUser } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
const Dashboard = () => {
  const navigate = useNavigate()
  const nextPage = (data) => {
    try {
      console.log(data)
      navigate(`/${data}`)
    } catch (error) {
      console.log(error)
    }
  }

  const role = localStorage.getItem("Role");

  console.log(role)



  return (
    <Stack minH="100vh" W="100vw" margin="0" bgColor="white">
      <Navbar />

      <SimpleGrid templateColumns='1fr 1fr 1fr' margin="0" >

        {
          role == 'student' ? "" : <Card cursor="pointer" onClick={() => nextPage("student")}>
            <CardHeader>
              <Heading size='md' textAlign="center"> Student </Heading>
            </CardHeader>
            <CardBody>

              <Stack m={18} spacing={4} display="flex"
                alignItems="center"
                justifyContent="center">
                <FcReading size={100} />
              </Stack>

            </CardBody>

          </Card>
        }


        {
          role == 'student' ? "" : <Card cursor="pointer" onClick={() => nextPage("staff")}>
            <CardHeader>
              <Heading size='md' textAlign="center"> Staff</Heading>
            </CardHeader>
            <CardBody>
              <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                <PiChalkboardTeacher size={100} />
              </Stack>
            </CardBody>

          </Card>
        }
        {
          role == 'student' ? "" : <Card cursor="pointer" onClick={() => nextPage("subjects")}>
            <CardHeader>
              <Heading size='md' textAlign="center"> Subjects</Heading>
            </CardHeader>
            <CardBody>
              <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                <ImBooks size={100} />
              </Stack>
            </CardBody>

          </Card>
        }



        <Card cursor="pointer" onClick={() => nextPage(role=='student'?'classtimetable':"timetable")}>
          <CardHeader>
            <Heading size='md' textAlign="center"> Time Table</Heading>
          </CardHeader>
          <CardBody>
            <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
              <SlCalender size={95} />
            </Stack>
          </CardBody>

        </Card>
        <Card cursor="pointer" onClick={() => nextPage(role=='student'?'studentrecord':"attendance")}>
          <CardHeader>
            <Heading size='md' textAlign="center"> Attendance</Heading>
          </CardHeader>
          <CardBody>
            <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
              <SlCalender size={95} />
            </Stack>
          </CardBody>

        </Card>
        {
          role == 'student' ? "" :<Card cursor="pointer" onClick={() => nextPage("lms")}>
          <CardHeader>
            <Heading size='md' textAlign="center"> LMS</Heading>
          </CardHeader>
          <CardBody>
            <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
              <FcLeave
                size={95} />
            </Stack>
          </CardBody>

        </Card>
        }
        







      </SimpleGrid>
    </Stack>
  )
}

export default Dashboard
