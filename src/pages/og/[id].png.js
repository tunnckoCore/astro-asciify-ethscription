export async function GET({ params, request }) {
  const url = new URL(request.url);
  const image = url.searchParams.get("image");

  return fetch(
    `https://api.wgw.lol/api/ethscriptions/${image === "0" ? 0 : params.id}/data?noscale=1`,
  );
  // 1092299
}
