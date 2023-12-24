'use client'

import React from 'react'
import { Flex, Box, Text, Button } from '@radix-ui/themes'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { useRouter, useSearchParams } from 'next/navigation'

const TablePagination = ({pageSize, itemCount, currentPage, updateTableDataForBackPagination, updateTableDataForForwardPagination}) => {
  // console.log({pageSize, itemCount, currentPage})

  const router = useRouter()
  const searchParams = useSearchParams()

  const pageCount = Math.ceil(itemCount/pageSize)

  const changePage = (page) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString()) //combine ?page to existing ?searchby=...&status=.. if any
        router.push('?' + params.toString())

    }

  return (
    <Box className="m-2">
        <Flex  align="center" gap={"2"}>
            <Text size={"2"}>Page {currentPage} of {pageCount}</Text>
            {/* <Button color='gray' variant='soft' disabled={currentPage === 1} 
                  onClick={() => {
                    changePage(1)
                    updateTableDataForPagination();
                    }}>
               <DoubleArrowLeftIcon />
            </Button> */}

            <Button color='gray' variant='soft' disabled={currentPage === 1} onClick={() => {changePage(currentPage - 1); updateTableDataForBackPagination();} }>
               <ChevronLeftIcon />
            </Button>

            <Button color='gray' variant='soft' disabled={currentPage === pageCount} onClick={() => {changePage(currentPage + 1); updateTableDataForForwardPagination();}}>
               <ChevronRightIcon />
            </Button>

            {/* <Button color='gray' variant='soft' disabled={currentPage === pageCount} onClick={() => changePage(pageCount)}>
               <DoubleArrowRightIcon />
            </Button> */}
        </Flex>
    </Box>
  )
}

export default TablePagination