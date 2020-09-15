import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Snackbar, SnackbarContent, colors } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlined';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';

const useStyles = makeStyles(() => ({
  success: {
    backgroundColor: colors.green[600],
  },
  error: {
    backgroundColor: colors.red[600],
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '8px',
  },
}));

interface SnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  type: 'error' | 'success';
}

const GeneralSnackbar: React.FC<SnackbarProps> = ({
  open,
  onClose,
  message,
  type = 'success',
}) => {
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={6000}
      onClose={onClose}
      open={open}
    >
      <SnackbarContent
        className={classes[type]}
        message={
          <span className={classes.message}>
            {type === 'success' ? (
              <CheckCircleIcon className={classes.icon} />
            ) : (
              <ErrorRoundedIcon className={classes.icon} />
            )}
            {message}
          </span>
        }
      />
    </Snackbar>
  );
};

export default GeneralSnackbar;
