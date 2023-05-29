import { useEffect, useMemo, useState } from "react";
import { Alert, ScrollView, Text, View,StatusBar } from "react-native";
import {
  ActivityIndicator,
    Appbar,
    Button,
    Divider,
    List,
    MD2Colors,
    RadioButton,
    TextInput,
  } from "react-native-paper";
import WidgetProductChoice from "../../widgets/products/WidgetProductChoices";
import { ServiceBaseIsDuplicateArray } from "../../services/ServiceBase";
import axios from "axios";

const ScreenPenjualanCreate = ({ navigation }) => {
  const [complete, setComplete] = useState(false);
  const [items, setItems] = useState([]);
  const [payment, setPayment] = useState({
    total: 0,
    pay: 0,
    change: 0,
    method: "",
  });

  const handleInput = (name, value, index) => {
    setItems((values) => {
      const arr = [...values];
      const b = arr[index];
      if (values === 0) {
        arr.splice(index,1);
        return arr;
      }

      b[name] = value;
      b.subtotal = b[name]*b.price;
      arr[index] = b;
      return arr;
    });
  };

  const handleInputPayment = (name, value) => {
    setPayment((values) => ({...values, [name]: value }));
  };

  const addOrUpdate = (item) => {
    setComplete(false);
    const debounce = setTimeout(() => {
      if (ServiceBaseIsDuplicateArray(items, item.id,"id")){
        update(item);
      } else {
        add(item);
      }
      setComplete(true);
      clearTimeout(debounce);
    }, 100);
  };

  const add = (item) => {
    item.qty = 1;
    item.subtotal = item.qty * item.price;
    setItems((values) => [...values, item]);
  };

  const update = (item) => {
    setItems((values) => {
      const arr = [...values];
      const b = arr.find((value) => value.id === item.id);
      const i = arr.findIndex((value) => value.id === item.id);
      b.qty = b.qty + 1;
      b.subtotal = b.qty * b.price;
      arr[i] = b;
      return arr;
    });
  };

  const calculateTotal = useMemo(() => {
    let total = 0;
    for (const item of items) {
      total = total + item.subtotal;
    }

    setPayment((values) => ({ ...values, total }));
    return total;
  }, [items]);

  const calculateChange = useMemo(() => {
    const change = payment.pay -calculateTotal;
    setPayment((values) => ({ ...values, change }));
    return change;
  }, [items, payment.pay]);

  const handleSave = () => {
    const products = items.map((value) => {
      return { productId: value.id, quantity: value.qty };
    });

    const payload = {
      userId: 5,
      date: "2020-02-03",
      products,
    };

    axios
    .post("https://fakestoreapi.com/carts", payload)
    .then((response) => {
      console.log(response.data);
      navigation.navigate("ScreenPenjualanSuccess", { payment, items });
    })
    .catch((error) => {
      Alert.alert("Error", error);
    });
  };

  useEffect(() => {
    setComplete(false);
    const debounce = setTimeout(() => {
      setComplete(true);
      clearTimeout(debounce);
    }, 1000);
  }, []);
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Point Of Sales" />
      </Appbar.Header>
      {complete && (
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
          <WidgetProductChoice onPress={addOrUpdate} />
          <Divider />
          <List.Section>
            <List.Subheader>Items</List.Subheader>
          <Divider />
          {items.map((item, index) => (
              <List.Item
                key={index}
                title={item.title}
                description={
                  <Text>
                    {item.price} x {item.qty || 0} @ {item.subtotal || 0}
                  </Text>
                }
                right={() => (
                  <>
                    <TextInput
                      value={`${item.qty || ""}`}
                      error={calculateTotal ? false : true}
                      onChangeText={(text) =>
                        handleInput("qty", parseInt(text), index)
                      }
                    />
                  </>
                )}
              />
            ))}
          </List.Section>
          <Divider />
          <List.Section>
            <List.Subheader>Pembayaran</List.Subheader>
          <Divider />
            <List.Item
               title="Total"
              right={() => <Text>{calculateTotal || 0}</Text>}
            />
          <List.Item
              title="Change"
              right={() => <Text>{calculateChange || 0}</Text>}
            />
          </List.Section>
          <RadioButton.Group
            onValueChange={(value) => {
              setPayment((values) => ({ ...values, method: value }));
            }}
            value={payment.method}>
            <RadioButton.Item label="Cash" value="cash" />
            <RadioButton.Item label="Bank Transfer" value="bank" />
          </RadioButton.Group>
          <Divider />
          <TextInput
            value={`${payment.pay || ""}`}
            onChangeText={(text) => handleInputPayment("pay", parseInt(text))}
            style={{ marginHorizontal: 16, marginTop: 16 }}
            mode="outlined"
            label="Pay"
          />
          <Button style={{ marginVertical: 24, marginHorizontal: 16 }}
          onPress={handleSave}
          mode="contained">
            Simpan
          </Button>
         </ScrollView>
      )}

      {!complete && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 24,
            gap: 16,
          }}>
          {/* <ProgressBar indeterminate={true} color={MD3Colors.error50} /> */}
          <ActivityIndicator animating={!complete} color={MD2Colors.red800} />
          <Text>Wait Yaah</Text>
        </View>
      )}
    </>
  );
};

export default ScreenPenjualanCreate;