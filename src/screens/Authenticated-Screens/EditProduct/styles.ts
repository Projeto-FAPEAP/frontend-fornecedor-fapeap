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
  
  export const MediaSpot = styled.View`
    height: ${hp('30%')}px;
    align-self: center;
    width: ${wp('85%')}px;
    border-width: 1px;
    border-color: #b8b6b6;
    margin-right: ${hp('.5%')}px;
  `;
  
  export const MediaSpotButton = styled.TouchableOpacity`
    height: ${hp('30%')}px;
    align-self: center;
    width: ${wp('85%')}px;
    border-width: 1px;
    border-color: #b8b6b6;
  `;
  
  export const Input = styled.TextInput`
    align-self: center;
    background: #fff;
    width: 85%;
    height: ${hp('6.5%')}px;
    elevation: 5;
    border-radius: 12px;
    margin-top: 26px;
    padding-horizontal: ${hp('1.8%')}px;
    padding-vertical: ${hp('1.8%')}px;
    font-family:${(props)=> props.theme.fonts.Ubuntu.normal }
  `;
  
  export const DropdownWrappeer = styled.View`
    background: #fff;
    width: 85%;
    height: ${hp('6.5%')}px;
    elevation: 5;
    border-radius: 12px;
    margin-top: 26px;
    padding-horizontal: ${hp('1.8%')}px;
    overflow: hidden;
    align-self: center;
    justify-content: center;
  `;
  
  export const P = styled.Text`
    font-size: ${hp('2.4%')}px;
    color: #000000;
    padding-vertical: ${hp('1.8%')}px;
    text-align: center;
    font-family:${(props)=> props.theme.fonts.Ubuntu.normal }
  `;
  
  export const ModalBackground = styled.View`
    flex: 1;
    align-items: center;
    flex-direction: column;
    background-color: #00000040;
    justify-content: center;
  `;
  
  export const FormAddProduct = styled.View`
    align-items: center;
    flex-direction: column;
    background-color: #ffffff;
    min-height: ${hp('95%')}px;
    width: ${wp('100%')}px;
    align-items: center;
    justify-content: space-around;
  `;
  
  export const AddProductButton = styled.TouchableOpacity`
    width: ${wp('40%')}px;
    border-radius: 12px;
    height: ${hp('6%')}px;
    justify-content: center;
    background: ${(props) => props.theme.colors.primary};
    margin-bottom: ${hp('1.8%')}px;
  `;
  
  export const WrapperButtons = styled.View`
    flex-direction:row;
    width:100%;
    align-items:center;
    justify-content:space-around
    height:${hp('12%')}px;
  `;
  
  export const AddProductButtonText = styled.Text`
    text-align: center;
    align-content: center;
    font-size: ${hp('2.4%')}px;
    color: ${(props) => props.theme.colors.secundary};
    font-family:${(props)=> props.theme.fonts.Ubuntu.normal }
  `;
  
  export const RemoveProductButton = styled.TouchableOpacity`
    width: ${wp('40%')}px;
    border-radius: 12px;
    height: ${hp('6%')}px;
  
    justify-content: center;
    background: #eb5757;
    margin-bottom: ${hp('1.8%')}px;
  `;
  
  export const WrapperListAddProduct = styled.View`
    height: ${hp('25%')}px;
    justify-content:center;
    align-items:center;
    width: ${wp('75%')}px;
    align-self:center;
  `;
  
  export const MediaSpotButtonAddProduct = styled.TouchableOpacity`
    height: ${hp('25%')}px;
    align-self: center;
    width: ${wp('75%')}px;
    border-width: 1px;
    border-color: #b8b6b6;
  `;
  
  export const AddMediaButtonWrapperAddProduct = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  `;
  
  export const RemoveMediaButtonWrapperAddProduct = styled.ImageBackground`
    justify-content: center;
    align-items: center;
    background-color:#0E1717
    height: 100%;
    `;
  
  export const RemoveMediaButtonWrapper = styled.ImageBackground`
    justify-content: flex-start;
    align-items: flex-end;
    background-color:#0E1717
    height: 100%;
    width: ${wp('75%')}px;
    `;
  
  export const MediaWrapper = styled.View`
    flex-direction: column;
    justify-content: flex-start;
    height: ${hp('25%')}px;
    border-width: 1px;
    width: ${wp('75%')}px;
    border-color: #b8b6b6;
    align-items: flex-end;
    background: #000;
  `;
  
  export const RemoveMedia = styled.TouchableOpacity`
    height: ${hp('8%')}px;
    width: ${wp('10%')}px;
    justify-content: center;
    align-items: center;
  `;
  