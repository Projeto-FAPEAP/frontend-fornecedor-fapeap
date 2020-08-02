import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import CardHistoryItem from './CardHistoryItem';

const mockData = [1, 2, 3, 4, 5, 6];

const History: React.FC = () => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={mockData}
      keyExtractor={(item) => String(item)}
      renderItem={({ item }) => <CardHistoryItem />}
    />
  );
};

export default History;
