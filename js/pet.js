// console.log("all pets");


const loadPets = async () => {
    try {
        const res = await fetch(
            `https://openapi.programming-hero.com/api/peddy/pets`
        );
        const data = await res.json();
        displayPets(data.pets);

        // copy data for sort
        const currentPets = [...data.pets];
        sortByPrice(currentPets);

        const loadSpinner = document.getElementById('load-spinner');
        loadSpinner.classList.add('hidden');
    }
    catch (error) {
        console.log('ERROR:', error)
    }

}

const loadAdoptionModal = (petId) => {
    // console.log('adopted', petId);
    const adoptionBtn = document.getElementById(`adoption-btn-${petId}`);

    // show modal 
    document.getElementById("adoption_modal").showModal();


    //time count
    let count = 3;
    const timeCount = document.getElementById('time-count');
    timeCount.innerText = count;

    const countNum = setInterval(() => {
        count--;
        if (count < 1) {
            clearInterval(countNum);
            timeCount.innerText = "Adopted";

            // modal close and btn clicked
            document.getElementById('adopt_close').click();
            adoptionBtn.classList.add("btn-disabled");
        }
        else {
            timeCount.innerText = count;
            // console.log(count);
        }

    }, 1000);
}

const loadPetDetails = async (petId) => {
    // console.log(petId);
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayPetDetails(data.petData);

}

const displayPetDetails = (petData) => {

    // console.log(petData);
    const detailContainer = document.getElementById("modal-content");

    detailContainer.innerHTML = `
                    <img class="mx-auto w-full rounded-xl" src="${petData.image}" alt="" />
                    <div class="flex flex-col gap-3 mt-3 ">
                        <h2 class="font-bold text-2xl text-gray-one">${petData.pet_name ? petData.pet_name : 'Not available'}</h2>
                        <div class="grid grid-cols-2">
                            <div class="flex items-center gap-1">
                                <img class="w-4" src="./assets/grid-icon.png" alt="">
                                <p>Breed: ${petData.breed ? petData.breed : 'Unknown'}</p>
                            </div>
                            <div class="flex items-center gap-1">
                                <img class="w-4" src="./assets/calendar-icon.png" alt="">
                                <p>Birth: ${petData.date_of_birth ? petData.date_of_birth : 'Not available'}</p>
                            </div>
                            <div class="flex items-center gap-1">
                                <img class="w-4" src="./assets/gender-icon.png" alt="">
                                <p>Gender: ${petData.gender ? petData.gender : 'Not available'}</p>
                            </div>
                            <div class="flex items-center gap-1">
                                <img class="w-4" src="./assets/dollar-icon.png" alt="">
                                <p>Price: ${petData.price ? petData.price : 'Not available'}</p>
                            </div>
                            <div class="flex items-center gap-1">
                                <img class="w-4" src="./assets/vaccine-icon.png" alt="">
                                <p>Vaccinated status: ${petData.vaccinated_status ? petData.vaccinated_status : 'Not available'}</p>
                            </div>
                            
                        </div>
                        <div class="border"></div>
                        <div>
                            <h3 class="font-bold text-lg text-gray-one mb-1">Details Information</h3>
                            <p>${petData.pet_details}</p>
                        </div>
                    </div>    
    `;

    // show modal 
    document.getElementById("details_modal").showModal();
}

const loadLikedPet = async (petId) => {
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data = await res.json();
    likeThePetDisplay(data.petData.image);
}

const likeThePetDisplay = (petImage) => {
    // console.log("i like this pet", petImage);
    const likePetContainer = document.getElementById('like-pet-container');

    const imageDiv = document.createElement('div');
    imageDiv.innerHTML = `
        <img class="rounded-xl border" src="${petImage}" alt="">
    `;

    // add image on display 
    likePetContainer.appendChild(imageDiv);

}


