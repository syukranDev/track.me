'use client'

import React, {useEffect, useState} from 'react'
import {Box, Text, Flex, Button, Container} from "@radix-ui/themes"
import TransactionTable from '../components/TransactionTable'
import AddTransaction from '../components/AddTransaction'
import TablePagination from '../components/TablePagination'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'

const page = () => {
    const [data, setData] = useState([])
    const [dataCount, setDataCount] = useState(0)

    const searchParams = useSearchParams()
    const searchCurrentPage = searchParams.get('page')
    console.log(searchCurrentPage)

    const page = parseInt(searchCurrentPage) || 1;
    const pageSize = 5;

    //Below effect for first time load
    useEffect(() => {
        const fetchData = async () => {
            
        try {
            console.log(`is this running`)
            let response = await axios.get(`http://localhost:3003/api/transaction/list?page=${page}`); // Replace with your API endpoint
            // console.log(response.data.data.rows)
            setData(response.data.data.rows)
            setDataCount(response.data.data.count)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
        fetchData();
    }, []);

    const updateTableDataAfterAddNewTransaction = async () => {
        try {
            const response = await axios.get('http://localhost:3003/api/transaction/list?page=1');
            setData(response.data.data.rows);
        } catch (error) {
            console.error('Error fetching updated data:', error);
        }
    };

    const updateTableDataForBackPagination = async () => {
        try {
            const response = await axios.get(`http://localhost:3003/api/transaction/list?page=`+ (parseInt(page)-1).toString() ); 
            setData(response.data.data.rows);
        } catch (error) {
            console.error('Error fetching next page data:', error);
        }
    };

    const updateTableDataForForwardPagination = async () => {
        try {
            const response = await axios.get(`http://localhost:3003/api/transaction/list?page=`+ (parseInt(page)+1).toString()); 
            setData(response.data.data.rows);
        } catch (error) {
            console.error('Error fetching next page data:', error);
        }
    };


    return (
        <Container className="m-10">
            <Box>
                <Flex align="center" justify="between" className="mb-5">
                    <Text>Transactions List</Text>
                    <AddTransaction updateTableDataAfterAddNewTransaction={updateTableDataAfterAddNewTransaction}/>

                </Flex>

                <TransactionTable contents={data} isDelete={true}/>

                <Flex justify="between">
                    <Text></Text>
                    <TablePagination 
                            pageSize={pageSize}
                            itemCount={dataCount}
                            currentPage={page}
                            updateTableDataForBackPagination={updateTableDataForBackPagination}
                            updateTableDataForForwardPagination={updateTableDataForForwardPagination}
                    />
                </Flex>


                
            </Box>
        </Container>
    )
}

export default page
