# slack_fitbot

This is SlackBot tells us Infomation via Fitbit

[![https://gyazo.com/33863f8f6382907e91448acc1e4b8b88](https://i.gyazo.com/33863f8f6382907e91448acc1e4b8b88.png)](https://gyazo.com/33863f8f6382907e91448acc1e4b8b88)

## Install

- Install [Bot](https://slack.com/apps/A0F7YS25R-bots) to your team
- `$ mv config.sample.js config.js` and fill in.
  - **TIPS**: Get channel Id
    1. Open target channel on browser
    2. Exec on developer console: `document.querySelector('#active_channel_name .star').dataset.channelId`
- `$ npm install`
- `$ npm run start`
