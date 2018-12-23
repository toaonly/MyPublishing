import _ from 'lodash'

window.addEventListener('DOMContentLoaded', function(e) {
  const items = document.querySelectorAll('.list-wrapper .item');

  _.each(items, item => {
    item.addEventListener('click', function() {
      items.forEach(item => {
        item.classList.remove('active');
      });

      item.classList.add('active');
    })
  });
});
