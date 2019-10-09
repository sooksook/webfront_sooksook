import classNames from 'classnames/bind';
import styles from './style.module.scss';
import React from 'react';

const cx = classNames.bind(styles);

interface IProps {
  toggleFavorite: (plantId: string, favorite: boolean) => void;
  plantName: string;
  imageUrl: string;
  favorite: boolean;
  plantId: string;
  userId: string;
}

const FavoriteCard = React.memo<IProps>(
  ({ toggleFavorite, plantName, favorite, imageUrl, plantId }) => {
    return (
      <li
        className={cx('image')}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url(${imageUrl})`
        }}
      >
        <h3 className={cx('plantName')}>{plantName}</h3>
        <div
          onClick={() => toggleFavorite(plantId, favorite)}
          className={cx('icon', { favorite: favorite })}
        ></div>
      </li>
    );
  }
);

export default FavoriteCard;
