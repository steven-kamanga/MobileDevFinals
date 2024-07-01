import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
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
import { router, useLocalSearchParams } from "expo-router";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Text } from "react-native";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Box } from "@/components/ui/box";

const SignUp = () => {
  const [register, setRegister] = useState(false);
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
          createUserWithEmailAndPassword(auth, values.email, values.password)
            .then(() => {
              console.log(values);
              setProcessing(false);
              if (register == true) {
                //
              }
              router.push("/(tabs)/home");
            })
            .catch((error) => {
              console.log(values);

              console.log(error.message);
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
                SignUp
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
                  Get Started!
                </ButtonText>
              )}
            </Button>
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
