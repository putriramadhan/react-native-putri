import { Text,StyleSheet,Button,View, TouchableOpacity } from "react-native";

const ComponentPresentation = ({ onPress, counter, up, reset,down }) => {
  return (
     <>
     <View>
       <Text
         style={counter > 10 ? styles.textDanger : styles.text}
         onPress={() => onPress()}>
         Hello Component Presentation {counter}
       </Text>
     </View>
     <View style={{ marginTop: 50, width: "100%", paddingHorizintal:16}}>
       {/* <Button onPress={() => reset()} title="Reset" />
       <Button onPress={() => up()} title="Up" />
       <Button onPress={() => down()} title="Down" /> */}
       <TouchableOpacity onPress={() => reset()} style={styles.button}>
        <Text style={ styles.buttonContent }>Reset</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => up()} style={styles.button}>
        <Text style={ styles.buttonContent }>UP</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => down()} style={styles.button}>
        <Text style={ styles.buttonContent }>Down</Text>
       </TouchableOpacity>
     </View>
   </>
  );
};

const styles = StyleSheet.create({
    text: {
        color: "#333",
        fontSize: 20,
    },
    textDanger: {
        color: "gray",
        fontSize: 20,
    },
    button: {
      backgroundColor: "#580AFF",
      padding: 10,
      width: "100%",
      borderRadius: 10,
      marginVertical: 8,
    },
    buttonContent: {
      color: "#fff",
      textAlign: "center",
      paddingHorizontal: 18,
      paddingVertical: 12,
      fontSize: 16,
      fontWeight: "bold",
    
    },
});

export default ComponentPresentation;