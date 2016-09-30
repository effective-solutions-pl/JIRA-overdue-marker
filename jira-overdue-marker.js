// ==UserScript==
// @name         JIRA overdue marked 
// @namespace    jiraOverdueMarker
// @include      *
// @grant        none
// @author       Tomasz Sokół
// @description  Marks overdue issues in the Filter result widget. Must display Status and Due columns.
// ==/UserScript==
// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement('script');
  script.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js');
  script.addEventListener('load', function () {
    var script = document.createElement('script');
    script.textContent = 'window.jQ=jQuery.noConflict(true);(' + callback.toString() + ')();';
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
} // the guts of this userscript

function main() {
  // Note, jQ replaces $ to avoid conflicts
  setTimeout(function () {
    // just to wait 2 sec. In this time issues list should be loaded via ajax call.
    jQ('.issuerow').each(function () {
      var status = jQ(this).children('.status').html();
      if (status.includes('Open') || status.includes('In Progress') || status.includes('Reopened')) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var dueDateString = jQ(this).children('.duedate').html();
        var parts = dueDateString.split('/');
        var months = {
        };
        months['Jan'] = 0;
        months['Feb'] = 1;
        months['Mar'] = 2;
        months['Apr'] = 3;
        months['May'] = 4;
        months['Jun'] = 5;
        months['Jul'] = 6;
        months['Aug'] = 7;
        months['Sep'] = 8;
        months['Oct'] = 9;
        months['Nov'] = 10;
        months['Dec'] = 11;
        var dueDate = new Date(2000 + parseInt(parts[2]), parseInt(months[parts[1]]), parseInt(parts[0]));
        if (dueDate.getTime() - today.getTime() < 0) {
          jQ(this).children('td').css('background-color', '#fc9e8d');
        }
      }
    }
    );
  }, 2000);
} // load jQuery and execute the main function

addJQuery(main);
