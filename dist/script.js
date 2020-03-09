//navbar
const notification_btn = document.getElementById('notification_btn')
const notification_list = document.getElementById('notification_list')

notification_list.style.display = 'none'

notification_btn.addEventListener('click', (e) => {
  if(notification_list.style.display === 'none'){
    notification_list.style.display = 'block'
  }
  else{
    notification_list.style.display = 'none'
  }
})

const dropdown_btn = document.getElementById('dropdown_btn')
const dropdown_list = document.getElementById('dropdown_list')

dropdown_list.style.display = 'none'

dropdown_btn.addEventListener('click', (e) => {
  if(dropdown_list.style.display === 'none'){
    dropdown_list.style.display = 'block'
  }
  else{
    dropdown_list.style.display = 'none'
  }
})


//sidebar

const left = document.querySelector('.sidebar_left')
function openSideMenu(e) {
  document.getElementById('side-menu').style.width = '220px'
  document.querySelector('.manage_campaign_right').style.marginLeft = '65px'
  // left.classList.add('no_display')
}

function closeSideMenu(){
  document.getElementById('side-menu').style.width = '0px'
  document.querySelector('.manage_campaign_right').style.marginLeft = '0px'
  // left.classList.remove('no_display')

}
// function pDefault(e){}

//dropdown
document.querySelector('.custom-select-wrapper-service').addEventListener('click', function() {
  this.querySelector('.custom-select-service').classList.toggle('open-service');
})

for (const option of document.querySelectorAll(".custom-option-service")) {
option.addEventListener('click', function() {
    if (!this.classList.contains('selected-service')) {
        this.parentNode.querySelector('.custom-option-service.selected-service').classList.remove('selected-service');
        this.classList.add('selected-service');
        this.closest('.custom-select-service').querySelector('.custom-select__trigger-service span').textContent = this.textContent;
    }
})
}

document.querySelector('.custom-select-wrapper-template').addEventListener('click', function() {
  this.querySelector('.custom-select-template').classList.toggle('open-template');
})

for (const option of document.querySelectorAll(".custom-option-template")) {
option.addEventListener('click', function() {
    if (!this.classList.contains('selected-template')) {
        this.parentNode.querySelector('.custom-option-template.selected-template').classList.remove('selected-template');
        this.classList.add('selected-template');
        this.closest('.custom-select-template').querySelector('.custom-select__trigger-template span').textContent = this.textContent;
    }
})
}

document.querySelector('.custom-select-wrapper-upload').addEventListener('click', function() {
  this.querySelector('.custom-select-upload').classList.toggle('open-upload');
})

for (const option of document.querySelectorAll(".custom-option-upload")) {
option.addEventListener('click', function() {
    if (!this.classList.contains('selected-upload')) {
        this.parentNode.querySelector('.custom-option-upload.selected-upload').classList.remove('selected-upload');
        this.classList.add('selected-upload');
        this.closest('.custom-select-upload').querySelector('.custom-select__trigger-upload span').textContent = this.textContent;
    }
})
}

document.querySelector('.custom-select-wrapper-language').addEventListener('click', function() {
  this.querySelector('.custom-select-language').classList.toggle('open-language');
})

for (const option of document.querySelectorAll(".custom-option-language")) {
option.addEventListener('click', function() {
    if (!this.classList.contains('selected-language')) {
        this.parentNode.querySelector('.custom-option-language.selected-language').classList.remove('selected-language');
        this.classList.add('selected-language');
        this.closest('.custom-select-language').querySelector('.custom-select__trigger-language span').textContent = this.textContent;
    }
})
}

//date
const date_picker_element = document.querySelector('.date-picker') // 
const selected_date_element = document.querySelector('.date-picker .selected-date') //
const dates_element = document.querySelector('.date-picker .dates') //
const mth_element = document.querySelector('.date-picker .dates .month .mth')
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth')
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth')

const days_element = document.querySelector('.date-picker .dates .days')
const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]

let date  = new Date()
let day = date.getDate()
let month = date.getMonth()
let year = date.getFullYear()

let selectedDate = date
let selectedDay = day
let selectedMonth = month
let selectedYear = year

mth_element.textContent = months[month] + ' ' + year
selected_date_element.textContent = formatDate(date)
 
populateDates()

//event listener
date_picker_element.addEventListener('click', toggleDatePicker);
next_mth_element.addEventListener('click', goToNextMonth)
prev_mth_element.addEventListener('click', goToPrevMonth)

//functions
function toggleDatePicker(e){
  // console.log(e.path)
  if(!checkEventPathForClass(e.path, 'dates')){
    dates_element.classList.toggle('active')
  }
}

function goToNextMonth(e){
  month++;
  if(month > 11){
    month = 0;
    year++
  }
  mth_element.textContent = months[month] + ' ' + year
  populateDates()
}

function goToPrevMonth(e){
  month--;
  if(month < 0){
    month = 11;
    year--
  }
  mth_element.textContent = months[month] + ' ' + year
  populateDates()
}

