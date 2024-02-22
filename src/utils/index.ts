export function hashCode(str: string): number {
  var h = 0
  for (var i = 0; i < str.length; i++) {
    h = 31 * h + str.charCodeAt(i)
  }
  return h & 0xffffffff
}

export const onion = (s: string = "") => btoa(btoa(s))
export const deOnion = (s: string = "") => atob(atob(s))
