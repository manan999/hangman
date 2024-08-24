import styled from 'styled-components/native' ;

const ProfileView = styled.View`
  flex: ${({fl}) => fl?fl:0.9} ;
  padding: 10px 20px ;
  margin: 0 ;
  justify-content: space-evenly ;
  background-color: ${ ({theme}) => theme.colors.halfMain } ;
  width: 100% ;
` ;

const ProfileTop = styled.View`
  padding: 30px 20px 0 ;
  margin: 0 ;
  align-items: center ;
  width: 100% ;
  gap: 8px ;
` ;

export { ProfileView, ProfileTop } ;