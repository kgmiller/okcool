const ws = require('uWebSockets.js')

module.exports = class OkCool {

  constructor() {
    determineRoutes()

    this.server = ws.App({})
    
    this.server.any('/*', this.handleRequest.bind(this))

    this.server.listen(3000, function(listenSocket) {
        console.log('OkCool, listening on 3000')
    })
  }

  handleRequest(request, response) {
    this.request = request
    this.response = response
    this.setDefaultHeaders()
    
    let route = findRoute(this.request.url)
    
    this.params = route.params
    
    output = this[route.value].apply(this)
    
    this.writeHeaders()
    this.response.end(output);
  }
  
  setDefaultHeaders() {
    this.headers = {
      'Content-Type', 'text/html'
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
    var routes = []; 
    do {
      let prop = Object.getOwnPropertyNames(obj);
      if (prop.startsWith('/') || 
          prop.startsWith('GET') || 
          prop.startsWith('POST') || 
          prop.startsWith('PUT') || 
          prop.startsWith('DELETE') || 
          prop.startsWith('PATCH')
        ) {
            routes.concat(prop)
          }
    } while (obj = Object.getPrototypeOf(this));
    
    this.routes = routes
  }
  
  registerRoutes() {
    
  }
  
  findRoute() {
    return {value: '/', params: {}}
  }
}
