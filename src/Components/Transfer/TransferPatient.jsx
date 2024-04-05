


import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import PersonIcon from "@mui/icons-material/Person";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const initialFormData = {
  patientName: "",
  age: "",
  gender: "",
  patientId: "",
  currentWardId: "",
  currentBedNumber: "",
  transferWardId: "",
  transferBedNumber: "",
  medicalAcuity: "",
  transferReasons: ""
};

const TransferPatient = () => {
  const location = useLocation();
  const [wardOptions, setWardOptions] = useState([]);

  useEffect(() => {
    // Fetch ward options from the API
    axios
      .get("http://localhost:9000/bedGet")
      .then((response) => {
        if (Array.isArray(response.data)) {
          // Flatten the nested structure and extract ward names
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

  const queryParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const [data, setData] = useState(initialFormData);


  

  useEffect(() => {
    if (queryParams.has("bedNumber")) {
      setData({
        patientName: queryParams.get("patientName") || "",
        age: queryParams.get("age") === "undefined" ? "" : queryParams.get("age") || "",
        gender: queryParams.get("gender") === "undefined" ? "" : queryParams.get("gender") || "",
        patientId: queryParams.get("patientId") === "undefined" ? "" : queryParams.get("patientId") || "",
        currentWardId: queryParams.get("currentWardId") === "undefined" ? "" : queryParams.get("currentWardId") || "",
        currentBedNumber: queryParams.get("bedNumber") || "",
        transferWardId: "",
        transferBedNumber: "",
        medicalAcuity: queryParams.get("medicalAcuity") === "undefined" ? "" : queryParams.get("medicalAcuity") || "",
        transferReasons: "",
      });
    }
  }, [queryParams]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (!isFormValid()) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    try {
      // Log the data being sent to the server
      console.log("Request Payload:", data);
  
      const response = await axios.post(
        "http://localhost:9000/tpsss",
        data
      );
  
      if (response.data.success) {
        // Reset the form and show a success message
        setData(initialFormData);
        toast.success(response.data.message);
      } else {
        // Display the error message from the server
        toast.success(response.data.message);
      }
    } catch (error) {
      // Handle network or other errors
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
    const formattedDated = newDate ? dayjs(newDate).format("YYYY-MM-DD") : null;
    setData({ ...data, admissionDate: formattedDated });
  };

  const isFormValid = () => {
    // Add validation logic here
    return data.patientName !== "" && data.age !== "" && data.gender !== "" && data.patientId !== "" && data.currentWardId !== "" && data.currentBedNumber !== "";
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", backgroundColor: "#f5f5f5" }}>
      <div style={{ width: "80%", padding: "10px" }}>
        <Typography variant="h6" gutterBottom style={{ color: "Black", fontWeight: "bold", marginTop: "70px",  fontFamily: "Montserrat",
 textAlign: "center" }}>To Transfer patient,please enter the details</Typography>
        <Container maxWidth="lg" style={{ background: "#ffff", borderRadius: "30px", boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.3)" }}>
          <div style={{ padding: "30px" }}>
            <form onSubmit={handleFormSubmit}>
              <Grid container spacing={6}>
                <Grid item xs={6} sm={4.2}>
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
                <Grid item xs={6} sm={4.3}>
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
                    variant="outlined"
                    type="number"
                    value={data.age}
                    onChange={(e) => setData({ ...data, age: e.target.value })}
                    placeholder="Enter age"
                  />
                </Grid>
              
 </Grid>
 <br></br>
 <Grid container spacing={6}>
  <Grid item xs={6.2} sm={4.3}>
    <InputLabel htmlFor="currentbednumber" sx={{ color: "#252B42" }}>Current Bed Number</InputLabel>
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
      placeholder="Enter currentbedno"
      value={data.currentBedNumber}
      onChange={(e) => setData({ ...data, currentBedNumber: e.target.value })}
      style={{ marginBottom: '30px' }} // Adding marginBottom here
    />
  </Grid>
  <Grid item xs={4.7} sm={5.1}>
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
      <InputLabel sx={{ color: "#252B42", marginTop:"10px",marginBottom: '9px' }}>Gender: </InputLabel>
      <RadioGroup
        name="gender"
        value={data.gender}
        onChange={handleGenderChange}
        row
      >
        <FormControlLabel
          value="1"
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
          value="2"
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
          value="3"
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
  </Grid>

  </Grid>
  <Grid container spacing={6}>

  <Grid item xs={6} sm={4.1}>
  <InputLabel htmlFor="patientId" sx={{ color: "#252B42" ,marginLeft:"10px"}}>PatientID</InputLabel>

    <TextField
      require
      sx={{
       marginLeft:"-20px",
        width:"70%",
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
      
      placeholder="Enter patient ID"
      value={data.patientId}
      onChange={(e) => setData({ ...data, patientId: e.target.value })}
      style={{ marginBottom: '30px' ,marginLeft:"10px"}} // Adding marginBottom here
      
    />
    
  </Grid>
  <Grid item xs={6.2} sm={3.8}>
<InputLabel
      htmlFor="medicalAcuity"
      style={{
        color: "#252B42",
      }}
    >
      Medical Acuity
    </InputLabel>
  <FormControl
    fullWidth
    sx={{
      width: "80%", // Adjust the width as needed
      transition: "box-shadow 0.3s ease-in-out",
      "&:hover": {
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        "& .MuiOutlinedInput-root": {
          background: "#f4f4f4",
        },
        "& .MuiInputLabel-shrink": {
          letterSpacing: 0,
        },
        "& input::placeholder": {
          fontSize: 14,
          fontFamily: "Montserrat",
        },
        "& input": {
          fontSize: 14,
          fontFamily: "Montserrat",
          paddingTop: "12px", // Adjust vertical padding to center text
        },
        "& .MuiInputBase-root": {
          backgroundColor: "#F9F9F9",
        },
      },
    }}
  >
    <InputLabel
      htmlFor="medicalAcuity"
      style={{
        color: "#252B42",
        marginBottom: "-60px" // Adjust spacing between label and select box
      }}
    >
     select
    </InputLabel>
    <Select
      value={data.medicalAcuity}
      onChange={(e) => setData({ ...data, medicalAcuity: e.target.value })}
      variant="outlined"
      placeholder="Select medical acuity"
      sx={{
        fontSize: 14,
        fontFamily: "Montserrat",
        color: "#252B42",
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
      }}  // Placeholder text
    >
      <MenuItem value="Critical">Critical</MenuItem>
      <MenuItem value="Moderate">Moderate</MenuItem>
      <MenuItem value="Stable">Stable</MenuItem>
    </Select>
  </FormControl>
</Grid>

</Grid>
<Grid container spacing={5}>


  {/* Transfer Ward Input */}
  <Grid item xs={6} sm={3.7}>
 
 < InputLabel
      htmlFor="transferWardId"
      style={{
        color: "#252B42"
      }}
    >
      TransferWardId
    </InputLabel> <FormControl
    
    sx={{
      width: "80%", // Adjust the width as needed
      transition: "box-shadow 0.3s ease-in-out",
      //marginLeft:"-30px",
      "&:hover": {
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        "& .MuiOutlinedInput-root": {
          background: "#f4f4f4",
        },
        "& .MuiInputLabel-shrink": {
          letterSpacing: 0,
        },
        "& input::placeholder": {
          fontSize: 14,
          fontFamily: "Montserrat",
        },
        "& input": {
          fontSize: 14,
          fontFamily: "Montserrat",
          paddingTop: "12px", // Adjust vertical padding to center text
        },
        "& .MuiInputBase-root": {
          backgroundColor: "#F9F9F9",
        },
      },
    }}
  >
    <InputLabel
      htmlFor="transferWardId"
      style={{
        color: "#252B42",
        marginBottom: "8px" // Adjust spacing between label and select box
      }}
    >
select    </InputLabel>
    <Select
      value={data.transferWardId}
      onChange={(e) => setData({ ...data, transferWardId: e.target.value })}
      variant="outlined"
      placeholder="Select "
      sx={{
        fontSize: 14,
        fontFamily: "Montserrat",
        color: "#252B42",
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
      }}
    >
    
        
        <MenuItem value="Ward A1">Ward A1</MenuItem>
        <MenuItem value="Ward B1">Ward B1</MenuItem>
        <MenuItem value="Ward C1">Ward C1</MenuItem>
        <MenuItem value="Ward D1">Ward D1</MenuItem>
        <MenuItem value="Ward E1">Ward E1</MenuItem>
      </Select>
    </FormControl>
  </Grid>
  <Grid item xs={6} sm={3.5}>
 
 < InputLabel
      htmlFor="CurrentWard"
      style={{
        color: "#252B42",marginLeft:"34px"
      }}
    >
      CurrentWardId
    </InputLabel> <FormControl
    
    sx={{
      width: "90%", // Adjust the width as needed,
      marginLeft:"40px",

      transition: "box-shadow 0.3s ease-in-out",
      "&:hover": {
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        "& .MuiOutlinedInput-root": {
          background: "#f4f4f4",
        },
        "& .MuiInputLabel-shrink": {
          letterSpacing: 0,
        },
        "& input::placeholder": {
          fontSize: 14,
          fontFamily: "Montserrat",
        },
        "& input": {
          fontSize: 14,
          fontFamily: "Montserrat",
          paddingTop: "12px", // Adjust vertical padding to center text
        },
        "& .MuiInputBase-root": {
          backgroundColor: "#F9F9F9",
        },
      },
    }}
  >
    <InputLabel
      htmlFor="currentWard"
      style={{
        color: "#252B42",
       // marginBottom: "8px" // Adjust spacing between label and select box
      }}
    >
select    </InputLabel>
    <Select
      value={data.currentWardId}
      onChange={(e) => setData({ ...data, currentWardId: e.target.value })}
      variant="outlined"
      placeholder="Select "
      sx={{
        fontSize: 14,
        fontFamily: "Montserrat",
        color: "#252B42",
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
      }}
    >
    
        
        <MenuItem value="Ward A1">Ward A1</MenuItem>
        <MenuItem value="Ward B1">Ward B1</MenuItem>
        <MenuItem value="Ward C1">Ward C1</MenuItem>
        <MenuItem value="Ward D1">Ward D1</MenuItem>
        <MenuItem value="Ward E1">Ward E1</MenuItem>
      </Select>
    </FormControl>
  </Grid>
  
</Grid>
 {/* <Grid item xs={6} sm={3}>
 <div
 style={{
 background: "#f0f0f0",
 padding: "10px",
 borderRadius: "10px",
 boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
 }}
 >
 <LocalizationProvider dateAdapter={AdapterDayjs}>
 <DatePicker
 label="Admission Date"
 slotProps={{ textField: { size: "small" } }}
 value={
 data.admissionDate ? dayjs(data.admissionDate) : null
 }
 onChange={(newDate) => handleDatedChanged(newDate)}
 renderInput={(params) => <TextField {...params} />}
 />
 </LocalizationProvider>
 </div>
 </Grid> */}
 


 <Grid container spacing={6}>
 <Grid item xs={6.1} sm={4.1}>
                <InputLabel htmlFor="TransferBednumber"  sx={{ color: "#252B42",marginTop:"20px"}}
 >TransferBednumber</InputLabel>

                  <TextField
                    required
                    sx={{
                      width:"75%",
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
                    placeholder="Enter transfer bed No."
      value={data.transferBedNumber}
      onChange={(e) => setData({ ...data, transferBedNumber: e.target.value })}      
                  />
                </Grid>
  {/* Transfer Bed Number Input */}
  <Grid item xs={6} sm={4.2}>
  < InputLabel
      htmlFor="transferReasons"
      style={{
        color: "#252B42", marginTop: "20px", 
      }}
    >
TransferReasons    </InputLabel>
  <FormControl
    fullWidth
    sx={{
      width: "80%", // Adjust the width as needed
marginTop: "20px", // Adjust the top margin
      transition: "box-shadow 0.3s ease-in-out",
      "&:hover": {
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        "& .MuiOutlinedInput-root": {
          background: "#f4f4f4",
        },
        "& .MuiInputLabel-shrink": {
          letterSpacing: 0,
        },
        "& input::placeholder": {
          fontSize: 14,
          fontFamily: "Montserrat",
        },
        "& input": {
          fontSize: 14,
          fontFamily: "Montserrat",
          paddingTop: "12px", // Adjust vertical padding to center text
        },
        "& .MuiInputBase-root": {
          backgroundColor: "#F9F9F9",
        },
      },
    }}
  >
    <InputLabel
      htmlFor="transferReasons"
      style={{
        color: "#252B42",         marginTop: "-20px", 

      }}
    >
select    </InputLabel>
    <Select
      value={data.transferReasons}
      onChange={(e) => setData({ ...data, transferReasons: e.target.value })}
      variant="outlined"
      placeholder="Select transfer reasons"
      sx={{
        fontSize: 14,
        marginTop: "-20px", 
        fontFamily: "Montserrat",
        color: "#252B42",
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
      }}
    >
      <MenuItem value="Emergency">Emergency</MenuItem>
      <MenuItem value="Medical treatment">Medical Treatment</MenuItem>
      <MenuItem value="Specialist consultation">Specialist Consultation</MenuItem>
      {/* Add more transfer reasons as needed */}
    </Select>
  </FormControl>
</Grid>
</Grid>
 
 <Grid item xs={12} sx={{
 ".MuiFormLabel-root ": { letterSpacing: "0.2rem", fontSize: "0.8rem" },
 ".MuiInputLabel-shrink": { letterSpacing: 0 },
 "& input::placeholder": { fontSize: 14, fontFamily: "Montserrat", color: "#737373" },
 "& input": { fontSize: 14, fontFamily: "Montserrat", color: "#252B42" },
 ".MuiInputBase-root": { backgroundColor: "#F9F9F9", color: "#252B42" },
 transition: "box-shadow 0.3s ease-in-out",
 "&:hover": {
 boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.2)",
 
 },
 // background: "#f0f0f0",
 // padding: "10px",
 // borderRadius: "10px",
 // boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
 }}>
 <Button
 type="submit"
 variant="contained"
 color="primary"
 size="large"
 style={{
 marginLeft: "650px",
 marginTop: "5px",
 borderRadius: "30px",
 padding: "15px 30px",
 fontSize: "18px",
 lineHeight: "1.5",
 boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
 }}
 >
 Transfer Patient
 </Button>
 </Grid>
 </form>
 </div>
 </Container>
 </div>
 </div>
 );
};

export default TransferPatient;
