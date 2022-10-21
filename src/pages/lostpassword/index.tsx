import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import React from 'react';
import { ReCAPTCHA } from 'react-google-recaptcha';

const LostPassword = () => {
  return (
    <Layout>
      <div className='relative block w-full bg-[#f8f9fa] text-[black]'>
        <div className='layout py-12 text-left font-primary text-sm font-normal sm:px-[45px]'>
          <form className=' relative mx-auto block w-full lg:!w-1/2 md:w-3/4'>
            <div className='w-full'>
              <h1 className='mb-2 text-2xl  font-normal text-[#3498db]'>
                Forgot your password?
              </h1>
              <p className='mb-4 leading-7 text-[#6c757e]'>Enter your email address below and we'll get you back on track.</p>
            </div>
            <div className='block'>
              <div className='mb-4 block '>
                <label className='mb-2 block'>Email Address</label>
                <input
                  type='text'
                  className='focus:rings-0  w-full overflow-visible rounded border border-[#d5dae2] px-3 py-2 placeholder:text-sm placeholder:text-[#8c98a4] focus:border-[#3498db] focus:shadow focus:outline-none focus:ring-0 focus:ring-[#3498db] focus:ring-opacity-50'
                  placeholder='Email address'
                />
              </div>
              <div className=" my-12 flex justify-center">
                <ReCAPTCHA
                  sitekey="6LegSJIiAAAAAA25zp_rjkTvJgOKxIcEVqnZ889O"
                />
              </div>
              <div className='flex items-center justify-between'>
                <div className="border-b border-dashed border-[#97a4af]">
                  <Link href='/login'>
                    <a className="text-[#8c98a4] text-[0.875rem] hover:text-[#3498db]">
                      Back to sign in
                    </a>
                  </Link>
                </div>
                <div>
                  <button
                    type='submit'
                    className=' rounded bg-[#3498db] px-3 py-2 text-xs text-white sm:px-4 sm:py-3'
                  >
                    Reset password
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

export default LostPassword;