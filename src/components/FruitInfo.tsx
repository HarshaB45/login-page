import React, { useState } from "react";
import appleImage from "./apple.png";
import bananaImage from "./banana.png";
import orangeImage from "./orange.png";
import grapeImage from "./grape.png";
import tomatoImage from "./tomato.png";

const FruitInfo: React.FC = () => {
  const heading = "Fruits";
  type Fruit = {
    name: string;
    image: string;
    description: string;
  };

  const [activeCard, setActiveCard] = useState<string | null>(null);

  const ifClick = (fruitName: string) => {
    setActiveCard(activeCard === fruitName ? null : fruitName);
  };

  const fruits: Fruit[] = [
    {
      name: "Apples",
      image: appleImage,
      description:
        "Apples are sweet, crisp fruits available in many varieties.",
    },
    {
      name: "Bananas",
      image: bananaImage,
      description:
        "Bananas are rich in potassium and are great for quick energy.",
    },
    {
      name: "Oranges",
      image: orangeImage,
      description: "Oranges are juicy and a great source of vitamin C.",
    },
    {
      name: "Grapes",
      image: grapeImage,
      description:
        "Grapes come in various colors and are used for wine making.",
    },
    {
      name: "Tomatoes",
      image: tomatoImage,
      description:
        "Tomatoes are versatile and used in salads, sauces, and more.",
    },
  ];

  /*
  activeCard set to null in useState

  [onClick]
  if activeCard(null) = fruitName(tomato) <false>

  setActiveCard(tomato)

  []
  setActiveCard -> activeCard
  if activeCard(tomato) = fruitName(tomato) <true>

  text (for clicked)

  [onClick]
  if activeCard(tomato) = fruitName(apple) <false>

  setActiveCard(apple)

  []
  setActiveCard -> activeCard
  if activeCard(apple) = fruitName(apple) <true>

  text

  
  
    
  */
  return (
    <div className="container">
      <h1>{heading}</h1>
      <div className="FruitContainer">
        {fruits.map((fruit) => (
          <div
            key={fruit.name}
            className="FruitCard"
            onClick={() => ifClick(fruit.name)}
          >
            {activeCard === fruit.name ? (
              <div className="FruitText">
                <h2>{fruit.name}</h2>
                <p>{fruit.description}</p>
              </div>
            ) : (
              <img src={fruit.image} className={"FruitImage {fruit.name}"} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FruitInfo;
