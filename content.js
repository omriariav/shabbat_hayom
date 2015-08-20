$(document).ready( function() {
    chrome.runtime.sendMessage({greeting: "Rabi, is it shabbath?"}, function(response) {
        var _check_if_warned = sessionStorage.getItem("warned") || "0";
        var _flag = true;
        var _response = response;
        var spareSpaceH = Math.max(0, window.innerHeight - 315) / 2;
        var spareSpaceW = Math.max(0, window.innerWidth - 420) / 2;
        var _close_clk = function(e) {
            e.preventDefault();
            var _video_src = $('#player').prop('src').replace("?autoplay=1", "");
            $('#player').prop('src',_video_src);
            $(".shabbat_bg,.shabbat_main").hide();
        };
        var _show = function() {
            $('body').append(_html);
            $(".shabbat_bg,.shabbat_main").show().click(_close_clk);
            $(".shabbat_main").css({
                "top": spareSpaceH + "px",
                "right": spareSpaceW + "px"
            });
            sessionStorage.setItem("warned","1");
        };
        var _html = '<div class="shabbat_bg"></div>' +
            '<div class="shabbat_main">' +
                '<iframe id="player" width="420" height="315" src="https://www.youtube.com/embed/HnrVk0HURp8?autoplay=1" frameborder="0" allowfullscreen></iframe>' +
            "</div>";

        if (_response.error = true) {
            _flag = false;
        }
        if (_flag && _check_if_warned == "0") { //Valid data and not warned
            _show();
        } else if (!_flag && _check_if_warned == "0" && new Date().getDay() == 3) { // No valid data and not warned and
            _show();                                                                // its shabbath (6)
        } else {
            console.log("ITS NOT SHABBATH!! TURN THE LIGHTS ON!")
        }
    });

});

