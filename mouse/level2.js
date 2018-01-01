document.onkeydown=check;
var initime;
var music = new Audio("music/music.mp3");
var defeat = new Audio("music/defeat.mp3");
var victory = new Audio("music/victory.mp3");
var ch1;                                            //helps in stopping game after collision
var pco=[0,0];
var bcoset=[[150+Math.floor(Math.random()*100),175+Math.floor(Math.random()*100)],[250+Math.floor(Math.random()*100),350+Math.floor(Math.random()*100)],[500+Math.floor(Math.random()*100),250+Math.floor(Math.random()*100)],[800+Math.floor(Math.random()*100),360+Math.floor(Math.random()*100)],[800+Math.floor(Math.random()*100),40+Math.floor(Math.random()*100)]];
var bco=bcoset;
var mouse = {
  x: undefined,
  y: undefined
}
window.addEventListener('mousemove',
  function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    if(ch1 == 0)
    {
      movep();
    }
})

function makep()
{
  if(ch1 == 0)
  {
    var canvas = document.getElementById("gamec");
    var ctx = canvas.getContext("2d");
    ctx.rect(0,0,1000,500);
    ctx.fillStyle = "#05F9BE";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(20+pco[0],20+pco[1],20,0,2*Math.PI);
    ctx.fillStyle = '#F6F905';
    ctx.fill();
    ctx.stroke();
    ctx.font = "15px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("REACH", 970, 470);
    ctx.fillText("HERE", 970, 490);
    for(i=0;i<bco.length-1;++i)
    {
      for(j=i+1;j<bco.length;++j)
      {
        if(Math.floor(Math.sqrt(Math.pow(Math.abs(bco[i][0]-bco[j][0]),2)+Math.pow(Math.abs(bco[i][1]-bco[j][1]),2)))<25)
        {
          if((bco[i][0]==bco[j][0])>0 && (bco[i][1]==bco[j][1])>0)
          {
            bco[j][0]=bco[i][0]+30;
          }
          if((bco[i][0]-bco[j][0])>0 && (bco[i][1]-bco[j][1])>0)
          {
            bco[j][0]=bco[i][0]-25;
            bco[j][1]=bco[i][1]-25;
          }
          else if((bco[i][0]-bco[j][0])>0 && (bco[i][1]-bco[j][1])==0)
          {
            bco[j][0]=bco[i][0]-25;
          }
          else if((bco[i][0]-bco[j][0])==0 && (bco[i][1]-bco[j][1])>0)
          {
            bco[j][1]=bco[i][1]-25;
          }
          else if((bco[i][0]-bco[j][0])==0 && (bco[i][1]-bco[j][1])<0)
          {
            bco[j][1]=bco[i][1]+25;
          }
          else if((bco[i][0]-bco[j][0])<0 && (bco[i][1]-bco[j][1])==0)
          {
            bco[j][0]=bco[i][0]+25;
          }
          else if((bco[i][0]-bco[j][0])<0 && (bco[i][1]-bco[j][1])<0)
          {
            bco[j][1]=bco[i][1]+25;
            bco[j][0]=bco[i][0]+25;
          }
          else if((bco[i][0]-bco[j][0])>0 && (bco[i][1]-bco[j][1])<0)
          {
            bco[j][0]=bco[i][0]-25;
            bco[j][1]=bco[i][1]+25;
          }
          else if((bco[i][0]-bco[j][0])<0 && (bco[i][1]-bco[j][1])>0)
          {
            bco[j][0]=bco[i][0]+25;
            bco[j][1]=bco[i][1]-25;

          }
        }
      }
    }
    for(i=0;i<bco.length;++i)
    {
      var canvas = document.getElementById("gamec");
      var ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.arc(20+bco[i][0],20+bco[i][1],10,0,2*Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.stroke();

    }
  }
}

function check(e)
  {
   if(e.keyCode == '13')
      {
        ch1 = 0;
        makep();
		    music.play();
        initime=new Date();
        frame();
      }
  }
function movep()
{
  if((mouse.x-pco[0])>0 && (mouse.y-pco[1])>0)
    {
      movedd();
      frame();
    }
  else if((mouse.x-pco[0])>0 && (mouse.y-pco[1])==0)
    {
      mover();
      frame();
    }
  else if((mouse.x-pco[0])==0 && (mouse.y-pco[1])>0)
    {
      moved();
      frame();
    }
  else if((mouse.x-pco[0])==0 && (mouse.y-pco[1])<0)
    {
      moveup();
      frame();
    }
  else if((mouse.x-pco[0])<0 && (mouse.y-pco[1])==0)
    {
      movel();
      frame();
    }
  else if((mouse.x-pco[0])<0 && (mouse.y-pco[1])<0)
    {
      movedu();
      frame();
    }
  else if((mouse.x-pco[0])>0 && (mouse.y-pco[1])<0)
    {
      moveodu();
      frame();
    }
  else if((mouse.x-pco[0])<0 && (mouse.y-pco[1])>0)
    {
      moveodd();
      frame();
    }
}

function mover()                                  //moves player right
  { pco[0]+=3;
    if(pco[0]>960)
      {
        pco[0]=960;
        makep();
      }
    else
      {
        makep();
      }
    
  }

function movedd()                                 //moves player diagonally down       
  {
   pco[0]+=3;
   pco[1]+=3;
   if(pco[0]>960 && pco[1]>960)
      { pco[0]=960;
        pco[1]=460;
        makep();
      }
    if(pco[0]>960)
      {
        pco[0]=960;
        makep();
      }
    if(pco[1]>460)
      {
        pco[1]=460;
        makep();
      }
    else
    {
      makep();
    }
  }

function movedu()                                    //moves player diagonally up
  {
    pco[0]-=3;
    pco[1]-=3;
    if(pco[0]<0 && pco[1]<0)
      { pco[0]=0;
        pco[1]=0;
        makep();
      }
    if(pco[0]<0)
      {
        pco[0]=0;
        makep();
      }
    if(pco[1]<0)
      {
        pco[1]=0;
        makep();
      }
    else
    {
      makep();
    }
  }

function moveup()                                     //moves player up
  {
    if(pco[1]>0)
      {
        pco[1]-=3;
        makep();
      }
  }


function movel()                                       //moves player left
  {
    pco[0]-=3;
    if(pco[0]<0)
      {
        pco[0]=0;
        makep();
      }
    else
    {
      makep();
    }
  }

function moved()                                         //moves player down
  {
   if(pco[1]<460)
      {
        pco[1]+=3;
        makep();
      }
  }

function moveodu()                                       //moves player other diagonally up
  {
    pco[0]+=3;
    pco[1]-=3;
    if(pco[0]>960 && pco[1]<0)
      { pco[0]=960;
        pco[1]=0;
        makep();
      }
    if(pco[0]>960)
      {
        pco[0]=960;
        makep();
      }
    if(pco[1]<0)
      {
        pco[1]=0;
        makep();
      }
    else
    {
      makep();
    }
  }
function moveodd()                                      //moves player other diagonally down                
  {
    pco[0]-=3;
    pco[1]+=3;
    if(pco[0]<0 && pco[1]>460)
      { pco[0]=0;
        pco[1]=460;
        makep();
      }
    if(pco[0]<0)
      {
        pco[0]=0;
        makep();
      }
    if(pco[1]>460)
      {
        pco[1]=460;
        makep();
      }
    else
    {
      makep();
    }
  }
function movebr(n)                                        //moves bot right
  { 
    bco[n][0]+=1.5;
    if(bco[n][0]>960)
      {
        bco[n][0]=960;
      }
  }

function movebdd(n)                                       //moves bot diagonally down
  {
    bco[n][0]+=1.5;
    bco[n][1]+=1.5;
    if(bco[n][0]>960 && bco[n][1]>960)
      { bco[n][0]=960;
        bco[n][1]=460;
      }
    if(bco[n][0]>960)
      {
        bco[n][0]=960;
      }
    if(bco[n][1]>460)
      {
        bco[n][1]=460;
      }
  }

function movebdu(n)                                          //moves bot diagonally up
  {
    bco[n][0]-=1.5;
    bco[n][1]-=1.5;
    if(bco[n][0]<0 && bco[n][1]<0)
      { bco[n][0]=0;
        bco[n][1]=0;
      }
    if(bco[n][0]<0)
      {
        bco[n][0]=0;
      }
    if(bco[n][1]<0)
      {
        bco[n][1]=0;
      }
  }

function movebup(n)                                            //moves bot up
  {
    if(bco[n][1]>0)
      {
        bco[n][1]-=1.5;
      }
  }


function movebl(n)                                              //moves bot left
  {
    bco[n][0]-=1.5;
    if(bco[n][0]<0)
      {
        bco[n][0]=0;
      }
  }

function movebd(n)                                             //moves bot down
  {
   if(bco[n][1]<460)
      {
        bco[n][1]+=1.5;
      }
  }
 
function movebodu(n)                                           //moves bot other diagonally up
  {
    bco[n][0]+=1.5;
    bco[n][1]-=1.5;
    if(bco[n][0]>960 && bco[n][1]<10)
      { bco[n][0]=960;
        bco[n][1]=0;
      }
    if(bco[n][0]>960)
      {
        bco[n][0]=960;
      }
    if(bco[n][1]<10)
      {
        bco[n][1]=0;
      }
  }
function movebodd(n)                                              //moves bot other diagonally down
  {
    bco[n][0]-=1.5;
    bco[n][1]+=1.5;
    if(bco[n][0]<0 && bco[n][1]>460)
      { bco[n][0]=0;
        bco[n][1]=460;
      }
    if(bco[n][0]<0)
      {
        bco[n][0]=0;
      }
    if(bco[n][1]>460)
      {
        bco[n][1]=460;
      }
  }

function frame()
  {
    for(i=0;i<bco.length;++i)
    {
      var ch = Math.floor(Math.sqrt(Math.pow(Math.abs(bco[i][0]-pco[0]),2)+Math.pow(Math.abs(bco[i][1]-pco[1]),2)));
      if(ch<80)
      {
        document.getElementById("gamec").style.borderColor = "red";
      }
      if(ch<200)
      {
        
        if((pco[0]-bco[i][0])>0 && (pco[1]-bco[i][1])>0)
        {
          movebdd(i);
        }
        else if((pco[0]-bco[i][0])>0 && (pco[1]-bco[i][1])==0)
        {
          movebr(i);
        }
        else if((pco[0]-bco[i][0])==0 && (pco[1]-bco[i][1])>0)
        {
          movebd(i);
        }
        else if((pco[0]-bco[i][0])==0 && (pco[1]-bco[i][1])<0)
        {
          movebup(i);
        }
        else if((pco[0]-bco[i][0])<0 && (pco[1]-bco[i][1])==0)
        {
          movebl(i);
        }
        else if((pco[0]-bco[i][0])<0 && (pco[1]-bco[i][1])<0)
        {
          movebdu(i);
        }
        else if((pco[0]-bco[i][0])>0 && (pco[1]-bco[i][1])<0)
        {
          movebodu(i);
        }
        else if((pco[0]-bco[i][0])<0 && (pco[1]-bco[i][1])>0)
        {
          movebodd(i);
        }
      }
      if((ch<32 || (new Date() - initime)>60000) && ch1!=1)
      {
        var canvas = document.getElementById("gamec");
        var ctx = canvas.getContext("2d");
        ctx.rect(0,0,1000,500);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.font = "100px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
        ctx.font = "40px Comic Sans MS";
        ctx.fillText("Refresh to start again ", canvas.width/2, (canvas.height/2)+150);
        music.pause();
        defeat.play();
        ch1 = 1;
      }
      if(pco[0]==960 && pco[1]==460 && ch1!=1)
      {
        var canvas = document.getElementById("gamec");
        var ctx = canvas.getContext("2d");
        ctx.rect(0,0,1000,500);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.font = "100px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("YOU WIN", canvas.width/2, canvas.height/2);
        ctx.fillText("THE GAME", canvas.width/2, (canvas.height/2)+150);
        ch1 = 1;
        document.getElementById("link1").innerHTML="Click here for next level";
        music.pause();
        victory.play();
      }     
    }
    makep();
  }