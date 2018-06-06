/**
 * Created by shenlisha on 2018/6/6.
 */
window.onload = function() {
	var submitBtn = document.getElementsByClassName('submit')[0];
	$('.submit').on('click', test);
	var ele = document.createElement('div');
	ele.innerHTML = "3";
	document.body.appendChild(ele);
	function test() {
		alert(3);
	}
	submitBtn.addEventListener('click', test);
};