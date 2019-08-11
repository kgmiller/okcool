var OkCool = require('../../okcool.js')

class ThatWorksApp extends OkCool { 
  ['/']() { return 'hello world!' }
}

new ThatWorksApp()
