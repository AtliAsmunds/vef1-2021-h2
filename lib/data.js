export async function fetchData() {
  let json;
  try {
    const result = await fetch('../data.json');

    if (!result.ok) {
      throw new Error('Result not ok');
    }

    json = await result.json();
    console.log(json);
  } catch (e) {
    console.warn('Unable to fetch data', e);
    return null;
  }
  return json;
}
// export async function categoryCount(cats){
//   const flokkar = await fetch('../data.json');
//   const counter

// }
