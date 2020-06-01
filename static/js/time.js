const min = 60000;
const hour = min * 60;
const day = hour * 24;

function timeFormat(data) {
    var strTime = " error";
    var nowTime = new Date();
    var calTime = new Date(data+" UTC");
    var diff = nowTime.getTime() - calTime.getTime();

    if (diff >= day) {
        if (diff >= day * 2)
            strTime = Math.round(diff / day) + " days ago";
        else
            strTime = Math.round(diff / day) + " day ago";
    } else if (diff >= hour) {
        if (diff >= hour * 2)
            strTime = Math.round(diff / hour) + " hours ago";
        else
            strTime = Math.round(diff / hour) + " hour ago";
    } else if (diff >= min) {
        if (diff >= min * 2)
            strTime = Math.round(diff / min) + " mins ago";
        else
            strTime = Math.round(diff / min) + " min ago";
    } else
        strTime = "Less than a min ago";

    return document.write(strTime)
}