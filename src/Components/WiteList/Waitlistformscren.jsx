
import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { RadioGroup } from "@mui/material";
import { Radio } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const generateRandomString = (length) => {
 const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
 let result = '';
 for (let i = 0; i < length; i++) {
 result += characters.charAt(Math.floor(Math.random() * characters.length));
 }
 return result;
};

const initialFormData = {
 patientName: "",
 age: "",
 gender: "",
 contactno: "",
 wardName: "",
 wardId:"",
 // bedNumber: "",
 medicalAcuity: "",
 priority: "",
 admittingDoctors: "",
 admittingNurse: "",
 abhaNo: "",
 admissionDate: null,
 admissionTime: "",
 address: {
 doorno: "",
 streetname: "",
 district: "",
 state: "",
 country: "",
 pincode: "",
 },
 tasks: {
 taskType: "",
 description: "",

 },
};

const FormWait = () => {
 const location = useLocation();
 const [availableBeds, setAvailableBeds] = useState([]);
 const [availableWards, setAvailableWards] = useState([]);

 useEffect(() => {
 const fetchData = async () => {
 try {
 const bedsResponse = await axios.get("http://localhost:9000/bedGet");
 const wardsResponse = await axios.get("http://localhost:9000/bedGet");

 setAvailableBeds(bedsResponse.data);
 setAvailableWards(wardsResponse.data);
 } catch (error) {
 console.error("Error fetching available beds and wards:", error);
 }
 };

 fetchData();
 }, []);

 const queryParams = useMemo(() => {
 return new URLSearchParams(location.search);
 }, [location.search]);

 const [data, setData] = useState(initialFormData);

 useEffect(() => {
 setData({
 patientName: queryParams.get("patientName") || "",
 age: queryParams.get("age") || "",
 gender: queryParams.get("gender") || "",
 contactno: queryParams.get("contactno") || "",
 wardName: queryParams.get("wardName") || "",
 wardId: queryParams.get("wardId") || "",
 // bedNumber: "",
 medicalAcuity: "",
 priority: "",
 admittingDoctors: "",
 admittingNurse: "",
 abhaNo: "",
 admissionDate: queryParams.get("admissionDate") || null,
 admissionTime: "",
 address: {
 doorno: "",
 streetname: "",
 district: "",
 state: "",
 country: "",
 pincode: "",
 },
 tasks: {
 taskType: "",
 description: "",
 
 },
 });
 }, [queryParams]);

 const handleFormSubmit = async (e) => {
 e.preventDefault();

 try {
 const currentDate = dayjs();
 const selectedDate = dayjs(data.admissionDate);

 if (selectedDate.isBefore(currentDate, 'day')) {
 toast.error("Please select a current or future date for admission.");
 return;
 }

 const selectedTime = data.admissionTime;
 const currentTime = dayjs().format('HH:mm');

 if (selectedDate.isSame(currentDate, 'day') && selectedTime < currentTime) {
 toast.error("Please select a current or future time for admission.");
 return;
 }

 const patientId = `PAT-${generateRandomString(4)}-${Date.now()}`;
 const formData = { ...data, patientId };

 const response = await axios.post("http://localhost:9000/waitingentryy1", formData);

 if (response.data.error) {
 toast.error(response.data.error);
 } else {
 setData(initialFormData);
 toast.success("Patient Admitted Successfully");
 }
 } catch (error) {
 console.error("Error:", error);
 toast.error("An error occurred while submitting the form.");
 }
 };

 const handleGenderChange = (event) => {
 setData({
 ...data,
 gender: event.target.value,
 });
 };

 const handleDatedChanged = (newDate) => {
 const formattedDate = newDate ? dayjs(newDate).format("YYYY-MM-DD") : null;
 setData({ ...data, admissionDate: formattedDate });
 };

 return (
 <div style={{ display: "flex", backgroundColor: "#f5f5f5" }}>
 <div
 style={{
 width: "100%",
 padding: "10px",
 marginLeft: "50px",
 marginTop: "50px",
 }}
 >
 <Typography
 variant="h5"
 gutterBottom
 style={{ color: "gray", fontWeight: "bold", marginTop: "20px" }}
 >
 To Admit the Patient from Waiting List, please enter the details
 </Typography>

 <Container
 maxWidth="lr"
 style={{
 display: "flex",
 width: "100%",
 height: "100%",
 marginTop: "10px",
 justifyContent: "flex-start",
 background: "#ffff",
 borderRadius: "30px",
 marginLeft: "-15px",
 boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.3)",
 }}
 >
 <div style={{ width: "100%" }}>
 <form onSubmit={handleFormSubmit}>
 <Grid container spacing={4} style={{ marginTop: "10px" }}>
 <Grid item xs={12} sm={3.1}>
 <div
 
 >
 <TextField
 label="Name"
 id="outlined-size-small"
 defaultValue="Small"
 size="small"
 value={data.patientName}
 onChange={(e) =>
 setData({ ...data, patientName: e.target.value })
 }
 required
 style={{ width: "100%" }}
 />
 </div>
 </Grid>
 <Grid item xs={3} sm={1.3}>
 <div
 
 >
 <TextField
 label="Age"
 id="outlined-size-small"
 defaultValue="Small"
 size="small"
 value={data.age}
 onChange={(e) =>
 setData({ ...data, age: e.target.value })
 }
 required
 style={{ width: "100%" }}
 />
 </div>
 </Grid>
 <Grid item xs={3} sm={3.2}>
 <div
 
 >
 <TextField
 label="Contact No"
 id="outlined-size-small"
 defaultValue="Small"
 size="small"
 value={data.contactno}
 onChange={(e) =>
 setData({ ...data, contactno: e.target.value })
 }
 required
 style={{ width: "100%" }}
 />
 </div>
 </Grid>
 <Grid item xs={3} sm={3.8}>
 <div>
 <RadioGroup
 patientName="gender"
 value={data.gender}
 onChange={handleGenderChange}
 row
 >
 <FormControlLabel
 value="1"
 control={<Radio size="small" />}
 label={<span style={{ color: "gray" }}>1.Male</span>}
 />
 <FormControlLabel
 value="2"
 control={<Radio size="small" />}
 label={<span style={{ color: "gray" }}>2.Female</span>}
 />
 <FormControlLabel
 value="3"
 control={<Radio size="small" />}
 label={<span style={{ color: "gray" }}>3.Others</span>}
 />
 </RadioGroup>
 </div>
</Grid>

 <Grid item xs={3} sm={3}>
 <div
 
 >
 <LocalizationProvider dateAdapter={AdapterDayjs}>
 <DatePicker
 label="Admission Date"
 slotProps={{ textField: { size: "small" } }}
 value={
 data.admissionDate ? dayjs(data.admissionDate) : null
 }
 onChange={(newDate) => handleDatedChanged(newDate)}
 minDate={dayjs()}
 renderInput={(params) => <TextField {...params} />}
 />
 </LocalizationProvider>
 </div>
 </Grid>

 {/* New Grid item for admission time */}
 <Grid item xs={3} sm={3}>
 <div
 
 >
 <TextField
 label="Admission Time"
 id="admissionTime"
 type="time"
 value={data.admissionTime}
 onChange={(e) =>
 setData({ ...data, admissionTime: e.target.value })
 }
 required
 inputProps={{ step: 300 }} // 5-minute steps
 style={{ width: "100%" }}
 />
 </div>
 </Grid>

 <Grid item xs={3}>
 <div
 
 >
 <TextField
 label="Medical Acuity"
 fullWidth
 variant="outlined"
 value={data.medicalAcuity}
 onChange={(e) => setData({ ...data, medicalAcuity: e.target.value })}
 />
 </div>
 </Grid>

 <Grid item xs={3}>
 <div
 
 >
 <TextField
 label="Priority"
 fullWidth
 variant="outlined"
 value={data.priority}
 onChange={(e) => setData({ ...data, priority: e.target.value })}
 />
 </div>
 </Grid>

 <Grid item xs={3}>
 <div
 
 >
 <TextField
 label="Admitting Doctors"
 fullWidth
 variant="outlined"
 value={data.admittingDoctors}
 onChange={(e) => setData({ ...data, admittingDoctors: e.target.value })}
 />
 </div>
 </Grid>

 <Grid item xs={3}>
 <div
 
 >
 <TextField
 label="Admitting Nurse"
 fullWidth
 variant="outlined"
 value={data.admittingNurse}
 onChange={(e) => setData({ ...data, admittingNurse: e.target.value })}
 />
 </div>
 </Grid>

 {/* New Grid item for task input */}
 <Grid item xs={3}>
 <div
 
 >
 <TextField
 label="Task"
 fullWidth
 variant="outlined"
 value={data.task}
 onChange={(e) => setData({ ...data, task: e.target.value })}
 />
 </div>
 </Grid>

 <Grid item xs={3}>
 <div
 
 >
 <TextField
 label="Abha No"
 fullWidth
 variant="outlined"
 value={data.AbhaNo}
 onChange={(e) => setData({ ...data, AbhaNo: e.target.value })}
 />
 </div>
 </Grid>

 {/* New Grid item for address details */}

 <Grid item xs={3} sm={3}>
 <div
 
 >
 <TextField
 label="Ward Name"
 fullWidth
 variant="outlined"
 value={data.wardName}
 onChange={(e) => setData({ ...data, wardName: e.target.value })}
 required
 />
 </div>
 </Grid>

 <Grid item xs={3} sm={3}>
 <div
 
 >
 <TextField
 label="Ward ID"
 fullWidth
 variant="outlined"
 value={data.wardId}
 onChange={(e) => setData({ ...data, wardId: e.target.value })}
 required
 />
 </div>
 </Grid>

 {/* <Grid item xs={6}>
 <div
 style={{
 background: "#fffff",
 padding: "10px",
 borderRadius: "10px",
 boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
 }}
 >
 <TextField
 label="Bed Number"
 id="bedNumber"
 fullWidth
 variant="outlined"
 value={data.bedNumber}
 onChange={(e) => setData({ ...data, bedNumber: e.target.value })}
 required
 />
 </div>
</Grid> */}


 <Grid item xs={3} >
 <div
 
 >
 <Typography variant="h6" gutterBottom>
 Address
 </Typography>
 <TextField
 label="Door No"
 fullWidth
 variant="outlined"
 value={data.address.doorno}
 onChange={(e) => setData({
 ...data,
 address: { ...data.address, doorno: e.target.value }
 })}
 />
 </div>
</Grid>

<Grid item xs={3} >
 <div
 
 >
 <TextField
 label="Street Name"
 fullWidth
 variant="outlined"
 value={data.address.streetname}
 onChange={(e) => setData({
 ...data,
 address: { ...data.address, streetname: e.target.value }
 })}
 />
 </div>
</Grid>

<Grid item xs={3} >
 <div
 
 >
 <TextField
 label="District"
 fullWidth
 variant="outlined"
 value={data.address.district}
 onChange={(e) => setData({
 ...data,
 address: { ...data.address, district: e.target.value }
 })}
 />
 </div>
</Grid>

<Grid item xs={3} >
 <div
 
 >
 <TextField
 label="State"
 fullWidth
 variant="outlined"
 value={data.address.state}
 onChange={(e) => setData({
 ...data,
 address: { ...data.address, state: e.target.value }
 })}
 />
 </div>
</Grid>

<Grid item xs={3} >
 <div
 
 >
 <TextField
 label="Country"
 fullWidth
 variant="outlined"
 value={data.address.country}
 onChange={(e) => setData({
 ...data,
 address: { ...data.address, country: e.target.value }
 })}
 />
 </div>
</Grid>

<Grid item xs={3} >
 <div
 
 >
 <TextField
 label="Pincode"
 fullWidth
 variant="outlined"
 value={data.address.pincode}
 onChange={(e) => setData({
 ...data,
 address: { ...data.address, pincode: e.target.value }
 })}
 />
 </div>
</Grid>
<Grid item xs={3}>
 <Typography variant="h6" gutterBottom style={{ color: "gray", marginTop: "20px" }}>
 Tasks
 </Typography>
 </Grid>

 <Grid item xs={3}>
 <TextField
 required
 
 label="Task Type"
 fullWidth
 variant="outlined"
 value={data.tasks.taskType}
 onChange={(e) =>
 setData({
 ...data,
 tasks: { ...data.tasks, taskType: e.target.value },
 })
 }
 />
 </Grid>

 <Grid item xs={3}>
 <TextField
 required
 
 label="Task Description"
 fullWidth
 variant="outlined"
 multiline
 rows={2}
 value={data.tasks.description}
 onChange={(e) =>
 setData({
 ...data,
 tasks: { ...data.tasks, description: e.target.value },
 })
 }
 />
 </Grid>

 
 <Grid item xs={3}>
 <Button
 type="submit"
 variant="contained"
 color="primary"
 fullWidth
 style={{
 marginTop: "30px",
 borderRadius: "5px",
 boxShadow: "5px 5px 6px rgba(0, 0, 0, 0.2)",
 alignContent:"center",
 marginLeft:"20px"
 }}
 >
 Waitlist Patient
 </Button>
 </Grid>
 </Grid>
 </form>
 </div>
 </Container>
 </div>
 </div>
 );
};

export default FormWait;