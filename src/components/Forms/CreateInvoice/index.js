import DateFnsUtils from '@date-io/date-fns';
import {
	Button,
	makeStyles,
	MenuItem,
	TextField,
	Typography,
} from '@material-ui/core';
import { Add, ErrorOutline } from '@material-ui/icons';
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createInvoceAction } from '../../../redux/actions/invoiceActions';
import ConfirmModal from '../../ConfirmModal';
import { LoadingModal } from '../../UI/LoadingModal';
import FullPrice from './FullPrice';
// import InvoiceDescs from './InvoiceDescs';

const useStyles = makeStyles((theme) => ({
	form: {},
	textField: {
		width: '100%',
		marginBottom: 10,
	},
	formRow: {
		display: 'flex',
		margin: '10px 0',
		wrap: 1,

		'& *:not(:last-child)': {
			marginRight: 15,
		},

		'@media screen and (max-width: 900px)': {
			flexDirection: 'column',

			'& *:not(:last-child)': {
				marginRight: 0,
				marginBottom: 15,
			},
		},
	},
	select: {
		minWidth: 170,
		width: 170,

		'@media screen and (max-width: 900px)': {
			width: '100%',
		},
	},
	datePicker: {
		width: 170,

		'@media screen and (max-width: 900px)': {
			width: '100%',
		},
	},

	formDescContainer: {
		margin: '20px 0',
	},
	invoiceDesc: {
		padding: '10px 15px',
		background: 'rgba(0,0,0,.05)',
		marginBottom: 10,
	},
	flexBetween: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
}));

