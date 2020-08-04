import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import Icon from 'react-native-vector-icons/FontAwesome';
  
  import styled from 'styled-components/native';
  
  export const Container = styled.View`
    background: ${(props) => props.theme.colors.background};
    flex-direction: column;
  
    background: ${(props) => props.theme.colors.secundary};
  `;
  
  export const ListRowTitle = styled.Text`
    padding-left: ${hp('2.5%')}px;
    font-size: ${hp('2.8%')}px;
  `;
  
  export const ListRowSubTitle = styled.Text`
    padding-top: ${hp('.5%')}px;
    padding-left: ${hp('2.5%')}px;
    font-size: ${hp('2%')}px;
    color: #666666;
  `;
  
  export const SearchInputButton = styled.TouchableOpacity`
    width: ${wp('90%')}px;
    background: #fff;
    border-radius: 22px;
    border-width: 1px;
    border-color: #e4e4e6;
    justify-content: center;
    height: ${hp('7%')}px;
    padding-left: ${hp('1.5%')}px;
  `;
  
  export const SearchInput = styled.TextInput`
    width: ${wp('90%')}px;
    background: #fff;
    border-radius: 12px;
    border-width: 1px;
    border-color: #e4e4e6;
    justify-content: center;
    height: ${hp('7%')}px;
    padding-horizontal: ${hp('1.5%')}px;
  `;
  
  export const ListProducts = styled.TouchableOpacity`
  justify-content:space-around
    align-items: center;
    flex-direction: row;
    background: #fff;
    height: ${hp('17%')}px;
    width: ${wp('95%')}px;
    margin-bottom: ${hp('1%')}px;
    border-width: 1px;
    border-color: #e4e4e6;
  `;
  
  export const ListProductsImageWrapper = styled.Image`
    height: ${hp('23%')}px;
    width: ${wp('23%')}px;
    border-radius: 22px;
  `;
  export const ListProductsTextWrapper = styled.View`
    width: ${wp('65%')}px;
  `;
  
  export const HeaderSearchProduct = styled.View`
    
    justify-content:center;
    background: #f2f1f7;
    height: ${hp('10%')}px;
    width: ${wp('100%')}px;
    align-items:center;
    
  `;
  
  export const ListWrapperSearchProduct = styled.View`
    align-items: center;
    background: #f2f1f7;
    min-height: 250px;
  `;
  
  export const NothingFound = styled.Text`
    text-align:center;
    background: #f2f1f7;
    color:#4e4d5c;

  `;