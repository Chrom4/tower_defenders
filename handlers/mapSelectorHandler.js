export const renderMapList = (game) => {
  const maps = game.allMaps;
  const mapSelectotList = document.getElementById("map-selector");
  mapSelectotList.innerHTML = "";

  for (const mapIndex in maps) {
    const mapSelectorButton = document.createElement("button");
    mapSelectorButton.textContent = mapIndex;
    mapSelectorButton.onclick = () => {
      game.changeMap(mapIndex);
    };
    mapSelectotList.appendChild(mapSelectorButton);
  }
};
