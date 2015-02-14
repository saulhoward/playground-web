# Template Web Service

An example Web service running on MyODC

### Prerequisites

Install Consul
[https://www.consul.io/intro/getting-started/install.html](https://www.consul.io/intro/getting-started/install.html)

Run Consul
```
$ consul agent -server -bootstrap-expect 1 -data-dir /tmp/consul
```

Run Web Service
```
$ go run main.go

1416690269585797436 [Debug] Web Rpc handler /rpc
1416690269585843417 [Debug] Web Static Dir src
1416690269585853843 [Debug] Starting server io.myodc.web.template id io.myodc.web.template-26423b0b-728b-11e4-afe0-68a86d0d36b6
1416690269585951974 [Debug] Listening on [::]:58308
1416690269585974918 [Debug] Registering io.myodc.web.template-26423b0b-728b-11e4-afe0-68a86d0d36b6
```

Test Service
```
Go to http://localhost:58308/ in a browser
```

Alternativelly test RPC (run go-template service)
```
$ curl -H "Content-Type: application/json" -d '{"service": "io.myodc.service.go-template", "method": "Example.Call", "request": {"name": "asim"}}' http://localhost:57811/rpc; echo

{"msg":"io.myodc.service.go-template-c0bfcb44-728a-11e4-b099-68a86d0d36b6: Hello asim"}

```