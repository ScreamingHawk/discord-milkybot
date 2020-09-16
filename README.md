# Discord MilkyBot

This is (part of) the source code for MilkyBot, a discord bot that does a bunch of stuff.

## Commands

Below is a list of commands with examples.

### Awake Check

```
You awake?
```

Replies with `Yup` if the bot is active.

### Say Something

```
Say I am a robot
```

Replies with what you told it to say.

### Greetings

```
Hello
Hi
Sup
Greetings
```

Replies to greetings with a friendly hello.

### Politeness Check

```
please
```

To avoid people adding please (which breaks commands) the bot reminds them not to use it.

### Call Names

```
call person silly
```

Responds saying that person is silly.

### Tell Someone Something

```
tell person hello
```

Responds commenting to a person.

### Poll

```
poll Question? Answer 1, Answer 2
```

Create a poll, supporting up to 10 answers.

### Define

```
define word
```

Search for the definition of a word in the Merriam-Webster dictionary.

### Civ Down

```
Civ servers still down?
```

Checks downdetector to see if Civ servers are down or not.

## Dev Usage

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
DICTIONARYAPI_KEY=
```

Note: `DICTIONARYAPI_KEY` is optional and can be obtained from [DictionaryApi](https://dictionaryapi.com).

Add `DISABLE_UI=true` to disable the front end.

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
heroku config:set DICTIONARYAPI_KEY=XXX
```

Do the deployment

```sh
git push heroku master
```

## Credits

[Michael Standen](https://michael.standen.link)

This software is provided under the [MIT License](https://tldrlegal.com/license/mit-license) so it's free to use so long as you give me credit.
