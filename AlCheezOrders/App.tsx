import React, { useEffect, useState } from 'react';
import notifee from '@notifee/react-native';
import { supabase } from './supabaseClient';
import OrderedItemsView from './components/OrderedItemsView';
import CustomersView from './components/CustomersView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Linking,
} from 'react-native';

function App() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  async function onDisplayNotification() {
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    await notifee.displayNotification({
      title: 'New Order',
      body: `A new order has been placed.`,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select(`
        order_id,
        total_amount,
        customers (
          name,
          phone
        )
      `);
    if (error) {
      console.log('Error fetching orders:', error);
    } else {
      setOrders(data);
    }
    setLoading(false);
  };

  const fetchCustomers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('customers')
      .select('*');
    if (error) {
      console.log('Error fetching customers:', error);
    } else {
      setCustomers(data);
    }
    setLoading(false);
  };

  const fetchOrderedItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('ordereditems')
      .select('*');
    if (error) {
      console.log('Error fetching ordered items:', error);
    } else {
      setOrderedItems(data);
    }
    setLoading(false);
  };

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*');
    if (error) {
      console.log('Error fetching products:', error);
    } else {
      setProducts(data);
    }
    setLoading(false);
  };

  const refreshOrders = () => {
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
    fetchOrderedItems();
    fetchProducts();

    const subscription = supabase
      .channel('public:orders')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
        fetchOrders();
        onDisplayNotification();
        console.log("jhkjh")
      })
      .subscribe((status) => {
        console.log('Subscription status:', status);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  function handleDetails(id) {
    setSelectedOrderId(id);
    if (id === selectedOrderId) {
      setShowDetails((prev) => !prev);
    } else {
      setShowDetails(true);
    }
  }

  const handleCallPhoneNumber = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const ordersArray = orders.map((item, index) => (
    <View key={index} style={styles.orderContainer}>
      <TouchableOpacity onPress={() => handleDetails(item.order_id)}>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.orderId]}>{item.order_id}</Text>
          <Text style={[styles.cell, styles.customerName]}>{item.customers.name}</Text>
          <Text
            style={[styles.cell, styles.customerPhone]}
            onPress={() => handleCallPhoneNumber(item.customers.phone)}
          >
            {item.customers.phone}
          </Text>
          <Text style={[styles.cell, styles.totalAmount]}>{item.total_amount}</Text>
        </View>
        <Ionicons
          name={showDetails && selectedOrderId === item.order_id ? 'chevron-down' : 'chevron-up'}
          size={20}
          color="#000"
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
      {selectedOrderId === item.order_id && showDetails && (
        <View style={styles.expandedView}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ordered Items:</Text>
            <OrderedItemsView id={selectedOrderId} orderedItems={orderedItems} products={products} />
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Customer Details:</Text>
            <CustomersView id={selectedOrderId} customers={customers} />
          </View>
        </View>
      )}
    </View>
  ));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Order ID</Text>
        <Text style={styles.headerText}>Customer Name</Text>
        <Text style={styles.headerText}>Customer Phone</Text>
        <Text style={styles.headerText}>Total{'\n'}Amount</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {ordersArray}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={refreshOrders} style={styles.button}>
            <Text style={styles.buttonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom:0,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#333',
  },
  orderId: {
    flex: 1,
  },
  customerName: {
    flex: 2,
  },
  customerPhone: {
    flex: 2,
    color: '#007bff',
  },
  totalAmount: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 10,
    color: '#333',
  },
  orderContainer: {
    marginBottom: 10,
  },
  expandedView: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  arrowIcon: {
    textAlign: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default App;
