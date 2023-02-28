import React, { useState, createContext, useEffect, useMemo } from "react";
import { restaurantsRequest, restaurantsTransform } from "./restaurant.service";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ Children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const retriveRestaurants = () => {
    setIsLoading(true);
    setTimeout(() => {
      restaurantsRequest()
        .then(restaurantsTransform)
        .then((result) => {
          setIsLoading(false);
          setRestaurants(restaurants);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }, 2000);
  };

  useEffect(() => {
    retriveRestaurants();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <RestaurantsContext.Provider value={{ restaurants, isLoading, error }}>
      {Children}
    </RestaurantsContext.Provider>
  );
};
