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
    //Customer Page
    var customer1 = new CountUp("customer1", 12.52, 9500, 0, 3, options);
    customer1.start();
    var customer2 = new CountUp("customer2", 1, 100, 0, 3, options);
    customer2.start();
    var customer3 = new CountUp("customer3", 24.02, 5000, 0, 3, options);
    customer3.start();
    var customer4 = new CountUp("customer4", 1254, 8000, 0, 3, options);
    customer4.start();
});