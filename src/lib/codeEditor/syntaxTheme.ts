import {tags as t} from '@lezer/highlight'
import {vars} from '@sanity/ui/css'
import {ColorScheme} from '@sanity/ui/theme'
import {createTheme} from '@uiw/codemirror-themes'
import {Extension} from '@uiw/react-codemirror'

export function getSyntaxTheme(options: {scheme: ColorScheme}): Extension {
  const {scheme} = options

  return createTheme({
    theme: scheme,
    settings: {
      background: vars.color.tinted.default.bg[0],
      foreground: vars.color.tinted.default.fg[2],
      lineHighlight: vars.color.tinted.default.bg[1],
      fontFamily: vars.font.code.family,
      caret: vars.color.focusRing,
      selection: `color-mix(in oklab, transparent, ${vars.color.focusRing} 0.2)`,
      selectionMatch: `color-mix(in oklab, transparent, ${vars.color.focusRing} 0.4)`,
      gutterBackground: vars.color.tinted.default.bg[1],
      gutterForeground: vars.color.tinted.default.fg[4],
      gutterActiveForeground: vars.color.tinted.default.fg[0],
    },
    styles: [
      {
        tag: [t.heading, t.heading2, t.heading3, t.heading4, t.heading5, t.heading6],
        color: vars.color.tinted.default.fg[0],
      },
      {tag: t.angleBracket, color: vars.color.tinted.default.fg[2]},
      {tag: t.atom, color: vars.color.code.token.keyword},
      {tag: t.attributeName, color: vars.color.code.token.attrName},
      {tag: t.bool, color: vars.color.code.token.boolean},
      {tag: t.bracket, color: vars.color.tinted.default.fg[2]},
      {tag: t.className, color: vars.color.code.token.className},
      {tag: t.comment, color: vars.color.code.token.comment},
      {tag: t.definition(t.typeName), color: vars.color.code.token.function},
      {
        tag: [
          t.definition(t.variableName),
          t.function(t.variableName),
          t.className,
          t.attributeName,
        ],
        color: vars.color.code.token.function,
      },
      {
        tag: [t.function(t.propertyName), t.propertyName],
        color: vars.color.code.token.function,
      },
      {tag: t.keyword, color: vars.color.code.token.keyword},
      {tag: t.null, color: vars.color.code.token.number},
      {tag: t.number, color: vars.color.code.token.number},
      {tag: t.meta, color: vars.color.tinted.default.fg[2]},
      {tag: t.operator, color: vars.color.code.token.operator},
      {tag: t.propertyName, color: vars.color.code.token.property},
      {tag: [t.string, t.special(t.brace)], color: vars.color.code.token.string},
      {tag: t.tagName, color: vars.color.code.token.className},
      {tag: t.typeName, color: vars.color.code.token.keyword},
    ],
  })
}
