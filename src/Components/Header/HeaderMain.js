import React from 'react'
import UserNameHead from './UserNameHead'
import Transition from './Transition'
import Search from './search'

const HeaderMain = ({title,user,TotalQuantity,setSearchQuery, searchQuery, product, token }) => {
  return (
    <div>
      <UserNameHead title={title} user={user} TotalQuantity={TotalQuantity} token={token} />
      <Transition/>
      <Search setSearchQuery={setSearchQuery} searchQuery={searchQuery} product={product}/>
    </div>
  )
}

export default HeaderMain
