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
  Tooltip,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./Header.css";
import TranslateIcon from "@mui/icons-material/Translate";
import MenuIcon from "@mui/icons-material/Menu";
const Header = ({ onSidebarToggle }: any) => {
  // State for language dropdown
  const [language, setLanguage] = useState("en");
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { i18n, t } = useTranslation();
  const user = {
    name: "John Doe",
    avatar: "./user.jpg",
  };

  const handleLanguageChange = (event: string) => {
    setLanguage(event);
    i18n.changeLanguage(event);
    document.body.dir = event === "ar" ? "rtl" : "ltr";
    handleLanguageMenuClose();
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
  };
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar className="headerAppBar">
        <Box className="headerBox">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onSidebarToggle}
          >
            <MenuIcon />
          </IconButton>
          <img src="./logo3.png" alt="Logo" className="headerLogo" />
        </Box>
        <Box className="headerBox">
          <Tooltip title={t("selectLanguage")}>
            <IconButton
              onClick={handleLanguageMenuClick}
              className="headerLanguageSelect"
            >
              <TranslateIcon className="headerLanguageIcon" />
              <Typography className="headerLanguageText" variant="body2">
                {language === "en" ? "EN" : "AR"}
              </Typography>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={languageAnchorEl}
            open={!!languageAnchorEl}
            onClose={handleLanguageMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={() => handleLanguageChange("en")}>
              {t("english")}
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange("ar")}>
              {t("arabic")}
            </MenuItem>
          </Menu>
          <Typography variant="body1" className="headerUserInfo">
            {user.name}
          </Typography>
          <IconButton onClick={handleMenuClick}>
            <Avatar alt={user.name} src={user.avatar} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open && false}
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
