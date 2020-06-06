const resolve = require( 'path' ).resolve
const { Client, Collection, MessageEmbed } = require( 'discord.js' )

const { prefix, botComands } = require( './config.json' )
const { sendMsg } = require( './functions' )

require( 'dotenv' ).config( {path: resolve( __dirname, '../.env' )} )

const TOKEN = process.env.BOT_TOKEN
const bot = new Client()
bot.commands = new Collection()

const errorCard =() => {
  const error = new MessageEmbed()

  error.setTitle( "Something Went Wrong..." )
  error.setColor( "#cc0000" )

  // error.setURL( "https://github.com/AkalUstat/sttm-discord" )
  error.setDescription( "Something went wrong with your command. Please file an issue on github:https://github.com/AkalUstat/sttm-discord " )

  error.setFooter( "For the entire error, please run this command using the `--verbose` flag (use the `--silence` flag to avoid seeing this card again)" )
  return error
}
const error = ( err, command ) => {
  const fullError = new MessageEmbed()

  fullError.setTitle( "Full Error Message" )
  fullError.addField( `Command: ${command}`, `error:${err}` )
  fullError.setColor( '##cc0000' )

  return fullError
}
bot.login( TOKEN )

bot.once( 'ready', () => {
  console.log( 'ready' )
} )

bot.on( 'message', async msg => {
  if( msg.author.bot ||  !msg.content.startsWith( prefix ) ) return

  const message = msg.content
                      .split( / +/ )
                      .filter( section => section !== prefix && !botComands.includes( section ) )

  const [ command, ...args ] = message

  try {
    await sendMsg( msg, command, args )
  }
  catch ( e ) {
    if( !args.includes( '--silence' ) ) {
      msg.channel.send( errorCard() )
     }

    if ( args.includes( '--verbose' ) ) msg.channel.send( error( e, command ) )
  }
} )

