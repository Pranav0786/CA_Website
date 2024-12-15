import React from 'react'
import HeroSection from '../components/HomePage/HeroSection'
import { ContactUS } from '../components/HomePage/ContactUS'

export const Homepage = () => {
  return (
    <div className='h-full flex mx-auto items-center flex-col justify-center'>
        <HeroSection />
        <ContactUS />
    </div>
  )
}