function displayPets(pets) {
    // show spinner 
    const loadSpinner = document.getElementById('load-spinner');
    loadSpinner.classList.add('hidden');

    const petContainer = document.getElementById('pet-container');
    // petContainer.innerHTML = "";

    if (pets.length == 0) {
        petContainer.classList.remove("grid");
        petContainer.innerHTML = `   
            <div class="absolute w-full min-h-96 flex justify-center items-center col-span-3">
                <span id="load-spinner" class="loading loading-bars loading-lg hidden"></span>
            </div>


            <div class="min-h-96 flex justify-center items-center bg-[#13131305] rounded-xl">
                <div class="flex flex-col justify-center items-center gap-6 py-14">
                    <img src="./assets/error.png" alt="">
                    <h5 class="text-4xl text-center font-bold">No Information Available</h5>
                    <p class="text-lg text-gray-600 text-center w-2/3">
                        We're sorry, but it seems there is no relevant information available at the moment. Please try again later or contact support if you need further assistance.
                    </p>
                </div>
            </div>        
        
        `;
        return;
    }
    else {
        petContainer.classList.add("grid");
    }

    pets.forEach(pet => {
        // console.log(pet);

        // create pet card
        const petCard = document.createElement('div');
        petCard.classList = "rounded-xl bg-white overflow-hidden grid max-sm:grid-cols-1 max-md:grid-cols-2 max-sm:gap-0 max-lg:gap-6 p-4 border";
        petCard.innerHTML = `
                <img class="mx-auto w-full rounded-xl" src="${pet.image}" alt="" />
                <div class="flex flex-col gap-3 mt-3 ">
                    <h2 class="font-bold text-xl text-gray-one">${pet.pet_name ? pet.pet_name : 'Not available'}</h2>
                    <div>
                        <div class="flex items-center gap-1">
                            <img class="w-4" src="./assets/grid-icon.png" alt="">
                            <p>Breed: ${pet.breed ? pet.breed : 'Unknown'}</p>
                        </div>
                        <div class="flex items-center gap-1">
                            <img class="w-4" src="./assets/calendar-icon.png" alt="">
                            <p>Birth: ${pet.date_of_birth ? pet.date_of_birth : 'Not available'}</p>
                        </div>
                        <div class="flex items-center gap-1">
                            <img class="w-4" src="./assets/gender-icon.png" alt="">
                            <p>Gender: ${pet.gender ? pet.gender : 'Not available'}</p>
                        </div>
                        <div class="flex items-center gap-1">
                            <img class="w-4" src="./assets/dollar-icon.png" alt="">
                            <p>Price: ${pet.price ? pet.price : 'Not available'}</p>
                        </div>
                    </div>
                    <div class="border"></div>
                    <div class="grid grid-cols-3 gap-4">
                        <button onclick="loadLikedPet(${pet.petId})"
                                class="btn btn-outline text-lg border-primary text-primary hover:bg-primary hover:border-primary">
                                <i class="fa-regular fa-thumbs-up"></i></button>
                        <button onclick="loadAdoptionModal(${pet.petId})" id="adoption-btn-${pet.petId}"
                            class="btn btn-outline text-base border-primary text-primary hover:bg-primary hover:border-primary">Adopt</button>
                        <button onclick="loadPetDetails(${pet.petId})"
                            class="btn btn-outline text-base border-primary text-primary hover:bg-primary hover:border-primary">Details</button>
                    </div>
                </div>        
        `;

        // add cards
        petContainer.appendChild(petCard);
    });
};

// sort By Price function
const sortByPrice = (data) => {
    const sortPriceBtn = document.getElementById('sort-price-btn');
    sortPriceBtn.addEventListener('click', () => {

        // sort by value
        data.sort((a, b) => b.price - a.price);

        const petContainer = document.getElementById('pet-container');
        petContainer.innerHTML = "";
        petContainer.innerHTML = `
            <div class="absolute w-full min-h-96 flex justify-center items-center col-span-3">
                <span id="load-spinner" class="loading loading-bars loading-lg"></span>
            </div>
        `;

        setTimeout(() => {

            displayPets(data);
        }, 2000);
        
    });

}



// loadPets();

const showDefault = () => {
    const loadSpinner = document.getElementById('load-spinner');
    loadSpinner.classList.remove('hidden');

    setTimeout(() => {

        loadPets();
    }, 2000);
}

showDefault();
