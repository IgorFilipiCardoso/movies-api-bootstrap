let template = document.getElementById('template')

async function request() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGQ5ZGFjYzAwNjA5NmM0YzcwYWM0NGViNmUxM2VmNSIsInN1YiI6IjY1MWYzY2Q1OTY3Y2M3MzQyN2YzZjM4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ImorXfIr9sQNG0vBOP5slVmaT52N8kKl1zmfh5CnOUg'
    }
  };

  let idCount = 0
  for (let pageCount = 1; pageCount < 4; pageCount++) {
    const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=' + pageCount, options)
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
      
      resultFinal.forEach(movie => {

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
        template.querySelector('.modal-title').setAttribute('id', 'modalTitleId' + idCount)
        template.querySelector('.modal-title').textContent = movie.title

        template.querySelector('.modal').removeAttribute('id')
        template.querySelector('.modal').setAttribute('id', 'modal-id-' + idCount)

        template.querySelector('.card-type').removeAttribute('data-bs-target')
        template.querySelector('.card-type').setAttribute('data-bs-target', '#modal-id-' + idCount)

        template.querySelector('.modal-title').textContent = movie.title

        document.querySelector('#cards').innerHTML += template.innerHTML

        idCount++;
      });
    }
  }
}

request()
document.getElementById('template').remove()
