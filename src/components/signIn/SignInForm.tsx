import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {FormProps} from '@app/ts/types';

type SignInFields = {
  username: string;
  password: string;
};

type SignInFormProps = FormProps<SignInFields>;

function SignInForm({initialValues, isLoading, onSubmit}: SignInFormProps) {
  const [username, setUsername] = useState(initialValues?.username);
  const [password, setPassword] = useState(initialValues?.password);
  const [error, setError] = useState<string>();
  const initialUsername = initialValues?.username;
  const initialPassword = initialValues?.password;
  useEffect(() => {
    if (initialUsername) {
      setUsername(initialUsername);
    }
  }, [initialUsername]);
  useEffect(() => {
    if (initialPassword) {
      setPassword(initialPassword);
    }
  }, [initialPassword]);
  return (
    <View>
      <View>
        <Text>Username</Text>
        <TextInput
          autoCapitalize="none"
          onChangeText={setUsername}
          placeholder="Username"
          textContentType="username"
          value={username}
        />
      </View>

      <View>
        <Text>Password</Text>
        <TextInput
          onChangeText={setPassword}
          placeholder="Password"
          textContentType="password"
          secureTextEntry
          value={password}
        />
      </View>

      <Button
        title="Confirm"
        onPress={async () => {
          if (isLoading) {
            return;
          }

          // TODO: add some validations
          if (username && password) {
            await onSubmit({username, password});
          } else {
            setError('Username or Password is invalid');
          }
        }}
      />
      {Boolean(error) && <Text>{error}</Text>}
    </View>
  );
}

export default SignInForm;
