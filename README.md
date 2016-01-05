# slack_fitbot

This is SlackBot tells us Infomation via Fitbit

[![https://gyazo.com/627dd1cb75b6c1ae630fdd2a1bff885b](https://i.gyazo.com/627dd1cb75b6c1ae630fdd2a1bff885b.png)](https://gyazo.com/627dd1cb75b6c1ae630fdd2a1bff885b)

## Install

- Install [Bot](https://slack.com/apps/A0F7YS25R-bots) to your team
- `$ mv config.sample.js config.js` and fill in.
  - **TIPS**: Get channel Id
    1. Open target channel on browser
    2. Exec on developer console: `document.querySelector('#active_channel_name .star').dataset.channelId`
- `$ npm install`
- `$ npm run start`
