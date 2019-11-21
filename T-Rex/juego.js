var puntCPU;
var puntCPUAux;
var cont;

document.addEventListener('keydown', function(evento) // Deteccion del teclado
{
    if(evento.keyCode == 32)
    {
        if(trex.muerto == false)
        {
            saltar();
        }
        else
        {
            puntCPU = Math.floor((Math.random() * (21-5))+5);
            puntCPUAux = 0;
            nivel.velocidad = 9;
            nube.velocidad = 1;
            cactus.x = ancho + 100;
            nube.x = ancho + 100;
            nivel.puntuacion = 0;
            trex.muerto = false;
            trex2.muerto = false;
            cont = 0;
        }
    }
})

var imgRex, imgSuelo, imgCactus, imgNube;

function cargaImagenes()
{
    imgRex = new Image();
    imgRex2 = new Image();
    imgSuelo = new Image();
    imgCactus = new Image();
    imgNube = new Image();

    imgRex.src = 'Imagenes/dino.png';
    imgRex2.src = 'Imagenes/dino2.png';
    imgSuelo.src = 'Imagenes/suelo.png';
    imgCactus.src = 'Imagenes/cactus.png';
    imgNube.src = 'Imagenes/nube.png';
}

var canvas, ctx;

function inicializa()
{
    puntCPU = Math.floor((Math.random() * (21-5))+5);
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cargaImagenes();
    cont = 0;
    puntCPUAux = 0;
    puntCPU = Math.floor((Math.random() * (21-5))+5);
}

var ancho = 700;
var alto = 300;

function borraCanvas()
{
    canvas.width = ancho;
    canvas.heigth = alto;
}

var nivel =
{
    velocidad: 9,
    puntuacion: 0
};
var suelo = 200;
var trex =
{
    y: suelo,
    vy: 0,
    gravedad: 2,
    salto: 28,
    vymax: 9,
    saltando: false,
    muerto: false
};
var trex2 =
{
    y: suelo,
    vy: 0,
    gravedad: 2,
    salto: 28,
    vymax: 9,
    saltando: false,
    muerto: false
};
var cactus =
{
    x: ancho + 100,
    y: suelo - 25
}
var nube =
{
    x: 400,
    y: 100,
    velocidad: 1
};
var sueloMov =
{
    x: 0,
    y: suelo + 30
}
var aux;

//--------------------------------------------------------------------------------------

function dibujaRex()
{
    ctx.drawImage(imgRex, 0, 0, 64, 69, 100, trex.y, 50, 50);
}

function saltar()
{
    trex.saltando = true;
    trex.vy = trex.salto;
}

function dibujaRex2()
{
    ctx.drawImage(imgRex2, 0, 0, 64, 69, 120, trex2.y, 50, 50);
}

function saltar2()
{
    trex2.saltando = true;
    trex2.vy = trex2.salto;
}

//--------------------------------------------------------------------------------------
function dibujaCactus()
{
    ctx.drawImage(imgCactus, 0, 0, 38, 75, cactus.x, cactus.y, 38, 75);
}

function movimientoCactus()
{
    if(cactus.x < -100)
    {
        cactus.x = ancho + 100;
        aux = cactus.x;
        nivel.puntuacion++;
    }
    else
    {
        cactus.x -= nivel.velocidad;
    }
}
//--------------------------------------------------------------------------------------

function dibujaNube()
{
    ctx.drawImage(imgNube, 0, 0, 82, 32, nube.x, nube.y, 82, 31);
}

function movimientoNube()
{
    if(nube.x < -100)
    {
        nube.x = ancho + 100;
    }
    else
    {
        nube.x -= nube.velocidad;
    }
}
//--------------------------------------------------------------------------------------

function dibujaSuelo()
{
    ctx.drawImage(imgSuelo, sueloMov.x, 0, 700, 30, 0, sueloMov.y, 700, 30);
}

function movimientoSuelo()
{
    if(sueloMov.x > 700)
    {
        sueloMov.x = 0;
    }
    else
    {
        sueloMov.x += nivel.velocidad;
    }
}
//--------------------------------------------------------------------------------------

function gravedad()
{
    if(trex.saltando == true)
    {
        if(trex.y - trex.vy - trex.gravedad > suelo)
        {
            trex.saltando = false;
            trex.vy = 0;
            trex.y = suelo;
        }
        else
        {
            trex.vy -= trex.gravedad;
            trex.y -= trex.vy;
        }
    }
}

function gravedad2()
{
    if(trex2.saltando == true)
    {
        if(trex2.y - trex2.vy - trex2.gravedad > suelo)
        {
            trex2.saltando = false;
            trex2.vy = 0;
            trex2.y = suelo;
        }
        else
        {
            trex2.vy -= trex2.gravedad;
            trex2.y -= trex2.vy;
        }
    }
}

function saltoRex2()
{
    if(trex2.muerto == false)
    {
        if(cactus.x == 224 && cont < puntCPU)
        {
            saltar2();
            cont++;
        }
    }
}

function colision()
{
    if(cactus.x >= 100 && cactus.x <= 150)
    {
        if(trex.y >= suelo-25)
        {
            trex.muerto = true;
            nivel.velocidad = 0;
            nube.velocidad = 0;
        }
    }
}

function colision2()
{
    if(cactus.x >= 120 && cactus.x <= 170)
    {
        if(trex2.y >= suelo-25)
        {
            trex2.muerto = true;
        }
    }
}

function puntuacion()
{
    ctx.font = "30px impact";
    ctx.fillStyle = '#555555';
    ctx.fillText(`Tu: ${nivel.puntuacion}`, 600, 80);
    
    if(trex2.muerto == false)
        ctx.fillText(`CPU: ${cont}`, 582, 50);

    if(trex.muerto == true)
    {
        ctx.font = "60px impact";
        ctx.fillText(`GAME OVER`, 240, 150);

        if(nivel.puntuacion > puntCPU)
        {
            ctx.font = "40px impact";
            ctx.fillText(`!Felicidades, has superado a la CPU!`, 60, 190);
        }
    }
}

// ....................................................

// Bucle principal
var FPS = 50;
setInterval(function()
{
    principal();
}, 1000/FPS);

function principal()
{
    //console.log("principal");
    borraCanvas();
    saltoRex2();
    gravedad2();
    gravedad();
    colision();
    movimientoSuelo();
    movimientoCactus();
    movimientoNube();
    dibujaSuelo();
    dibujaCactus();
    dibujaNube();
    dibujaRex2();
    dibujaRex();
    puntuacion();
}
