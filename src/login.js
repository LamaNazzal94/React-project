import React, { useEffect } from 'react';
import $ from 'jquery'; // Import jQuery

function Login() {
  useEffect(() => {
    // Function to handle input interactions
    function handleInputInteraction(e) {
      const $this = $(e.target);
      const label = $this.prev('label');

      if (e.type === 'keyup') {
        if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
      } else if (e.type === 'blur') {
        if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.removeClass('highlight');
        }
      } else if (e.type === 'focus') {
        if ($this.val() === '') {
          label.removeClass('highlight');
        } else if ($this.val() !== '') {
          label.addClass('highlight');
        }
      }
    }

    // Attach input interaction to input and textarea elements
    $('#form').find('input, textarea').on('keyup blur focus', handleInputInteraction);

    // Handle tab click event
    $('.tab a').on('click', function (e) {
      e.preventDefault();

      $(this).parent().addClass('active');
      $(this).parent().siblings().removeClass('active');

      const target = $(this).attr('href'); // Declare 'target' using 'const'

      $('.tab-content > div').not(target).hide();

      $(target).fadeIn(800);
    });
  }, []); // Empty dependency array ensures this effect runs once on component mount

  return (
   <></> // Your component JSX here
  );
}

export default Login;