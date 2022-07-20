
function ImagePopup({card, onClose}) {
  return (
    <div
      className={card ? "popup image-popup popup_opened" : "popup image-popup"}
    >
      <div className="image-popup__container">
        <img src={card.link} alt="Фотография места" className="image-popup__image" />
        <p className="image-popup__caption"></p>
        <button
          type="button"
          className="image-popup__button-close popup__button-close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;