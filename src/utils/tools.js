// Fonction générique pour extraire l'ID d'une URL
export const extractIdFromUrl = (url) => {
  if (typeof url !== 'string') {
      console.error("La valeur passée à extractIdFromUrl n'est pas une chaîne:", url);
      return null;
  }
  return url.split("/").pop(); // Prend la dernière partie de l'URL
};
