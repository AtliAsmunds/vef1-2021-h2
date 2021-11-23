export async function fetchData() {
  let json;
  // window.localStorage.clear();
  if (window.localStorage.getItem("data") === null) {
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
    window.localStorage.setItem("data", JSON.stringify(json));
    return json;
  } else {
    json = window.localStorage.getItem("data");
  }
  return JSON.parse(json);
}
