import { readFile } from "fs/promises";

// Función asíncrona para leer y procesar un solo conjunto de datos
async function processRawData(filePath) {
  try {
    const rawData = await readFile(filePath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error("Error al leer o procesar el archivo:", error);
    return null;
  }
}

export { processRawData }
