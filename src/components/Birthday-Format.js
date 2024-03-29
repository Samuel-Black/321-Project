/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

// format date for use in MySQL
export default function FormatBirthday(date) {
    let formattedBirthday = date.slice(11,15) + '-' + returnMonth(date) + '-' + date.slice(8,10)

    return formattedBirthday;
}

// return numerical month value for use in MySQL
function returnMonth(date) {
    switch(date.slice(4,7)) {
        case 'Jan':
            return '01'
        case 'Feb':
            return '02'
        case 'Mar': 
            return '03'
        case 'Apr':
            return '04'
        case 'May':
            return '05'
        case 'Jun':
            return '06'
        case 'Jul':
            return '07'
        case 'Aug':
            return '08'
        case 'Sep':
            return '09'
        case 'Oct':
            return '10'
        case 'Nov':
            return '11'
        case 'Dec':
            return '12'
    }
}
