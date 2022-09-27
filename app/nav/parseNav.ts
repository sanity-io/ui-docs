import {SourceNode, WrappedValue} from '@sanity/react-loader/jsx'

import {NavData} from '../data'

export interface NavNode {
  collapsed: boolean
  hidden: boolean
  segment?: string
  targetId?: string
  title?: SourceNode<string>
  href: string

  children?: NavNode[]
}

export function parseNav(item: WrappedValue<NavData>, basePath: string[]): NavNode {
  const children = item.items
    ? item.items.map((i: any) => parseNav(i, basePath.concat(item.segment?.value || '')))
    : []

  return {
    collapsed: item.collapsed?.value || false,
    hidden: item.hidden?.value || false,
    segment: item.segment?.value || undefined,
    targetId: item.targetId?.value || undefined,
    title: item.title || undefined,
    href: basePath.concat(item.segment?.value || []).join('/'),

    children: children.length ? children : undefined,
  }
}
