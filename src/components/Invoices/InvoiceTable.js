import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	withStyles,
} from '@material-ui/core';
import { GetApp, Print } from '@material-ui/icons';
import dayjs from 'dayjs';
import IframeModal from './IframeModal';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles((theme) => ({
	table: {
		minWidth: 650,
	},
	printIcon: {
		cursor: 'pointer',
		transition: 'all .2s',

		'&:hover': {
			color: theme.palette.primary.dark,
			backgroundColor: 'rgba(0,0,0,.05)',
		},

		'& svg:not(:last-child)': {
			marginRight: 5,
		},
	},
}));

const InvoiceTable = ({ invoices, ...props }) => {
	const classes = useStyles();
	const [openIframeModal, setIframeModal] = useState(false);
	const [iframePath, setIframePath] = useState('');

	const handleIframeModal = () => {
		setIframeModal(!openIframeModal);
	};

	const handleIframePath = (val) => {
		setIframePath(val);
	};

	console.log(iframePath, openIframeModal);

	if (!invoices || !invoices[0]) {
		return <Typography variant="h5">Nema Računa..</Typography>;
	}

	return (
		<div>
			<IframeModal
				open={openIframeModal}
				onClose={handleIframeModal}
				path={iframePath}
			/>
			<TableContainer component={Paper} style={{ marginTop: 50 }}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Tip Fakture</StyledTableCell>
							<StyledTableCell align="right">Broj Fakture</StyledTableCell>
							<StyledTableCell align="right">
								Ime Kupca / Naziv Firme
							</StyledTableCell>
							<StyledTableCell align="right">
								Račun Otkucan Dana
							</StyledTableCell>
							<StyledTableCell align="right">Valuta</StyledTableCell>
							<StyledTableCell align="right">Skini / Štampaj</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{invoices.map((invoice) => (
							<StyledTableRow key={invoice.name}>
								<StyledTableCell component="th" scope="invoice">
									{invoice.invoiceTitle}
								</StyledTableCell>
								<StyledTableCell align="right">{invoice.po}</StyledTableCell>
								<StyledTableCell align="right">
									{invoice.customerName}
								</StyledTableCell>
								<StyledTableCell align="right">
									{dayjs(invoice.createdAt).format('DD.MM.YYYY.')}
								</StyledTableCell>
								<StyledTableCell align="right">
									{dayjs(invoice.valuta).format('DD.MM.YYYY.')}
								</StyledTableCell>
								<StyledTableCell
									align="right"
									className={classes.printIcon}
									onClick={() => {
										handleIframePath(`/documents/${invoice.pdfName}`);
										handleIframeModal();
									}}
								>
									{/** <Visibility/> */}
									<GetApp />
									<Print />
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

InvoiceTable.propTypes = {
	invoices: PropTypes.array,
};

export default InvoiceTable;
