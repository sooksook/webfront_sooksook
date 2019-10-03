import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import classNames from 'classnames/bind';
import ReactSwipe from 'react-swipe';

import { fetchPlant } from '../../ducks/plant';
import IStore from '../../ducks/interface';

import DetailHeader from './DetailHeader';
import PlantDetailCard from './PlantDetailCard';
import Loading from '../Common/Loading';
import ErrorComponent from '../../common/ErrorComponent';

import styles from './style.module.scss';

const cx = classNames.bind(styles);

export enum PlantInfo {
  difficulty = '난이도',
  sunlight = '햇빛',
  growthType = '온도',
  place = '장소',
  water = '물주기',
  soil = '토양',
  temparature = '온도2'
}

const DetailView: React.FC<RouteComponentProps<{ id: string }>> = (props) => {
  const [clicked, setClicked] = useState<string>('default');
  const dispatch = useDispatch();
  const { plant, error, loading } = useSelector((state: IStore) => state.plant);
  useEffect(() => {
    dispatch(fetchPlant(props.match.params.id));
  }, [props.match.params.id]);

  const clickHandler = (data: string) => (e: React.MouseEvent) => {
    setClicked(data);
  };

  let reactSwipeEl;

  const {
    name,
    category,
    engName,
    favorite,
    imageSource,
    imageUrl,
    plantId,
    ...data
  } = plant;
  if (loading) return <Loading />;
  if (error) return <ErrorComponent />;
  return (
    <>
      <DetailHeader name={name} imageUrl={imageUrl} />
      <main className={cx('main')}>
        <h1 className={cx('name')}>{name}</h1>
        <span className={styles.category}>{category}</span>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={imageUrl} alt={imageSource} />
        </div>
        <h2 className="readable-hidden">{name} 상세정보</h2>
        <ul className={styles.menu}>
          <li
            onClick={clickHandler('default')}
            className={cx({ clicked: clicked === 'default' })}
          >
            기본정보
          </li>
          <li
            onClick={clickHandler('comments')}
            className={cx({ clicked: clicked === 'comments' })}
          >
            댓글
          </li>
        </ul>
        <ReactSwipe className="carousel" swipeOptions={{ continuous: false }}>
          <ul className={cx('infoCardContainer')}>
            {Object.entries(data).map(
              ([info, value]) =>
                value && (
                  <PlantDetailCard
                    key={info}
                    info={info as keyof typeof PlantInfo}
                    value={value}
                  />
                )
            )}
          </ul>
          <ul className={cx('infoCardContainer')}>
            <PlantDetailCard
              key={'하이'}
              info={'difficulty' as keyof typeof PlantInfo}
              value={'헬로우'}
            />
          </ul>
        </ReactSwipe>
      </main>
    </>
  );
};

export default withRouter(DetailView);
