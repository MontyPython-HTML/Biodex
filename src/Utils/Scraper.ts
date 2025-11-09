import wtf from "wtf_wikipedia";

export async function GetPlantInfo(plantName: string): Promise<void> {
  const doc = await wtf.fetch(plantName)
    .catch((error) => { console.error(error); });

  if (doc) {
    const singleDoc = Array.isArray(doc) ? doc[0] : doc;
    if (singleDoc && singleDoc.sentences) {
      console.log(singleDoc.sentences()[0].text());
    }
  } else {
    console.log("Could not find a valid Wikipedia document.");
  }
}
