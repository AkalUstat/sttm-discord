const {botComands} = require( './config.json' )
const {MessageEmbed} = require( 'discord.js' )

const help = () => {
	const embed = new MessageEmbed()

	embed.setTitle( "STTM Discord Help" )

	botComands.forEach( ( {name, desc} ) => {embed.addField( name, desc )} )

	return embed
}

const search = async query => {
	// return (
	//  fetch( buildUrl( { q: query} ) )
	//   .then( res => res.json )
	//   .then( json => json.verses ) 
	//  )
	return query
}


module.exports = {
	search,
	help
}
