/*!
 * glob-path-regex <https://github.com/regexps/glob-path-regex>
 *
 * Copyright (c) 2014-2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var assert = require('assert');
var re = require('./');

function match(str) {
  return str.match(re());
}

function matches(str) {
  var arr = str.match(re());
  var len = arr.length;
  var res = [];
  var i = 0;

  while (len--) {
    var val = arr[i++];
    if (val === undefined) val = null
    res.push(val);
  }
  return res;
}

it('should match a glob path ending with a brace pattern:', function () {
  assert.equal(match('a/b/{c,d}')[0], 'a/b/{c,d}');
  assert.equal(match('a/b/{c,d}')[1], 'a/b/');
  assert.equal(match('a/b/{c,d}')[2], '{c,d}');

  assert.equal(match('a/b/{c,d}/*.js')[0], 'a/b/{c,d}/*.js');
  assert.equal(match('a/b/{c,d}/*.js')[1], 'a/b/{c,d}/');
  assert.equal(match('a/b/{c,d}/*.js')[2], '*.js');
  assert.equal(match('a/b/{c,d}/*.js')[3], '*');
  assert.equal(match('a/b/{c,d}/*.js')[4], '.js');

  assert.equal(match('a/b/{c,d}/')[0], 'a/b/{c,d}/');
  assert.equal(match('a/b/{c,d}/')[1], 'a/b/{c,d}/');
  assert.equal(match('a/b/{c,d}/')[2], '');
  assert.equal(match('a/b/{c,d}/')[3], '');
  assert.equal(match('a/b/{c,d}/')[4], '');

  assert.equal(match('a/b/{c,d}/')[0], 'a/b/{c,d}/');
  assert.equal(match('a/b/{c,d}/')[1], 'a/b/{c,d}/');
  assert.equal(match('a/b/{c,d}/')[2], '');
  assert.equal(match('a/b/{c,d}/')[3], '');
  assert.equal(match('a/b/{c,d}/')[4], '');

  assert.equal(match('a/b/{c,d}/e.f.g/')[0], 'a/b/{c,d}/e.f.g/');
  assert.equal(match('a/b/{c,d}/e.f.g/')[1], 'a/b/{c,d}/e.f.g/');
  assert.equal(match('a/b/{c,d}/e.f.g/')[2], '');
  assert.equal(match('a/b/{c,d}/e.f.g/')[3], '');
  assert.equal(match('a/b/{c,d}/e.f.g/')[4], '');

  assert.equal(match('/a/b/{c,d}/e.f.g/')[0], '/a/b/{c,d}/e.f.g/');
  assert.equal(match('/a/b/{c,d}/e.f.g/')[1], '/a/b/{c,d}/e.f.g/');
  assert.equal(match('/a/b/{c,d}/e.f.g/')[2], '');
  assert.equal(match('/a/b/{c,d}/e.f.g/')[3], '');
  assert.equal(match('/a/b/{c,d}/e.f.g/')[4], '');

  assert.equal(match('a/b/{c,d}/*.min.js')[0], 'a/b/{c,d}/*.min.js');
  assert.equal(match('a/b/{c,d}/*.min.js')[1], 'a/b/{c,d}/');
  assert.equal(match('a/b/{c,d}/*.min.js')[2], '*.min.js');
  assert.equal(match('a/b/{c,d}/*.min.js')[3], '*');
  assert.equal(match('a/b/{c,d}/*.min.js')[4], '.min.js');
  assert.equal(match('a/b/{c,d}/*.min.js')[5], '.js');
  assert.equal(match('a/b/{c,d}/*.min.js')[6], 'js');

  // assert.equal(match('[a-j]*[^c]')[0], '[a-j]*[^c]');
  // assert.equal(match('[a-j]*[^c]')[1], '[a-j]*[^c]');
  assert.equal(match('[a-j]*[^c]b/c')[0], '[a-j]*[^c]b/c');
  assert.equal(match('[a-j]*[^c]b/c')[1], '[a-j]*[^c]b/');
  assert.equal(match('[a-j]*[^c]bc')[0], '[a-j]*[^c]bc');
  // assert.equal(match('[a-j]*[^c]bc')[1], '[a-j]*[^c]bc');
});

it('should match a glob path ending with a slash:', function () {
  assert.equal(match('a/b/{c,d}/')[0], 'a/b/{c,d}/');
  assert.equal(match('a/b/{c,d}/')[1], 'a/b/{c,d}/');
  assert.equal(match('a/b/{c,d}/')[2], '');
  assert.equal(match('a/b/{c,d}/')[3], '');
  assert.equal(match('a/b/{c,d}/')[4], '');
});

it('should match a glob path beginning with a slash:', function () {
  assert.equal(match('/a/b/{c,d}/')[0], '/a/b/{c,d}/');
  assert.equal(match('/a/b/{c,d}/')[1], '/a/b/{c,d}/');
  assert.equal(match('/a/b/{c,d}/')[2], '');
  assert.equal(match('/a/b/{c,d}/')[3], '');
  assert.equal(match('/a/b/{c,d}/')[4], '');
});

it('should match a basename glob:', function () {
  assert.equal(match('/a/b/{c,d}/*.js')[0], '/a/b/{c,d}/*.js');
  assert.equal(match('/a/b/{c,d}/*.js')[1], '/a/b/{c,d}/');
  assert.equal(match('/a/b/{c,d}/*.js')[2], '*.js');
  assert.equal(match('/a/b/{c,d}/*.js')[3], '*');
  assert.equal(match('/a/b/{c,d}/*.js')[4], '.js');
  assert.equal(match('/a/b/{c,d}/*.js')[5], '.js');
  assert.equal(match('/a/b/{c,d}/*.js')[6], 'js');

  assert.equal(match('/a/b/{c,d}/*.min.js')[0], '/a/b/{c,d}/*.min.js');
  assert.equal(match('/a/b/{c,d}/*.min.js')[1], '/a/b/{c,d}/');
  assert.equal(match('/a/b/{c,d}/*.min.js')[2], '*.min.js');
  assert.equal(match('/a/b/{c,d}/*.min.js')[3], '*');
  assert.equal(match('/a/b/{c,d}/*.min.js')[4], '.min.js');
  assert.equal(match('/a/b/{c,d}/*.min.js')[5], '.js');
  assert.equal(match('/a/b/{c,d}/*.js')[6], 'js');
});

it('should match a glob path with a brace pattern:', function () {
  assert.equal(match('a/b/{c,d}/e/f.g')[0], 'a/b/{c,d}/e/f.g');
  assert.equal(match('a/b/{c,d}/e/f.g')[1], 'a/b/{c,d}/e/');
  assert.equal(match('a/b/{c,d}/e/f.g')[2], 'f.g');
  assert.equal(match('a/b/{c,d}/e/f.g')[3], 'f');
  assert.equal(match('a/b/{c,d}/e/f.g')[4], '.g');
  assert.equal(match('a/b/{c,d}/e/f.min.g')[4], '.min.g');
  assert.equal(match('a/b/{c,d}/e/f.g')[5], '.g');
  assert.equal(match('a/b/{c,d}/e/f.g')[6], 'g');

  assert.equal(match('a/b/{c,./d}/e/f.g')[0], 'a/b/{c,./d}/e/f.g');
  assert.equal(match('a/b/{c,./d}/e/f.g')[1], 'a/b/{c,./d}/e/');
  assert.equal(match('a/b/{c,./d}/e/f.g')[2], 'f.g');
  assert.equal(match('a/b/{c,./d}/e/f.g')[3], 'f');
  assert.equal(match('a/b/{c,./d}/e/f.g')[4], '.g');
  assert.equal(match('a/b/{c,./d}/e/f.min.g')[4], '.min.g');
  assert.equal(match('a/b/{c,./d}/e/f.g')[5], '.g');
  assert.equal(match('a/b/{c,./d}/e/f.g')[6], 'g');

  assert.equal(match('a/b/{c,/d}/e/f.g')[0], 'a/b/{c,/d}/e/f.g');
  assert.equal(match('a/b/{c,/d}/e/f.g')[1], 'a/b/{c,/d}/e/');
  assert.equal(match('a/b/{c,/d}/e/f.g')[2], 'f.g');
  assert.equal(match('a/b/{c,/d}/e/f.g')[3], 'f');
  assert.equal(match('a/b/{c,/d}/e/f.g')[4], '.g');
  assert.equal(match('a/b/{c,/d}/e/f.min.g')[4], '.min.g');
  assert.equal(match('a/b/{c,/d}/e/f.g')[5], '.g');
  assert.equal(match('a/b/{c,/d}/e/f.g')[6], 'g');

  assert.deepEqual(matches('a/b/c{d,e{f,g}}/*.md'), ["a/b/c{d,e{f,g}}/*.md","a/b/c{d,e{f,g}}/","*.md","*",".md",".md","md"]);
  assert.deepEqual(matches('a/b/c{d,e{f,g}}/*.md'), ["a/b/c{d,e{f,g}}/*.md","a/b/c{d,e{f,g}}/","*.md","*",".md",".md","md"]);
  assert.deepEqual(matches('a/b/c{d,e}/*.md'), ["a/b/c{d,e}/*.md","a/b/c{d,e}/","*.md","*",".md",".md","md"]);
  assert.deepEqual(matches('a/b/c{d,e}/*.md'), ["a/b/c{d,e}/*.md","a/b/c{d,e}/","*.md","*",".md",".md","md"]);
  assert.deepEqual(matches('a/b/c{d,e}/xyz.md'), ["a/b/c{d,e}/xyz.md","a/b/c{d,e}/","xyz.md","xyz",".md",".md","md"]);
  assert.deepEqual(matches('a/{c..e}.js'), ["a/{c..e}.js","a/","{c..e}.js","{c..e}",".js",".js","js"]);
  assert.deepEqual(matches('{a,b,c}.md'), ["{a,b,c}.md","","{a,b,c}.md","{a,b,c}",".md",".md","md"]);
  assert.deepEqual(matches('{b,c}/{b,d}.md'), ["{b,c}/{b,d}.md","{b,c}/","{b,d}.md","{b,d}",".md",".md","md"]);
  assert.deepEqual(matches('**/*.{js,txt}'), ["**/*.{js,txt}","**/","*.{js,txt}","*.{js,txt}","",null,null]);
  assert.deepEqual(matches('**/*.{js,txt}|*.{js,txt}'), ["**/*.{js,txt}|*.{js,txt}","**/*.{js,txt}|","*.{js,txt}","*.{js,txt}","",null,null]);
  assert.deepEqual(matches('*.{js,txt}'), ["*.{js,txt}","","*.{js,txt}","*.{js,txt}","",null,null]);
  assert.deepEqual(matches('*{a..e}'), ["*{a..e}","","*{a..e}","*{a..e}","",null,null]);
  assert.deepEqual(matches('a/b/**/c{d,e}/**/xyz.md'), ["a/b/**/c{d,e}/**/xyz.md","a/b/**/c{d,e}/**/","xyz.md","xyz",".md",".md","md"]);
});

