import React from 'react';
import { Helmet } from 'react-helmet';

import { Plant } from '../../containers/Detail';
import fakeImg from '../../100228.jpg';

import styles from './style.module.scss';

interface IProps {
  plant: Plant;
}

type PropNames =
  | 'difficulty'
  | 'light'
  | 'temperature'
  | 'place'
  | 'water'
  | 'soil'
  | 'fertilizer'
  | 'breeding';

const propNames = {
  difficulty: '난이도',
  light: '햇빛',
  temperature: '온도',
  place: '장소',
  water: '물주기',
  soil: '흙',
  fertilizer: '비료',
  breeding: '번식'
};

const plantDetailCard = (prop: PropNames, data: string) => {
  if (!data) return;
  return (
    <li className={styles.infoCard} key={prop}>
      <h3 className={styles.infoHeading}>{propNames[prop]}</h3>
      <p className={styles.infoContent}>{data}</p>
    </li>
  );
};

const DetailView: React.FC<IProps> = (props) => {
  const detailData = Object.keys(props.plant);

  const nameIndex = detailData.indexOf('name');
  detailData.splice(nameIndex, 1);

  const categoryIndex = detailData.indexOf('category');
  detailData.splice(categoryIndex, 1);

  return (
    <>
      <Helmet>
        <title>{props.plant.name} | 쑥쑥, 반려식물 정보 어플리케이션</title>
        <meta
          name="description"
          content={
            props.plant.name +
            '에 대한 정보입니다. - 반려식물 정보 어플리케이션 쑥쑥'
          }
        />
        <meta name="keyword" content={props.plant.name + ', 쑥쑥, 반려식물, 반려식물 정보, 식물, plant, 고무나무, 틸란드시아, 스투키'} />
        <meta
          property="og:title"
          content={props.plant.name + ' | 쑥쑥, 반려식물 정보 어플리케이션'}
        />
        <meta
          property="og:site_name"
          content="쑥쑥, 반려식물 정보 어플리케이션"
        />
        <meta
          property="og:description"
          content={
            props.plant.name +
            '에 대한 정보입니다. - 반려식물 정보 어플리케이션 쑥쑥'
          }
        />
          <meta property="og:image" content={fakeImg} />
      </Helmet>
      <main className={styles.main}>
        <h1 className={styles.name}>{props.plant.name}</h1>
        <span className={styles.category}>#{props.plant.category}</span>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={fakeImg} alt={props.plant.name} />
        </div>
        <h2 className="readable-hidden">{props.plant.name} 상세정보</h2>
        <ul>
          {detailData.map((data) =>
            plantDetailCard(data as PropNames, props.plant[data as PropNames])
          )}
        </ul>
      </main>
    </>
  );
};

export default DetailView;
