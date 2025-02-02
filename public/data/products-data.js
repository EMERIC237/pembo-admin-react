const products = [
  {
    id: 1,
    name: "Laptop",
    description: "Dell XPS 15",
    price: 1500,
    stockQuantity: 25,
    imageUrl: "http://example.com/laptop.jpg",
    categories: [
      { id: 1, name: "ELECTRONICS" },
      { id: 2, name: "COMPUTERS" },
    ],
    reviewsCount: 120,
    averageReviewRating: 4.5,
  },
  {
    id: 2,
    name: "Mobile",
    description: "iPhone 12",
    price: 999,
    stockQuantity: 100,
    imageUrl: "http://example.com/mobile.jpg",
    categories: [
      { id: 1, name: "ELECTRONICS" },
      { id: 3, name: "MOBILES" },
    ],
    reviewsCount: 200,
    averageReviewRating: 4.7,
  },
  {
    id: 3,
    name: "Headphones",
    description: "Bose QuietComfort 35",
    price: 299,
    stockQuantity: 50,
    imageUrl: "http://example.com/headphones.jpg",
    categories: [
      { id: 1, name: "ELECTRONICS" },
      { id: 4, name: "AUDIO" },
    ],
    reviewsCount: 310,
    averageReviewRating: 4.6,
  },
  {
    id: 4,
    name: "Camera",
    description: "Canon EOS M50",
    price: 700,
    stockQuantity: 30,
    imageUrl: "http://example.com/camera.jpg",
    categories: [{ id: 5, name: "PHOTOGRAPHY" }],
    reviewsCount: 80,
    averageReviewRating: 4.4,
  },
  {
    id: 5,
    name: "Smart Watch",
    description: "Apple Watch Series 6",
    price: 399,
    stockQuantity: 70,
    imageUrl: "http://example.com/smartwatch.jpg",
    categories: [
      { id: 1, name: "ELECTRONICS" },
      { id: 6, name: "WEARABLES" },
    ],
    reviewsCount: 215,
    averageReviewRating: 4.8,
  },
  {
    id: 6,
    name: "Tablet",
    description: "Samsung Galaxy Tab S7",
    price: 650,
    stockQuantity: 45,
    imageUrl: "http://example.com/tablet.jpg",
    categories: [
      { id: 1, name: "ELECTRONICS" },
      { id: 2, name: "COMPUTERS" },
    ],
    reviewsCount: 150,
    averageReviewRating: 4.5,
  },
  {
    id: 7,
    name: "Gaming Console",
    description: "PlayStation 5",
    price: 499,
    stockQuantity: 20,
    imageUrl: "http://example.com/ps5.jpg",
    categories: [
      { id: 1, name: "ELECTRONICS" },
      { id: 7, name: "GAMING" },
    ],
    reviewsCount: 320,
    averageReviewRating: 4.9,
  },
  {
    id: 8,
    name: "Keyboard",
    description: "Corsair K95 RGB",
    price: 199,
    stockQuantity: 90,
    imageUrl: "http://example.com/keyboard.jpg",
    categories: [
      { id: 1, name: "ELECTRONICS" },
      { id: 8, name: "PERIPHERALS" },
    ],
    reviewsCount: 110,
    averageReviewRating: 4.6,
  },
  {
    id: 9,
    name: "Monitor",
    description: "Dell Ultrasharp U2719D",
    price: 379,
    stockQuantity: 35,
    imageUrl: "http://example.com/monitor.jpg",
    categories: [
      { id: 1, name: "ELECTRONICS" },
      { id: 8, name: "PERIPHERALS" },
    ],
    reviewsCount: 170,
    averageReviewRating: 4.5,
  },
];

export default products;
