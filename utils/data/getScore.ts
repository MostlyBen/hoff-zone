// Returns the number of items the user has checked off on the site

const getScore = (): number => {
  if (typeof window === 'undefined') { return 0 }

  const checkedItems = localStorage.getItem("checkedItems");
  try {
    const itemsObject = JSON.parse(checkedItems);

    let total = 0;
    for (var page of Object.keys(itemsObject)) {
      if (Array.isArray(itemsObject[page])) {
        total += itemsObject[page].length;
      }
    }
  
    return total;

  } catch (err) {
    console.warn("Error getting score:", err);
    return -1;
  }
}

export default getScore