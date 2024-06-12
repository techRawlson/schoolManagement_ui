import React, { useEffect, useRef, useState } from 'react';
import  PaginatedStaff from './PaginatedStaff';
import { Stack } from '@chakra-ui/react';

const Staff = () => {
    const [classData, setClassData] = useState([])
    const [uniqueKeys, setUniqueKeys] = useState(new Set());
    const [searchTimeout, setSearchTimeout] = useState(null);
    const renderItems = (startIndex, endIndex) => {
        return classData?.slice(startIndex, endIndex);
    };
    const d = renderItems(1, 10)

    const set = new Set()







    const getData = async () => {
        try {
            const data = await fetch("http://13.201.55.247:8083/api/staff/saved-Staff");
            const fdata = await data.json();
console.log(fdata)
            setClassData(fdata)
        } catch (error) {
            console.log(error)
        }
    }






    const [filters, setFilters] = useState({
        classData: true,
        class: "",
        section: "",
        year: "",
        search: false,
    });


    const [filteredData, setFilteredData] = useState([]);

    const filterRef = useRef();
    const ageRef = useRef();
    const searchRef = useRef();
    const admYearRef = useRef()
    let id;
    const SearchData = () => {
        console.log(searchRef.current.value)
        let val = searchRef.current.value.toLowerCase();
        const length = val.length;
        console.log(length)
        console.log(classData)
       
        const searchData =
            // (filters.classData ? classData : filteredData)
            classData.filter((ele) => {
                console.log(ele.name)
                console.log(val)
                if (ele.name) { // Check if ele.name is not null
                    let searchQuery = ele.name.substring(0, length).toLowerCase();
                    return searchQuery === val;
                }
                
                return false; // Return false if ele.name is null
            })
        console.log(searchData)
        setFilteredData(searchData);
    };
    //filteratrion part
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
            filterData = filterData.filter(
                (ele) => ele.admissionYear == filters.year
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


    const itemsPerPage = 10;
    return (
        <Stack minH="100vh">
            <PaginatedStaff

                itemsPerPage={itemsPerPage}
                totalItems={filters.classData ? classData.length : filteredData.length}
                classData={filters.classData ? classData : filteredData}
                handleFilter={handleFilter}
                clasRef={filterRef}
                handleSectionFilter={handleFiltersection}
                handleFilterYear={handleFilterYear}
                admYearRef={admYearRef}
                secFilter={ageRef}
                handleFilterSearch={handleSearch}
                handleSearch={handleSearch}
                searchRef={searchRef}
                getData={getData}
            />

        </Stack>
    );
}

export default Staff
