import { processRawData } from "./readFile.js";
import { saveToFile } from "./writeFile.js";

function extractUrls(data, keyName) {
  // Determinar si jsonData es un array o si debe extraerse usando la clave
  const dataArray = Array.isArray(data) ? data : data[keyName];

  // Validar que sea un array (incluso si está vacío)
  if (!Array.isArray(dataArray)) {
    console.error(
      `Error: '${keyName}' no es un array válido en los datos proporcionados.`
    );
    return [];
  }

  // Extraer los valores de usuario desde 'string_list_data', manejando el caso de array vacío
  return dataArray.flatMap(
    (item) => item.string_list_data?.map((entry) => entry.href) || []
  );
}

// Función para encontrar usuarios que sigues pero no te siguen
function findUnfollowedUsers(followingData, followersData) {
  if (!followingData || !followersData) {
    console.error("Los datos de seguidores o seguidos no son válidos.");
    return [];
  }

  const followersSet = new Set(followersData);
  return followingData.filter((user) => !followersSet.has(user));
}

// Ejecutar la lógica
async function main() {
  try {
    //lectura en paralelo
    const [followingData, followersData] = await Promise.all([
      processRawData("./following.json"),
      processRawData("./followers.json"),
    ]);

    if (followingData && followersData) {
      // Extraer listas de usuarios seguidos y seguidores
      const followingList = extractUrls(
        followingData,
        "relationships_following"
      );
      const followersList = extractUrls(followersData);

      // Encontrar usuarios que sigues pero no te siguen
      const unfollowedUsers = findUnfollowedUsers(followingList, followersList);

      console.dir(unfollowedUsers);
      // Guardar en archivo
      await saveToFile("unfollowed_users.txt", unfollowedUsers);
    }
  } catch (err) {
    console.error("Error procesando datos:", err);
  }
}

main();
