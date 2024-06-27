import { Box, Center, Flex, Heading, IconButton, Select, Spinner, Switch } from "@chakra-ui/react"
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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
const Role = () => {

    const [names, setNames] = useState([])
    const [roles, setRoles] = useState([])
    const [status, setStatus] = useState([])
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])
    const getData = async () => {
        try {
            setLoading(true);
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
        finally {
            setLoading(false);
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
        active: "",

    });



    //data filter
    const dataFilter = () => {
        let filterData = data;
console.log(filters)
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
        if (filters.active !== "") {
            console.log(filters.active);
            console.log(filters);
            filterData = filterData.filter((ele) => {
                console.log(ele.active);
                return ele.active === (filters.active === 'true');
            });
        }

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
            active: statusRef.current.value,
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

    console.log(data)






    const toggleSwitch = async (userId, stat) => {
        try {
            // Set loading state to true
            setLoading(true);

            // Params for the URLs
            const params = new URLSearchParams({
                active: stat,
            });

            // URLs for both user and staff
            const userUrl = `http://192.168.1.121:8081/api/Login/update-active-status/${userId}?${params.toString()}`;
            const staffUrl = `http://192.168.1.121:8083/api/staff/update-active-status/${userId}?${params.toString()}`;

            // Fetch request for user
            const userResponse = await fetch(userUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer your-token-here', // If authentication is required
                },
            });

            if (!userResponse.ok) {
                const errorText = await userResponse.text(); // Read error as text
                throw new Error(`User Error ${userResponse.status}: ${errorText}`);
            }

            // Fetch request for staff after user request completes
            const staffResponse = await fetch(staffUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer your-token-here', // If authentication is required
                },
            });

            if (!staffResponse.ok) {
                const errorText = await staffResponse.text(); // Read error as text
                throw new Error(`Staff Error ${staffResponse.status}: ${errorText}`);
            }
            await getData()
            // Both requests succeeded, update UI here

            // Example: Update UI after both requests complete
            console.log('Toggle switch operation completed successfully.');
            // Update UI or trigger callback to handle UI update

        } catch (error) {
            console.error('Error:', error); // Proper error handling
            // Handle error state in UI if needed

        }
    };










    const [visiblePasswords, setVisiblePasswords] = useState({});

    const togglePasswordVisibility = (id) => {
        setVisiblePasswords((prevVisiblePasswords) => ({
            ...prevVisiblePasswords,
            [id]: !prevVisiblePasswords[id],
        }));
    };







    console.log(filteredData)


    console.log(loading)
    const [loadingStates, setLoadingStates] = useState({});

    const handleToggle = async (userId) => {
        setLoadingStates(prevState => ({ ...prevState, [userId]: true }));
        await toggleSwitch(userId, !data.find(elm => elm.userId === userId).active);
        setLoadingStates(prevState => ({ ...prevState, [userId]: false }));
    };

    return <div style={{
        width: "100vw", margin: '0', padding: '0', boxSizing: 'border-box', minHeight: '100vh'
    }} >

        <Box >
            <Navbar />
            {

            }
            {/* {loading ?
                <Center>
                    <Spinner size="xl" 
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500" />
                </Center> : */}
            <TableContainer >
                <Table variant='simple' >
                    <Thead>
                        <Tr>
                            <Th>
                                <Select placeholder='Name' onChange={handleFilterName} ref={nameRef}>
                                    {
                                        names?.map((session, i) => {
                                            if (session == '' || session == null) {
                                                return;
                                            }
                                            return <option value={session}>{session}</option>
                                        })
                                    }


                                </Select>
                            </Th>
                            <Th>
                                <Select placeholder='Role' onChange={handleFilterRole} ref={roleRef}>
                                    {
                                        roles?.map((session, i) => {
                                            if (session != 'admin') {
                                                return <option value={session}>{session}</option>
                                            }
                                        }
                                        )
                                    }


                                </Select>
                            </Th>


                            <Th>userId</Th>
                            <Th>password</Th>
                            <Th>
                                <Select placeholder='Status' onChange={handleFilterStatus} ref={statusRef} >

                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>




                                </Select>
                            </Th>
                            <Th>Action</Th>

                        </Tr>
                    </Thead>
                    {
                        filters.classData ? <Tbody >
                            {
                                data?.map((elm) => {
                                    if (elm.role != 'admin') {
                                        return <Tr>

                                            <Td>{elm.role == 'staff' ? elm.staffName : elm.studentName}</Td>
                                            <Td>{elm.role}</Td>

                                            <Td>{elm.userId}</Td>
                                            <Td alignItems='center' justifyContent='center'>
                                                {visiblePasswords[elm.id] ? elm.password : '********'}
                                                <IconButton
                                                    aria-label="Toggle Password Visibility"
                                                    icon={visiblePasswords[elm.id] ? <ViewOffIcon /> : <ViewIcon />}
                                                    onClick={() => togglePasswordVisibility(elm.id)}
                                                    variant="ghost"
                                                    size="sm"
                                                    ml={2}
                                                />
                                            </Td>
                                            <Td>{elm.active == true ? 'Active' : 'Inactive'}</Td>
                                            <Td>
                                                <Box display="flex" alignItems="center" >
                                                    <Switch
                                                        isChecked={elm.active || false}
                                                        onChange={() => handleToggle(elm.userId)}
                                                        isDisabled={loadingStates[elm.userId] || false}
                                                    />
                                                    {loadingStates[elm.userId] && <Spinner size="sm" ml={2} />}
                                                </Box>
                                            </Td>


                                        </Tr>
                                    }

                                }


                                )
                            }


                        </Tbody> :
                            <Tbody >
                                {
                                    filteredData?.map((elm) => {
                                        if (elm.role != 'admin') {
                                            return <Tr>

                                                <Td>{elm.role == 'staff' ? elm.staffName : elm.studentName}</Td>
                                                <Td>{elm.role}</Td>

                                                <Td>{elm.userId}</Td>
                                                <Td alignItems='center' justifyContent='center'>
                                                    {visiblePasswords[elm.id] ? elm.password : '********'}
                                                    <IconButton
                                                        aria-label="Toggle Password Visibility"
                                                        icon={visiblePasswords[elm.id] ? <ViewOffIcon /> : <ViewIcon />}
                                                        onClick={() => togglePasswordVisibility(elm.id)}
                                                        variant="ghost"
                                                        size="sm"
                                                        ml={2}
                                                    />
                                                </Td>
                                                <Td>{elm.active == true ? 'Active' : 'Inactive'}</Td>
                                                <Td>
                                                    <Box display="flex" alignItems="center" >
                                                        <Switch
                                                            isChecked={elm.active || false}
                                                            onChange={() => handleToggle(elm.userId)}
                                                            isDisabled={loadingStates[elm.userId] || false}
                                                        />
                                                        {loadingStates[elm.userId] && <Spinner size="sm" ml={2} />}
                                                    </Box>
                                                </Td>


                                            </Tr>
                                        }

                                    })
                                }


                            </Tbody>
                    }


                </Table>
            </TableContainer>
            {/* } */}
        </Box>



    </div>
}
export default Role