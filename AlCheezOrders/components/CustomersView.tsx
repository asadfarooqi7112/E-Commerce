import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const CustomersView = (props) => {
  const customersArray = props.customers
    .filter(item => item.customer_id === props.id)
    .map((item, index) => (
      <View key={index} style={styles.customerContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{item.name}</Text>
        <Text style={styles.label}>Contact:</Text>
        <Text style={styles.value}>{item.contact}</Text>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{item.address}</Text>
        <Text style={styles.label}>City:</Text>
        <Text style={styles.value}>{item.city}</Text>
        <Text style={styles.label}>Postal Code:</Text>
        <Text style={styles.value}>{item.zip_code}</Text>
      </View>
    ));
  
  return (
    <View style={styles.container}>
      {customersArray}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  customerContainer: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
});

export default CustomersView;
