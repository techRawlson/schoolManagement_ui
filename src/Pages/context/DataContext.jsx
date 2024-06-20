// DataContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the Context
const DataContext = createContext();

// Custom Hook to use the Data Context
export const useData = () => useContext(DataContext);

// Data Provider Component
export const DataProvider = ({ children }) => {
  const [Role, setStudent] = useState("himanshu");

  const updateData = (newData) => {
    console.log(newData)
    setStudent(newData);
  };
console.log(Role)
  return (
    <DataContext.Provider value={{ Role, updateData }}>
      {children}
    </DataContext.Provider>
  );
};
