const dateInputRef=document.querySelector('#birthday');
const checkbtn=document.querySelector('#check-button');
const OutputBox=document.querySelector('#Output-Box');

checkbtn.addEventListener('click',function OncheckbuttonTap(){
    var dateInput=dateInputRef.value;
    if(dateInput!=='')
    {
        var listofDate=dateInput.split("-");

        var date={
            day :Number(listofDate[2]),
            month :Number(listofDate[1]),
            year :Number(listofDate[0])
        }
        var IsPalindrome=CheckPalindromeForAllDateForamts(date);
        if(IsPalindrome){
            OutputBox.innerText="Yeepie its a palindrome 😎😋";
        }
        else
        {
            var [countfutureDate,nextdate]=getNextPalindromeDate(date);
            var [countPreviousDate,Previousdate]=getPreviousPalindromeDate(date);

            if(countfutureDate<countPreviousDate)
            {
                OutputBox.innerText='The next Palindrome date is '+nextdate.day+"-"+nextdate.month+"-"+nextdate.year+"and by "+countfutureDate+"days";
                console.log(countPreviousDate);
            }
            else
            {
                OutputBox.innerText='The next Palindrome date is '+Previousdate.day+"-"+Previousdate.month+"-"+Previousdate.year+"and by "+countPreviousDate+"days";
                console.log(countfutureDate);
            }
        }

    }
    else
    {
        OutputBox.innerText="Please enter the date"
    }
});


function reverseString(str){
    var listofChars=str.split('');
    var reversestr=listofChars.reverse();
    var reversedStr=reversestr.join('');
    return reversedStr
}

function IsPalindrome(str){
    var reverse=reverseString(str);
    return str===reverse;
}

function ConvertDateToStr(date){
    
    var dateStr={day:'',month:'',year:''};

    if(date.day<10)
    dateStr.day='0'+date.day;
    else
    dateStr.day=date.day.toString();

    if(date.month<10)
    dateStr.month='0'+date.month;
    else
    dateStr.month=date.month.toString();

    dateStr.year=date.year.toString();
    return dateStr;
}

function getAlltheDates(date){
    var dateStr=ConvertDateToStr(date);

    var ddmmyyyy=dateStr.day+dateStr.month+dateStr.year;
    var mmddyyyy=dateStr.month+dateStr.day+dateStr.year;
    var yyyymmdd=dateStr.year+dateStr.day+dateStr.month;
    var ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice(-2);
    var mmddyy=dateStr.month+dateStr.day+dateStr.year.slice(-2);
    var yymmdd=dateStr.year.slice(-2)+dateStr.day+dateStr.month;

    return[ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]
}

function CheckPalindromeForAllDateForamts(date){
    var datearray=getAlltheDates(date);
    var flag=false;

    for(let i=0;i<datearray.length;i++)
    if(IsPalindrome(datearray[i]))
    {
        flag=true;
        break;

    }
    return flag;
}

function leapYear(year)
{
    if(year%400===0)
    return true;
    if(year%100===0)
    return false;
    if(year%4===0)
    return true;
    else 
    return false;
}
function getNextDay(date)
{
    var day=date.day+1;
    var month=date.month;
    var year=date.year;

    var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];

    if(leapYear(year))
    daysInMonth[1]=29;

    if(day>daysInMonth[month-1])
    {
        day=1;
        month++;
    }
    if(month>12)
    {
        month=1;
        year++;
    }

    return{
        day:day,
        month:month,
        year:year
    };
}

function getNextPalindromeDate(date){
    var ctr=0;
    var nextdate=getNextDay(date);

    while(true){
        ctr++;
        var IsPalindrome=CheckPalindromeForAllDateForamts(nextdate);
        if(IsPalindrome)
        break;
        nextdate=getNextDay(nextdate);
    }
    return[ctr,nextdate];
}


function getPreviousDay(date)
{
    var day=date.day-1;
    var month=date.month;
    var year=date.year;

    var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];

    if(leapYear(year))
    daysInMonth[1]=29;

    if(day===0)
    {
        month--;
        if(month===0)
        {
            month=12;
            year--;
        }
        day=daysInMonth[month-1];
    }
    return{
        day:day,
        month:month,
        year:year
    };
}

function getPreviousPalindromeDate(date){
    var ctr=0;
    var Previousdate=getPreviousDay(date);
    while(true){
        ctr++;
        var IsPalindrome=CheckPalindromeForAllDateForamts(Previousdate);
        if(IsPalindrome)
        break;
        Previousdate=getPreviousDay(Previousdate);
    }
    return[ctr,Previousdate];
}