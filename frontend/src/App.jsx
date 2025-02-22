import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/LoginPage'
import SigupPage from './pages/SigupPage'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import EmailVerification from './pages/EmailVerification'
import SearchPage from './pages/SearchPage'
import HistoryPage from './pages/HistoryPage'
import WatchPage from './pages/WatchPage'
import { useAuthStore } from './store/authUser'
import { useEffect } from 'react'
import { Loader } from "lucide-react";

function App() {
  const { authCheck, isCheckingAuth, user } = useAuthStore()

  useEffect (()=>{
    authCheck()
  },[authCheck])

  console.log("is check auth",isCheckingAuth);

  if (isCheckingAuth) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-600 size-10' />
				</div>
			</div>
		);
	}

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!user ? <SigupPage /> : <Navigate to={"/"} />} />
        <Route path='/verify-email' element={!user ? <EmailVerification /> : <Navigate to={"/"} />} />
        <Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/"} />} />
        <Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/"} />} />
        <Route path='/history' element={user ? <HistoryPage /> : <Navigate to={"/"} />} />
      </Routes>
      <Footer />
      <Toaster />
    </>

  )
}

export default App
