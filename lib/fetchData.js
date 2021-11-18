export async function fetchData() {
  let json;

  if (window.localStorage.getItem("items") === null) {
    try {
      const result = await fetch("../data.json");

      if (!result.ok) {
        throw new Error("Result not ok");
      }

      json = await result.json();
    } catch (e) {
      console.warn("Unable to fetch data", e);
      return null;
    }

    window.localStorage.setItem("items", json);
    
    return json;
  } else {
    return window.localStorage.getItem("items");
  }
}
