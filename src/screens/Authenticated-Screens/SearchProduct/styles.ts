
  
  import styled from 'styled-components/native';
  
  export const Container = styled.View`
   /*  background: ${(props) => props.theme.colors.background}; */
    flex-direction: column;
  
    background:  #f2f1f7;
  `;
  
  export const ListRowTitle = styled.Text`
    padding-left: 15px
    font-size: 16px;
  `;
  
  export const ListRowSubTitle = styled.Text`
    padding-top: 3px;
    padding-left: 15px
    font-size: 13px;
    color: #666666;
    font-family:${(props)=> props.theme.fonts.Ubuntu.normal }
  `;
  
  export const SearchInput = styled.TextInput`
    width: 90%;
    background: #fff;
    border-radius: 12px;
    border-width: 1px;
    border-color: #e4e4e6;
    justify-content: center;
    height: 45px;
    padding-horizontal: 10px;
  `;
  
  export const ListProducts = styled.TouchableOpacity`
  justify-content:space-around
    align-items: center;
    flex-direction: row;
    background: #fff;
    height: 108px;
    width:95%;;
    margin-bottom: 1px;
    border-width: 1px;
    border-color: #e4e4e6;
    align-self:center;
  `;
  
  export const ListProductsImageWrapper = styled.Image`
    width: 84px;
    border-radius: 22px;
  `;
  export const ListProductsTextWrapper = styled.View`
    width: 68%;
  `;
  
  export const HeaderSearchProduct = styled.View`
    
    justify-content:center;
    background: #f2f1f7;
    height:70px;
    width: 100%;
    align-items:center;
    
  `;
  
  export const ListWrapperSearchProduct = styled.View`
    align-items: center;
    background: #f2f1f7;
    height:85%;
  `;
  
  export const NothingFound = styled.Text`
    text-align:center;
    background: #f2f1f7;
    color:#4e4d5c;

  `;