it('should work when brace patterns have dots and slashes:', function () {
  assert.equal(match('a/b/{c,/.gitignore}')[0], 'a/b/{c,/.gitignore}');
  assert.equal(match('a/b/{c,/.gitignore}')[1], 'a/b/');
  assert.equal(match('a/b/{c,/.gitignore}')[2], '{c,/.gitignore}');
  assert.equal(match('a/b/{c,/.gitignore}')[3], '{c,/.gitignore}');
  assert.equal(match('a/b/{c,/.gitignore}')[4], '');
  assert.equal(match('a/b/{c,/.gitignore}')[5], null);
  assert.equal(match('a/b/{c,/.gitignore}')[6], null);

  assert.equal(match('a/b/{c,/gitignore}')[0], 'a/b/{c,/gitignore}');
  assert.equal(match('a/b/{c,/gitignore}')[1], 'a/b/');
  assert.equal(match('a/b/{c,/gitignore}')[2], '{c,/gitignore}');
  assert.equal(match('a/b/{c,/gitignore}')[3], '{c,/gitignore}');
  assert.equal(match('a/b/{c,/gitignore}')[4], '');
  assert.equal(match('a/b/{c,/gitignore}')[5], null);
  assert.equal(match('a/b/{c,/gitignore}')[6], null);

  assert.equal(match('a/b/{c,.gitignore}')[0], 'a/b/{c,.gitignore}');
  assert.equal(match('a/b/{c,.gitignore}')[1], 'a/b/');
  assert.equal(match('a/b/{c,.gitignore}')[2], '{c,.gitignore}');
  assert.equal(match('a/b/{c,.gitignore}')[3], '{c,.gitignore}');
  assert.equal(match('a/b/{c,.gitignore}')[4], '');
  assert.equal(match('a/b/{c,.gitignore}')[5], null);
  assert.equal(match('a/b/{c,.gitignore}')[6], null);
});

