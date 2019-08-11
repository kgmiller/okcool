const ws = require('uWebSockets.js')
const OkCoolLetsGo = require('okcool-letsgo')

module.exports = class OkCool {

  constructor(options = {port: 3000}) {
    this.options = options
    this.router = new OkCoolLetsGo()
    this.determineRoutes()
    this.registerRoutes()

    this.server = ws.App({})
    
    this.server.any('/*', this.handleRequest.bind(this))

    this.server.listen(this.options.port, function(listenSocket) {
        console.log('OkCool, listening on 3000')
    })
  }

  handleRequest(response, request) {

    this.request = request
    this.response = response
    this.setDefaultHeaders()
    
    console.log(this.request.getUrl())
    
    let route = this.findRoute(this.request.getUrl())
    
    if (route) {
      this.params = route.params
      
      let output = route.action.apply(this)
      
      this.writeHeaders()
      this.response.end(output);      
    }
  }
  
  setDefaultHeaders() {
    this.headers = {
      'Content-Type': 'text/html'
    }
  }
  
  writeHeaders() {
    for(const [key, value] of Object.entries(this.headers)) {
      this.response.writeHeader(key, value);
    }
  }

  render() {

  }
  
  determineRoutes() {
    var routes = []
    var obj = this
    
    do {
      let prop = Object.getOwnPropertyNames(obj)
      prop.forEach((p) => {
        if (p.startsWith('/') || 
            p.startsWith('GET') || 
            p.startsWith('POST') || 
            p.startsWith('PUT') || 
            p.startsWith('DELETE') || 
            p.startsWith('PATCH')
          ) {
              routes.push(p)
        }
      })
        
    } while (obj = Object.getPrototypeOf(obj))
    this.routes = routes
  }
  
  registerRoutes() {
    this.routes.forEach((r) => {
      this.router.add(r, this[r])
    })
  }
  
  findRoute(route) {
    return this.router.find(route)
  }
}
