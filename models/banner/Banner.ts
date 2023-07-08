export interface BannerDTO {
  title: string
  image: string
  image_alt: string
  url: string
  position: BannerPosition
}

export enum BannerPosition {
  HOME_PAGE_SLIDER_BANNER = 'HOME_PAGE_SLIDER_BANNER',
  HOME_PAGE_LARGE_BANNER = 'HOME_PAGE_LARGE_BANNER',
}
