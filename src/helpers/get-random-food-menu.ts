export const getFiveRandomFoodMenus = (menus: string[]) =>{
  for (let i = menus.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [menus[i], menus[j]] = [menus[j], menus[i]];
  }
  const selectedMenus = menus.slice(0, 5);

  return selectedMenus.join(", ");
}
