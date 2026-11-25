const CAL = "https://nfs.faireconomy.media/ff_calendar_thisweek.json";
const RSS = "https://news.google.com/rss/search?q=gold+price+OR+federal+reserve+OR+US+dollar+OR+treasury+yields+when:1d&hl=en-US&gl=US&ceid=US:en";
exports.handler = async (e) => {
  const cal = (e.queryStringParameters || {}).src === "cal";
  try {
    const r = await fetch(cal ? CAL : RSS, { headers: { "User-Agent": "Mozilla/5.0" } });
    return { statusCode: r.status, headers: { "content-type": cal ? "application/json" : "text/xml", "cache-control": "public, max-age=300" }, body: await r.text() };
  } catch (err) {
    return { statusCode: 502, body: String(err) };
  }
};
