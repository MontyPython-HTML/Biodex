export interface PlantIdentificationResult {
  scientificName: string
  commonName: string
  score: number
}

// Client-side function that calls the API route
export async function identifyPlant (imageFile: File): Promise<PlantIdentificationResult | null> {
  if (!imageFile || !(imageFile instanceof File)) {
    console.error("Invalid file provided");
    return null;
  }

  // Validate MIME type (API only accepts image/jpeg or image/png)
  const validMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!validMimeTypes.includes(imageFile.type.toLowerCase())) {
    console.error(`Invalid file type: ${imageFile.type}. Only JPEG and PNG are supported.`);
    return null;
  }

  // Validate file size (max 50MB = 52428800 bytes)
  const MAX_FILE_SIZE = 52428800;
  if (imageFile.size > MAX_FILE_SIZE) {
    console.error(`File too large: ${imageFile.size} bytes. Maximum size is ${MAX_FILE_SIZE} bytes (50MB).`);
    return null;
  }

  if (imageFile.size === 0) {
    console.error("File is empty");
    return null;
  }

  try {
    // Send file to our API route
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch("/api/identify-plant", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`API Error Status: ${response.status}`);
      console.error("API Error Data:", errorData);
      if (response.status === 403) {
        console.error("403 Forbidden - Check your PLANT_KEY in .env file");
      }
      return null;
    }

    const data: PlantIdentificationResult = await response.json();
    return data;
  } catch (error) {
    console.error("Error identifying plant:", error);
    return null;
  }
}