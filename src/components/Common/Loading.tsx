import Spinner from 'react-bootstrap/Spinner';
import classNames from 'classnames/bind';
import React from 'react';

import styles from './style.module.scss';

const cx = classNames.bind(styles);

const Loading: React.FC = () => {
  return (
    <main className={cx('main')}>
      <div className={cx('loading')}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </main>
  );
};

export default Loading;
