import { Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const FullPrice = ({ invoiceDescs }) => {
	return (
		<div style={{ fontStyle: 'italic' }}>
			<Typography component="p">
				Ukupna cena bez PDV-a{' '}
				{invoiceDescs.reduce((num, invoiceDesc) => {
					return Number(
						(
							num +
							invoiceDesc.pricePerUnit *
								invoiceDesc.qty *
								(1 - invoiceDesc.discount / 100)
						).toFixed(2)
					);
				}, 0)}{' '}
				KM
			</Typography>
			<Typography component="p">
				Ukupna cena sa PDV-om{' '}
				{invoiceDescs.reduce((num, invoiceDesc) => {
					return Number(
						(
							num +
							invoiceDesc.pricePerUnit *
								invoiceDesc.qty *
								(1 - invoiceDesc.discount / 100) *
								(1 + invoiceDesc.tax / 100)
						).toFixed(2)
					);
				}, 0)}{' '}
				KM
			</Typography>
		</div>
	);
};

FullPrice.propTypes = {
	invoiceDescs: PropTypes.array,
};

export default React.memo(FullPrice);
