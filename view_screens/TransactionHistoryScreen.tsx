import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Button,
  ScrollView,
  Dimensions,
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


  const navigation = useNavigation();

  const authenticateToShow = async () => {
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

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.page_title}>Transaction History List</Text>
        <TouchableOpacity style={styles.button} onPress={authenticateToShow}>
          <Text style={styles.buttonText}>Authenticate to Show</Text>
        </TouchableOpacity>
      </View>
      <ListTransactions isAuthenticated={BiometricAuthentication}/>
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
});
