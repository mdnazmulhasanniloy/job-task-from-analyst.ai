import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './../../context/AuthProvider';
import { useForm } from 'react-hook-form';
import useToken from './../../Hooks/useToken';
import { toast } from 'react-hot-toast';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useTitle } from './../../Hooks/useTitle';






const Login = () => {

  const [loader, setLoader] = useState(false)
  const { signInUserPassword, googleSignIn } = useContext(AuthContext)
  const [createdUserEmail, setCreatedUserEmail] = useState('');
  const [passwordToggle, setPasswordToggle] = useState(false);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [token] = useToken(createdUserEmail)
  const location = useLocation()
  const navigate = useNavigate()
  useTitle('Login')



  const from = location?.state?.from || '/';

  if (token) {
      navigate(from, { replace: true })
      toast.success('Login success full');
  }


  //login user password
  const onSubmit = (data) => {

    // LOGIN user login
    setLoader(true)
    //Sign in user password
    signInUserPassword(data.email, data.password)
        .then((result) => {
            const user = result.user;
            setCreatedUserEmail(user.email)
            setLoader(false)



        }).catch((error) => {

            const errorMessage = error.message;
            toast.error(errorMessage)
            setLoader(false)
        });
}


//google login
const handelToGoogleLogin = () => {

    setLoader(true)

    googleSignIn()
        .then((result) => {
            const user = result.user;
            setCreatedUserEmail(user.email)
            setLoader(false);

        }).catch((error) => {

            const errorMessage = error.message;
            toast.error(errorMessage)
            setLoader(false)


        });


}

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign In</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mt-4"
                        name="email"
                        placeholder="Email" {...register("email", {
                                    required: "Please enter a valid email address (the data you entered is not in the right format) ",
                                    maxLength: { value: 50, message: "you enter value is up to 50 characters" }

                                })}/>
                      {
                        errors.email && <p className=' text-red-600 text-sm'>{errors.email.message}</p>
                      }
                    <div className="relative">
                      <input 
                        type={passwordToggle?'text':"password"}
                        className="block border border-grey-light w-full p-3 rounded mt-4"
                        name="password"
                        placeholder="Password" {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "At last provide 6 characters" },
                                pattern: {
                                    value: /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]/,
                                    message: "must include lower, upper, number, and special chars"
                                }


                            })}/>
                      <div className="absolute top-2 right-1 mr-5 ">
                      {
                        passwordToggle ? <AiFillEyeInvisible onClick={() => setPasswordToggle(!passwordToggle)} className='text-3xl text-green-600 cursor-pointer' />
                                      : <AiFillEye onClick={() => setPasswordToggle(!passwordToggle)} className='text-3xl text-green-600 cursor-pointer' />
                      }
                      </div>

                    </div>

                    {
                      errors.password && <p className=' text-red-600 text-sm'>{errors.password.message}</p>
                    }

                    <button
                      disabled={loader? true : false}
                      type='submit'
                      className='w-full mt-4 text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1'
                    >{loader? 'Lodging...' : 'Login Account'}</button>
                    
                    </form>

                    <div className="text-center text-sm text-grey-dark mt-4">
                          <button  
                              onClick={handelToGoogleLogin}
                              type='button'
                              disabled={loader? true : false}
                              className='flex break-inside bg-white 
                                   text-green-500 border-2
                                   border-green-500 
                                   rounded-3xl px-6 py-3 mb-4 w-full'>

                            <div className='m-auto'>
                              <div className='flex items-center justify-start flex-1 space-x-4'>
                                <svg width='25' height='25' viewBox='0 0 24 24'>
                                  <path fill='currentColor'
                                    d='M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z' />
                                </svg>
                                <span className='font-medium mb-[-2px]'>{loader? 'Lodging...' : 'Continue with Google'}</span>
                              </div>
                            </div>
                          </button>
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                    Don't have an account? 
                    <Link to='/register' className="no-underline border-b text-blue-600 border-blue text-blue">
                        Register
                    </Link>.
                </div>
            </div>
        </div>
  );
};

export default Login;