const CreateInvoice = ({ heading }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [openConfirmSubmitModal, setConfirmSubmitModal] = useState(false);

	const handleConfirmSubmitModal = () => {
		setConfirmSubmitModal(!openConfirmSubmitModal);
	};

	const initialInvoiceDesc = {
		desc: '',
		pricePerUnit: 0,
		qty: 1,
		tax: 0,
		discount: 0,
		unit: 'kom',
	};

	const formik = useFormik({
		initialValues: {
			invoiceTitle: 'Račun',
			location: 'Banja Luka',
			deliveryDate: dayjs(new Date()).format('YYYY/MM/DD'),
			dpo: dayjs(new Date()).format('YYYY/MM/DD'),
			valuta: dayjs(new Date()).format('YYYY/MM/DD'),
			dueDate: dayjs(new Date()).format('YYYY/MM/DD'),
			customerName: '',
			customerAdress: '',
			customerPostNumberLocation: '',
			customerPhoneNumber: '',
			customerEmail: '',
			customerAdditionalInfo: '',
			priceInWriting: '',
			invoiceDescs: [initialInvoiceDesc],
		},
		onSubmit: (v) => {
			dispatch(createInvoceAction(v));
		},
	});

	const invoiceTitleOptions = ['Račun', 'Predračun'];

	const handleDateChange = (date, name) => {
		formik.setFieldValue(name, dayjs(date).format('YYYY-MM-DDTHH:mm'));
	};

	const addNewInvoiceDescToState = () => {
		formik.setValues({
			...formik.values,
			invoiceDescs: [...formik.values.invoiceDescs, initialInvoiceDesc],
		});
	};

	console.log('formik.values', formik.values);

	const handleDescChange = (e, index) => {
		let newDescs = [...formik.values.invoiceDescs];
		newDescs[index][e.target.name] = e.target.value;

		formik.setFieldValue('invoiceDescs', newDescs);

		if (e.target.focus) e.target.focus();
	};

	return (
		<>
			<ConfirmModal
				open={openConfirmSubmitModal}
				onClose={handleConfirmSubmitModal}
				heading="Da li ste sigurni da ste sve popunili ispravno?"
				text="Nakon što napravite fakturu nemate mogućnost izmene ili brisanja. Proverite pravopis, imena, kvačice (š,đ,č,ć,ž)."
				btn1="potvrdi"
				btn2="vrati se"
				headIcon={<ErrorOutline style={{ fontSize: 150 }} />}
				onSubmit={formik.handleSubmit}
			/>
			<form className={classes.form}>
				<Typography
					variant="h4"
					component="h3"
					style={{ marginLeft: -1, marginBottom: 10 }}
				>
					{heading || 'Kreiraj Fakturu'}
				</Typography>
				<div className={classes.formRow}>
					<TextField
						className={classes.select}
						name="invoiceTitle"
						label="Tip Fakture"
						value={formik.values.invoiceTitle}
						select
						onChange={formik.handleChange}
						helperText={formik.errors.invoiceTitle}
						error={!!formik.errors.invoiceTitle}
						variant="outlined"
					>
						{invoiceTitleOptions.map((opt, index) => (
							<MenuItem key={index} value={opt}>
								{opt}
							</MenuItem>
						))}
					</TextField>
					<TextField
						className={classes.select}
						name="location"
						label="Lokacija*"
						value={formik.values.location}
						onChange={formik.handleChange}
						helperText={formik.errors.location}
						error={!!formik.errors.location}
						variant="outlined"
					/>
				</div>
				<div className={classes.formRow}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							variant="inline"
							ampm={false}
							label="Izdano Dana"
							name="deliveryDate"
							value={formik.values.deliveryDate}
							onChange={(date) => handleDateChange(date, 'deliveryDate')}
							onError={console.log}
							format="dd.MM.yyyy."
							className={classes.datePicker}
						/>
					</MuiPickersUtilsProvider>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							variant="inline"
							ampm={false}
							label="DPO"
							name="dpo"
							value={formik.values.dpo}
							onChange={(date) => handleDateChange(date, 'dpo')}
							onError={console.log}
							format="dd.MM.yyyy."
							className={classes.datePicker}
						/>
					</MuiPickersUtilsProvider>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							variant="inline"
							ampm={false}
							label="Valuta"
							name="valuta"
							value={formik.values.valuta}
							onChange={(date) => handleDateChange(date, 'valuta')}
							onError={console.log}
							format="dd.MM.yyyy."
							className={classes.datePicker}
						/>
					</MuiPickersUtilsProvider>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							variant="inline"
							ampm={false}
							label="Rok Plaćanja"
							name="dueDate"
							value={formik.values.dueDate}
							onChange={(date) => handleDateChange(date, 'dueDate')}
							onError={console.log}
							format="dd.MM.yyyy."
							className={classes.datePicker}
						/>
					</MuiPickersUtilsProvider>
				</div>

				<TextField
					className={classes.textField}
					name="customerName"
					label="Ime Kupca*"
					value={formik.values.customerName}
					onChange={formik.handleChange}
					helperText={formik.errors.customerName}
					error={!!formik.errors.customerName}
					variant="outlined"
					style={{ marginTop: 30 }}
				/>
				<TextField
					className={classes.textField}
					name="customerAdress"
					label="Adresa Kupca"
					value={formik.values.customerAdress}
					onChange={formik.handleChange}
					helperText={formik.errors.customerAdress}
					error={!!formik.errors.customerAdress}
					variant="outlined"
				/>

				<TextField
					className={classes.textField}
					name="customerPostNumberLocation"
					label="Poštanski Broj i Mesto Kupca"
					value={formik.values.customerPostNumberLocation}
					onChange={formik.handleChange}
					helperText={formik.errors.customerPostNumberLocation}
					error={!!formik.errors.customerPostNumberLocation}
					variant="outlined"
				/>
				<TextField
					className={classes.textField}
					name="customerPhoneNumber"
					label="Broj Telefona Kupca"
					value={formik.values.customerPhoneNumber}
					onChange={formik.handleChange}
					helperText={formik.errors.customerPhoneNumber}
					error={!!formik.errors.customerPhoneNumber}
					variant="outlined"
				/>
				<TextField
					className={classes.textField}
					name="customerEmail"
					label="Email Kupca"
					value={formik.values.customerEmail}
					onChange={formik.handleChange}
					helperText={formik.errors.customerEmail}
					error={!!formik.errors.customerEmail}
					variant="outlined"
				/>
				<TextField
					className={classes.textField}
					name="customerAdditionalInfo"
					label="Dodatne Informacije o Kupcu"
					value={formik.values.customerAdditionalInfo}
					onChange={formik.handleChange}
					helperText={formik.errors.customerAdditionalInfo}
					error={!!formik.errors.customerAdditionalInfo}
					variant="outlined"
				/>

				<div className={classes.formDescContainer}>
					{useMemo(() => {
						const invoiceUnitOptions = ['kom', 'h', 'komplet'];
						console.log('descs rerender');

						return formik.values.invoiceDescs.map((invoiceDesc, index) => (
							<div className={classes.invoiceDesc} key={index}>
								<Typography variant="h5">Linija {index + 1}</Typography>
								<div className={classes.formRow}>
									<TextField
										className={classes.textField}
										name="desc"
										label="Ime Proizvoda/Usluge"
										value={invoiceDesc.desc}
										onChange={(e) => {
											console.log('bas before', formik.values);
											handleDescChange(e, index);
										}}
										variant="standard"
									/>
									<TextField
										className={classes.select}
										name="unit"
										label="Jedinica Mere"
										value={invoiceDesc.unit}
										select
										onChange={(e) => {
											handleDescChange(e, index);
										}}
										variant="standard"
									>
										{invoiceUnitOptions.map((opt, index) => (
											<MenuItem key={index} value={opt}>
												{opt}
											</MenuItem>
										))}
									</TextField>
								</div>
								<div className={classes.formRow}>
									<TextField
										className={classes.select}
										name="pricePerUnit"
										label="Cena Po Jedinici"
										value={invoiceDesc.pricePerUnit}
										type="number"
										onChange={(e) => {
											handleDescChange(e, index);
										}}
										variant="standard"
									/>
									<TextField
										className={classes.select}
										name="qty"
										label="Količina"
										value={invoiceDesc.qty}
										type="number"
										onChange={(e) => {
											handleDescChange(e, index);
										}}
										variant="standard"
									/>
									<TextField
										className={classes.select}
										name="discount"
										label="Popust %"
										value={invoiceDesc.discount}
										type="number"
										onChange={(e) => {
											handleDescChange(e, index);
										}}
										variant="standard"
									/>
									<TextField
										className={classes.select}
										name="tax"
										label="PDV %"
										value={invoiceDesc.tax}
										type="number"
										onChange={(e) => {
											handleDescChange(e, index);
										}}
										variant="standard"
									/>
								</div>
								<Typography
									variant="caption"
									component="p"
									style={{ marginTop: 5 }}
									color="textSecondary"
								>
									Cena bez PDV-a:{' '}
									{(
										invoiceDesc.pricePerUnit *
										invoiceDesc.qty *
										(1 - invoiceDesc.discount / 100)
									).toFixed(2)}{' '}
									KM
								</Typography>
								<Typography
									variant="caption"
									component="p"
									color="textSecondary"
								>
									Cena sa PDV-om:{' '}
									{(
										invoiceDesc.pricePerUnit *
										invoiceDesc.qty *
										(1 - invoiceDesc.discount / 100) *
										(1 + invoiceDesc.tax / 100)
									).toFixed(2)}{' '}
									KM
								</Typography>
							</div>
						));
						// eslint-disable-next-line
					}, [formik.values.invoiceDescs])}
					<Button
						size="small"
						color="primary"
						onClick={() => {
							addNewInvoiceDescToState();
						}}
						startIcon={<Add />}
						disabled={formik.values.invoiceDescs.length > 6}
					>
						Dodaj Liniju
					</Button>
				</div>

				<div className={classes.flexBetween}>
					<TextField
						style={{ width: 300 }}
						name="priceInWriting"
						label="Ukupna Cena sa PDV-om Slovima*"
						value={formik.values.priceInWriting}
						onChange={formik.handleChange}
						helperText={formik.errors.priceInWriting}
						error={!!formik.errors.priceInWriting}
						variant="outlined"
					/>
					<FullPrice invoiceDescs={formik.values.invoiceDescs} />
				</div>

				<Button
					style={{ marginTop: 20 }}
					color="primary"
					size="large"
					variant="contained"
					onClick={handleConfirmSubmitModal}
				>
					Napravi Fakturu
				</Button>
			</form>
			<LoadingModal />
		</>
	);
};

export default CreateInvoice;
