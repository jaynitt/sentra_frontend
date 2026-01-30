import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Calculator,
} from 'lucide-react';
import * as XLSX from 'xlsx';

/* ======================================================
   UTILS
====================================================== */

function cleanNumber(v: any) {
  if (v === null || v === undefined) return 0;
  if (typeof v === 'number') return v;
  return (
    Number(
      String(v)
        .replace(/,/g, '')
        .replace(/%/g, '')
        .replace(/-/g, '')
        .trim()
    ) || 0
  );
}

function percentileRank(
  values: number[],
  value: number,
  lowerIsBetter = false
) {
  const clean = values.filter(v => !isNaN(v));
  if (!clean.length) return 50;

  const sorted = [...clean].sort((a, b) => a - b);
  const below = sorted.filter(v => v < value).length;
  let pct = (below / sorted.length) * 100;

  if (lowerIsBetter) pct = 100 - pct;
  return Math.max(0, Math.min(100, pct));
}

/* ======================================================
   MAIN PAGE
====================================================== */

export function CFSStocksPage() {
  const [allStocks, setAllStocks] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  /* -------- Load Excel -------- */
 useEffect(() => {
  fetch('/cfs list.xlsx')
    .then(res => res.arrayBuffer())
    .then(buf => {
      const wb = XLSX.read(buf, { type: 'array' });
      const ws = wb.Sheets['Total Score'];
      if (!ws) {
        console.error('Sheet "Total Score" not found');
        return;
      }

      // 1️⃣ Read raw rows
      const rows: any[][] = XLSX.utils.sheet_to_json(ws, {
        header: 1,
        defval: '',
      });

      // 2️⃣ Find EXACT header row (Company column)
      const headerRowIndex = rows.findIndex(row =>
        row.some(cell => String(cell).trim() === 'Company')
      );

      if (headerRowIndex === -1) {
        console.error('Header row with "Company" not found');
        console.log(rows.slice(0, 10)); // debug help
        return;
      }

      const headers = rows[headerRowIndex].map(h =>
        String(h).replace(/\s+/g, ' ').trim()
      );

      // 3️⃣ Parse data rows safely
      const cleaned = rows
        .slice(headerRowIndex + 1)
        .filter(row => row.some(cell => cell !== ''))
        .map(row => {
          const obj: any = {};
          headers.forEach((h, i) => {
            const value = row[i];

            if (h === 'Company') {
                obj.Company = String(value).trim();
                return;
            }

            const headerLower = h.toLowerCase();

            if (
            headerLower.includes('cfs') ||
            (headerLower.includes('total') && headerLower.includes('score'))
            ) {
            obj.CFS_Final = cleanNumber(value);
            return;
            }

            // default numeric columns
            obj[h] = cleanNumber(value);
            });
          return obj;
        })
        .filter(r => r.Company && r.Company.length > 0);

      // 4️⃣ Sort by CFS
      cleaned.sort(
        (a, b) => cleanNumber(b.CFS_Final) - cleanNumber(a.CFS_Final)
      );

      console.log('Loaded rows:', cleaned.length);
      console.log('First row:', cleaned[0]);

      setAllStocks(cleaned);
    })
    .catch(err => {
      console.error('Excel load error:', err);
    });
}, []);


  const displayStocks = useMemo(() => {
    if (!search.trim()) {
      return allStocks.slice(0, 8);
    }

    return allStocks.filter(s =>
      String(s.Company || '')
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [allStocks, search]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1600px] mx-auto px-6 py-6">
        {/* Search */}
        <div className="flex justify-center mb-6">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search company…"
            className="w-full max-w-lg px-4 py-3 rounded-xl bg-black border border-orange-500 text-gray-200 focus:outline-none"
          />
        </div>

        {/* Layout */}
        <div className="flex gap-6 items-start">
          {/* LEFT – 75% */}
          <div className="basis-[75%]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {displayStocks.map((s, i) => (
                <StockCard key={i} stock={s} index={i} />
              ))}
            </div>
          </div>

          {/* RIGHT – 25% */}
          <div className="basis-[25%] sticky top-6">
            <CFSCalculator allStocks={allStocks} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======================================================
   STOCK CARD
====================================================== */

function StockCard({ stock, index }: any) {
  const score = cleanNumber(
  stock.CFS_Final ??
  stock['CFS Final'] ??
  stock['Total Score'] ??
  0
);

  const sentiment =
    score >= 0.7 ? 'Bullish' : score >= 0.5 ? 'Neutral' : 'Bearish';

  const Icon =
    sentiment === 'Bullish'
      ? TrendingUp
      : sentiment === 'Bearish'
      ? TrendingDown
      : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-[#0f0f0f] border border-orange-900/20 rounded-xl p-6"
    >
      <div className="flex justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold">{stock.Company}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <Icon className="w-4 h-4" />
            {sentiment}
          </div>
        </div>
        <div className="text-2xl text-orange-400">
          {score.toFixed(1)}
        </div>
      </div>

      <div className="h-2 bg-black rounded-full overflow-hidden mb-4">
        <div
          className="h-full"
          style={{
            width: `${score*100}%`,
            background:
              sentiment === 'Bullish'
                ? 'linear-gradient(to right, #22c55e, #4ade80)'
                : sentiment === 'Bearish'
                ? 'linear-gradient(to right, #ef4444, #f87171)'
                : 'linear-gradient(to right, #eab308, #fde047)',
          }}
        />
      </div>

      <div className="grid grid-cols-2 text-sm text-gray-400 gap-y-1">
        <div>Growth</div>
        <div>{stock['Growth Score']?.toFixed(1)}</div>
        <div>Return</div>
        <div>{stock['Return Score']?.toFixed(1)}</div>
        <div>Leverage</div>
        <div>{stock['Leverage Score']?.toFixed(1)}</div>
        <div>Valuation</div>
        <div>{stock['Valuation Score']?.toFixed(1)}</div>
      </div>
    </motion.div>
  );
}

