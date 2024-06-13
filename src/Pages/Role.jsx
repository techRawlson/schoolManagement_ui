import { Box, Flex, Heading, IconButton, Select } from "@chakra-ui/react"
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { useData } from "./context/DataContext"
import { useEffect, useRef, useState } from "react"
import Navbar from "../components/Navbar"
import { IoArrowBack } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
const Role = () => {

    const [names, setNames] = useState([])
    const [roles, setRoles] = useState([])
    const [status, setStatus] = useState([])

    const [data, setData] = useState([])
    const getData = async () => {
        try {
            const data1 = await fetch('http://192.168.1.121:8081/api/Login/allUsersLog')
            if (!data1.ok) {
                throw new Error('something went wrong')
            }
            const data1Json = await data1.json()
            console.log(data1Json)
            setData(data1Json)


            const names = [...new Set(data1Json.map(elm => elm.staffName))];
            const roles = [...new Set(data1Json.map(elm => elm.role))];


            console.log(names);
            console.log(roles);
            // console.log(status);

            setNames(names)
            setRoles(roles)
            setStatus(status)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    //go back to previous page
    const navigate = useNavigate()



    const goback = () => {
        navigate(-1)
    }

    const nameRef = useRef(null)
    const roleRef = useRef(null)
    const statusRef = useRef(null)
    //filter part
    const [classData, setClassData] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({
        classData: true,
        name: "",
        role: "",
        status: "",

    });



    //data filter
    const dataFilter = () => {
        let filterData = data;

        //filter for class
        if (filters.name !== "") {
            filterData = filterData.filter(
                (ele) => ele.staffName === filters.name
            );
        }
        console.log(filterData)
        //filter for section
        if (filters.role !== "") {
            filterData = filterData.filter(
                (ele) => ele.role === filters.role
            );
        }
        console.log(filterData)
        //filter for year
        if (filters.status !== "") {
            console.log(filters.year)
            filterData = filterData.filter(
                (ele) => ele.enabled == filters.status
            );
        }
        console.log(filterData)

        setFilteredData(filterData);

        // if (filters.search) {
        //     if (searchTimeout) {
        //         clearTimeout(searchTimeout);
        //     }
        //     setSearchTimeout(
        //         setTimeout(() => {
        //             SearchData();
        //         }, 500)
        //     );
        // }
    };

    //filter change for class  query
    // const handleFilter = () => {
    //     setFilters((prev) => ({
    //         ...prev,
    //         classData: false,
    //         class: nameRef.current.value,
    //     }));
    // };
    //filter change for section  query
    const handleFilterName = () => {
        setFilters((prev) => ({
            ...prev,
            classData: false,
            name: nameRef.current.value,
        }));
    };
    //filter change for admissionYear  query
    const handleFilterRole = () => {
        setFilters((prev) => ({
            ...prev,
            classData: false,
            role: roleRef.current.value,
        }));
    };
    //filter change for admissionYear  query
    const handleFilterStatus = () => {
        setFilters((prev) => ({
            ...prev,
            classData: false,
            status: statusRef.current.value,
        }));
    };

    console.log()
    // //filter change for search input query
    // const handleSearch = () => {
    //     setFilters((prev) => ({
    //         ...prev,
    //         classData: false,
    //         search: true,
    //     }));
    // }
    useEffect(() => {
        dataFilter();
    }, [filters]);
    useEffect(() => {
        getData()

    }, [])





    return <div style={{ width: "100vw", margin: '0', padding: '0', boxSizing: 'border-box',height:'100vh'
     }} >
        <Box >
            <Navbar />
            <Flex alignItems="center" >
                <IconButton background="none" as={IoArrowBack} cursor="pointer" onClick={goback} left="2rem" />
            </Flex>
            <TableContainer >
                <Table variant='simple' >
                    <Thead>
                        <Tr>
                            <Th>
                                <Select placeholder='Name' onChange={handleFilterName} ref={nameRef}>
                                    {
                                        names?.map((session, i) => (
                                            <option value={session}>{session}</option>
                                        ))
                                    }


                                </Select>
                            </Th>
                            <Th>
                                <Select placeholder='Role' onChange={handleFilterRole} ref={roleRef}>
                                    {
                                        roles?.map((session, i) => (
                                            <option value={session}>{session}</option>
                                        ))
                                    }


                                </Select>
                            </Th>

                            <Th>
                                <Select placeholder='Status' onChange={handleFilterStatus} ref={statusRef} >

                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>




                                </Select>
                            </Th>
                            <Th>userId</Th>
                            <Th>password</Th>

                        </Tr>
                    </Thead>
                    {
                        filters.classData  ? <Tbody >
                            {
                                data?.map((elm) => (
                                    <Tr>

                                        <Td>{elm.staffName}</Td>
                                        <Td>{elm.role}</Td>
                                        <Td>{elm.enabled == true ? 'Active' : 'Inactive'}</Td>
                                        <Td>{elm.userId}</Td>
                                        <Td >{elm.password}</Td>



                                    </Tr>
                                ))
                            }


                        </Tbody> :
                            <Tbody >
                                {
                                    filteredData?.map((elm) => (
                                        <Tr>
                                            <Td>{elm.staffName}</Td>
                                            <Td>{elm.role}</Td>
                                            <Td>{elm.enabled == true ? 'Active' : 'Inactive'}</Td>
                                            <Td>{elm.userId}</Td>
                                            <Td >{elm.password}</Td>



                                        </Tr>
                                    ))
                                }


                            </Tbody>
                    }


                </Table>
            </TableContainer>
        </Box>
    </div>
}
export default Role