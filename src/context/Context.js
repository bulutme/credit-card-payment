import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

const ContextProvider = (props) => {
  const [data, setData] = useState(null);
  const [cardDetails, setCardDetails] = useState(null);
  const fetchData = () => {
    fetch("https://mocki.io/v1/a5ae8585-b42d-486b-a4ff-25ebfebbaddf")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  };

  return (
    <DataContext.Provider
      value={{ data, cardDetails, fetchData, setCardDetails }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default ContextProvider;
