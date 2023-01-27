const title = Array.from(document.querySelectorAll('.area-title'));
const dailyCurrent = Array.from(document.querySelectorAll('.area-daily-current'));
const dailyPrevious = Array.from(document.querySelectorAll('.area-daily-previous'));
const dailyBtn = document.querySelector('.personal__data--daily');
const weeklyBtn = document.querySelector('.personal__data--weekly');
const monthlyBtn = document.querySelector('.personal__data--monthly');

fetch('./data.json')
    .then((response) => response.json())
    .then((json) => {

        //set title
        const boxTitles = json.map(el => {
            return el.title;
        });

        title.map((el, i) => {
            el.innerHTML = boxTitles[i];
        });

        //set time
        const setTime = (getTime, getTimePrev) => {
            dailyCurrent.map((el, i) => {
                el.innerHTML = getTime[i];
            });
            dailyPrevious.map((el, i) => {
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
            const activityTime = json.map(el => {
                return `${el.timeframes[time].current}hrs`;
            });
            const prevActivityTime = json.map(el => {
                return `Last ${when} - ${el.timeframes[time].previous}hrs`;
            });
            setTime(activityTime, prevActivityTime);
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

