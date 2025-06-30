import {javascript} from '@codemirror/lang-javascript'
import {Card, CardProps, useCard} from '@sanity/ui'
import CodeMirror, {EditorView, Statistics} from '@uiw/react-codemirror'
import {ReactElement, useCallback, useEffect, useMemo, useRef} from 'react'

import {isHotkey} from '@/lib/hotkey'

import {editor} from './CodeEditor.css'
import {getEditorThemeExtension} from './editorTheme'
import {getFontSizeExtension} from './fontSize'
import {runPrettier} from './prettier'
import {getSyntaxTheme} from './syntaxTheme'
import {CodeEditorSelection} from './types'

export interface CodeEditorProps {
  focusRing?: boolean
  onChange: (value: string) => void
  onSelectionChange: (selection: CodeEditorSelection) => void
  selection: CodeEditorSelection
  value: string
}

const basicSetup = {
  highlightActiveLine: false,
}

export function CodeEditor(
  props: CodeEditorProps & Omit<CardProps, '__unstable_focusRing' | 'overflow'>,
): ReactElement {
  const {
    border = true,
    focusRing = true,
    onChange,
    onSelectionChange,
    selection,
    value,
    ...restProps
  } = props

  const selectionRef = useRef(selection)

  const card = useCard()

  const editorThemeExtension = useMemo(() => getEditorThemeExtension(), [])

  const fontSizeExtension = useMemo(() => getFontSizeExtension({fontSize: 1}), [])

  const javascriptExtension = useMemo(() => javascript({jsx: true}), [])

  const extensions = useMemo(
    () => [editorThemeExtension, fontSizeExtension, javascriptExtension],
    [editorThemeExtension, fontSizeExtension, javascriptExtension],
  )

  const codeMirrorTheme = useMemo(() => getSyntaxTheme({scheme: card.scheme}), [card.scheme])

  const viewRef = useRef<EditorView | null>(null)

  const handleCreateEditor = useCallback((view: EditorView) => {
    viewRef.current = view
  }, [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (isHotkey(['mod', 's'], event.nativeEvent)) {
        event.preventDefault()

        const run = async () => {
          const anchorResult = await runPrettier({
            code: value,
            cursorOffset: selection.anchor,
          })
          const focusResult = await runPrettier({
            code: value,
            cursorOffset: selection.focus,
          })

          if (anchorResult !== null && focusResult !== null) {
            let newVal = anchorResult.formatted
            let anchorOffset = anchorResult.cursorOffset
            let focusOffset = focusResult.cursorOffset

            if (newVal[0] === ';') {
              newVal = newVal.slice(1)
              anchorOffset -= 1
              focusOffset -= 1
            }

            const sel: CodeEditorSelection = {
              anchor: anchorOffset,
              focus: focusOffset,
            }

            onChange(newVal)
            onSelectionChange(sel)
          }
        }

        run().catch((err) => {
          console.error(err)
        })
      }
    },
    [onChange, onSelectionChange, selection, value],
  )

  const handleStatistics = useCallback(
    (data: Statistics) => {
      const range = data.selectionAsSingle

      const sel: CodeEditorSelection = {
        anchor: range.anchor,
        focus: range.head,
      }

      selectionRef.current = sel

      onSelectionChange(sel)
    },
    [onSelectionChange],
  )

  useEffect(() => {
    if (JSON.stringify(selection) !== JSON.stringify(selectionRef.current)) {
      const view = viewRef.current

      if (view) {
        view.dispatch({
          selection: {
            anchor: selection.anchor,
            head: selection.focus,
          },
        })
      }

      selectionRef.current = selection
    }
  }, [selection])

  return (
    <Card
      {...restProps}
      className={editor}
      data-focus-ring={focusRing ? '' : undefined}
      border={border}
      overflow="hidden"
    >
      <CodeMirror
        basicSetup={basicSetup}
        extensions={extensions}
        onChange={onChange}
        onCreateEditor={handleCreateEditor}
        onKeyDown={handleKeyDown}
        onStatistics={handleStatistics}
        theme={codeMirrorTheme}
        value={value}
      />
    </Card>
  )
}
