document.querySelectorAll('.filters button').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        document.querySelectorAll('.filters button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        document.querySelectorAll('.project-card').forEach(card => {
            if(filter === 'all' || filter === card.dataset.category){
                card.style.display = 'block'
            } else {
                card.style.display = 'none'
            };
        })
    })
})