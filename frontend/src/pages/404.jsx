import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div
            className='min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white'
            style={{ backgroundImage: `url('/assets/404.png')` }}
        >
            <header className='absolute top-0 left-0 p-4 bg-black w-full '>
                <Link to={'/'}>
                    <div className=" flex items-center">
                        <img src='/assets/shark.png' alt='logo' className='w-20 sm: w-10' />
                        <p className="text-3xl font-bold uppercase text-primary lg:text-4xl">
                            <span className="text-red-600"><span className="letter-shadow-r ml-0">B</span><span className="letter-shadow-r -ml-[0.25rem] lg:-ml-[0.25rem]">R</span><span className="letter-shadow-r -ml-[0.25rem] lg:-ml-[0.25rem]">O</span></span><span><span className="letter-shadow-r ml-0">F</span><span className="letter-shadow-r -ml-[0.25rem] lg:-ml-[0.25rem]">L</span><span className="letter-shadow-r -ml-[0.25rem] lg:-ml-[0.25rem]">I</span><span className="letter-shadow-r -ml-[0.25rem] lg:-ml-[0.25rem]">X</span></span></p>
                    </div>
                </Link>
            </header>
            <main className='text-center error-page--content z-10'>
                <h1 className='text-7xl font-semibold mb-4'>Lost your way?</h1>
                <p className='mb-6 text-xl'>
                    Sorry, we can't find that page. You'll find lots to explore on the home page.
                </p>
                <Link to={"/"} className='bg-white text-black py-2 px-4 rounded'>
                    Netflix Home
                </Link>
            </main>
        </div>
    );
};
export default NotFoundPage;