import mongoose from "mongoose";
import Campground from "./models/campgroundModel.js";

const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/yelpCamp");
    console.log("Connected to DB SUCCESSFULLY");
  } catch (e) {
    console.log(`${e.name}: ${e.message}`);
    return e;
  }
};

connectToDB();

const sampleData = [
  {
    title: "Hello",
    location: "India",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium itaque fugit, velit ipsum sunt corporis eos et culpa fuga atque cum veniam dicta suscipit repellendus quidem temporibus quisquam? Earum, ad",
    imageSrc: [
      `https://picsum.photos/400/200?random=${
        Math.floor(Math.random() * 100) + 1
      }`,
    ],
    price: 1200,
    reviews: [],
    author: "681671ab5236010156e31ee4",
  },
  {
    title: "World",
    location: "India",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium itaque fugit, velit ipsum sunt corporis eos et culpa fuga atque cum veniam dicta suscipit repellendus quidem temporibus quisquam? Earum, ad",
    imageSrc: [
      `https://picsum.photos/400/200?random=${
        Math.floor(Math.random() * 100) + 1
      }`,
    ],
    price: 1500,
    reviews: [],
    author: "681671ab5236010156e31ee4",
  },
  {
    title: "Amol",
    location: "Moon",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium itaque fugit, velit ipsum sunt corporis eos et culpa fuga atque cum veniam dicta suscipit repellendus quidem temporibus quisquam? Earum, ad",
    imageSrc: [
      `https://picsum.photos/400/200?random=${
        Math.floor(Math.random() * 100) + 1
      }`,
    ],
    price: 9010,
    reviews: [],
    author: "681671ab5236010156e31ee4",
  },
  {
    title: "Vyas",
    location: "Bangalore",
    imageSrc: [
      `https://picsum.photos/400/200?random=${
        Math.floor(Math.random() * 100) + 1
      }`,
    ],
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium itaque fugit, velit ipsum sunt corporis eos et culpa fuga atque cum veniam dicta suscipit repellendus quidem temporibus quisquam? Earum, ad",
    price: 1908,
    reviews: [],
    author: "681671ab5236010156e31ee4",
  },
];

const seed = async () => {
  await Campground.deleteMany({});
  await Campground.insertMany(sampleData);
};

seed().then(() => {
  console.log("Data Seeded");
  mongoose.connection.close();
});
