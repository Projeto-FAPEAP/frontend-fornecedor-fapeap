import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  
  import styled from 'styled-components/native';
  
  export const Container = styled.View`
    background: ${(props) => props.theme.colors.background};
    flex-direction: column;
  
    background: ${(props) => props.theme.colors.secundary};
  `;
  
  export const WrapperList = styled.View`
    height: ${hp('30%')}px;
  
    width: ${wp('85%')}px;
  `;

  export const ListWrapper = styled.View`
    align-items: center;
    background: #f2f1f7;
    height: ${hp('63%')}px;
  `;
  export const ListWrapperOrders = styled.View`
    align-items: center;
    background: #f2f1f7;
    height: ${hp('72.5%')}px;
  `;
  
  export const ListRowTitle = styled.Text`
    padding-left: ${hp('2.5%')}px;
    font-size: ${hp('2.8%')}px;
    color:#333;
    font-family:${(props)=> props.theme.fonts.Ubuntu.normal }
  `;
  
  export const ListRowSubTitle = styled.Text`
    padding-top: ${hp('.5%')}px;
    padding-left: ${hp('2.5%')}px;
    font-size: ${hp('2%')}px;
    color: #666666;
    font-family:${(props)=> props.theme.fonts.Ubuntu.normal }
  `;
  
  export const SearchWrapper = styled.View`
    flex-direction: row;
    background: #f2f1f7;
    justify-content: space-around;
    height: ${hp('10%')}px;
    align-items: center;
  `;
  
  export const SearchInputButton = styled.TouchableOpacity`
    width: ${wp('65%')}px;
    background: #fff;
    border-radius: 12px;
    border-width: 1px;
    border-color: #e4e4e6;
    justify-content: center;
    height: ${hp('7%')}px;
    padding-left: ${hp('1.5%')}px;
  `;
  
  export const SearchInput = styled.TextInput`
    width: ${wp('65%')}px;
    background: #fff;
    border-radius: 22px;
    border-width: 1px;
    border-color: #e4e4e6;
    justify-content: center;
    height: ${hp('7%')}px;
    padding-left: ${hp('1.5%')}px;
    font-family:${(props)=> props.theme.fonts.Ubuntu.normal }
  `;
  
  export const SearchTextInner = styled.Text`
    color: #878787;
    font-size: ${hp('2%')}px;
    font-family:${(props)=> props.theme.fonts.Ubuntu.normal }
  `;
  export const AddButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: ${wp('25%')}px;
    background: ${(props) => props.theme.colors.primary};
    border-radius: 12px;
    height: ${hp('6.5%')}px;
  `;
  
  export const AddButtonText = styled.Text`
    text-align:center
    width: ${wp('25%')}px;
    color: #fff;
    font-family:${(props)=> props.theme.fonts.Ubuntu.normal }
  `;
  
  export const ListProducts = styled.TouchableOpacity`
  justify-content:space-around
    align-items: center;
    flex-direction: row;
    background: #fff;
    height: ${hp('17%')}px;
    width: ${wp('95%')}px;
    margin-bottom: ${hp('0.2%')}px;
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
  

  
 
 
 
  
  
 
  
  
  
  
 
  
  