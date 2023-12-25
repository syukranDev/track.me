'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Flex, Box, Text, Callout } from '@radix-ui/themes'
import Image from 'next/image';
import logoApps from '../public/logo-wallet.svg';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { MdOutlineSupportAgent } from "react-icons/md";

const Navbar = ({children}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = (event) => {
    const sidebar = document.querySelector('.sidebar');
    const btn = document.querySelector('.mobile-menu-button');

    const isButtonClick = btn === event.target && btn.contains(event.target);
    const isOutsideClick =
      sidebar !== event.target && !sidebar.contains(event.target);

    if (sidebar.classList.contains('-translate-x-full')) return;

    if (isButtonClick) {
      setIsSidebarOpen(!isSidebarOpen);
      return;
    }

    if (!isButtonClick && isOutsideClick) {
      setIsSidebarOpen(false);
      return;
    }
  };

  return (
    <div className="relative min-h-screen md:flex">
      <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">
        <a href="#" className="block p-4 text-white font-bold">
          <Flex align={"center"} gap={"2"}>
            <Image
              priority
              src={logoApps}
              alt="syukrandev apps"
              height={20}
              width={20}

            />
            trackwallet.me

          </Flex>
        </a>
        <button
          onClick={toggleSidebar}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700"
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div
        className={`sidebar bg-white text-black-100 font-thin text-sm border-r border-grey-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <a href="/" className="text-white flex items-center justify-center space-x-4 px-4">
          <Image
            className=''
            priority
            src={logoApps}
            alt="syukrandev apps"
            height={32}
            width={32}
          />
          <Flex direction={"column"}>
            {/* <span className="text-2xl font-extrabold text-black ">trackwallet.me</span> */}
            <span className="text-2xl font-thin text-black ">trackwallet.me</span>

          </Flex>
        </a>

        <hr></hr>

        <nav>
          <Flex direction={"column"} justify={"between"} gap={"4"}> {/* put className='screen' to extend info to down */}
            <Box>
              <Text className='font-medium text-xs text-gray-400 p-3'>MAIN</Text>
              <Link
                href="/"
                className="block py-2.5 px-4 font-medium rounded transition duration-200 text-gray-600 hover:bg-gray-100 hover:text-black"
              >
                <Flex justify={"between"} align={"center"}> 
                  Dashboard
                  <ChevronRightIcon/>
                </Flex>
              </Link>
              <Link
                href="/transactions"
                className="block py-2.5 px-4 font-medium rounded transition duration-200 text-gray-600 hover:bg-gray-100 hover:text-black"
              >
                Transactions
              </Link>
              <Link
                href="#"
                className="block py-2.5 px-4 font-medium rounded transition duration-200 text-gray-600 hover:bg-gray-100 hover:text-black"
              >
                My Card
              </Link>

              {/* Add other nav links */}
              <Box className='mt-6'>
                <Text className='font-medium text-xs text-gray-400 p-3'>OTHER</Text>
              </Box>
              <Link
                href="/"
                className="block py-2.5 px-4 font-medium rounded transition duration-200 text-gray-600 hover:bg-gray-100 hover:text-black"
              >
                <Flex justify={"between"} align={"center"}> 
                  Settings
                  <ChevronRightIcon/>
                </Flex>
              </Link>
              <Link
                href="/"
                className="block py-2.5 px-4 font-medium rounded transition duration-200 text-gray-600 hover:bg-gray-100 hover:text-black"
              >
                Logout
              </Link>
            </Box>

            {/* remove this due to hydration fail
            <Box>
              <Callout.Root className='m-2'>
                
                <Callout.Text className='font-medium'>
                  <Flex align={"center"} gap={"2"}>
                    <MdOutlineSupportAgent size={"25"}/>
                    Need Support?
                  </Flex>
                </Callout.Text>
                <Callout.Text>
                  Contact our agents.
                </Callout.Text>
              </Callout.Root>
            </Box>
            */}
          </Flex>
        </nav>
      </div>

      <div className="flex-1 p-5 text-2xl">
        {children}
      </div>
    </div>
  );
};

export default Navbar;
