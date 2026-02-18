import {
  Document,
  Page,
  View,
  Image,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  card: {
    width: "16%", // 2 columns
    // height: "33.33%",  // 3 rows
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #ccc",
  },

  qr: {
    width: 50,
    height: 50,
  },

  label: {
    fontSize: 8,
    marginTop: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export const CommonQrPdfGenerator = ({ qrImages }: { qrImages: any[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {qrImages.map((q) => (
        <View key={q.id} style={styles.card}>
          <Image src={q.src} style={styles.qr} />
          <Text style={styles.label}>{q.label}</Text>
        </View>
      ))}
    </Page>
  </Document>
);
