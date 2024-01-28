Navigate to the project directory:

Using Bash

1. Navigate to directory
cd react-native-typescript-transaction-history-app

2. Install dependencies:
npm i

3. Run with Expo:
npm start

4. Choose Platform, Developed with (Web):
w

Sign in with Credential Authentication or Biometric Authentication:

Credentials
Username: user
Password: password

Biometrics requestBioAuth is set to True
To change to false for testing, change the import file used:

"BiometricsPassTrue" to "BiometricsPassDeny"

line 33, for Login.tsx
line 34, for TransactionHistoryScreen.tsx

