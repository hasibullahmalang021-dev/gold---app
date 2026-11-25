const OK_R = ["5d", "10d", "60d"], OK_I = ["15m", "1h"];
exports.handler = async (e) => {
  const q = e.queryStringParameters || {};
  const range = OK_R.includes(q.range) ? q.range : "10d";
  const itv = OK_I.includes(q.interval) ? q.interval : "15m";
  try {
    const r = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/GC=F?range=${range}&interval=${itv}`,
      { headers: { "User-Agent": "Mozilla/5.0" } });
    return { statusCode: r.status, headers: { "content-type": "application/json" }, body: await r.text() };
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: String(err) }) };
  }
};
