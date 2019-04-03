/*
 * SetPagingJS JQuery Plugin
 * version 2.0.2
 * released date: 2012 Mar 15
 * Use with Data List View - Seamless CMS.
 */

(function ($) {
  $.fn.SetPagingJS = function (options) {
    var settings = $.extend({
      'pagePerSection':'3',
      'listName':'#paging',
      'currentPage':1,
      'altList':'',
      'showSectionButtons':false,
      'showPageButtons':true,
      'nextSectionText':'&gt;&gt;',
      'prevSectionText':'&lt;&lt',
      'nextPageText':'Next',
      'prevPageText':'Previous'
    }, options);

    var pageList = $(settings.listName).children();
    var totalPages = pageList.length;
    var currentSection;
    var sections = new Array();
    var currPageElement;
    var nextElement;
    var prevElement;
  
  var nextLinkCssClass = 'nextPageLink';
  var prevLinkCssClass = 'prevPageLink';
  var nextSectionCssClass = 'nextPrevSectLink';
  var prevSectionCssClass = 'nextPrevSectLink';
  var currentPageCssClass = 'currPage';
  
    counterSection = 0;
    
    /* look up pages that in the current section */
    for (count = 0; count < totalPages; count++) {
        
      if (sections[counterSection] == null) {
        sections[counterSection] = "";
      }

      sections[counterSection] += "-" + count + "-";

      if (settings.currentPage == count + 1) {
        currentSection = counterSection;
        currPageElement = pageList[count];
      }
      
      if (((count + 1) % settings.pagePerSection) == 0) {
        counterSection++;
      }

    }

    /* hide pages that are not in the current section */
    for (count = 0; count < totalPages; count++) {
      if (sections[currentSection].indexOf("-" + count + "-") != -1) {
        $(pageList[count]).show();
      }
      else {
        $(pageList[count]).hide();
      }
    }
    
    if (settings.showPageButtons) {
    /* add previous page button */
    if (settings.currentPage > 1) {
      prevPageElement = $(pageList[settings.currentPage - 2]).clone();
      $(prevPageElement.children()[0]).html(settings.prevPageText);
      prevPageElement.addClass(prevLinkCssClass);
      prevPageElement.prependTo(settings.listName);
      prevPageElement.show();
    }
    
    /* add next page button */
    if (settings.currentPage < totalPages) {
      nextPageElement = $(pageList[settings.currentPage]).clone();
      $(nextPageElement.children()[0]).html(settings.nextPageText);
      nextPageElement.addClass(nextLinkCssClass);
      nextPageElement.appendTo(settings.listName);
      nextPageElement.show();
    }
  }

    if (settings.showSectionButtons) {
    /* make next section button */
    if (sections[currentSection + 1] != null) {
      for (count = 0; count < totalPages; count++) {
        if (sections[currentSection + 1].indexOf("-" + count + "-") != -1) {
          nextElement = $(pageList[count]).clone();
          nextElement.addClass(nextSectionCssClass);
          nextElement.appendTo(settings.listName);
          $(nextElement.children()[0]).html(settings.nextSectionText);
          nextElement.show();
          break;
        }
      }
    }
  
    /* make prev section button */
    if (sections[currentSection - 1] != null) {
      for (count = 0; count < totalPages; count++) {
        if (sections[currentSection - 1].indexOf("-" + count + "-") != -1 && sections[currentSection].match("-" + (count + 1) + "-") != null) {
          prevElement = $(pageList[count]).clone();
          prevElement.addClass(prevSectionCssClass);
          prevElement.prependTo(settings.listName);
          $(prevElement.children()[0]).html(settings.prevSectionText);
          prevElement.show();
          break;
        }
      }
    }
  }

    /* add css class to current page button */
    if ($(currPageElement) != null) {
      $(currPageElement).addClass(currentPageCssClass);
    }

    /* copy this paging list to alternative location */
    if (settings.altList.length != 0) {
      $(settings.altList).html($(settings.listName).html());
    }

  };
})(jQuery);