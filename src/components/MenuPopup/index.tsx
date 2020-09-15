import React from 'react';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import MoreVert from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks';

interface MenuProps {
  orientationIcon?: 'vertical' | 'horizontal';
  disabled?: boolean;
}

const MenuPopup: React.FC<MenuProps> = ({
  children,
  orientationIcon = 'horizontal',
  disabled = false,
}) => {
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });
  return (
    <>
      <Button
        {...bindTrigger(popupState)}
        variant="text"
        style={{
          textAlign: 'center',
          alignItems: 'center',
          verticalAlign: 'middle',
        }}
        disabled={disabled}
      >
        {orientationIcon === 'vertical' ? <MoreVert /> : <MoreHoriz />}
      </Button>

      <Menu
        {...bindMenu(popupState)}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <div>{children}</div>
      </Menu>
    </>
  );
};

export default MenuPopup;
