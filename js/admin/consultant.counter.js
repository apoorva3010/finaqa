$(function(){   
var useOnComplete = false,
       useEasing = false,
       useGrouping = false,
       options = {
           useEasing: useEasing, // toggle easing
           useGrouping: useGrouping, // 1,000,000 vs 1000000
           separator: ',', // character to use as a separator
           decimal: '.' // character to use as a decimal
       };
    //Consultant page
    var consultant1 = new CountUp("consultant1", 12.52, 2500, 0, 3, options);
    consultant1.start();
    var consultant2 = new CountUp("consultant2", 1, 100, 0, 3, options);
    consultant2.start();
    var consultant3 = new CountUp("consultant3", 24.02, 5000, 0, 3, options);
    consultant3.start();
    var consultant4 = new CountUp("consultant4", 1254, 8000, 0, 3, options);
    consultant4.start();
});