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

    // Answer Page
    var answer1 = new CountUp("answer1", 12.52, 2500, 0, 3, options);
    answer1.start();
    var answer2 = new CountUp("answer2", 1, 5000, 0, 3, options);
    answer2.start();
    var answer3 = new CountUp("answer3", 24.02, 1500, 0, 3, options);
    answer3.start();
    var answer4 = new CountUp("answer4", 1254, 1000, 0, 3, options);
    answer4.start();
});