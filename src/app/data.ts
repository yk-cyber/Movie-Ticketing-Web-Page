export const movies = [
  {
    id: "1",
    title: "The Silent Echo",
    genre: "Action / Thriller",
    duration: "135 min",
    rating: "PG-13",
    description: "A former spy is pulled back into the field when a ghost from his past resurfaces, threatening global security.",
    poster: "https://images.unsplash.com/photo-1765510296004-614b6cc204da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NzQ2OTQ2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    showtimes: [
      { id: "s1", cinema: "Cineplex Grand", date: "Today", times: ["10:30 AM", "1:15 PM", "4:45 PM", "8:00 PM", "10:30 PM"] },
      { id: "s2", cinema: "Star Mall VIP", date: "Today", times: ["11:00 AM", "2:00 PM", "7:30 PM", "11:00 PM"] },
    ]
  },
  {
    id: "2",
    title: "Love in Tokyo",
    genre: "Romantic Comedy",
    duration: "110 min",
    rating: "PG",
    description: "Two strangers visiting Tokyo find themselves constantly bumping into each other, leading to an unexpected adventure.",
    poster: "https://images.unsplash.com/photo-1746980931930-d8e69847d633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvbWVkeSUyMG1vdmllJTIwcG9zdGVyfGVufDF8fHx8MTc3NDc5NzQ4MXww&ixlib=rb-4.1.0&q=80&w=1080",
    showtimes: [
      { id: "s3", cinema: "Cineplex Grand", date: "Today", times: ["12:00 PM", "3:30 PM", "6:15 PM", "9:00 PM"] },
    ]
  },
  {
    id: "3",
    title: "Neon Horizon",
    genre: "Sci-Fi / Adventure",
    duration: "150 min",
    rating: "R",
    description: "In the year 2145, a crew of scavengers discovers an abandoned spaceship holding secrets that could alter humanity's future.",
    poster: "https://images.unsplash.com/photo-1761948245703-cbf27a3e7502?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2klMjBmaSUyMG1vdmllJTIwcG9zdGVyfGVufDF8fHx8MTc3NDcxNDk4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    showtimes: [
      { id: "s4", cinema: "Star Mall VIP", date: "Today", times: ["1:00 PM", "5:00 PM", "9:30 PM"] },
    ]
  },
  {
    id: "4",
    title: "Shadows in the Dark",
    genre: "Horror / Thriller",
    duration: "105 min",
    rating: "R",
    description: "A group of friends visiting an abandoned cabin in the woods discover an ancient evil that won't let them leave.",
    poster: "https://images.unsplash.com/photo-1543781284-e91b2496a7dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3J8ZW58MHx8fHwxNzc0ODYxNTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    showtimes: [
      { id: "s5", cinema: "Cineplex Grand", date: "Today", times: ["8:00 PM", "10:30 PM", "11:59 PM"] }
    ]
  },
  {
    id: "5",
    title: "The Final Act",
    genre: "Drama",
    duration: "125 min",
    rating: "PG-13",
    description: "An aging theater actor prepares for his final performance while reconnecting with his estranged family.",
    poster: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFtYSUyMHRoZWF0ZXJ8ZW58MHx8fHwxNzc0ODYxMzE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    showtimes: [
      { id: "s6", cinema: "Star Mall VIP", date: "Today", times: ["2:00 PM", "5:30 PM", "8:45 PM"] }
    ]
  },
  {
    id: "6",
    title: "Weekend Warriors",
    genre: "Comedy",
    duration: "95 min",
    rating: "PG",
    description: "Three office workers decide to go paintballing for the weekend, but accidentally stumble into a real corporate espionage plot.",
    poster: "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21lZHl8ZW58MHx8fHwxNzc0ODYxNzEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    showtimes: [
      { id: "s7", cinema: "Cineplex Grand", date: "Today", times: ["1:15 PM", "4:30 PM", "7:45 PM"] }
    ]
  }
];

export const foodItems = [
  {
    id: "f1",
    name: "Classic Popcorn Combo",
    description: "1 Large Popcorn + 2 Regular Drinks",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1695866648647-ab341ee14b7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: "f2",
    name: "Solo Snack Saver",
    description: "1 Regular Popcorn + 1 Regular Drink",
    price: 9.50,
    image: "https://images.unsplash.com/photo-1442975579382-43b9ca83de07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  }
];
