// Navigation component
import Link from 'next/link';
import { useState } from 'react';

const Navigation = () => {
  const [active, setActive] = useState(false);

  const toggleState = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className='flex items-center flex-wrap bg-white p-3'>
        <Link href='/'>
          <a className='inline-flex items-center p-2 mr-4'>
            <span className='text-xl text-blue-400 font-bold uppercase tracking-wide logo pl-8 lg:px-0'>
              Health Explore
            </span>
          </a>
        </Link>
        <button
          className='inline-flex p-3 rounded lg:hidden text-black ml-auto hover:text-white outline-none sm:absolute hamburger'
          onClick={toggleState}
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>

        <div
          className={`${active ? '' : 'hidden'
            }   w-full lg:inline-flex lg:flex-grow lg:w-auto lg:items-center`}
        >
          <div className='w-full flex justify-center xl:space-x-10 lg:space-x-4 lg:inline-flex lg:flex-row items-start  flex flex-col lg:h-auto'>
            <Link href='/'>
              <a className='lg:inline-flex lg:w-auto w-full text-black uppercase font-semibold hover:text-blue-400'>
                profile
              </a>
            </Link>
            <Link href='/'>
              <a className='lg:inline-flex lg:w-auto w-full text-black uppercase font-semibold hover:text-blue-400'>
                jobs
              </a>
            </Link>
            <Link href='/'>
              <a className='lg:inline-flex lg:w-auto w-full text-black uppercase font-semibold hover:text-blue-400'>
                professional network
              </a>
            </Link>
            <Link href='/'>
              <a className='lg:inline-flex lg:w-auto w-full text-black uppercase font-semibold hover:text-blue-400'>
                lougue
              </a>
            </Link>
            <Link href='/'>
              <a className='lg:inline-flex lg:w-auto w-full text-black uppercase font-semibold hover:text-blue-400'>
                salary
              </a>
            </Link>
          </div>
        </div>
        <div className="flex">
          <button className="text-blue-400 hidden lg:block border-2 h-9 m-2 px-4 rounded-md border-blue-400 uppercase font-semibold">create job</button>
          <div className="inline relative ml-10 inline-block avartar">
            <div className="avatar-circle">
              <span className="initials">JD</span>
            </div>
            <span className="absolute bottom-0 right-0 -top-1 text-xs inline-block pl-1 box-border h-5 w-5 border-2  border-gray-50 rounded-full text-gray-50 bg-red-600">2</span>
          </div>
          <span className="hidden sm:block inline m-3 uppercase font-semibold">
            logout
            </span>
        </div>
      </nav>
    </>
  );
};
export default Navigation;