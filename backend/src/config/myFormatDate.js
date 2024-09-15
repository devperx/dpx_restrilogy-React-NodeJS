const getdate = (date_object) => {

    var month = date_object.getUTCMonth() + 1; 
    var day = date_object.getUTCDate();
    var year = date_object.getUTCFullYear();

    var format_date = year + "/" + month + "/" + day;

    return format_date;

}

const getHour = (date_object) => {

    var hours = date_object.getHours();
    var minutes = date_object.getMinutes();
    var am_or_pm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12 

    minutes = minutes < 10 ? "0" + minutes : minutes;

    var format_hours = hours + ":" + minutes + " " + am_or_pm;

    return format_hours;
}


module.exports = {
    getdate,
    getHour
}
