var showContent = function() {
    alert($("#timesheet-data-island").text());
}

var updateLog = function(){
    fetch("https://pmt.bridge-global.com/hoursheet/index.php?page=register", {
        "headers": {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "en-US,en;q=0.9,kn;q=0.8,sv;q=0.7,ml;q=0.6",
          "cache-control": "no-cache",
          "content-type": "application/x-www-form-urlencoded",
          "pragma": "no-cache",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "cookie": "_ga=GA1.2.275131777.1559027218; _hjid=31350165-8551-40df-96c0-833f54cd3526; login=sukesh; password=866df69a6f04190b5310a44bdf761808; id_user=809; status_id=37; PHPSESSID=iluqg171gq6h5id65o509aua26; ip=122.174.7.1"
        },
        "referrer": "https://pmt.bridge-global.com/hoursheet/index.php?page=register",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "pdate1=15-02-2021&status=block&user_name=809&reg_id=&project=1023&activity=IM&hours=8&desc=Retainer+India+2021+%28Mr+Green%29%0D%0ASystemutveckling%E2%80%93%0D%0APDF+generation+-+base+task&button=Submit",
        "method": "POST",
        "mode": "cors"
      });
};

function getCookies(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
            callback(cookie.value);
        }
    });
}

chrome.runtime.onMessage.addListener (function(request, sender, sendResponse) {
    showContent();
    chrome.cookies.getAll({
        domain: ".bridge-global.com"
      }, function (cookies) {
        for (var i = 0; i < cookies.length; i++) {
          console.log(cookies[i]);
   //       chrome.cookies.remove({
    //        url: "https://" + cookies[i].domain + cookies[i].path,
     //       name: cookies[i].name
      //    });
        }
      });
});


  // An object used for caching data about the browser's cookies, which we update
  // as notifications come in.
  function CookieCache() {
    this.cookies_ = {};
  
    this.reset = function() {
      this.cookies_ = {};
    }
  
    this.add = function(cookie) {
      var domain = cookie.domain;
      if (!this.cookies_[domain]) {
        this.cookies_[domain] = [];
      }
      this.cookies_[domain].push(cookie);
    };
  
    this.remove = function(cookie) {
      var domain = cookie.domain;
      if (this.cookies_[domain]) {
        var i = 0;
        while (i < this.cookies_[domain].length) {
          if (cookieMatch(this.cookies_[domain][i], cookie)) {
            this.cookies_[domain].splice(i, 1);
          } else {
            i++;
          }
        }
        if (this.cookies_[domain].length == 0) {
          delete this.cookies_[domain];
        }
      }
    };
  
    // Returns a sorted list of cookie domains that match |filter|. If |filter| is
    //  null, returns all domains.
    this.getDomains = function(filter) {
      var result = [];
      sortedKeys(this.cookies_).forEach(function(domain) {
        if (!filter || domain.indexOf(filter) != -1) {
          result.push(domain);
        }
      });
      return result;
    }
  
    this.getCookies = function(domain) {
      return this.cookies_[domain];
    };
  }
  
  

  

