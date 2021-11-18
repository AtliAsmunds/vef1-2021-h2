export async function fetchData() {
  let json;
  window.localStorage.clear();
  if (window.localStorage.getItem("items") === null) {
    try {
      const result = await fetch("../data.json");

      if (!result.ok) {
        throw new Error("Result not ok");
      }

      json = await result.json();
      console.log(json);
    } catch (e) {
      console.warn("Unable to fetch data", e);
      return null;
    }
    console.log(json.items);
    window.localStorage.setItem("items", JSON.stringify(json.items));
    return json;
  } else {
    json = window.localStorage.getItem("items");
  }
  return JSON.parse(json);
}
