# GudeBot
#### v2.0.2

## Project structure

```
├── commands -> logic for functions
│   ├── track
│       ├── wishlist tracking logic
│       ├── easter tracking logic
│       ├── vday tracking logic
│       ├── emote tracking logic (WIP)
│   ├── emotionalsupport.js  -> emotional support command logic
│   ├── pat.js               -> pat command logic
├── files    -> json files used for tracking as there's no DB
│   ├── egg-track.json       -> tracks easter egg event (manually cleared once event ends)
│   ├── emote-tracking.json  -> (WIP)
│   ├── track.json           -> tracks channels in specific servers and indicates what is being tracked
├── .env        -> not committed; stores environment keys
├── app.js      -> main entrypoint for app
├── commands.js -> slash command payloads + helpers
├── utils.js    -> utility functions
├── package.json
├── README.md
├── UPDATES.md
└── .gitignore
```

### Deploy slash commands
```
npm run register
```

### Run the app

```
node app.js
```
> ⚙️ A package [like `nodemon`](https://github.com/remy/nodemon), which watches for local changes and restarts your app, may be helpful while locally developing.

This bot uses the example of the Glitch Discord Example as the base for deployment and connecting to Discord. 

## Notes From Discord Documentation

> ✨ A version of the base code is hosted **[on Glitch 🎏](https://glitch.com/~getting-started-discord)** and **[on Replit 🌀](https://replit.com/github/discord/discord-example-app)**

### Other resources
- Read **[the documentation](https://discord.com/developers/docs/intro)** for in-depth information about API features.
- Browse the `examples/` folder in this project for smaller, feature-specific code examples
- Check out **[community resources](https://discord.com/developers/docs/topics/community-resources#community-resources)** for language-specific tools maintained by community members.

