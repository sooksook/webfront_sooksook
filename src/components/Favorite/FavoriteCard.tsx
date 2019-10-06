import classNames from 'classnames/bind';
import React from 'react';

import styles from './style.module.scss';

const cx = classNames.bind(styles);

interface IProps {
  plantName: string;
  imageUrl: string;
}

const FavoriteCard = React.memo<IProps>(({ plantName, imageUrl }) => {
  return (
    <li
      className={cx('image')}
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url(${imageUrl})`
      }}
    >
      <h3 className={cx('plantName')}>{plantName}</h3>
    </li>
  );
});

export default FavoriteCard;
