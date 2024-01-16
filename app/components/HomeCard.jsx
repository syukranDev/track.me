'use client'

import { Badge, Box, Button, Card, Container, Flex, Grid, Link, Separator, Text } from '@radix-ui/themes';
import CountUp from 'react-countup';
import { GoArrowUpRight } from "react-icons/go";
import { BsFiletypeJpg } from "react-icons/bs";
import TransactionTable from "../components/TransactionTable";
import { useState, useEffect } from 'react';
import axios from 'axios'
import Announcement from '../components/Announcement'
import { useAuth } from '@clerk/nextjs';

const HomeCard = () => {
    const [data, setData] = useState([])
    const [dashbordData, setDashboardData] = useState({})
    const [fileUploadedList, setFileUploadedList] = useState([])

    
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    useEffect(() => {
            if (!userId) {
            console.log("Unauthorized")
            } else console.log({ userId , message: 'Authorized'})
        
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:3003/api/transaction/list?page=1&limit_rows=4&user_id=${userId}`); // Replace with your API endpoint
                    setData(response.data.data.rows)

                    const response2 = await axios.get(`http://localhost:3003/api/transaction/dashboard?user_id=${userId}`); // Replace with your API endpoint
                    setDashboardData(response2.data.dashboard)
                    setFileUploadedList(response2.data.dashboard.receipts)
                    console.log('=======')
                    console.log(response2.data.dashboard.receipts)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
    
            fetchData();
        }, [userId]);

    return (
        <>
            <Box className='mb-5'>
                <Announcement/>
            </Box>
            <Grid columns={{initial: "1", md: "3"}} width="auto" gap="5">
                <Box>
                    <Card className='shadow-sm transition duration-700 ease-out hover:border-gray-600 hover:shadow-md' gap={3} style={{ height: '100%' }}>
                        <a href="#">
                            <Flex align={'center'} justify={'between'} className='mb-3'>
                                <Text size="3" weight="medium">Total Spendings</Text>
                                <Button>Quick Add</Button>
                            </Flex>
                            <Text as="div" size="8">
                                <span>RM
                                    <CountUp decimals={2} decimal="." start={dashbordData.total_spending - 10} end={dashbordData.total_spending} duration={1} className='pl-2' />
                                    <Badge color="green" className='ml-2'>+32%</Badge>
                                </span>
                            </Text>
                            <Text as="div" color="gray" size="2">
                            from last month
                            </Text>
                        </a>
                    </Card>
                </Box>
                <Box>
                    <Card className='shadow-sm transition duration-700 ease-out hover:border-gray-600 hover:shadow-md' gap={3}  style={{ height: '100%' }}>
                        <a href="#">
                            <Flex align={'center'} justify={'between'} className='mb-3'>
                                <Text size="3" weight="medium">Total Transactions</Text>
                            </Flex>
                            <Text as="div" size="8">
                                <span>
                                    <CountUp start={1} end={dashbordData.total_transactions} duration={1} className='' />
                                    <Badge color="green" className='ml-2'>+2%</Badge>
                                </span>
                            </Text>
                            <Text as="div" color="gray" size="2">
                            from last month
                            </Text>
                        </a>
                    </Card>
                </Box>
                <Box height={{initial: "", md: "3"}}>
                    <Card className='shadow-sm transition duration-700 ease-out hover:border-gray-600 hover:shadow-md' gap={3} >
                        <Flex align='center' justify={'between'} className='mb-3'>
                            <Text size="3" weight="medium">Recent Receipts</Text>
                        </Flex>

                        <Separator my="3" size="4" />
                        {console.log(fileUploadedList)}
                        { 
                            fileUploadedList.length == 0 ? 
                            (
                                <Text as="div" color="gray" size="2">No recent receipts found.</Text>
                            ) :
                            (
                                (fileUploadedList).map(receipt => (
                                    <Box key={receipt.id} as="div"  size="2" className='mb-2'>
                                        <Flex align={'center'}>
                                            <BsFiletypeJpg
                                                size={35}
                                                color={'gray'} 
                                                className='items-center mr-2'
                                            />
                                            <Box>
                                                <Link target='_blank' href={receipt.alt_direct_link}><Text  as="div"  size="2" className='font-medium'>{receipt?.filename}</Text></Link>
                                                <Badge color="green" className='' size='1'>Uploaded</Badge>
                                            </Box>
                                        </Flex>
                                    </Box>
                                ))
                            )
                        }
                        
                    </Card>
                </Box>
                <Box>
                    <Card className='shadow-sm transition duration-700 ease-out hover:border-gray-600 hover:shadow-md' gap={3}  style={{ height: '100%' }}>
                        <a href="#">
                            <Flex align={'center'} justify={'between'} className='mb-3'>
                            <span className='font-medium text-base'>
                                        Average Spending
                                    </span>
                            {/* <Button>
                            Add Transaction
                            </Button> */}

                            </Flex>
                            <Text as="div" size="8">
                                <span>RM
                                    <CountUp decimals={2} decimal="." start={dashbordData.average_spending - 10} end={dashbordData.average_spending} duration={1} className='' />
                                    <Badge color="green" className='ml-2'>+2%</Badge>
                                </span>
                            </Text>
                            <Text as="div" color="gray" size="2">
                            per weekly basis
                            </Text>
                        </a>
                    </Card>
                </Box>
                <Box>
                    <Card className='shadow-sm transition duration-700 ease-out hover:border-gray-600 hover:shadow-md' gap={3} style={{ height: '100%' }}>
                        <a href="#">
                            <Flex align={'center'} justify={'between'} className='mb-3'>
                            <span className='font-medium text-base'>
                                        Total In-debt
                                    </span>
                            {/* <Button>
                            Add Transaction
                            </Button> */}

                            </Flex>
                            <Text as="div" size="8">
                                <span>RM
                                    <CountUp decimals={2} decimal="." start={dashbordData.total_in_debt - 10} end={dashbordData.total_in_debt}  duration={1} className='' />
                                    <Badge color="red" className='ml-2'>-4%</Badge>
                                </span>
                            </Text>
                            <Text as="div" color="gray" size="2">
                            from last month
                            </Text>
                        </a>
                    </Card>
                </Box>
            </Grid>

            <Box pt="5" width="auto">
                    <Flex align="center" gap="2" className="mb-2">
                        <Text size="3" weight="medium">Recent Transactions</Text>
                        <Link href="/transactions" size="2">
                            <Flex align="center">
                                View all
                                <GoArrowUpRight size="15"/>
                            </Flex>
                        </Link>
                    </Flex>
                    
                    {
                        data.length == 0 ? 
                        (
                            <Text as="div" color="gray" size="2">No transactions found. Please initiate a new transaction.</Text>
                        ) :
                        (
                            <TransactionTable contents={data}/>
                        )
                    }
            </Box>
        </>
    )
}

export default HomeCard