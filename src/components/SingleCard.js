import "./SingleCard.css";
// import back from "img/cover.png";
// import back from "/img/cover.png";

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img
          className="front"
          src={card.src}
          alt="card-front"
        />
        <img
          className="back"
        //   src="./img/cover.png"
        // src="%PUBLIC_URL%/cover.png"
        src={process.env.PUBLIC_URL + '/img/cover.png'}
          alt="card-back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
