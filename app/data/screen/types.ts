import {SanityImageCropValue, SanityImageHotspotValue, SanityReferenceValue} from '~/sanity'

export interface HeroSectionData {
  _key: string
  _type: 'screenSection.hero'
  headline: string | null
  copy: string | null
  linksHeader: string | null
  links:
    | {
        _key: string
        _type: 'link'
        href: string | null
        title: string | null
        subtitle: string | null
      }[]
    | null
  ctas:
    | {
        _key: string
        _type: 'cta'
        heading: string | null
        mode: 'default' | null
        tone: 'primary' | null
        href: string | null
        label: string | null
      }[]
    | null
  backgroundImage: {
    light: {
      asset: SanityReferenceValue | null
      _type: 'image'
    } | null
    dark: {
      _type: 'image'
      asset: SanityReferenceValue | null
    } | null
  } | null
}

export interface ScreenData {
  _type: 'screen'
  _createdAt: string
  _updatedAt: string
  _rev: string
  _id: string
  title: string | null
  sections: HeroSectionData[] | null
  seo: {
    _type: 'seo'
    og: {
      type: 'website' | null
      title: string | null
      asset: SanityReferenceValue | null
      crop: SanityImageCropValue | null
      hotspot: SanityImageHotspotValue | null
    } | null
    twitter: {
      cardType: 'summary_large_image'
    } | null
  } | null
}
