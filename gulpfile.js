var gulp = require('gulp'),
	sequence = require('gulp-sequence'),
	Promise = require('bluebird'),
	rimraf = Promise.promisify(require('rimraf')),
	fs = require('fs'),
	uglify = require('gulp-uglify'),
	tap = require('gulp-tap'),
	replace = require('gulp-replace-pro'),
	readline = require('readline'),
	pathConf = require('./path');

var path = pathConf.all,
	conf = pathConf.conf,
	obj = {};

gulp.task('clean', function() {
	return rimraf('./path').catch(function(err) {
		console.log(err);
	});
});
gulp.task('checkFile', function(cb) {
	fs.exists(path, function(err) {
		if (err) {
			console.log('not found');
			cb();
		} else {
			console.log('find');
			cb();
		}
	})
});

gulp.task('readfile', function(cb) {
	var rl = readline.createInterface({
		input: fs.createReadStream(conf)
	});
	rl.on('line', function(line) {
		var ary = line.split('=');
		obj['{% ' + ary[0].trim() + ' %}'] = ary[1].trim();
	});
	rl.on('close', function() {
		console.log(obj);
		cb();
	});
});

gulp.task('replace', function() {
	return gulp.src(path)
		.pipe(replace(obj))
		/*.pipe(tap(function(file) {
		 var content = file.contents.toString();
		 }))*/
		// .pipe(uglify())
		.pipe(gulp.dest('path'))
});

//实现文件中变量替换的任务
gulp.task('replace2', sequence('clean', 'checkFile', 'readfile', 'replace'));




