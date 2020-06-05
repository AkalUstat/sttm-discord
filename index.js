const resolve = require( 'path' ).resolve
const { Client, Collection } = require( 'discord.js' )

const { prefix, botComands } = require( './config.json' )
const { sendMsg } = require( './functions' )

require( 'dotenv' ).config( {path: resolve( __dirname, '../.env' )} )

const TOKEN = process.env.BOT_TOKEN
const bot = new Client()
bot.commands = new Collection()

bot.login( TOKEN )

bot.once( 'ready', () => {
  console.log( 'ready' )
} )

bot.on( 'message', msg => {
  if( msg.author.bot ||  !msg.content.startsWith( prefix ) ) return

  const message = msg.content
                      .split( / +/ )
                      .filter( section => section !== prefix && !botComands.includes( section ) )

//  msg.channel.send( command || 'not found' )
  const [ command, ...args ] = message

  sendMsg( msg, command, args )
} )

