// navFilter.js - handles navbar search clear and mobile menu
document.addEventListener('DOMContentLoaded', () => {
  // Clear search input after submit
  const searchForm = document.querySelector('form[action="/listings/search"]');
  if (searchForm) {
    searchForm.addEventListener('submit', function () {
      setTimeout(() => {
        const input = this.querySelector('input[name="city"]');
        if (input) input.value = '';
      }, 50);
    });
  }
});
