import axios from "axios";
import * as fs from "fs";
import FormData from "form-data";
import { inspect } from "util";

const API_KEY = process.env.PLANT_KEY;
const PROJECT = "all";
const api_url = `https://my-api.plantnet.org/v2/identify/${PROJECT}?api-key=${API_KEY}`;
// const image_path = "../media/test.jpg";

export async function identifyPlant (image_path: string) {
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
    // console.log(response.status);
    // console.log(inspect(response.data, { depth: null, colors: true }));

    const data = response.data;
    const bestResult = data.results.find(
      r => r.species.scientificName === data.bestMatch
    );

    const bestMatch = data.bestMatch;
    const commonNames = bestResult?.species.commonNames ?? [];
    const commonName = commonNames[0] ?? "Unknown";

    console.log(`Best match: ${bestMatch}`);
    console.log(`Common name: ${commonName}`);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.status);
      console.log(inspect(error.response.data, { depth: null, colors: true }));
    } else {
      console.error("An unknown error occurred:", error);
    }
  }
}

// identifyPlant("../media/image_2.jpeg");
