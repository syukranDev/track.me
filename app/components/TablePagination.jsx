'use client'

import React from 'react'
import { Flex, Box, Text } from '@radix-ui/themes'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const TablePagination = () => {
  return (
    <Box className="m-2">
        <Flex  align="center">
            <Text size={"2"}>1-5 of 100</Text>
            <IoIosArrowBack size={"25"} 
                className=" flex items-center justify-center rounded-full hover:bg-gray-100 hover:cursor-pointer transition duration-300 ease-in-out"
                onClick={() => console.log('Back to previous page')}
            />
            <IoIosArrowForward size={"25"} 
                className=" flex items-center justify-center rounded-full hover:bg-gray-100 hover:cursor-pointer transition duration-300 ease-in-out"
                onClick={() => console.log('To the next page')}
            />
        </Flex>
    </Box>
  )
}

export default TablePagination