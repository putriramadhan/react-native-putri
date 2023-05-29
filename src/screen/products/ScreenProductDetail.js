import axios from "axios";
import { useEffect, useState } from "react";
import { Appbar, Button, Card, Text } from "react-native-paper";

const ScreenProductDetail = () => {
  const [product, setProduct] = useState();
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/11")
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {})
      .finally(() => {
        setComplete(true);
        console.log("hehehe");
      });
  }, []);

  return (
    <>
      {complete && (
        <>
          <Appbar.Header mode="center-aligned" elevated={{ bottom: 10 }}>
            <Appbar.BackAction onPress={() => {}} />
            <Appbar.Content title={`${product.title}`} />
            <Appbar.Action icon="cart-outline" onPress={() => {}} />
          </Appbar.Header>

          <Card style={{ marginVertical: 16, marginHorizontal: 24 }}>
            <Card.Cover
              style={{ marginVertical: 10 }}
              source={{ uri: product.image }}
            />
            <Card.Content>
              <Text variant="titleLarge">{product.title}</Text>
              <Text variant="bodyMedium">{product.description}</Text>
            </Card.Content>
            <Card.Actions>
              <Button icon="eye">Preview</Button>
              <Button icon="cart-plus">Add to Cart</Button>
            </Card.Actions>
          </Card>
        </>
      )}
    </>
  );
};

export default ScreenProductDetail;