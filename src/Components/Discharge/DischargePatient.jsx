mport React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { RadioGroup } from "@mui/material";
import { Radio } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import PersonIcon from "@mui/icons-material/Person";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

const initialFormData = {
 patientName: "",
 age: "",
 gender: "",
 patientId: "",
 wardId: "",
 bedNumber: "",
 medicalAcuity: "",
 dischargeReasons: "",
 mortalityRate: "",
 dischargeDate: null,
 admissionDate: null,
 dischargeTime: null,
};

const DischargePatient = () => {
 const location = useLocation();
 const queryParams = useMemo(() => {
 return new URLSearchParams(location.search);
 }, [location.search]);

 const [wardOptions, setWardOptions] = useState([]);

 useEffect(() => {
 axios
 .get("http://localhost:9000/bedGet")
 .then((response) => {
 if (Array.isArray(response.data)) {
 const extractedWardNames = response.data.flatMap((item) =>
 item.wards.map((ward) => ward.name)
 );
 setWardOptions(extractedWardNames);
 }
 })
 .catch((error) => {
 console.error("Error fetching ward options:", error);
 });
 }, []);

 const [data, setData] = useState(initialFormData);

 useEffect(() => {
 if (queryParams.has("bedNumber")) {
 const admissionDateQueryParam = queryParams.get("admissionDate") || "";
 const formattedAdmissionDate = admissionDateQueryParam
 ? dayjs(admissionDateQueryParam).format("YYYY-MM-DD")
 : null;

 setData({
 patientName: queryParams.get("patientName") || "",
 age: queryParams.get("age") !== undefined ? queryParams.get("age") : "",
 gender: queryParams.get("gender") !== undefined ? queryParams.get("gender") : "",
 contactno: queryParams.get("contactno") !== undefined ? queryParams.get("contactno") : "",
 patientId: queryParams.get("patientId") !== undefined ? queryParams.get("patientId") : "",
 wardId: queryParams.get("WardId") !== undefined ? queryParams.get("WardId") : "",
 bedNumber: queryParams.get("bedNumber") || "",
 medicalAcuity: queryParams.get("medicalAcuity") !== undefined ? queryParams.get("medicalAcuity") : "",
 dischargeReasons: "",
 admissionDate: formattedAdmissionDate,
 });
 }
 }, [queryParams]);


 const handleFormSubmit = async (e) => {
 e.preventDefault();
 const {
 patientName,
 age,
 gender,
 patientId,
 wardId,
 bedNumber,
 medicalAcuity,
 dischargeReasons,
 admissionDate,
 dischargeDate,
 dischargeTime,
 } = data;

 try {
 const { data: response } = await axios.post(
 "http://localhost:9000/distaa",
 {
 patientName,
 age,
 gender,
 patientId,
 wardId,
 bedNumber,
 medicalAcuity,
 dischargeReasons,
 admissionDate,
 dischargeDate,
 dischargeTime,
 }
 );

 if (response.error) {
 toast.error(response.error);
 } else {
 setData(initialFormData);
 toast.success("Patient Discharged Successfully");
 }
 } catch (error) {
 console.log(error);
 }
 };

 const handleGenderChange = (event) => {
 setData({
 ...data,
 gender: event.target.value,
 });
 };

 const Dated = (newDate) => {
 const formattedDate = newDate ? dayjs(newDate).format("YYYY-MM-DD") : null;
 setData({ ...data, dischargeDate: formattedDate });
 };

 const handleTime = (newTime) => {
 const formattedTime = newTime ? dayjs(newTime).format("hh:mm A") : "";
 setData({ ...data, dischargeTime: formattedTime });
 };

 const handleDatedChanged = (newDate) => {
 const formattedDated = newDate ? dayjs(newDate).format("YYYY-MM-DD") : null;
 setData({ ...data, admissionDate: formattedDated });
 };

 return (
    <div style={{ display: "flex", justifyContent: "center", backgroundColor: "#f5f5f5" }}>
      <div style={{ width: "80%", padding: "10px", marginTop: "30px"  }}>
      <Typography variant="h6" gutterBottom style={{   color: "#252B42",
  fontFamily: "Montserrat",
   fontWeight:"bolder", marginTop: "40px", textAlign: "center" }}>To Discharge Patient Please enter the details</Typography>
        <Container maxWidth="lg" style={{ background: "#ffff", borderRadius: "30px", boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.3)" }}>
          <div style={{ padding: "30px" }}>
            <form onSubmit={handleFormSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                 <InputLabel htmlFor="patientName"  sx={{ color: "#252B42" }}>PatientName</InputLabel>
                  <TextField
                    required
                    sx={{
                      transition: "box-shadow 0.3s ease-in-out",
                      "&:hover": {
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                        ".MuiFormLabel-root ": {
                          letterSpacing: "0.2rem",
                          fontSize: "0.8rem",
                          fontFamily: "Montserrat",
                        },
                        "& .MuiOutlinedInput-root": {
                          background: "#f4f4f4",
                        },
                        ".MuiInputLabel-shrink": {
                          letterSpacing: 0,
                        },
                        "& input::placeholder": {
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        },
                        "& input": {
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        },
                        ".MuiInputBase-root": {
                          backgroundColor: "#F9F9F9",
                        },
                      },
                    }}
                    placeholder="Enter Name" 
                    value={data.patientName}
                    onChange={(e) => setData({ ...data, patientName: e.target.value })}
                  />
                </Grid>

                
                <Grid item xs={6} sm={3}>
                 <InputLabel htmlFor="age"  sx={{ color: "#252B42" }}>Age</InputLabel>
                  <TextField
                    required
                    sx={{
                      transition: "box-shadow 0.3s ease-in-out",
                      "&:hover": {
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                        ".MuiFormLabel-root ": {
                          letterSpacing: "0.2rem",
                          fontSize: "0.8rem",
                          fontFamily: "Montserrat",
                        },
                        "& .MuiOutlinedInput-root": {
                          background: "#f4f4f4",
                        },
                        ".MuiInputLabel-shrink": {
                          letterSpacing: 0,
                        },
                        "& input::placeholder": {
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        },
                        "& input": {
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        },
                        ".MuiInputBase-root": {
                          backgroundColor: "#F9F9F9",
                        },
                      },
                    }}
                    placeholder="Enter Age"
                    value={data.age}
                    onChange={(e) =>setData({ ...data, age: e.target.value })
 }
 />

 </Grid>

 <div style={{ display: 'flex', alignItems: 'center', marginTop: '50px' }}>
  <InputLabel sx={{ color: "#252B42",marginRight: '10px',marginLeft: "20px" }} gutterBottom>
    Gender
  </InputLabel>
  <RadioGroup
    name="gender"
    value={data.gender}
    onChange={handleGenderChange}
    row
  >
    <FormControlLabel
      value="Male"
      control={<Radio size="small" />}
      label={<span style={{ color: "#252B42" }}>1.Male</span>}
      sx={{
        ".MuiFormLabel-root ": { letterSpacing: "0.2rem", fontSize: "0.8rem" },
        ".MuiInputLabel-shrink": { letterSpacing: 0 },
        "& input::placeholder": { fontSize: 14, fontFamily: "Montserrat" },
        "& input": { fontSize: 14, fontFamily: "Montserrat" },
        ".MuiInputBase-root": { backgroundColor: "#F9F9F9" },
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": { boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)" },
      }}
    />
    <FormControlLabel
      value="Fe-Male"
      control={<Radio size="small" />}
      label={<span style={{ color: "#252B42" }}>2.Female</span>}
      sx={{
        ".MuiFormLabel-root ": { letterSpacing: "0.2rem", fontSize: "0.8rem" },
        ".MuiInputLabel-shrink": { letterSpacing: 0 },
        "& input::placeholder": { fontSize: 14, fontFamily: "Montserrat" },
        "& input": { fontSize: 14, fontFamily: "Montserrat" },
        ".MuiInputBase-root": { backgroundColor: "#F9F9F9" },
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": { boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)" },
      }}
    />
    <FormControlLabel
      value="Others"
      control={<Radio size="small" />}
      label={<span style={{ color: "#252B42" }}>3.Others</span>}
      sx={{
        ".MuiFormLabel-root ": { letterSpacing: "0.2rem", fontSize: "0.8rem" },
        ".MuiInputLabel-shrink": { letterSpacing: 0 },
        "& input::placeholder": { fontSize: 14, fontFamily: "Montserrat" },
        "& input": { fontSize: 14, fontFamily: "Montserrat" },
        ".MuiInputBase-root": { backgroundColor: "#F9F9F9" },
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": { boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)" },
      }}
    />
  </RadioGroup>
</div>
 <Grid item xs={6} sm={3} >
 <InputLabel htmlFor="dischargeTime"  sx={{ color: "#252B42" }}>DischargeTime</InputLabel>
 <LocalizationProvider dateAdapter={AdapterDayjs}>
 <TimePicker
 required
 sx={{
   transition: "box-shadow 0.3s ease-in-out",
   "&:hover": {
     boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
     ".MuiFormLabel-root ": {
       letterSpacing: "0.2rem",
       fontSize: "0.8rem",
       fontFamily: "Montserrat",
     },
     "& .MuiOutlinedInput-root": {
       background: "#f4f4f4",
     },
     ".MuiInputLabel-shrink": {
       letterSpacing: 0,
     },
     "& input::placeholder": {
       fontSize: 14,
       fontFamily: "Montserrat",
     },
     "& input": {
       fontSize: 14,
       fontFamily: "Montserrat",
     },
     ".MuiInputBase-root": {
       backgroundColor: "#F9F9F9",
     },
   },
 }} 
 placeholder="Discharge Time"
 value={data.dischargeTime}
 onChange={(newTime) => handleTime(newTime)}
 renderInput={(params) => <TextField {...params} />}
 />
 </LocalizationProvider>
 
 </Grid>

 <Grid item xs={6} sm={3}>
 <InputLabel htmlFor="dischargeDate"  sx={{ color: "#252B42" }}>DischargeDate</InputLabel>
 <LocalizationProvider dateAdapter={AdapterDayjs}>
 <DatePicker
 required
 sx={{
   transition: "box-shadow 0.3s ease-in-out",
   "&:hover": {
     boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
     ".MuiFormLabel-root ": {
       letterSpacing: "0.2rem",
       fontSize: "0.8rem",
       fontFamily: "Montserrat",
     },
     "& .MuiOutlinedInput-root": {
       background: "#f4f4f4",
     },
     ".MuiInputLabel-shrink": {
       letterSpacing: 0,
     },
     "& input::placeholder": {
       fontSize: 14,
       fontFamily: "Montserrat",
     },
     "& input": {
       fontSize: 14,
       fontFamily: "Montserrat",
     },
     ".MuiInputBase-root": {
       backgroundColor: "#F9F9F9",
     },
   },
 }}
 placeholder="Discharge Date"
 value={
 data.dischargeDate ? dayjs(data.dischargeDate) : null
 }
 onChange={(newDate) => Dated(newDate)}
 renderInput={(params) => <TextField {...params} />}
 />
 </LocalizationProvider>
 
 </Grid>

 <Grid item xs={6} sm={3} >
 <InputLabel htmlFor="medicalAcuity"  sx={{ color: "#252B42" }}>MedicalAcuity</InputLabel>
 <TextField
                    required
                    sx={{
                      transition: "box-shadow 0.3s ease-in-out",
                      "&:hover": {
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                        ".MuiFormLabel-root ": {
                          letterSpacing: "0.2rem",
                          fontSize: "0.8rem",
                          fontFamily: "Montserrat",
                        },
                        "& .MuiOutlinedInput-root": {
                          background: "#f4f4f4",
                        },
                        ".MuiInputLabel-shrink": {
                          letterSpacing: 0,
                        },
                        "& input::placeholder": {
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        },
                        "& input": {
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        },
                        ".MuiInputBase-root": {
                          backgroundColor: "#F9F9F9",
                        },
                      },
                    }}
                    placeholder="MedicalAcuity" 
                    value={data.medicalAcuity}
                    onChange={(e) => setData({ ...data, medicalAcuity: e.target.value })}
                  />
 </Grid>

 <Grid item xs={6} sm={3}>
 <InputLabel htmlFor="admissionDate"  sx={{ color: "#252B42" }}>AdmissionDate</InputLabel>
 <LocalizationProvider dateAdapter={AdapterDayjs}>
 <DatePicker
 sx={{
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      ".MuiFormLabel-root ": {
        letterSpacing: "0.2rem",
        fontSize: "0.8rem",
        fontFamily: "Montserrat",
      },
      "& .MuiOutlinedInput-root": {
        background: "#f4f4f4",
      },
      ".MuiInputLabel-shrink": {
        letterSpacing: 0,
      },
      "& input::placeholder": {
        fontSize: 14,
        fontFamily: "Montserrat",
      },
      "& input": {
        fontSize: 14,
        fontFamily: "Montserrat",
      },
      ".MuiInputBase-root": {
        backgroundColor: "#F9F9F9",
      },
    },
  }}
 placeholder="Admission Date"
 value={
 data.admissionDate ? dayjs(data.admissionDate) : null
 }
 onChange={(newDate) => handleDatedChanged(newDate)}
 renderInput={(params) => <TextField {...params} />}
