import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Card, IconButton, InputAdornment, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { workflowService } from "../service/workflow/WorkflowService";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { CONST_WORDS, yup } from "../utils/constant";
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
    const token = `${values.userName}:${values.password}`;
    localStorage.setItem(CONST_WORDS.token, btoa(token));
    workflowService
      .getpendingWorkflows()
      .then((res) => {
        if (res?.data) {
          navigate("/workflow");
        }
      })
      .catch(() => {
        localStorage.removeItem(CONST_WORDS.token);
      });
  };

  return (
    <Box className="loginContainer">
      <Card>
        <div className="loginLabelWrapper">
          <Typography>{t("loginTo")}</Typography>
          {/* <img src="/logo2.png" alt="" /> */}
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
          {({ resetForm, handleSubmit }) => {
            return (
              <form className="loginForm" onSubmit={handleSubmit}>
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
                          <IconButton size="small" onClick={handleClickShowPassword}>
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
                <Grid container spacing={2} size={12} width={"100%"}>
                  <Grid size={6}>
                    <Button
                      size="medium"
                      variant="outlined"
                      fullWidth
                      color="primary"
                      onClick={() => {
                        resetForm();
                      }}
                    >
                      {t("reset")}
                    </Button>
                  </Grid>
                  <Grid size={6}>
                    <Button
                      type="submit"
                      size="medium"
                      variant="contained"
                      fullWidth
                      color="primary"
                    >
                      {t("login")}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </Card>
    </Box>
  );
};
