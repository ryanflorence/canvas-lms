/**
 * Copyright (C) 2011 Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

$(document).ready(function() {
  $("#floating_reminders").draggable();
  $(".show_reminders_link").click(function(event) {
    event.preventDefault();
    $(this).blur();
    var $floater = $("#floating_reminders");
    var $helper = $floater.clone();
    $helper.children().css('visibility', 'hidden');
    var offset = $("#reminders_icon").offset();
    var floaterTop = $("#floating_reminders").offset().top;
    $floater.after($helper);
    $helper.css({
      width: 20,
      height: 20,
      left: offset.left,
      top: offset.top - floaterTop,
      opacity: 0.0
    });
    $floater.css('visibility', 'hidden').css('left', '');
    $helper.animate({
      top: $floater.css('top'),
      left: $floater.css('left'),
      width: $floater.width(),
      height: $floater.height(),
      opacity: 1.0
    }, 'slow', function() {
      $(this).remove();
      $floater.css('visibility', 'visible');
      $floater.find("a:not(.hide_reminders_link):visible:first").focus();
      $("#reminders_icon").hide();
    });
    var url = $floater.find(".update_session_url").attr('href');
  });
  $(".hide_reminders_link").click(function(event) {
    event.preventDefault();
    var $floater = $(this).parents("#floating_reminders");
    var $helper = $floater.clone();
    $floater.after($helper).css('left', -2000);
    $helper.children().css('visibility', 'hidden');
    var offset = $("#reminders_icon").show().offset();
    var floaterTop = $helper.offset().top;
    $helper.animate({
      width: 20,
      height: 20,
      left: offset.left,
      top: offset.top - floaterTop,
      opacity: 0.0
    }, 'slow', function() {
      $(this).remove();
    });
    var url = $floater.find(".update_session_url").attr('href');
  });
  $(".drop_held_context_link").click(function(event) {
    event.preventDefault();
    var $reminder = $(this).parents(".reminder");
    $reminder.confirmDelete({
      url: $(this).attr('href'),
      message: "Are you sure you want to drop this " + $reminder.find(".item_type").text() + "?",
      success: function(data) {
        $(this).fadeOut('fast', function() {
          $(this).remove();
          if($("#floating_reminders .reminder").length === 0) {
            $("#floating_reminders").fadeOut('fast', function() {
              $(this).remove();
              $("#reminders_icon").remove();
            });
          }
        });
      }
    });
  });
  
  
});


