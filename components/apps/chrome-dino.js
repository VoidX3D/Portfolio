import React, { useEffect, useRef } from 'react';

const ChromeDino = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const gameStateRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    
    // Load custom font
    const font = new FontFace('Arcade', 'url(/themes/Yaru/apps/dino_arcade_font.woff2)');
    font.load().then(() => {
      document.fonts.add(font);
    }).catch(() => {
      console.log('Font not found, using fallback');
    });
    
    // Game constants
    const CELL_SIZE = 3;
    const BASE_WIDTH = 800;
    const BASE_HEIGHT = 400;
    const GROUND_Y = 320;
    const DINO_X = 50;
    const DINO_GROUND_Y = 268;

    // Layouts
    const DINO_STAND = [[0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,1,1],[0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,1],[0,0,0,0,0,0,0,0,0,1,2,2,1,2,2,2,2,2,2,2,1],[0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,1],[0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,1],[0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,1,0,0],[2,1,0,0,0,0,0,1,2,2,2,2,2,2,1,1,1,1,1,0,0],[2,1,0,0,0,0,1,2,2,2,2,2,2,2,1,1,1,0,0,0,0],[2,2,1,0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0],[2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,2,1,0,0,0,0],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,0,0,0,0],[1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0],[1,1,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0],[0,1,1,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0,0],[0,0,1,1,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0,0,0],[0,0,0,1,1,2,2,2,1,2,2,1,0,0,0,0,0,0,0,0,0],[0,0,0,1,1,2,2,1,1,1,2,1,0,0,0,0,0,0,0,0,0],[0,0,0,1,1,2,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0],[0,0,0,1,1,2,2,1,1,1,2,2,1,0,0,0,0,0,0,0,0]];
    
    const DINO_DEAD = [[0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,1,1],[0,0,0,0,0,0,0,0,0,1,2,1,1,1,2,2,2,2,2,2,1],[0,0,0,0,0,0,0,0,0,1,2,1,2,1,2,2,2,2,2,2,1],[0,0,0,0,0,0,0,0,0,1,2,1,1,1,2,2,2,2,2,2,1],[0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,1],[0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,1,0,0],[2,1,0,0,0,0,0,1,2,2,2,2,2,2,1,1,1,1,1,0,0],[2,1,0,0,0,0,1,2,2,2,2,2,2,2,1,1,1,0,0,0,0],[2,2,1,0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0],[2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,2,1,0,0,0,0],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,0,0,0,0],[1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0],[1,1,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0],[0,1,1,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0,0],[0,0,1,1,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0,0,0],[0,0,0,1,1,2,2,2,1,2,2,1,0,0,0,0,0,0,0,0,0],[0,0,0,1,1,2,2,1,1,1,2,1,0,0,0,0,0,0,0,0,0],[0,0,0,1,1,2,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0],[0,0,0,1,1,2,2,1,1,1,2,2,1,0,0,0,0,0,0,0,0]];

    const DINO_LEFT_LEG = [[0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,1,1],[0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,1],[0,0,0,0,0,0,0,0,0,1,2,2,1,2,2,2,2,2,2,2,1],[0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,1],[0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,1],[0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,1,1,1,1,1,1],[1,1,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,1,0,0],[2,1,0,0,0,0,0,1,2,2,2,2,2,2,1,1,1,1,1,0,0],[2,1,0,0,0,0,1,2,2,2,2,2,2,2,1,1,1,0,0,0,0],[2,2,1,0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0],[2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,2,1,0,0,0,0],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,0,0,0,0],[1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0],[1,1,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0],[0,1,1,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0],[0,0,1,1,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0,0,0],[0,0,0,1,1,2,2,2,1,1,2,2,1,0,0,0,0,0,0,0,0],[0,0,0,1,1,2,2,1,1,1,1,1,1,0,0,0,0,0,0,0,0],[0,0,0,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,1,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0]];

    const DINO_RIGHT_LEG = [[0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,1,1],[0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,1],[0,0,0,0,0,0,0,0,0,1,2,2,1,2,2,2,2,2,2,2,1],[0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,1],[0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,1],[0,0,0,0,0,0,0,0,1,1,2,2,2,2,2,1,1,1,1,1,1],[1,1,0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,2,1,0,0],[2,1,0,0,0,0,1,1,2,2,2,2,2,2,1,1,1,1,1,0,0],[2,1,0,0,0,1,1,2,2,2,2,2,2,2,1,1,1,0,0,0,0],[2,2,1,1,1,1,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0],[2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,2,1,0,0,0,0],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,0,0,0,0],[1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0],[1,1,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0],[0,1,1,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0],[0,0,1,1,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0],[0,0,0,1,1,2,2,1,1,2,2,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,2,2,1,1,2,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,1,1,1,2,2,1,0,0,0,0,0,0,0,0]];

    const CACTUS_SMALL = [[0,0,0,1,1,2,2,1,1,1,1,1],[0,0,0,1,2,2,2,2,1,1,2,1],[0,0,0,1,2,2,2,2,1,2,2,2],[0,0,0,1,2,2,2,2,1,2,2,2],[1,1,1,1,2,2,2,2,1,2,2,2],[1,2,1,1,2,2,2,2,1,2,2,2],[2,2,2,1,2,2,2,2,1,2,2,2],[2,2,2,1,2,2,2,2,1,2,2,2],[2,2,2,1,2,2,2,2,2,2,2,2],[2,2,2,1,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2,1],[2,2,2,2,2,2,2,2,2,1,1,1],[1,2,2,2,2,2,2,2,1,1,0,0],[1,1,1,1,2,2,2,2,1,0,0,0],[0,0,0,1,2,2,2,2,1,0,0,0],[0,0,0,1,2,2,2,2,1,0,0,0],[0,0,0,1,2,2,2,2,1,0,0,0],[0,0,0,1,2,2,2,2,1,0,0,0],[0,0,0,1,2,2,2,2,1,0,0,0],[0,0,0,1,2,2,2,2,1,0,0,0]];

    const CLOUD = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,0,3,3,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,0,0,3,0,3,3,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,3,0,0,0,3,3,3,3,0,0,0],[0,0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0,0],[0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0],[0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3],[0,3,3,0,3,3,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],[3,3,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]];

    const themes = {
      classic: { id: 1, background: "#ffffff", road: "#535353", score_text: "#747474", info_text: "#535353", layout: [false, "#ffffff", "#535353", "#dadada", "#535353", false] },
      dark: { id: 2, background: "#202225", road: "#acacac", score_text: "#909191", info_text: "#acacac", layout: [false, "#202225", "#acacac", "#3e3f3f", "#acacac", "#3e3f3f"] }
    };

    // Initialize game state
    gameStateRef.current = {
      currentTheme: themes.classic, gameOver: false, isFirstTime: true, gameScore: 0, gameScoreStep: 0,
      dinoY: DINO_GROUND_Y, dinoVelocityY: 0, dinoReadyToJump: true, obstacles: [], clouds: [],
      animFrame: 0, runAnimFrame: 0, obstacleSpeed: 6, gameSpeed: 1, storedHiScore: 0
    };

    const state = gameStateRef.current;

    try { state.storedHiScore = parseInt(localStorage.getItem("chrome_dino_high_score") || "0"); } catch (e) { state.storedHiScore = 0; }

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const getScale = () => Math.min(canvas.width / BASE_WIDTH, canvas.height / BASE_HEIGHT) * 0.9;
    const getOffsetX = () => (canvas.width - BASE_WIDTH * getScale()) / 2;
    const getOffsetY = () => (canvas.height - BASE_HEIGHT * getScale()) / 2;

    const paintLayout = (layout, posY, posX) => {
      const scale = getScale();
      const offsetX = getOffsetX();
      const offsetY = getOffsetY();
      for (let j = 0; j < layout.length; j++) {
        for (let k = 0; k < layout[j].length; k++) {
          if (state.currentTheme.layout[layout[j][k]]) {
            ctx.fillStyle = state.currentTheme.layout[layout[j][k]];
            ctx.fillRect(offsetX + (posX + k * CELL_SIZE) * scale, offsetY + (posY + j * CELL_SIZE) * scale, CELL_SIZE * scale, CELL_SIZE * scale);
          }
        }
      }
    };

    const initGame = () => {
      Object.assign(state, {
        gameOver: false, gameScore: 0, gameScoreStep: 0, dinoY: DINO_GROUND_Y, dinoVelocityY: 0,
        dinoReadyToJump: true, obstacles: [], clouds: [], animFrame: 0, runAnimFrame: 0,
        obstacleSpeed: 6, gameSpeed: 1, currentTheme: themes.classic, isFirstTime: false
      });
    };

    const checkCollision = () => {
      const dinoHitbox = { x: DINO_X + 6, y: state.dinoY + 6, w: 42, h: 54 };
      for (const obs of state.obstacles) {
        const obsHitbox = { x: obs.x + 6, y: obs.y + 6, w: 24, h: 48 };
        if (dinoHitbox.x < obsHitbox.x + obsHitbox.w && dinoHitbox.x + dinoHitbox.w > obsHitbox.x &&
            dinoHitbox.y < obsHitbox.y + obsHitbox.h && dinoHitbox.y + dinoHitbox.h > obsHitbox.y) return true;
      }
      return false;
    };

    const gameLoop = () => {
      ctx.fillStyle = state.currentTheme.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const scale = getScale();
      const offsetX = getOffsetX();
      const offsetY = getOffsetY();

      ctx.fillStyle = state.currentTheme.road;
      ctx.fillRect(offsetX, offsetY + GROUND_Y * scale, BASE_WIDTH * scale, 4 * scale);

      if (!state.isFirstTime && !state.gameOver) {
        state.gameScoreStep += 0.1;
        if (state.gameScoreStep > 1) {
          state.gameScoreStep -= 1;
          state.gameScore++;
          if (state.gameScore % 100 === 0) {
            state.gameSpeed += 0.1;
            state.obstacleSpeed = 6 + state.gameSpeed;
          }
        }
        if (state.gameScore !== 0 && state.gameScore % 300 === 0) {
          state.currentTheme = state.currentTheme.id === 1 ? themes.dark : themes.classic;
        }
      }

      ctx.font = `${Math.floor(20 * scale)}px Arcade, monospace`;
      ctx.fillStyle = state.currentTheme.score_text;
      const hiText = `H I     ${Math.floor(state.storedHiScore).toString().padStart(5, '0').split('').join(' ')}`;
      const scoreText = `${Math.floor(state.gameScore).toString().padStart(5, '0').split('').join(' ')}`;
      ctx.fillText(`${hiText}     ${scoreText}`, offsetX + (BASE_WIDTH - 420) * scale, offsetY + 30 * scale);

      if (state.isFirstTime) {
        paintLayout(DINO_STAND, state.dinoY, DINO_X);
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = `${Math.floor(18 * scale)}px Arcade, monospace`;
        ctx.fillStyle = state.currentTheme.info_text;
        ctx.fillText("P R E S S     S P A C E     T O     S T A R T", canvas.width / 2, offsetY + BASE_HEIGHT * scale / 2 - 50 * scale);
        requestAnimationFrame(gameLoop);
        return;
      }

      if (!state.dinoReadyToJump) {
        state.dinoVelocityY += 0.8;
        state.dinoY += state.dinoVelocityY;
        if (state.dinoY >= DINO_GROUND_Y) {
          state.dinoY = DINO_GROUND_Y;
          state.dinoVelocityY = 0;
          state.dinoReadyToJump = true;
        }
      }

      let dinoLayout = state.gameOver ? DINO_DEAD : 
        (state.dinoReadyToJump ? ((state.runAnimFrame++, Math.floor(state.runAnimFrame / 5) % 2 === 0) ? DINO_LEFT_LEG : DINO_RIGHT_LEG) : DINO_STAND);
      paintLayout(dinoLayout, state.dinoY, DINO_X);

      if (state.animFrame % 80 === 0 && state.obstacles.length < 2) {
        state.obstacles.push({ x: BASE_WIDTH, y: DINO_GROUND_Y - 3, layout: CACTUS_SMALL });
      }
      if (state.animFrame % 150 === 0 && state.clouds.length < 4) {
        state.clouds.push({ x: BASE_WIDTH, y: 30 + Math.random() * 80 });
      }

      state.obstacles.forEach(obs => {
        obs.x -= state.obstacleSpeed;
        paintLayout(obs.layout, obs.y, obs.x);
      });

      if (!state.gameOver && checkCollision()) {
        state.gameOver = true;
        if (state.gameScore > state.storedHiScore) {
          try {
            localStorage.setItem("chrome_dino_high_score", state.gameScore.toString());
            state.storedHiScore = state.gameScore;
          } catch (e) {}
        }
      }

      state.clouds.forEach(cloud => {
        cloud.x -= 2;
        paintLayout(CLOUD, cloud.y, cloud.x);
      });

      state.obstacles = state.obstacles.filter(obs => obs.x > -100);
      state.clouds = state.clouds.filter(cloud => cloud.x > -150);

      if (state.gameOver) {
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = `${Math.floor(24 * scale)}px Arcade, monospace`;
        ctx.fillStyle = state.currentTheme.info_text;
        ctx.fillText("G A M E     O V E R", canvas.width / 2, offsetY + BASE_HEIGHT * scale / 2 - 40 * scale);
        ctx.font = `${Math.floor(16 * scale)}px Arcade, monospace`;
        ctx.fillText("P R E S S     S P A C E     T O     R E S T A R T", canvas.width / 2, offsetY + BASE_HEIGHT * scale / 2 + 10 * scale);
        return;
      }

      state.animFrame++;
      requestAnimationFrame(gameLoop);
    };

    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        if (state.gameOver || state.isFirstTime) {
          initGame();
          gameLoop();
        } else if (state.dinoReadyToJump) {
          state.dinoReadyToJump = false;
          state.dinoVelocityY = -15;
        }
      }
    };

    const handleClick = () => {
      if (state.gameOver || state.isFirstTime) {
        initGame();
        gameLoop();
      } else if (state.dinoReadyToJump) {
        state.dinoReadyToJump = false;
        state.dinoVelocityY = -15;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('touchstart', handleClick);

    gameLoop();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchstart', handleClick);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', margin: 0, padding: 0, overflow: 'hidden', position: 'relative', backgroundColor: '#f0f0f0' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
};

// Export as a function that returns the component (for window.js compatibility)
export function displayChromeDino() {
  return <ChromeDino />;
}

export default ChromeDino;
