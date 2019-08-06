import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import DetailView from '../components/Detail';

export interface Plant {
  name: string; // 이름
  category: string; // 카테고리
  difficulty: string; // 난이도
  light: string; // 햇빛
  temperature: string; // 온도
  place: string; // 장소
  water: string; // 물주기
  soil: string; // 흙
  fertilizer: string; // 비료
  breeding: string; // 번식
}
interface IProps extends RouteComponentProps {}

interface IState {
  plant: Plant;
}

const fakeData: Plant = {
  name: '꽃베고니아',
  category: '공기정화식물',
  difficulty: '키우기 쉬운 편이에요.',
  light: '햇빛을 좋아해요.\n햇빛을 많이 받으면 잎과 꽃의 색이 진해져요.',
  temperature: '10 - 20도 정도가 좋아요.\n더위와 추위에 모두 약해요.',
  place: '바람이 잘 드는 곳이 좋아요.',
  water: '겉흙이 말랐을 때 충분히 주세요.\n과한 습도에는 약하니 주의해주세요.',
  soil: '물이 잘빠지는 흙이 좋아요.',
  fertilizer: '',
  breeding: '삽목(꺾꽂이, 가지를 잘라 심는 방법)\n종자(씨앗)\n포기나누기'
};

class Detail extends Component<IProps, IState> {
  state = {
    plant: {
      name: '', // 이름
      category: '', // 카테고리
      difficulty: '', // 난이도
      light: '', // 햇빛
      temperature: '', // 온도
      place: '', // 장소
      water: '', // 물주기
      soil: '', // 흙
      fertilizer: '', // 비료
      breeding: ''
    }
  };

  componentDidMount() {
    this.setState({
      plant: fakeData
    });
  }

  render() {
    return <DetailView plant={this.state.plant} />;
  }
}

export default withRouter(Detail);