it('should work when brace patterns have a leading dot:', function () {
  assert.equal(match('a/b/.{foo,bar}')[0], 'a/b/.{foo,bar}');
  assert.equal(match('a/b/.{foo,bar}')[1], 'a/b/');
  assert.equal(match('a/b/.{foo,bar}')[2], '.{foo,bar}');
  assert.equal(match('a/b/.{foo,bar}')[3], '.{foo,bar}');
  assert.equal(match('a/b/.{foo,bar}')[4], '');
  assert.equal(match('a/b/.{foo,bar}')[5], null);
  assert.equal(match('a/b/.{foo,bar}')[6], null);

  assert.equal(match('a/b/.{c,/.gitignore}')[0], 'a/b/.{c,/.gitignore}');
  assert.equal(match('a/b/.{c,/.gitignore}')[1], 'a/b/');
  assert.equal(match('a/b/.{c,/.gitignore}')[2], '.{c,/.gitignore}');
  assert.equal(match('a/b/.{c,/.gitignore}')[3], '.{c,/.gitignore}');
  assert.equal(match('a/b/.{c,/.gitignore}')[4], '');
  assert.equal(match('a/b/.{c,/.gitignore}')[5], null);
  assert.equal(match('a/b/.{c,/.gitignore}')[6], null);

  assert.equal(match('a/b/.{c,.gitignore}')[0], 'a/b/.{c,.gitignore}');
  assert.equal(match('a/b/.{c,.gitignore}')[1], 'a/b/');
  assert.equal(match('a/b/.{c,.gitignore}')[2], '.{c,.gitignore}');
  assert.equal(match('a/b/.{c,.gitignore}')[3], '.{c,.gitignore}');
  assert.equal(match('a/b/.{c,.gitignore}')[4], '');
  assert.equal(match('a/b/.{c,.gitignore}')[5], null);
  assert.equal(match('a/b/.{c,.gitignore}')[6], null);
});

