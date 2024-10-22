import React from 'react'
import caro1 from '../assets/caro-1.jpeg'
import caros1 from '../assets/caro-1-2.jpeg'


const Home = () => {
  return (
    <>
    <div className="carousel w-full h-[650px] bg-inherit">
  <div  className="carousel-item relative w-full">
    <img
      src={caro1}
      className="w-1/2 pl-20" />
    <img
      src={caros1}
      className="w-1/2 pr-20" />
    
  </div>
</div>

</>

  )
}

export default Home