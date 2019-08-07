import React from 'react';

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
  );
};

export default DetailView;
