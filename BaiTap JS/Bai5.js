for (let i = 10; i >= 1; i--) {
    setTimeout(
        function(num) {
            console.log(num);
        }, 
        (10 - i) * 1000, 
        i
    ); 
}

// for (let i = 10; i >= 1; i--) {
//     (
//         function(num) {
//             setTimeout(function() {
//                 console.log(num);
//             }, (10 - num) * 1000);
//         }
//     )(i);
// }
