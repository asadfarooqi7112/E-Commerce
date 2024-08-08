import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const OrderedItemsView = (props) => {
  return (
    <View style={styles.container}>
      {props.orderedItems
        .filter(item => item.order_id === props.id)
        .map((item, index) => {
          const product = props.products.find(product => product.product_id === item.product_id);
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.productName}>{product ? product.name : 'Unknown Product'}</Text>
              <Text style={styles.productDetails}>Price: Rs {item.price}</Text>
              <Text style={styles.productDetails}>Color: {item.color.charAt(0).toUpperCase() + item.color.slice(1)}</Text>
              <Text style={styles.productDetails}>Quantity: {item.quantity}</Text>
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  itemContainer: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#444',
  },
  productDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
});

export default OrderedItemsView;