function populateDates(e){
  days_element.innerHTML = ''
  let amount_days = 31

  if(month == 1){
    amount_days = 28
  }

  if(month == 1 && year % 4 == 0){
    amount_days = 29
  }

  if(month == 3 || month == 5 || month == 8 || month == 10){
    amount_days = 30
  }

  for(let i =0; i< amount_days; i++){
    const day_element = document.createElement('div')
    day_element.classList.add('day')
    day_element.textContent = i + 1

    if(selectedDay == (i+1) && selectedYear == year && selectedMonth == month){
      day_element.classList.add('selected')
    }

    day_element.addEventListener('click', function(){
      selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1))
      selectedDay = (i + 1)
      selectedMonth = month
      selectedYear = year

      selected_date_element.textContent = formatDate(selectedDate)
      selected_date_element.dataset.value = selectedDate

      populateDates()
    })

    days_element.appendChild(day_element)

  }
}

//helper function
function checkEventPathForClass(path, selector){
  for(let i =0; i<path.length; i++){
    if(path[i].classList && path[i].classList.contains(selector)){
      return true
    }
  }
  return false
}

function formatDate(d){
  let day = d.getDate()
  if(day < 10){
    day = '0' + day
  }

  let month = d.getMonth() + 1
  if(month < 10){
    month = '0' + month
  }

  let year = d.getFullYear()

  return day + ' / ' + month + ' / ' + year
}

// ///////////////////////////////date 2

const date_picker_two_element = document.querySelector('.date-picker-two') // 
const selected_date_two_element = document.querySelector('.date-picker-two .selected-date-two') //
const dates_two_element = document.querySelector('.date-picker-two .dates-two') //
const mth_two_element = document.querySelector('.date-picker-two .dates-two .month-two .mth-two')
const next_mth_two_element = document.querySelector('.date-picker-two .dates-two .month-two .next-mth-two')
const prev_mth_two_element = document.querySelector('.date-picker-two .dates-two .month-two .prev-mth-two')

const days_two_element = document.querySelector('.date-picker-two .dates-two .days-two')
const months_two = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]

let date_two  = new Date()
let day_two = date_two.getDate()
let month_two = date_two.getMonth()
let year_two = date_two.getFullYear()

let selectedDate_two = date_two
let selectedDay_two = day_two
let selectedMonth_two = month_two
let selectedYear_two = year_two

mth_two_element.textContent = months_two[month_two] + ' ' + year_two
selected_date_two_element.textContent = formatDateTwo(date_two)
 
populateDates_two()

// //event listener
date_picker_two_element.addEventListener('click', toggleDatePickerTwo);
next_mth_two_element.addEventListener('click', goToNextMonthTwo)
prev_mth_two_element.addEventListener('click', goToPrevMonthTwo)

// //functions
function toggleDatePickerTwo(e){
  // console.log(e.path)
  if(!checkEventPathForClassTwo(e.path, 'dates-two')){
    dates_two_element.classList.toggle('active-two')
  }
}

function goToNextMonthTwo(e){
  month_two++;
  if(month_two > 11){
    month_two = 0;
    year_two++
  }
  mth_two_element.textContent = months_two[month_two] + ' ' + year_two
  populateDates_two()
}

function goToPrevMonthTwo(e){
  month_two--;
  if(month_two < 0){
    month_two = 11;
    year_two--
  }
  mth_two_element.textContent = months_two[month_two] + ' ' + year_two
  populateDates_two()
}

function populateDates_two(e){
  days_two_element.innerHTML = ''
  let amount_two_days = 31

  if(month_two == 1){
    amount_two_days = 28
  }

  if(month_two == 1 && year_two % 4 == 0){
    amount_two_days = 29
  }

  if(month_two == 3 || month_two == 5 || month_two == 8 || month_two == 10){
    amount_two_days = 30
  }

  for(let i =0; i< amount_two_days; i++){
    const day_two_element = document.createElement('div')
    day_two_element.classList.add('day-two')
    day_two_element.textContent = i + 1

    if(selectedDay_two == (i+1) && selectedYear_two == year_two && selectedMonth_two == month_two){
      day_two_element.classList.add('selected-two')
    }

    day_two_element.addEventListener('click', function(){
      selectedDate_two = new Date(year_two + '-' + (month_two + 1) + '-' + (i + 1))
      selectedDay_two = (i + 1)
      selectedMonth_two = month_two
      selectedYear_two = year_two

      selected_date_two_element.textContent = formatDateTwo(selectedDate_two)
      selected_date_two_element.dataset.value = selectedDate_two

      populateDates_two()
    })

    days_two_element.appendChild(day_two_element)

  }
}

// //helper function
function checkEventPathForClassTwo(path, selector){
  for(let i =0; i<path.length; i++){
    if(path[i].classList && path[i].classList.contains(selector)){
      return true
    }
  }
  return false
}

function formatDateTwo(d){
  let day = d.getDate()
  if(day < 10){
    day = '0' + day
  }

  let month = d.getMonth() + 1
  if(month < 10){
    month = '0' + month
  }

  let year = d.getFullYear()

  return day + ' / ' + month + ' / ' + year
}