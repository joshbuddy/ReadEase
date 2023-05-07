import normalize from "./normalize";

function transform(text) {
  const parts = text.split(/(?=[\s.,\/;:!?]+)|(?<=[\s.,\/;:!?])/g)
  for (const i in parts) {
    const normalPart = normalize("NFKD", parts[i]);
    if (normalPart === parts[i]) {
      continue
    }
    parts[i] = normalPart
  }
  return parts.join('')
}


export default transform