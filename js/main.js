import { fetchDishesList } from "./getDataStore.js";

const userLanguage = document.documentElement.lang;

let menuStore;

fetchDishesList()
    .then(data => {
        menuStore = data;
        RenderCategoryButton()
    })

function RenderCategoryButton() {
    const categoryListDiv = document.querySelector('#dishesCategoryList');
    categoryListDiv.innerHTML = '';

    const addedCategorys = new Set();

    menuStore.forEach(item => {
       if (!addedCategorys.has(item[`${userLanguage}Category`])) {
        const categoryButton = document.createElement("button");
        categoryButton.innerText = item[`${userLanguage}Category`];
        categoryListDiv.appendChild(categoryButton);
        addedCategorys.add(item[`${userLanguage}Category`])
       }
    });
}

