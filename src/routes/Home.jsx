import React from 'react'
import HomeItem from '../components/HomeItem';
import { useSelector } from 'react-redux';

const Home = () => {

  const items = useSelector((store) => store.items)

  return (
    <main>
      <div className="items-container">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => <HomeItem key={item.id} item={item} />)
        ) : (
          <p>No items available</p>
        )}
      </div>

    </main>
  )
}

export default Home