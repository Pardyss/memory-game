import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const images = [
  "chick.png",
  "sun.png",
  "Dog.png",
  "message.png",
  "smiley.png",
  "orange.webp",
  "Cute-Cow-icon.png",
  "Cute-orange.png",
  "chick.png",
  "sun.png",
  "Dog.png",
  "message.png",
  "smiley.png",
  "orange.webp",
  "Cute-Cow-icon.png",
  "Cute-orange.png",
];

function App() {
  const [show, setShow] = useState(0);
  // this is how you had thought and thats way too wrong

  const [selectedIndex, setSelectedIndex] = useState(undefined);

  const [selectedIndex2, setSelectedIndex2] = useState(undefined);

  const [disabled, setDisabled] = useState(false);

  const [matchedCards, setMatchCards] = useState([]);
  const [randomImages, setRandomImages] = useState([]);

  const handleClick = (index) => {
    if (disabled) {
      setSelectedIndex2(index);
    } else {
      setSelectedIndex(index);
    }
    setDisabled(true);
  };
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  useEffect(() => {
    var shuffle = shuffleArray(images);
    setRandomImages(shuffle);
    console.log(images);
  }, []);

  useEffect(() => {
    if (selectedIndex2) {
      if (randomImages[selectedIndex] === randomImages[selectedIndex2]) {
        setMatchCards((prev) => {
          prev.push(selectedIndex, selectedIndex2);
          return prev;
        });
      }
      setTimeout(() => {
        setSelectedIndex(undefined);
        setSelectedIndex2(undefined);
        setDisabled(false);
      }, 500);
    }
  }, [selectedIndex2]);

  return (
    <>
      <div className="board">
        {randomImages.map((image, i) => {
          return (
            <a
              key={i}
              onClick={() => {
                handleClick(i);
              }}
              className={`cards
            ${
              selectedIndex === i ||
              selectedIndex2 === i ||
              matchedCards.includes(i)
                ? "cards2"
                : ""
            }`}
            >
              <img
                className="images"
                src={
                  selectedIndex === i ||
                  selectedIndex2 === i ||
                  matchedCards.includes(i)
                    ? image
                    : "Flower-icon.png"
                }
              ></img>
            </a>
          );
        })}
      </div>
      <button
        onClick={() => {
          setMatchCards([]);
          shuffleArray(images);
        }}
      >
        Reset the Game
      </button>
    </>
  );
}

export default App;
