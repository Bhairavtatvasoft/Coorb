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
import "./Sidebar.css";
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen,setIsOpen }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const isPathSelected = (path: string) => {
    return location.pathname === path;
  };
  return (
    <>
      {isOpen && <div onClick={()=>{setIsOpen(false)}} className="sidebarOverlay" />}
      <Drawer
        anchor={i18n.language === "ar" ? "right" : "left"}
        variant="permanent"
        className={`drawer ${isOpen ? "drawerOpen" : "drawerClosed"}`}
      >
        <List>
          <ListItem component={Link} to="/">
            <ListItemIcon>
              <Home
                className={
                  isPathSelected("/")
                    ? "sidebarListItemIconSelected"
                    : "sidebarListItemIcon"
                }
              />
            </ListItemIcon>
            {isOpen && (
              <ListItemText
                primaryTypographyProps={{
                  className: isPathSelected("/")
                    ? "sidebarListItemTextSelected"
                    : "sidebarListItemText",
                }}
                primary={t("WORKFLOW")}
              />
            )}
          </ListItem>
          <ListItem component={Link} to="/workflow-form">
            <ListItemIcon>
              <Info
                className={
                  isPathSelected("/workflow-form")
                    ? "sidebarListItemIconSelected"
                    : "sidebarListItemIcon"
                }
              />
            </ListItemIcon>
            {isOpen && (
              <ListItemText
                primaryTypographyProps={{
                  className: isPathSelected("/workflow-form")
                    ? "sidebarListItemTextSelected"
                    : "sidebarListItemText",
                }}
                primary={t("WORKFLOW_FORM")}
              />
            )}
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
