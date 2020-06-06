const {help, search} = require( './messages' )

const buildUrl = require( '@sttm/banidb' ).buildApiUrl

const commandMap  = {
  "help": () => help(),
  "firstlet": async () => await search()
}

const sendMsg = async ( {channel }, cmd, args ) =>{
  if ( !commandMap[ cmd ] ) channel.send( 'Invalid command' )
  else channel.send( await commandMap[ cmd ]( ...args ) )
}
module.exports = {
  search, 
  commandMap,
  sendMsg
}