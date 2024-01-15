'use client'
import Image from 'next/image'
import HomeCard from './components/HomeCard'
import UserLoggedIn from './components/UserLoggedIn'
import { Container } from '@radix-ui/themes'
import { motion } from "framer-motion"

export default function Home() {
  return (
    <Container className='m-8'>
      <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
      >
        <UserLoggedIn/>
        <HomeCard/>
      </motion.div>
    </Container>
  )
}
