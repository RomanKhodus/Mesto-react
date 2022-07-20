function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  } 

  return (
    <article className="elements__card">
      <div className="elements__image-container">
        <img
          src={card.link}
          alt="Фотография места"
          className="elements__image"
          onClick={handleClick}
        />
      </div>
      <button type="button" className="elements__delete"></button>
      <div className="elements__figcaption">
        <h2 className="elements__header">{card.name}</h2>
        <div className="elements__like-container">
          <button type="button" className="elements__like"></button>
          <div className="elements__like-counter">{card.likes.length}</div>
        </div>
      </div>
    </article>
  );
}

export default Card;