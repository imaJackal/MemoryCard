import { Card } from "../card";
import "./SingleCard.css";

interface Props {
  card: Card;
  handlePick: (card: Card) => void;
  flipped: boolean;
  disabled: boolean;
}

export default function SingleCard({ card, handlePick, flipped, disabled }: Props) {
  const handleClick = () => {
    if (!disabled) {
      handlePick(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/img/fruitback.jpg"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
}
