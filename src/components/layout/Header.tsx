import * as React from 'react';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { FaUserCircle, FaGasPump } from 'react-icons/fa';
import MultipleMenu from '@/components/menu/MultipleMenu';
import { useState } from 'react';
import SearchBox from '@/components/search-box/SearchBox';
import Link from 'next/link';
import { useRouter } from 'next/router';

export type Item = {
  title: string,
  link: string
}
const menu = [
  'Blockchain',
  'Tokens',
  'Resources',
];

const childMenu = [
  {
    title: 'View Txns',
    link: '/txs'
  },
  {
    title: 'View Pending Txns',
    link: '/txs'
  },
  {
    title: 'View Contract Internal Txns',
    link: '/txs'
  },
  {
    title: 'View Blocks',
    link: '/txs'
  },
  {
    title: 'Forked Blocks (Reorgs)',
    link: '/txs'
  },
  {
    title: 'View Uncles',
    link: '/txs'
  },
  {
    title: 'Top Accounts',
    link: '/txs'
  },
  {
    title: 'Verified Contracts',
    link: '/txs'
  }
]

export default function Header() {
  const router = useRouter()
  const [isOpenNavBar, changeOpenNavBar] = useState<boolean>(false);
  const isHomePage = router.pathname === '/'
  return (
    <header className='z-50 py-[0.25rem] border border-inherit lg:py-0 font-normal bg-white'>
      <div className='layout relative py-[0.25rem] md:py-0 flex flex-col items-start 
       lg:flex-row lg:items-center justify-between'>
        <div className='md:w-auto flex justify-between w-full md:block'>
          <div>
            <UnstyledLink href='/' className='font-bold  hover:text-gray-600'>
              <NextImage
                useSkeleton
                className='w-40 block'
                src='/images/logo-etherscan.svg'
                width='160'
                height='35.8'
                alt='Icon'
              />
            </UnstyledLink>
            <div className={`${isHomePage ? 'hidden' : 'block'}`}>
              <div className='hidden px-[0.5rem] mt-3 sm:flex text-[0.8rem] rounded-[0.35rem] bg-[rgba(119,131,143,0.05)] '>
                <span className='text-[#1e2022]'>Eth: $1,293.91</span>
                <span className='ml-1 text-[#de4437]'>(-0.43%)</span>
                <span className='mx-1 pl-1 text-[0.7rem]'>
                  <Link href="/" >
                    <a className='flex items-center'>
                      |
                      <span className='text-[#77838f] ml-2'>
                        <FaGasPump />
                      </span>
                      <span className='text-[#77838f] ml-1'>
                        19 Gwei
                      </span>
                    </a>
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div className="md:hidden flex flex-col justify-center ">
            <div className="relative">
              <nav>
                <button className="text-gray-500 w-10 h-10 relative" onClick={() => changeOpenNavBar(!isOpenNavBar)}>
                  <span className="sr-only">Open main menu</span>
                  <div className="text-header-item hover:text-header-item-hover text-xl block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
                    <span aria-hidden="true"
                      className={`block absolute left-[10px] h-0.5 w-5 bg-current transform transition-transform duration-300 ease-in-out ${isOpenNavBar ? 'rotate-45' : ' -translate-y-1.5'}`}></span>
                    <span aria-hidden="true"
                      className={`block absolute left-[10px] h-0.5 w-5 bg-current transform transition-transform duration-300 ease-in-out ${isOpenNavBar ? 'opacity-0' : ''}`}></span>
                    <span aria-hidden="true"
                      className={`block absolute left-[10px] h-0.5 w-5 bg-current transform transition-transform duration-300 ease-in-out ${isOpenNavBar ? '-rotate-45' : ' translate-y-1.5'}`}></span>
                  </div>
                </button>
              </nav>
            </div>
          </div >
        </div>
        <div className={`pt-[0.5rem] flex-1 flex w-full md:flex-col ${isOpenNavBar ? 'flex-col-reverse' : 'flex-col'}`}>
          <div className={`flex justify-end ${isHomePage ? 'hidden' : 'block'}`}>
            <div className="w-full lg:w-3/5">
              <SearchBox />
            </div>
          </div>
          <div className='flex justify-start lg:justify-end'>
            <nav className={`opacity-100 transition-all pl-[0.5rem] md:pl-0 ease-out duration-500 w-full md:block md:w-auto ${!isOpenNavBar ? "hidden opacity-0" : ""}`}>
              <ul className='flex flex-col md:flex-row items-center justify-between'>
                <li className="pr-4 py-[0.5rem] md:py-[0.8rem] w-full md:w-auto">
                  <Link href="/">
                    <a className='text-header-item-hover text-sm'>Home</a>
                  </Link>
                </li>

                {menu.map((item, index) => (
                  <li key={index} className="w-full md:w-auto md:px-4 py-[0.5rem] md:py-[0.8rem]
               dropdown relative cursor-pointer group ">
                    <div className='w-full flex justify-between items-end 
                  text-header-item group-hover:text-header-item-hover text-sm'>
                      {item}
                      <RiArrowDropDownLine className='inline ml-[0.1rem]' />
                    </div>
                    <div className='min-w-[250px] static md:absolute left-0 hidden group-hover:block'>
                      <MultipleMenu menu={childMenu} />
                    </div>
                  </li>
                ))}

                <li className="w-full md:w-auto md:px-4 py-[0.5rem] md:py-[0.8rem] 
               dropdown cursor-pointer group">
                  <div className='w-full flex justify-between items-end 
                  text-header-item text-sm group-hover:text-header-item-hover'>
                    More
                    <RiArrowDropDownLine className='inline ml-[0.1rem]' />
                  </div>
                  <div className="dropdown-content absolute top:0 left-0 max-h-0 text-sm">
                  </div>
                  <div className='static md:absolute xl:left-[15px] left-[15px] sm:left-[45px] 
              xl:right-[15px] right-[15px] sm:right-[45px]
              hidden group-hover:block'>
                    <MultipleMenu menu={childMenu} />
                  </div>
                </li>

                <li className="py-[0.5rem] md:py-[0.8rem] w-full md:w-auto">
                  <Link href='/login'
                    className='md:px-4 flex items-center gap-1 border-0 md:border-x-[1px]'>
                    <a className="text-header-item text-sm flex items-center hover:text-header-item-hover">
                      <FaUserCircle className='mt-[2px] mr-[2px]' />Sign In
                    </a>
                  </Link>
                </li>

                <li className="relative pl-4 hidden md:block group">
                  <div className='w-7 h-7 bg-[#3498db1a] flex flex-col justify-around'>
                    <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
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
                  <div className='min-w-[250px] absolute right-0 hidden group-hover:block'>
                    <MultipleMenu menu={childMenu} />
                  </div>
                </li>

                <li className="block md:hidden w-full md:w-auto md:px-4 py-[0.5rem] md:py-[0.8rem] 
               dropdown relative cursor-pointer group">
                  <div className='w-full flex justify-between items-end 
                  text-header-item text-sm group-hover:text-header-item-hover'>
                    Explores
                    <RiArrowDropDownLine className='inline ml-[0.1rem]' />
                  </div>
                  <div className="dropdown-content absolute top:0 left-0 max-h-0 text-sm">
                  </div>
                  <div className='min-w-[250px] static md:absolute left-0 hidden group-hover:block'>
                    <MultipleMenu menu={childMenu} />
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div >
    </header >
  );
}