it('should match when the basename starts with a star:', function () {
  assert.equal(match('a/b/*.{foo,bar}')[0], 'a/b/*.{foo,bar}');
  assert.equal(match('a/b/*.{foo,bar}')[1], 'a/b/');
  assert.equal(match('a/b/*.{foo,bar}')[2], '*.{foo,bar}');
  assert.equal(match('a/b/*.{foo,bar}')[3], '*.{foo,bar}');
  assert.equal(match('a/b/*.{foo,bar}')[4], '');
  assert.equal(match('a/b/*.{foo,bar}')[5], null);
  assert.equal(match('a/b/*.{foo,bar}')[6], null);
});

it('should match with globstars:', function () {
  assert.equal(match('a/**/b/*.{foo,bar}')[0], 'a/**/b/*.{foo,bar}');
  assert.equal(match('a/**/b/*.{foo,bar}')[1], 'a/**/b/');
  assert.equal(match('a/**/b/*.{foo,bar}')[2], '*.{foo,bar}');
  assert.equal(match('a/**/b/*.{foo,bar}')[3], '*.{foo,bar}');
  assert.equal(match('a/**/b/*.{foo,bar}')[4], '');
  assert.equal(match('a/**/b/*.{foo,bar}')[5], null);
  assert.equal(match('a/**/b/*.{foo,bar}')[6], null);
});

