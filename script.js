document.querySelectorAll('.filters button').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        document.querySelectorAll('.project-card').forEach(card => {
            if(filter === 'all' || filter === card.dataset.category){
                card.style.display = 'block'
            } else {
                card.style.display = 'none'
            };
        })
    })
})