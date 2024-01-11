import { AvatarType } from '@/types/avatarType'
import { cat, dog, dragon, rabbit, hedgehog, otter, panda, squirrel  } from '../../../../public/images/avatar/normal'
import { catSmall, dogSmall, dragonSmall, rabbitSmall, hedgehogSmall, otterSmall, pandaSmall, squirrelSmall  } from '../../../../public/images/avatar/small'

export const avatars: AvatarType[] = [
    {
        name:'dragon',
        smallSrc : dragonSmall,
        nomalSrc : dragon,
        alt : '용 캐릭터'
    },
    {
        name:'dog',
        smallSrc : dogSmall,
        nomalSrc : dog,
        alt : '강아지 캐릭터'
    },
    {
        name:'rabbit',
        smallSrc : rabbitSmall,
        nomalSrc : rabbit,
        alt : '토끼 캐릭터'
    },
    {
        name:'cat',
        smallSrc : catSmall,
        nomalSrc : cat,
        alt : '고양이 캐릭터'
    },
    {
        name:'hedgehog',
        smallSrc : hedgehogSmall,
        nomalSrc : hedgehog,
        alt : '고슴도치 캐릭터'
    },
    {
        name:'otter',
        smallSrc : otterSmall,
        nomalSrc : otter,
        alt : '수달 캐릭터'
    },
    {
        name:'squirrel',
        smallSrc : squirrelSmall,
        nomalSrc : squirrel,
        alt : '다람쥐 캐릭터'
    },
    {
        name:'panda',
        smallSrc : pandaSmall,
        nomalSrc : panda,
        alt : '판다 캐릭터'
    },
]
