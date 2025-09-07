import React from 'react'

const Nav = () => {
  return (
      <nav className='bg-gray-700 w-[100vw] flex justify-between p-4'>
        <div className='font-bold text-2xl'>&lt;Password
        <span className='text-black'> Manager</span>/&gt;</div>
        <ul>
            <li className='flex gap-9 text-xl font-light'>
                <a href="" className='hover:scale-[1.1] transition duration-300'>Home </a>
                <a href="" className='hover:scale-[1.1] transition duration-300'>About</a>
                <a href="" className='hover:scale-[1.1] transition duration-300'>Manage</a>
            </li>
      </ul>
    </nav>
  )
}

export default Nav
