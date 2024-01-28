import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
  StatusBar,
  Pressable,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DATA from "../modal_data/transaction_history.json";
import { ROUTES } from "../modal_data/routes.js";

import BiometricsPassDeny from "../modal_data/biometric_fingerprint_pass_deny.js";
import BiometricsPassTrue from "../modal_data/biometric_fingerprint_pass_true.js";

import ListTransactions from "./ListTransactions";

const TransactionHistoryScreen = () => {
  const [BiometricAuthentication, setBiometricAuthentication] = useState(false);
  const [PopUp, setPopUp] = useState(false);

  const navigation = useNavigation();

  const authenticateToShow = async () => {
    try {
      //Change BiometricsPassTrue or BiometricsPassDeny to mimic a successful pass-through with biometric fingerprint security scan or not respectively.
      const fingerprintAttempt = await BiometricsPassTrue.requestBioAuth();

      if (fingerprintAttempt) {
        console.log("Biometric authentication successful!");
        navigation.navigate(ROUTES.TRANSACTION_HISTORY);

        // reveal the amount here logic
        setBiometricAuthentication(true);
      } else {
        console.log("Biometric authentication failed.");
        setPopUp(true);
      }
    } catch (error) {
      console.error("Error during biometric authentication:", error);
      // Handle errors
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.page_title}>Transaction History List</Text>
        <View
          style={
            BiometricAuthentication ? { display: "none" } : { display: "flex" }
          }
        >
          <TouchableOpacity
            style={styles.button_auth}
            onPress={authenticateToShow}
          >
            <Text style={styles.buttonText}>
              Authenticate Biometrics
              {"\n"}
              to show Amount
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <ListTransactions isAuthenticated={BiometricAuthentication} />
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={PopUp}
        onRequestClose={() => {
          Alert.alert("Alert has been closed.");
          setPopUp(!PopUp);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Biometric authentication needed
              {"\n"}
              to view amount.
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setPopUp(!PopUp)}
            >
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TransactionHistoryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9c2ff",
    width: "100%",
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  page_title: {
    backgroundColor: "white",
    fontSize: 20,
    fontWeight: "normal",
    textAlign: "center",
    color: "#292929",
    paddingVertical: 30,
    borderBottomColor: "lightgray",
    borderBottomWidth: 3,
  },
  first_line: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 25,
  },
  info: {
    fontSize: 14,
    fontWeight: "normal",
    textAlign: "left",
    color: "#292929",
    marginVertical: 5,
    lineHeight: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "left",
    color: "black",
  },
  credit: {
    color: "green",
  },
  debit: {
    color: "red",
  },
  button_auth: {
    backgroundColor: "#d14adf",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginHorizontal: "auto",
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
    paddingVertical: 40,
    paddingHorizontal: 30,
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
