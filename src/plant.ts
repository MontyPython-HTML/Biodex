import axios from "axios";
import * as fs from "fs";
import FormData from "form-data";
import { inspect } from "util";

interface PlantSpecies {
  scientificName: string;
  commonNames: string[];
}
interface PlantResult {
  score: number;
  species: PlantSpecies;
}
interface PlantNetResponse {
  results: PlantResult[];
  bestMatch: string;
}

const API_KEY = process.env.PLANT_KEY;
const PROJECT = "all";
const api_url = `https://my-api.plantnet.org/v2/identify/${PROJECT}?api-key=${API_KEY}`;

export async function identifyPlant (image_path: string): Promise<void> {
  if (!API_KEY) {
    console.error("Error: PLANT_KEY environment variable is not set.");
    return;
  }

  const formData = new FormData();
  const data = { organs: ["auto"] };

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      value.forEach(item => formData.append(key, item));
    } else {
      formData.append(key, value);
    }
  }

  try {
    const image_data = fs.createReadStream(image_path);
    formData.append("images", image_data, image_path);
  } catch (error) {
    console.error(`Error reading file ${image_path}:`, error);
    return;
  }

  try {
    const response = await axios.post(api_url, formData, {
      headers: formData.getHeaders()
    });

    const data: PlantNetResponse = response.data;
    const bestResult = data.results.find(
      (r: PlantResult) => r.species.scientificName === data.bestMatch
    );

    const bestMatch = data.bestMatch;
    const commonNames = bestResult?.species.commonNames ?? [];
    const commonName = commonNames[0] ?? "Unknown";

    console.log(`Best match (Scientific): ${bestMatch}`);
    console.log(`Common name: ${commonName}`);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(`API Error Status: ${error.response.status}`);
      console.error(inspect(error.response.data, { depth: null, colors: true }));
    } else {
      console.error("An unknown error occurred during API call:", error);
    }
  }
}
