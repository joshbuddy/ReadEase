import normalize from "./normalize";
import gibberish from 'gibberish-detective'

const detector = gibberish({useCache: false})

function transform(text) {
  const parts = text.split(/(?=[\s.,\/;:!?]+)|(?<=[\s.,\/;:!?])/g)
  for (const i in parts) {
    const normalPart = normalize("NFKD", parts[i]);
    if (normalPart === parts[i]) {
      continue
    }
    if (detector.detect(normalPart)) {
      continue
    }
    parts[i] = normalPart
  }
  return parts.join('')
}


export default transform