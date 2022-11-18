import React, { forwardRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import MaterialTable from "material-table";
import { GET_ALL_EMPLOYEES } from "../GraphQL/Querys";
import { useQuery, useMutation } from "@apollo/client";
import { Modal, TextField, Button } from "@material-ui/core";
import { tableIcons } from "../tableIcons";
import { makeStyles } from "@material-ui/core/styles";
import { UPDATE_USER } from "../GraphQL/Mutations";

const useStyles = makeStyles((theme) => ({
	modal: {
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxSahdiw: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		top: "10%",
		left: "40%",
	},
	iconos: {
		cursor: "pointer",
	},
	hidden: {
		display: "none",
	},
	imputMaterial: {
		width: "100%",
	},
}));

const columns = [
	{
		title: "Name",
		field: "name",
	},
	{
		title: "Last Name",
		field: "lastName",
	},
	{
		title: "Email",
		field: "email",
	},
	{
		title: "Nationality",
		field: "nationality",
	},
	{
		title: "Phone",
		field: "phone",
	},
	{
		title: "Civil Status",
		field: "civilStatus",
	},
	{
		title: "Birthday",
		field: "birthday",
	},
];

export const EmployeesList = () => {
	const styles = useStyles();

	const { loading, error, data } = useQuery(GET_ALL_EMPLOYEES);

	const [updateEmployee, { result }] = useMutation(UPDATE_USER, {
		refetchQueries: [{ query: GET_ALL_EMPLOYEES }],
	});

	const [modalEditar, setModalEditar] = useState(false);
	const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState({
		name: "",
		lastName: "",
		email: "",
		phone: "",
		id: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEmpleadoSeleccionado((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(
			"EMPLEADO SELECCIONADO ANTES DE MUTACIÓN:   " +
				JSON.stringify(empleadoSeleccionado)
		);
		updateEmployee({
			variables: {
				name: empleadoSeleccionado.name,
				lastName: empleadoSeleccionado.lastName,
				email: empleadoSeleccionado.email,
				phone: empleadoSeleccionado.phone,
				id: empleadoSeleccionado.id,
			},
		});
		abrirCerrarModalEditar();
	};

	const abrirCerrarModalEditar = () => {
		setModalEditar(!modalEditar);
	};

	const bodyEditar = (
		<div className={styles.modal}>
			<h3>Edit Employee</h3>
			<TextField
				className={styles.hidden}
				name="id"
				aria-readonly
				value={empleadoSeleccionado.id}
			/>
			<TextField
				className={styles.inputMaterial}
				label="Name"
				name="name"
				onChange={handleChange}
				value={empleadoSeleccionado && empleadoSeleccionado.name}
			/>
			<br />
			<TextField
				className={styles.inputMaterial}
				label="Last Name"
				name="lastName"
				onChange={handleChange}
				value={empleadoSeleccionado && empleadoSeleccionado.lastName}
			/>
			<br />
			<TextField
				className={styles.inputMaterial}
				label="Email"
				name="email"
				onChange={handleChange}
				value={empleadoSeleccionado && empleadoSeleccionado.email}
			/>
			<br />
			<TextField
				className={styles.inputMaterial}
				label="Phone"
				name="phone"
				onChange={handleChange}
				value={empleadoSeleccionado && empleadoSeleccionado.phone}
			/>
			<br />
			<TextField
				className={styles.inputMaterial}
				label="Nationality"
				name="nationality"
				aria-readonly
				value={empleadoSeleccionado.nationality}
			/>
			<br />
			<TextField
				className={styles.inputMaterial}
				label="Civil Satus"
				name="civilStatus"
				aria-readonly
				value={empleadoSeleccionado.civilStatus}
			/>
			<br />
			<TextField
				className={styles.inputMaterial}
				label="Birthday"
				name="birthday"
				aria-readonly
				value={empleadoSeleccionado.birthday}
			/>

			<br />
			<br />
			<div align="right">
				<Button color="primary" onClick={(e) => handleSubmit(e)}>
					Edit
				</Button>
				<Button onClick={() => abrirCerrarModalEditar()}>Cancel</Button>
			</div>
		</div>
	);

	const seleccionarEmpleado = (empleado, caso) => {
		setEmpleadoSeleccionado(empleado);
		if (caso === "Editar") abrirCerrarModalEditar();
	};

	if (data) {
		//console.log(JSON.stringify(data.getAllEmployees))
	}
	if (error) alert(error);

	return (
		<Box component="main" marginTop={10} sx={{ flexGrow: 1, p: 3 }}>
			<div>
				<h3
					style={{
						display: "flex",
						flexDirection: "column",
						textAlign: "center",
						color: "orange",
					}}
				>
					LIST OF EMPLOYEES
				</h3>
				{loading ? (
					<h3>Loading...</h3>
				) : (
					<MaterialTable
						title={""}
						icons={tableIcons}
						columns={columns}
						data={data.getAllEmployees}
						actions={[
							{
								icon: tableIcons.Edit,
								tooltip: "Edit Employee",
								onClick: (event, rowData) =>
									seleccionarEmpleado(rowData, "Editar"),
							},
						]}
						option={{ actionsColumnIndex: -1 }}
					/>
				)}

				<Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
					{bodyEditar}
				</Modal>
			</div>
		</Box>
	);
};

export default EmployeesList;
