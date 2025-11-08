import wtf from "wtf_wikipedia";

export async function GetPlantInfo(plantName: string): Promise<void> {
  const doc = await wtf.fetch(plantName, 'en')
    .catch((error) => { console.error(error) });
  if (doc) {
    console.log(doc.sentences()[0].text());
  } else {
    console.log("could not find Wikipedia page");
  }
}
