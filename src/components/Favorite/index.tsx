import { withRouter, RouteComponentProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import qs from 'qs';

import { removeFavorite } from '../../ducks/favortie/modules/remove-favorite';
import { fetchFavorite } from '../../ducks/favortie/modules/fetch-favorite';
import { postFavorite } from '../../ducks/favortie/modules/post-favorite';
import IStore from '../../ducks/interface';

import FavoriteCard from './FavoriteCard';
import Loading from '../Common/Loading';

import styles from './style.module.scss';

const cx = classNames.bind(styles);

// TODO: 유저 아이디 없을때의 Validation
const Favorite: React.FC<RouteComponentProps> = ({ location: { search } }) => {
  const { favorites, status, loading } = useSelector(
    (state: IStore) => state.favorites
  );
  const dispatch = useDispatch();

  const { userId } = qs.parse(search.slice(1));

  useEffect(() => {
    dispatch(fetchFavorite.request(userId));
  }, [userId, dispatch]);

  const toggleFavorite = React.useCallback(
    (plantId: string, favorite: boolean) => {
      if (favorite) {
        dispatch(removeFavorite.request(userId, plantId));
        alert('즐겨찾기를 취소하셨습니다.');
      } else {
        dispatch(postFavorite.request(userId, plantId));
        alert('즐겨찾기 하셨습니다.');
      }
    },
    [userId, dispatch]
  );
  if (status >= 400)
    alert('사이트의 오류로 즐겨찾기 결과가 반영되지 않았습니다.');
  if (loading) return <Loading />;
  return (
    <main className={cx('main')}>
      <h1 className={cx('name')}>즐겨찾기</h1>
      <ul>
        {favorites.map(({ plantName, plantId, favorite, imageUrl }) => (
          <FavoriteCard
            toggleFavorite={toggleFavorite}
            plantName={plantName}
            favorite={favorite}
            imageUrl={imageUrl}
            plantId={plantId}
            userId={userId}
            key={plantId}
          />
        ))}
      </ul>
    </main>
  );
};

export default withRouter(Favorite);
