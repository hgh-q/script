const languageAll = {
  阿拉伯语: 'ar',
  德语: 'de',
  英语: 'en',
  西班牙语: 'es',
  法语: 'fr',
  印地语: 'hi',
  印度尼西亚语: 'id',
  意大利语: 'it',
  日语: 'ja',
  韩语: 'ko',
  荷兰语: 'nl',
  葡萄牙语: 'pt',
  俄语: 'ru',
  泰语: 'th',
  越南语: 'vi',
  简体中文: 'zh-CHS',
  繁体中文: 'zh-CHT',
  南非荷兰语: 'af',
  阿姆哈拉语: 'am',
  阿塞拜疆语: 'az',
  白俄罗斯语: 'be',
  保加利亚语: 'bg',
  孟加拉语: 'bn',
  波斯尼亚语: 'bs',
  加泰隆语: 'ca',
  宿务语: 'ceb',
  科西嘉语: 'co',
  捷克语: 'cs',
  威尔士语: 'cy',
  丹麦语: 'da',
  希腊语: 'el',
  世界语: 'eo',
  爱沙尼亚语: 'et',
  巴斯克语: 'eu',
  波斯语: 'fa',
  芬兰语: 'fi',
  斐济语: 'fj',
  弗里西语: 'fy',
  爱尔兰语: 'ga',
  苏格兰盖尔语: 'gd',
  加利西亚语: 'gl',
  古吉拉特语: 'gu',
  豪萨语: 'ha',
  夏威夷语: 'haw',
  希伯来语: 'he',
  克罗地亚语: 'hr',
  海地克里奥尔语: 'ht',
  匈牙利语: 'hu',
  亚美尼亚语: 'hy',
  伊博语: 'ig',
  冰岛语: 'is',
  爪哇语: 'jw',
  格鲁吉亚语: 'ka',
  哈萨克语: 'kk',
  高棉语: 'km',
  卡纳达语: 'kn',
  库尔德语: 'ku',
  柯尔克孜语: 'ky',
  拉丁语: 'la',
  卢森堡语: 'lb',
  老挝语: 'lo',
  立陶宛语: 'lt',
  拉脱维亚语: 'lv',
  马尔加什语: 'mg',
  毛利语: 'mi',
  马其顿语: 'mk',
  马拉雅拉姆语: 'ml',
  蒙古语: 'mn',
  马拉地语: 'mr',
  马来语: 'ms',
  马耳他语: 'mt',
  白苗语: 'mww',
  缅甸语: 'my',
  尼泊尔语: 'ne',
  挪威语: 'no',
  齐切瓦语: 'ny',
  克雷塔罗奥托米语: 'otq',
  旁遮普语: 'pa',
  波兰语: 'pl',
  普什图语: 'ps',
  罗马尼亚语: 'ro',
  信德语: 'sd',
  僧伽罗语: 'si',
  斯洛伐克语: 'sk',
  斯洛文尼亚语: 'sl',
  萨摩亚语: 'sm',
  修纳语: 'sn',
  索马里语: 'so',
  阿尔巴尼亚语: 'sq',
  塞尔维亚语: 'sr-Cyrl',
  // 塞尔维亚语: 'sr-Latn',
  塞索托语: 'st',
  巽他语: 'su',
  瑞典语: 'sv',
  斯瓦希里语: 'sw',
  泰米尔语: 'ta',
  泰卢固语: 'te',
  塔吉克语: 'tg',
  菲律宾语: 'tl',
  克林贡语: 'tlh',
  汤加语: 'to',
  土耳其语: 'tr',
  塔希提语: 'ty',
  乌克兰语: 'uk',
  乌尔都语: 'ur',
  乌兹别克语: 'uz',
  南非科萨语: 'xh',
  意第绪语: 'yi',
  约鲁巴语: 'yo',
  尤卡坦玛雅语: 'yua',
  粤语: 'yue',
  南非祖鲁语: 'zu',
  自动识别: 'auto'
}

/**
 * ! 1. 将locale拷贝一份，  新建locale文件夹，下只存放zh-CHS.json文件（zh_cn.json文件名改为zh-CHS.json即可）
 * ? 2. 将该文件放到scripts文件夹下（scripts和src同级别）
 * ? 3. 在终端执行npm i youdao-node 下载包
 * ? 4. 在 translationLanguageList 变量存放要转换的语言，格式为 languageAll[type]  type为languageAll中的key（键）
 * ? 5. 查看是否可以正常使用
 */

const { default: youdao } = require('youdao-node')
const fs = require('fs')
const path = require('path')