it('should match complex patterns:', function () {
  assert.equal(match('a/b/{c,.gitignore,{a,b}}/{a,b}/abc.foo.js')[0], 'a/b/{c,.gitignore,{a,b}}/{a,b}/abc.foo.js');
  assert.equal(match('a/b/{c,.gitignore,{a,b}}/{a,b}/abc.foo.js')[1], 'a/b/{c,.gitignore,{a,b}}/{a,b}/');
  assert.equal(match('a/b/{c,.gitignore,{a,b}}/{a,b}/abc.foo.js')[2], 'abc.foo.js');
  assert.equal(match('a/b/{c,.gitignore,{a,b}}/{a,b}/abc.foo.js')[3], 'abc');
  assert.equal(match('a/b/{c,.gitignore,{a,b}}/{a,b}/abc.foo.js')[4], '.foo.js');
  assert.equal(match('a/b/{c,.gitignore,{a,b}}/{a,b}/abc.foo.js')[5], '.js');
  assert.equal(match('a/b/{c,.gitignore,{a,b}}/{a,b}/abc.foo.js')[6], 'js');

  assert.equal(match('a/b/{c,.gitignore,{a,b}}/{a,b}/*.foo.js')[0], 'a/b/{c,.gitignore,{a,b}}/{a,b}/*.foo.js');
  assert.equal(match('a/b/{c,.gitignore,{a,b}}/{a,b}/*.foo.js')[1], 'a/b/{c,.gitignore,{a,b}}/{a,b}/');
  assert.equal(match('a/b/{c,.gitignore,{a,b}}/{a,b}/*.foo.js')[2], '*.foo.js');
  assert.equal(match('a/b/{c,.gitignore,{a,b}}/{a,b}/*.foo.js')[3], '*');
  assert.equal(match('a/b/{c,.gitignore,{a,b}}/{a,b}/*.foo.js')[4], '.foo.js');
  assert.equal(match('a/b/{c,.gitignore,{a,b}}/{a,b}/*.foo.js')[5], '.js');
  assert.equal(match('a/b/{c,.gitignore,{a,b}}/{a,b}/*.foo.js')[6], 'js');

  assert.equal(match('a/b/{c,.gitignore,{a,./b}}/{a,b}/abc.foo.js')[0], 'a/b/{c,.gitignore,{a,./b}}/{a,b}/abc.foo.js');
  assert.equal(match('a/b/{c,.gitignore,{a,./b}}/{a,b}/abc.foo.js')[1], 'a/b/{c,.gitignore,{a,./b}}/{a,b}/');
  assert.equal(match('a/b/{c,.gitignore,{a,./b}}/{a,b}/abc.foo.js')[2], 'abc.foo.js');
  assert.equal(match('a/b/{c,.gitignore,{a,./b}}/{a,b}/abc.foo.js')[3], 'abc');
  assert.equal(match('a/b/{c,.gitignore,{a,./b}}/{a,b}/abc.foo.js')[4], '.foo.js');
  assert.equal(match('a/b/{c,.gitignore,{a,./b}}/{a,b}/abc.foo.js')[5], '.js');
  assert.equal(match('a/b/{c,.gitignore,{a,./b}}/{a,b}/abc.foo.js')[6], 'js');
});

it('should match a path with an extension:', function () {
  assert.equal(match('a/b/c.md')[0], 'a/b/c.md');
  assert.equal(match('a/b/c.md')[1], 'a/b/');
  assert.equal(match('a/b/c.md')[2], 'c.md');
  assert.equal(match('a/b/c.md')[3], 'c');
  assert.equal(match('a/b/c.md')[4], '.md');
  assert.equal(match('a/b/c.md')[5], '.md');
  assert.equal(match('a/b/c.md')[6], 'md');
  assert.equal(match('c.md')[0], 'c.md');
  assert.equal(match('c.md')[1], '');
  assert.equal(match('c.md')[2], 'c.md');
  assert.equal(match('c.md')[3], 'c');
  assert.equal(match('c.md')[4], '.md');
  assert.equal(match('c.md')[5], '.md');
  assert.equal(match('c.md')[6], 'md');
});

it('should match a path with multiple extensions:', function () {
  assert.equal(match('a/b/c.min.js')[0], 'a/b/c.min.js');
  assert.equal(match('a/b/c.min.js')[1], 'a/b/');
  assert.equal(match('a/b/c.min.js')[2], 'c.min.js');
  assert.equal(match('a/b/c.min.js')[3], 'c');
  assert.equal(match('a/b/c.min.js')[4], '.min.js');
  assert.equal(match('a/b/c.min.js')[5], '.js');
  assert.equal(match('a/b/c.min.js')[6], 'js');
});

it('should work with paths that have dots in the dirname:', function () {
  assert.equal(match('a/b/c/d.e.f/g.min.js')[0], 'a/b/c/d.e.f/g.min.js');
  assert.equal(match('a/b/c/d.e.f/g.min.js')[1], 'a/b/c/d.e.f/');
  assert.equal(match('a/b/c/d.e.f/g.min.js')[2], 'g.min.js');
  assert.equal(match('a/b/c/d.e.f/g.min.js')[3], 'g');
  assert.equal(match('a/b/c/d.e.f/g.min.js')[4], '.min.js');
  assert.equal(match('a/b/c/d.e.f/g.min.js')[5], '.js');
  assert.equal(match('a/b/c/d.e.f/g.min.js')[6], 'js');
});

it('should match a path without an extension:', function () {
  assert.equal(match('a')[0], 'a');
  assert.equal(match('a')[1], '');
  assert.equal(match('a')[2], 'a');
  assert.equal(match('a')[3], 'a');
  assert.equal(match('a')[4], '');
  assert.equal(match('a')[5], null);
  assert.equal(match('a')[6], null);
});

