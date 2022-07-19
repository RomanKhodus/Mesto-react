
function ImagePopup() {

  return (
    <div className="popup image-popup">
      <div className="image-popup__container">
        <img src="#" alt="Фотография места" className="image-popup__image" />
        <p className="image-popup__caption"></p>
        <button
          type="button"
          className="image-popup__button-close popup__button-close"
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;