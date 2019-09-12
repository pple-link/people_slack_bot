'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var EDIT_FLAG = '/:boardnum/edit/:flag';

var routes = {
  edit: function edit(id, flag) {
    if (id) {
      console.log(id);
      return '/' + id + '/edit/' + flag;
    } else {
      return EDIT_FLAG;
    }
  }
};

exports.default = routes;