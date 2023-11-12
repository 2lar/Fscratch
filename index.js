import { apiKey } from './config.js';

$(function() {
    $('form').on("submit", async function(e) {
        e.preventDefault();
        loading();
        
        try {
            let data = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${$('.search-bar').val()}&number=1&apiKey=${apiKey}`);
            let item = await data.json();
            removeLoading();
            if (item.length > 0) {
                let recipe = await fetch(`https://api.spoonacular.com/recipes/${item[0].id}/information?apiKey=${apiKey}`);
                let recipeData = await recipe.json();
                displayRecipe(recipeData, item[0].image);
            } else {
                $('#recipeOp').empty().append("<p>No recipes found</p>");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });

    function displayRecipe(item, image) {
        const details = item.extendedIngredients;
        const getAmount = details.map(ingAmt => ingAmt.original);

        const recipe = `
            <div class="card" style="width: 18rem;">
                <h5 class="card-title" id="recipeName">${item.title}</h5>
                <img class="card-img-top" id="image" src="${image}" alt="Card image cap" />
                <button id="${item.id}" type="button" class="btn btn-warning">PICK THIS RECIPE</button>
                <div class="card-body">
                    <p class="card-text" id="recipe">${item.summary}</p>
                    <h5>Ingredients:</h5>
                    <ul>
                        ${getAmount.map(ingredient => `<li>${ingredient}</li>`).join("")}
                    </ul>
                </div>
            </div>`;

        $('#recipeOp').empty().append(recipe);

        $(`#${item.id}`).on("click", function() {
            $('#recipeOp').empty();

            $(function () {
                $("#tabs").tabs();
            });

            const recipeChoice = `
                <div id="tabs">
                    <ul>
                        <li><a href="#tabs-1">Meal</a></li>
                        <li><a href="#tabs-2">Ingredients</a></li>
                        <li><a href="#tabs-3">Directions</a></li>
                    </ul>
                    <div id="tabs-1">
                        <h3>${item.title}</h3>
                        <img src="${image}" alt="Meal Image">
                    </div>
                    <div id="tabs-2">
                        <h5>Ingredients:</h5>
                        <ul>
                            ${getAmount.map(ingredient => `<li>${ingredient}</li>`).join("")}
                        </ul>
                    </div>
                    <div id="tabs-3">
                        <h4>${item.title}</h4>
                        <p>${item.instructions}</p>
                    </div>
                </div>`;

            $('#recipeOp').append(recipeChoice);
        });
    }

    function loading() {
        $(".container").append("<div class='loading'><img src='images/loading.gif'></div>");
    }

    function removeLoading() {
        $(".loading").remove();
    }
});
