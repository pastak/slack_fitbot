'use strict'
const Slackbot = require('slackbots')
const fitbit = require('./fitbit')
const config = require('./config')
const bot = new Slackbot({
  token: config.SLACK_BOT_TOKEN,
  name: 'Fitbot'
})
const channel = config.CHANNEL

// more information about additional params https://api.slack.com/methods/chat.postMessage
const params = {
    icon_url: 'https://i.gyazo.com/99bf2703af690b52faf4d458b9cd29ed.png'
}

bot.on('message', (data) => {
  if (!(data.type === 'message' && data.channel === 'C0CND2YDD')) return
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
        text = `:heartbeat: 現在の心拍数: ${r}`
        console.log(text)
        bot.postMessageToChannel(channel, text, params)
      })
  }

})
