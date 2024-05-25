import { CheckCircleOutline } from '@mui/icons-material';
import { Box, Modal, Typography } from '@mui/material';
import { MouseEventHandler } from 'react';

interface Props {
  title?: string;
  message?: string;
  showModal: boolean;
  handleClose: MouseEventHandler;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius:2,
  boxShadow: 24,
  p: 4,
};

export const BasicModal = ({
  title,
  message = 'Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
  showModal,
  handleClose,
}: Props) => {
  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box sx={style}>
        {title && (
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {title}
          </Typography>
        )}

        <Box display='flex' justifyContent='center'>
          <CheckCircleOutline color='success' fontSize='large' />
        </Box>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          {message}
        </Typography>
      </Box>
    </Modal>
  );
};
