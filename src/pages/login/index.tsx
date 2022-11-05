import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Layout from '@/components/layout/Layout';

type FormValue = {
  username: string;
  password: string;
};

const schema = yup.object({
  username: yup.string().required(''),
  password: yup.string().required(''),
});

const Login = () => {
  const { register, handleSubmit } = useForm<FormValue>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: FormValue) => {
    // eslint-disable-next-line no-console
    console.log({ data });
  };

  return (
    <Layout>
      <div className='bg-main-bg py-[3.25rem]'>
        <div className='layout'>
          <div className='w-full'>
            <form
              className='mx-auto w-full lg:w-1/2'
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <div>
                <h2 className='text-primary text-2xl font-normal'>
                  Welcome <strong className='font-semibold'>back</strong>
                </h2>
                <p className='mb-4 text-[0.875rem] text-[#6c757e]'>
                  Login to your account
                </p>
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='username'
                  className='mb-[0.5rem] block text-[0.875rem]'
                >
                  Username
                </label>
                <input
                  {...register('username')}
                  type='text'
                  id='username'
                  placeholder='Username'
                  className='w-full rounded border border-solid border-[#d5dae2] px-[0.75rem] text-[0.875rem]
              focus:ring-0'
                />
              </div>

              <div className='mb-4'>
                <div className='mb-[0.5rem] flex justify-between text-[0.875rem]'>
                  <label htmlFor='password' className='block'>
                    Password
                  </label>
                  <div className='border-b border-dashed border-[#97a4af]'>
                    <Link href='/lostpassword'>
                      <a className='text-xs text-[#8c98a4] hover:text-[#3498db]'>
                        Forgot your password?
                      </a>
                    </Link>
                  </div>
                </div>
                <input
                  {...register('password')}
                  type='text'
                  id='password'
                  placeholder='Password'
                  className='w-full rounded border border-solid border-[#d5dae2] px-[0.75rem] text-[0.875rem]
              focus:ring-0'
                />
              </div>

              <div className='mb-4 flex items-center'>
                <input
                  type='checkbox'
                  id='rememberLogin'
                  className='focus:rings-0 mr-[10px] h-4 w-4 rounded  border border-[#d5dae2] focus:border-[#3498db] focus:shadow focus:outline-none focus:ring-0 focus:ring-[#3498db] focus:ring-opacity-50'
                />
                <label
                  htmlFor='rememberLogin'
                  className='text-[0.875rem] text-[#8c98a4]'
                >
                  Remember & Auto Login
                </label>
              </div>
              <div className='flex justify-center'>
                <ReCAPTCHA sitekey='6LegSJIiAAAAAA25zp_rjkTvJgOKxIcEVqnZ889O' />
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex flex-col sm:flex-row sm:items-center'>
                  <p className='mr-2 text-[0.875rem] text-[#8c98a4]'>
                    Don't have an account?
                  </p>
                  <div>
                    <Link href='/register'>
                      <a className='block text-sm text-[0.875rem] text-[#3498db]'>
                        Click to sign up
                      </a>
                    </Link>
                  </div>
                </div>
                <button
                  type='submit'
                  className='rounded bg-[#3498db] py-[0.6rem] px-[1.25rem] text-xs uppercase text-white'
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
