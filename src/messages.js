const {help, search} = require( './functions' )


const commandMap = {
	"help": () => help(),
	"firstlet": async query => await search( query )
}

const sendMsg = async ( {channel}, cmd, args ) => {
	if ( !commandMap[ cmd ] ) throw "Invalid command"
	else channel.send( await commandMap[ cmd ]( ...args ) )
}
module.exports = {
	search,
	commandMap,
	sendMsg
}
