const title = document.querySelectorAll('.area-title');
const dailyCurrent = document.querySelectorAll('.area-daily-current');
const dailyPrevious = document.querySelectorAll('.area-daily-previous');
const dailyBtn = document.querySelector('.personal__data--daily');
const weeklyBtn = document.querySelector('.personal__data--weekly');
const monthlyBtn = document.querySelector('.personal__data--monthly');

fetch('./data.json')
    .then((response) => response.json())
    .then((json) => {
        
        //set title
        const getTitle = json.map(el => {
            return el.title;
        });

        for (let i=0;i<=title.length-1;i++) {
            title[i].innerHTML = getTitle[i];
        };

        const setTime = (getTime, getTimePrev) => {
            for (let i=0;i<=dailyCurrent.length-1;i++) {
                dailyCurrent[i].innerHTML = getTime[i];
                dailyPrevious[i].innerHTML = getTimePrev[i];
            };
        }

        //set time
        const dailyValue = () => {
            const getTime = json.map(el => {
                return `${el.timeframes.daily.current}hrs`;
            });
            const getTimePrev = json.map(el => {
                return `Last Day - ${el.timeframes.daily.previous}hrs`;
            });
            setTime(getTime, getTimePrev);
        }
        dailyValue();
        
        const weeklyValue = () => {
            const getTime = json.map(el => {
                return `${el.timeframes.weekly.current}hrs`;
            });
            const getTimePrev = json.map(el => {
                return `Last Week - ${el.timeframes.weekly.previous}hrs`;
            });
            setTime(getTime, getTimePrev);
        }

        const monthlyValue = () => {
            const getTime = json.map(el => {
                return `${el.timeframes.monthly.current}hrs`;
            });
            const getTimePrev = json.map(el => {
                return `Last Month - ${el.timeframes.monthly.previous}hrs`;
            });
            setTime(getTime, getTimePrev);
        }
        
        dailyBtn.addEventListener('click', dailyValue);
        weeklyBtn.addEventListener('click', weeklyValue);
        monthlyBtn.addEventListener('click', monthlyValue);
    });

