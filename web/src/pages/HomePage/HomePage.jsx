import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import MainSection from './MainSection'
import NewsLet from '../HomePage/NewsLet'
import ReviewsSection from './ReviewsSection'
import WhyChooseus from './WhyChooseus'
export default function HomePage() {
  return (
    <div>
      {/* <Navbar/> */}
      <MainSection/>
<WhyChooseus/>
      <ReviewsSection/>
      <NewsLet/>
      
      
    </div>
  )
}
