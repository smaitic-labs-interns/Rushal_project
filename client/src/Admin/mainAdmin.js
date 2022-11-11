import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { Avatar, Button, Container } from "@mui/material";
import { Addproduct } from "./component/Addproduct";
import { Updateproduct } from "./component/Updateproduct";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function MainAdmin() {
  const [value, setValue] = React.useState(0);

  const selectedStyle = {
    border: "solid #fff 2px",
    borderRadius: "16px",
    backgroundColor: "#fff",
    color: "#1367af",
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { firstName, lastName, email, contact, role } = useSelector(
    (state) => state.user
  );
  return (
    
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        height: 800,
        backgroundColor: "#ccc",
      }}
    >
     
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          backgroundColor: "#aaa",
          padding: "3rem 1rem",
        }}
      >
        
        <Tab
          label="All Users"
          {...a11yProps(0)}
          sx={value === 0 ? selectedStyle : null}
        />
        <Tab
          label="Add Prodcut"
          {...a11yProps(1)}
          sx={value === 1 ? selectedStyle : null}
        />
        <Tab
          label="update Product"
          {...a11yProps(2)}
          sx={value === 2 ? selectedStyle : null}
        />
        <Tab
          label="Remove Product"
          {...a11yProps(3)}
          sx={value === 3 ? selectedStyle : null}
        />
         <Button href = '/' varaint= 'contained'>DashBoard</Button>
      </Tabs>
      <TabPanel value={value} index={0}>
      <>
        <Container sx={{ maxWidth: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "0 20px",
            }}
          >
           <p><h1>Only Admins</h1></p>
            <table border={1}>
              <thead>
                <tr>
                  <Avatar></Avatar>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email Address</th>
                  <th> Contact </th>
                </tr>
              </thead>
              <tbody>
                <td>{role}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>{contact}</td>
              </tbody>
            </table>
          </Box>
        </Container>
        </>
      </TabPanel>

      <TabPanel value={value} index={1}>
            <Addproduct/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Updateproduct />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Button variant="contained">Remove Product</Button>
      </TabPanel>
    </Box>
  
  );
}
