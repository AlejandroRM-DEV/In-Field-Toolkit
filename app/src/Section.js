import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

function Section({ label, value, backgroundColor }) {
  return (
    <View style={[styles.wrapper, { backgroundColor }]}>
      <Text variant="labelLarge" style={styles.label}>
        {label}
      </Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
  },
  label: {
    flexGrow: 1,
  },
  value: {
    textAlign: 'right',
  },
});

export default Section;
