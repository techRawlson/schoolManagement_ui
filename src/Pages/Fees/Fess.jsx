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
const Fees = () => {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Navbar/>
            <ChakraProvider>
                <Flex mx="auto" p={2} borderWidth={1} borderRadius="lg" width="100vw" flexWrap="wrap" justifyContent="space-around" alignItems="center">

                    {/* Name Filter */}
                    <FormControl flexGrow="1" m="0 1%" flexBasis="18%" >
                        <FormLabel>Name</FormLabel>
                        <Input placeholder="Enter student's name" />
                    </FormControl>

                    {/* Fees Name Filter */}
                    <FormControl flexGrow="1" m="0 1%" flexBasis="18%">
                        <FormLabel>Fees Name</FormLabel>
                        <Select placeholder="Select fees type">
                            <option value="tuition">Tuition</option>
                            <option value="hostel">Hostel</option>
                            <option value="library">Library</option>
                            <option value="transport">Transport</option>
                        </Select>
                    </FormControl>

                    {/* Class Name Filter */}
                    <FormControl flexGrow="1" m="0 1%" flexBasis="18%">
                        <FormLabel>Class Name</FormLabel>
                        <Select placeholder="Select class">
                            <option value="grade1">Grade 1</option>
                            <option value="grade2">Grade 2</option>
                            <option value="grade3">Grade 3</option>
                            <option value="grade4">Grade 4</option>
                            {/* Add more classes as needed */}
                        </Select>
                    </FormControl>

                    {/* Roll Number Filter */}
                    <FormControl flexGrow="1" m="0 1%" flexBasis="18%">
                        <FormLabel>Roll Number</FormLabel>
                        <Input placeholder="Enter roll number" />
                    </FormControl>

                    {/* ID Filter */}
                    <FormControl flexGrow="1" m="0 1%" flexBasis="18%">
                        <FormLabel>ID</FormLabel>
                        <Input placeholder="Enter student ID" />
                    </FormControl>

                    {/* Amount to Pay */}
                    <FormControl flexGrow="1" m="0 1%" flexBasis="18%">
                        <FormLabel>Amount to Pay</FormLabel>
                        <Input type="number" placeholder="Enter amount" />
                    </FormControl>

                    {/* Submit Button */}
                    <FormControl flexGrow="1" m="0 1%" flexBasis="18%">
                        <FormLabel>Click to Pay</FormLabel>
                       
                        <Button colorScheme="blue" type="submit" >Pay</Button>

                    </FormControl>

                </Flex>
            </ChakraProvider>
        </div>

    );
}
export default Fees