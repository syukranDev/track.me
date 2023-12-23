'use client'

import { Badge, Box, Button, Card, Container, Flex, Grid, Link, Separator, Text } from '@radix-ui/themes';
import CountUp from 'react-countup';
import { GoArrowUpRight } from "react-icons/go";
import { GrDocumentPdf } from "react-icons/gr";
import TransactionTable from "../components/TransactionTable";

const fileUploadedList = [
    {
        id: 1,
        name : 'resit_breakfast.pdf'
    },
    {
        id: 2,
        name : 'bayar_saman.pdf'
    },
    {
        id: 3,
        name : 'dinner.pdf'
    },
]

const transactionList = [
    {
        id: 1,
        desc: 'Breakfast with family at Restoran Sunshine',
        type: 'local',
        payment_method: 'card',
        total_amt: '23',
        categories: 'food',
        status: 'approved',
        upload_date: '2023-12-11',
        notes: 'forgot to bring cash',
        receipt : 'resit_breakfast.pdf',
        created_by: 'syukran'
    },
    {
        "id": 2,
        "desc": "Shopping at Supermart Mega",
        "type": "local",
        "payment_method": "card",
        "total_amt": "87.50",
        "categories": "groceries",
        "status": "processed",
        "upload_date": "2023-12-15",
        "notes": "Bought groceries for the week",
        "receipt": "receipt_shopping.pdf",
        "created_by": "syukran"
    },
    {
        "id": 3,
        "desc": "Dinner at Italian Cuisine",
        "type": "overseas",
        "payment_method": "cash",
        "total_amt": "45.75",
        "categories": "dining",
        "status": "approved",
        "upload_date": "2023-12-20",
        "notes": "Celebrating anniversary",
        "receipt": "receipt_dinner.pdf",
        "created_by": "syukran"
    }
]


const HomeCard = () => {
  return (
    <Container className="m-10">
        <Grid columns={{initial: "1", md: "3"}} width="auto" gap="5">
            <Box>
                <Card className='shadow-sm transition duration-700 ease-out hover:border-gray-600 hover:shadow-md' gap={3}  style={{ height: '100%' }}>
                    <a href="#">
                        <Flex align={'center'} justify={'between'} className='mb-3'>
                            <Text size="3" weight="medium">Total Spendings</Text>
                            <Button>Quick Add</Button>
                        </Flex>
                        <Text as="div" size="8">
                            <span>RM
                                <CountUp start={3450} end={4523} duration={1} className='pl-2' />
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
                                <CountUp start={100} end={145} duration={1} className='' />
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
                    <a href="#">
                        <Flex align='center' justify={'between'} className='mb-3'>
                            <Text size="3" weight="medium">Recent Receipts (3)</Text>
                        </Flex>

                        <Separator my="3" size="4" />

                        {fileUploadedList.map(resit => (
                            <Box key={resit.id} as="div"  size="2" className='mb-2'>
                                <Flex align={'center'}>
                                    <GrDocumentPdf
                                        size={35}
                                        color={'red'} 
                                        className='items-center mr-2'
                                    />
                                    <Box>
                                        <Text  as="div"  size="2" className='font-medium'>{resit.name}</Text>
                                        <Badge color="green" className='' size='1'>Uploaded</Badge>
                                    </Box>
                                </Flex>
                            </Box>
                        ))}
                    </a>
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
                                <CountUp start={100} end={145} duration={1} className='' />
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
                                    Average Spending
                                </span>
                        {/* <Button>
                         Add Transaction
                        </Button> */}

                        </Flex>
                        <Text as="div" size="8">
                            <span>RM
                                <CountUp start={100} end={145} duration={1} className='' />
                                <Badge color="green" className='ml-2'>+2%</Badge>
                            </span>
                        </Text>
                        <Text as="div" color="gray" size="2">
                        per weekly basis
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
                
                <TransactionTable contents={transactionList}/>
        </Box>

        
    </Container>
  )
}

export default HomeCard