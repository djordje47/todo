window._ = require('lodash');

try {
  require('bootstrap');
} catch (e) {
}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');
axios.defaults.withCredentials = true;
window.axios.interceptors.response.use(
    function (response) {
      // Call was successful, don't do anything special.
      return response;
    },
    function (error) {
      switch (error.response.status) {
        case 401: // Not logged in
        case 419: // Session expired
        case 503: // Down for maintenance
                  // Bounce the user to the login screen with a redirect back
          localStorage.clear();
          window.location.reload();
          break;
        case 500:
          console.log('Oops, something went wrong!', error);
          break;
        default:
          // Allow individual requests to handle other errors
          return Promise.reject(error);
      }
    });
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });
