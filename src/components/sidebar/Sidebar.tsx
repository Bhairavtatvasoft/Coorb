import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Home, Info } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const getListItemTextColor = (path:string) => {  
    return location.pathname === path ? "rgb(253, 196, 3)" : "white";
  };
  return (
    <Drawer
      anchor={i18n.language === "ar" ? "right" : "left"}
      variant="permanent"
      sx={{
        position: "fixed", // Sidebar should be fixed like the AppBar
        width: isOpen ? 240 : 64,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isOpen ? 240 : 64,
          transition: "width 0.3s ease",
          top: "64px",
          backgroundColor: "rgb(36, 75, 98)",
        },
      }}
    >
      <List>
        <ListItem component={Link} to="/">
          <ListItemIcon>
            <Home sx={{ color: "white" }} />
          </ListItemIcon>
          {isOpen && (
            <ListItemText
              sx={{ color: getListItemTextColor("/") }}
              primary={t("WORKFLOW")}
            />
          )}
        </ListItem>
        <ListItem component={Link} to="/workflow-form">
          <ListItemIcon>
            <Info sx={{ color: "white" }} />
          </ListItemIcon>
          {isOpen && (
            <ListItemText
              sx={{ color: getListItemTextColor("/workflow-form") }}
              primary={t("WORKFLOW_FORM")}
            />
          )}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
