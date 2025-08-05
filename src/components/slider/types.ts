export interface SlideData {
  id: string;
  image: string;
  title: string;
  subTitle: string;
  description: string;
}

export interface SlideCardProps {
  slide: SlideData;
  index: number;
}
