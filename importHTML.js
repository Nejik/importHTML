function importHTML(url) {
	var script = document.currentScript,
		src = script.getAttribute('src'),
		innerText = script.innerText.trim();


	if(src) {
		if(!innerText) {
			return;//just load script;
		} else {
			url = innerText;
		}
	}
	
	if(!url) return;

	//create link tag, this tag makes all magic
	var link = document.createElement('link');
	link.onload = function(e) {
		var dhead = document.getElementsByTagName('head')[0],
			dbody = document.getElementsByTagName('body')[0],
			els,
			frag = document.createDocumentFragment();

		if(dhead.contains(script)) {//detect the location of script tag
			els = link.import.querySelector('head').childNodes;
		} else if(dbody.contains(script)) {
			els = link.import.querySelector('body').childNodes;
		}
		
		

		for (var i = 0, l = els.length; i < l ;i++) {
			if(els[i] && (els[i].nodeType === 1 || els[i].nodeType === 8)) {//element or comment
				frag.appendChild(els[i])
			}
		}

		//insert all imported data after script tag
		script.parentNode.insertBefore(frag, script.nextSibling);

		//remove script tag
		if(this.parentNode) this.parentNode.removeChild(this)

		//remove link tag
		if(script.parentNode) script.parentNode.removeChild(script)
	};

	link.rel = 'import';
	link.href = url;
	document.head.appendChild(link);
};
importHTML();