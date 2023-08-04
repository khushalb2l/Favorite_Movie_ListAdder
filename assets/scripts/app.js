const addMovieModal=document.getElementById('add-modal');
const startAddMovieButton=document.querySelector("header button");
const backdrop=document.getElementById('backdrop');
const cancelAddMovieModal=addMovieModal.querySelector('.btn--passive');
const addAddMovieModal=addMovieModal.querySelector('.btn--success');
const userInputs=addMovieModal.querySelectorAll('input');
const entryTextSection=document.getElementById('entry-text');
const deleteMovieModal=document.getElementById('delete-modal');

//movie list
const movies=[];

//EnteyTextSection
const updateUI=()=>{
  if(movies.length===0){
    entryTextSection.style.display='block';
  }
  else{
    entryTextSection.style.display='none';
  }
};



//confirmation of Deletion
const deleteMovieHandler=(movieId)=>{
  let movieIndex=0;
  for(const movie of movies){
    if(movie.id===movieId){
      break;
    }
    movieIndex++;
  }

  movies.splice(movieIndex,1);
  const listRoot=document.getElementById('movie-list');
  listRoot.children[movieIndex].remove();
  closeMovieDeletionModal();
  updateUI();
};

const closeMovieDeletionModal=()=>{
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
};

//Deletion
const startDeleteMovieHandler=(movieId)=>{
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    const cancelDeletionButton=deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButton=deleteMovieModal.querySelector('.btn--danger');

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
    cancelDeletionButton.removeEventListener('click',closeMovieDeletionModal);
    confirmDeletionButton=deleteMovieModal.querySelector('.btn--danger');
    cancelDeletionButton.addEventListener('click',closeMovieDeletionModal);
    confirmDeletionButton.addEventListener('click',deleteMovieHandler.bind(null,movieId));

  };

//render the page with add movies
const renderNewMovieElement=(id,title,imgurl,rating)=>{
  const newMovieElement=document.createElement('li');
  newMovieElement.className='movie-element';
  newMovieElement.innerHTML=`
    <div class='movie-element__image'>
      <img src="${imgurl}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;
  newMovieElement.addEventListener('click',startDeleteMovieHandler.bind(null,id));
  const listRoot=document.getElementById('movie-list');
  listRoot.append(newMovieElement);
};

//clear the user input once add or cancel the movie
const clearInput=()=>{
  for(const usrinput of userInputs){
    usrinput.value='';
  }
};

//close the movie model
const closeMovieModal=()=>{
  addMovieModal.classList.remove('visible');
};

//show the movie modal
const showMovieButton=() => {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
};

//cancel of add movie button
const cancelAddMovie=()=>{
    closeMovieModal();
    toggleBackdrop();
    clearInput();
;}

//adding the movie after add button clicked
const addMovieHandler=()=>{
  const titleValue=userInputs[0].value;
  const urlValue=userInputs[1].value;
  const ratingValue=userInputs[2].value;

  if(titleValue.trim()==='' ||
  urlValue.trim()==='' ||
  ratingValue.trim()==='' ||
  +ratingValue<1 ||
  +ratingValue>5){
    alert("Your input is not correct,please try again.");
    return;
  }

//create new movie
  const newMovie={
    id:Math.random().toString(),
    title:titleValue,
    image:urlValue,
    rating:ratingValue
  };
  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearInput();
  renderNewMovieElement(newMovie.id,newMovie.title,newMovie.image,newMovie.rating);
  updateUI();
};

//backdrop
const toggleBackdrop=()=>{
  backdrop.classList.toggle('visible');
};

//clicking on backdrop
const backdropClickHandler=() =>{
  closeMovieModal();
  clearInput();
  closeMovieDeletionModal();
}

startAddMovieButton.addEventListener('click',showMovieButton);
backdrop.addEventListener('click',backdropClickHandler);
cancelAddMovieModal.addEventListener('click',cancelAddMovie);
addAddMovieModal.addEventListener('click',addMovieHandler);
