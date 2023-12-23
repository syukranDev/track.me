'use client'

import React, {useEffect, useState} from 'react'
import {Box, Text, Flex, Button, Container} from "@radix-ui/themes"
import TransactionTable from '../components/TransactionTable'
import AddTransaction from '../components/AddTransaction'
import TablePagination from '../components/TablePagination'
import axios from 'axios'

const page = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3003/api/transaction/list'); // Replace with your API endpoint
            console.log(response.data.data.rows)
            setData(response.data.data.rows)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);


    return (
        <Container className="m-10">
            <Box>
                <Flex align="center" justify="between" className="mb-5">
                    <Text>Transactions List</Text>
                    <AddTransaction/>

                </Flex>
                <TransactionTable contents={data} isDelete={true}/>

                <TablePagination/>
            </Box>
        </Container>
    )
}

export default page
