# Discord MilkyBot

This is (part of) the source code for MilkyBot, a discord bot that does a bunch of stuff.

## Usage

Do the following.

### Set Up

Install dependencies

```sh
yarn && cd client && yarn
```

Create a PostgreSQL database

[Create a discord bot](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)

For local use, create a `.env` file and populate the following values:

```
DISCORD_TOKEN=
```

### Start

Single command, this enables *watching*

```sh
yarn dev
```

### Deploy

Set up heroku

```sh
heroku login
heroku create
```

Set up environment variables

```sh
heroku config:set DISCORD_TOKEN=XXX
```

Do the deployment

```sh
git push heroku master
```

## Credits

[Michael Standen](https://michael.standen.link)

This software is provided under the [MIT License](https://tldrlegal.com/license/mit-license) so it's free to use so long as you give me credit.
