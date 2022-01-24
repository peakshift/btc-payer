import React, {useMemo} from 'react';
import {View} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {GetHealthResponse, HEALTH_PATH} from '@app/sdk/health/getHealthStatus';
import ServerInstanceForm from '@app/components/serverInstance/ServerInstanceForm';
import {useServerInstance} from '@app/providers/ServerInstanceProvider';
import {AuthNavigatorParams} from '@app/navigation/AuthNavigator';

type ServerInstanceScreenNavigationProp = StackNavigationProp<
  AuthNavigatorParams,
  'ServerInstanceScreen'
>;

function ServerInstanceScreen() {
  const {url, setURL} = useServerInstance();
  const {navigate} = useNavigation<ServerInstanceScreenNavigationProp>();
  const initialValues = useMemo(() => ({url}), [url]);

  // TODO: probably will need to move this to server instance context
  const isValidURL = async (str: string) => {
    try {
      const {status} = await axios.get<GetHealthResponse>(HEALTH_PATH, {
        baseURL: str,
      });
      // TODO: check if we need to enforce a fully synchronized instance according to NBXplorer
      // return status === 200 && response.data.synchronized;
      return status === 200;
    } catch (error) {
      console.log({error});
    }
    return false;
  };

  return (
    <View>
      <ServerInstanceForm
        initialValues={initialValues}
        onSubmit={async ({url: newURL}) => {
          if (await isValidURL(newURL)) {
            setURL(newURL);
            navigate('SignInScreen');
          }
        }}
      />
    </View>
  );
}

export default ServerInstanceScreen;
