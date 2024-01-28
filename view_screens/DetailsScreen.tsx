
import { View, Text, StyleSheet, StatusBar, } from "react-native";

import { useRoute } from '@react-navigation/native';

const DetailsScreen = () => {
  const route = useRoute();
  const { transactionData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.page_title}>Transaction ID: {transactionData.id}</Text>

        <View style={{ ...styles.item,  ...styles.info}}>

          {/* colour coded debit/credit */}

          <View style={styles.first_line}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{ ...styles.info,  ...  styles.title}}>Type: </Text>
              {transactionData.is_credit_type ? <Text style={{ ...styles.  info,  ...  styles.title,  ...styles.credit}}>Credit</Text> : <Text style={{ ...  styles.info,  ...  styles.title,  ...styles.debit}}>Debit</Text>}
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={{ ...styles.info,  ...  styles.title}}>Amount: </Text>
              {transactionData.is_credit_type ? <Text style={{ ...styles.  info,  ...styles.title,  ...styles.credit}}>${transactionData.amount}</Text> :  <Text style={{ ...styles.info,  ...styles.title,  ...styles.debit}}>${transactionData.amount}</Text>}
            </View>
          </View>

          {/* transaction title */}
          <Text style={{ ...styles.info,  ...styles.title}}>{transactionData.title}</Text>

          {/* other info */}
          <Text style={styles.info}>Date: {transactionData.date}</Text>
          <Text style={styles.info}>Desc: {transactionData.description}</Text>

        </View>

    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9c2ff',
    width: '100%',
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  page_title: {
    backgroundColor: 'white',
    fontSize: 20,
    fontWeight: 'normal',
    textAlign: 'center',
    color: "#292929",
    paddingVertical: 30,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 3,
  },
  first_line: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30,
  },
  item: {
    backgroundColor: 'white',
    paddingTop: 50,
    paddingBottom: 200,
    paddingHorizontal: 25,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 25
  },
  info: {
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'left',
    color: "#292929",
    marginVertical: 10,
    lineHeight: 20
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'left',
    color: "black",
  },
  credit: {
    color: "green",
  },
  debit: {
    color: "red",
  }
});