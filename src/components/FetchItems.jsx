import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatusActions } from '../store/fetchStatusSlice';
import HomeItem from './HomeItem';
import Header from './Header';
import Sidebar from '../Sidebar/Sidebar';
import ProductInfoPage from './ProductInfo/ProductInfoPage';

const FetchItems = () => {
  const [items, setItems] = useState([]); // All fetched items
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered items based on query
  const [isFiltered, setIsFiltered] = useState(false); 
  const [cartCount, setCartCount] = useState(0); 
  const [query, setQuery] = useState(''); // Search query
  const [selectedCategory, setSelectedCategory] = useState(''); 

  const fetchStatus = useSelector((state) => state.fetchStatus); // Fetch status from Redux
  const dispatch = useDispatch();

  const categories = ['Clothing', 'Women', 'Electronics', 'jewelery']; 
  const NavCategories = ['Fashion', 'Electronics', 'Home', 'Beauty'];

  const handleInputChange = (e) => setQuery(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  const handleAddToCart = (item) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (!cartItems.some((cartItem) => cartItem.id === item.id)) {
      cartItems.push(item);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      setCartCount(cartCount + 1);
    }
  };

  
  const handleFilter = () => {
    const filtered = items.filter((item) =>
      item.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
    setIsFiltered(true);
  };

  // Filters items whenever query, category, or other states change
  useEffect(() => {
    const filtered = items.filter((item) => {
      const matchesQuery = query
        ? item.title?.toLowerCase().includes(query.toLowerCase())
        : true;

      const matchesCategory = selectedCategory
        ? item.category?.toLowerCase().includes(selectedCategory.toLowerCase())
        : true;

      return matchesQuery && matchesCategory;
    });

    setFilteredProducts(filtered);
    setIsFiltered(query || selectedCategory ? true : false);
  }, [query, selectedCategory, items]);

  // Fetches items on component mount
  useEffect(() => {
    if (fetchStatus.fetchDone) return; // Avoid redundant fetches

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchStatusActions.markFetchingStarted());

    const url = 'https://fakestoreapi.com/products?limit=100'; 
    const options = {
      method: 'GET',
      signal,
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setItems(data);
        console.log(data);
        
        dispatch(fetchStatusActions.markFetchDone());
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('Fetch error:', err);
          dispatch(fetchStatusActions.markFetchingError());
        }
      });

    return () => controller.abort();
  }, [dispatch, fetchStatus]);

  return (
    <div>
      <Header
        handleFilter={handleFilter}
        cartCount={cartCount}
        handleInputChange={handleInputChange}
        query={query}
        categories={categories}
        handleCategoryChange={handleCategoryChange}
      />
      <Sidebar
        categories={categories}
        handleCategoryChange={handleCategoryChange}
      />

      <div className="items-container" key={Math.random()}>
        {fetchStatus.isFetching ? (
          <p>Loading...</p>
        ) : fetchStatus.fetchError ? (
          <p>Error loading items. Please try again.</p>
        ) : isFiltered ? (
          filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <HomeItem
                key={item.id || index}
                item={item}
                onAddToCart={() => handleAddToCart(item)}
              />
            ))
          ) : (
            <p>No items match the selected filters.</p>
          )
        ) : items.length > 0 ? (
          items.map((item , index) => (
            <HomeItem
              uniquekey={item.id || index}
              item={item}
              onAddToCart={() => handleAddToCart(item)}
            />
          ))
        ) : (
          <p>No items available.</p>
        )}
       
      </div>
    </div>
  );
};

export default FetchItems;
