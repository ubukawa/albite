const config = require('config')
const fs = require('fs')
const express = require('express')
const spdy = require('spdy') //for https
const cors = require('cors') 
const morgan = require('morgan')
const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')

// config constants
const morganFormat = config.get('morganFormat')
const htdocsPath = config.get('htdocsPath')
const privkeyPath = config.get('privkeyPath')
const fullchainPath = config.get('fullchainPath')
const port = config.get('port') 
const mbtilesDir = config.get('mbtilesDir')
const logDirPath = config.get('logDirPath')

// logger configuration
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: `${logDirPath}/albite-%DATE%.log`,
      datePattern: 'YYYY-MM-DD'
    })
  ]
})

logger.stream = {
  write: (message) => { logger.info(message.trim()) }
}

// app
const app = express()
var VTRouter = require('./routes/VT') //tiling (delivery of pbf from single mbtiles)
var rgbElevRouter = require('./routes/rgbElev') //RGB elevation tile (ZL0-5 is generated from 0-0-0.mbtiles)
var UNVTRouter = require('./routes/UNVT') //tiling (delivery of pbf from spatial modules mbitles) 
app.use(cors())
app.use(morgan(morganFormat, {
  stream: logger.stream
}))
app.use(express.static(htdocsPath))
app.use('/VT', VTRouter)
app.use('/rgb-elev', rgbElevRouter)
app.use('/UNVT', UNVTRouter)
//for http
app.listen(port, () => {
    console.log(`Running at Port ${port} ...`)
})

/* for https
spdy.createServer({
  key: fs.readFileSync(privkeyPath),
  cert: fs.readFileSync(fullchainPath)
}, app).listen(port)
*/