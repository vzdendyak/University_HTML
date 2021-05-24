(function () {
    $ajaxUtils.sendGetRequest(
        "snippets/header.snippet.html",
        response => {
            document.getElementById("header").innerHTML = response
        });
    loadCategories();
}());

function insertProperty(html, propName, propValue) {
    return html.replace(new RegExp(`{{${propName}}}`, "g"), propValue);
}


function mainContentClear() {
    document.getElementById("main-content").innerHTML =
        `<div id="category-name"></div>
         <div class="row justify-content-center" id="categories"></div>
         <div id="category-special"></div>`;
}

function loadCategories() {
    mainContentClear();
    $ajaxUtils.sendGetRequest(
        "storage/categories.json",
        categoriesResp => {
            $ajaxUtils.sendGetRequest(
                "snippets/category-item.snippet.html",
                catSnippet => {
                    var categories = JSON.parse(categoriesResp);
                    categories.forEach(ct => {
                        var html = catSnippet;
                        html = insertProperty(html, "name", ct.name);
                        html = insertProperty(html, "image", ct.image);
                        html = insertProperty(html, "id", ct.id);
                        html = insertProperty(html, "notes", ct.notes);
                        html = insertProperty(html, "shortname", ct.shortname);
                        document.getElementById("categories").innerHTML += html

                    });
                });
        });
    $ajaxUtils.sendGetRequest(
        "snippets/specials.snippet.html",
        specialsSnippet => {
            document.getElementById("category-special").innerHTML = specialsSnippet
        });
}

function loadCategory(id) {
    mainContentClear();
    $ajaxUtils.sendGetRequest(
        "storage/categories.json",
        categoriesJson => {
            var categories = JSON.parse(categoriesJson);
            var selectedCategory = categories.filter(c => c.id == id)[0];

            $ajaxUtils.sendGetRequest(
                "snippets/category-header.snippet.html",
                categoryHeaderSnippet => {
                    categoryHeaderSnippet = insertProperty(categoryHeaderSnippet, "name", selectedCategory.name);
                    document.getElementById("category-name").innerHTML = categoryHeaderSnippet
                });
            loadCategoryItems(selectedCategory);
        });

}

function loadSpecials() {
    var randCategory = Math.floor(Math.random() * (4 - 1) + 1);
    loadCategory(randCategory);
}

function loadCatalog() {
    mainContentClear();
    $ajaxUtils.sendGetRequest(
        "storage/categories.json",
        function (response) {
            var categories = JSON.parse(response);
            categories.forEach(c => {
                loadCategoryItems(c);
            });
        });
}

function loadCategoryItems(category) {
    $ajaxUtils.sendGetRequest(
        "snippets/item.snippet.html",
        itemSnippet => {
            $ajaxUtils.sendGetRequest(
                `storage/items/${category.shortname}-items.json`,
                catItemsJson => {
                    var catItems = JSON.parse(catItemsJson);
                    catItems.forEach(i => {
                        var html = itemSnippet;
                        html = insertProperty(html, "name", i.name);
                        html = insertProperty(html, "image", i.image);
                        html = insertProperty(html, "description", i.description);
                        html = insertProperty(html, "price", i.price);
                        document.getElementById("categories").innerHTML += html
                    });
                });
        });
}