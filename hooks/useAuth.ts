import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuth = () => {
  function validateIdToken(idToken: string) {
    if (idToken != null && idToken.length > 0) {
      return { isValid: true };
    } else {
      return { isValid: false };
    }
  }
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLocalCredentials = async () => {
      try {
        const storedIdToken = await AsyncStorage.getItem("firebaseIdToken");
        console.log(storedIdToken);

        if (storedIdToken) {
          const backendResponse = await validateIdToken(storedIdToken);
          if (backendResponse.isValid) {
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error("Error checking local credentials:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLocalCredentials();
  }, []); // Empty dependency array to run only on component mount

  return { isAuthenticated, isLoading };
};

export default useAuth;
