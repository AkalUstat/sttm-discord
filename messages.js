const { botComands } = require( './config.json' )
const { MessageEmbed } = require( 'discord.js' )

const help = ( ) => {
  const embed = new MessageEmbed()

  embed.setTitle( "STTM Discord Help" )

  botComands.forEach( ( {name, desc} ) => { embed.addField( name, desc )} )

  return embed
}


module.exports = {
  help
}