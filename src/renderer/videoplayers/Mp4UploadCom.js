import * as Xray from 'x-ray'
import * as axios from 'axios'
// const x = require('x-ray')()
// const axios = require('axios')
// const _ = require('lodash')

const x = Xray()

const getVideo = async (url) => {
  console.log(url)
  const response = await axios.get(url)
  // console.log(response)
  return new Promise((resolve, reject) => {
    x(response.data, {
      script: ['script']
    })((err, obj) => {
      if (err) {
        reject(err)
      }
      // console.log(obj)
      const regexDataDecoder = /return p\}(?:\('(.*)\\,)([0-9]+),([0-9]+),(?:'(.*)'\.split)/
      const regexGetVideoAndPoster = /(?:"file":"(.*)","image":"(.*)","hei)/igm

      const script = obj.script[6]
      console.log(script)
      const encodedData = regexDataDecoder.exec(obj.script[6])
      console.log(encodedData)
      const arg1 = encodedData[1]
      const arg2 = encodedData[2]
      const arg3 = encodedData[3]
      const arg4 = encodedData[4].split('|')

      const decodedData = decodeString(arg1, arg2, arg3, arg4)

      const urlsRegex = regexGetVideoAndPoster.exec(decodedData)

      const url = urlsRegex[1]
      const poster = urlsRegex[2]
      const out = {
        poster: poster,
        url: url
      }
      resolve(out)
    })
  })
}

const decodeString = (p, a, c, k) => {
  while (c--) {
    if (k[c]) {
      p = p.replace(new RegExp('\\b' + c.toString(a) + '\\b', 'g'), k[c])
    }
  }
  return p
}

// getVideo('http://www.mp4upload.com/embed-mgjd92cvnoxc.html').then(el => console.log(el)).catch(err => console.log(err))

export default getVideo
