

export default function getMatchWords(string,object) {
            for (const key in object) {
              if (string.match(key)) {
                return object[key];
              }
    }
    return false
}
