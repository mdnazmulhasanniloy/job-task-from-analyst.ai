import React, { useContext, useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import useToken from './../../Hooks/useToken';
import { AuthContext } from './../../context/AuthProvider';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTitle } from './../../Hooks/useTitle';





const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext)
  const [passwordToggle, setPasswordToggle] = useState(false)
  const [loader, setLoader] = useState(false)
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [createdUserEmail, setCreatedUserEmail] = useState('')
  const [token] = useToken(createdUserEmail);
  const Navigate = useNavigate();
  const location = useLocation();
  useTitle('Register')



  const from = location?.state?.from || '/';

    if (token) {
      Navigate(from, { replace: true })
      setLoader(false)
      toast.success('Register success full');

  }

  //register width user password
  const onSubmit = (data) => {
    setLoader(true)
    const imgHostKey = `1ac619d1289137be2fe6cbaa52f2b8f9`

    const image = data.img[0];
    const formData = new FormData();
    formData.append('image', image);

    fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(imgData => {
            if (imgData.success) {

                const userInfo = {
                    displayName: data.name,
                    photoURL: imgData.data.url,

                }

                // create user
                createUser(data.email, data.password)
                    .then((result) => {
                        const user = result.user;

                        // update user profile
                        updateUserProfile(userInfo)
                            .then(() => {
                                saveUser(data.name, data.email, imgData.data.url);
                            })
                            .catch(err => {
                                toast.error(err.message)
                                setLoader(false)
                            });

                    }).catch((error) => {

                        const errorMessage = error.message;
                        toast.error(errorMessage)
                        setLoader(false)


                    });

            }
        });

}

//google login



const HandelToGoogleLogin = () => {
  console.log('click');

  setLoader(true)
  googleSignIn()
      .then((result) => {
          const user = result.user;
          const role = 'user';
          saveUser(user.displayName, user.email, role, user.photoURL);
          setCreatedUserEmail(user.email);
          setLoader(false);


      }).catch((error) => {

          const errorMessage = error.message;
          toast.error(errorMessage)
          setLoader(false)

      });
}


//save user in database

const saveUser = (name, email, img) => {
  const users = {
      name,
      email,
      role:'user',
      img
  }
  fetch(`https://task-server-steel.vercel.app/users`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(users)
  })
      .then(res => res.json())
      .then(data => {
          setCreatedUserEmail(email);
          setLoader(false)
      })
      .catch(error => toast.error(error.message))
}

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded"
                        name="name"
                        placeholder="Full Name" {...register("name", {
                                    required: "This field is required (You can't leave this field blank) ",
                                    maxLength: { value: 20, message: "Please Provide" }

                                })} />
                    {
                      errors.name && <p className=' text-red-600 text-sm'>{errors.name.message}</p>
                    }

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

                      <input 
                        type="file"
                        className="block border border-grey-light w-full p-3 rounded mt-4 cursor-pointer file:decoration-none"
                                {...register("img", {
                                    required: "img is required",
                                })} accept=".png, .jpg, .jpeg"/>
                    {
                      errors.img && <p className=' text-red-600 text-sm'>{errors.img.message}</p>
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
                    >{loader? 'Lodging...' : 'Create Account'}</button>
                    
                    </form>

                    <div className="text-center text-sm text-grey-dark mt-4">
                          <button 
                              disabled={loader? true : false}
                              onClick={HandelToGoogleLogin}
                              type='button'
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
                    Already have an account? 
                    <Link to='/login' className="no-underline border-b text-blue-600 border-blue text-blue">
                        Login
                    </Link>.
                </div>
            </div>
        </div>
  );
};

export default Register;