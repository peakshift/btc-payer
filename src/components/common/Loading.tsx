import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={'#000'} animating size="small" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
});

export default Loading;
