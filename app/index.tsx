import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Pressable, ScrollView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  AlertCircleIcon,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  Input,
  InputField,
} from "@gluestack-ui/themed";
import { VStack } from "@/components/ui/vstack";
import { FormControlLabelText } from "@gluestack-ui/themed";
import { FormControlErrorIcon } from "@gluestack-ui/themed";
import useThemeMode from "@/hooks/useThemeMode";
import { router, useLocalSearchParams } from "expo-router";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Text } from "react-native";
import { useToast } from "@/components/ui/toast";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Box } from "@/components/ui/box";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "@/hooks/useAuth";

const Login = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [processing, setProcessing] = useState(false);
  const simpleFormValues = {
    password: "",
    email: "",
  };

  const simpleFormValidationSchema = Yup.object().shape({
    password: Yup.string().required("Password is required").label("Password"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required")
      .label("Email"),
  });
  useEffect(() => {
    if (isAuthenticated == true) {
      router.push("/(tabs)/home");
    }
  }, [isAuthenticated]);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-primary-950 flex-col px-4"
      behavior="padding"
    >
      <Formik
        initialValues={simpleFormValues}
        validationSchema={simpleFormValidationSchema}
        onSubmit={(values) => {
          setProcessing(true);
          signInWithEmailAndPassword(auth, values.email, values.password)
            .then(async (userCredential) => {
              const idToken = await userCredential.user.getIdToken(); // Use await for promise
              console.log(idToken);
              setProcessing(false);

              try {
                await AsyncStorage.setItem("firebaseIdToken", idToken); // Store ID token directly
              } catch (error) {
                console.error("Error storing ID token:", error); // Log specific error details
                // Handle storage errors appropriately (e.g., notify user)
              }

              router.push("/(tabs)/home");
            })
            .catch((error) => {
              console.log(values);
              console.error("Sign-in error:", error.message); // Log specific error details
              setProcessing(false);
            });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="px-2 mt-[20px]"
          >
            <Box>
              <Text className="text-secondary-0 font-medium text-2xl">
                Login
              </Text>
            </Box>
            <FormControl
              className="mb-2 mt-4"
              isDisabled={false}
              isInvalid={errors.password && touched.password ? true : false}
              isReadOnly={false}
              isRequired={true}
            >
              <VStack space="xs">
                <FormControlLabel className="mb-1">
                  <FormControlLabelText className="text-typography-0">
                    Password
                  </FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    className="text-typography-0"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    autoCorrect={false}
                    onBlur={handleBlur("password")}
                    placeholder="Password"
                    type="password"
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorIcon size={"md"} as={AlertCircleIcon} />
                  <FormControlErrorText>{errors.password}</FormControlErrorText>
                </FormControlError>
              </VStack>
            </FormControl>
            <FormControl
              className="mb-2"
              isDisabled={false}
              isInvalid={errors.email && touched.email ? true : false}
              isReadOnly={false}
              isRequired={true}
            >
              <VStack space="xs">
                <FormControlLabel className="mb-1">
                  <FormControlLabelText className="text-typography-0">
                    Email Address
                  </FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    className="text-typography-0"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    autoCorrect={false}
                    onBlur={handleBlur("email")}
                    placeholder="john.doe@example.com"
                    type="text"
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorIcon size={"md"} as={AlertCircleIcon} />
                  <FormControlErrorText>{errors.email}</FormControlErrorText>
                </FormControlError>
              </VStack>
            </FormControl>

            <Button
              variant="solid"
              className="mb-5 mt-3 bg-secondary-0"
              action="secondary"
              onPress={() => {
                handleSubmit();
              }}
            >
              {processing ? (
                <ButtonSpinner />
              ) : (
                <ButtonText className="text-typography-950">
                  Let's Go!
                </ButtonText>
              )}
            </Button>
            <Box className="flex-row">
              <Text className="text-typography-0 text-xs">
                Don't have an account yet?
              </Text>
              <Pressable onPress={() => router.push("/signup")}>
                <Text className="pl-1 text-blue-500 text-xs">Register</Text>
              </Pressable>
            </Box>
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default Login;
