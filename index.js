'use strict'
const Slackbot = require('slackbots')
const fitbit = require('./fitbit')
const config = require('./config')
const bot = new Slackbot({
  token: config.SLACK_BOT_TOKEN,
  name: 'Fitbot'
})
const channel = config.CHANNEL
const channelId = config.CHANNELID

// more information about additional params https://api.slack.com/methods/chat.postMessage
const params = {
    icon_url: 'https://i.gyazo.com/99bf2703af690b52faf4d458b9cd29ed.png'
}

bot.on('message', (data) => {
  if (data.type !== 'message') return
  if (channelId && data.channel !== channelId ) return
  let text = ''
  switch (data.text) {
    case '歩数':
      fitbit.getStep().then((step) => {
        text = `今日はこれまでに${step}歩歩いた`
        console.log(text)
        bot.postMessageToChannel(channel, text, params)
      })
      break
    case '距離':
      fitbit.getDistance().then((d) => {
        text = `今日はこれまでに${d}km移動した`
        console.log(text)
        bot.postMessageToChannel(channel, text, params)
      })
      break
    case '心拍数':
    case ':heart:':
    case ':heartbeat:':
      fitbit.getHeartRate().then((r) => {
        text = `:heartbeat:  最新の心拍数: ${r.value} (${r.time}) \n Listen Beat: https://heartbeatwonderland.herokuapp.com/bpm/${r.value}`
        console.log(text)
        bot.postMessageToChannel(channel, text, params)
      })
      break
    case '起きてる?':
    case '起きてる？':
    case '寝てる？':
    case '寝てる?':
      fitbit.getLastSleepingTime().then((s) => {
        if (!s) {
          text = '今日はまだ寝てないっぽい！！ :muscle:'
        } else {
          if (s.lastSleepInfo) {
            text = `:zzz: 最新の睡眠情報: ${s.startTime}から${s.lastSleepInfo.dateTime}まで寝ていたようです`
          } else {
            text = `:zzz: 最新の睡眠情報: ${s.startTime}から寝ているようです`
          }
        }
        console.log(text)
        bot.postMessageToChannel(channel, text, params)
      })
  }

})
