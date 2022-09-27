import groq from 'groq'

export const API_SYMBOLS_QUERY = groq`
*[_type in $memberTypes && references(^._id)] | order(name asc) {
  "_key": _id,
  _type,
  name,
  isReactComponentType
}
`

export const API_EXPORTS_QUERY = groq`
*[_type == "api.export" && references(^._id)] {
  "_key": _id,
  _type,
  name,
  path,
  "symbolNames": *[_type in $memberTypes && references(^._id)] | order(name asc) .name,
  "symbols": ${API_SYMBOLS_QUERY}
}
`

const API_RELEASES_QUERY = groq`
*[_type == "api.release" && references(^._id)] {
  "_key": _id,
  _type,
  _updatedAt,
  "exports": ${API_EXPORTS_QUERY},
  version
}
`

export const API_PACKAGES_QUERY = groq`
*[_type == "api.package" && name in ["types", "sanity"]] {
  "_key": _id,
  _type,
  _updatedAt,
  name,
  "latestVersion": latestRelease->{version}.version,
  "releases": ${API_RELEASES_QUERY},
  scope
}
`
