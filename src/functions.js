const {botComandMap} = require( './config.json' )
const {MessageEmbed} = require( 'discord.js' )

const stripBotConfigs = args => {
	return args.filter( arg => !arg.startsWith( '--' ) )
}
const help = () => {
	const embed = new MessageEmbed()

	embed.setTitle( "STTM Discord Help" )

	botComandMap.forEach( ( {name, desc} ) => {embed.addField( name, desc )} )

	return embed
}

const search = async query => {
	if ( !query ) throw 'No query provided'
	// return (
	//  fetch( buildUrl( { q: query} ) )
	//   .then( res => res.json )
	//   .then( json => json.verses ) 
	//  )
	return query
}


module.exports = {
	search,
	help,
	stripBotConfigs
}
