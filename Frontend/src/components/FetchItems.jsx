import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatusActions } from "../store/fetchStatusSlice";
import HomeItem from "./HomeItem";
import Header from "./Header/Header.jsx";
import Sidebar from "../Sidebar/Sidebar";
import { getAllProducts } from "../api/productAPI";
import Masonry from "react-masonry-css";
import axios from "axios";

const FetchItems = () => {
  const [items, setItems] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const fetchStatus = useSelector((state) => state.fetchStatus);
  const dispatch = useDispatch();

  const categories = ["Clothing", "Beauty", "Electronics", "Accessories"];

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      // 🔄 Refetch all products from backend
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setItems(res.data);
        setIsFiltered(false);
        setFilteredProducts(res.data);
      } catch (err) {
        console.error("Error restoring all products:", err);
      }
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/products?search=${encodeURIComponent(value)}`
      );

      if (Array.isArray(res.data)) {
        setFilteredProducts(res.data);
      } else {
        setFilteredProducts([]);
      }
      console.log("Response received:", res.data);

      setIsFiltered(true);
    } catch (err) {
      console.error("Search failed", err);
      setFilteredProducts([]);
    }
  };

  const handleCategoryChange = async (selected) => {
    // const selected = e.target.value;
    setSelectedCategory(selected);

    // ❌ Agar empty hai, to saare products dikhao
    if (selected === "") {
      setIsFiltered(false);
      setFilteredProducts(items);
      return;
    }

    // ✅ Backend se filter karo
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products?search=${encodeURIComponent(
          selected
        )}`
      );
      setFilteredProducts(res.data);
      setIsFiltered(true);
    } catch (err) {
      console.error("Category filter failed", err);
      setFilteredProducts([]);
    }
  };

  const handleFilter = () => {
    const filtered = items.filter((item) =>
      item.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
    setIsFiltered(false);
  };

  useEffect(() => {
    // if (fetchStatus.fetchDone) return;
    dispatch(fetchStatusActions.markFetchingStarted());

    getAllProducts()
      .then((res) => {
        setItems(res.data);
        dispatch(fetchStatusActions.markFetchDone());
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        dispatch(fetchStatusActions.markFetchingError());
      });
  }, [dispatch, fetchStatus]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div >
      <Header
        handleFilter={handleFilter}
        cartCount={cartCount}
        handleInputChange={handleInputChange}
        query={query}
        categories={categories}
        handleCategoryChange={handleCategoryChange}
      />

      <div className="main-layout">
        <Sidebar
          categories={categories}
          handleCategoryChange={handleCategoryChange}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <div className="items-container">
          <div className="masonry-wrapper">
            {fetchStatus.isFetching ? (
              <p>Loading...</p>
            ) : fetchStatus.fetchError ? (
              <p>Error loading items. Please try again.</p>
            ) : isFiltered ? (
              Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <HomeItem
                    key={item._id}
                    item={item}
                    onAddToCart={() => setCartCount((prev) => prev + 1)}
                  />
                ))
              ) : (
                <p>No items match the selected filters.</p>
              )
            ) : Array.isArray(items) && items.length > 0 ? (
              items.map((item) => (
                <HomeItem
                  key={item._id}
                  item={item}
                  onAddToCart={() => setCartCount((prev) => prev + 1)}
                />
              ))
            ) : (
              <p>No items available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetchItems;
