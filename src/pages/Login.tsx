import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { workflowService } from "../service/workflow/WorkflowService";
import { HttpStatusCode } from "axios";
import { errorToast } from "../components/common/ToastMsg";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { yup } from "../utils/constant";
import InputTextField from "../components/common/InputTextField";

export interface Login {
  userName: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object().shape({
    userName: yup.string().required(t("userName") + " " + t("isRequired")),
    password: yup.string().required(t("password") + " " + t("isRequired")),
  });

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLoginClick = async (values: Login) => {
    console.log(values);
    const { status } = await workflowService.getpendingWorkflows({
      userName: btoa(values.userName),
      password: btoa(values.password),
    });
    if (status === HttpStatusCode.Unauthorized) {
      errorToast(t("invalidCredential"));
    } else {
      localStorage.setItem("authToken", "true");
      navigate("/workflow");
    }
  };

  return (
    <Box className="loginContainer">
      <Card>
        <div className="loginLabelWrapper">
          <Typography>{t("loginTo")}</Typography>
          <img src="/logo2.png" alt="" />
        </div>
        <Formik
          initialValues={{
            password: "",
            userName: "",
          }}
          validationSchema={schema}
          validateOnChange
          onSubmit={handleLoginClick}
        >
          {({ values, setFieldTouched }) => {
            return (
              <>
                <InputTextField
                  lbl={t("userName")}
                  name={"userName"}
                  fullWidth
                  hideHelp
                  className="loginField"
                />
                <InputTextField
                  lbl={t("password")}
                  name={"password"}
                  fullWidth
                  fieldType={showPassword ? "text" : "password"}
                  hideHelp
                  className="loginField"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? (
                              <VisibilityOff fontSize="small" />
                            ) : (
                              <Visibility fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <Button
                  size="small"
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={async () => {
                    const isValid = await schema.isValid(values);
                    if (isValid) {
                      handleLoginClick(values);
                    } else {
                      setFieldTouched("userName", true);
                      setFieldTouched("password", true);
                    }
                  }}
                >
                  {t("login")}
                </Button>
              </>
            );
          }}
        </Formik>
      </Card>
    </Box>
  );
};
