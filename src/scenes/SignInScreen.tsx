import React from 'react';
import {View} from 'react-native';
import SignInForm from '@app/components/signIn/SignInForm';
import {useAuth} from '@app/providers/AuthProvider';

function SignInScreen() {
  const auth = useAuth();

  return (
    <View>
      <SignInForm
        onSubmit={({username, password}) => {
          auth.signIn(username, password);
        }}
      />
    </View>
  );
}

export default SignInScreen;
