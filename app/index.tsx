import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as DocumentPicker from "expo-document-picker";
import { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { GenStyles, GlobalContext } from "./_layout";




export default function Index() {
  const GC = useContext(GlobalContext);
  const [file, SetFile] = useState(null);
  const [search, SS] = useState("");
  const [pass, SP] = useState("");
  const [result, SR] = useState(null);
  const [loading, SL] = useState(false);
  const DowloadHighlighted = () => {

    const chars = atob(result);
    const charsLength = new Array(chars.length);
    for (let i = 0; i < chars.length; i++) {
      charsLength[i] = chars.charCodeAt(i);
    }
    const byteArray = new Uint8Array(charsLength);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'highlighted' + file.name;
    downloadLink.textContent = 'Download Highlighted PDF';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }


  const pickFile = async () => {
    try {

      const resp = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
        multiple: false,
      });
      SetFile(resp.assets[0]);
    } catch {
      alert("Failed to select file.")
    }
  };


  const submitFile = async () => {
    try {
      if (loading) {
        return;
      }
      SL(true);
      const resp = await fetch(GC.BH + "/highlight/", {
        "method": "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "pdf": file, "search": search, "key": pass })
      });
      const result = await resp.json();

      if (resp.status === 400) {
        alert(result['msg']);
        SL(false);
      }
      else if (resp.status === 200) {
        SR(result['result']);
        SL(false);
      } else {
        alert("An unexpected error occured");
        SL(false);
      }

    } catch (error) {
      alert("An unexpected error occured");
      SL(false);
    }
  }


  useEffect(() => {
    console.log(file);
  }, [file]);
  return (
    <View style={[GenStyles.pickWrap]}>



      <Text onPress={pickFile}> <Text style={styles.list}>1.</Text>Upload your statement to begin search.</Text>
      <MaterialCommunityIcons name="file-document-edit" size={48} color="blue" onPress={pickFile} />

      <Text style={styles.filename}>
        {file ?
          file.name : "No document selected"}
      </Text>

      <Text>
        <Text style={styles.list}>2.</Text> Enter your search term. This can be a name, account number, amount, or date.
      </Text>
      <View style={styles.searchcont}>
        <TextInput placeholder="Search for..." value={search} onChangeText={SS} style={styles.search} />
      </View>


      <Text>
        <Text style={styles.list}>3.</Text> Enter the password for encrypted documents. Leave blank for unprotected files.
      </Text>

      <View style={styles.searchcont}>
        <TextInput placeholder="Key(optional)" value={pass} onChangeText={SP} style={styles.search} />
      </View>



      <Text>
        <Text style={styles.list}>4.</Text> Search the document and download the highlighted version
      </Text>
      <View style={styles.space}>
        <Button title={loading ? "Searching...Please, Wait" : "Search"} onPress={submitFile} />
      </View>

      {
        result &&
        <View style={styles.space}>
          <Button title="Download Highlighted" onPress={DowloadHighlighted} />
        </View>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  space: {
    margin: 10
  },
  filename: {
    textAlign: "center",
    marginBottom:20
  },
  search: {
    borderColor: "red"
  },
  searchcont: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    margin: 12,
    borderWidth: 1,
    borderColor: '#ccc',

  },
  list: {
    fontWeight: "900"
  }
})
