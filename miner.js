function CreateMiner(redlist,width,height,parent,doneCallback)
{
  var arr = [];
	var i = 0;
	var j = 0;
	
	function isInList(x,y)
	{
		if(x < 0 || x > height - 1 || y < 0 || y > width - 1)
			return 0;
		var tmp = -1;
		for(var k=0;k<redlist.length;k++)
		{
			tmp = x * width + y;			
			if(tmp == redlist[k])
				return 1;
		}
		return 0;
	}
	
	for(i=0;i<height;i++)
	{
		arr[i] = [];
		for(j=0;j<width;j++)
			arr[i][j] = 0;
	}
	for(i=0;i<arr.length;i++)
	{
		for(j=0;j<arr[i].length;j++)
		{
			arr[i][j] = isInList(i-1,j-1) + isInList(i-1,j) + isInList(i-1,j+1);
			arr[i][j] += isInList(i,j-1) + isInList(i,j) + isInList(i,j+1);
			arr[i][j] += isInList(i+1,j-1) + isInList(i+1,j) + isInList(i+1,j+1);
		}
	}
	var table = document.createElement("table");
	table.className = "border_table";
	var tbody = document.createElement("tbody");
	for(i=0;i<arr.length;i++)
	{
		var row = document.createElement("tr");
		for(j=0;j<arr[i].length;j++)
		{
			var cell = document.createElement("td");
			cell.appendChild(document.createTextNode(arr[i][j]));
			cell.onclick = clickHandler;
			cell.id = i + ' ' + j;
			row.appendChild(cell);
		}
		tbody.appendChild(row);
	}
	table.appendChild(tbody);
	parent.appendChild(table);
	function clickHandler(e)
	{
		if(typeof e == 'undefined')
			e = window.event;
		var target = (typeof e.target == 'undefined' ? e.srcElement : e.target);
		if(hasClass(target,"checked_cell"))
			removeClass(target,"checked_cell");
		else
			addClass(target,"checked_cell");
		var pos = target.id.split(" ");
		var thisi = parseInt(pos[0]);
		var thisj = parseInt(pos[1]);
		validate(thisi-1,thisj-1);
		validate(thisi-1,thisj);
		validate(thisi-1,thisj+1);
		validate(thisi,thisj-1);
		validate(thisi,thisj);
		validate(thisi,thisj+1);
		validate(thisi+1,thisj-1);
		validate(thisi+1,thisj);
		validate(thisi+1,thisj+1);
		
		var isdone = true;
		for(i=0;i<arr.length && isdone;i++)
		{
			for(j=0;j<arr[i].length && isdone;j++)
			{
				if(validate(i,j) == 0)
					isdone = false;
			}
		}
		if(isdone)
		{
			if(typeof doneCallback == 'function')
				doneCallback();
		}
	}
	function hasClass(dom,c)
	{
		if(!dom)
			return false;
		var classes = dom.className;
		if(!classes)
			return false;
		if(classes === c)
			return true;
		return classes.search("\\b"+c+"\\b") != -1;		
	}
	function removeClass(dom,c)
	{
		dom.className = dom.className.replace(new RegExp("\\b"+c+"\\b\s*","g"),"");
	}
	function addClass(dom,c)
	{
		if(hasClass(dom,c))
			return;
		if(dom.className)
			c = " " + c;
		dom.className += c;
	}
	function validate(thisi,thisj)
	{
		if(thisi < 0 || thisi > height - 1 || thisj < 0 || thisj > width - 1)
			return 0;
		var total = 0;
		if(hasClass(document.getElementById((thisi-1)+' '+(thisj-1)),"checked_cell"))
			total ++;
		if(hasClass(document.getElementById((thisi-1)+' '+(thisj)),"checked_cell"))
			total ++;
		if(hasClass(document.getElementById((thisi-1)+' '+(thisj+1)),"checked_cell"))
			total ++;
		if(hasClass(document.getElementById((thisi)+' '+(thisj-1)),"checked_cell"))
			total ++;
		if(hasClass(document.getElementById(thisi+' '+thisj),"checked_cell"))
			total ++;
		if(hasClass(document.getElementById(thisi+' '+(thisj+1)),"checked_cell"))
			total ++;
		if(hasClass(document.getElementById((thisi+1)+' '+(thisj-1)),"checked_cell"))
			total ++;
		if(hasClass(document.getElementById((thisi+1)+' '+thisj),"checked_cell"))
			total ++;
		if(hasClass(document.getElementById((thisi+1)+' '+(thisj+1)),"checked_cell"))
			total ++;
		if(total > arr[thisi][thisj])
		{
			addClass(document.getElementById(thisi+' '+ thisj),"invalid_cell");
		}else{
			if(hasClass(document.getElementById(thisi+' '+ thisj),"invalid_cell"))
				removeClass(document.getElementById(thisi+' '+ thisj),"invalid_cell");
		}
		if(total == arr[thisi][thisj])
		{
			addClass(document.getElementById(thisi+' '+ thisj),"right_cell");
		}else{
			if(hasClass(document.getElementById(thisi+' '+ thisj),"right_cell"))
				removeClass(document.getElementById(thisi+' '+ thisj),"right_cell");
		}
		return (total == arr[thisi][thisj]) ? 1 : 0;
	}

}
function _done(){
		alert('hello jsj!!!!yes I Love You~');
		alert('I Love You~');
		alert('I Love You~');
		setTimeout("alert('Do You Know That You Are Amazingly Beautiful And Kind?\r\nAnd I am crazy about you')",2000);		
		setTimeout("alert('I <3 U!!!')",4000);
}
function done(){
	setTimeout("_done();",500);	
}
