const sec = 1000
const min = sec * 60;
const hour = min * 60;
const day = hour * 24;

function timeFormat(data) {
    var strTime = " error";
    var nowTime = new Date();
    var calTime = new Date(data+" UTC");
    var diff = nowTime.getTime() - calTime.getTime();

    if (diff >= day) {
        strTime = Math.round(diff / day) + " 天前";
    } else if (diff >= hour) {
        strTime = Math.round(diff / hour) + " 小時前";
    } else if (diff >= min) {
        strTime = Math.round(diff / min) + " 分鐘前";
    } else if (diff >= sec) {
        strTime = Math.round(diff / sec) + " 秒前";
    } else
        strTime = "幾秒前";
        
    return document.write(strTime)
}