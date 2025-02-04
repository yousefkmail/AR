import { useForm } from "react-hook-form";
import InputField from "../UserInfoFilling/Forms/InputField";
import { Button, Container } from "@mui/material";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import FormRow from "../UserInfoFilling/Forms/FormRow";
import { useEffect, useState } from "react";

export default function Login() {
  interface loginFormProps {
    email: string;
    password: string;
  }

  const { register, handleSubmit } = useForm<loginFormProps>();
  const navigate = useNavigate();
  const [refreshed, setRefreshed] = useState<boolean>(false);
  const OnSubmit = async (data: loginFormProps) => {
    const auth = getAuth();

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      navigate("/admin/dashboard");
    } catch (e) {
      console.log("error logging in");
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/admin/dashboard"); // Redirect to the main page if authenticated
      } else {
        setRefreshed(true);
      }
    });

    return () => unsubscribe();
  }, [getAuth(), navigate]);

  return (
    refreshed && (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "100px",
        }}
      >
        <Container maxWidth="sm">
          <h2 style={{ margin: "10px" }}>Log in with your admin credintials</h2>
          <form action="" onSubmit={handleSubmit(OnSubmit)}>
            <FormRow>
              <InputField
                {...register("email", {
                  required: { value: true, message: "This field is required" },
                })}
                label="Email"
              />
            </FormRow>
            <FormRow>
              <InputField
                {...register("password", {
                  required: { value: true, message: "This field is required" },
                })}
                label="Password"
                type="password"
              />
            </FormRow>

            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </form>
        </Container>
      </div>
    )
  );
}
