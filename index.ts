import yargs from 'yargs'
import { parse } from 'node-html-parser'
import { stdin, argv } from 'process'
import { getStream } from './util.js'

const { attribute, query, replacement } = yargs(argv.slice(2))
  .option('attribute', {
    alias: 'a',
    type: 'string',
    default: '',
    describe: 'The attribute to modify on selected elements',
    defaultDescription: 'The inner text of the selected elements',
  })
  .option('query', {
    alias: 'q',
    type: 'string',
    default: 'html',
    describe: 'Query selector for the elements found on the given HTML',
  })
  .option('replacement', {
    alias: 'r',
    type: 'string',
    default: '',
    describe: 'The value to inject in the selected elements',
  })
  .help()
  .version()
  .env()
  .parseSync()

const dom = parse(await getStream(stdin))

for (const element of dom.querySelectorAll(query)) {
  if (attribute) element.setAttribute(attribute, replacement)
  else element.innerHTML = replacement
}

console.log(dom.outerHTML)
