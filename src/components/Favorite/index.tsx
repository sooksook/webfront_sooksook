import { withRouter, RouteComponentProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import qs from 'qs';

import { fetchFavorite } from '../../ducks/favortie';
import IStore from '../../ducks/interface';

import styles from './style.module.scss';

import FavoriteCard from './FavoriteCard';

const cx = classNames.bind(styles);

// TODO: 유저 아이디 없을때의 Validation
const Favorite: React.FC<RouteComponentProps> = ({ location: { search } }) => {
  const { favorites } = useSelector((state: IStore) => state.favorites);
  const dispatch = useDispatch();
  useEffect(() => {
    const { userId } = qs.parse(search.slice(1));
    dispatch(fetchFavorite.request(userId));
  }, [search, dispatch]);

  return (
    <main className={cx('main')}>
      <h1 className={cx('name')}>즐겨찾기</h1>
      <ul>
        {favorites.map(({ plantName, plantId, imageUrl }) => (
          <FavoriteCard
            key={plantId}
            plantName={plantName}
            imageUrl={imageUrl}
          />
        ))}
      </ul>
    </main>
  );
};

export default withRouter(Favorite);
