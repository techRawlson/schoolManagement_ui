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
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { IoArrowBack } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
const Role = () => {



    
    const [data, setData] = useState([])
    const getData = async () => {
        try {
            const data1 = await fetch('http://3.110.94.137:8081/api/Login/allUsersLog')
            if (!data1.ok) {
                throw new Error('something went wrong')
            }
            const data1Json = await data1.json()
            console.log(data1Json)
            setData(data1Json)
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


    //filter part
    const [classData, setClassData] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({
        classData: true,
        class: "",
        section: "",
        year: "",
        search: false,
    });



    //data filter
    const dataFilter = () => {
        let filterData = classData;

        //filter for class
        if (filters.class !== "") {
            filterData = filterData.filter(
                (ele) => ele.className === filters.class
            );
        }

        //filter for section
        if (filters.section !== "") {
            filterData = filterData.filter(
                (ele) => ele.section === filters.section
            );
        }
        //filter for year
        if (filters.year !== "") {
            console.log(filters.year)
            filterData = filterData.filter(
                (ele) => ele.session == filters.year
            );
        }
        console.log(filterData)
        if (!filters.search) {
            setFilteredData(filterData);
        }
        if (filters.search) {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            setSearchTimeout(
                setTimeout(() => {
                    SearchData();
                }, 500)
            );
        }
    };

    //filter change for class  query
    const handleFilter = () => {
        setFilters((prev) => ({
            ...prev,
            classData: false,
            class: filterRef.current.value,
        }));
    };
    //filter change for section  query
    const handleFiltersection = () => {
        setFilters((prev) => ({
            ...prev,
            classData: false,
            section: ageRef.current.value,
        }));
    };
    //filter change for admissionYear  query
    const handleFilterYear = () => {
        setFilters((prev) => ({
            ...prev,
            classData: false,
            year: admYearRef.current.value,
        }));
    };
    //filter change for search input query
    const handleSearch = () => {
        setFilters((prev) => ({
            ...prev,
            classData: false,
            search: true,
        }));
    }
    useEffect(() => {
        dataFilter();
    }, [filters]);
    useEffect(() => {
        getData()

    }, [])





    return <div style={{ width: "100vw", margin: '0', padding: '0', boxSizing: 'border-box' }} >
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
                                <Select placeholder='Name' onChange={handleFilterYear} >
                                    {/* {
                                    Name?.map((session, i) => (
                                        <option value={session}>{session}</option>
                                    ))
                                } */}


                                </Select>
                            </Th>
                            <Th>
                                <Select placeholder='Role' onChange={handleFilterYear} >
                                    {/* {
                                    roles?.map((session, i) => (
                                        <option value={session}>{session}</option>
                                    ))
                                } */}


                                </Select>
                            </Th>

                            <Th>
                                <Select placeholder='Status' onChange={handleFilterYear} >
                                    {/* {
                                    status?.map((session, i) => (
                                        <option value={session}>{session}</option>
                                    ))
                                } */}


                                </Select>
                            </Th>
                            <Th>userId</Th>
                            <Th>password</Th>
                          
                        </Tr>
                    </Thead>
                    <Tbody >
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


                    </Tbody>

                </Table>
            </TableContainer>
        </Box>
    </div>
}
export default Role