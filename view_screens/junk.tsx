   const checkTouchID = async () => {
    try {
      const isSupported = await TouchID.isSupported();

      if (isSupported) {
        authenticateWithTouchID();
      } else {
        console.log('Touch ID is not supported');
      }
    } catch (error) {
      console.log('Error checking Touch ID support', error);
    }
  };


  const authenticateWithTouchID = async () => {
    try {
      await TouchID.authenticate('Authenticate with Touch ID', optionalConfigObject);
      navigation.navigate(ROUTES.TRANSACTION_HISTORY);
    } catch (error) {
      console.log('Touch ID authentication failed', error);
    }
  };