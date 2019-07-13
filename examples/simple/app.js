var OkCool = require('../../okcool.js')

class ThatWorksApp extends OkCool { 
  ['/hello/:what']() { return 'ok, cool' }
}

new ThatWorksApp()
