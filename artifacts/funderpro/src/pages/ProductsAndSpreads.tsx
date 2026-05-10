import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductsAndSpreads() {
  const forexPairs = [
    { symbol: "EURUSD", spread: "0.1", min: "0.01", max: "100" },
    { symbol: "GBPUSD", spread: "0.2", min: "0.01", max: "100" },
    { symbol: "USDJPY", spread: "0.3", min: "0.01", max: "100" },
    { symbol: "AUDUSD", spread: "0.4", min: "0.01", max: "100" },
    { symbol: "USDCAD", spread: "0.3", min: "0.01", max: "100" },
    { symbol: "EURGBP", spread: "0.6", min: "0.01", max: "100" },
    { symbol: "EURJPY", spread: "0.5", min: "0.01", max: "100" },
  ];

  const indices = [
    { symbol: "US30", spread: "1.0", min: "0.1", max: "50" },
    { symbol: "NAS100", spread: "1.5", min: "0.1", max: "50" },
    { symbol: "SPX500", spread: "1.2", min: "0.1", max: "50" },
    { symbol: "GER30", spread: "1.0", min: "0.1", max: "50" },
    { symbol: "UK100", spread: "1.5", min: "0.1", max: "50" },
  ];

  const commodities = [
    { symbol: "XAUUSD", spread: "1.5", min: "0.01", max: "50" },
    { symbol: "XAGUSD", spread: "2.0", min: "0.01", max: "50" },
    { symbol: "USOIL", spread: "2.5", min: "0.1", max: "50" },
    { symbol: "UKOIL", spread: "2.5", min: "0.1", max: "50" },
  ];

  const crypto = [
    { symbol: "BTCUSD", spread: "15.0", min: "0.01", max: "10" },
    { symbol: "ETHUSD", spread: "2.5", min: "0.1", max: "10" },
    { symbol: "LTCUSD", spread: "1.0", min: "1.0", max: "10" },
  ];

  const renderTable = (data: any[]) => (
    <div className="bg-card border border-white/10 rounded-2xl overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-white/5 border-b border-white/10">
          <tr>
            <th className="p-4 font-semibold text-muted-foreground uppercase tracking-wider text-sm">Instrument</th>
            <th className="p-4 font-semibold text-muted-foreground uppercase tracking-wider text-sm text-right">Typical Spread</th>
            <th className="p-4 font-semibold text-muted-foreground uppercase tracking-wider text-sm text-right">Min Lot</th>
            <th className="p-4 font-semibold text-muted-foreground uppercase tracking-wider text-sm text-right">Max Lot</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="p-4 font-bold text-white">{row.symbol}</td>
              <td className="p-4 text-right text-primary font-medium">{row.spread}</td>
              <td className="p-4 text-right text-muted-foreground">{row.min}</td>
              <td className="p-4 text-right text-muted-foreground">{row.max}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <Layout>
      <div className="pt-24 pb-20 bg-background">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Products & Spreads</h1>
            <p className="text-xl text-muted-foreground">
              Trade a wide range of global markets with raw spreads from 0.0 pips and low commissions.
            </p>
          </div>

          <Tabs defaultValue="forex" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-card border border-white/10 p-1">
                <TabsTrigger value="forex" className="px-6 py-2">Forex</TabsTrigger>
                <TabsTrigger value="indices" className="px-6 py-2">Indices</TabsTrigger>
                <TabsTrigger value="commodities" className="px-6 py-2">Commodities</TabsTrigger>
                <TabsTrigger value="crypto" className="px-6 py-2">Crypto</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="forex">{renderTable(forexPairs)}</TabsContent>
            <TabsContent value="indices">{renderTable(indices)}</TabsContent>
            <TabsContent value="commodities">{renderTable(commodities)}</TabsContent>
            <TabsContent value="crypto">{renderTable(crypto)}</TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
