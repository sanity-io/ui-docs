import {NavData, NavItemData} from '@/lib/data'

export function findNavNode(
  navNode: NavItemData | NavData,
  path: string[],
): NavData | NavItemData | undefined {
  if (path.length === 0) {
    return undefined
  }

  if (path.length === 1) {
    return navNode.segment === path[0] ? navNode : undefined
  }

  for (const child of navNode.items || []) {
    const result = findNavNode(child, path.slice(1))

    if (result) {
      return result
    }
  }

  return undefined
}
