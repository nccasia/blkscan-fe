import Layout from "@/components/layout/Layout";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";

type FormValue = {
  username: string,
  password: string
}

const schema = yup.object({
  username: yup.string().required(""),
  password: yup.string().required("")
});

const Login = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValue>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: FormValue) => {
    console.log({ data });
  };

  return (
    <Layout>
      <div className="bg-main-bg py-[3.25rem]">
        <div className="layout">
          <div className="w-full">
            <form className="w-full lg:w-1/2 mx-auto" onSubmit={handleSubmit(onSubmitHandler)}>
              <div>
                <h2 className="text-primary font-normal text-2xl">Welcome <strong className="font-semibold">back</strong></h2>
                <p className="text-[#6c757e] mb-4 text-[0.875rem]">Login to your account</p>
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="block mb-[0.5rem] text-[0.875rem]">
                  Username
                </label>
                <input {...register("username")} type="text" id="username" placeholder="Username"
                  className="w-full px-[0.75rem] text-[0.875rem] rounded border border-solid border-[#d5dae2]
              focus:ring-0"
                />
              </div>

              <div className="mb-4">
                <div className="flex justify-between mb-[0.5rem] text-[0.875rem]">
                  <label htmlFor="password" className="block">
                    Password
                  </label>
                  <div className="border-b border-dashed border-[#97a4af]">
                    <Link href='/lostpassword'>
                      <a className="text-[#8c98a4] text-xs hover:text-[#3498db]">
                        Forgot your password?
                      </a>
                    </Link>
                  </div>
                </div>
                <input {...register("password")} type="text" id="password" placeholder="Password"
                  className="w-full px-[0.75rem] text-[0.875rem] rounded border border-solid border-[#d5dae2]
              focus:ring-0"
                />
              </div>

              <div className="mb-4 flex items-center">
                <input type="checkbox" id="rememberLogin"
                  className="focus:rings-0 mr-[10px] w-4 h-4 rounded  border border-[#d5dae2] focus:border-[#3498db] focus:shadow focus:outline-none focus:ring-0 focus:ring-[#3498db] focus:ring-opacity-50"
                />
                <label htmlFor="rememberLogin" className="text-[#8c98a4] text-[0.875rem]">
                  Remember & Auto Login
                </label>
              </div>
              <div className="flex justify-center">
                <ReCAPTCHA
                  sitekey="6LegSJIiAAAAAA25zp_rjkTvJgOKxIcEVqnZ889O"
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="text-[#8c98a4] text-[0.875rem] mr-2">Don't have an account?</p>
                  <div>
                    <Link href='/register'>
                      <a className="text-sm text-[#3498db] text-[0.875rem] block">
                        Click to sign up
                      </a>
                    </Link>
                  </div>
                </div>
                <button type="submit" className="bg-[#3498db] uppercase text-white py-[0.6rem] px-[1.25rem] text-xs rounded">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login;