const {help, search} = require( './functions' )
const {botCommands} = require( './config.json' )


const commandMap = {
	"help": () => help(),
	"firstlet": async query => await search( query )
}

const CommandWithHandlerMap = botCommands.map( command => ( { ...command, handle: commandMap[ command.name ]} ) )



const errorCard = () => {
  const error = new MessageEmbed()

  error.setTitle( "Something Went Wrong..." )
  error.setColor( "#cc0000" )

  // error.setURL( "https://github.com/AkalUstat/sttm-discord" )
  error.setDescription( "Something went wrong with your command. Please file an issue on github:https://github.com/AkalUstat/sttm-discord " )

  error.setFooter( "For the entire error, please run this command using the `--verbose` flag " )
  return error
}

const error = ( err, command ) => {
  const fullError = new MessageEmbed()

  fullError.setTitle( "Full Error Message" )
  fullError.addField( `Command: ${command}`, `error:${err}` )
  fullError.setColor( '##cc0000' )

  return fullError
}
module.exports = {
	CommandWithHandlerMap,
	error,
	fullError
}
