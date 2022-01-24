import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {FormProps} from '@app/ts/types';

type ServerInstanceFields = {
  url: string;
};

type ServerInstanceFormProps = FormProps<ServerInstanceFields>;

function ServerInstanceForm({
  initialValues,
  isLoading,
  onSubmit,
}: ServerInstanceFormProps) {
  const [url, setURL] = useState(initialValues?.url);
  const [error, setError] = useState<string>();
  const initialURL = initialValues?.url;
  useEffect(() => {
    if (initialURL) {
      setURL(initialURL);
    }
  }, [initialURL]);

  return (
    <View>
      <Text>Server Instance</Text>
      <TextInput
        autoCapitalize="none"
        onChangeText={setURL}
        placeholder="https://..."
        textContentType="URL"
        value={url}
      />
      <Button
        title="Confirm"
        onPress={async () => {
          if (isLoading) {
            return;
          }

          // TODO: add some validations
          if (url) {
            await onSubmit({url});
          } else {
            setError('Invalid URL');
          }
        }}
      />
      {Boolean(error) && <Text>{error}</Text>}
    </View>
  );
}

export default ServerInstanceForm;
