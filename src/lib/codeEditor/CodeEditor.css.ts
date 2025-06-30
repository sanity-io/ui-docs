import {vars} from '@sanity/ui/css'
import {createVar, globalStyle, style} from '@vanilla-extract/css'

const localVars = {
  boxShadow: createVar(),
}

export const editor = style({
  vars: {
    [localVars.boxShadow]: 'none',
  },

  boxShadow: localVars.boxShadow,
  overflow: 'hidden',
  position: 'relative',
  zIndex: 0,
  minHeight: '2em',

  selectors: {
    '&[data-focus-ring]': {
      vars: {
        [localVars.boxShadow]: `0 0 0 1px ${vars.color.focusRing}`,
      },
    },
  },

  // const EditorContainer = styled(Card)<{$focusRing: boolean}>(({$focusRing, theme}) => {
  //   const {color, input} = getTheme_v2(theme)

  //   const border = {
  //     color: color.input.default.enabled.border,
  //     width: input.border.width,
  //   }

  //   return css`
  //     --input-box-shadow: ${$focusRing ? focusRingBorderStyle(border) : undefined};

  //     & > .cm-theme {
  //       height: 100%;
  //     }

  //     &:focus-within {
  //       --input-box-shadow: ${$focusRing
  //         ? focusRingStyle({
  //             base: color,
  //             border,
  //             focusRing: input.text.focusRing,
  //           })
  //         : undefined};
  //     }
  //   `
  // })
})

// '& > .cm-theme': {
//   height: '100%',
// },

globalStyle(`${editor} > .cm-theme`, {
  height: '100%',
})
