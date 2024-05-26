import { MouseEventHandler } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
  isShow: boolean;
  title?: string;
  message?: string;
  handleAgree?: MouseEventHandler;
  handleClose?: MouseEventHandler;
}

export default function AlertDialog({
  isShow,
  title = "Use Google's location service?",
  message = `Let Google help apps determine location. This means sending
  anonymous location data to Google, even when no apps are running.`,
  handleAgree,
  handleClose,
}: Props) {
  return (
    <>
      <Dialog
        open={isShow}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAgree} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
