import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  AlertCircleIcon,
  CircleIcon,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlHelperText,
  FormControlLabel,
  Input,
  InputField,
  Textarea,
} from "@gluestack-ui/themed";
import { VStack } from "@/components/ui/vstack";
import { FormControlLabelText } from "@gluestack-ui/themed";
import { FormControlErrorIcon } from "@gluestack-ui/themed";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import useThemeMode from "@/hooks/useThemeMode";
import { router, useLocalSearchParams } from "expo-router";
import { Button, ButtonSpinner } from "@/components/ui/button";
import { Text } from "react-native";
import axios from "axios";
import { useToast } from "@/components/ui/toast";
import { getAuth, updatePhoneNumber, updateProfile } from "firebase/auth";

const simpleFormValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").label("Name"),
});

const UserUpdate = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [processing, setprocessing] = useState(false);

  const simpleFormValues = {
    name: "",
    email: "",
    phone: "",
    gender: "0",
  };

  const uiState = useThemeMode();
  return (
    <KeyboardAvoidingView
      className=" flex-1 bg-primary-950 flex-col px-4"
      behavior="padding"
    >
      <Formik
        initialValues={simpleFormValues}
        validationSchema={simpleFormValidationSchema}
        onSubmit={(values) => {
          console.log(values);
          if (auth.currentUser) {
            updateProfile(auth.currentUser, {
              displayName: values.name,
            })
              .then(() => {
                router.back();
              })
              .catch((error) => {
                // An error occurred
                // ...
              });
            // updatePhoneNumber(auth.currentUser, {
            //   phoneNumber: values.phone,
            // })
          } else {
            // Handle the case where the user is not authenticated
            console.error("User is not authenticated");
          }
        }}
      >
        {({
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <ScrollView showsVerticalScrollIndicator={false} className="px-2">
            <>
              <FormControl
                className="mb-2 mt-4"
                isDisabled={false}
                isInvalid={errors.name && touched.name ? true : false}
                isReadOnly={false}
                isRequired={true}
              >
                <VStack space="xs">
                  <FormControlLabel className="mb-1">
                    <FormControlLabelText className="text-typography-0">
                      Full Name
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      className="text-typography-0"
                      value={values.name}
                      onChangeText={handleChange("name")}
                      autoCorrect={false}
                      onBlur={handleBlur("name")}
                      placeholder="Full Name"
                      type="text"
                    />
                  </Input>
                  <FormControlError>
                    <FormControlErrorIcon size={"md"} as={AlertCircleIcon} />
                    <FormControlErrorText>{errors.name}</FormControlErrorText>
                  </FormControlError>
                </VStack>
              </FormControl>
            </>
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
                <Text className="text-typography-950">Submit</Text>
              )}
            </Button>
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default UserUpdate;
