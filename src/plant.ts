import axios from "axios";

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

const API_KEY = process.env.NEXT_PUBLIC_PLANT_KEY;
const PROJECT = "all";
const api_url = `https://my-api.plantnet.org/v2/identify/${PROJECT}?api-key=${API_KEY}`;

export interface PlantIdentificationResult {
  scientificName: string;
  commonName: string;
  score: number;
}

export async function identifyPlant (imageFile: File): Promise<PlantIdentificationResult | null> {
  if (!API_KEY) {
    console.error("Error: NEXT_PUBLIC_PLANT_KEY environment variable is not set.");
    return null;
  }

  const formData = new FormData();
  formData.append("images", imageFile);
  formData.append("organs", "auto");

  try {
    const response = await axios.post(api_url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });

    const data: PlantNetResponse = response.data;
    const bestResult = data.results.find(
      (r: PlantResult) => r.species.scientificName === data.bestMatch
    );

    const bestMatch = data.bestMatch;
    const commonNames = bestResult?.species.commonNames ?? [];
    const commonName = commonNames[0] ?? "Unknown";
    const score = bestResult?.score ?? 0;

    return {
      scientificName: bestMatch,
      commonName: commonName,
      score: score
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(`API Error Status: ${error.response.status}`);
      console.error("API Error Data:", error.response.data);
    } else {
      console.error("An unknown error occurred during API call:", error);
    }
    return null;
  }
}
