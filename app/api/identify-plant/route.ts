import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";

interface PlantSpecies {
  scientificName: string
  commonNames: string[]
}
interface PlantResult {
  score: number
  species: PlantSpecies
}
interface PlantNetResponse {
  results: PlantResult[]
  bestMatch: string
}

const API_KEY = process.env.PLANT_KEY;
const PROJECT = "all";

export async function POST(request: NextRequest) {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: "PlantNet API key is not configured" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // Validate MIME type
    const validMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validMimeTypes.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG and PNG are supported." },
        { status: 400 }
      );
    }

    // Validate file size (max 50MB)
    const MAX_FILE_SIZE = 52428800;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_FILE_SIZE} bytes (50MB).` },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { error: "File is empty" },
        { status: 400 }
      );
    }

    // Convert File to Buffer for server-side upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create FormData for PlantNet API using form-data package
    const plantNetFormData = new FormData();
    plantNetFormData.append("images", buffer, {
      filename: file.name || "image.jpg",
      contentType: file.type || "image/jpeg"
    });
    plantNetFormData.append("organs", "auto");

    const api_url = `https://my-api.plantnet.org/v2/identify/${PROJECT}?api-key=${API_KEY}`;

    // Make request to PlantNet API
    const response = await axios.post(api_url, plantNetFormData, {
      headers: {
        ...plantNetFormData.getHeaders()
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: 30000
    });

    const data: PlantNetResponse = response.data;

    if (!data.results || data.results.length === 0) {
      return NextResponse.json(
        { error: "No results from PlantNet API" },
        { status: 404 }
      );
    }

    if (!data.bestMatch) {
      return NextResponse.json(
        { error: "No best match from PlantNet API" },
        { status: 404 }
      );
    }

    const bestResult = data.results.find(
      (r: PlantResult) => r.species.scientificName === data.bestMatch
    );

    const result = bestResult || data.results[0];

    if (!result || !result.species) {
      return NextResponse.json(
        { error: "Invalid result structure from PlantNet API" },
        { status: 500 }
      );
    }

    const bestMatch = data.bestMatch;
    const commonNames = result.species.commonNames ?? [];
    const commonName = commonNames.length > 0 ? commonNames[0] : bestMatch;
    const score = result.score ?? 0;

    return NextResponse.json({
      scientificName: bestMatch,
      commonName: commonName,
      score: score
    });
  } catch (error) {
    console.error("Plant identification error:", error);
    
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(`API Error Status: ${error.response.status}`);
        console.error("API Error Data:", error.response.data);
        
        return NextResponse.json(
          { 
            error: "PlantNet API error",
            status: error.response.status,
            message: error.response.data
          },
          { status: error.response.status }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to identify plant" },
      { status: 500 }
    );
  }
}

