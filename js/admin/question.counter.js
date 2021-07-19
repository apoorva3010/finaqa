$(function () {
    var useOnComplete = false,
            useEasing = false,
            useGrouping = false,
            options = {
                useEasing: useEasing, // toggle easing
                useGrouping: useGrouping, // 1,000,000 vs 1000000
                separator: ',', // character to use as a separator
                decimal: '.' // character to use as a decimal
            };
    //Question page    
    var question1 = new CountUp("question1", 12.52, 2500, 0, 3, options);
    question1.start();
    var question2 = new CountUp("question2", 1, 5000, 0, 3, options);
    question2.start();
    var question3 = new CountUp("question3", 24.02, 1500, 0, 3, options);
    question3.start();
    var question4 = new CountUp("question4", 1254, 1000, 0, 3, options);
    question4.start();

});