/* ======================================================
   CALCULATOR
====================================================== */

function Section({ title, children }: any) {
  return (
    <div>
      <h4 className="text-sm text-orange-400 mb-2 uppercase tracking-wide">
        {title}
      </h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Field({ label, k, inputs, setInputs }: any) {
  return (
    <input
      type="number"
      step="0.01"
      placeholder={label}
      value={inputs[k] ?? ''}
      onChange={e =>
        setInputs({ ...inputs, [k]: Number(e.target.value) })
      }
      className="w-full px-3 py-2 rounded-lg bg-black border border-orange-900/30 text-gray-200 focus:outline-none focus:border-orange-400"
    />
  );
}

function CFSCalculator({ allStocks }: any) {
  const [inputs, setInputs] = useState<any>({});

  const values = (key: string) =>
    allStocks.map((s: any) => cleanNumber(s[key]));

  const avg = (arr: number[]) =>
    arr.reduce((a, b) => a + b, 0) / arr.length;

  const growth = avg([
    percentileRank(values('5Y Sales Mean'), inputs.sales),
    percentileRank(values('5Y EBITDA CAGR'), inputs.ebitda),
    percentileRank(values('5Y Net Profit CAGR'), inputs.netprofit),
  ]);

  const returns = avg([
    percentileRank(values('5Y Mean ROCE'), inputs.roce),
    percentileRank(values('5Y Mean ROE'), inputs.roe),
    percentileRank(values('5Y Mean ROA'), inputs.roa),
  ]);

  const leverage = avg([
    percentileRank(values('5Y Debt to Equity Mean'), inputs.de, true),
    percentileRank(values('5Y Debt to EBITDA Mean'), inputs.debtEbitda, true),
    percentileRank(values('5Y Debt to Total Assets Mean'), inputs.debtAssets, true),
    percentileRank(values('ICR Ratio'), inputs.icr),
  ]);

  const valuation = avg([
    percentileRank(values('Current PE Ratio'), inputs.pe, true),
    percentileRank(values('Current P/B Ratio'), inputs.pb, true),
  ]);

  const cfs =
    0.25 * growth +
    0.25 * returns +
    0.25 * leverage +
    0.25 * valuation;

  return (
    <div className="bg-[#0f0f0f] border border-orange-900/20 rounded-xl p-4 h-[80vh] flex flex-col">
      <h3 className="flex items-center gap-2 mb-4 text-lg">
        <Calculator className="text-orange-400" />
        CFS Calculator
      </h3>

      <div className="flex-1 overflow-y-auto space-y-6 pr-1">
        <Section title="Growth">
          <Field label="Sales CAGR" k="sales" inputs={inputs} setInputs={setInputs} />
          <Field label="EBITDA CAGR" k="ebitda" inputs={inputs} setInputs={setInputs} />
          <Field label="Net Profit CAGR" k="netprofit" inputs={inputs} setInputs={setInputs} />
        </Section>

        <Section title="Returns">
          <Field label="ROCE" k="roce" inputs={inputs} setInputs={setInputs} />
          <Field label="ROE" k="roe" inputs={inputs} setInputs={setInputs} />
          <Field label="ROA" k="roa" inputs={inputs} setInputs={setInputs} />
        </Section>

        <Section title="Leverage">
          <Field label="Debt / Equity" k="de" inputs={inputs} setInputs={setInputs} />
          <Field label="Debt / EBITDA" k="debtEbitda" inputs={inputs} setInputs={setInputs} />
          <Field label="Debt / Assets" k="debtAssets" inputs={inputs} setInputs={setInputs} />
          <Field label="Interest Coverage" k="icr" inputs={inputs} setInputs={setInputs} />
        </Section>

        <Section title="Valuation">
          <Field label="PE Ratio" k="pe" inputs={inputs} setInputs={setInputs} />
          <Field label="P/B Ratio" k="pb" inputs={inputs} setInputs={setInputs} />
        </Section>
      </div>

      <div className="pt-4 mt-4 border-t border-orange-900/30 text-center">
        <div className="text-sm text-gray-400 mb-1">
          Composite Fundamental Score
        </div>
        <div className="text-3xl font-semibold text-orange-400">
          {isNaN(cfs) ? '--' : cfs.toFixed(1)}
        </div>
      </div>
    </div>
  );
}
