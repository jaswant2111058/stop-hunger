import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const DateContext = createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useData = () => {
  return useContext(DateContext);
};

export const DataProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [field, setField] = useState("All");
  const [getItem, setItem] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState({})
  const [recipt, setRecipt] = useState({})
  const baseURL = "https://foodserver-c5lx.onrender.com"
  const [nav, setNav] = useState(0);
  const [save, setSave] = useState([]);



  const startLoading = () => {
    setLoading(true);
  };



  useEffect(() => {
    const getSavedData = async () => {
      const data = await AsyncStorage.getItem("user")
      if (data) {
        setUser(JSON.parse(data))
      }
    }
    getSavedData()
  }, [])


  const stopLoading = () => {
    setLoading(false);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      console.log('User data removed successfully');
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  }


  useEffect(() => {
    const performSearch = async () => {
      try {
        const response = await axios.get(`${baseURL}/getitem?field=${field}&q=${query}`);
        if (response) {
          setItem(response.data);
        }
      } catch (error) {
        console.error('Error searching:', error);
      }
    };
    if (query.length > 2) {
      performSearch();
    } else {
      setSearchResult([]);
    }
  }, [query, field]);



  useEffect(() => {
    const getFoodItem = async () => {
      try {
        const response = await axios.get(`${baseURL}/getallitem`);
        if (response) {
          setItem(response.data);
        }
      } catch (error) {
        console.error('Error searching:', error);
      }
    };
    getFoodItem();

  }, []);


  return (
    <DateContext.Provider value={{
      query,
      setQuery,
      isLoading,
      startLoading,
      stopLoading,
      user,
      setUser,
      searchResult,
      field,
      setField,
      getItem,
      setItem,
      selectedItem,
      setSelectedItem,
      baseURL, logout,
      recipt, setRecipt,
      save, setSave,
      nav, setNav

    }}>
      {children}
    </DateContext.Provider>
  );
};