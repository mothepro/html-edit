import yargs from 'yargs'
import { parse } from 'node-html-parser'
import { stdin, argv } from 'process'

const { attribute, query, replacement, evaluate } = await yargs(argv.slice(2))
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
    defaultDescription: 'Removes the attribute or children of selected elements',
  })
  .option('evaluate', {
    alias: 'e',
    type: 'boolean',
    describe: 'Whether the `replacement` should be treated as evaluated JS code',
  })
  .help()
  .version()
  .env()
  .parse()

const chunks = []
for await (const chunk of stdin) chunks.push(chunk)
const input = Buffer.concat(chunks).toString('utf8')
const dom = parse(input)

for (const element of dom.querySelectorAll(query)) {
  const output = evaluate ? eval(replacement) : replacement
  if (attribute) element.setAttribute(attribute, output)
  else element.innerHTML = output
}

console.log(dom.outerHTML)
