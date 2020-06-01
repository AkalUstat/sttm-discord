const resolve = require( 'path' ).resolve
const Client = require( 'discord.js' ).Client

require( 'dotenv' ).config( {path: resolve( __dirname, '../.env' )} )

const bot = new Client()

const TOKEN = process.env.BOT_TOKEN

bot.login( TOKEN )

bot.once( 'ready', () => {
  console.log( 'ready' )
} )

bot.on( 'message', msg => {
  if( msg.author.bot ) return

  if ( msg.content.startsWith( '!ping' ) ) {
    msg.channel.send( 'I was called?' )
  }
} )

