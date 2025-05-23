import React from 'react'
import Card from '../../components/admin/Card'
import ImageSlider from '../../components/admin/ImageSlider';
const Dashboard = () => {
  const cards = [1, 2, 3, 4];
  return (
    <div className='w-full'>
      <ImageSlider/>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((item, index) => (
          <Card key={index} />
        ))}
      </div>

     



    </div>
  )
}

export default Dashboard