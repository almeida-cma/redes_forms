document.addEventListener('DOMContentLoaded', function() {
  // Esta função é executada quando todo o DOM foi totalmente carregado e analisado.
  const form = document.getElementById('add-review-form');
  const reviewsList = document.getElementById('reviews');
  const filterSelect = document.getElementById('filter'); //utilizada para referenciar um elemento HTML pelo seu ID "filter"
  const prevPageBtn = document.getElementById('prev-page');
  const nextPageBtn = document.getElementById('next-page');
  const totalReviewsSpan = document.getElementById('total-reviews');
  
  let currentPage = 1;
  const reviewsPerPage = 5;
  let reviewsData = [];

  // Event listener para o envio de uma nova avaliação
  form.addEventListener('submit', function(event) {
    event.preventDefault(); //é utilizada para cancelar o comportamento padrão de um evento, como a submissão de um formulário ou a abertura de um link.
    const rating = document.getElementById('rating').value; //utilizada para acessar ou definir o valor de um campo de entrada de texto.
    const comment = document.getElementById('comment').value; //utilizada para acessar ou definir o valor de um campo de entrada de texto.

    if (!rating || !comment) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    addReview(rating, comment);
    form.reset();
  });

  // Função para adicionar uma nova avaliação
  function addReview(rating, comment) {
    const review = { rating, comment };
    reviewsData.unshift(review); // Adiciona a nova avaliação no início do array
    displayReviews(currentPage);
  }

  // Função para exibir as avaliações
  function displayReviews(page) {
    const startIndex = (page - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    const paginatedReviews = reviewsData.slice(startIndex, endIndex);

    reviewsList.innerHTML = ''; // Limpa as avaliações anteriores

    paginatedReviews.forEach(review => {
      const li = document.createElement('li'); //utilizado para criar um novo elemento HTML especificado pelo nome do elemento
      li.innerHTML = `<strong>Nota:</strong> ${review.rating} estrela(s) <br> <strong>Comentário:</strong> ${review.comment}`;
      reviewsList.appendChild(li);
    });

    updatePaginationButtons();
    updateTotalReviews();
  }

  // Função para atualizar o total de avaliações
  function updateTotalReviews() {
    const totalReviews = reviewsData.length;
    totalReviewsSpan.textContent = totalReviews;
  }

  // Função para atualizar os botões de paginação
  function updatePaginationButtons() {
    const totalPages = Math.ceil(reviewsData.length / reviewsPerPage);
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
  }

  // Event listener para a página anterior
  prevPageBtn.addEventListener('click', function() {
    if (currentPage > 1) {
      currentPage--;
      displayReviews(currentPage);
    }
  });

  // Event listener para a próxima página
  nextPageBtn.addEventListener('click', function() {
    const totalPages = Math.ceil(reviewsData.length / reviewsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayReviews(currentPage);
    }
  });

  // Event listener para o filtro de avaliações
  filterSelect.addEventListener('change', function() {
    const selectedRating = parseInt(filterSelect.value);
    if (selectedRating === 0) {
      displayReviews(currentPage);
    } else {
      const filteredReviews = reviewsData.filter(review => review.rating >= selectedRating);
      reviewsList.innerHTML = ''; // Limpa as avaliações anteriores
      filteredReviews.forEach(review => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Nota:</strong> ${review.rating} estrela(s) <br> <strong>Comentário:</strong> ${review.comment}`;
        reviewsList.appendChild(li);
      });
      updatePaginationButtons();
      updateTotalReviews();
    }
  });
});
