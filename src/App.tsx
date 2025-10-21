import { useState } from "react";
import "./App.css";

// Shadcn components
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function App() {
  const [qty, setQty] = useState<number>(1);
  const [destination, setDestination] = useState<string>("");
  const [metodePembayaran, setMetodePembayaran] = useState<string>("COD");
  const [hasil, setHasil] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { qty, destination, metodePembayaran: metodePembayaran };

    try {
      const res = await fetch(
        "https://tools.malika.ai/api/func/run/avenavit_total_harga_halip_h0h2gmkiymkgpnmjri2i",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      setHasil(`Total harga: Rp${data.result?.total_price?.total}`);
    } catch (err) {
      setHasil("Gagal mengambil data ongkir 😢");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-muted/20 p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">
        Ebliethos Cek Ongkir
      </h1>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Cek Harga Ongkir</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="qty">Jumlah Barang</Label>
              <Input
                id="qty"
                type="number"
                value={qty}
                min={1}
                onChange={(e) => setQty(parseInt(e.target.value))}
                required
              ></Input>
            </div>

            <div className="space-y-1">
              <Label htmlFor="destination">Tujuan</Label>
              <Input
                id="destination"
                type="text"
                placeholder="Misal: Gamping, Sleman"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              ></Input>
            </div>

            <div className="space-y-1">
              <Label>Metode Pembayaran</Label>
              <Select
                value={metodePembayaran}
                onValueChange={setMetodePembayaran}
              >
                <SelectTrigger className="text-white">
                  <SelectValue placeholder="Pilih metode pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="COD">COD</SelectItem>
                  <SelectItem value="Transfer">Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Cek Harga
            </Button>
          </form>

          {hasil && (
            <div className="mt-4 bg-green-100 text-green-800 px-4 py-2 rounded-md text-center text-sm">
              {hasil}
            </div>
          )}
        </CardContent>
      </Card>
      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
        <span>Powered by</span>
        <a
          href="https://malika.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-inherit text-inherit hover:text-inherit"
        >
          Malika.ai
        </a>
      </div>
    </div>
  );
}

export default App;
