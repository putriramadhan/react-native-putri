import { useEffect, useState } from "react";
import { Linking } from "react-native";
import { Appbar, Button, List, Text } from "react-native-paper";

const ScreenPenjualanSuccess = ({ navigation, route }) => {
    const [message, setMessage] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("082390805463");

  useEffect(() => {
    setMessage(
      `Transaksi berhasil dengan nominal ${route.params?.payment?.total}.`
    );
  }, [route.params.payment]);
  return (
    <>
    <Appbar.Header>
        <Appbar.BackAction
        onPress={() => {
            navigation.goBack();
        }}
    />
    <Appbar.Content title="Detail Pembelian"/>
    <Appbar.Action
          icon={"whatsapp"}
          onPress={() => {
            Linking.openURL(
              `whatsapp://send?text=${message}&phone=${phoneNumber}`
            );
          }}
        />  
    </Appbar.Header>

    <List.Section>
        <List.Subheader>Items</List.Subheader>
        {route.params.items &&
          route.params.items.map((value, index) => (
            <List.Item
              key={index}
              title={value.title}
              description={value.price}
            />
          ))}
      </List.Section>

      <List.Section>
        <List.Subheader>Pembayaran</List.Subheader>
        {/* <Divider /> */}
        <List.Item
          title="Total"
          right={() => <Text>{route.params?.payment?.total || 0}</Text>}
        />
        <List.Item
          title="Change"
          right={() => <Text>{route.params?.payment?.pay || 0}</Text>}
        />
        <List.Item
          title="Change"
          right={() => <Text>{route.params?.payment?.change || 0}</Text>}
        />
      </List.Section>

    </>
  );
};

export default ScreenPenjualanSuccess;