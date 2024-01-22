/*
https://github.com/jaredgorski/SpaceCamp
colors:
  background: '#121212'
  foreground: '#D0D0D0'

  text:       '#0D0D0D'
  cursor:     '#D0D0D0'

  0:          '#282828'   # black
  1:          '#D71A1A'   # red
  2:          '#57BA37'   # green
  3:          '#F0D50C'   # yellow
  4:          '#91AADF'   # blue
  5:          '#CF73E6'   # magenta
  6:          '#B7CBF4'   # cyan
  7:          '#DEDEDE'   # white

  8:          '#666666'   # bright black
  9:          '#FF0000'   # bright red
  10:         '#D8FA3B'   # bright green
  11:         '#E7C547'   # bright yellow
  12:         '#B7CBF4'   # bright blue
  13:         '#B77EE0'   # bright magenta
  14:         '#A9C1DE'   # bright cyan
  15:         '#EEEEEE'   # bright white
 */
export const colors = {
  background: '#121212',
  foreground: '#D0D0D0',

  text: '#0D0D0D',
  cursor: '#D0D0D0',

  0: '#282828',
  1: '#D71A1A',
  2: '#57BA37',
  3: '#F0D50C',
  4: '#91AADF',
  5: '#CF73E6',
  6: '#B7CBF4',
  7: '#DEDEDE',

  8: '#666666',
  9: '#FF0000',
  10: '#D8FA3B',
  11: '#E7C547',
  12: '#B7CBF4',
  13: '#B77EE0',
  14: '#A9C1DE',
  15: '#EEEEEE',
}
export const RFCLLMEP = import.meta.env.VITE_REACT_APP_RFCLLMEP
export const RFCAPIEP = import.meta.env.VITE_REACT_APP_RFCAPIEP
export const RFCLLMOPENAPIEP = import.meta.env.VITE_REACT_APP_RFCLLMOPENAPIEP
export const TEST_USERNAME = import.meta.env.VITE_REACT_TEST_USERNAME
export const TEST_USERPW = import.meta.env.VITE_REACT_TEST_USERPW
export const RFCEDITOREP = `${RFCLLMEP}/search/rfc`
export const RFCDOCTREE = [
  {
    value: 'flatTreeItem_lvl-1_item-1',
    content: `RFC 0 - 1000`,
  },
  ...Array.from({ length: 1000 }, (_, i) => ({
    value: `flatTreeItem_lvl-1_item-1--child:${i}`,
    parentValue: 'flatTreeItem_lvl-1_item-1',
    content: `RFC ${i + 1}`,
  })),
  {
    value: 'flatTreeItem_lvl-1_item-2',
    content: `RFC 1000 - 2000`,
  },
  ...Array.from({ length: 1000 }, (_, index) => ({
    value: `flatTreeItem_lvl-1_item-2--child:${index}`,
    parentValue: 'flatTreeItem_lvl-1_item-2',
    content: `RFC ${index + 1000 + 1}`,
  })),
  {
    value: 'flatTreeItem_lvl-1_item-3',
    content: `RFC 2000 - 3000`,
  },
  ...Array.from({ length: 1000 }, (_, index) => ({
    value: `flatTreeItem_lvl-1_item-3--child:${index}`,
    parentValue: 'flatTreeItem_lvl-1_item-3',
    content: `RFC ${index + 2000 + 1}`,
  })),
  {
    value: 'flatTreeItem_lvl-1_item-4',
    content: `RFC 3000 - 4000`,
  },
  ...Array.from({ length: 1000 }, (_, index) => ({
    value: `flatTreeItem_lvl-1_item-4--child:${index}`,
    parentValue: 'flatTreeItem_lvl-1_item-4',
    content: `RFC ${index + 3000 + 1}`,
  })),
  {
    value: 'flatTreeItem_lvl-1_item-5',
    content: `RFC 4000 - 5000`,
  },
  ...Array.from({ length: 1000 }, (_, index) => ({
    value: `flatTreeItem_lvl-1_item-5--child:${index}`,
    parentValue: 'flatTreeItem_lvl-1_item-5',
    content: `RFC ${index + 4000 + 1}`,
  })),
  {
    value: 'flatTreeItem_lvl-1_item-6',
    content: `RFC 5000 - 6000`,
  },
  ...Array.from({ length: 1000 }, (_, index) => ({
    value: `flatTreeItem_lvl-1_item-6--child:${index}`,
    parentValue: 'flatTreeItem_lvl-1_item-6',
    content: `RFC ${index + 5000 + 1}`,
  })),
  {
    value: 'flatTreeItem_lvl-1_item-7',
    content: `RFC 6000 - 7000`,
  },
  ...Array.from({ length: 1000 }, (_, index) => ({
    value: `flatTreeItem_lvl-1_item-7--child:${index}`,
    parentValue: 'flatTreeItem_lvl-1_item-7',
    content: `RFC ${index + 6000 + 1}`,
  })),
]
export const OAIAUTHSECRET = atob(atob(import.meta.env.VITE_REACT_TEST_OAIAUTHSECRET))
