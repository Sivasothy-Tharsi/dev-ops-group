import React from 'react'
import Head from './Head'
import Transition from './Transition'
import Search from './search'


const Header = ({title, setSearchQuery, searchQuery, product}) => {

  return (
    <>
    <section className='main-content'>
      <header>
        <Head title={title} />
        <Transition/>
        <Search setSearchQuery={setSearchQuery} searchQuery={searchQuery} product={product}/>
      </header>
    </section>
     
    </>
  )
}

export default Header
