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

        Array.from(title).map((el, i) => {
            el.innerHTML = getTitle[i];
        });

        //set time
        const setTime = (getTime, getTimePrev) => {
            Array.from(dailyCurrent).map((el, i) => {
                el.innerHTML = getTime[i];
            });
            Array.from(dailyPrevious).map((el, i) => {
                el.innerHTML = getTimePrev[i];
            })
            //the same but using for loop
            // for (let i=0;i<=dailyCurrent.length-1;i++) {
            //     dailyCurrent[i].innerHTML = getTime[i];
            //     dailyPrevious[i].innerHTML = getTimePrev[i];
            // };
        }

        const setValue = (time, when, opacity) => {
            weeklyBtn.style.opacity = opacity;
            const getTime = json.map(el => {
                return `${el.timeframes[time].current}hrs`;
            });
            const getTimePrev = json.map(el => {
                return `Last ${when} - ${el.timeframes[time].previous}hrs`;
            });
            setTime(getTime, getTimePrev);
        }

        const dailyValue = () => {
            setValue('daily', 'Day', '');
        }
        
        const weeklyValue = () => {
            setValue('weekly', 'Week', '1');
        }
        weeklyValue();

        const monthlyValue = () => {
            setValue('monthly', 'Month', '');
        }
        
        dailyBtn.addEventListener('click', dailyValue);
        weeklyBtn.addEventListener('click', weeklyValue);
        monthlyBtn.addEventListener('click', monthlyValue);
    });

