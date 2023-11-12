$(function() {
    document.getElementById('search-button').addEventListener('click', function() {
        var inputVal = document.getElementById('search-bar').value;
        // Here goes your code to perform the search and show the results
    });
    
    document.getElementById('random-meal-button').addEventListener('click', function() {
        // Here goes your code to display a random meal
        console.log("NEW MEAL");
    });

    // Code to display recently viewed items
    let recentlyViewedList = ''; // this string must contain all recently viewed items in acceptable HTML form
    document.getElementById('recentlyViewed').innerHTML = recentlyViewedList;
});