/>
 </LocalizationProvider>
 
 </Grid>
 <Grid item xs={12} sm={3}>
 <InputLabel htmlFor="dischargeReasons"  sx={{ color: "#252B42" }}>DischargeReasons</InputLabel>
 <FormControl fullWidth sx={{
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      ".MuiFormLabel-root ": {
        letterSpacing: "0.2rem",
        fontSize: "0.8rem",
        fontFamily: "Montserrat",
      },
      "& .MuiOutlinedInput-root": {
        background: "#f4f4f4",
      },
      ".MuiInputLabel-shrink": {
        letterSpacing: 0,
      },
      "& input::placeholder": {
        fontSize: 14,
        fontFamily: "Montserrat",
      },
      "& input": {
        fontSize: 14,
        fontFamily: "Montserrat",
      },
      ".MuiInputBase-root": {
        backgroundColor: "#F9F9F9",
      },
    },
  }}
  >
  <InputLabel htmlFor="dischargeReasons"  sx={{ color: "#252B42", marginTop:"-3px"}}>Select</InputLabel>
 <Select
 labelId="demo-select-small-label"
 id="demo-select-small"
 value={data.dischargeReasons}
 onChange={(e) =>
 setData({ ...data, dischargeReasons: e.target.value })
 }
 placeholder="Discharge Reason"
 >
 <MenuItem value="">Select Reason</MenuItem>
 <MenuItem value="Patient is ok">Patient is ok</MenuItem>
 <MenuItem value="Patient is not ok">
 Patient is not ok
 </MenuItem>
 <MenuItem value="Patient is fine">
 Patient is fine{" "}
 </MenuItem>
 <MenuItem value="Patient is critical">
 Patient is critical
 </MenuItem>
 <MenuItem value="died">
 died
 </MenuItem>
 </Select>
 </FormControl>
 
 </Grid>
 <Grid item xs={6} sm={3} >
 <InputLabel htmlFor="bedNumber"  sx={{ color: "#252B42" }}>BedNumber</InputLabel>
 <TextField
 sx={{
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      ".MuiFormLabel-root ": {
        letterSpacing: "0.2rem",
        fontSize: "0.8rem",
        fontFamily: "Montserrat",
      },
      "& .MuiOutlinedInput-root": {
        background: "#f4f4f4",
      },
      ".MuiInputLabel-shrink": {
        letterSpacing: 0,
      },
      "& input::placeholder": {
        fontSize: 14,
        fontFamily: "Montserrat",
      },
      "& input": {
        fontSize: 14,
        fontFamily: "Montserrat",
      },
      ".MuiInputBase-root": {
        backgroundColor: "#F9F9F9",
      },
    },
  }}
 placeholder=" BedNumber"
 value={data.bedNumber}
 onChange={(e) =>
 setData({ ...data, bedNumber: e.target.value })
 }
 />
 
 </Grid>
 <Grid item xs={12} sm={3} >
 <InputLabel htmlFor="wardId"  sx={{ color: "#252B42" }}>WardId</InputLabel>
 <FormControl fullWidth sx={{
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      ".MuiFormLabel-root ": {
        letterSpacing: "0.2rem",
        fontSize: "0.8rem",
        fontFamily: "Montserrat",
      },
      "& .MuiOutlinedInput-root": {
        background: "#f4f4f4",
      },
      ".MuiInputLabel-shrink": {
        letterSpacing: 0,
      },
      "& input::placeholder": {
        fontSize: 14,
        fontFamily: "Montserrat",
      },
      "& input": {
        fontSize: 14,
        fontFamily: "Montserrat",
      },
      ".MuiInputBase-root": {
        backgroundColor: "#F9F9F9",
      },
    },
  }}
