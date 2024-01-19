import { StaticImageData } from 'next/image'
import { blueDew, yellowCheck, pinkDew, blueGradation, pinkGradation, purpleCheck, miniBlueGradation, miniBlueDew, minipinkDew, minipinkGradation, miniPurpleCheck, miniYellowCheck, blueColCheck, bubblePattern, miniBlueColCheck, miniBubblePattern} from '../../../../../public/images/matts'

export interface MattType {
  id: string
  miniSrc: StaticImageData
  src: StaticImageData
  alt: string
}

export const matts: MattType[] = [
  { 
    id : 'blueDew',
    miniSrc : miniBlueDew,
    src : blueDew,
    alt : '파랑배경'
  },
  { 
    id : 'yellowCheck',
    miniSrc : miniYellowCheck,
    src : yellowCheck,
    alt : '노랑배경'
  },
  { 
    id : 'pinkGradation',
    miniSrc : minipinkGradation,
    src : pinkGradation,
    alt : '분홍그라데이션배경'
  },
  { 
    id : 'bubblePattern',
    miniSrc : miniBubblePattern,
    src : bubblePattern,
    alt : '물방울배경'
  },
  { 
    id : 'pinkDew',
    miniSrc : minipinkDew,
    src : pinkDew,
    alt : '분홍배경'
  },
  { 
    id : 'purpleCheck',
    miniSrc : miniPurpleCheck,
    src : purpleCheck,
    alt : '보라체크배경'
  },
  { 
    id : 'blueGradation',
    miniSrc : miniBlueGradation,
    src : blueGradation,
    alt : '파랑그라데이션배경'
  },
  { 
    id : 'blueColCheck',
    miniSrc : miniBlueColCheck,
    src : blueColCheck,
    alt : '파랑세로줄배경'
  },
]
