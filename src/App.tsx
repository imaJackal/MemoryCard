import "./App.css";
import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";
import { Card } from "./card";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [firstPick, setFirstPick] = useState<Card>();
  const [secondPick, setSecondPick] = useState<Card>();
  const [disabled, setDisabled] = useState<boolean>(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setFirstPick(undefined);
    setSecondPick(undefined);
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle which card you pick
  const handlePick = (card: Card) => {
    firstPick ? setSecondPick(card) : setFirstPick(card);
  };

  // compare 1st/2nd pick to see if they match
  useEffect(() => {
    if (firstPick && secondPick) {
      setDisabled(true)
      if (firstPick.src === secondPick.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === firstPick.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstPick, secondPick]);

  console.log(cards)

  // reset your pick & increase turn value
  const resetTurn = () => {
    setFirstPick(undefined);
    setSecondPick(undefined);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // start a new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Jesse's Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard key={card.id}
            card={card}
            handlePick={handlePick}
            flipped={card === firstPick || card === secondPick || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns {turns}</p>
    </div>
  );
}

export default App;
