import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Pressable,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ROUTES } from "../modal_data/routes.js";

import BiometricsPassDeny from "../modal_data/biometric_fingerprint_pass_deny.js";
import BiometricsPassTrue from "../modal_data/biometric_fingerprint_pass_true.js";

const LogInScreen = () => {
  const [BiometricsFailed, setBiometricsFailed] = useState(false);
  const [CredentialsFailed, setCredentialsFailed] = useState(false);

  // useEffect(() => {
  //   authenticateWithBiometrics();
  // }, []);

  const authenticateWithBiometrics = async () => {
    try {
      //Change BiometricsPassTrue or BiometricsPassDeny to mimic a successful pass-through with biometric fingerprint security scan or not respectively.
      const fingerprintAttempt = await BiometricsPassTrue.requestBioAuth();

      if (fingerprintAttempt) {
        console.log("Biometric authentication successful!");
        navigation.navigate(ROUTES.TRANSACTION_HISTORY);
      } else {
        console.log("Biometric authentication failed.");
        setBiometricsFailed(true);
        // <PopUpAlert isVisible={isModalVisible} onClose={toggleModal} />;
      }
    } catch (error) {
      console.error("Error during biometric authentication:", error);
      // Handle errors
    }
  };

  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = () => {
    // login logic here
    const validUsername = "user";
    const validPassword = "password";

    if (username === validUsername && password === validPassword) {
      // Successful login
      navigation.navigate(ROUTES.TRANSACTION_HISTORY);
    } else {
      // Failed login
      setCredentialsFailed(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View
        style={{
          borderBottomColor: "lightgray",
          borderBottomWidth: 3,
          width: "50%",
          marginVertical: 20,
          marginHorizontal: 10,
        }}
      ></View>

      <TouchableOpacity
        style={styles.button}
        onPress={authenticateWithBiometrics}
      >
        <Text style={styles.buttonText}>
          Login with
          <br />
          Biometric Authentication
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={BiometricsFailed}
        onRequestClose={() => {
          setBiometricsFailed(!BiometricsFailed);
        }}
      >
        <View style={styles.centeredView}>
          {/* <View style={styles.modalView}> */}

            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Biometric Authentication login failed.
                <br />
                Try Credentials Authentication log in.
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setBiometricsFailed(!BiometricsFailed)}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>

        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={CredentialsFailed}
        onRequestClose={() => {
          setCredentialsFailed(!CredentialsFailed);
        }}
      >
        <View style={styles.centeredView}>
          {/* <View style={styles.modalView}> */}

            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Credentials Authentication failed.
                <br />
                Try Biometric Authentication log in.
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setCredentialsFailed(!CredentialsFailed)}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>

          {/* <Text style={styles.modalText}>
              Login Failed
            </Text> */}
        </View>
      </Modal>
    </View>
  );
};

LogInScreen.navigationOptions = {
  headerShown: false,
};

export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  button: {
    backgroundColor: "#d14adf",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 50,
    paddingHorizontal: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