it('should match a file path ending with an extension:', function () {
  assert.equal(match('a/b/c/d.md')[0], 'a/b/c/d.md');
  assert.equal(match('a/b/c/d.md')[1], 'a/b/c/');
  assert.equal(match('a/b/c/d.md')[2], 'd.md');
  assert.equal(match('a/b/c/d.md')[3], 'd');
  assert.equal(match('a/b/c/d.md')[4], '.md');
  assert.equal(match('a/b/c/d.md')[5], '.md');
  assert.equal(match('a/b/c/d.md')[6], 'md');
});

it('should match a file path ending with an extension:', function () {
  assert.equal(match('a/b/c.d/e.md')[0], 'a/b/c.d/e.md');
  assert.equal(match('a/b/c.d/e.md')[1], 'a/b/c.d/');
  assert.equal(match('a/b/c.d/e.md')[2], 'e.md');
  assert.equal(match('a/b/c.d/e.md')[3], 'e');
  assert.equal(match('a/b/c.d/e.md')[4], '.md');
  assert.equal(match('a/b/c.d/e.md')[5], '.md');
  assert.equal(match('a/b/c.d/e.md')[6], 'md');
});

it('should match a file path without a trailing slash:', function () {
  assert.equal(match('a/b/c')[0], 'a/b/c');
  assert.equal(match('a/b/c')[1], 'a/b/');
  assert.equal(match('a/b/c')[2], 'c');
  assert.equal(match('a/b/c')[3], 'c');
  assert.equal(match('a/b/c')[4], '');
  assert.equal(match('a/b/c')[5], null);
  assert.equal(match('a/b/c')[6], null);
});

it('should match a file path with a trailing slash:', function () {
  assert.equal(match('a/b/c/')[0], 'a/b/c/');
  assert.equal(match('a/b/c/')[1], 'a/b/c/');
  assert.equal(match('a/b/c/')[2], '');
  assert.equal(match('a/b/c/')[3], '');
  assert.equal(match('a/b/c/')[4], '');
  assert.equal(match('a/b/c/')[5], null);
  assert.equal(match('a/b/c/')[6], null);
});

it('should match a file path with a leading slash:', function () {
  assert.equal(match('/a/b/c')[0], '/a/b/c');
  assert.equal(match('/a/b/c')[1], '/a/b/');
  assert.equal(match('/a/b/c')[2], 'c');
  assert.equal(match('/a/b/c')[3], 'c');
  assert.equal(match('/a/b/c')[4], '');
  assert.equal(match('/a/b/c')[5], null);
  assert.equal(match('/a/b/c')[6], null);
});

it('should match a file path with trailing and leading slashes:', function () {
  assert.equal(match('/a/b/c/')[0], '/a/b/c/');
  assert.equal(match('/a/b/c/')[1], '/a/b/c/');
  assert.equal(match('/a/b/c/')[2], '');
  assert.equal(match('/a/b/c/')[3], '');
  assert.equal(match('/a/b/c/')[4], '');
  assert.equal(match('/a/b/c/')[5], null);
  assert.equal(match('/a/b/c/')[6], null);
});

