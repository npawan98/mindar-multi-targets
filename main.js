import { loadGLTF } from "./libs/loader.js";
import { CSS3DObject } from './libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js';
const THREE = window.MINDAR.IMAGE.THREE;

const createYoutube = (videoId) => {
  return new Promise((resolve, reject) => {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      const player = new YT.Player('player', {
        videoId: videoId,
        events: {
          onReady: () => {
            resolve(player);
          },
          onError: (event) => {
            reject(event);
          }
        }
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    try {
      const videoPlayer1 = await createYoutube('uYJQIKAVBw8');
      const videoPlayer2 = await createYoutube('uYJQIKAVBw8');
      
      const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: './assets/targets.mind'
      });

      const { renderer, cssRenderer, scene, cssScene, camera } = mindarThree;
      
      const obj = new CSS3DObject(document.querySelector("#ar-div"));
      
      const imageTarget1 = mindarThree.addCSSAnchor(0);
      imageTarget1.group.add(obj);
      imageTarget1.onTargetFound = () => videoPlayer1.playVideo();
      imageTarget1.onTargetLost = () => videoPlayer1.pauseVideo();

      const imageTarget2 = mindarThree.addCSSAnchor(1);
      imageTarget2.group.add(obj);
      imageTarget2.onTargetFound = () => videoPlayer2.playVideo();
      imageTarget2.onTargetLost = () => videoPlayer2.pauseVideo();
      
      await mindarThree.start();
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });

    } catch (err) {
      console.error('Error:', err);
    }
  }
  start();
});
