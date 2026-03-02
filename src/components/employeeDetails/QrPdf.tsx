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
    padding: 25,
    fontSize: 9,
  },
  title: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 15,
    textDecoration: "underline",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    width: "32.33%",
    border: "1px solid #000",
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
    margin: 2,
    height: 60, // Set a fixed height to ensure rows look even
  },
  left: {
    flex: 1,
  },
  row: {
    marginBottom: 2,
    fontSize: 7,
  },
  label: {
    fontSize: 6,
    // fontWeight: "bold",
  },
  qr: {
    width: 45,
    height: 45,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 8,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

export const EmployeeQrPdf = ({ employees }: { employees: any[] }) => {
  // CONFIGURATION
  const itemsPerRow = 3;
  const rowsPerPage = 11; // Change this to set how many rows you want per page
  const itemsPerPage = itemsPerRow * rowsPerPage;

  // Function to split array into chunks
  const chunks = [];
  for (let i = 0; i < employees.length; i += itemsPerPage) {
    chunks.push(employees.slice(i, i + itemsPerPage));
  }

  return (
    <Document>
      {chunks.map((chunk, index) => (
        <Page key={index} size="A4" style={styles.page}>
          <Text style={styles.title}>EMPLOYEE DETAILS REPORT</Text>

          <View style={styles.grid}>
            {chunk.map((emp) => (
              <View key={emp.employeeNo} style={styles.card}>
                <View style={styles.left}>
                  <Text style={styles.row}>
                    <Text style={styles.label}>Card No: </Text>
                    {emp.employeeNo}
                  </Text>
                  <Text style={styles.row}>
                    <Text style={styles.label}>Emp Name: </Text>
                    {emp.employeeName}
                  </Text>
                  <Text style={styles.row}>
                    <Text style={styles.label}>Dept: </Text>
                    {emp.department}
                  </Text>
                  <Text style={styles.row}>
                    <Text style={styles.label}>Designation: </Text>
                    {emp.designation}
                  </Text>
                </View>

                <Image src={emp.src} style={styles.qr} />
              </View>
            ))}
          </View>

          {/* Optional Page Number */}
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
            `${pageNumber} / ${totalPages}`
          )} fixed />
        </Page>
      ))}
    </Document>
  );
};