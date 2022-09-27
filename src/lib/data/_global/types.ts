import {type IconSymbol} from '@sanity/icons'

export interface NavItemData {
  hidden: boolean | null
  collapsed: boolean | null
  title: string | null
  menuTitle: string | null
  segment: string | null
  targetId: string | null
  items: NavItemData[] | null
}

export interface NavData {
  _id: string
  collapsed: boolean | null
  hidden: boolean | null
  items: NavItemData[] | null
  segment: string | null
  targetId: string | null
  title: string | null
  menuTitle: string | null
}

export interface BannerData {
  hidden: boolean | null
  icon: IconSymbol | null
  title: string | null
  link: {
    title: string | null
    href: string | null
  } | null
}

export interface SettingsData {
  _id: string
  banner: BannerData | null
  title: string | null
}

export interface GlobalData {
  nav: NavData | null
  settings: SettingsData | null
}
