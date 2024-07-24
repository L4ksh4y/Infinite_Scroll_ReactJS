import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import Card from '../Card/Index';

const InfiniteScrollComponent = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const itemsPerPage = 6;
  
     // Function to fetch items from API
    const fetchItems = async (startIndex) => {
      setLoading(true);
      try {
        
        // Fetch data from API with specified start index and limit
        const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?_start=${startIndex}&_limit=${itemsPerPage}`);
        // Map response data to required format and update state
        const newItems = response.data.map((item) => ({
          id: item.id,
          imageUrl: item.url,
          title: item.title,
        })); 
        setItems((prevItems) => [...prevItems, ...newItems]);  // Append new items to existing items
      
    } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false); //toggle loading 
      }
    };
  
    useEffect(() => {
      fetchItems(items.length);
    }, []); 
  
    // Handle scroll event to fetch more items when reaching the bottom
    const handleScroll = useCallback(() => {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight && !loading) {
        fetchItems(items.length);
      }// Fetch more items if not already loading
    }, [loading, items.length]); // items length works as a offset 
  
    // Attach scroll event listener on component mount and detach on unmount
    useEffect(() => {
      window.addEventListener('scroll', handleScroll); // Add event listener for scroll
      return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

  return (
    <div className="container mx-auto  max-w-7xl">
      <h1 className="text-2xl font-bold text-center my-8">Infinite Scroll</h1>
      <div className="grid grid-cols-3 gap-16">
        {items.map((item, index) => (
            <div key={index} className="">
                    <Card item={item}/>
            </div>
         
        ))}
      </div>
      {loading ? <p className="text-center my-4">Loading...</p> : null}
    </div>
  );
};

export default InfiniteScrollComponent;