import React from 'react'
import Logo from '../cinema_11883896.png'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex border space-x-8 items-centre pl-3 py-3  font-serif'>
      <img className='w-[30px]' src={Logo} alt=' '></img>
      <Link to='/' className='text-blue-600 text-xl'> Home</Link>
      <Link to='/watchlist' className='text-blue-600 text-xl'>Watchlist</Link>
    </div>
  )
}

export default Navbar
