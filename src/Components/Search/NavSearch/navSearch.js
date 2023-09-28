import React, { useState } from 'react'
import "./navSearch.css"
import customIcons from '../../../Icons/icons'

function NavSearch({ searchInput, setSearchInput }) {

  console.log(searchInput)

  return (
    <div className='navSearch'>
      <customIcons.search/>
      <input type='text' className='navSearchArea' placeholder='search' onChange={(e) => setSearchInput(e.target.value)}/>
    </div>
  )
}

export default NavSearch
