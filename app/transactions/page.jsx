import React from 'react'
import {Box, Text, Flex, Button, Container} from "@radix-ui/themes"
import TransactionTable from '../components/TransactionTable'
import AddTransaction from '../components/AddTransaction'
import TablePagination from '../components/TablePagination'


const page = () => {
  return (
    <Container className="m-10">
        <Box>
            <Flex align="center" justify="between" className="mb-5">
                <Text>Transactions List</Text>
                <AddTransaction/>

            </Flex>
            <TransactionTable contents={transactionList} isDelete={true}/>

            <TablePagination/>
        </Box>
    </Container>
  )
}

export default page

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
    },
    {
        "id": 4,
        "desc": "Lunch at Local Diner",
        "type": "local",
        "payment_method": "card",
        "total_amt": "15.50",
        "categories": "food",
        "status": "approved",
        "upload_date": "2023-12-10",
        "notes": "Tried their new menu",
        "receipt": "receipt_lunch.pdf",
        "created_by": "syukran"
    },
    {
        "id": 5,
        "desc": "Online Shopping at TechZone",
        "type": "online",
        "payment_method": "card",
        "total_amt": "120.00",
        "categories": "electronics",
        "status": "approved",
        "upload_date": "2023-12-18",
        "notes": "Bought a new gadget",
        "receipt": "receipt_techzone.pdf",
        "created_by": "syukran"
    },
    {
        "id": 6,
        "desc": "Movie Night at CinemaGalore",
        "type": "local",
        "payment_method": "card",
        "total_amt": "30.00",
        "categories": "entertainment",
        "status": "processed",
        "upload_date": "2023-12-16",
        "notes": "Watched the latest blockbuster",
        "receipt": "receipt_cinema.pdf",
        "created_by": "syukran"
    },
    {
        "id": 7,
        "desc": "Grocery Shopping at FreshMart",
        "type": "local",
        "payment_method": "cash",
        "total_amt": "55.20",
        "categories": "groceries",
        "status": "approved",
        "upload_date": "2023-12-14",
        "notes": "Stocked up for the month",
        "receipt": "receipt_groceries.pdf",
        "created_by": "syukran"
    },
    {
        "id": 8,
        "desc": "Coffee Break at Central Cafe",
        "type": "local",
        "payment_method": "card",
        "total_amt": "5.75",
        "categories": "food",
        "status": "processed",
        "upload_date": "2023-12-19",
        "notes": "Relaxing afternoon coffee",
        "receipt": "receipt_coffee.pdf",
        "created_by": "syukran"
    },
    {
        "id": 9,
        "desc": "Dinner at Oriental Delight",
        "type": "local",
        "payment_method": "cash",
        "total_amt": "40.00",
        "categories": "dining",
        "status": "approved",
        "upload_date": "2023-12-12",
        "notes": "Family gathering",
        "receipt": "receipt_dinner2.pdf",
        "created_by": "syukran"
    },
    {
        "id": 10,
        "desc": "Online Subscription Renewal",
        "type": "online",
        "payment_method": "card",
        "total_amt": "25.99",
        "categories": "subscriptions",
        "status": "processed",
        "upload_date": "2023-12-17",
        "notes": "Renewed streaming service subscription",
        "receipt": "receipt_subscription.pdf",
        "created_by": "syukran"
    },
    // {
    //     "id": 11,
    //     "desc": "Lunch at BurgerJoint",
    //     "type": "local",
    //     "payment_method": "card",
    //     "total_amt": "12.30",
    //     "categories": "food",
    //     "status": "approved",
    //     "upload_date": "2023-12-13",
    //     "notes": "Quick bite during lunch break",
    //     "receipt": "receipt_burger.pdf",
    //     "created_by": "syukran"
    // },
    // {
    //     "id": 12,
    //     "desc": "Clothing Shopping at FashionHub",
    //     "type": "local",
    //     "payment_method": "card",
    //     "total_amt": "80.00",
    //     "categories": "clothing",
    //     "status": "processed",
    //     "upload_date": "2023-12-20",
    //     "notes": "New wardrobe additions",
    //     "receipt": "receipt_clothing.pdf",
    //     "created_by": "syukran"
    // },
    // {
    //     "id": 13,
    //     "desc": "Dinner at SushiSpot",
    //     "type": "local",
    //     "payment_method": "cash",
    //     "total_amt": "55.50",
    //     "categories": "dining",
    //     "status": "approved",
    //     "upload_date": "2023-12-11",
    //     "notes": "Celebrating a friend's birthday",
    //     "receipt": "receipt_sushi.pdf",
    //     "created_by": "syukran"
    // },
    // {
    //     "id": 14,
    //     "desc": "Online Book Purchase",
    //     "type": "online",
    //     "payment_method": "card",
    //     "total_amt": "18.75",
    //     "categories": "books",
    //     "status": "processed",
    //     "upload_date": "2023-12-16",
    //     "notes": "Purchased a new novel",
    //     "receipt": "receipt_book.pdf",
    //     "created_by": "syukran"
    // },
    // {
    //     "id": 15,
    //     "desc": "Gas Refill at Local Station",
    //     "type": "local",
    //     "payment_method": "cash",
    //     "total_amt": "40.00",
    //     "categories": "utilities",
    //     "status": "approved",
    //     "upload_date": "2023-12-14",
    //     "notes": "Refilled car's gas tank",
    //     "receipt": "receipt_gas.pdf",
    //     "created_by": "syukran"
    // },
    // {
    //     "id": 16,
    //     "desc": "Lunch at Pizzeria Italia",
    //     "type": "local",
    //     "payment_method": "card",
    //     "total_amt": "17.80",
    //     "categories": "food",
    //     "status": "approved",
    //     "upload_date": "2023-12-19",
    //     "notes": "Tried their new pizza flavors",
    //     "receipt": "receipt_pizza.pdf",
    //     "created_by": "syukran"
    // },
    // {
    //     "id": 17,
    //     "desc": "Online Movie Rental",
    //     "type": "online",
    //     "payment_method": "card",
    //     "total_amt": "6.99",
    //     "categories": "entertainment",
    //     "status": "processed",
    //     "upload_date": "2023-12-18",
    //     "notes": "Rented latest movie release",
    //     "receipt": "receipt_movie.pdf",
    //     "created_by": "syukran"
    // }
]