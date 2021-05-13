/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

// import smaller thumbnails for colouring rewards to aid in content loading
import ColouringRewardOneThumbnail from '../assets/colouring-rewards/ActivitySheet-1-Thumbnail.png'
import ColouringRewardTwoThumbnail from '../assets/colouring-rewards/ActivitySheet-2-Thumbnail.png'
import ColouringRewardThreeThumbnail from '../assets/colouring-rewards/ActivitySheet-3-Thumbnail.png'
import ColouringRewardFourThumbnail from '../assets/colouring-rewards/ActivitySheet-4-Thumbnail.png'
import ColouringRewardFiveThumbnail from '../assets/colouring-rewards/ActivitySheet-5-Thumbnail.png'
import ColouringRewardSixThumbnail from '../assets/colouring-rewards/ActivitySheet-6-Thumbnail.png'

// import full size colouring rewards for download
import ColouringRewardOne from '../assets/colouring-rewards/ActivitySheet-1.png'
import ColouringRewardTwo from '../assets/colouring-rewards/ActivitySheet-2.png'
import ColouringRewardThree from '../assets/colouring-rewards/ActivitySheet-3.png'
import ColouringRewardFour from '../assets/colouring-rewards/ActivitySheet-4.png'
import ColouringRewardFive from '../assets/colouring-rewards/ActivitySheet-5.png'
import ColouringRewardSix from '../assets/colouring-rewards/ActivitySheet-6.png'

// export rewards as a list for use in the Rewards Page
export const Rewards = [
        {
            CharacterName: 'Spike', // monster name
            Thumbnail: ColouringRewardOneThumbnail, // smaller size image
            Unlock: ColouringRewardOne, // full size image
        },
        {
            CharacterName: 'Peanut', // monster name
            Thumbnail: ColouringRewardTwoThumbnail, // smaller size image
            Unlock: ColouringRewardTwo, // full size image
        },
        {
            CharacterName: 'Grunt', // monster name
            Thumbnail: ColouringRewardThreeThumbnail, // smaller size image
            Unlock: ColouringRewardThree, // full size image
        },
        {
            CharacterName: 'Pod', // monster name
            Thumbnail: ColouringRewardFourThumbnail, // smaller size image
            Unlock: ColouringRewardFour, // full size image
        },
        {
            CharacterName: 'Puff', // monster name
            Thumbnail: ColouringRewardFiveThumbnail, // smaller size image
            Unlock: ColouringRewardFive, // full size image
        },
        {
            CharacterName: 'Orbi', // monster name
            Thumbnail: ColouringRewardSixThumbnail, // smaller size image
            Unlock: ColouringRewardSix, // full size image
        },
];
