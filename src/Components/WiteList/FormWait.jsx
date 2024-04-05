import React, { useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";

const BedManagement = () => {
  const [formData, setFormData] = useState({
    wardName: "",
    wardId: "",
    wardType: "",
    bedNumber: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddBeds = async () => {
    if (formData.bedNumber <= 0) {
      setErrorMessage("Number of beds must be a positive value");
      return;
    }

    try {
      const response = await axios.post("http://localhost:9000/addbeds", formData);
      console.log(response.data);
      setErrorMessage("Success");
      handleCloseDialog();
      setMessageDialogOpen(true); // Open message dialog on success
    } catch (error) {
      console.error("Error adding beds:", error);
      setErrorMessage("Error adding beds. Please try again.");
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Clear the form data and error message when closing the dialog
    setFormData({
      wardName: "",
      wardId: "",
      wardType: "",
      bedNumber: 0,
    });
    setErrorMessage("");
  };

  const handleMessageDialogClose = () => {
    setMessageDialogOpen(false);
  };

  // Common style for text fields
  const textFieldStyle = {
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
    color: "#252B42", // Add color for all text fields
  };
 // Common style for headings
 const headingStyle = {
  ...textFieldStyle,
  fontSize: "1.5rem", marginTop: "20px",
     maxHeight: "100%",
     color: "#252B42",
  fontFamily: "Montserrat",
  fontWeight: "bold",
};
  // Common style for headings
  // const headingStyle = {
  //   fontSize: 20,
  //       fontFamily: "Montserrat",
  //       color: "#252B42",
  //   fontWeight: "bold",
  //   marginTop: "20px",
  //   maxHeight: "100%",
  //   width: "100%",
  //   // Apply same font family to headings
  // };
const buttonStyle={
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
  color: "#252B42", // Add color for all text fields
};
  return (
    <div style={{ display: "flex", backgroundColor: "#ffff" }}>
      <div style={{ width: "100%", padding: "10px", marginLeft: "50px", marginTop: "50px" }}>
        <Typography variant="h5" gutterBottom style={headingStyle}>
          To Enter Configuration Screen, Please enter the details
        </Typography>
        <Button variant="outlined" color="primary"  onClick={handleOpenDialog} style={{ margin: "10px", marginLeft: "500px" , ...buttonStyle }}>
          ADD BED AND WARD STATUS
        </Button>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>Configuration Screen</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              sx={{
                marginTop: "15px",
              }}
            >
              <Box sx={{ marginBottom: "15px" }}>
                <InputLabel htmlFor="wardName" sx={textFieldStyle}>Ward Name</InputLabel>
                <TextField
                  required
                  fullWidth
                  id="wardName"
                  name="wardName"
                  placeholder="Enter ward name"
                  value={formData.wardName}
                  onChange={handleChange}
                  sx={textFieldStyle}
                />
              </Box>

              <Box sx={{ marginBottom: "15px" }}>
                <InputLabel htmlFor="wardId" sx={textFieldStyle}>Ward ID</InputLabel>
                <TextField
                  required
                  fullWidth
                  id="wardId"
                  name="wardId"
                  placeholder="Enter ward ID"
                  value={formData.wardId}
                  onChange={handleChange}
                  sx={textFieldStyle}
                />
              </Box>

              <Box sx={{ marginBottom: "15px" }}>
                <InputLabel htmlFor="wardType" sx={textFieldStyle}>Ward Type</InputLabel>
                <TextField
                  required
                  fullWidth
                  id="wardType"
                  name="wardType"
                  placeholder="Enter ward type"
                  value={formData.wardType}
                  onChange={handleChange}
                  sx={textFieldStyle}
                />
              </Box>

              <Box sx={{ marginBottom: "15px" }}>
                <InputLabel htmlFor="bedNumber" sx={textFieldStyle}>Number of Beds</InputLabel>
                <TextField
                  required
                  fullWidth
                  id="bedNumber"
                  name="bedNumber"
                  type="number"
                  placeholder="Enter number of beds"
                  value={formData.bedNumber}
                  onChange={handleChange}
                  sx={textFieldStyle}
                />
              </Box>

              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <br />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddBeds} color="primary">
              Add Beds
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={messageDialogOpen} onClose={handleMessageDialogClose}>
          <DialogTitle>Success</DialogTitle>
          <DialogContent>
            <Typography variant="body1">Beds added successfully!</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleMessageDialogClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default BedManagement;
