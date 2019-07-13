var OkCool = require('../../okcool.js')

class ThatWorksApp extends OkCool { 
  ['/hello']() { return 'ok, cool' }
}

new ThatWorksApp()
