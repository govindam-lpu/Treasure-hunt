
const prize=new Audio('assets/gamepoint.wav');
const nulll=new Audio('assets/lose.wav');
const endd=new Audio('assets/totallose.wav');
const winn=new Audio('assets/totalwin.wav');
const themee=new Audio('assets/theme.mp3');

themee.play();
themee.setAttribute('loop', 'loop');
function size(n,m){  

    themee.play();
    var moves=0;
    var count=0;
    var arr=new Array(n*n);
    arr.fill(null);
    var r;
    for(var i=0;i<n;i++){
        r=Math.floor(Math.random()*(n*n));
        if(arr[r]==null)
            arr[r]='🏆';
        else
            i--;
    }
    for(var i=0;i<(n-1)/2;i++){
        r=Math.floor(Math.random()*(n*n));
        if(arr[r]==null)
            arr[r]='💣';
        else
            i--;
    }
    // console.log(arr);                  
    document.getElementById("choicebox").style["display"] = "none"; 
    document.getElementById("back").style["display"] = "block"; 
    document.getElementById("back").style["visibility"] = "visible";
    document.getElementById("guess").style["display"] = "block"; 
    document.getElementById("guess").style["visibility"] = "visible";
    document.getElementById("contai").style["display"] = "block"; 
    var container = document.getElementById("contai");
    for(var i=0;i<n;i++){
            var cell2=document.createElement("div");
        for(var j=0;j<m;j++){
            var cell = document.createElement("div");
            cell.innerHTML =String.fromCharCode(i+65)+j;
            cell.className="col";
            cell.id=String.fromCharCode(i+65)+j;
            cell2.appendChild(cell);
        }
        container.appendChild(cell2);
    }
    document.getElementById("guessbtn").addEventListener("click",guessed,false);
    window.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
        guessed();
        }
    });
function guessed(){
    document.getElementById("error").innerHTML="";
    moves++;
    var choosed=document.getElementById("inputfield").value;
    var num=(choosed.charCodeAt(0)-65)*n+choosed.charCodeAt(1)-48;
    if(document.getElementById(choosed)==null){
        document.getElementById("error").innerHTML="!!!!!! No Such Option !!!!!";
        document.getElementById("inputfield").value="";
        return;
    }else if(arr[num]==-1){
        document.getElementById("error").innerHTML="!!!!! Already selected !!!!!";
        document.getElementById("inputfield").value="";
        return;
    }
    // console.log(choosed+" moves-"+moves+" count"+count);    
    if(arr[num]==null){
        nulll.play();
        arr[num]=-1;
        document.getElementById(choosed).style.color="transparent";
        document.getElementById(choosed).style.backgroundImage= "url('assets/none.gif')";
    }
    else if(arr[num]=='🏆'){
        prize.play();
        document.getElementById(choosed).style.color="transparent";
        document.getElementById(choosed).style.backgroundImage= "url('assets/diamond.gif')";
        count++;
        arr[num]=-1;
        console.log(count);
        if(count==n){
            setTimeout(youwin,500);
        }
    }
    else if(arr[num]=='💣'){
        themee.pause();
        endd.play();
        document.getElementById(choosed).style.color="transparent";
        document.getElementById(choosed).style.backgroundImage= "url('assets/bomb.gif')";
        setTimeout(youlose,1000);
    }
    document.getElementById("inputfield").value="";
    function youwin(){
        winn.play();
        document.getElementById("scorer").innerHTML="Your accuracy is "+(count/moves*100).toFixed(3)+"%"; 
        document.getElementById("youwon").style["display"] = "block"; 
        document.getElementById("youwon").style["visibility"] = "visible"; 
    }
    function youlose(){
        document.getElementById("gameover").style["display"] = "block"; 
        document.getElementById("gameover").style["visibility"] = "visible"; 
    }
}
}
function back(){
    window.location.href=window.location.href;
}
