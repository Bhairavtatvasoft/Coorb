import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./Header.css";
const Header = () => {
  // State for language dropdown
  const [language, setLanguage] = useState("en");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { i18n } = useTranslation();
  // Dummy user data
  const user = {
    name: "John Doe",
    avatar: "./user.jpg",
  };

  // Handle language change
  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value as string);
    i18n.changeLanguage(event.target.value);
    document.body.dir = event.target.value === "ar" ? "rtl" : "ltr";
  };
  // Handle user menu click
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle user menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar className="appbar">
        <Box>
          <img src="./logo2.png" alt="Logo" style={{ marginRight: "1rem" }} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FormControl
            variant="outlined"
            size="small"
            className="language-select"
            sx={{marginInlineEnd:'2rem'}}
          >
            <InputLabel>Language</InputLabel>
            <Select
              value={language}
              onChange={handleLanguageChange}
              label="Language"
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ar">Arabic</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="body1" className="user-info">
            {user.name}
          </Typography>
          <IconButton onClick={handleMenuClick}>
            <Avatar alt={user.name} src={user.avatar} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
