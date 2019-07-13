var http = require('http')
require('lodash')

module.exports = class OkCool {

  constructor() {
    this.params = {}

    this.server = http.createServer(this.handleRequest.bind(this))
    
    this.server.listen(3000, function() {
        console.log('Server is running at 3000')
    })
  }
  
  handleRequest(request, response) {
    this.request = request
    this.response = response
     
    this.params.thing = 'world'
    
    this.response.writeHead(200, { "Content-type": "text/plain" });
    this.response.end(this[this.route()].apply(this));
  }
  
  route() {
    console.log(this.request.url)
    return '/hello'
  }
  
  render() {
    
  }
  
  getAllFuncs(obj) {
    var props = [];

    do {
        props = props.concat(Object.getOwnPropertyNames(obj));
    } while (obj = Object.getPrototypeOf(obj));
    return props
  }
  
}
