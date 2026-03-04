const loadLessons = ()=>{
    const AllLevelUrl = 'https://openapi.programming-hero.com/api/levels/all'
    fetch(AllLevelUrl)
    .then(res => res.json())
    .then(data => displayLessons(data.data))
};

const loadWord =(id)=>{
    const wordUrl = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(wordUrl)
    .then(rsc=> rsc.json())
    .then(json=> displayLoadWord(json.data))
};

const displayLoadWord = (words)=>{
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML= "";

    words.forEach(word => {
        const wordDiv= document.createElement('div');
        wordDiv.innerHTML = `
          <div class="bg-white rounded-lg text-center space-y-3 py-16 px-12 shadow-sm">
          <h4 class="text-3xl font-bold">${word.word}</h4>
          <p class="text-[20px] font-medium">${word.meaning}</p>
          <h3 class="font-bangla text-3xl font-bold">${word.pronunciation}</h3>
          <div class="flex justify-between items-center">
            <button class="bg-[#1a90ff31] p-4 rounded-sm cursor-pointer hover:bg-[#1a90ffd2]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="bg-[#1a90ff31] p-4 rounded-sm cursor-pointer hover:bg-[#1a90ffd2]"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>
        `
        wordContainer.append(wordDiv)
    })


    


};


const displayLessons= (lessons)=>{
    // get the container
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML= "";
    for(let lesson of lessons){
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML=`<div class=" flex">  
        
        <button onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-primary"
                  ><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
       
       </div>
        `
        levelContainer.append(btnDiv)
    }


};

loadLessons()