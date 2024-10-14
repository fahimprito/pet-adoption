// console.log('categories added');

const loadCategories = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
        const data = await res.json();
        displayCategories(data.categories);

    }
    catch (error) {
        console.log('ERROR:', error)
    }

}


function displayCategories(categories) {
    const categorieContainer = document.getElementById('categorie-container');

    categories.forEach(item => {
        // console.log(item);

        // create buttonn
        const buttonContainer = document.createElement('div');
        // buttonContainer.classList = "w-full";
        buttonContainer.innerHTML = `

        <button
                 id="btn-${item.category}" onclick="loadPetsByCategory('${item.category}')" class="border-2 border-[#0e79815d] p-8 rounded-xl hover:bg-[#0e798110] text-2xl font-bold transform transition-transform duration-150 active:scale-95 w-full flex justify-center items-center gap-4 category-btn">
                <img src="${item.category_icon}" alt="">
                ${item.category}
        </button>
        `;

        // add button
        categorieContainer.appendChild(buttonContainer);

    });
}

const removeActiveStyle = () => {
    const button = document.getElementsByClassName("category-btn");

    for (btn of button) {
        btn.classList.remove("bg-[#0e79811a]", "rounded-full", "border-[#0e7981]");
    }
}

const loadPetsByCategory = async (category) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
        const data = await res.json();

        // remove all active style 
        removeActiveStyle();

        // add active style 
        const activeBtn = document.getElementById(`btn-${category}`)
        activeBtn.classList.add("bg-[#0e79811a]", "rounded-full", "border-[#0e7981]");
        
        showPetsByCategory(data.data);

    }
    catch (error) {
        console.log('ERROR:', error)
    }
}


const showPetsByCategory = (categoryData) => {
    const loadSpinner = document.getElementById('load-spinner');
    loadSpinner.classList.remove('hidden');

    const petContainer = document.getElementById('pet-container');
    petContainer.innerHTML = "";
    petContainer.innerHTML = `
            <div class="absolute w-full min-h-96 flex justify-center items-center col-span-3">
                <span id="load-spinner" class="loading loading-bars loading-lg"></span>
            </div>
        `;
    
    setTimeout(() => {

        displayPets(categoryData);
    }, 2000);
}



loadCategories();