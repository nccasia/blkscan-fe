import Image from 'next/image';

import Layout from '@/components/layout/Layout';
import FocusGraph from '../../components/force-graph/FocusGraph';
const FirstPost = () => {
  function displayResult() {
    // eslint-disable-next-line no-console
    console.log('hi nguyen van sang');
  }
  return (
    <Layout>
      <div className='mx-auto mr-auto mt-4 flex w-9/12 justify-between'>
        <h4 className='mb-2 text-2xl font-medium leading-tight text-gray-600'>
          Transaction Search
        </h4>
        <p className='mb-2 mt-3 text-sm font-normal leading-tight text-gray-400'>
          Transaction Search
        </p>
      </div>

      <div className='ml-auto mr-auto w-9/12 flex-grow border-t border-gray-300'></div>
      <div className='mt-9 text-center'>
        <Image
          src='/images/empty-search-state-alt.svg'
          height={144}
          width={144}
          alt='transaction search'
        />
      </div>
      <div className='ml-auto mr-auto w-1/4 text-center text-slate-500'>
        <p>
          Search Smart Contract source codes on Etherscan and filter by contract
          & deployer addresses, creation date, block number and more.
        </p>
      </div>
      <form
        onClick={displayResult}
        className='z-0 mx-auto mr-auto mt-7 flex w-1/3 items-center'
      >
        <label htmlFor='simple-search' className='sr-only'>
          Search
        </label>
        <div className='relative w-full'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <svg
              aria-hidden='true'
              className='h-5 w-5 text-gray-500 dark:text-gray-400'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
          <input
            type='text'
            id='simple-search'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-200 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Search transactions'
            required
          />
        </div>
        <button
          type='submit'
          className='ml-2 rounded-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          <svg
            className='h-5 w-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            ></path>
          </svg>
          <span className='sr-only'>Search</span>
        </button>
      </form>
      <div>
        <FocusGraph />
      </div>
    </Layout>
  );
};
export default FirstPost;
