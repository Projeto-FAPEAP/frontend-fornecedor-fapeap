import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: column;
  background: #f2f1f7;
  flex: 1;
`;

export const Section = styled.View`
  background: #f2f1f7;
  height: 32px;
  align-content: center;
  justify-content: center;
`;

export const SectionTitle = styled.Text`
  color: #747479;
  font-size: 15px;
  padding-left: 17px;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const ListWrapperOrders = styled.View`
  align-items: center;
  background: #f2f1f7;
  height: 100%;
`;

export const ListRow = styled.TouchableOpacity`
  justify-content: center;
  height: 109px;
  width: 100%;
  border-width: 1px;
  border-color: #e4e4e6;
  margin-bottom: 2px;
  background: white;
  flex-direction: row;
`;

export const ListRowInnerLeft = styled.View`
  justify-content: center;
  width: 47%;
  margin-bottom: 2px;
  background: white;
`;

export const ListRowInnerRight = styled.View`
  justify-content: center;
  width: 47%;
  margin-bottom: 4px;
  background: white;
  align-items: flex-end;
`;

export const ListRowTitle = styled.Text`
  font-size: 16px;
  color: #333;
  font-family: ${(props) => props.theme.fonts.Ubuntu.bold};
`;

export const ListRowSubTitle = styled.Text`
  padding-top: 3px;
  font-size: 12px;
  color: #666666;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const ListRowPending = styled.Text`
  width: 60px;
  font-size: 12px;
  color: white;
  background: #ffd500;
  text-align: center;
  border-radius: 2px;
  margin-bottom: 18px;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const ListRowConfirmed = styled.Text`
  padding: 4px 5px;
  border-radius: 2px;
  max-width: 160px;
  font-size: 12px;
  color: white;
  background: #59a656;
  text-align: center;
  margin-bottom: 18px;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const ListRowTotal = styled.Text`
  font-size: 12px;
  color: #666666;
  font-family: ${(props) => props.theme.fonts.Ubuntu.bold};
`;

export const EmptyView = styled.View`
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;
