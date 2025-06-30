// const Root = styled(Card)`
//   position: relative;
// `

import {style} from '@vanilla-extract/css'

// const BackgroundBox = styled(Box)`
//   position: absolute;
//   width: 100%;
//   height: 400px;
//   max-height: 50vh;
//   background-size: contain;
//   background-repeat: no-repeat;
//   background-position: center center;
//   top: 0;
//   left: 0;
//   z-index: 0;
// `

export const backgroundBox = style({
  position: 'absolute',
  width: '100%',
  height: '400px',
  maxHeight: '50vh',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  top: 0,
  left: 0,
  zIndex: 0,
})
