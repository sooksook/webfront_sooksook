import { Helmet } from 'react-helmet';
import React from 'react';

interface IProps {
  name: string;
  imageUrl: string;
}

const DetailHeader: React.FC<IProps> = React.memo(({ name, imageUrl }) => {
  return (
    <Helmet>
      <title>{`${name} | 쑥쑥, 반려식물 정보 어플리케이션`}</title>
      <meta
        name="description"
        content={`${name}에 대한 정보입니다. - 반려식물 정보 어플리케이션 쑥쑥`}
      />
      <meta
        name="keyword"
        content={`${name}, 쑥쑥, 반려식물, 반려식물 정보, 식물, plant, 고무나무, 틸란드시아, 스투키`}
      />
      <meta
        property="og:title"
        content={`${name} | 쑥쑥, 반려식물 정보 어플리케이션`}
      />
      <meta
        property="og:site_name"
        content="쑥쑥, 반려식물 정보 어플리케이션"
      />
      <meta
        property="og:description"
        content={`${name}에 대한 정보입니다. - 반려식물 정보 어플리케이션 쑥쑥`}
      />
      <meta property="og:image" content={imageUrl} />
    </Helmet>
  );
});

export default DetailHeader;
