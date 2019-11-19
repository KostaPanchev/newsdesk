export const checkForPropsChanges = (props, prevProps) => {
    if (
        props.user.settings.workbench.id !== prevProps.user.settings.workbench.id ||
        props.user.timestamp !== prevProps.user.timestamp ||
        props.searchQuery.date !== prevProps.searchQuery.date ||
        props.searchQuery.categoryId !== prevProps.searchQuery.categoryId ||
        props.pathname !== prevProps.pathname
    ) {
        return true;
    } else {
        return false;
    }
};

export const isEmptyObj = (obj) => {
    if(obj === null || obj === undefined || obj === ''){
        return true;
    } else {
        if(Object.keys(obj).length === 0 && obj.constructor === Object) {
            return true;
        } else {
            return false;
        }
    }
};

export const months = [
    'januar',
    'februar',
    'marts',
    'april',
    'maj',
    'juni',
    'juli',
    'august',
    'september',
    'oktober',
    'november',
    'december'
];

export const monthsShort = [
    'jan',
    'feb',
    'mar',
    'apr',
    'maj',
    'juni',
    'juli',
    'aug',
    'sep',
    'okt',
    'nov',
    'dec'
];

export const weekDays = [
    'Søndag',
    'Mandag',
    'Tirsdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lørdag'
];

export const weekdaysShort = ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'];

export const formatDateISO = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};

export const nextDay = (date) => {
    let d = new Date(date);
    var nextDay = new Date(d.getTime() + (24 * 60 * 60 * 1000));

    return formatDateISO(nextDay);
};

export const prevDay = (date) => {
    let d = new Date(date);
    var prevDay = new Date(d.getTime() - (24 * 60 * 60 * 1000));

    return formatDateISO(prevDay);
};

export const formatDateDK = (date, year=true) => {
    let d = new Date(date),
        month = '' + d.getMonth(),
        dd = '' + d.getDate(),
        yyyy = d.getFullYear();
    if (year) {
        return `${dd}. ${monthsShort[month]} ${yyyy}`;    
    } else {
        return `${dd}. ${monthsShort[month]}`;  
    }
};


export const getWeekDay = (date) => {
    let d = new Date(date),
        weekDay = d.getDay() ;
    return weekdaysShort[weekDay];
};

export const plusXDays = (date, days) => {
    let d = new Date(date);
    let ts = d.getTime();
    let newDay = ts + (days * 24 * 60 * 60 * 1000);
    let formatedDate = formatDateISO(new Date(newDay));
    return formatedDate;
};

export const getHour = (dateTime) => {
    let d = new Date(dateTime);
    return d.getHours();
};

export const getDisplayTime = (dateTime) => {
    let d = new Date(dateTime);
    let hh = d.getHours();
    if (hh < 10) {
        hh = `0${hh}`;
    }
    let mm = d.getMinutes();
    if (mm < 10) {
        mm = `0${mm}`;
    }
    // if(`${hh}:${mm}` === '00:00') {
    //     return '00:01';
    // } else {
    return `${hh}:${mm}`;
    // }
};

export const formatTime = (time) => {
    let formatedTime;
    if(time < 10){
        formatedTime = `0${time}:00`;
    } else {
        formatedTime = `${time}:00`;
    }
    return formatedTime;
};

export const getCategoryPriority = (post, categoryId) => {
    let priority = post.priority.value;
    if(post.post_categories.length){
        let match = post.post_categories.find(prio => parseInt(prio.category_id, 10) === parseInt(categoryId, 10));
        if(match){
            priority = match.priority;
        }
    } 

    return parseInt(priority, 10);
    // return 1;
};

export const scrollToViewPosts = () => {
    const h = new Date().getHours();
    if(document.getElementById(`posts-row-${h}`)){
        window.setTimeout(() => {
            const elmnt = document.getElementById(`posts-row-${h}`); 
            if(elmnt) {

                elmnt.scrollIntoView({behavior: "smooth", inline: "start"});
            }
        }, 1000);
    }
};