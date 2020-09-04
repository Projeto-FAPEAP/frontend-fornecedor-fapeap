import { FlatList } from 'react-native';

import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: column;
  background: #f2f1f7;
  flex: 1;
`;

export const ListWrapper = styled(FlatList)``;

export const ListRowTitle = styled.Text`
  padding-left: 15px;
  font-size: 16px;
  color: #333;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const ListRowSubTitle = styled.Text`
  padding-top: 3px;
  padding-left: 15px;
  font-size: 13px;
  color: #666666;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const SearchWrapper = styled.View`
  flex-direction: row;
  background: #f2f1f7;
  justify-content: space-around;
  height: 64px;
  align-items: center;
`;

export const SearchInputButton = styled.TouchableOpacity`
  width: 65%;
  background: #fff;
  border-radius: 12px;
  border-width: 1px;
  border-color: #e4e4e6;
  justify-content: center;
  height: 45px;
  padding-left: 10px;
`;

export const SearchTextInner = styled.Text`
  color: #878787;
  font-size: 13px;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const AddButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 25%;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 12px;
  height: 42px;
`;

export const AddButtonText = styled.Text`
  text-align: center;
  color: #fff;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const ListProducts = styled.TouchableOpacity`
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  background: #fff;
  height: 108px;
  width: 95%;
  margin-bottom: 1px;
  border-width: 1px;
  border-color: #e4e4e6;
  align-self: center;
`;

export const ListProductsImageWrapper = styled.Image`
  width: 84px;
  height: 84px;
  border-radius: 22px;
`;
export const ListProductsTextWrapper = styled.View`
  width: 68%;
`;

export const EmptyView = styled.View`
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;
