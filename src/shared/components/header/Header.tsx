import { logout } from '../../functions/connection/auth';
import { HeaderContainer, LogoExit } from './header.style';

import { useState } from 'react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HeaderTestIdEnum } from './enum/headerTestIdEnum';

function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        data-testid={HeaderTestIdEnum.HEADER_MODAL}
        title="Atenção"
        open={open}
        onOk={() => logout(navigate)}
        onCancel={hideModal}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p data-testid={HeaderTestIdEnum.HEADER_MODAL_P}>Tem certeza que deseja sair?</p>
      </Modal>
      <HeaderContainer data-testid={HeaderTestIdEnum.HEADER_CONTAINER}>
        <LogoExit onClick={showModal} data-testid={HeaderTestIdEnum.HEADER_LOGO} />
      </HeaderContainer>
    </>
  );
}

export default Header;
