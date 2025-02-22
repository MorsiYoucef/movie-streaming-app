import { useState } from "react"
import { Link } from "react-router-dom"
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "@/store/authUser";
import { useContentStore } from "@/store/content";

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { user, logout } = useAuthStore()
    const { contentType, setContentType } = useContentStore()

    const handleToggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }
    console.log(" contentTYpe: ",contentType)
    return (
        <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between h-20'>
            <div className='flex items-center gap-10 z-50'>
                <Link to={'/'}>
                    <div className=" flex justify-center items-center">
                        <img src='/assets/shark.png' alt='logo' className='w-20 sm: w-10' />
                        <p className="text-3xl font-bold uppercase text-primary lg:text-4xl">
                            <span className="text-red-600"><span className="letter-shadow-r ml-0">B</span><span className="letter-shadow-r -ml-[0.25rem] lg:-ml-[0.25rem]">R</span><span className="letter-shadow-r -ml-[0.25rem] lg:-ml-[0.25rem]">O</span></span><span><span className="letter-shadow-r ml-0">F</span><span className="letter-shadow-r -ml-[0.25rem] lg:-ml-[0.25rem]">L</span><span className="letter-shadow-r -ml-[0.25rem] lg:-ml-[0.25rem]">I</span><span className="letter-shadow-r -ml-[0.25rem] lg:-ml-[0.25rem]">X</span></span></p>
                    </div>
                </Link>

                <div className=" hidden sm:flex gap-2 items-center">
                    <Link to={'/'} className=" hover:underline">Home</Link>
                    <Link to={'/'} className=" hover:underline" onClick={()=> setContentType("movie")}>Movies</Link>
                    <Link to={'/'} className=" hover:underline" onClick={()=> setContentType("tv")}>Series</Link>
                    <Link to={'/history'} className=" hover:underline">Search History</Link>
                </div>
            </div>

            <div className='flex gap-2 items-center z-50'>
				<Link to={"/search"}>
					<Search className='size-6 cursor-pointer' />
				</Link>
				<img src={user.image} alt='Avatar' className='h-8 rounded cursor-pointer' />
				<LogOut className='size-6 cursor-pointer' onClick={logout} />
				<div className='sm:hidden'>
					<Menu className='size-6 cursor-pointer' onClick={handleToggleMobileMenu} />
				</div>
			</div>

            {isMobileMenuOpen && (
                <div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
                <Link to={"/"} className='block hover:underline p-2' onClick={handleToggleMobileMenu} >
                    Movies
                </Link>
                <Link to={"/"} className='block hover:underline p-2' onClick={handleToggleMobileMenu}>
                    Tv Shows
                </Link>
                <Link to={"/history"} className='block hover:underline p-2' onClick={handleToggleMobileMenu}>
                    Search History
                </Link>
            </div>
            )}

        </header>
    )
}

export default Navbar
