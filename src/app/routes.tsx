import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { MovieDetails } from "./pages/MovieDetails";
import { SeatSelection } from "./pages/SeatSelection";
import { FoodAndBeverage } from "./pages/FoodAndBeverage";
import { Checkout } from "./pages/Checkout";
import { BookingSummary } from "./pages/BookingSummary";
import { Confirmation } from "./pages/Confirmation";
import { Profile } from "./pages/Profile";
import { About } from "./pages/About";
import { AllMovies } from "./pages/AllMovies";
import { AllFoodAndBeverage } from "./pages/AllFoodAndBeverage";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "movie/:id", Component: MovieDetails },
      { path: "book/:id/seats", Component: SeatSelection },
      { path: "book/:id/fb", Component: FoodAndBeverage },
      { path: "summary", Component: BookingSummary },
      { path: "checkout", Component: Checkout },
      { path: "payment", Component: Checkout },
      { path: "confirmation", Component: Confirmation },
      { path: "profile", Component: Profile },
      { path: "about", Component: About },
      { path: "movies", Component: AllMovies },
      { path: "fb-all", Component: AllFoodAndBeverage },
      { path: "*", Component: NotFound },
    ],
  },
]);
