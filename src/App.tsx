import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./assets/styles/global";
import { Navbar } from "./components/navbar";
import { MovieProvider } from "./context/MovieContext";
import { CarBuy } from "./pages/CarBuy";
import { MovieList } from './pages/MoviesList';

const App = () => {

  return (
    <MovieProvider>
      <GlobalStyles />
      <Navbar />
        <Routes>
          <Route path="/list" element={<MovieList />} />
          <Route path="/buy" element={<CarBuy />} />
          <Route path="/*" element={<MovieList />} />
        </Routes>
     </MovieProvider>
  );
}

export default App;
