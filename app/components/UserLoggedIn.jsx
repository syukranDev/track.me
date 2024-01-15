import React from 'react'
import { Card, Flex, Avatar, Text, Box } from '@radix-ui/themes'
import { UserButton, useUser } from "@clerk/nextjs";

const UserLoggedIn = ({username}) => {
    const { isLoaded, isSignedIn, user } = useUser();

    return (
        <Card 
            style={{ maxWidth: 310 }} 
            className='mb-5 border-none'
        >
            <Flex gap="3" align="center">
                <UserButton afterSignOutUrl="/"/>
                <Box>
                <Text as="div" size="2" weight="bold">
                    {user?.firstName || 'Name not found'}
                </Text>
                <Text as="div" size="2" color="gray">
                    Welcome back to trackwallet.me 👋🏻
                </Text>
                </Box>
            </Flex>
        </Card>
    )
}

export default UserLoggedIn