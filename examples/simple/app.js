//var OkCool = require('okcool')
const OkCool = require('../../src/okcool.js')

class ThatWorksApp extends OkCool { 
  ['/']() { return 'hello world!' }
  
  ['/:world']() { return 'hello ' + this.params.world  }
  
  ['/what/is']() { return 'this!' }
}

new ThatWorksApp()
