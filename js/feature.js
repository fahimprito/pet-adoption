// scrolls down to the “Adopt Your Best Friend” section
function scrollToAdoptSection(){
    // console.log('Adopt section')
    const adoptPetSection = document.getElementById('adopt-pet-section');
    adoptPetSection.scrollIntoView({
        behavior: "smooth", 
        block: "start",
    });
}

