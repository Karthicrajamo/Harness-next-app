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
Font.register({
  family: "NotoSansBengaliRegular",
  src: "/fonts/NotoSansBengali-Regular.ttf",
});
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },

  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },

  tableRow: {
    flexDirection: "row",
  },

  tableHeader: {
    backgroundColor: "#f0f0f0",
  },

  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "NotoSansRegular",
  },

  cellText: {
    fontSize: 8,
    textAlign: "center",
  },

  qr: {
    width: 40,
    height: 40,
  },
});

const columns = [
  {
    key: "index",
    header: "S.No",
    width: "6%",
    render: (_: any, index: number) => index + 1,
    fontFamily: "NotoSansRegular",
  },
  {
    key: "qr",
    header: "QR",
    width: "18%",
    isImage: true,
  },
  {
    key: "hindi",
    header: "Label (Hindi)",
    width: "25%",
    field: "label",
    fontFamily: "NotoSansRegular",
  },
  {
    key: "tamil",
    header: "Label (Tamil)",
    width: "25%",
    field: "label2",
    fontFamily: "NotoSansTamil",
  },
  {
    key: "bengali",
    header: "Label (Bengali)",
    width: "26%",
    field: "label3",
    fontFamily: "NotoSansBengaliRegular",
  },
];


export const QrPdf = ({ qrImages }: { qrImages: any[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text
        style={{
          fontSize: 12,
          textAlign: "center",
          marginBottom: 10,
          fontFamily: "NotoSansRegular",
        }}
      >
        QR Code Labels
      </Text>

      <View style={styles.table}>
        {/* HEADER */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          {columns.map((col) => (
            <View
              key={col.key}
              style={[styles.tableCol, { width: col.width }]}
            >
              <Text style={styles.headerText}>{col.header}</Text>
            </View>
          ))}
        </View>

        {/* ROWS */}
        {qrImages.map((row, index) => (
          <View style={styles.tableRow} key={index}>
            {columns.map((col) => (
              <View
                key={col.key}
                style={[styles.tableCol, { width: col.width }]}
              >
                {col.isImage ? (
                  <Image src={row.src} style={styles.qr} />
                ) : (
                  <Text
                    style={[
                      styles.cellText,
                      { fontFamily: col.fontFamily },
                    ]}
                  >
                    {col.render
                      ? col.render(row, index)
                      : row[col.field]}
                  </Text>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

