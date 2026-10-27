import { Document, Page, View, Text, Image, StyleSheet, renderToBuffer } from '@react-pdf/renderer';
import { formatMoney, type Quotation } from '@casen/domain';

const styles = StyleSheet.create({
  page: { padding: 42, fontFamily: 'Helvetica', color: '#292b25', fontSize: 10, lineHeight: 1.45 },
  brand: { fontSize: 13, letterSpacing: 3, marginBottom: 20 },
  demo: { fontSize: 8, color: '#765e35', backgroundColor: '#f4efe5', padding: 8, marginBottom: 16 },
  title: { fontFamily: 'Times-Roman', fontSize: 30, lineHeight: 1.2, marginBottom: 12 },
  muted: { fontFamily: 'Helvetica', fontSize: 8, lineHeight: 1.4, color: '#65665e', marginBottom: 14 },
  photo: { height: 175, width: '100%', objectFit: 'cover', marginTop: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderColor: '#ddded6', paddingVertical: 7 },
  total: { fontSize: 14, lineHeight: 1.4, marginTop: 8 },
  notice: { fontSize: 8, backgroundColor: '#f4f3ee', padding: 12, marginTop: 18 },
  footer: { position: 'absolute', bottom: 22, left: 42, right: 42, fontSize: 7, color: '#77786d' },
});

export function QuotationDocument({ quote, imagePath }: { quote: Quotation; imagePath?: string }) {
  return <Document title="Provisional Quotation" author="Casen Doors - development preview">
    <Page size="A4" style={styles.page}>
      <Text style={styles.brand}>CASEN DOORS</Text>
      <Text style={styles.demo}>DEVELOPMENT SAMPLE · Illustrative prices, dimensions and VAT. PDF design awaiting client sample.</Text>
      <Text style={styles.title}>Provisional Quotation</Text>
      <Text style={styles.muted}>Issued {quote.issuedOn} · Expires {quote.expiresOn} · Valid for 90 days</Text>
      {imagePath ? <Image src={imagePath} style={styles.photo} /> : <Text>Reference image unavailable</Text>}
      <Text style={styles.muted}>{quote.imageLabel}</Text>
      <Text style={{ marginBottom: 10 }}>{quote.dimensions.join('\n')}</Text>
      {quote.lines.map((line, index) => <View key={index} style={styles.row} wrap={false}>
        <Text style={{ maxWidth: '78%' }}>{line.name}</Text><Text>{formatMoney(line.amount)}</Text>
      </View>)}
      <View wrap={false}>
        <View style={styles.row}><Text>Subtotal (excluding VAT)</Text><Text>{formatMoney(quote.price.subtotal)}</Text></View>
        <View style={styles.row}><Text>Illustrative VAT ({quote.price.vatBasisPoints / 100}%)</Text><Text>{formatMoney(quote.price.vat)}</Text></View>
        <View style={[styles.row, styles.total]}><Text>Total, excluding shipping</Text><Text>{formatMoney(quote.price.total)}</Text></View>
        <Text style={styles.notice}>{quote.notice}</Text>
      </View>
      <Text style={styles.footer} fixed>Casen Doors · Development sample · Not a confirmed quotation</Text>
    </Page>
  </Document>;
}

export const renderQuotation = (quote: Quotation, imagePath?: string) => renderToBuffer(<QuotationDocument quote={quote} imagePath={imagePath} />);
