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
          Role == 'student' ? "" : <Card cursor="pointer" onClick={() => nextPage("student")} >
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
          Role == 'student' ? "" : Role == 'staff' ? '' : <Card cursor="pointer" onClick={() => nextPage("staff")} >
            <CardHeader>
              <Heading size='md' textAlign="center"> Staff</Heading>
            </CardHeader>
            <CardBody>
              <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                <PiChalkboardTeacher size={100}
                  color='teal'
                />
              </Stack>
            </CardBody>

          </Card>
        }
        {
          Role == 'student' ? "" : Role == 'staff' ? "" : <Card cursor="pointer" onClick={() => nextPage("subjects")}>
            <CardHeader>
              <Heading size='md' textAlign="center"> Subjects</Heading>
            </CardHeader>
            <CardBody>
              <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                <ImBooks size={100}
                  color='pink' />
              </Stack>
            </CardBody>

          </Card>
        }



        <Card cursor="pointer" onClick={() => nextPage(Role == 'student' ? 'classtimetable' : "timetable")} >
          <CardHeader>
            <Heading size='md' textAlign="center"> Time Table</Heading>
          </CardHeader>
          <CardBody>
            <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
              <FcOvertime size={95} />
            </Stack>
          </CardBody>

        </Card>
        <Card cursor="pointer" onClick={() => nextPage(Role == 'student' ? 'studentrecord' : "attendance")} >
          <CardHeader>
            <Heading size='md' textAlign="center"> Attendance</Heading>
          </CardHeader>
          <CardBody>
            <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
              <FcTodoList size={95} />
            </Stack>
          </CardBody>

        </Card>
        {
          Role == 'student' ? "" : <Card cursor="pointer" onClick={() => nextPage("lms")} >
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

        {
          Role == 'student' ? "" : Role == 'staff' ? "" :
            <Card cursor="pointer" onClick={() => nextPage("role")} >
              <CardHeader>
                <Heading size='md' textAlign="center"> Roles</Heading>
              </CardHeader>
              <CardBody>
                <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
                  <GiPoliceOfficerHead
                    size={95}
                    color='lightblue'
                  />
                </Stack>
              </CardBody>

            </Card>
        }

        <Card cursor="pointer" onClick={() => nextPage("directory")} >
          <CardHeader>
            <Heading size='md' textAlign="center"> Directory</Heading>
          </CardHeader>
          <CardBody>
            <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
              <GoFileDirectoryFill
                color='orange'
                size={95} />
            </Stack>
          </CardBody>

        </Card>
        <Card cursor="pointer" onClick={() => nextPage("holidays")} >
          <CardHeader>
            <Heading size='md' textAlign="center">HOLIDAYS</Heading>
          </CardHeader>
          <CardBody>
            <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
              <MdBeachAccess
                color='tomato'
                size={95} />
            </Stack>
          </CardBody>

        </Card>
        <Card cursor="pointer" onClick={() => nextPage("annoucement")} >
          <CardHeader>
            <Heading size='md' textAlign="center"> Annoucement</Heading>
          </CardHeader>
          <CardBody>
            <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
              <FaBell
                color='orangered'
                size={95} />
            </Stack>
          </CardBody>

        </Card>
        <Card cursor="pointer" onClick={() => nextPage("fees")} >
          <CardHeader>
            <Heading size='md' textAlign="center"> fees</Heading>
          </CardHeader>
          <CardBody>
            <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
              <MdPayment
                color='skyblue'
                size={95} />
            </Stack>
          </CardBody>

        </Card>
        <Card cursor="pointer" onClick={() => nextPage("sms")} >
          <CardHeader>
            <Heading size='md' textAlign="center"> sms</Heading>
          </CardHeader>
          <CardBody>
            <Stack m={18} spacing={4} display="flex" justifyContent="center" alignItems="center">
              <FcSms
                size={95} />
            </Stack>
          </CardBody>

        </Card>
        



      </SimpleGrid>
    </Stack>

  )
}

export default Dashboard
