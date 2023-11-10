import React from 'react'

function Header() {
  return (
    <div className='h-12 bg-white mb-2 text-start pl-16 pt-2 fixed w-full'>
    <h1 style={{fontFamily:'Kay Pho Du ,sans-serif'}} className='text-2xl '><i className="fa-solid fa-receipt fa-bounce me-3" style={{color:'#9701A9'}}></i>My Expense Tracker</h1>
    </div>
  )
}

export default Header