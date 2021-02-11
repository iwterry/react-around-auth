import React from 'react';
import api from '../utils/api.js';

import defaultAvatar from '../images/profile-avatar.jpg';
import { logErrors } from '../utils/utils.js';
import Card from './Card.js';

function Main(props) {
  const { onEditAvatar, onAddPlace, onEditProfile, onCardClick } = props;
  const [ userName, setUserName ] = React.useState('Jacques Cousteau');
  const [ userDescription, setUserDescription ] = React.useState('Explorer');
  const [ userAvatar, setUserAvatar ] = React.useState(defaultAvatar);
  const [ cards, setCards ] = React.useState([]);

  React.useEffect(() => {
    api.getUserProfile()
      .then(({ _id, name, about, avatar }) =>{ 
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);

        return api.getInitialCards();
      })
      .then((cardsFromApi) => {
        const initialCards = cardsFromApi.map(({ name, link, likes, _id }) => {
          return {
            name,
            link,
            numLikes: likes.length,
            id: _id
          };
        });

        setCards(initialCards);
      })
      .catch(logErrors);
  }, []);

  return (
    <main className="main-content">
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img src={userAvatar} alt="profile avatar" className="profile__avatar" />
          <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button type="button" aria-label="Edit" className="profile__edit-btn" onClick={onEditProfile}></button>
          <p className="profile__self-description">{userDescription}</p>
        </div>
        <button type="button" aria-label="Add location" className="profile__add-btn" onClick={onAddPlace}></button>
      </section>

      <section className="locations">
        <ul className="locations__collection">
        {cards.map((card) => {
          return (
            <Card card={card} key={card.id} onCardClick={onCardClick} />
          );
        })}
        </ul>
      </section>
    </main>
  );
}

export default Main;