import {
    ChakraProvider,
    Box,
    VStack,
    Select,
    FormControl,
    FormLabel,
    Input,
    Button,
    HStack,
    Flex,
} from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';
const Fees = () => {


    const [studentName, setClassData] = useState([])
    const [fathersName, setFathersName] = useState([])
    const getData = async () => {
        try {
            const data = await fetch("http://192.168.1.121:8082/api/students/savedData");
            const fdata = await data.json();
            console.log(fdata)
            setClassData(fdata)
            // const father=
        } catch (error) {
            console.log(error)
        }
    }

    console.log(studentName)
    useEffect(() => {
        getData()
    }, [])























    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Navbar />
            <ChakraProvider>
                <Flex mx="auto" p={2} borderWidth={1} flexWrap="wrap" justifyContent="space-around" alignItems="center">

                    {/* Name Filter */}
                    <FormControl flex="1" m="0 1%">
                        <FormLabel>Name</FormLabel>
                        <Input placeholder="Enter student's name" />
                    </FormControl>

                    {/* Father Name Filter */}
                    <FormControl flex="1" m="0 1%">
                        <FormLabel>Father's Name</FormLabel>
                        <Input placeholder="Enter father's name" />
                    </FormControl>



                    {/* Class Name Filter */}
                    <FormControl flex="1" m="0 1%">
                        <FormLabel>Class Name</FormLabel>
                        <Select placeholder="Select class">
                            <option value="grade1">Grade 1</option>

                        </Select>
                    </FormControl>

                    {/* Roll Number Filter */}
                    <FormControl flex="1" m="0 1%">
                        <FormLabel>Roll Number</FormLabel>
                        <Input placeholder="Enter roll number" />
                    </FormControl>

                    {/* ID Filter */}
                    <FormControl flex="1" m="0 1%">
                        <FormLabel>ID</FormLabel>
                        <Input placeholder="Enter student ID" />
                    </FormControl>

                    {/* Amount to Pay */}
                    <FormControl flex="1" m="0 1%">
                        <FormLabel>Amount to Pay</FormLabel>
                        <Input type="number" placeholder="Enter amount" />
                    </FormControl>

                    {/* Submit Button */}
                    <FormControl flex="1" m="0 1%">
                        <FormLabel>Click to Pay</FormLabel>
                        <Button colorScheme="blue" type="submit">Pay</Button>
                    </FormControl>

                </Flex>



            </ChakraProvider>
        </div>

    );
}
export default Fees