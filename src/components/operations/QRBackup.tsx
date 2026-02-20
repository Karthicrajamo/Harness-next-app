import {
  Document,
  Page,
  View,
  Image,
  Text,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "NotoSansTamil",
  src: "/fonts/NotoSansTamil-Regular.ttf",
});
Font.register({
  family: "NotoSansRegular",
  src: "/fonts/NotoSans-Regular.ttf",
});
const styles = StyleSheet.create({
  page: {
    padding: 30,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    width: "30%",
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
    fontFamily: "NotoSansRegular",
    // fontFamily: "NotoSansTamil",
  },
  label2: {
    fontSize: 8,
    marginTop: 8,
    fontWeight: "bold",
    textAlign: "center",
    // fontFamily: "NotoSansRegular",
    fontFamily: "NotoSansTamil",
  },
});

export const QrPdf = ({ qrImages }: { qrImages: any[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {qrImages.map((q) => (
        <View key={q.label} style={styles.card}>
          <Image src={q.src} style={styles.qr} />
          <Text style={styles.label}>{q.label}</Text>
          <Text style={styles.label2}>{q.label2}</Text>
        </View>
      ))}
    </Page>
  </Document>
);
