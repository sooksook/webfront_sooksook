import React from 'react';
import { PlantInfo } from './index';
import styles from './style.module.scss';

interface IPlantDetailCardProp {
  info: keyof typeof PlantInfo;
  value: string;
}

const PlantDetailCard: React.FC<IPlantDetailCardProp> = React.memo(
  ({ info, value }) => {
    return (
      <li className={styles.infoCard}>
        <h3 className={styles.infoHeading}>{PlantInfo[info]}</h3>
        <p className={styles.infoContent}>{value}</p>
      </li>
    );
  }
);

export default PlantDetailCard;
