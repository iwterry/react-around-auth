import React from 'react';

function Card(props) {
  const { card, onCardClick } = props;
  
  return (
    <li className="location">
      <button type="button" aria-label="Delete" className="location__delete-btn"></button>
      <img
        src={card.link} 
        alt={card.name} 
        className="location__image" 
        onClick={() => onCardClick(card.id, card.name, card.link)}
      />
      <div className="location__content-wrapper">
        <h2 className="location__name">{card.name}</h2>
        <div className="location__likes-wrapper">
          <button type="button" aria-label="Like" className="location__like-btn"></button>
          <p className="location__num-likes">{card.numLikes}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;