>
 <InputLabel htmlFor="wardId"  sx={{ color: "#252B42", marginTop:"-5px" }}>Select</InputLabel>
 <Select
 value={data.wardId}
 onChange={(e) =>
 setData({ ...data, wardId: e.target.value })
 }
 placeholder="Wards"
 >
 <MenuItem value="Ward A1">Ward A1</MenuItem>
 <MenuItem value="Ward B1">Ward B1</MenuItem>
 <MenuItem value="Ward C1">Ward C1</MenuItem>
 <MenuItem value="Ward D1">Ward D1</MenuItem>
 <MenuItem value="Ward E1">Ward E1</MenuItem>
 </Select>
 </FormControl>
 </Grid>
 <Grid item xs={6} sm={3} >
 <InputLabel htmlFor="patientId"  sx={{ color: "#252B42" }}>PatientId</InputLabel>
 <TextField
 sx={{
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      ".MuiFormLabel-root ": {
        letterSpacing: "0.2rem",
        fontSize: "0.8rem",
        fontFamily: "Montserrat",
      },
      "& .MuiOutlinedInput-root": {
        background: "#f4f4f4",
      },
      ".MuiInputLabel-shrink": {
        letterSpacing: 0,
      },
      "& input::placeholder": {
        fontSize: 14,
        fontFamily: "Montserrat",
      },
      "& input": {
        fontSize: 14,
        fontFamily: "Montserrat",
      },
      ".MuiInputBase-root": {
        backgroundColor: "#F9F9F9",
      },
    },
  }}
 placeholder="PatientId"
 value={data.patientId}
 onChange={(e) =>
 setData({ ...data, patientId: e.target.value })
 }
 />
 
 </Grid>
 <Grid item xs={10}>
 <Button
 type="submit"
 variant="contained"
 color="primary"
 size="large"
 style={{
 marginLeft: "690px",
 marginTop: "10px",
 borderRadius: "30px",
 padding: "15px 30px",
 fontSize: "18px",
 lineHeight: "1.5",
 boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
 }}
 >
 Discharge
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
export default DischargePatient;
