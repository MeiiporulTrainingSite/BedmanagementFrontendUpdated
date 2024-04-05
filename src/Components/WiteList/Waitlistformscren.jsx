import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { RadioGroup, Radio } from "@mui/material";
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
  wardId: "",
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
  const [data, setData] = useState(initialFormData);

  useEffect(() => {
    // Your useEffect logic for fetching available beds and wards
  }, []);

  const queryParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  useEffect(() => {
    setData({
      patientName: queryParams.get("patientName") || "",
      age: queryParams.get("age") || "",
      gender: queryParams.get("gender") || "",
      contactno: queryParams.get("contactno") || "",
      wardName: queryParams.get("wardName") || "",
      wardId: queryParams.get("wardId") || "",
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
      const selectedDate = dayjs(data.admissionDate, 'DD-MM-YYYY');
  
      if (!selectedDate.isValid() || selectedDate.isBefore(currentDate, 'day')) {
        toast.error("Please select a valid current or future date for admission.");
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
  
      const response = await axios.post("http://localhost:9000/waitingentry1", formData);
  
      if (response.data && response.data.error) {
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
    const formattedDate = newDate ? dayjs(newDate).format("DD-MM-YYYY") : null;
    setData({ ...data, admissionDate: formattedDate });
  };

  // Conditional rendering to prevent rendering when data is undefined
  if (!data) {
    return null;
  }

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
 <Typography variant="h6" gutterBottom style={{   color: "#252B42",
  fontFamily: "Montserrat",
   fontWeight:"bolder", marginTop: "40px", textAlign: "center" }}>
 To Admit the Patient from Waiting List, Please enter the details
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
 <InputLabel htmlFor="patientName"  sx={{ color: "#252B42" }}>PatientName</InputLabel>
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
 placeholder="Enter Name"                     
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
 <InputLabel htmlFor="age"  sx={{ color: "#252B42" }}>Age</InputLabel>
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
 placeholder="Enter Age"
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
 <InputLabel htmlFor="contactno"  sx={{ color: "#252B42" }}>Contactno</InputLabel>
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
                    placeholder="Enter Contactno"
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
      value="Female"
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


  <Grid item xs={3} sm={3}>
                <div>
                  <InputLabel htmlFor="admissionDate" sx={{ color: "#252B42" }}>
                    Admission Date
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      placeholder="Admission Date"
                      slotProps={{ textField: { size: "small" } }}
                      value={data.admissionDate ? dayjs(data.admissionDate) : null}
                      onChange={(newDate) => handleDatedChanged(newDate)}
                      minDate={dayjs()}
                      renderInput={(params) => (
                        <TextField
                          {...params}
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
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </Grid>

{/* New Grid item for admission time */}
 <Grid item xs={3} sm={3}>
 <div
 
 >
 <InputLabel htmlFor="admissionTime"  sx={{ color: "#252B42" }}>AdmissionTime</InputLabel>
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
 placeholder="Admission Time"
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
 <InputLabel htmlFor="medicalAcuity"  sx={{ color: "#252B42" }}>MedicalAcuity</InputLabel>
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
 <InputLabel htmlFor="medicalAcuity"  sx={{ color: "#252B42", marginTop:"-5px" }}>Select</InputLabel>
 <Select
 value={data.medicalAcuity}
 onChange={(e) =>
 setData({ ...data, medicalAcuity: e.target.value })
 }
 placeholder="Medical"
 >
 <MenuItem value="Critical">Critical</MenuItem>
 <MenuItem value="Moderate">Moderate</MenuItem>
 <MenuItem value="Stable">Stable</MenuItem>
 </Select>
 </FormControl>

 </div>
 </Grid>

 <Grid item xs={3}>
 <div
 
 >
 <InputLabel htmlFor="priority"  sx={{ color: "#252B42" }}>Priority</InputLabel>
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
 placeholder="Priority"
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
 <InputLabel htmlFor="admittingDoctors"  sx={{ color: "#252B42" }}>AdmittingDoctors</InputLabel>
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
 <InputLabel htmlFor="admittingDoctors"  sx={{ color: "#252B42", marginTop:"-5px" }}>Select</InputLabel>
 <Select
 value={data.admittingDoctors}
 onChange={(e) =>
 setData({ ...data, admittingDoctors: e.target.value })
 }
 placeholder="admittingDoctors"
 >
 <MenuItem value="Dr.John">Dr.John</MenuItem>
 <MenuItem value="Dr.Ajay">Dr.Ajay</MenuItem>
 <MenuItem value="Dr.Mithu">Dr.Mithu</MenuItem>
 </Select>
 </FormControl>
</div>
 </Grid>

 <Grid item xs={3}>
 <div
 
 >
 <InputLabel htmlFor="admittingNurse"  sx={{ color: "#252B42" }}>AdmittingNurse</InputLabel>
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
 <InputLabel htmlFor="admittingNurse"  sx={{ color: "#252B42", marginTop:"-5px" }}>Select</InputLabel>
 <Select
 value={data.admittingNurse}
 onChange={(e) =>
 setData({ ...data, admittingNurse: e.target.value })
 }
 placeholder="admittingNurse"
 >
 <MenuItem value="Nr.Smithi">Nr.Smithi</MenuItem>
 <MenuItem value="Nr.Jeny">Nr.Jeny</MenuItem>
 <MenuItem value="Nr.Lily">Nr.Lily</MenuItem>
 </Select>
 </FormControl>
 </div>
 </Grid>

 {/* New Grid item for task input */}
 {/* <Grid item xs={3}>
 <div
 
 >
 <InputLabel htmlFor="task"  sx={{ color: "#252B42" }}>Task</InputLabel>
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
 placeholder="Task"
 fullWidth
 variant="outlined"
 value={data.task}
 onChange={(e) => setData({ ...data, task: e.target.value })}
 />
 </div>
 </Grid> */}

 <Grid item xs={3}>
 <div
 
 >
 <InputLabel htmlFor="abhaNo"  sx={{ color: "#252B42" }}>ABHA NO</InputLabel>
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
 placeholder="Abha No"
 fullWidth
 variant="outlined"
 value={data.abhaNo}
 onChange={(e) => setData({ ...data, abhaNo: e.target.value })}
 />
 </div>
 </Grid>

 {/* New Grid item for address details */}

 <Grid item xs={3} sm={3} >
 <InputLabel htmlFor="wardName"  sx={{ color: "#252B42" }}>WardName</InputLabel>
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
 <InputLabel htmlFor="wardName"  sx={{ color: "#252B42", marginTop:"-5px" }}>Select</InputLabel>
 <Select
 value={data.wardName}
 onChange={(e) =>
 setData({ ...data, wardName: e.target.value })
 }
 placeholder="wardName"
 >
 <MenuItem value="Ward A">Ward A</MenuItem>
 <MenuItem value="Ward B">Ward B</MenuItem>
 <MenuItem value="Ward C">Ward C</MenuItem>
 <MenuItem value="Ward D">Ward D</MenuItem>
 </Select>
 </FormControl>
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
 placeholder="wardId"
 >
 <MenuItem value="Ward A1">Ward A1</MenuItem>
 <MenuItem value="Ward B1">Ward B1</MenuItem>
 <MenuItem value="Ward C1">Ward C1</MenuItem>
 <MenuItem value="Ward D1">Ward D1</MenuItem>
 <MenuItem value="Ward E1">Ward E1</MenuItem>
 </Select>
 </FormControl>
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
 <InputLabel htmlFor="patientName"  sx={{ color: "#252B42" }}>PatientName</InputLabel>
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


 <Grid item xs={3}>
 <div>
  {/* <Typography variant="h6" gutterBottom style={{ marginLeft: '-80px' }}>
    Address
  </Typography> */}
  <InputLabel htmlFor="doorno" sx={{ color: "#252B42"}}>DoorNo</InputLabel>
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
 placeholder="Door No"
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
 <InputLabel htmlFor="streetname"  sx={{ color: "#252B42" }}>StreetName</InputLabel>
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
 placeholder="Street Name"
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
 <InputLabel htmlFor="district"  sx={{ color: "#252B42" }}>District</InputLabel>
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
 placeholder="District"
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
 <InputLabel htmlFor="state"  sx={{ color: "#252B42" }}>State</InputLabel>
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
 placeholder="State"
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
 <InputLabel htmlFor="country"  sx={{ color: "#252B42" }}>Country</InputLabel>
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
 placeholder="Country"
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
 <InputLabel htmlFor="pincode"  sx={{ color: "#252B42" }}>Pincode</InputLabel>
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
 placeholder="Pincode"
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
 <InputLabel htmlFor="taskType"  sx={{ color: "#252B42" }}>TaskType</InputLabel>
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
 placeholder="Task Type"
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
 <InputLabel htmlFor="description"  sx={{ color: "#252B42" }}>Description</InputLabel>
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
 placeholder="Task Description"
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
