# GudeBot
### Upcoming Changes
Trigger Keqing functionality on Karuta responses
```
- Tracks responses from Karuta to target specific messages
- Adds emotes to specific messages that trigger keqing
```
Music functionality
```
- Joins vc and plays music requested with a specific command
- Has a queue (Check, clear, remove # in queue, stop, play, pause(?))
```
### v2.0.2
Easter Functionality
```
- Tracks response from Karuta when using kevent.
- Stores data about which eggs the user is missing.
- Updates egg list per user when a user grabs an egg.
- Tracks multiple channels for egg activity.
- Pings users in requested tracked channels.
- Users can set the channels they want to track.
- Can be used in multiple servers.
- Using the command gudegg, users can see which eggs they're missing.
- Response from kevent will cause the bot to refresh the egg list for that user.
```
### v2.0.1
Updates to the pat command
```
- Adds an optional user parameter.
- Random pat gif selection on response.
```
Assets are limited to links on Glitch. Pats are links stored within an array.
### v2.0.0 (from v1)
```
- Restructuring to follow the Discord Glitch example.
- Reorganizes code into a cleaner layout. 
- Moves commands into one file commands.js
- Logic for commands has been moved into a separate folder.
```

Previous iteration implemented deployment from Discord.js and used part of the Discord Glitch example as a base. 
This complicated the project as it was a mix of CJS and EMS. v1.0.0 was no longer able to deploy commands because of this mix.