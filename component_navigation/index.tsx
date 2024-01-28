import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import LogIn from "../view_screens/LogInScreen";
import TransactionHistory from "../view_screens/TransactionHistoryScreen";
import Details from "../view_screens/DetailsScreen";
import {ROUTES} from "../modal_data/routes.js";

const Stack = createNativeStackNavigator() ;

function AuthNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName={ROUTES.LOGIN}>
        <Stack.Screen
          name={ROUTES.LOGIN}
          component={LogIn}
        />
        <Stack.Screen
          name={ROUTES.TRANSACTION_HISTORY}
          component={TransactionHistory}
        />
        <Stack.Screen
          name={ROUTES.TRANSACTION_DETAILS}
          component={Details}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthNavigation;