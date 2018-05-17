import styled from 'styled-components';

export const Input = styled.TextInput`
    width: 100%;
    border: ${props => (props.validate) ? '2px solid #CCC' : '2px solid red'};
    padding: 5px 10px;
    margin: 0 0 20px;
    height: 80px;
    font-size: 30px;
    background-color: #FFF;
`;