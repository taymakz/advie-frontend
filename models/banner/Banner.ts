export interface BannerDTO {
  title: string
  image: string
  image_alt: string
  url: string
  position: BannerPosition
}

export enum BannerPosition {
  SLIDER = 'SLIDER',
  BANNER = 'BANNER',

}
