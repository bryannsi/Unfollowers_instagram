import { writeFile } from "fs/promises";

// Función para guardar los resultados en un archivo
async function saveToFile(filename, data) {
  try {
    await writeFile(filename, data.join("\n"), "utf-8");
    console.log(`Datos guardados en ${filename}`);
  } catch (error) {
    console.error(`Error al guardar el archivo: ${error.message}`);
  }
}

export { saveToFile };
