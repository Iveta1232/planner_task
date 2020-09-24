
let number = Number(localStorage.getItem('task_count'));
let task = '';
let n = 1;
let list;
//localStorage.clear();

if (number == null) {
  localStorage.setItem('task_count', 0);
  number = 0;
}


for (let i = 1; i <= number; i++) {
  task = localStorage.getItem('task_value[' + i + ']');
  addTask(task);
}

$('ul .task input[type="text"]').keyup(function () {
  let order = $(this).parent().data('order');
  let newTask = $(this).val();
  localStorage.setItem('task_value[' + order + ']', newTask);
});


function addTask (task) {
      $('#add-task').find('ul').append('<li class="task" data-order="' + n + '">' +
      '<input type="checkbox" class="checkbox"/>' +
      '<input type="text" name="input[]" value="' + task + '"/>' +
      '<button class="clear" type="button" name="button">' + 'x' + '</button>' +
      '</li>');
      ++n;
}

  $('[type="checkbox"]').click(function () {

      $(this).parent().find('[type="text"]').attr('disabled', true).toggleClass('checked');
      $(this).attr('checked', true);
      --n;

      if (!$(this).parent().find('[type="text"]').hasClass('checked')) {
        $(this).parent().find('[type="text"]').attr('disabled', false);
        $(this).attr('checked', false);
      }
  });

  $('ul').each(function(){
    list = $(this).find('li').length;
  });

  $('.clear').click(function () {
    number = $(this).parent().data('order');
    task = $(this).val();

    $(this).parent().remove();
    localStorage.removeItem('task_value[' + number + ']', task);

    localStorage.setItem('task_count', list - 1);
  });

$('.create-task').submit(function () {
  event.preventDefault();

  let input = $(this).find('input[type=text]');
  let task = input.val();
  let number = Number(localStorage.getItem('task_count'));
  input.val('');

  $('.task-counter').find('span').replaceWith('' + number + '');

  localStorage.setItem('task_count', ++number);
  addTask(task);
  localStorage.setItem('task_value[' + number + ']', task);

});
