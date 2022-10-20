import Link from 'next/link';
import React from 'react';
import ReCaptchaV2 from 'react-google-recaptcha';

const signUp = () => {
  return (
    <div className='relative block   w-full bg-[#f8f9fa] text-[black]'>
      <div className='layout py-12 text-left font-primary text-sm font-normal sm:px-[45px]'>
        <form className='  relative mx-auto block w-full lg:!w-1/2 md:w-3/4 '>
          <div className='w-full'>
            <h1 className='mb-2 text-2xl  font-normal text-[#3498db]'>
              Register a <strong className='text-2xl leading-6'>New</strong>{' '}
              Account
            </h1>
            <p className='mb-4 leading-7'>Fill out the form to get started.</p>
          </div>
          <div className='block'>
            <div className='mb-4 block '>
              <label className='mb-2 block '>Username</label>
              <input
                type='text'
                className='focus:rings-0  w-full overflow-visible rounded border border-[#d5dae2] px-3 py-2 placeholder:text-sm placeholder:text-[#8c98a4] focus:border-[#3498db] focus:shadow focus:outline-none focus:ring-0 focus:ring-[#3498db] focus:ring-opacity-50'
                placeholder='Username has to be from 5 to 30 characters in length, only alphanumeric characters allowed.'
              />
            </div>
            <div className='mb-4 block'>
              <label className='mb-2 block'>Email Address</label>
              <input
                type='text'
                className='focus:rings-0  w-full overflow-visible rounded border border-[#d5dae2] px-3 py-2 placeholder:text-sm placeholder:text-[#8c98a4] focus:border-[#3498db] focus:shadow focus:outline-none focus:ring-0 focus:ring-[#3498db] focus:ring-opacity-50'
                placeholder='A confirmation code will be sent to this address'
              />
            </div>
            <div className='mb-4 block'>
              <label className='mb-2 block'>Config Email Address</label>
              <input
                type='text'
                placeholder='Re-enter your email address'
                className='focus:rings-0  w-full overflow-visible rounded border border-[#d5dae2] px-3 py-2 placeholder:text-sm placeholder:text-[#8c98a4] focus:border-[#3498db] focus:shadow focus:outline-none focus:ring-0 focus:ring-[#3498db] focus:ring-opacity-50'
              />
            </div>
            <div className='mb-4 block'>
              <label className='mb-2 block'>Password</label>
              <input
                type='password'
                placeholder='******'
                className='focus:rings-0  w-full overflow-visible rounded border border-[#d5dae2] px-3 py-2 placeholder:text-sm placeholder:text-[#8c98a4] focus:border-[#3498db] focus:shadow focus:outline-none focus:ring-0 focus:ring-[#3498db] focus:ring-opacity-50'
              />
            </div>
            <div className='mb-4 block'>
              <label className='mb-2 block'>Config Password</label>
              <input
                type='password'
                placeholder='******'
                className='focus:rings-0  w-full overflow-visible rounded border border-[#d5dae2] px-3 py-2 placeholder:text-sm placeholder:text-[#8c98a4] focus:border-[#3498db] focus:shadow focus:outline-none focus:ring-0 focus:ring-[#3498db] focus:ring-opacity-50'
              />
            </div>
            <div className='block'>
              <div className='relative flex items-center'>
                <input
                  type='checkbox'
                  className='focus:rings-0 absolute mr-3 rounded  border border-[#d5dae2] focus:border-[#3498db] focus:shadow focus:outline-none focus:ring-0 focus:ring-[#3498db] focus:ring-opacity-50'
                />
                <span className='w-full pl-6 text-[#8c98a4]'>
                  I agree to the{' '}
                  <a
                    className='cursor-pointer border-b border-dashed border-[#97a4af] hover:text-[#3498db]'
                    href='#'
                  >
                    Terms and Conditions
                  </a>
                </span>
              </div>
            </div>
            <div className='relative block'>
              <div className=' flex items-center pl-6'>
                <input
                  type='checkbox'
                  className='focus:rings-0 absolute top-1 left-0 mr-3 rounded border border-[#d5dae2] focus:border-[#3498db] focus:shadow focus:outline-none focus:ring-0 focus:ring-[#3498db] focus:ring-opacity-50'
                />
                <span className='w-full  text-[#8c98a4]'>
                  I agree to receive the Etherscan newsletter and understand
                  that I can{' '}
                  <a className='cursor-pointer border-b border-dashed border-[#97a4af] hover:text-[#3498db]'>
                    unsubscribe{' '}
                  </a>
                  at any time.
                </span>
              </div>
            </div>
            <div className='my-12 flex justify-center'>
              <ReCaptchaV2 sitekey='6Leja5IiAAAAAPXmxBlErEWJKIw6jNEilqIRRzBQ' />
            </div>
            <div className='flex items-center justify-between'>
              <div className='max-w-[50%] px-2'>
                <span className='text-sm text-[#8c98a4]'>
                  Already have an account?{' '}
                </span>
                <Link
                  href='/login'
                  className='cursor-pointer text-sm hover:text-[#3498db]'
                >
                  Click to Sign In
                </Link>
              </div>
              <div className=''>
                <button
                  type='submit'
                  className=' rounded bg-[#3498db] px-3 py-2 text-xs text-white sm:px-4 sm:py-3'
                >
                  Create an Account
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default signUp;
