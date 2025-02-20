import { Link } from "react-router-dom"
import { useState } from "react";
import { useAuthStore } from "@/store/authUser";
import toast from "react-hot-toast";

function LoginPage() {
  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

  const { login } = useAuthStore()
  // const navigate = useNavigate()

  const handleLogin = (e) => {
		e.preventDefault();
    try {
      login({ email, password });
      // navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
		
	};
  
  return (
    <div className='h-screen w-full hero-bg'>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
      <Link to={"/"}>
          <div className=" flex justify-center items-center">
            <img src='/assets/shark.png' alt='logo' className='w-20' />
            <p className="text-3xl font-bold uppercase text-primary lg:text-4xl">
              <span className="text-red-600"><span className="letter-shadow-r ml-0">B</span><span className="letter-shadow-r -ml-[0.25rem] lg:-ml-[0.25rem]">R</span><span className="letter-shadow-r -ml-[0.25rem] lg:-ml-[0.25rem]">O</span></span><span><span className="letter-shadow-r ml-0">F</span><span className="letter-shadow-r -ml-[0.25rem] lg:-ml-[0.25rem]">L</span><span className="letter-shadow-r -ml-[0.25rem] lg:-ml-[0.25rem]">I</span><span className="letter-shadow-r -ml-[0.25rem] lg:-ml-[0.25rem]">X</span></span></p>
          </div>
        </Link>
      </header>

      <div className='flex justify-center items-center mt-20 mx-3'>
        <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
          <h1 className='text-center text-white text-2xl font-bold mb-4'>Login</h1>

          <form className='space-y-4' onSubmit={handleLogin}>
            <div>
              <label htmlFor='email' className='text-sm font-medium text-gray-300 block'>
                Email
              </label>
              <input
                type='email'
                className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                placeholder='you@example.com'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor='password' className='text-sm font-medium text-gray-300 block'>
                Password
              </label>
              <input
                type='password'
                className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                placeholder='••••••••'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className='w-full py-2 bg-red-600 text-white font-semibold rounded-md
							hover:bg-red-700
						'
              // disabled={isLoggingIn}
            >
              {/*isLoggingIn ? "Loading..." :*/ "Login"}
            </button>
          </form>
          <div className='text-center text-gray-400'>
            Don't have an account?{" "}
            <Link to={"/signup"} className='text-red-500 hover:underline'>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
