import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DATA from "../modal_data/transaction_history.json";
import { ROUTES } from "../modal_data/routes.js";

interface ListTransactionsProps {
  isAuthenticated: boolean;
}

const ListTransactions: React.FC<ListTransactionsProps> = ({
  isAuthenticated,
}) => {
  const navigation = useNavigation();


    const renderTransactionItems = ({ item, index }: { item: ListTransactionsProps; index: number }) => {

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.push(ROUTES.TRANSACTION_DETAILS, { transactionData: item })
        }
      >
        <View style={{ ...styles.item, ...styles.info }}>
          {/* colour coded debit/credit */}
          <View style={styles.first_line}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.info}>Type: </Text>
              {item.is_credit_type ? (
                <Text style={{ ...styles.info, ...styles.credit }}>Credit</Text>
              ) : (
                <Text style={{ ...styles.info, ...styles.debit }}>Debit</Text>
              )}
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.info}>Amount: </Text>

              {ListTransactionsProps.isAuthenticated} ?
              {item.is_credit_type ? (
                <Text
                  style={{ ...styles.info, ...styles.title, ...styles.credit }}
                >
                  ${item.amount}
                </Text>
              ) : (
                <Text
                  style={{ ...styles.info, ...styles.title, ...styles.debit }}
                >
                  ${item.amount}
                </Text>
              )}
              :
              <Text
                style={{ ...styles.info, ...styles.title, ...styles.credit }}
              >
                $▧▧▧
              </Text>
            </View>
          </View>

          {/* transaction title */}
          <Text style={{ ...styles.info, ...styles.title }}>{item.title}</Text>

          {/* other info */}
          {/* <Text style={styles.info}>Date: {item.date}</Text>
          <Text style={styles.info}>Desc: {item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <ScrollView>
        <FlatList
          keyExtractor={(item) => item.id}
          data={DATA}
          // renderItem={renderTransactionItems}
          renderItem={(item) => renderTransactionItems(item, ListTransactionsProps)}
        />
      </ScrollView>
    </View>
  );
};

export default ListTransactions;

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
