import wtf from "wtf_wikipedia";

export async function GetPlantInfo(plantName: string): Promise<string | null> {
  try {
    const doc = await wtf.fetch(plantName);
    if (doc) {
      const singleDoc = Array.isArray(doc) ? doc[0] : doc;
      if (singleDoc && singleDoc.sentences) {
        const sentences = singleDoc.sentences();
        if (sentences && sentences.length > 0) {
          // Get first 2-3 sentences for a good description
          const description = sentences.slice(0, 2).map(s => s.text()).join(' ').trim();
          return description || null;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching plant info:", error);
    return null;
  }
}
