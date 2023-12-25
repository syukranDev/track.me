import React from 'react'
import { Card, Flex, Avatar, Text, Box } from '@radix-ui/themes'

const UserLoggedIn = () => {
  return (
    <Card 
        style={{ maxWidth: 310 }} 
        className='mb-5 border-none'
    >
        <Flex gap="3" align="center">
            <Avatar
            size="3"
            src="Xhttps://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
            radius="full"
            fallback="S"
            />
            <Box>
            <Text as="div" size="2" weight="bold">
                Syukran
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