// 翻译文件地址
const localesFileAddress = path.join(__dirname, '../src/language/locale')
// 源语言
const courseLanguage = languageAll['简体中文']
// 翻译语言列表
const translationLanguageList = [languageAll['英语']]

youdao.config({
  appKey: '0cdf28866a0be7dc',
  appSecret: 'oJAcI2x9PIfG95pM2RLn4lgGWj84ZAd6'
})

// 创建并写入文件
function writeFile (filePath, data) {
  return fs.writeFileSync(filePath, data, {
    encoding: 'utf-8'
  })
}

// 读取文件 不存在则创建
function readFile (filePath) {
  let data = null
  try {
    data = fs.readFileSync(filePath, {
      encoding: 'utf-8'
    })
  } catch (e) {
    writeFile(filePath, JSON.stringify({ type: '' }))
    data = fs.readFileSync(filePath, {
      encoding: 'utf-8'
    })
  }

  // if (data === '') data = '{}'
  data = JSON.parse(data)
  return data
}

async function translateTo (content, from, to) {
  try {
    const res = await youdao.translate({
      content,
      from,
      to
    })
    return res.translation[0] || content
  } catch (e) {
    console.log(`翻译出现问题：${e}`)
    return content
  }
}

// 转换某语言为其他语言
async function translateZhToOther (from, to) {
  const goalFileData = {
    type: to
  }
  let errcount = 0
  const fromFileData = readFile(path.join(localesFileAddress, `${from}.json`))
  const toFileData = readFile(path.join(localesFileAddress, `${to}.json`))
  for (const item of Object.keys(fromFileData)) {
    if (item === 'type') continue
    if (!Object.keys(goalFileData).includes(item)) goalFileData[item] = {}
    if (!Object.keys(toFileData).includes(item)) goalFileData[item] = {}

    for (const key of Object.keys(fromFileData[item])) {
      if (Object.keys(goalFileData[item]).includes(key)) {
        goalFileData[item][key] = toFileData[key]
      } else {
        const postTranslationalData = await translateTo(fromFileData[item][key], from, to)
        if (typeof postTranslationalData === 'string') {
          goalFileData[item][key] = postTranslationalData
        } else {
          console.log(`翻译${fromFileData[item][key]}出现问题`)
          goalFileData[item][key] = '翻译出现问题'
          errcount++
        }
      }
    }
  }

  await writeFile(path.join(localesFileAddress, `${to}.json`), JSON.stringify(goalFileData))
  return `${from}转${to}：${errcount === 0 ? '全部翻译成功' : `翻译出现问题${errcount}个`}`
}

for (const language of translationLanguageList) {
  new Promise((resolve) => {
    const res = translateZhToOther(courseLanguage, language)
    resolve(res)
  }).then((res) => {
    console.log(res)
  })
}

// // 获取未被翻译的数据列表
// const getUnTranslated = (source, goal) => {
//   const goalKeys = new Set(Object.keys(goal))
//   return Object.keys(source).filter((key) => !goalKeys.has(key))
// }

// // 转换某语言为其他语言
// async function translateZhToOther (from, to) {
//   const goalFileData = {}
//   let errcount = 0
//   const fromFileData = readFile(path.join(localesFileAddress, `${from}.json`))
//   if (Object.keys(fromFileData).length === 0) {
//     return `源语言${from}.json，不存在待翻译内容`
//   }
//   const toFileData = readFile(path.join(localesFileAddress, `${to}.json`))
//   const toFileDataKeys = Object.keys(toFileData)
//   const pendingTranslation = getUnTranslated(fromFileData, toFileData)
//   if (pendingTranslation.length === 0) {
//     return `目标语言${from}.json，不存在待翻译内容`
//   }
//   for (const key of Object.keys(fromFileData)) {
//     if (toFileDataKeys.includes(key)) {
//       goalFileData[key] = toFileData[key]
//     } else {
//       const postTranslationalData = await translateTo(fromFileData[key], from, to)
//       if (typeof postTranslationalData === 'string') {
//         goalFileData[key] = postTranslationalData
//       } else {
//         console.log(`翻译${goalFileData[key]}出现问题`)
//         goalFileData[key] = '翻译出现问题'
//         errcount++
//       }
//     }
//   }

//   await writeFile(path.join(localesFileAddress, `${to}.json`), JSON.stringify(goalFileData))
//   return `${from}转${to}：${errcount === 0 ? '全部翻译成功' : `翻译出现问题${errcount}个`}`
// }
