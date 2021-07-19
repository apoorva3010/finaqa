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
    // payment page
    
    var payment1 = new CountUp("payment1", 1, 222500, 0, 2, options);
    payment1.start();
    var payment2 = new CountUp("payment2", 1, 55000, 0, 2, options);
    payment2.start();
    var payment3 = new CountUp("payment3", 2, 45000, 0, 2, options);
    payment3.start();
    var payment4 = new CountUp("payment4", 1, 10000, 0, 2, options);
    payment4.start();
});