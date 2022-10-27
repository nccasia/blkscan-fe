import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import { FaGasPump, FaUserCircle } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';

import UnstyledLink from '@/components/links/UnstyledLink';
import MultipleMenu from '@/components/menu/MultipleMenu';
import NextImage from '@/components/NextImage';
import SearchBox from '@/components/search-box/SearchBox';

export type Item = {
  title: string;
  link: string;
};
const menu = ['Blockchain', 'Tokens', 'Resources'];

const childMenu = [
  {
    title: 'View Txns',
    link: '/txs',
  },
  {
    title: 'View Pending Txns',
    link: '/txs',
  },
  {
    title: 'View Contract Internal Txns',
    link: '/txs',
  },
  {
    title: 'View Blocks',
    link: '/txs',
  },
  {
    title: 'Forked Blocks (Reorgs)',
    link: '/txs',
  },
  {
    title: 'View Uncles',
    link: '/txs',
  },
  {
    title: 'Top Accounts',
    link: '/txs',
  },
  {
    title: 'Verified Contracts',
    link: '/txs',
  },
];

export default function Header() {
  const router = useRouter();
  const [isOpenNavBar, changeOpenNavBar] = useState<boolean>(false);
  const isHomePage = router.pathname === '/';
  return (
    <header className='z-50 border border-inherit py-[0.25rem] font-normal lg:py-0'>
      <div
        className='layout relative flex flex-col items-start justify-between py-[0.25rem] 
       lg:flex-row lg:items-center'
      >
        <div className='flex w-full justify-between md:block md:w-auto'>
          <div>
            <UnstyledLink href='/' className='font-bold  hover:text-gray-600'>
              <NextImage
                useSkeleton
                className='block w-40'
                src='/images/logo-etherscan.svg'
                width='160'
                height='35.8'
                alt='Icon'
              />
            </UnstyledLink>
            <div className={`${isHomePage ? 'hidden' : 'block'}`}>
              <div className='mt-3 hidden rounded-[0.35rem] bg-[rgba(119,131,143,0.05)] px-[0.5rem] text-[0.8rem] sm:flex '>
                <span className='text-[#1e2022]'>Eth: $1,293.91</span>
                <span className='ml-1 text-[#de4437]'>(-0.43%)</span>
                <span className='mx-1 pl-1 text-[0.7rem]'>
                  <Link href='/'>
                    <a className='flex items-center'>
                      |
                      <span className='ml-2 text-[#77838f]'>
                        <FaGasPump />
                      </span>
                      <span className='ml-1 text-[#77838f]'>19 Gwei</span>
                    </a>
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-center md:hidden'>
            <div className='relative'>
              <nav>
                <button
                  className='relative h-10 w-10 text-gray-500'
                  onClick={() => changeOpenNavBar(!isOpenNavBar)}
                >
                  <span className='sr-only'>Open main menu</span>
                  <div className='absolute left-1/2 top-1/2 block w-5 -translate-x-1/2 -translate-y-1/2 transform   text-xl  text-header-item hover:text-header-item-hover'>
                    <span
                      aria-hidden='true'
                      className={`absolute left-[10px] block h-0.5 w-5 transform bg-current transition-transform duration-300 ease-in-out ${
                        isOpenNavBar ? 'rotate-45' : ' -translate-y-1.5'
                      }`}
                    ></span>
                    <span
                      aria-hidden='true'
                      className={`absolute left-[10px] block h-0.5 w-5 transform bg-current transition-transform duration-300 ease-in-out ${
                        isOpenNavBar ? 'opacity-0' : ''
                      }`}
                    ></span>
                    <span
                      aria-hidden='true'
                      className={`absolute left-[10px] block h-0.5 w-5 transform bg-current transition-transform duration-300 ease-in-out ${
                        isOpenNavBar ? '-rotate-45' : ' translate-y-1.5'
                      }`}
                    ></span>
                  </div>
                </button>
              </nav>
            </div>
          </div>
        </div>
        <div
          className={`flex w-full flex-1  md:flex-col ${
            isOpenNavBar ? 'flex-col-reverse' : 'flex-col'
          } ${isHomePage ? 'pt-0' : 'pt-[0.5rem]'}`}
        >
          <div
            className={`flex justify-end ${isHomePage ? 'hidden' : 'block'}`}
          >
            <div className='w-full lg:w-3/5'>
              <SearchBox />
            </div>
          </div>
          <div className='flex justify-start lg:justify-end'>
            <nav
              className={`w-full pl-[0.5rem] opacity-100 transition-all duration-500 ease-out md:block md:w-auto md:pl-0 ${
                !isOpenNavBar ? 'hidden opacity-0' : ''
              }`}
            >
              <ul className='flex flex-col items-center justify-between md:flex-row'>
                <li className='w-full py-[0.5rem] pr-4 md:w-auto md:py-[0.8rem]'>
                  <Link href='/'>
                    <a className='text-sm text-header-item-hover'>Home</a>
                  </Link>
                </li>

                <li className='w-full py-[0.5rem] px-4 md:w-auto md:py-[0.8rem]'>
                  <Link href='/monitor'>
                    <a className='text-sm text-header-item hover:text-header-item-hover'>
                      Monitor
                    </a>
                  </Link>
                </li>
                {menu.map((item, index) => (
                  <li
                    key={index}
                    className='dropdown group relative w-full cursor-pointer
               py-[0.5rem] md:w-auto md:px-4 md:py-[0.8rem] '
                  >
                    <div
                      className='flex w-full items-end justify-between 
                  text-sm text-header-item group-hover:text-header-item-hover'
                    >
                      {item}
                      <RiArrowDropDownLine className='ml-[0.1rem] inline' />
                    </div>
                    <div className='static left-0 hidden min-w-[250px] group-hover:block md:absolute'>
                      <MultipleMenu menu={childMenu} />
                    </div>
                  </li>
                ))}

                <li
                  className='dropdown group w-full cursor-pointer py-[0.5rem] 
               md:w-auto md:px-4 md:py-[0.8rem]'
                >
                  <div
                    className='flex w-full items-end justify-between 
                  text-sm text-header-item group-hover:text-header-item-hover'
                  >
                    More
                    <RiArrowDropDownLine className='ml-[0.1rem] inline' />
                  </div>
                  <div className='dropdown-content top:0 absolute left-0 max-h-0 text-sm'></div>
                  <div
                    className='static left-[15px] right-[15px] hidden group-hover:block 
              sm:left-[45px] sm:right-[45px] md:absolute
              xl:left-[15px] xl:right-[15px]'
                  >
                    <MultipleMenu menu={childMenu} />
                  </div>
                </li>

                <li className='w-full py-[0.5rem] md:w-auto md:py-[0.8rem]'>
                  <Link
                    href='/login'
                    className='flex items-center gap-1 border-0 md:border-x-[1px] md:px-4'
                  >
                    <a className='flex items-center text-sm text-header-item hover:text-header-item-hover'>
                      <FaUserCircle className='mt-[2px] mr-[2px]' />
                      Sign In
                    </a>
                  </Link>
                </li>

                <li className='group relative hidden pl-4 md:block'>
                  <div className='flex h-7 w-7 flex-col justify-around bg-[#3498db1a]'>
                    <UnstyledLink
                      href='/'
                      className='font-bold hover:text-gray-600'
                    >
                      <NextImage
                        useSkeleton
                        src='/images/ethereum-icon.webp'
                        width='19.24'
                        height='19.24'
                        alt='Icon'
                        className='mx-auto align-middle'
                      />
                    </UnstyledLink>
                  </div>
                  <div className='absolute right-0 hidden min-w-[250px] group-hover:block'>
                    <MultipleMenu menu={childMenu} />
                  </div>
                </li>

                <li
                  className='dropdown group relative block w-full cursor-pointer py-[0.5rem] 
               md:hidden md:w-auto md:px-4 md:py-[0.8rem]'
                >
                  <div
                    className='flex w-full items-end justify-between 
                  text-sm text-header-item group-hover:text-header-item-hover'
                  >
                    Explores
                    <RiArrowDropDownLine className='ml-[0.1rem] inline' />
                  </div>
                  <div className='dropdown-content top:0 absolute left-0 max-h-0 text-sm'></div>
                  <div className='static left-0 hidden min-w-[250px] group-hover:block md:absolute'>
                    <MultipleMenu menu={childMenu} />
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
