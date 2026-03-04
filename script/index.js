
const createElement = (arr) => {
    const htmlElements = arr.map((el) => `<span class="bg-[#EDF7FF] border border-[#D7E4EF] py-2 px-5 rounded-sm">${el}</span>`);
    return htmlElements.join(' ');
}

const manageSpinner = (status)=> {
    if(status == true){
        document.getElementById("spinner").classList.remove('hidden');
        document.getElementById("word-container").classList.add('hidden');
    }
    else{
        document.getElementById("spinner").classList.add('hidden');
         document.getElementById("word-container").classList.remove('hidden');
    }
}

//  All Levels funcation
const loadLessons = ()=>{
    const AllLevelUrl = 'https://openapi.programming-hero.com/api/levels/all'
    fetch(AllLevelUrl)
    .then(res => res.json())
    .then(data => displayLessons(data.data))
};

// remove active btn function
const removeActive =()=>{
    const lessonBtn= document.querySelectorAll('.lesson-btn');
    lessonBtn.forEach(btn=> btn.classList.remove('active'))
}
// Words by Levels function
const loadWord =(id)=>{
    manageSpinner(true);
    const wordUrl = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(wordUrl)
    .then(rsc=> rsc.json())
    .then(json=> {
        removeActive();
         // remove active btn function
        const clickBtn =document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active")
        displayLoadWord(json.data);
    })
};

// Words Detail function
const loadWordDetail= async(id)=> {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res =await fetch(url);
    const detail = await res.json();
    displayWordDetail(detail.data)

}

// Words Detail display function

const displayWordDetail= (word)=>{
 const detailContainer = document.getElementById('detail-container')
 detailContainer.innerHTML= `
 <div>
        <h2 class="text-4xl font-semibold mb-7">${word.word ?word.word : 'শব্দ পাওয়া যায়নি'} (<i class="fa-solid fa-microphone-lines"></i> : ${word.word ?word.word : 'শব্দ পাওয়া যায়নি'})</h2>
        <h4 class="text-2xl font-semibold mb-2">Meaning</h4>
        <p class="font-medium font-bangla mb-7">${word.meaning ?word.meaning : 'অর্থ পাওয়া যায়নি'}</p>
        <h4 class="text-2xl font-semibold mb-2">Example</h4>
        <p class="mb-7">${word.sentence ? word.sentence : 'বাক্য পাওয়া যায়নি'}</p>
        <h4 class="text-2xl font-semibold mb-2">Parts Of Speech</h4>
        <p class="mb-7">"${word.partsOfSpeech? word.partsOfSpeech : 'partsOfSpeech পাওয়া যায়নি'}"</p>
        <div>
        <h4 class="text-2xl font-semibold font-bangla mb-2">সমার্থক শব্দ গুলো</h4>
          ${createElement(word.synonyms)}
        </div>
      </div>
 `
 document.getElementById('Word_modal').showModal();
}


const displayLoadWord = (words)=>{
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML= "";


    if(words.length === 0){
        wordContainer.innerHTML=`
        <div class="py-16 text-center col-span-full space-y-3">
          <img class="mx-auto" src="./assets/alert-error.png" alt="">
          <p class="text-[#79716B] font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <h3 class="font-bangla text-3xl font-medium">নেক্সট Lesson এ যান</h3>
        </div>
        `
    }

    words.forEach(word => {
        const wordDiv= document.createElement('div');
        wordDiv.innerHTML = `
          <div class="bg-white rounded-lg text-center space-y-3 py-16 px-12 shadow-sm">
          <h4 class="text-3xl font-bold">${word.word ?word.word : 'শব্দ পাওয়া যায়নি'}</h4>
          <p class="text-[20px] font-medium">${word.meaning ?word.meaning : 'অর্থ পাওয়া যায়নি'}</p>
          <h3 class="font-bangla text-3xl font-bold">${word.pronunciation ?word.pronunciation : 'উচ্চারণ পাওয়া যায়নি'}</h3>
          <div class="flex justify-between items-center">
            <button onclick="loadWordDetail(${word.id})" class="bg-[#1a90ff15] p-4 rounded-sm cursor-pointer hover:bg-[#1a90ffd2]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="bg-[#1a90ff15] p-4 rounded-sm cursor-pointer hover:bg-[#1a90ffd2]"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>
        `
        wordContainer.append(wordDiv)
    });
manageSpinner(false);
};


const displayLessons= (lessons)=>{
    // get the container
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML= "";
    for(let lesson of lessons){
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML=`<div class=" flex">  
        
        <button id="lesson-btn-${lesson.level_no}" onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"
                  ><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
       
       </div>
        `
        levelContainer.append(btnDiv)
    }


};

loadLessons()