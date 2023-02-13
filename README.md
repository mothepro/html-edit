# HTML-edit

> Command line program to modify HTML files by query selector directly from the command line

[![npm](https://img.shields.io/npm/v/html-edit.svg)](https://www.npmjs.com/package/html-edit)

## Usage

`npx html-edit [[options]] < input.html > output.html`

## How to Use

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `help` | | | Show help |
| `version` | | | Show version number |
| `attribute` `a` | `string` | The inner text of the selected elements | The attribute to modify on selected elements |
| `query` `q` | `string` | `html` | Elements to select in given HTML using a DOM query selector string |
| `replacement` `r` | `string` | Remove the attribute (or inner text) of the selected elements | Value to inject in the selected elements |
| `evaluate` `e` | `boolean` | `false` | Whether the `replacement` should be treated as evaluated JS code |

## Examples

Adds the `dark` attribute to the `html` element
`npx html-edit -a dark < input.html > output.html`

Adds the current unixtime to the `date-time` attribute for the `time` elements
`npx html-edit -er "+new Date" -a date-time -q time < input.html > output.html`
