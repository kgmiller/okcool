var OkCool = require('../okcool.js')

class ThatWorksApp extends OkCool { 
  ['/hello']() { return 'WoRlD!' }
}

new ThatWorksApp()
