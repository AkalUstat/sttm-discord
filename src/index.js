const resolve = require( 'path' ).resolve
const {Client, Collection, MessageEmbed, DiscordAPIError} = require( 'discord.js' )

const {prefix} = require( './config.json' )
const {error, fullError, CommandWithHandlerMap} = require( './messages' )
const {stripBotConfigs} = require( './functions' )

require( 'dotenv' ).config( {path: resolve( __dirname, '../.env' )} )

const TOKEN = process.env.BOT_TOKEN
const bot = new Client()
bot.commands = new Collection()

CommandWithHandlerMap.map( command => {
  bot.commands.set( command.name, command )
} )
const sendMsg = async ( {channel}, cmd, args ) => {
	if ( !bot.commands.has( cmd ) ) throw "Invalid command"
	else channel.send( await bot.commands.get( cmd ).handle( ...args ) )
}

bot.login( TOKEN )

bot.once( 'ready', () => {
  console.log( 'ready' )
} )

bot.on( 'message', async msg => {
  if ( msg.author.bot || !msg.content.startsWith( prefix ) ) return

  const message = msg.content
    .split( / +/ )
    .filter( section =>  section !== prefix  )

  const [ command, ...args ] = message

  try {
    if ( !bot.commands.has( command ) ) {
      throw "Command doesnt exist error"
    }
    await sendMsg( msg, command, stripBotConfigs( args ) )
  }
  catch ( e ) {
    if ( args.includes( '--verbose' ) ) msg.channel.send( error( e, command ) )
    else msg.channel.send( errorCard() )
  }
} )

