import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { fetchPlant } from '../../ducks/plant';
import IStore from '../../ducks/interface';

import DetailHeader from './DetailHeader';
import PlantDetailCard from './PlantDetailCard';
import Loading from '../Common/Loading';
import ErrorComponent from '../../common/ErrorComponent';

import styles from './style.module.scss';

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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPlant(props.match.params.id));
  });
  const { plant, error, loading } = useSelector((state: IStore) => state.plant);
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
      <main className={styles.main}>
        <h1 className={styles.name}>{name}</h1>
        <span className={styles.category}>#{category}</span>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={imageUrl} alt={imageSource} />
        </div>
        <h2 className="readable-hidden">{name} 상세정보</h2>
        <ul>
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
      </main>
    </>
  );
};

export default withRouter(DetailView);
