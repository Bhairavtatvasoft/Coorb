import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Home } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Sidebar.scss";
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const isPathSelected = (path: string) => {
    return location.pathname === path;
  };
  return (
    <>
      {isOpen && (
        <div
          onClick={() => {
            setIsOpen(false);
          }}
          className="sidebarOverlay"
        />
      )}
      <Drawer
        variant="permanent"
        className={`drawer ${isOpen ? "drawerOpen" : "drawerClosed"}`}
      >
        <List>
          <ListItem component={Link} to="/workflow">
            <ListItemIcon>
              <Home
                className={
                  isPathSelected("/workflow")
                    ? "sidebarListItemIconSelected"
                    : "sidebarListItemIcon"
                }
              />
            </ListItemIcon>
            {isOpen && (
              <ListItemText
                primaryTypographyProps={{
                  className: isPathSelected("/workflow")
                    ? "sidebarListItemTextSelected"
                    : "sidebarListItemText",
                }}
                primary={t("WORKFLOW")}
              />
            )}
          </ListItem>
          {/* <ListItem component={Link} to="/workflow-form">
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
          </ListItem> */}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
