import axios from "axios";
import { useState, useEffect } from "react";
import { ScrollView, Modal, Alert, View } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Button,
  DataTable,
  MD2Colors,
  Portal,
  ProgressBar,
  Provider,
  Text,
} from "react-native-paper";

const WidgetProductChoice = ({ onPress }) => {
  const [visible, setVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [complete, setComplete] = useState(false);

  const openModal = () => {
    setComplete(false);
    const debounce = setTimeout(() => {
      setVisible(true);
      setComplete(true);
      clearTimeout(debounce);
    }, 100);
  };

  useEffect(() => {
    setComplete(false);
    const debounce = setTimeout(() => {
      axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        Alert.alert("Ups!", error);
      })
      .finally(() => {
        clearTimeouut(debounce);
        setComplete(true);
      });
    }, 1000);
  }, []);
  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible && complete}
          animationType="slide"
          style={{
            backgroundColor: "white",
          }}>
           {complete && (
            <ScrollView>
              <Appbar.Header>
                <Appbar.BackAction onPress={() => setVisible(false)} />
                <Appbar.Content title="Pilih Product" />
              </Appbar.Header>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Title</DataTable.Title>
                  <DataTable.Title>Category</DataTable.Title>
                  <DataTable.Title numeric>Price</DataTable.Title>
                </DataTable.Header>
                {products.map((product, index) => (
                  <DataTable.Row
                    key={index}
                    onPress={() => {
                      setComplete(false);
                      const debounce = setTimeout(() => {
                        onPress(product);
                        setVisible(false);
                        setComplete(true);
                        clearTimeout(debounce);
                      }, 500);
                    }}>
                    <DataTable.Cell>{product.title}</DataTable.Cell>
                    <DataTable.Cell>{product.category}</DataTable.Cell>
                    <DataTable.Cell numeric>{product.price}</DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </ScrollView>
          )}
          {!complete && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems:"center",
                marginHorizontal: 24,
                gap: 16,
              }}>
              {/* <ProgressBar indeterminate={true} color={MD3Colors.error50} /> */}
              <ActivityIndicator animating={!complete}
              color={MD2Colors.red800}/>
              <Text>Wait yaah</Text>
            </View>
          )}
        </Modal>
      </Portal>
      <Button loading={!complete} onPress={openModal}>
        Pilih Product
      </Button>
    </Provider>
  );
};


export default WidgetProductChoice;