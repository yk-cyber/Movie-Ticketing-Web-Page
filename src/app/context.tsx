import React, { createContext, useContext, useState, ReactNode } from "react";

export type TicketType = "Adult" | "Child" | "Student";

export interface SelectedSeat {
  id: string; // e.g. "A1"
  type: TicketType;
  price: number;
}

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface BookingState {
  movieId: string | null;
  movieTitle: string;
  poster: string;
  cinema: string;
  hall?: string;
  date: string;
  time: string;
  seats: SelectedSeat[];
  food: FoodItem[];
  paymentMethod: string;
}

export interface Review {
  movieId: string;
  movieTitle: string;
  rating: number;
  text: string;
  date: string;
}

interface AppContextProps {
  user: { name: string; email: string } | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  booking: BookingState;
  updateBooking: (updates: Partial<BookingState>) => void;
  resetBooking: () => void;
  pastBookings: BookingState[];
  confirmBooking: () => void;
  reviews: Review[];
  addReview: (review: Review) => void;
}

const defaultBooking: BookingState = {
  movieId: null,
  movieTitle: "",
  poster: "",
  cinema: "",
  hall: "",
  date: "",
  time: "",
  seats: [],
  food: [],
  paymentMethod: "",
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [booking, setBooking] = useState<BookingState>(defaultBooking);
  const [pastBookings, setPastBookings] = useState<BookingState[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const login = (name: string, email: string) => setUser({ name, email });
  const logout = () => setUser(null);

  const updateBooking = (updates: Partial<BookingState>) => {
    setBooking((prev) => ({ ...prev, ...updates }));
  };

  const resetBooking = () => setBooking(defaultBooking);

  const confirmBooking = () => {
    if (booking.movieId) {
      setPastBookings((prev) => [booking, ...prev]);
      resetBooking();
    }
  };

  const addReview = (review: Review) => {
    setReviews((prev) => [review, ...prev]);
  };

  return (
    <AppContext.Provider value={{ user, login, logout, booking, updateBooking, resetBooking, pastBookings, confirmBooking, reviews, addReview }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};
