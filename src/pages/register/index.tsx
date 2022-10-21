import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import React from 'react';
import ReCaptchaV2 from 'react-google-recaptcha';

const SignUp = () => {
  return (
    <Layout>
      <div className=' block w-full bg-[#f8f9fa] text-[black]'>
        <div className='layout py-12 text-left font-primary text-sm font-normal sm:px-[45px]'>
          <form className='  mx-auto block w-full lg:!w-1/2 md:w-3/4'>
            <div className='w-full'>
              <h1 className='mb-2 text-2xl  font-normal text-[#3498db]'>
                Register a <strong className='text-2xl leading-6'>New</strong>{' '}
                Account
              </h1>
              <p className='mb-4 leading-7 text-[#6c757e]'>Fill out the form to get started.</p>
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
                <label className='mb-2 block'>Confirm Email Address</label>
                <input
                  type='text'
                  placeholder='Re-enter your email address'
                  className='focus:rings-0  w-full overflow-visible rounded border border-[#d5dae2] px-3 py-2 placeholder:text-sm placeholder:text-[#8c98a4] focus:border-[#3498db] focus:shadow focus:outline-none focus:ring-0 focus:ring-[#3498db] focus:ring-opacity-50'
                />
              </div>
              <div className='mb-4 sm:flex'>
                <div className='sm:pr-[7.5px] ư-full sm:w-1/2'>
                  <label className='mb-2 block'>Password</label>
                  <input
                    type='password'
                    placeholder='******'
                    className='focus:rings-0  w-full overflow-visible rounded border border-[#d5dae2] px-3 py-2 placeholder:text-sm placeholder:text-[#8c98a4] focus:border-[#3498db] focus:shadow focus:outline-none focus:ring-0 focus:ring-[#3498db] focus:ring-opacity-50'
                  />
                </div>
                <div className='sm:pl-[7.5px] w-full sm:w-1/2'>
                  <label className='mb-2 block'>Confirm Password</label>
                  <input
                    type='password'
                    placeholder='******'
                    className='focus:rings-0  w-full overflow-visible rounded border border-[#d5dae2] px-3 py-2 placeholder:text-sm placeholder:text-[#8c98a4] focus:border-[#3498db] focus:shadow focus:outline-none focus:ring-0 focus:ring-[#3498db] focus:ring-opacity-50'
                  />
                </div>
              </div>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='focus:rings-0 mr-3 rounded  border border-[#d5dae2] focus:border-[#3498db] focus:shadow focus:outline-none focus:ring-0 focus:ring-[#3498db] focus:ring-opacity-50'
                />
                <span className='w-full text-[#8c98a4]'>
                  I agree to the{' '}
                  <Link href="/terms">
                    <a
                      className='cursor-pointer border-b border-dashed border-[#97a4af] hover:text-[#3498db]'
                    >
                      Terms and Conditions
                    </a>
                  </Link>
                </span>
              </div>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='focus:rings-0 mr-3 rounded  border border-[#d5dae2] focus:border-[#3498db] focus:shadow focus:outline-none focus:ring-0 focus:ring-[#3498db] focus:ring-opacity-50'
                />
                <span className='w-full text-[#8c98a4]'>
                  I agree to receive the Etherscan newsletter and understand that I can {' '}
                  <Link href="/subcribe">
                    <a
                      className='cursor-pointer border-b border-dashed border-[#97a4af] hover:text-[#3498db]'
                    >
                      unscribe {' '}
                    </a>
                  </Link>
                  any time.
                </span>
              </div>
              <div className='my-12 flex justify-center'>
                <ReCaptchaV2 sitekey='6Leja5IiAAAAAPXmxBlErEWJKIw6jNEilqIRRzBQ' />
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col sm:flex-row'>
                  <span className='text-sm text-[#8c98a4] mr-2'>
                    Already have an account?{' '}
                  </span>
                  <Link
                    href='/login'
                  >
                    <a className="text-sm text-[#3498db] text-[0.875rem] block">
                      Click to sign in
                    </a>
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
    </Layout>
  );
};

export default SignUp;