export async function GET({ params }) {
  const [id, image] = params.id.split("-");
  const url = `https://api.wgw.lol/api/ethscriptions/${image === "0" ? 0 : id}/data`;

  try {
    return fetch(`${url}/data?noscale=1`);
  } catch (e) {
    return fetch(url);
  }
}
