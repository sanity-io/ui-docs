import {SourceNode} from '@sanity/react-loader/jsx'

export interface NavNode {
  collapsed: boolean
  hidden: boolean
  segment: string | undefined
  targetId: string | undefined
  title: SourceNode<string> | undefined
  menuTitle: SourceNode<string> | undefined
  href: string

  children: NavNode[] | undefined
}
