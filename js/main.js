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
        categoryButton.addEventListener('click', () => {
            RenderMenu(item[`${userLanguage}Category`]);
        });
        categoryListDiv.appendChild(categoryButton);
        addedCategorys.add(item[`${userLanguage}Category`]);
       }
    });
}

function RenderMenu(category) {
    const dishesListDiv = document.querySelector(".dishes-list");
    dishesListDiv.innerHTML = "";

    menuStore.forEach(menuItem => {
        if (menuItem[`${userLanguage}Category`  ] == category) {
            const cardDiv = document.createElement("div");
            cardDiv.className = "dishes-card";
            cardDiv.innerHTML = `
            <img src="${menuItem.image}" alt="">
            <div class="dishes-card__info">
                <div class="dishes-card__description">
                    <h2>${menuItem[`${userLanguage}Name`]}</h2>
                    <p class="dishes-card__description-text">${menuItem[`${userLanguage}Description`]}</p>
                </div>
            </div>
            `;
            
            const portionsContainerDiv = document.createElement("div")
            portionsContainerDiv.className = "dishes-card__portions";

            const portionNames = [menuItem.portionName1,menuItem.portionName2,menuItem.portionName3,menuItem.portionName4,menuItem.portionName5]
            const dishesCardInfoDiv = cardDiv.querySelector(".dishes-card__info")

            portionNames.forEach((portionName, index) =>{
                if (portionName) {
                    const portionCost = menuItem[`portionCost${index + 1}`];
                    const portionItemDiv = document.createElement("div");
                    portionItemDiv.className = "portion-item";
                    portionItemDiv.innerHTML = `
                    <p class="portion-item__text">
                        <span class="portion-name">${portionName}</span>
                        <span class="portion-cost">${portionCost}</span>
                    </p>
                    <div class="portion-item__buttons">
                        <button class="portion-minus">-</button>
                        <span class="portion-number">0</span>
                        <button class="portion-plus">+</button>
                    </div>
                    `
                    
                    portionsContainerDiv.appendChild(portionItemDiv);
                }
            })

            dishesCardInfoDiv.appendChild(portionsContainerDiv);

            dishesListDiv.appendChild(cardDiv);
        }
    });
}
