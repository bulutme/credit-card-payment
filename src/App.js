import React, { useContext, useEffect, useState } from "react";
import Card from "./components/Card";
import Result from "./components/Result";
import ContextProvider, { DataContext } from "./context/Context";

const App = () => {
  const { data, cardDetails } = useContext(DataContext);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (data) {
      const isNumberOk = data.filter(
        (item) => item.number === cardDetails.cardNumber.split(" ").join("")
      );
      if (isNumberOk.length > 0) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
      setIsDone(true);
    }
  }, [cardDetails, data]);

  return <div>{isDone ? <Result isSuccess={isSuccess} /> : <Card />}</div>;
};

export default App;
