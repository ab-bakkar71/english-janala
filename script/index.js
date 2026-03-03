const loadLessons = ()=>{
    const AllLevelUrl = 'https://openapi.programming-hero.com/api/levels/all'
    fetch(AllLevelUrl)
    .then(res => res.json())
    .then(data => displayLessons(data.data))
}

const displayLessons= (lessons)=>{
    // get the container
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML= "";
    for(let lesson of lessons){
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML=`<div class=" flex">  
        
        <button href="#" class="btn btn-outline btn-primary"
                  ><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
       
       </div>
        `
        levelContainer.append(btnDiv)
    }


}

loadLessons()