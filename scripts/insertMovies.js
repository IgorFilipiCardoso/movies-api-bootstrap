let template = document.getElementById('template')
let url_pop = 'https://api.themoviedb.org/3/movie/popular'

async function request() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ''
    }
  };

  const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1', options)
  const result = await data.json();
  const resultFinal = await result.results;

  if (resultFinal == null) {
    for (let index = 1; index < 20; index++) {
      template.querySelector('.movie-title').textContent = 'Titulo mt foda';
      template.querySelector('.modal-title').removeAttribute('id')
      template.querySelector('.modal-title').setAttribute('id', 'modalTitleId' + index)
      template.querySelector('.modal-title').textContent = 'Titulo mt foda'

      template.querySelector('.modal').removeAttribute('id')
      template.querySelector('.modal').setAttribute('id', 'modal-id-' + index)

      template.querySelector('.card-type').removeAttribute('data-bs-target')
      template.querySelector('.card-type').setAttribute('data-bs-target', '#modal-id-' + index)
      document.querySelector('#cards').innerHTML += template.innerHTML
    }
  } else {
    let index = 0
    resultFinal.forEach(movie => {
      console.log(index)

      template.querySelector('.movie-title').textContent = movie.title
      template.querySelector('.movie-img').setAttribute('src', 'https://image.tmdb.org/t/p/original' + movie.poster_path)
      template.querySelector('.movie-img').setAttribute('alt', movie.title + ' poster.')
      template.querySelector('.movie-backdrop').setAttribute('src', 'https://image.tmdb.org/t/p/original' + movie.backdrop_path)
      template.querySelector('.movie-img').setAttribute('alt', movie.title + ' imagem.')
      template.querySelector('.vote-avg').textContent = 'Nota média: ' + movie.vote_average
      template.querySelector('.vote-count').textContent = 'Quantidade de avaliações: ' + movie.vote_count
      template.querySelector('.popularity').textContent = movie.popularity
      template.querySelector('.release-date').textContent = movie.release_date
      template.querySelector('.movie-overview').textContent = movie.overview

      template.querySelector('.modal-title').removeAttribute('id')
      template.querySelector('.modal-title').setAttribute('id', 'modalTitleId' + index)
      template.querySelector('.modal-title').textContent = movie.title

      template.querySelector('.modal').removeAttribute('id')
      template.querySelector('.modal').setAttribute('id', 'modal-id-' + index)

      template.querySelector('.card-type').removeAttribute('data-bs-target')
      template.querySelector('.card-type').setAttribute('data-bs-target', '#modal-id-' + index)

      template.querySelector('.modal-title').textContent = movie.title

      document.querySelector('#cards').innerHTML += template.innerHTML

      index++;
    });
  }
}

request()
document.getElementById('template').remove()
