export interface WebsiteHeaderType {
  brandText: string
  brandImage: any
  bodyContent: navbarLink[] | navbarDropDownLink[]
}

export interface navbarLink {
  text: string
  link: string
}

export interface navbarDropDownLink {
  title: string
  items: navbarLink[]
}
