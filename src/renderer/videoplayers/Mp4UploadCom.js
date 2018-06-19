import grabbi from 'grabbi'

export default async (url) => {
  const {doc} = await grabbi(url)
  const obj = doc.getElementsByTagName('script')

  const regexDataDecoder = /return p\}(?:\('(.*)',)([0-9]+),([0-9]+),(?:'(.*)'\.split)/
  const regexGetVideoAndPoster = /(?:"file":"(.*)","image":"(.*)","hei)/igm

  const script = obj[5].text
  const encodedData = regexDataDecoder.exec(script)

  const arg1 = encodedData[1]
  const arg2 = encodedData[2]
  const arg3 = encodedData[3]
  const arg4 = encodedData[4].split('|')

  const decodedData = decodeString(arg1, arg2, arg3, arg4)

  const urlsRegex = regexGetVideoAndPoster.exec(decodedData)

  return {
    poster: urlsRegex[2],
    file: urlsRegex[1]
  }
}

const decodeString = (p, a, c, k) => {
  while (c--) {
    if (k[c]) {
      p = p.replace(new RegExp('\\b' + c.toString(a) + '\\b', 'g'), k[c])
    }
  }
  return p
}
