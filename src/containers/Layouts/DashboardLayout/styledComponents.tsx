import styled from 'styled-components'

export const WrapeprProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid #f4f4f4;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

export const WrapperMenuLogout = styled.div`
  width: 200px;
  height: 272px;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(170, 170, 170, 0.15);
  border-radius: 16px;
  padding: 20px;
`;

export const MenuDropdown = styled.div`
  border: 1.5px solid #aaaaaa;
  margin-right: 1rem;
  border-radius: 24px;
  width: 180px;
  height: 3rem;
  padding: 16px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TextName = styled.p`
  margin: 0;
  font-size: '16px';
  font-weight: 600;
  color: #000000;
`;

export const TextRole = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  margin: 0;
  color: #666666;
`;

export const LanguageOption = styled.div`
  top: 1rem;
  right: 1rem;
  position: absolute;
  background-color: white;
  width: 200px;
  height: 160px;
  box-shadow: 0px 4px 16px rgba(170, 170, 170, 0.15);
  border-radius: 16px;
  padding: 20px;
`;
