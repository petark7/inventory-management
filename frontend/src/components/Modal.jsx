import { styled, css } from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Modal as BaseModal } from '@mui/base/Modal';
import { grey } from '../styling/colors';

const Backdrop = React.forwardRef((properties, reference) => {
	const { open, className, ...other } = properties;
	return (
		<div
			ref={reference}
			className={clsx({ 'base-Backdrop-open': open }, className)}
			{...other}
	  />
	);
});

Backdrop.propTypes = {
	className: PropTypes.string.isRequired,
	open: PropTypes.bool
};

const ModalParent = styled(BaseModal)`
	position: fixed;
	z-index: 1300;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
  `;

const StyledBackdrop = styled(Backdrop)`
	z-index: -1;
	position: fixed;
	inset: 0;
	background-color: rgb(0 0 0 / 0.5);
	-webkit-tap-highlight-color: transparent;
  `;

const ModalContent = styled('div')(
	({ theme }) => css`
	  font-family: 'IBM Plex Sans', sans-serif;
	  font-weight: 500;
	  text-align: start;
	  position: relative;
	  display: flex;
	  flex-direction: column;
	  gap: 8px;
	  overflow: hidden;
	  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
	  border-radius: 8px;
	  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
	  box-shadow: 0 4px 12px
		${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
	  padding: 24px;
	  color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  
	  & .modal-title {
		margin: 0;
		line-height: 1.5rem;
		margin-bottom: 8px;
	  }
  
	  & .modal-description {
		margin: 0;
		line-height: 1.5rem;
		font-weight: 400;
		color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
		margin-bottom: 4px;
	  }
	`
);
const Modal = ({ children, onClose, open }) => (
	<ModalParent
		aria-labelledby="unstyled-modal-title"
		aria-describedby="unstyled-modal-description"
		open={open}
		slots={{ backdrop: StyledBackdrop }}
		onClose={onClose}
	>
		<ModalContent sx={{ width: 400 }}>
			{children}
		</ModalContent>
	</ModalParent>
);

export default Modal;
