'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Flex, Card, Text } from '@radix-ui/themes'
import Image from 'next/image';
import logoApps from '../public/logo-wallet.svg';


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
          iHutang
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
        className={`sidebar bg-gray-800 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <a href="/" className="text-white flex items-center justify-center space-x-4 px-4">
          <Image
            priority
            src={logoApps}
            alt="syukrandev apps"
            height={32}
            width={32}
          />
          <span className="text-2xl font-extrabold">track.me</span>
        </a>

        <nav className='pl-4'>
          <Link
            href="/"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            href="/transactions"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
          >
            Transactions
          </Link>
          {/* Add other nav links */}
        </nav>
      </div>

      <div className="flex-1 p-5 text-2xl">
        {children}
      </div>
    </div>
  );
};

export default Navbar;
