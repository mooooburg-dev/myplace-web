import React from 'react'
import Footer from './Footer'
import Header from './Header'
import NewsContainer from './NewsContainer'
import TitleContainer from './TitleContainer'

const Main = () => {
  return (
    <div>
      <Header></Header>
      <div className="container col-sm-12 col-md-6">
        <TitleContainer></TitleContainer>
        <NewsContainer></NewsContainer>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Main