it('should match path parts with wildcards:', function () {
  assert.deepEqual(matches('*'), ["*","","*","*","",null,null]);
  assert.deepEqual(matches('**'), ["**","","**","**","",null,null]);
  assert.deepEqual(matches('**/*.js'), ["**/*.js","**/","*.js","*",".js",".js","js"]);
  assert.deepEqual(matches('**/*.js|*.js'), ['**/*.js|*.js', '**/*.js|', '*.js', '*', '.js', '.js', 'js']);
  assert.deepEqual(matches('**/*.md'), ["**/*.md","**/","*.md","*",".md",".md","md"]);
  assert.deepEqual(matches('**/*.md|*.md'), ["**/*.md|*.md","**/*.md|","*.md","*",".md",".md","md"]);
  assert.deepEqual(matches('**/.*'), ["**/.*","**/",".*","",".*",".*","*"]);
  assert.deepEqual(matches('**/.*.md'), ["**/.*.md","**/",".*.md","",".*.md",".md","md"]);
  assert.deepEqual(matches('*.*'), ["*.*","","*.*","*",".*",".*","*"]);
  assert.deepEqual(matches('*.*.md'), ["*.*.md","","*.*.md","*",".*.md",".md","md"]);
  assert.deepEqual(matches('*.js'), ["*.js","","*.js","*",".js",".js","js"]);
  assert.deepEqual(matches('*.md'), ["*.md","","*.md","*",".md",".md","md"]);
  assert.deepEqual(matches('*.txt'), ["*.txt","","*.txt","*",".txt",".txt","txt"]);
  assert.deepEqual(matches('a*'), ["a*","","a*","a*","",null,null]);
  assert.deepEqual(matches('a/'), ["a/","a/","","","",null,null]);
  assert.deepEqual(matches('a/*'), ["a/*","a/","*","*","",null,null]);
  assert.deepEqual(matches('a/**/*.md'), ["a/**/*.md","a/**/","*.md","*",".md",".md","md"]);
  assert.deepEqual(matches('a/**/c/*.md'), ["a/**/c/*.md","a/**/c/","*.md","*",".md",".md","md"]);
  assert.deepEqual(matches('a/**/j/**/z/*.md'), ["a/**/j/**/z/*.md","a/**/j/**/z/","*.md","*",".md",".md","md"]);
  assert.deepEqual(matches('a/**/z/*.md'), ["a/**/z/*.md","a/**/z/","*.md","*",".md",".md","md"]);
  assert.deepEqual(matches('a/**/z/*.md|a/z/*.md'), ["a/**/z/*.md|a/z/*.md","a/**/z/*.md|a/z/","*.md","*",".md",".md","md"]);
  assert.deepEqual(matches('a/**/z/.*.md'), ["a/**/z/.*.md","a/**/z/",".*.md","",".*.md",".md","md"]);
  assert.deepEqual(matches('a/*.md'), ["a/*.md","a/","*.md","*",".md",".md","md"]);
  assert.deepEqual(matches('a/*.txt'), ["a/*.txt","a/","*.txt","*",".txt",".txt","txt"]);
  assert.deepEqual(matches('a/*/?/**/e.md'), ["a/*/?/**/e.md","a/*/?/**/","e.md","e",".md",".md","md"]);
  assert.deepEqual(matches('a/*/c/*.md'), ["a/*/c/*.md","a/*/c/","*.md","*",".md",".md","md"]);
  assert.deepEqual(matches('a/?/**/e.md'), ["a/?/**/e.md","a/?/**/","e.md","e",".md",".md","md"]);
  assert.deepEqual(matches('a/?/c.md'), ["a/?/c.md","a/?/","c.md","c",".md",".md","md"]);
  assert.deepEqual(matches('a/?/c/?/*/e.md'), ["a/?/c/?/*/e.md","a/?/c/?/*/","e.md","e",".md",".md","md"]);
  assert.deepEqual(matches('a/?/c/?/e.md'), ["a/?/c/?/e.md","a/?/c/?/","e.md","e",".md",".md","md"]);
  assert.deepEqual(matches('a/?/c/???/e.md'), ["a/?/c/???/e.md","a/?/c/???/","e.md","e",".md",".md","md"]);
  assert.deepEqual(matches('a/??/c.md'), ["a/??/c.md","a/??/","c.md","c",".md",".md","md"]);
  assert.deepEqual(matches('a/???/c.md'), ["a/???/c.md","a/???/","c.md","c",".md",".md","md"]);
  assert.deepEqual(matches('a/????/c.md'), ["a/????/c.md","a/????/","c.md","c",".md",".md","md"]);
  assert.deepEqual(matches('A/b/C.d/*.MD'), ["A/b/C.d/*.MD","A/b/C.d/","*.MD","*",".MD",".MD","MD"]);
  assert.deepEqual(matches('a/b/c/*.md'), ["a/b/c/*.md","a/b/c/","*.md","*",".md",".md","md"]);
  assert.deepEqual(matches('A/b/C/*.md'), ["A/b/C/*.md","A/b/C/","*.md","*",".md",".md","md"]);
  assert.deepEqual(matches('A/b/C/*.MD'), ["A/b/C/*.MD","A/b/C/","*.MD","*",".MD",".MD","MD"]);
  assert.deepEqual(matches('a/b/c/.*.md'), ["a/b/c/.*.md","a/b/c/",".*.md","",".*.md",".md","md"]);
  assert.deepEqual(matches('./a/**/j/**/z/*.md'), ["./a/**/j/**/z/*.md","./a/**/j/**/z/","*.md","*",".md",".md","md"]);
  assert.deepEqual(matches('./a/**/z/*.md'), ["./a/**/z/*.md","./a/**/z/","*.md","*",".md",".md","md"]);
  assert.deepEqual(matches('./a/b/**/c{d,e}/**/xyz.md'), ["./a/b/**/c{d,e}/**/xyz.md","./a/b/**/c{d,e}/**/","xyz.md","xyz",".md",".md","md"]);
  assert.deepEqual(matches('/**/*.md'), ["/**/*.md","/**/","*.md","*",".md",".md","md"]);
  assert.deepEqual(matches('//**/*.md'), ["//**/*.md","//**/","*.md","*",".md",".md","md"]);
});

