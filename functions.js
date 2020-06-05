const {help} = require( './messages' )

const buildUrl = require( '@sttm/banidb' ).buildApiUrl

const search = async query => {
  return (
   fetch( buildUrl( { q: query} ) )
    .then( res => res.json )
    .then( json => json.verses ) 
   )
}


const commandMap  = {
  "help": () => help()
}

const sendMsg = ( {channel }, cmd, args ) =>{
  if ( !commandMap[ cmd ] ) channel.send( 'Invalid command' )
  else channel.send( commandMap[ cmd ]( ...args ) )
}
module.exports = {
  search, 
  commandMap,
  sendMsg
}