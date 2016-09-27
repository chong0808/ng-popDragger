var app = angular.module('myapp',[])
app.controller('myCtr',myCtr)
myCtr.$injector = ['$scope'];
app.directive('ctrDown',ctrDown)
ctrDown.$injector = ['$window','$document'];
app.directive('draggable',draggable)
draggable.$injector = ['$window','$document'];

app.filter('myFilter',function(){
	var itemsFilter=[];
	return function(item,f){
		console.log(item ,f )
		if(!f.filterOne && f.filterTwo=='请选择'){
			return item;	
		} 
		if(f.filterOne){
			item.map(function(el,i){
				if( el.name == f.filterOne ){
					itemsFilter.push(el);
				}
			})
			return itemsFilter;
		}
		if(f.filterTwo!='请选择'){
			if(f.filterTwo =='显示全部'){
				return item;
			}else{
				item.map(function(el,i){
					if( el.lb == f.filterTwo ){
						itemsFilter.push(el);
					}
				})
				return itemsFilter;
			}
		}
	}
})



function myCtr($scope){
	$scope.itemsArr = ['显示全部','办公设备','房屋建筑物','电子设备','机械设备','运输设备','其他设备'];
	$scope.popQuery = '请选择';
	$scope.items = [{
		name:'打印机a',
		dw:'台',
		gg:'Hp 喷墨',
		xh:'a-z455',
		dj:'126.66',
		lb:'办公设备',
		num:'5'
	},{
		name:'打印机b',
		dw:'台',
		gg:'Hp 喷墨',
		xh:'a-z455',
		dj:'126.66',
		lb:'办公设备',
		num:'5'
	},{
		name:'打印机c',
		dw:'台',
		gg:'Hp 喷墨',
		xh:'a-z455',
		dj:'126.66',
		lb:'办公设备',
		num:'5'
	},{
		name:'打印机d',
		dw:'台',
		gg:'Hp 喷墨',
		xh:'a-z455',
		dj:'126.66',
		lb:'办公设备',
		num:'5'
	},{
		name:'打印机e',
		dw:'台',
		gg:'Hp 喷墨',
		xh:'a-z455',
		dj:'126.66',
		lb:'办公设备',
		num:'5'
	}]
}

function ctrDown($window,$document){
	return {
		restrict:'EA',
		scope:{items:'=listItems',itemAel:'=selectItem'},
		template:'<i></i><span class="SelectedBoxs-ng">{{itemAel}}</span>'+
			'<ul class="selListBoxs-ng hide">'+ 
			'<li ng-repeat="item in items">{{item}} </li></ul>',
		link:function (scope,elem,attr) {
			// console.log(items)
			if(attr.style){
				var style = JSON.parse(attr.style)[0];
				style.width && $(elem).parent().css({'width':style.width});
				style.width && $(elem).find('span').css({'width':style.width});
				style.width && $(elem).find('ul').css({'width':style.width});
				style.bgColor && $(elem).find('ul').css({'background':style.bgColor});
				style.bgColor && $(elem).parent('.selBoxs-ng').css({'background':style.bgColor});
				style.bgColor && $(elem).find('span').css({'background':style.bgColor});
				style.isScroll && $(elem).find('ul').css({'overflow':'auto','height':150,'border':'1px solid #CCC','border-top':'none'});
			};
			elem.on('click',function (e) {
				$(this).find('ul').toggleClass('hide');
				if(e.target.nodeName=='LI'){
					scope.itemAel = $(e.target).text();
				}
				scope.$apply();
				return false;
			})
		}
	}
}

function draggable($window,$document){
	return {
		restrict:'AE',
		    link: function(scope, element, attr) {
			      var startX = 0, startY = 0;
			      var x = $(element).offset().left+$(element).width()/2, y = $(element).offset().top;
			      var maxY = $window.innerHeight-$(element).height()-45;
			      var maxX = $window.innerWidth-$(element).width();
			      $(element).find('.panel-heading').on('mousedown', function(event) {
			      
			      	if(event.target.nodeName =='DIV'){
					  startX = event.pageX - x;
					  startY = event.pageY - y ;
					  $document.on('mousemove', mousemove);
					  return false;
			      	}
					 
			      });
			      function mousemove(event) {
			   
				        y = event.pageY - startY;
				        x = event.pageX - startX;
				        //限制范围
				        x<$(element).width()/2 ? x=$(element).width()/2 : x;
				        x>(maxX+$(element).width()/2) ? x=(maxX+$(element).width()/2) : x;
				        y<0 ? y=0:y;
				        y>maxY ? y=maxY:y;
				        element.css({
				          top: y + 'px',
				          left:  x + 'px'
				        });
				        $document.on('mouseup', mouseup);
			      }
			      function mouseup() {
			        $document.off('mousemove', mousemove);
			        $document.off('mouseup', mouseup);
			      }
		  	}
	}
}