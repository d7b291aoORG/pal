import http from 'http'
import process from 'process'
http.createServer((req, res) => res.end('pal')).listen(80)
import('./pal.js')
