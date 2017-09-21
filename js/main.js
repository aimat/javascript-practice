(function(){
  'use strict'

  var start = document.getElementById('start');
  var test = document.getElementById("example");
  var mainCharacter = document.getElementById("main-character");
  var mainHP = document.getElementById("main-HP");
  var enemy = document.getElementById("enemy");
  var enemyHP = document.getElementById("enemy-HP");

  var isFighting = false;
  var FIGHTING_COUNT = 0;
  var MAIN_WIDTH = 300;
  var WIDTH = 300;
  var ATTACK = 10;
  var ENEMY_ATTACK = 10;

  var timerId;
  var timerId2;

  //初期化
  function preparation(){
    MAIN_WIDTH = 300;
    mainHP.style.width = `${MAIN_WIDTH}px`;
    WIDTH = 300;
    enemyHP.style.width = `${WIDTH}px`;
    mainHP.style.backgroundColor = '#ADFF2F';
    enemyHP.style.backgroundColor = '#ADFF2F';
    isFighting = false;
    }

  //タイマーの動作
  function updateTimer(){
    timerId = setTimeout(function() {
      if(test.innerHTML == 1){
        test.innerHTML = "<h1 id='example' style='color: red;'>FIGHT!</span>";
        clearTimeout(timerId);
        isFighting = true;
        battle();
      }else{
        test.innerHTML -= 1;
        updateTimer();
      }
    }, 1000);
  }

  //敵の攻撃・プレイヤーが倒された時
  function battle(){
    timerId2 = setTimeout(function() {
      MAIN_WIDTH -= ENEMY_ATTACK;
      mainHP.style.width = `${MAIN_WIDTH}px`;
      if(MAIN_WIDTH <= 0){
        clearTimeout(timerId2);
        isFighting = false;
        mainCharacter.style.opacity = '0';
        setTimeout(function() {
          test.innerHTML = "<h1 id='example' style='color: #000080;'>負け</h1>";
          start.style.backgroundColor = '#4169E1';
          start.innerHTML = "もう一回";
          start.style.display = 'block';
        }, 2000);
        return;
      }else if (MAIN_WIDTH <= 60) {
        mainHP.style.backgroundColor = '#FF0000';
      }else if(MAIN_WIDTH <= 150){
        mainHP.style.backgroundColor = '#FFFF00';
      }
      battle();
    }, 200);
  }

  //スタートボタンを押した時
  start.addEventListener('click', function(){
    preparation();
    this.style.display = 'none';
    switch (FIGHTING_COUNT) {
      case 0:
        enemy.src = 'img/112848.jpg';
        enemy.style.opacity = '1';
        ENEMY_ATTACK = 10;
        break;
      case 1:
        enemy.src = 'img/111045.jpg';
        enemy.style.opacity = '1';
        ENEMY_ATTACK = 12;
        break;
      case 2:
        enemy.src = 'img/138836.jpg';
        enemy.style.opacity = '1';
        ENEMY_ATTACK = 15;
        break;
    };
    mainCharacter.style.opacity = '1';
    test.innerHTML = 3;
    updateTimer();
  })

　//プレイヤーの攻撃・敵を倒した時
  enemy.addEventListener('click', function(){
    if(isFighting === false) {return};
    isFighting = true;
    WIDTH -= ATTACK;
    enemyHP.style.width = `${WIDTH}px`;
    if(WIDTH <= 0){
      isFighting = false;
      clearTimeout(timerId2);
      this.style.opacity = '0';
      FIGHTING_COUNT ++;
      setTimeout(function() {
        switch (FIGHTING_COUNT) {
          case 1:
          case 2:
           test.innerHTML = "<h1 id='example' style='color: red;'>勝ち</h1>";
           start.style.backgroundColor = '#FFA500';
           start.innerHTML = "次に行く";
           start.style.display = 'block';
           break;
          case 3:
           test.innerHTML = "<h1 id='example' style='color: #FFD700;'>クリア</span>";
           FIGHTING_COUNT = 0;
           start.innerHTML = '最初から';
           start.style.display = 'block';
           break;
        }
      }, 2000);
    }else if (WIDTH <= 60) {
      enemyHP.style.backgroundColor = '#FF0000';
    }else if(WIDTH <= 150){
      enemyHP.style.backgroundColor = '#FFFF00';
    }
  })

})();
