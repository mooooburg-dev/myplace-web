import React from 'react'
import Footer from './Footer'
import Header from './Header'
import NewsContainer from './NewsContainer'
import TitleContainer from './TitleContainer'

const Main = () => {
  return (
    <div>
      <Header />
      <div className="container col-sm-12 col-md-6">
        <TitleContainer />
        <NewsContainer />
      </div>
      <Footer />
    </div>
  )
}

export default Main
