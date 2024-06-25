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
    Textarea,
} from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';
const Fees = () => {
    const [studentId, setstudentId] = useState('')
    const [comment, setComment] = useState("")
    const [rollNumber, setrollNumber] = useState([])
    const [className, setClassName] = useState([])
    const [studentName, setClassData] = useState([])
    const [fathersName, setFathersName] = useState([])
    const [amountPay, setamountPay] = useState(null)
    const getData = async () => {
        try {
            const data = await fetch("http://192.168.1.121:8082/api/students/savedData");
            const fdata = await data.json();
            console.log(fdata)
            setClassData(fdata)
            const father = []


        } catch (error) {
            console.log(error)
        }
    }
    console.log(fathersName)
    console.log(studentName)
    useEffect(() => {
        getData()
    }, [])






    //for actual values
    const [rNumber, setRnumber] = useState(null)
    const [cname, setCname] = useState("")
    const [name, setname] = useState("")
    const [fName, setFname] = useState("")
    const change = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        // window.location.reload()
        if (e.target.name == 'studentName') {
            const arr = [];
            console.log(studentName)
            const fathers = studentName.filter((elm) => {
                if (elm.name == e.target.value)
                    arr.push(elm)
            })
            console.log(arr)
            setname(e.target.value)
            setFathersName(arr.map(elm => elm.fathersName));
            setClassName([])
            setrollNumber([])
            setstudentId("")
        } else if (e.target.name == 'fathersName') {
            // setClassName
            const arr = [];
            console.log(fathersName)
            const fathers = studentName.filter((elm) => {
                if (elm.fathersName == e.target.value && elm.name == name)
                    arr.push(elm)
            })
            console.log(arr)
            setFname(e.target.value)
            setClassName(arr.map(elm => elm.className));

        } else if (e.target.name == 'className') {
            // setClassName
            console.log("inside className")
            const arr = [];
            console.log(fathersName)
            const fathers = studentName.filter((elm) => {
                if (elm.className == e.target.value && elm.name == name && elm.fathersName == fName)
                    arr.push(elm)
            })
            console.log(arr)
            setCname(e.target.value)
            console.log(arr)
            setrollNumber(arr.map(elm => elm.rollNumber))

        } else if (e.target.name == 'rollNumber') {
            console.log("inside rolll", e.target.value)
            const arr = [];
            console.log(fathersName)
            const fathers = studentName.filter((elm) => {
                if (elm.rollNumber == e.target.value && elm.name == name && elm.className == cname && elm.fathersName == fName)
                    arr.push(elm)
            })
            console.log(arr)
            setRnumber(e.target.value)
            setstudentId(arr.map(elm => elm.studentId))

        }
    }
    console.log(rNumber)
    console.log(cname)
    console.log(name)
    console.log(fName)












    const pay = async () => {
        const body = {
            name: name,
            fathersName: fName,
            className: cname,
            rollNumber: rNumber,
            studentId: studentId,
            amount: amountPay,
            comment: comment
        }
        console.log(body)
        //	099eb0cd-02cf-4e2a-8aca-3e6c6aff0399
        // Merchant ID: PGTESTPAYUAT
        try {
            const response = await fetch('http://localhost:3000/proxy/apis/pg-sandbox', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Merchant-ID': 'PGTESTPAYUAT',
                },
                body: JSON.stringify({
                    merchantId: 'PGTESTPAYUAT',
                    merchantTransactionId: 'txn12345', // Unique transaction ID
                    merchantUserId: 'user123', // Unique user ID
                    amount: 10000, // Amount in paisa (e.g., 10000 paisa = 100 INR)
                    redirectUrl: 'https://your-website.com/payment-callback',
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data);
            // Handle success response
            // Redirect the user to the payment URL or handle the payment token
    
        } catch (error) {
            console.error('Failed to initiate payment:', error);
            // Handle error response
        }
        
        
        // // Call the function to initiate payment
        // initiatePayment();
        
        //https://api-preprod.phonepe.com/apis/pg-sandbox

    };


    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Navbar />
            <ChakraProvider>
                <Flex mx="auto" p={2} borderWidth={1} flexWrap="wrap" justifyContent="space-around" alignItems="center">

                    {/* Name Filter */}
                    <FormControl flex="1" m="0 1%">
                        <FormLabel>Name</FormLabel>
                        <Select placeholder="Select name" name='studentName' onChange={(e) => change(e)}>
                            {studentName.map((elm) =>
                                <option value={elm.name}>{elm.name}</option>
                            )}


                        </Select>
                    </FormControl>
                    {/* fathersName */}
                    {/* Father Name Filter */}
                    <FormControl flex="1" m="0 1%">
                        <FormLabel>Father's Name</FormLabel>
                        <Select placeholder="Select" name='fathersName' onChange={(e) => change(e)}>
                            {fathersName.map((elm) =>
                                <option value={elm}>{elm}</option>
                            )}


                        </Select>
                    </FormControl>



                    {/* Class Name Filter */}
                    <FormControl flex="1" m="0 1%">
                        <FormLabel>Class Name</FormLabel>
                        <Select placeholder="Select class" name='className' onChange={(e) => change(e)}>
                            {className.map((elm) =>
                                <option value={elm}>{elm}</option>
                            )}


                        </Select>
                    </FormControl>

                    {/* Roll Number Filter */}
                    <FormControl flex="1" m="0 1%">
                        <FormLabel>Roll Number</FormLabel>
                        <Select placeholder="Select class" name='rollNumber' onChange={(e) => change(e)}>
                            {rollNumber.map((elm) =>
                                <option value={elm}>{elm}</option>
                            )}

                        </Select>
                    </FormControl>

                    {/* ID Filter */}
                    <FormControl flex="1" m="0 1%" name='studentId' onChange={(e) => change(e)}>
                        <FormLabel>ID</FormLabel>
                        <Input value={studentId} disabled border='1px solid' fontWeight='bolder' />
                    </FormControl>

                    {/* Amount to Pay */}
                    <FormControl flex="1" m="0 1%">
                        <FormLabel>Amount to Pay</FormLabel>
                        <Input type="number" placeholder="Enter amount" name='amount' onChange={(e) => setamountPay(e.target.value)} />
                    </FormControl>
                  

                    {/* Submit Button */}
                    <FormControl flex="1" m="0 1%">
                        <FormLabel>Click to Pay</FormLabel>
                        <Button colorScheme="blue" type="submit" onClick={pay}>Pay</Button>
                    </FormControl>

                </Flex>
                <FormControl  m="0 1%" maxW='20%'>
                        <FormLabel>Comment</FormLabel>
                        <Textarea type="text" placeholder="write your comment here" name='comment' onChange={(e) => setComment(e.target.value)} />
                    </FormControl>



            </ChakraProvider>
        </div>

    );
}
export default Fees