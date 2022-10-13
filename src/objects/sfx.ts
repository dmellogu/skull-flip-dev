// @ts-nocheck
export function sfx (scene: Phaser.Scene) {
  let pipelineInstance = scene.plugins.get('rexHorrifiPipeline');
  pipelineInstance.add(scene.cameras.main, {
    enable: false,

    // Bloom
    bloomEnable: false,
    bloomRadius: 0.5, bloomIntensity: 0.5, bloomThreshold: 0.5,
    bloomTexelWidth: 0.5, bloomTexelHeight: 0.5,

    // Chromatic abberation
    chromaticEnable: true,
    chabIntensity: 0.2,

    // Vignette
    vignetteEnable: true,
    vignetteStrength: 1, vignetteIntensity: 0.1,

    // Noise
    noiseEnable: true,
    noiseStrength: 0.15,
    noiseSeed: Math.random().toFixed(2),

    // VHS
    vhsEnable: true,
    vhsStrength: 0.2,

    // Scanlines
    scanlinesEnable: true,
    scanStrength: 0.1,

    // CRT
    crtEnable: true,
    crtWidth: 5, crtHeight: 5,
  });
}