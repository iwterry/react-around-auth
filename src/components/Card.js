import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  const { card, onCardClick } = props;
  const currentUser = React.useContext(CurrentUserContext);

  const numLikes = card.likes.length;
  const isCurrentUserTheOwnerOfCard = card.owner._id === currentUser._id;
  const isCardLikedByCurrentUser = card.likes.some((someUser) => someUser._id === currentUser._id);

  const deleteBtnClassName = 'location__delete-btn' + 
    (isCurrentUserTheOwnerOfCard ? ' location__delete-btn_active' : '');
  const likeBtnClassName = 'location__like-btn' +
    (isCardLikedByCurrentUser ? ' location__like-btn_active' : '');

  return (
    <li className="location">
      <button type="button" aria-label="Delete"className={deleteBtnClassName}></button>
      <img
        src={card.link} 
        alt={card.name} 
        className="location__image" 
        onClick={() => onCardClick(card._id, card.name, card.link)}
      />
      <div className="location__content-wrapper">
        <h2 className="location__name">{card.name}</h2>
        <div className="location__likes-wrapper">
          <button type="button" aria-label="Like" className={likeBtnClassName}></button>
          <p className="location__num-likes">{numLikes}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;