it('should match a path with a dotfile:', function () {
  assert.equal(match('a/b/.gitignore')[0], 'a/b/.gitignore');
  assert.equal(match('a/b/.gitignore')[1], 'a/b/');
  assert.equal(match('a/b/.gitignore')[2], '.gitignore');
  assert.equal(match('a/b/.gitignore')[3], '');
  assert.equal(match('a/b/.gitignore')[4], '.gitignore');
  assert.equal(match('a/b/.gitignore')[5], '.gitignore');
  assert.equal(match('a/b/.gitignore')[6], 'gitignore');

  assert.deepEqual(matches('.*'), [".*","",".*","",".*",".*","*"]);
  assert.deepEqual(matches('.*.md'), [".*.md","",".*.md","",".*.md",".md","md"]);
  assert.deepEqual(matches('.gitignore'), [".gitignore","",".gitignore","",".gitignore",".gitignore","gitignore"]);
  assert.deepEqual(matches('.md'), [".md","",".md","",".md",".md","md"]);
  assert.deepEqual(matches('.txt'), [".txt","",".txt","",".txt",".txt","txt"]);
});


it('should match extglobs', function () {
  assert.deepEqual(matches('((a|b)|c)/a.b.c/b.js'), ["((a|b)|c)/a.b.c/b.js","((a|b)|c)/a.b.c/","b.js","b",".js",".js","js"]);
  assert.deepEqual(matches('((a|b)|c)/b'), ["((a|b)|c)/b","((a|b)|c)/","b","b","",null,null]);
  assert.deepEqual(matches('(a|b)/b'), ["(a|b)/b","(a|b)/","b","b","",null,null]);
  assert.deepEqual(matches('(b|c)/(b|d).md'), ["(b|c)/(b|d).md","(b|c)/(b|d)",".md","",".md",".md","md"]);
  assert.deepEqual(matches('*(a|{b),c)}'), ["*(a|{b),c)}","*(a|","{b),c)}","{b),c)}","",null,null]);
  assert.deepEqual(matches('a-(2|3|4).md'), ["a-(2|3|4).md","a-(2|3|4)",".md","",".md",".md","md"]);
  assert.deepEqual(matches('a/(b|d).md'), ["a/(b|d).md","a/(b|d)",".md","",".md",".md","md"]);
});

it('should match character classes:', function () {
  assert.equal(match('[a-c]b*')[0], '[a-c]b*');
  assert.equal(match('[a-j]*[^c]')[0], '[a-j]*[^c]');
  assert.equal(match('[a-j]*[^c]')[1], '[a-j]*[^c]');
  assert.equal(match('[a-j]*[^c]b/c')[0], '[a-j]*[^c]b/c');
  assert.equal(match('[a-j]*[^c]bc')[0], '[a-j]*[^c]bc');
  assert.deepEqual(matches('[a-j]*[^c]'), ["[a-j]*[^c]","[a-j]*[^c]","","","",null,null]);
  assert.deepEqual(matches('a*[^c]'), ["a*[^c]","a*[^c]","","","",null,null]);
  assert.deepEqual(matches('[bc]/[bd].md'), ["[bc]/[bd].md","[bc]/[bd]",".md","",".md",".md","md"]);
  assert.deepEqual(matches('a-[2-4].md'), ["a-[2-4].md","a-[2-4]",".md","",".md",".md","md"]);
  assert.deepEqual(matches('a/[A-Z].md'), ["a/[A-Z].md","a/[A-Z]",".md","",".md",".md","md"]);
  assert.deepEqual(matches('a/[bd].md'), ["a/[bd].md","a/[bd]",".md","",".md",".md","md"]);
});

it.skip('should work when a character class has trailing word characters:', function () {
  assert.equal(match('[a-c]b*')[1], '[a-c]b*'); // bad
  assert.equal(match('[a-j]*[^c]bc')[1], '[a-j]*[^c]bc'); // bad
  assert.deepEqual(matches('[a-c]b*'), ["[a-c]b*","[a-c]b*","","","",null,null]); // bad
});
