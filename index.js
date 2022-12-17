class Calendar {
  #initedDate;
  #monthOffset = 0;
  #dayList = [];

  constructor(date) {
    this.#initedDate = date
      ? new Date(new Date(date).setHours(0, 0, 0, 0))
      : new Date(new Date().setHours(0, 0, 0, 0));
  }

  #createDay({
    key,
    date,
    isPastDay,
    isPrevMonthDay,
    isNextMonthDay,
    isToday,
  }) {
    return {
      key,
      date,
      isPastDay,
      isPrevMonthDay,
      isNextMonthDay,
      isToday,
    };
  }

  #calculateMonth() {
    this.#dayList = [];
    
    const month = this.#initedDate.getMonth() + this.#monthOffset;
    const year = this.#initedDate.getFullYear();

    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);

    const lastDay = lastDate.getDate() + 1;

    // week day format: [0, ..., 6];
    const startWeekDayIndex = firstDate.getDay();
    const endWeekDayIndex = lastDate.getDay();

    const weekDayLoopStartIndex = 1 - (startWeekDayIndex === 0
      ? 6 - startWeekDayIndex
      : startWeekDayIndex - 1);
    const weekDayLoopEndIndex = lastDay + (endWeekDayIndex === 0
      ? endWeekDayIndex
      : 7 - endWeekDayIndex);

    const today = new Date().setHours(0, 0, 0, 0);

    for (let i = weekDayLoopStartIndex; i < weekDayLoopEndIndex; i++) {
      const date = new Date(year, month, i);
      const dateInTime = date.getTime();
      this.#dayList.push(
        this.#createDay({
          key: dateInTime,
          date,
          isPastDay: dateInTime < today,
          isPrevMonthDay: date.getMonth() < month,
          isNextMonthDay: date.getMonth() > month, // date.getMonth() > month,
          isToday: today === dateInTime,
        })
      );
    }
     
    return this.#dayList;
  }

  prevMonth() {
    this.#monthOffset--;
    this.#calculateMonth();
  }
  nextMonth() {
    this.#monthOffset++;
    this.#calculateMonth();
  }

  reset() {
    this.#monthOffset = 0;
    this.#calculateMonth();
  }

  get dayList() {
    return this.#dayList;
  }
}


const calendar = new Calendar(new Date());

document.querySelector('#prevMonth').addEventListener('click', () => {
  calendar.prevMonth();
  console.log(calendar.dayList);
});

document.querySelector('#nextMonth').addEventListener('click', () => {
  calendar.nextMonth();
  console.log(calendar.dayList);
});

document.querySelector('#reset').addEventListener('click', () => {
  calendar.reset();
  console.log(calendar.dayList);
});
